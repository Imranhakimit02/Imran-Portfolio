'use strict';

// The page content lives in HTML; JavaScript only enhances the controls.
document.documentElement.classList.add('js');
const menu = document.querySelector('#menu');
const links = document.querySelector('#links');
function closeMenu() {
  links?.classList.remove('is-open');
  menu?.setAttribute('aria-expanded', 'false');
}
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  links.classList.toggle('is-open', open);
});
links?.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const themeButton = document.querySelector('#theme-toggle');
function applyTheme(dark) {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  themeButton.textContent = dark ? 'Light mode' : 'Dark mode';
  themeButton.setAttribute('aria-pressed', String(dark));
}
let dark = false;
try { dark = localStorage.getItem('portfolio-theme') === 'dark'; } catch {}
applyTheme(dark);
themeButton?.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme !== 'dark';
  applyTheme(next);
  try { localStorage.setItem('portfolio-theme', next ? 'dark' : 'light'); } catch {}
});

const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
  });
}));

document.querySelectorAll('[data-project]').forEach(button => {
  const dialog = document.querySelector('#case-' + button.dataset.project);
  button.addEventListener('click', () => dialog.showModal());
  dialog.querySelector('.close-case').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => button.focus());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
});

document.querySelector('#copy')?.addEventListener('click', async () => {
  const status = document.querySelector('#status');
  try {
    await navigator.clipboard.writeText('imranhakimit02@gmail.com');
    status.textContent = 'Email copied.';
  } catch { status.textContent = 'Please copy: imranhakimit02@gmail.com'; }
});

const formatButtons = document.querySelectorAll('.resume-views button');
const webResume = document.querySelector('.resume-layout');
const pdfResume = document.querySelector('#resume-pdf');
const density = document.querySelector('.resume-density');
formatButtons.forEach((button, index) => button.addEventListener('click', () => {
  formatButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  webResume.hidden = index === 1;
  pdfResume.hidden = index === 0;
  density.hidden = index === 1;
  if (index === 1) {
    const frame = pdfResume.querySelector('iframe');
    if (!frame.getAttribute('src')) frame.src = frame.dataset.src;
  }
}));
density?.addEventListener('click', () => {
  const compact = document.querySelector('.resume-sheet').classList.toggle('is-compact');
  density.setAttribute('aria-pressed', String(compact));
  density.textContent = compact ? 'Show full details' : 'Show highlights';
});
