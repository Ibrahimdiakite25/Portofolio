// Scroll fluide pour les liens internes
// (évite le scroll fluide sur les liens externes ou vides)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Ferme le menu mobile après clic
      const navLinks = document.querySelector('.nav-links');
      const burger = document.querySelector('.burger');
      if (navLinks && burger && navLinks.classList.contains('nav-active')) {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
      }
    }
  });
});

// Menu burger responsive
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });
}

// Toggle dark mode
const darkToggle = document.querySelector('.dark-toggle');
// Par défaut, activer le mode sombre si aucun choix utilisateur
if (!localStorage.getItem('theme')) {
  document.body.classList.add('dark');
}
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Optionnel : sauvegarde le choix dans le localStorage
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
  // Appliquer le thème sauvegardé au chargement
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark');
  }
} 