/** Force muted + inline flags browsers require for autoplay after ClientRouter swaps. */
function armMutedVideo(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.setAttribute('muted', '');
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.loop = true;
}

function tryPlay(video: HTMLVideoElement) {
  if (!video.isConnected || !video.paused) return;
  void video.play().catch(() => {
    /* Autoplay may still need a user gesture; unlock handlers cover that. */
  });
}

function unlockOnGesture(video: HTMLVideoElement) {
  const unlock = () => tryPlay(video);
  document.addEventListener('pointerdown', unlock, { once: true, passive: true });
  document.addEventListener('keydown', unlock, { once: true });
}

function playMutedVideo(video: HTMLVideoElement) {
  // Idempotent for the same DOM node (DOMContentLoaded + astro:page-load both fire).
  if (video.dataset.mutedAutoplayArmed === '1') {
    tryPlay(video);
    return;
  }
  video.dataset.mutedAutoplayArmed = '1';

  armMutedVideo(video);

  const onReady = () => tryPlay(video);
  video.addEventListener('loadeddata', onReady, { once: true });
  video.addEventListener('canplay', onReady, { once: true });

  if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
    tryPlay(video);
  } else if (video.readyState === HTMLMediaElement.HAVE_NOTHING) {
    // ClientRouter DOM swaps leave <video> elements without a media load.
    video.load();
  }

  // Late decode / transition settle — short retry window, not infinite.
  let attempts = 0;
  const tick = window.setInterval(() => {
    attempts += 1;
    tryPlay(video);
    if (!video.paused || attempts >= 12 || !video.isConnected) {
      window.clearInterval(tick);
    }
  }, 250);

  unlockOnGesture(video);
}

/** All muted autoplay reels sitewide (About, backgrounds, gallery clips). */
function initMutedAutoplay() {
  document
    .querySelectorAll<HTMLVideoElement>(
      'video.about-reel, video[data-autoplay-muted="true"], video.contact-bg-video, video.concept-bg-video, video.art-direction-bg-video',
    )
    .forEach(playMutedVideo);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMutedAutoplay);
} else {
  initMutedAutoplay();
}

document.addEventListener('astro:page-load', initMutedAutoplay);
