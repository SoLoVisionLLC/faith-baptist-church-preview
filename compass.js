/* Native radio navigation keeps every gathering readable without JavaScript. */
document.querySelectorAll('.compass').forEach((compass) => {
  const status = compass.querySelector('.compass-status');
  const announce = () => {
    status.textContent = `${compass.querySelector('input:checked').value} selected.`;
  };
  announce();
  status.hidden = false;
  compass.addEventListener('change', (event) => {
    if (event.target.matches('input[name="gathering"]')) {
      announce();
    }
  });
});
