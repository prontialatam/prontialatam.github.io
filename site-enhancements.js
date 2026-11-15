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
    const treatmentPhotos = {
      'implantes-dentales': Array.from({ length: 9 }, (_, index) => `/images/drive/case-implant-${index}.jpg`),
      'dental-implants': Array.from({ length: 9 }, (_, index) => `/images/drive/case-implant-${index}.jpg`),
      'protesis-dentales': ['/images/drive/case-cover-protesis.jpg', '/images/drive/case-protesis-1.jpg'],
      'dental-prosthetics': ['/images/drive/case-cover-protesis.jpg', '/images/drive/case-protesis-1.jpg'],
      'periodoncia': ['/images/drive/periodoncia-2026-1.jpg', '/images/drive/periodoncia-2026-2.jpg'],
      'periodontics': ['/images/drive/periodoncia-2026-1.jpg', '/images/drive/periodoncia-2026-2.jpg'],
      'ortodoncia': ['/images/drive/case-ortho-0.jpg', '/images/drive/case-ortho-1.jpg', '/images/drive/case-ortho-2.jpg'],
      'orthodontics': ['/images/drive/case-ortho-0.jpg', '/images/drive/case-ortho-1.jpg', '/images/drive/case-ortho-2.jpg'],
      'cirugia-bucal': ['/images/drive/case-cover-cirugia.jpg'],
      'oral-surgery': ['/images/drive/case-cover-cirugia.jpg'],
      'odontopediatria': ['/images/drive/cristal-naomi-clinic.png'],
      'pediatric-dentistry': ['/images/drive/cristal-naomi-clinic.png'],
      'estetica-dental': ['/images/drive/case-cover-estetica.jpg', '/images/drive/case-estetica-1.jpg'],
      'aesthetic-dentistry': ['/images/drive/case-cover-estetica.jpg', '/images/drive/case-estetica-1.jpg'],
      'endodoncia': ['/images/drive/endodoncia-2026.jpg'],
      'endodontics': ['/images/drive/endodoncia-2026.jpg'],
    };
    const slug = location.pathname.split('/').filter(Boolean).at(-1);
    const photos = treatmentPhotos[slug];
    const carousel = document.querySelector('.dual-carousel');
    if (!photos || !carousel || document.querySelector('.clinical-treatment-gallery')) return;
    const treatmentName = document.querySelector('h1 .sr-only')?.textContent?.trim() || document.title.split('|')[0].trim() || (en ? 'Treatment' : 'Tratamiento');
    carousel.hidden = true;
    carousel.setAttribute('aria-hidden', 'true');
    const gallery = document.createElement('div');
    gallery.className = 'clinical-treatment-gallery';
    gallery.innerHTML = `<div class="clinical-gallery-stage"><button type="button" class="clinical-gallery-open" aria-label="${en ? 'Enlarge clinical image' : 'Ampliar imagen clínica'}"><img alt="" src="${photos[0]}"><span aria-hidden="true">↗</span></button>${photos.length > 1 ? '<button type="button" class="clinical-gallery-prev" aria-label="' + (en ? 'Previous image' : 'Imagen anterior') + '">‹</button><button type="button" class="clinical-gallery-next" aria-label="' + (en ? 'Next image' : 'Imagen siguiente') + '">›</button>' : ''}</div><div class="clinical-gallery-meta"><span>${en ? 'IMPLANDENT · CLINICAL PHOTOGRAPHS' : 'IMPLANDENT · FOTOGRAFÍAS CLÍNICAS'}</span><span class="clinical-gallery-count"></span></div>${photos.length > 1 ? '<div class="clinical-gallery-thumbnails" aria-label="' + (en ? 'Clinical image gallery' : 'Galería de imágenes clínicas') + '"></div>' : ''}`;
    carousel.after(gallery);
    const stageImage = gallery.querySelector('.clinical-gallery-open img');
    const thumbnails = gallery.querySelector('.clinical-gallery-thumbnails');
    let current = 0;
    function render(index) {
      current = (index + photos.length) % photos.length;
      stageImage.src = photos[current];
      stageImage.alt = `${treatmentName} · ${en ? 'real clinical photograph' : 'fotografía clínica real'} ${current + 1}`;
      gallery.querySelector('.clinical-gallery-count').textContent = `${String(current + 1).padStart(2, '0')} / ${String(photos.length).padStart(2, '0')}`;
      thumbnails?.querySelectorAll('button').forEach((button, i) => {
        button.setAttribute('aria-current', String(i === current));
      });
    }
    if (thumbnails) {
      photos.forEach((src, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('aria-label', `${en ? 'Show image' : 'Ver imagen'} ${index + 1}`);
        button.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
        button.addEventListener('click', () => render(index));
        thumbnails.append(button);
      });
    }
    gallery.querySelector('.clinical-gallery-prev')?.addEventListener('click', () => render(current - 1));
    gallery.querySelector('.clinical-gallery-next')?.addEventListener('click', () => render(current + 1));
    gallery.querySelector('.clinical-gallery-open').addEventListener('click', () => {
      const dialog = document.createElement('dialog');
      dialog.className = 'clinical-gallery-dialog';
      dialog.innerHTML = `<button type="button" aria-label="${en ? 'Close image' : 'Cerrar imagen'}">×</button><img src="${photos[current]}" alt="${stageImage.alt}">`;
      document.body.append(dialog);
      dialog.querySelector('button').addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
      dialog.addEventListener('close', () => dialog.remove(), { once: true });
      dialog.showModal();
    });
    render(0);
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
