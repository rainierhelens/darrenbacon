/**
 * Generate web-friendly motion derivatives for the media under images/.
 *
 *   node scripts/encode-media.mjs            # GIF -> MP4 + posters for GIFs and MP4s
 *   node scripts/encode-media.mjs --reencode # also re-encode MP4s >= 8 MB in place
 *   node scripts/encode-media.mjs --reencode --min-mb 4
 *
 * Output lands in images/_derived/ mirroring the source path, plus a manifest
 * (images/_derived/manifest.json) that the site reads at build time:
 *
 *   images/deadrop/deadrop8.gif
 *     -> images/_derived/deadrop/deadrop8.mp4
 *     -> images/_derived/deadrop/deadrop8.poster.jpg
 *   images/deadrop-ad/SSI/snapshot1_art_pass.mp4
 *     -> images/_derived/deadrop-ad/SSI/snapshot1_art_pass.poster.jpg
 *
 * Derivatives are committed, so CI never needs ffmpeg. Re-run after adding or
 * replacing media; existing outputs newer than their source are skipped.
 *
 * Needs ffmpeg + ffprobe on PATH, or FFMPEG / FFPROBE env vars pointing at them.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesRoot = path.resolve(siteRoot, '../images');
const derivedRoot = path.join(imagesRoot, '_derived');
const manifestPath = path.join(derivedRoot, 'manifest.json');

const FFMPEG = process.env.FFMPEG || 'ffmpeg';
const FFPROBE = process.env.FFPROBE || 'ffprobe';

const args = process.argv.slice(2);
const REENCODE = args.includes('--reencode');
const minMbIndex = args.indexOf('--min-mb');
const REENCODE_MIN_BYTES = (minMbIndex >= 0 ? Number(args[minMbIndex + 1]) : 8) * 1024 * 1024;
const CONCURRENCY = Math.max(1, Math.min(4, os.cpus().length - 1));

/** Folders that are git-ignored or not site media; never touched. */
const SKIP_DIRS = new Set([
  '_derived',
  'halo-styleguide',
  'art-index',
  path.join('deadrop-ad', 'screenshots'),
  path.join('Marathon', 'S1'),
  path.join('Marathon', 'S2'),
]);

const GIF_MIN_BYTES = 60 * 1024;
const POSTER_MAX_WIDTH = 1280;

function rel(abs) {
  return path.relative(imagesRoot, abs).split(path.sep).join('/');
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    const relative = path.relative(imagesRoot, abs);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(relative)) continue;
      yield* walk(abs);
    } else if (entry.isFile()) {
      yield abs;
    }
  }
}

async function probe(file) {
  const { stdout } = await execFileAsync(FFPROBE, [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate:format=duration',
    '-of', 'json',
    file,
  ]);
  const data = JSON.parse(stdout);
  const stream = data.streams?.[0] ?? {};
  return {
    width: stream.width ?? 0,
    height: stream.height ?? 0,
    duration: Number(data.format?.duration ?? 0),
  };
}

function isStale(output, source) {
  if (!fs.existsSync(output)) return true;
  return fs.statSync(output).mtimeMs < fs.statSync(source).mtimeMs;
}

async function run(argsList) {
  await execFileAsync(FFMPEG, ['-hide_banner', '-loglevel', 'error', '-y', ...argsList], {
    maxBuffer: 1024 * 1024 * 16,
  });
}

async function makePoster(source, output, duration) {
  if (!isStale(output, source)) return false;
  fs.mkdirSync(path.dirname(output), { recursive: true });
  // Skip the first frame on longer clips; fades-from-black make poor posters.
  const seek = duration > 2 ? '0.5' : '0';
  await run([
    '-ss', seek,
    '-i', source,
    '-frames:v', '1',
    '-vf', `scale='min(${POSTER_MAX_WIDTH},iw)':-2`,
    '-q:v', '4',
    output,
  ]);
  return true;
}

async function gifToMp4(source, output) {
  if (!isStale(output, source)) return false;
  fs.mkdirSync(path.dirname(output), { recursive: true });
  await run([
    '-i', source,
    // libx264 needs even dimensions; yuv420p is what every browser decodes.
    '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
    '-c:v', 'libx264',
    '-crf', '24',
    '-preset', 'slow',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-an',
    output,
  ]);
  return true;
}

