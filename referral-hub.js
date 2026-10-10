/* Progressive enhancement: the Muse code remains readable without JavaScript. */
(() => {
  const button = document.getElementById('copy-muse-code');
  const code = document.getElementById('muse-referral-code');
  const status = document.getElementById('muse-copy-status');
  if (!button || !code || !status) return;

  button.hidden = false;
  button.addEventListener('click', async () => {
    if (button.disabled) return;
    button.disabled = true;
    status.textContent = '';
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(code.textContent.trim());
      status.textContent = 'Copied. Enter this code in your Muse referral settings.';
    } catch {
      status.textContent = 'Copy is unavailable. Select and copy the code OTPX5R above.';
    } finally {
      button.disabled = false;
    }
  });
})();
