(() => {
  const en = document.documentElement.lang === 'en';
  const travelPath = en ? '/en/dental-tourism/' : '/turismo-dental/';
  const legalPath = en ? '/en/legal-notice/' : '/aviso-legal/';
  const plane = '<svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 21h-3l-2-7-5 3v4h-2l-1-6.5L2 13v-2l2.5-1.5L5.5 3h2v4l5 3 2-7h3l-1 8 5 1v2l-5 1z"/></svg>';
  const instagram = '<svg aria-hidden="true" viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.7" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';

  function enhanceNav() {
    document.querySelectorAll('header nav').forEach((nav) => {
      if (nav.querySelector('[data-travel-nav]')) return;
      const link = document.createElement('a');
      link.href = travelPath;
      link.dataset.travelNav = 'true';
      link.innerHTML = `${plane}<span>${en ? 'Dental tourism' : 'Turismo Dental'}</span>`;
      if (location.pathname === travelPath) link.classList.add('nav-active');
      nav.append(link);
    });
  }

  function enhanceFooter() {
    document.querySelectorAll('.footer-grid').forEach((grid) => {
      const explore = [...grid.children].find((child) => /^(Explora|Explore)$/.test(child.querySelector('h3')?.textContent?.trim() || ''));
      explore?.remove();
      grid.classList.add('footer-grid-three');
      const hours = [...grid.children].find((child) => /^(Horario|Hours)$/.test(child.querySelector('h3')?.textContent?.trim() || ''));
      if (hours) {
        hours.querySelectorAll('strong').forEach((strong) => {
          if (strong.textContent?.includes('14:00')) strong.textContent = '2pm–6pm';
        });
        if (!hours.querySelector('[data-legal-link]')) {
          const legal = document.createElement('a');
          legal.href = legalPath;
          legal.dataset.legalLink = 'true';
          legal.textContent = en ? 'Legal notice' : 'Aviso Legal';
          hours.append(legal);
        }
      }
      const contact = [...grid.children].find((child) => /^(Contacto|Contact)$/.test(child.querySelector('h3')?.textContent?.trim() || ''));
      if (contact && !contact.querySelector('[data-instagram-link]')) {
        const link = document.createElement('a');
        link.href = 'https://www.instagram.com/ce.implandent/';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'footer-instagram';
        link.dataset.instagramLink = 'true';
        link.setAttribute('aria-label', 'Instagram de Implandent');
        link.innerHTML = `${instagram}<span>Instagram</span>`;
        contact.append(link);
      }
    });
  }

  function enhanceTreatments() {
    document.querySelectorAll('a[href="/tratamientos/endodoncia/"] img, a[href="/en/treatments/endodontics/"] img').forEach((img) => {
      img.src = '/images/drive/endodoncia-2026.jpg';
      img.alt = en ? 'Implandent endodontic clinical image' : 'Registro clínico de endodoncia de Implandent';
    });
    document.querySelectorAll('a[href="/tratamientos/periodoncia/"] img, a[href="/en/treatments/periodontics/"] img').forEach((img) => {
      img.src = '/images/drive/periodoncia-2026-2.jpg';
      img.alt = en ? 'Implandent periodontal clinical case' : 'Caso clínico de periodoncia de Implandent';
    });
    const path = location.pathname;
    const endo = /\/(endodoncia|endodontics)\/$/.test(path);
    const perio = /\/(periodoncia|periodontics)\/$/.test(path);
    if (!endo && !perio) return;
    document.querySelectorAll('.dual-carousel').forEach((carousel) => {
      carousel.classList.add('updated-clinical-carousel');
      const frames = carousel.querySelectorAll('.photo-frame');
      if (!frames.length) return;
      frames[0].querySelector('img').src = endo ? '/images/drive/endodoncia-2026.jpg' : '/images/drive/periodoncia-2026-1.jpg';
      frames[0].querySelector('img').alt = endo ? 'Endodoncia: registro clínico de Implandent' : 'Periodoncia: atención clínica en Implandent';
      if (frames[1]) {
        if (endo) frames[1].hidden = true;
        else {
          frames[1].querySelector('img').src = '/images/drive/periodoncia-2026-2.jpg';
          frames[1].querySelector('img').alt = 'Periodoncia: evolución clínica facilitada por Implandent';
        }
      }
      carousel.querySelectorAll('.photo-label').forEach((label) => { label.textContent = en ? 'Implandent clinical image' : 'Registro clínico Implandent'; });
      carousel.querySelector('.carousel-controls')?.remove();
    });
    document.body.classList.add(endo ? 'clinical-endo' : 'clinical-perio');
  }

  function enhanceCristal() {
    const card = [...document.querySelectorAll('.premium-team-person')].find((item) => /Cristal Naomi Bautista/i.test(item.querySelector('h3')?.textContent || ''));
    if (!card || card.dataset.cristalReady) return;
    card.dataset.cristalReady = 'true';
    const photo = card.querySelector('.premium-person-photo');
    if (!photo) return;
    photo.classList.add('cristal-carousel');
    const second = document.createElement('img');
    second.src = '/images/drive/cristal-naomi-clinic.png';
    second.alt = en ? 'Dr. Cristal Naomi Bautista with a pediatric patient' : 'Dra. Cristal Naomi Bautista con una paciente infantil';
    second.className = 'cristal-second-photo';
    second.loading = 'lazy';
    photo.append(second);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button button-outline doctor-story-trigger team-biography-trigger';
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-label', en ? 'Biography of Dr. Cristal Naomi Bautista' : 'Biografía de la Dra. Cristal Naomi Bautista');
    button.innerHTML = `${en ? 'Biography' : 'Biografía'}<span aria-hidden="true">↗</span>`;
    photo.append(button);
    button.addEventListener('click', () => openCristalBiography(button));
  }

  function openCristalBiography(trigger) {
    let dialog = document.getElementById('cristal-biography');
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'cristal-biography';
      dialog.className = 'cristal-biography-dialog';
      dialog.innerHTML = `<button type="button" class="cristal-dialog-close" aria-label="${en ? 'Close biography' : 'Cerrar biografía'}">×</button><div class="cristal-dialog-photo"><img src="/images/drive/cristal-naomi-clinic.png" alt="Dra. Cristal Naomi Bautista"/></div><div class="cristal-dialog-copy"><small>IMPLANDENT · ${en ? 'PEDIATRIC DENTISTRY' : 'ODONTOPEDIATRÍA'}</small><h2>${en ? 'Dr. Cristal Naomi Bautista' : 'Dra. Cristal Naomi Bautista'}</h2><p>${en ? 'I am Cristal Bautista Sánchez, a dentist who graduated from Universidad Nacional Pedro Henríquez Ureña (UNPHU) on July 19, 2017.' : 'Mi nombre es Cristal Bautista Sánchez, odontóloga egresada de la Universidad Nacional Pedro Henríquez Ureña (UNPHU) el 19 de julio de 2017.'}</p><p>${en ? 'I specialized in pediatric dentistry and care for patients with disabilities at Universidad Iberoamericana (UNIBE) in 2023.' : 'Especialista en Odontopediatría y manejo de pacientes con discapacidades por la Universidad Iberoamericana (UNIBE) en el año 2023.'}</p></div>`;
      document.body.append(dialog);
      dialog.querySelector('.cristal-dialog-close').addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    }
    dialog.showModal();
    dialog.addEventListener('close', () => trigger.focus(), { once: true });
  }

  function enhanceTourismTeaser() {
    const cases = document.getElementById('casos-clinicos');
    if (!cases || document.getElementById('turismo-dental')) return;
    const section = document.createElement('section');
    section.id = 'turismo-dental';
    section.className = 'premium-section tourism-teaser';
    section.innerHTML = `<div class="shell tourism-teaser-grid"><div class="tourism-teaser-copy"><span class="premium-overline">${en ? 'DENTAL TOURISM · LA ROMANA' : 'TURISMO DENTAL · LA ROMANA'}</span><h2>${en ? 'Travel for care. Return with a new <em>smile.</em>' : 'Viaja por tu salud. Regresa con una nueva <em>sonrisa.</em>'}</h2><p>${en ? 'Meet Dr. Carela and plan your dental care in La Romana, where clinical attention meets Dominican hospitality.' : 'Conoce al Dr. Carela y planifica tu atención odontológica en La Romana, donde el cuidado clínico se encuentra con la hospitalidad dominicana.'}</p><a class="button button-outline" href="${travelPath}">${en ? 'Explore dental tourism' : 'Explorar Turismo Dental'} ${plane}</a></div><a class="tourism-teaser-photo" href="${travelPath}" aria-label="${en ? 'Explore dental tourism' : 'Explorar Turismo Dental'}"><img src="/images/turismo/hero.png" alt="${en ? 'Illustrative Caribbean dental tourism scene' : 'Escena ilustrativa de turismo dental en el Caribe'}" loading="lazy"/></a></div>`;
    cases.before(section);
  }

  function enhance() {
    enhanceNav();
    enhanceFooter();
    enhanceTreatments();
    enhanceCristal();
    enhanceTourismTeaser();
  }

  function start() {
    enhance();
    let scheduled = false;
    const mutations = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => { scheduled = false; enhance(); });
    });
    mutations.observe(document.documentElement, { childList: true, subtree: true });
    window.__implandentEnhancements = mutations;
  }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