async function reencodeMp4(source) {
  const tmp = `${source}.reencode.tmp.mp4`;
  await run([
    '-i', source,
    '-vf', "scale='min(1920,iw)':-2",
    '-c:v', 'libx264',
    '-crf', '23',
    '-preset', 'slow',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-c:a', 'aac',
    '-b:a', '128k',
    tmp,
  ]);
  const before = fs.statSync(source).size;
  const after = fs.statSync(tmp).size;
  if (after < before * 0.85) {
    fs.renameSync(tmp, source);
    return { before, after, replaced: true };
  }
  fs.unlinkSync(tmp);
  return { before, after, replaced: false };
}

async function mapLimit(items, limit, fn) {
  const results = [];
  let next = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);

async function main() {
  if (!fs.existsSync(imagesRoot)) {
    console.error(`[encode-media] images folder not found: ${imagesRoot}`);
    process.exit(1);
  }

  const gifs = [];
  const videos = [];
  for (const file of walk(imagesRoot)) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.gif') {
      // Tiny UI loops (header icon) stay as GIFs.
      if (path.dirname(file) === imagesRoot) continue;
      if (fs.statSync(file).size < GIF_MIN_BYTES) continue;
      gifs.push(file);
    } else if (ext === '.mp4' || ext === '.webm' || ext === '.m4v') {
      videos.push(file);
    }
  }

  console.log(`[encode-media] ${gifs.length} GIF(s), ${videos.length} video(s), concurrency ${CONCURRENCY}`);

  if (REENCODE) {
    const large = videos.filter((v) => fs.statSync(v).size >= REENCODE_MIN_BYTES);
    console.log(`[encode-media] re-encoding ${large.length} video(s) >= ${mb(REENCODE_MIN_BYTES)} MB`);
    let saved = 0;
    await mapLimit(large, CONCURRENCY, async (file) => {
      const result = await reencodeMp4(file);
      const status = result.replaced ? 'replaced' : 'kept   ';
      if (result.replaced) saved += result.before - result.after;
      console.log(`  ${status}  ${mb(result.before).padStart(6)} -> ${mb(result.after).padStart(6)} MB  ${rel(file)}`);
    });
    console.log(`[encode-media] re-encode saved ${mb(saved)} MB`);
  }

  const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')) : {};
  let encoded = 0;
  let posters = 0;

  await mapLimit(gifs, CONCURRENCY, async (gif) => {
    const relative = rel(gif);
    const base = relative.replace(/\.gif$/i, '');
    const mp4 = path.join(derivedRoot, `${base}.mp4`);
    const poster = path.join(derivedRoot, `${base}.poster.jpg`);
    if (await gifToMp4(gif, mp4)) encoded += 1;
    if (await makePoster(gif, poster, 0)) posters += 1;
    const info = await probe(mp4);
    manifest[relative] = {
      video: rel(mp4),
      poster: rel(poster),
      width: info.width,
      height: info.height,
      duration: Math.round(info.duration * 10) / 10,
      sourceBytes: fs.statSync(gif).size,
      videoBytes: fs.statSync(mp4).size,
    };
  });

  await mapLimit(videos, CONCURRENCY, async (video) => {
    const relative = rel(video);
    const base = relative.replace(/\.(mp4|webm|m4v)$/i, '');
    const poster = path.join(derivedRoot, `${base}.poster.jpg`);
    const info = await probe(video);
    if (await makePoster(video, poster, info.duration)) posters += 1;
    manifest[relative] = {
      poster: rel(poster),
      width: info.width,
      height: info.height,
      duration: Math.round(info.duration * 10) / 10,
      sourceBytes: fs.statSync(video).size,
    };
  });

  // Drop manifest entries whose source no longer exists.
  for (const key of Object.keys(manifest)) {
    if (!fs.existsSync(path.join(imagesRoot, ...key.split('/')))) delete manifest[key];
  }

  const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
  fs.mkdirSync(derivedRoot, { recursive: true });
  fs.writeFileSync(manifestPath, `${JSON.stringify(sorted, null, 2)}\n`);

  const gifBytes = gifs.reduce((sum, g) => sum + fs.statSync(g).size, 0);
  const mp4Bytes = gifs.reduce((sum, g) => sum + (manifest[rel(g)]?.videoBytes ?? 0), 0);
  console.log(
    `[encode-media] ${encoded} GIF(s) encoded, ${posters} poster(s) written; ` +
      `GIF total ${mb(gifBytes)} MB -> MP4 total ${mb(mp4Bytes)} MB. Manifest: ${rel(manifestPath)}`,
  );
}

main().catch((error) => {
  console.error('[encode-media] failed:', error.stderr || error.message || error);
  process.exit(1);
});
