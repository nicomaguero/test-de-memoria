document.addEventListener('DOMContentLoaded', () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mainNav = document.getElementById('main-nav');

  if (hamburgerBtn && mainNav) {
    hamburgerBtn.addEventListener('click', () => {
      // Alterna la clase 'is-open' en el menú de navegación para mostrarlo/ocultarlo
      mainNav.classList.toggle('is-open');
    });
  }
});