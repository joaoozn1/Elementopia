'use strict';

// Shared navigation has no dependency on customization controls or table data.
const menu = document.querySelector('.menu');
const navigation = document.querySelector('#main-navigation');
if (menu && navigation) {
  function setMenuOpen(open) {
    navigation.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  menu.addEventListener('click', () => setMenuOpen(menu.getAttribute('aria-expanded') !== 'true'));
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    setMenuOpen(false);
    // Only move focus for anchors belonging to the current page.
    if (matchMedia('(max-width: 900px)').matches && link.hash &&
        link.pathname === location.pathname && link.origin === location.origin) {
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header')) setMenuOpen(false);
  });
  matchMedia('(max-width: 900px)').addEventListener('change', () => setMenuOpen(false));
}
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
