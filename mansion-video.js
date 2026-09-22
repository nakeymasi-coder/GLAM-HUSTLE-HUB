/* Progressive enhancement: the original artwork and all navigation work alone.
   Leave data-src empty to disable video without changing the scene or links. */
(() => {
  const video = document.getElementById('mansionVideo');
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

  function updateControl() {
    control.textContent = video.paused ? 'Play animation' : 'Pause animation';
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
    control.hidden = true;
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
