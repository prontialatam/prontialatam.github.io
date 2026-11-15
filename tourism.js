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
  toggle?.addEventListener('click', () => {
    const open = document.body.classList.toggle('tourism-menu-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
})();
