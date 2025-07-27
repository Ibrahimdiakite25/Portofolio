// Mode sombre/clair avec sauvegarde
const darkToggle = document.querySelector('.dark-toggle');
if (!localStorage.getItem('theme')) {
  document.body.classList.add('dark');
}
if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark');
  }
}

// Menu burger responsive + fermeture auto après clic
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
      burger.classList.remove('toggle');
    });
  });
}

// Scroll fluide pour les liens internes
// (évite le scroll fluide sur les liens externes ou vides)
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Effet sticky + ombre sur la navbar au scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Focus sur le lien actif dans la navbar
function setActiveNavLink() {
  const links = document.querySelectorAll('.nav-links a');
  let found = false;
  links.forEach(link => {
    link.classList.remove('active');
    const section = document.querySelector(link.getAttribute('href'));
    if (section && !found) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 80 && rect.bottom > 80) {
        link.classList.add('active');
        found = true;
      }
    }
  });
}
window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('DOMContentLoaded', setActiveNavLink);

// Apparition animée du profil (texte + photo)
document.addEventListener('DOMContentLoaded', () => {
  const heroText = document.querySelector('.hero-text');
  const heroProfile = document.querySelector('.hero-profile-card');
  if (heroText) {
    heroText.style.opacity = 0;
    heroText.style.transform = 'translateY(40px)';
    setTimeout(() => {
      heroText.style.transition = 'opacity 0.7s, transform 0.7s';
      heroText.style.opacity = 1;
      heroText.style.transform = 'translateY(0)';
    }, 200);
  }
  if (heroProfile) {
    heroProfile.style.opacity = 0;
    heroProfile.style.transform = 'scale(0.8)';
    setTimeout(() => {
      heroProfile.style.transition = 'opacity 0.7s, transform 0.7s';
      heroProfile.style.opacity = 1;
      heroProfile.style.transform = 'scale(1)';
    }, 500);
  }
});

// Effet machine à écrire sur le sous-titre du header
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
document.addEventListener('DOMContentLoaded', () => {
  const headerH2 = document.querySelector('.hero-text h2');
  if (headerH2) {
    const originalText = headerH2.textContent;
    setTimeout(() => {
      typeWriter(headerH2, originalText, 60);
    }, 800);
  }
});

// Animation douce sur les boutons du profil
const heroBtns = document.querySelectorAll('.hero-buttons .btn');
heroBtns.forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px) scale(1.04)';
    this.style.boxShadow = '0 4px 18px #3a8dde30';
    this.style.transition = 'all 0.2s';
  });
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '';
  });
});

// Animation au scroll (apparition des sections)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);
document.addEventListener('DOMContentLoaded', () => {
  const elementsToAnimate = document.querySelectorAll('.skill-item, .education-list li, .timeline-item, .contact-info > div');
  elementsToAnimate.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
});

// Animation des icônes sociales (contact)
document.querySelectorAll('.contact-info i, .contact-socials a').forEach(link => {
  link.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px) scale(1.08)';
    this.style.transition = 'transform 0.2s';
  });
  link.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Animation hover sur les cartes (compétences, formation, expérience)
document.querySelectorAll('.skill-item, .education-list li, .timeline-content').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
    this.style.boxShadow = '0 4px 24px #3a8dde30';
    this.style.transition = 'all 0.2s';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '';
  });
});

// Formulaire de contact (validation + alerte)
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const values = Array.from(formData.values());
    if (values.some(v => !v)) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    alert('Message envoyé avec succès ! Je vous répondrai bientôt.');
    this.reset();
  });
}

// Préchargement d’images (optionnel)
function preloadImages() {
  const imageUrls = [
    // Ajoute ici les URLs de tes images si besoin
  ];
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}
preloadImages();

// Gestion des erreurs JS
window.addEventListener('error', (e) => {
  console.error('Erreur JavaScript:', e.error);
});

// Performance monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`Page chargée en ${loadTime.toFixed(2)}ms`);
}); 