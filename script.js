// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Simple form submit
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you! Your message has been sent.');
  e.target.reset();
});

// Smooth scroll for older browsers (optional)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Scroll-triggered block reveal animations =====
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');

      // If a skill card just revealed, animate its progress bar too
      const bar = entry.target.querySelector('.bar');
      if (bar) {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, 150);
        });
      }

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ===== Preloader =====
const preloader = document.getElementById('preloader');
document.body.classList.add('is-loading');

const MIN_PRELOAD_TIME = 1400; // ms — guarantees the loading screen is actually seen
const startTime = Date.now();

function hidePreloader() {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(MIN_PRELOAD_TIME - elapsed, 0);
  setTimeout(() => {
    preloader.classList.add('loaded');
    document.body.classList.remove('is-loading');
  }, remaining);
}

if (document.readyState === 'complete') {
  hidePreloader();
} else {
  window.addEventListener('load', hidePreloader);
}

// ===== Custom cursor =====
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (!isTouchDevice && cursorDot && cursorRing) {
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
    cursorDot.classList.add('active');
    cursorRing.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    cursorDot.classList.remove('active');
    cursorRing.classList.remove('active');
  });

  // Smooth trailing ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Grow the ring on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, input, textarea');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });
}