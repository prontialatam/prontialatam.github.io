(() => {
  const buttons = [...document.querySelectorAll('[role="tab"]')];
  function activate(tab, focus = false) {
    for (const button of buttons) {
      const active = button === tab;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      document.getElementById(button.getAttribute('aria-controls')).hidden = !active;
    }
    if (focus) tab.focus();
  }
  for (const [index, button] of buttons.entries()) {
    button.addEventListener('click', () => activate(button));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowRight','ArrowLeft','Home','End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
      activate(buttons[next], true);
    });
  }
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-header .desktop-nav');
  const menuIcon = toggle?.innerHTML;
  nav?.querySelectorAll('a').forEach((link) => link.setAttribute('aria-label', link.textContent.trim()));
  function setMenuOpen(open) {
    document.body.classList.toggle('tourism-menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    toggle.innerHTML = open
      ? '<svg aria-hidden="true" viewBox="0 0 24 24" width="25" height="25" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>'
      : menuIcon;
    if (open) {
      const headerHeight = document.querySelector('.header-inner')?.getBoundingClientRect().height || 74;
      nav.style.setProperty('--mobile-menu-top', `${headerHeight}px`);
    }
  }
  toggle?.addEventListener('click', () => {
    setMenuOpen(!document.body.classList.contains('tourism-menu-open'));
  });
  nav?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenuOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && document.body.classList.contains('tourism-menu-open')) {
      setMenuOpen(false);
      toggle.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && document.body.classList.contains('tourism-menu-open')) setMenuOpen(false);
  });
})();
