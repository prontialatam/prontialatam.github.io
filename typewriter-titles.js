(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const selector = 'h1:not(.type-heading), h2:not(.type-heading), h3:not(.type-heading)';
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('typewriter-title-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });

  function register(root) {
    const headings = root.matches?.(selector) ? [root] : root.querySelectorAll?.(selector);
    if (!headings) return;
    for (const heading of headings) {
      if (heading.classList.contains('typewriter-title-ready')) continue;
      const length = [...(heading.textContent || '').trim()].length;
      if (!length) continue;
      heading.style.setProperty('--type-steps', String(Math.min(length, 70)));
      heading.style.setProperty('--type-duration', `${Math.min(2.4, Math.max(0.75, length * 0.045)).toFixed(2)}s`);
      heading.classList.add('typewriter-title-ready');
      observer.observe(heading);
    }
  }

  function revealVisible() {
    document.querySelectorAll('.typewriter-title-ready:not(.typewriter-title-visible)').forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        heading.classList.add('typewriter-title-visible');
        observer.unobserve(heading);
      }
    });
  }

  function start() {
    register(document);
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) register(node);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    window.__implandentTypewriter = { observer, mutations };
    window.addEventListener('scroll', revealVisible, { passive: true });
    window.addEventListener('resize', revealVisible, { passive: true });
    requestAnimationFrame(revealVisible);
  }

  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
})();
