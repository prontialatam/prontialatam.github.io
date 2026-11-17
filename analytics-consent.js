(function () {
  const measurementId = 'G-4MC4F75SM6';
  const storageKey = 'implandent_analytics_consent';
  const english = document.documentElement.lang === 'en';
  let loaded = false;

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    document.head.appendChild(script);
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const method = href.includes('wa.me/') ? 'whatsapp' : href.startsWith('tel:') ? 'phone' : href.startsWith('mailto:') ? 'email' : null;
      if (method) window.gtag('event', 'contact_click', { contact_method: method });
    });
  }

  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach(function (part) {
      const name = part.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name)) return;
      document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
      document.cookie = name + '=; Max-Age=0; path=/; domain=.implandentrd.com; SameSite=Lax';
    });
  }

  function showBanner() {
    if (document.getElementById('analytics-consent')) return;
    const banner = document.createElement('aside');
    banner.id = 'analytics-consent';
    banner.setAttribute('aria-label', english ? 'Analytics privacy choices' : 'Opciones de privacidad de analítica');
    banner.innerHTML = '<div><strong>' + (english ? 'Your privacy matters' : 'Tu privacidad importa') + '</strong><p>' +
      (english ? 'With your permission, Google Analytics helps us understand visits and improve this website. No analytics loads until you choose to accept.' : 'Con tu permiso, Google Analytics nos ayuda a conocer las visitas y mejorar esta web. La analítica no se carga hasta que decidas aceptarla.') +
      ' <a href="' + (english ? '/en/privacy/' : '/privacidad/') + '">' + (english ? 'Privacy policy' : 'Política de privacidad') + '</a>.</p></div><div class="analytics-consent-actions"><button type="button" data-choice="denied">' +
      (english ? 'Necessary only' : 'Solo necesarias') + '</button><button type="button" data-choice="granted">' +
      (english ? 'Accept analytics' : 'Aceptar analítica') + '</button></div>';
    banner.addEventListener('click', function (event) {
      const button = event.target.closest('[data-choice]');
      if (!button) return;
      const choice = button.getAttribute('data-choice');
      localStorage.setItem(storageKey, choice);
      window['ga-disable-' + measurementId] = choice !== 'granted';
      banner.remove();
      if (choice === 'granted') loadAnalytics();
      else clearAnalyticsCookies();
    });
    document.body.appendChild(banner);
  }

  function init() {
    const saved = localStorage.getItem(storageKey);
    if (saved === 'granted') loadAnalytics();
    else if (!saved) showBanner();
    const footer = document.querySelector('footer');
    if (footer && !footer.querySelector('.analytics-preferences')) {
      const link = document.createElement('button');
      link.className = 'analytics-preferences';
      link.type = 'button';
      link.textContent = english ? 'Cookie preferences' : 'Preferencias de cookies';
      link.addEventListener('click', showBanner);
      footer.appendChild(link);
    }
  }

  if (document.readyState === 'complete') window.setTimeout(init, 800);
  else window.addEventListener('load', function () { window.setTimeout(init, 800); }, { once: true });
})();
