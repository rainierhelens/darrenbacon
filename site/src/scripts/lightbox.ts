type LightboxItem = {
  src: string;
  type: 'image' | 'video';
  caption?: string;
};

type LightboxGroup = {
  items: LightboxItem[];
};

const groups = new Map<string, LightboxGroup>();
let activeGroup = '';
let activeIndex = 0;

const lightbox = () => document.getElementById('site-lightbox');
const lightboxImage = () => document.getElementById('site-lightbox-image') as HTMLImageElement | null;
const lightboxVideo = () => document.getElementById('site-lightbox-video') as HTMLVideoElement | null;
const lightboxCaption = () => document.getElementById('site-lightbox-caption');
const lightboxCounter = () => document.getElementById('site-lightbox-counter');

function registerGroup(id: string, items: LightboxItem[]) {
  groups.set(id, { items });
}

function stopVideo() {
  const video = lightboxVideo();
  if (!video) return;
  video.pause();
  video.removeAttribute('src');
  video.load();
  video.classList.add('hidden');
}

function show(groupId: string, index: number) {
  const group = groups.get(groupId);
  const overlay = lightbox();
  const image = lightboxImage();
  const video = lightboxVideo();
  const caption = lightboxCaption();
  const counter = lightboxCounter();
  const item = group?.items[index];
  if (!group || !item || !overlay || !image || !counter) return;

  activeGroup = groupId;
  activeIndex = index;

  const label = item.caption ?? `Artwork ${index + 1}`;

  if (item.type === 'video' && video) {
    image.classList.add('hidden');
    image.removeAttribute('src');
    video.classList.remove('hidden');
    video.src = item.src;
    video.setAttribute('aria-label', label);
    void video.play().catch(() => {
      /* Controls are visible; the visitor can press play. */
    });
  } else {
    stopVideo();
    image.classList.remove('hidden');
    image.src = item.src;
    image.alt = label;
  }

  if (caption) {
    caption.textContent = item.caption ?? '';
    caption.classList.toggle('hidden', !item.caption);
  }

  counter.textContent = `${index + 1} / ${group.items.length}`;
  overlay.classList.remove('hidden');
  overlay.classList.add('flex');
  overlay.dataset.open = 'true';
  document.body.style.overflow = 'hidden';
}

function hide() {
  const overlay = lightbox();
  if (!overlay) return;
  stopVideo();
  overlay.classList.add('hidden');
  overlay.classList.remove('flex');
  delete overlay.dataset.open;
  document.body.style.overflow = '';
}

function step(delta: number) {
  const group = groups.get(activeGroup);
  if (!group) return;
  const next = (activeIndex + delta + group.items.length) % group.items.length;
  show(activeGroup, next);
}

/** Register (or refresh) lightbox groups for the current page's galleries. */
function registerGroups() {
  groups.clear();
  document.querySelectorAll<HTMLElement>('[data-lightbox-group]').forEach((el) => {
    const groupId = el.dataset.lightboxGroup;
    if (!groupId) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-lightbox-item]')).map((item) => ({
      src: item.dataset.src ?? '',
      type: item.dataset.type === 'video' ? ('video' as const) : ('image' as const),
      caption: item.dataset.caption,
    }));

    registerGroup(groupId, items);
  });
}

/** Bind overlay controls — the overlay is re-rendered on each page navigation. */
function bindOverlay() {
  // Both DOMContentLoaded and astro:page-load fire on the first visit; bind
  // each overlay element once or prev/next would step twice per click.
  const overlay = lightbox();
  if (!overlay || overlay.dataset.bound === '1') return;
  overlay.dataset.bound = '1';

  document.getElementById('site-lightbox-close')?.addEventListener('click', hide);
  document.getElementById('site-lightbox-prev')?.addEventListener('click', () => step(-1));
  document.getElementById('site-lightbox-next')?.addEventListener('click', () => step(1));

  lightbox()?.addEventListener('click', (event) => {
    if (event.target === lightbox()) hide();
  });

  lightboxImage()?.addEventListener('click', (event) => {
    event.stopPropagation();
  });
  lightboxVideo()?.addEventListener('click', (event) => {
    event.stopPropagation();
  });
}

let globalBound = false;

/** Document-level delegation + keyboard — bound once for the session. */
function bindGlobalOnce() {
  if (globalBound) return;
  globalBound = true;

  document.addEventListener('click', (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>('[data-lightbox-item]');
    if (!target) return;

    event.preventDefault();
    event.stopPropagation();

    const groupId = target.dataset.group;
    const index = Number(target.dataset.index);
    if (!groupId || Number.isNaN(index)) return;
    show(groupId, index);
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox()?.dataset.open !== 'true') return;
    if (event.key === 'Escape') hide();
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });
}

function initLightbox() {
  registerGroups();
  bindOverlay();
  bindGlobalOnce();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLightbox);
} else {
  initLightbox();
}

document.addEventListener('astro:page-load', initLightbox);
