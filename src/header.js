import { initI18n } from './i18n.js';

export function initHeader() {
  initI18n();

  const langDropdown = document.getElementById('lang-dropdown');
  const langToggle = document.getElementById('lang-toggle');
  const langMenu = document.getElementById('lang-menu');
  if (!langDropdown || !langToggle || !langMenu) return;

  langToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
  });
  langMenu.querySelectorAll('.lang-option').forEach((link) => {
    link.addEventListener('click', () => {
      langDropdown.classList.remove('open');
    });
  });
  document.addEventListener('click', () => langDropdown.classList.remove('open'));
}
