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

let viewportObserver: IntersectionObserver | null = null;

/**
 * Gallery clips (and GIFs served as MP4) only run while near the viewport, so a
 * page with dozens of loops isn't decoding all of them at once. Page-level
 * background reels are always visible and skip this.
 */
function observeGalleryClip(video: HTMLVideoElement) {
  if (!('IntersectionObserver' in window)) {
    playMutedVideo(video);
    return;
  }
  if (video.dataset.viewportObserved === '1') return;
  video.dataset.viewportObserved = '1';

  viewportObserver ??= new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          playMutedVideo(target);
        } else if (!target.paused) {
          target.pause();
        }
      });
    },
    { rootMargin: '200px 0px', threshold: 0.01 },
  );
  viewportObserver.observe(video);
}

/** All muted autoplay reels sitewide (About, backgrounds, gallery clips). */
function initMutedAutoplay() {
  document
    .querySelectorAll<HTMLVideoElement>(
      'video.about-reel, video.contact-bg-video, video.concept-bg-video, video.art-direction-bg-video',
    )
    .forEach(playMutedVideo);

  document
    .querySelectorAll<HTMLVideoElement>('video[data-autoplay-muted="true"]')
    .forEach(observeGalleryClip);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMutedAutoplay);
} else {
  initMutedAutoplay();
}

document.addEventListener('astro:page-load', initMutedAutoplay);
