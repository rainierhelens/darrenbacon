const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let revealObserver: IntersectionObserver | null = null;

/** Fade + rise elements marked with [data-reveal] as they enter the viewport. */
function initScrollReveal() {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

  if (prefersReducedMotion()) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );

  targets.forEach((el, index) => {
    if (el.classList.contains('is-visible')) return;
    // Stagger siblings that share a reveal group for a cascading effect.
    if (!el.style.getPropertyValue('--reveal-delay') && el.dataset.revealStagger) {
      el.style.setProperty('--reveal-delay', `${(index % 6) * 80}ms`);
    }
    revealObserver!.observe(el);
  });
}

/** Radial glow that tracks the pointer across .spotlight cards. */
function initSpotlight() {
  if (prefersReducedMotion()) return;
  if (window.matchMedia('(hover: none)').matches) return;

  document.addEventListener('pointermove', (event) => {
    const card = (event.target as HTMLElement)?.closest<HTMLElement>('.spotlight');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
    card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
  });
}

/** Header scroll progress indicator. */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  const update = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
    bar.style.setProperty('--scroll-progress', String(Math.min(1, Math.max(0, progress))));
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
}

let globalBound = false;

function initMotion() {
  initScrollReveal();
  initScrollProgress();
  if (!globalBound) {
    initSpotlight();
    globalBound = true;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMotion);
} else {
  initMotion();
}

document.addEventListener('astro:page-load', initMotion);
