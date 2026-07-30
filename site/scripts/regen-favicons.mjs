import sharp from 'sharp';
import fs from 'fs';

const svg = fs.readFileSync('public/favicon.svg');

await sharp(svg).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('Wrote public/apple-touch-icon.png');

const png32 = await sharp(svg).resize(32, 32).png().toBuffer();
const png16 = await sharp(svg).resize(16, 16).png().toBuffer();
fs.writeFileSync('public/favicon-32.png', png32);
console.log('Wrote public/favicon-32.png');

// Build ICO with embedded PNGs (16 + 32)
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let offset = headerSize;
  const entries = [];
  for (const buf of pngBuffers) {
    const meta = sharp(buf); // unused; sizes from buffer via known order
    entries.push({ buf, offset });
    offset += buf.length;
  }
  // Get dimensions via sharp metadata - sync approach: read from PNG IHDR
  function pngSize(buf) {
    return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
  }
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type icon
  header.writeUInt16LE(count, 4);
  let o = 6;
  let dataOffset = headerSize;
  const parts = [header];
  for (const buf of pngBuffers) {
    const { w, h } = pngSize(buf);
    header.writeUInt8(w >= 256 ? 0 : w, o);
    header.writeUInt8(h >= 256 ? 0 : h, o + 1);
    header.writeUInt8(0, o + 2); // colors
    header.writeUInt8(0, o + 3); // reserved
    header.writeUInt16LE(1, o + 4); // planes
    header.writeUInt16LE(32, o + 6); // bit count
    header.writeUInt32LE(buf.length, o + 8);
    header.writeUInt32LE(dataOffset, o + 12);
    o += 16;
    dataOffset += buf.length;
    parts.push(buf);
  }
  return Buffer.concat(parts);
}

const ico = buildIco([png16, png32]);
fs.writeFileSync('public/favicon.ico', ico);
console.log('Wrote public/favicon.ico');

for (const f of ['public/apple-touch-icon.png', 'public/favicon-32.png', 'public/favicon.ico', 'public/favicon.svg']) {
  const st = fs.statSync(f);
  const meta = f.endsWith('.png') ? await sharp(f).metadata() : null;
  console.log(f, st.size, 'bytes', meta ? `${meta.width}x${meta.height}` : '');
}
