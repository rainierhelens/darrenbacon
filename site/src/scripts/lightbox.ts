type LightboxGroup = {
  images: string[];
  captions: (string | undefined)[];
};

const groups = new Map<string, LightboxGroup>();
let activeGroup = '';
let activeIndex = 0;

const lightbox = () => document.getElementById('site-lightbox');
const lightboxImage = () => document.getElementById('site-lightbox-image') as HTMLImageElement | null;
const lightboxCaption = () => document.getElementById('site-lightbox-caption');
const lightboxCounter = () => document.getElementById('site-lightbox-counter');

function registerGroup(id: string, images: string[], captions: (string | undefined)[] = []) {
  groups.set(id, { images, captions });
}

function show(groupId: string, index: number) {
  const group = groups.get(groupId);
  const overlay = lightbox();
  const image = lightboxImage();
  const caption = lightboxCaption();
  const counter = lightboxCounter();
  if (!group || !overlay || !image || !counter) return;

  activeGroup = groupId;
  activeIndex = index;

  image.src = group.images[index];
  image.alt = group.captions[index] ?? `Artwork ${index + 1}`;

  if (caption) {
    caption.textContent = group.captions[index] ?? '';
    caption.classList.toggle('hidden', !group.captions[index]);
  }

  counter.textContent = `${index + 1} / ${group.images.length}`;
  overlay.classList.remove('hidden');
  overlay.classList.add('flex');
  overlay.dataset.open = 'true';
  document.body.style.overflow = 'hidden';
}

function hide() {
  const overlay = lightbox();
  if (!overlay) return;
  overlay.classList.add('hidden');
  overlay.classList.remove('flex');
  delete overlay.dataset.open;
  document.body.style.overflow = '';
}

function step(delta: number) {
  const group = groups.get(activeGroup);
  if (!group) return;
  const next = (activeIndex + delta + group.images.length) % group.images.length;
  show(activeGroup, next);
}

function initLightbox() {
  document.querySelectorAll<HTMLElement>('[data-lightbox-group]').forEach((el) => {
    const groupId = el.dataset.lightboxGroup;
    if (!groupId || groups.has(groupId)) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-lightbox-item]'));
    const images = items.map((item) => item.dataset.src ?? '');
    const captions = items.map((item) => item.dataset.caption);

    registerGroup(groupId, images, captions);
  });

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

  document.getElementById('site-lightbox-close')?.addEventListener('click', hide);
  document.getElementById('site-lightbox-prev')?.addEventListener('click', () => step(-1));
  document.getElementById('site-lightbox-next')?.addEventListener('click', () => step(1));

  lightbox()?.addEventListener('click', (event) => {
    if (event.target === lightbox()) hide();
  });

  lightboxImage()?.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox()?.dataset.open !== 'true') return;
    if (event.key === 'Escape') hide();
    if (event.key === 'ArrowLeft') step(-1);
    if (event.key === 'ArrowRight') step(1);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLightbox);
} else {
  initLightbox();
}
