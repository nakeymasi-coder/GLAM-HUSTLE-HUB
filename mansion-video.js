/* Progressive enhancement: the original artwork and all navigation work alone.
   Leave data-src empty to disable video without changing the scene or links. */
(() => {
  const video = document.getElementById('mansionVideo');
  const sound = document.getElementById('mansionSound');
  const control = document.getElementById('mansionMotion');
  if (!video || !control || !document.body.classList.contains('mansion-home')) return;
  const source = video.dataset.src?.trim();
  if (!source || !video.canPlayType('video/mp4')) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const saveData = Boolean(navigator.connection?.saveData);
  let wantsMotion = !reducedMotion.matches && !saveData;
  let failed = false;
  let loaded = false;
  let preference = null;
  try { preference = sessionStorage.getItem('glam-mansion-motion'); } catch { /* Storage is optional. */ }
  if (preference === 'paused') wantsMotion = false;

  // Set before assigning a source: mobile browsers require muted inline video.
  video.muted = true;
  video.defaultMuted = true;
  video.loop = true;
  video.playsInline = true;
  control.hidden = false;
  if (sound) sound.hidden = false;

  const rooms = [...document.querySelectorAll('.mansion-hotspot')];
  const portals = [...document.querySelectorAll('.portal-hotspot')];
  const bundlesPanel = document.querySelector('.bundles-panel-link');
  const hint = document.querySelector('.room-hint-desktop');
  function updateDestinations() {
    const showingVideo = !video.hidden;
    if (bundlesPanel) bundlesPanel.hidden = !showingVideo || video.currentTime < 3.2 || video.currentTime >= 4.9;
    rooms.forEach(room => { room.hidden = showingVideo; });
    // The named portals settle into these positions only after the reveal.
    portals.forEach(portal => { portal.hidden = showingVideo && video.currentTime < 7; });
    if (hint) hint.textContent = showingVideo
      ? 'Explore the Hub to choose your destination'
      : 'Choose a portal, or explore the Hub';
  }
  video.addEventListener('timeupdate', updateDestinations);
  video.addEventListener('seeking', updateDestinations);
  function updateControl() {
    updateDestinations();
    control.textContent = video.ended ? 'Replay welcome' : video.paused ? 'Play animation' : 'Pause animation';
    if (sound) sound.textContent = video.muted ? 'Hear the welcome' : 'Mute welcome';
  }
  function canRun() { return wantsMotion && !failed && !document.hidden; }
  function remember() {
    try { sessionStorage.setItem('glam-mansion-motion', wantsMotion ? 'playing' : 'paused'); } catch { /* Optional. */ }
  }
  function showStill() {
    failed = true;
    wantsMotion = false;
    video.pause();
    video.hidden = true;
    updateDestinations();
    control.hidden = true;
    if (sound) sound.hidden = true;
  }
  async function start() {
    if (!canRun()) return;
    if (!loaded) {
      loaded = true;
      video.src = source;
    }
    try {
      await video.play();
      if (!canRun()) video.pause();
    } catch {
      // An interrupted background-tab play is harmless; an autoplay block
      // leaves a usable Play button over the still image.
      if (canRun()) wantsMotion = false;
      updateControl();
    }
  }
  function reconcile() {
    if (canRun()) void start();
    else video.pause();
    updateControl();
  }

  video.addEventListener('playing', () => {
    if (!canRun()) { video.pause(); return; }
    video.hidden = false;
    updateControl();
  });
  video.addEventListener('pause', updateControl);
  video.addEventListener('error', showStill);
  video.addEventListener('ended', () => { wantsMotion = false; updateControl(); });
  if (sound) sound.addEventListener('click', () => {
    video.muted = !video.muted;
    video.loop = video.muted;
    if (!video.muted) {
      video.currentTime = 0;
      wantsMotion = true;
      remember();
      reconcile();
    }
    updateControl();
  });
  control.addEventListener('click', () => {
    wantsMotion = !wantsMotion;
    remember();
    reconcile();
  });
  document.addEventListener('visibilitychange', reconcile);
  window.addEventListener('pagehide', () => video.pause());
  window.addEventListener('pageshow', reconcile);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) {
      wantsMotion = false;
      reconcile();
    }
  });
  reconcile();
})();
