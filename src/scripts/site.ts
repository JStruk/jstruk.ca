function setupReveal() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-in'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  nodes.forEach((node) => observer.observe(node));
}

function setupMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu]');
  const menu = document.querySelector<HTMLElement>('[data-menu-panel]');
  if (!toggle || !menu) return;

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    menu.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  };

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.hidden = open;
    document.body.classList.toggle('nav-open', !open);
    if (!open) {
      requestAnimationFrame(() => menu.classList.add('is-open'));
    } else {
      menu.classList.remove('is-open');
    }
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });
}

let keysBound = false;

function boot() {
  setupReveal();
  setupMenu();

  if (keysBound) return;
  keysBound = true;
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const toggle = document.querySelector<HTMLButtonElement>('[data-menu]');
    const menu = document.querySelector<HTMLElement>('[data-menu-panel]');
    if (!toggle || !menu || menu.hidden) return;
    toggle.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    menu.classList.remove('is-open');
    document.body.classList.remove('nav-open');
  });
}

document.addEventListener('astro:page-load', boot);
