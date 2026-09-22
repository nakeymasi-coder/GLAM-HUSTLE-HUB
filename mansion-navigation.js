/* Shared navigation for the mansion home and its separate destination pages.
   The legacy published homepage runtime intentionally does not run here. */
(() => {
  const config = window.GLAM_SITE_CONFIG || {};
  const links = { ...(config.links || {}) };
  links.support = config.support?.url || links.helpSupport;
  links.contact = links.contactEmail ? `mailto:${links.contactEmail}` : null;
  document.querySelectorAll('[data-config-link]').forEach((link) => {
    const href = links[link.dataset.configLink];
    if (typeof href === 'string' && href.trim() && href !== '#') link.href = href;
  });

  // Keep old bookmarks working after homepage sections move to their own pages.
  if (document.body.classList.contains('mansion-home')) {
    const legacyRoutes = { '#best': './best-sellers.html', '#about': './about.html', '#reviews': './reviews.html' };
    const route = legacyRoutes[window.location.hash];
    if (route) window.location.replace(route);
  }

  const drawer = document.getElementById('drawer');
  const shade = document.getElementById('shade');
  const trigger = document.getElementById('openDrawer');
  const close = document.getElementById('closeDrawer');
  if (!drawer || !shade || !trigger || !close) return;
  const background = [document.querySelector('header'), document.querySelector('main'), document.querySelector('footer')].filter(Boolean);
  let previousOverflow = '';

  function closeMenu() {
    drawer.hidden = true;
    drawer.inert = true;
    drawer.classList.remove('open');
    shade.hidden = true;
    shade.classList.remove('on');
    trigger.setAttribute('aria-expanded', 'false');
    background.forEach(element => { element.inert = false; });
    document.body.style.overflow = previousOverflow;
    trigger.focus();
  }

  trigger.addEventListener('click', () => {
    previousOverflow = document.body.style.overflow;
    background.forEach(element => { element.inert = true; });
    drawer.hidden = false;
    drawer.inert = false;
    shade.hidden = false;
    drawer.classList.add('open');
    shade.classList.add('on');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    close.focus();
  });
  close.addEventListener('click', closeMenu);
  shade.addEventListener('click', closeMenu);
  drawer.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (drawer.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(); }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(drawer.querySelectorAll('button, a[href]'));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
})();
