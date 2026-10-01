// Progressive enhancement is isolated to the Glam Vault page. No checkout or account state is changed.
(() => {
  const page = document.querySelector('.vault-page');
  if (!page) return;

  if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
  const dialogs = new Map();
  const triggers = new WeakMap();
  let priorOverflow = '';

  page.querySelectorAll('.vault-detail').forEach(section => {
    const dialog = document.createElement('dialog');
    dialog.id = section.id;
    dialog.className = section.className;
    dialog.setAttribute('aria-labelledby', section.getAttribute('aria-labelledby'));
    while (section.firstChild) dialog.append(section.firstChild);
    section.replaceWith(dialog);
    dialogs.set(dialog.id, dialog);
    const close = dialog.querySelector('[data-close-dialog]');
    close.hidden = false;
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      // A hash change may have opened another dialog before this close event runs.
      if ([...dialogs.values()].some(item => item.open)) return;
      page.classList.remove('vault-dialog-open');
      document.documentElement.style.overflow = priorOverflow;
      const trigger = triggers.get(dialog);
      if (trigger?.isConnected) trigger.focus({preventScroll: true});
    });
  });

  function openDialog(dialog, trigger) {
    if (dialog.open) return;
    const current = [...dialogs.values()].find(item => item.open);
    if (current) current.close();
    triggers.set(dialog, trigger);
    if (!current) priorOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    page.classList.add('vault-dialog-open');
    document.documentElement.style.overflow = 'hidden';
    dialog.querySelector('.vault-detail-body').scrollTop = 0;
    dialog.querySelector('h2').focus({preventScroll: true});
  }
  page.querySelectorAll('[data-open-dialog]').forEach(trigger => {
    const dialog = dialogs.get(trigger.hash.slice(1));
    if (!dialog) return;
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', dialog.id);
    trigger.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      openDialog(dialog, trigger);
    });
  });

  // Preserve deep-link access without adding history entries for each pop-up.
  const openFromHash = () => {
    const dialog = dialogs.get(location.hash.slice(1));
    if (dialog) {
      const trigger = page.querySelector(`[aria-controls="${dialog.id}"]`);
      openDialog(dialog, trigger);
    } else {
      dialogs.forEach(item => { if (item.open) item.close(); });
    }
  };
  window.addEventListener('hashchange', openFromHash);
  window.addEventListener('pagehide', () => dialogs.forEach(item => { if (item.open) item.close(); }));
  openFromHash();
})();
