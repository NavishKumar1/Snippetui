/**
 * SnippetUI - Core Application Controller
 */
import './style.css';
import { renderLanding } from './landing.js';
import { renderLibrary } from './library.js';

// Elements Cache
const appContainer = document.getElementById('app');
const navbar = document.getElementById('main-navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const brandLogo = document.getElementById('brand-logo');
const btnBrowseCta = document.getElementById('btn-browse-cta');

// Global Router State
let currentView = null; // 'landing' or 'library'

// 1. Core Routing Manager
function navigate(target) {
  // Clear any existing active mobile menu states
  mobileToggle.classList.remove('active');
  navMenu.classList.remove('active');

  // Prevent redundant renders
  if (currentView === target) return;
  currentView = target;

  // Sync active states on navigation links
  navLinks.forEach(link => {
    if (link.getAttribute('data-target') === target) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Render view & Navbar visibility coordination
  let page;
  if (target.startsWith('library')) {
    navbar.style.display = 'none';
    appContainer.classList.remove('with-nav');
    appContainer.classList.add('no-nav');
    document.body.classList.add('library-page-active');
    const parts = target.split('?');
    const category = parts[1]?.split('=')[1] || 'all';
    page = renderLibrary(navigate, category);
    window.location.hash = target;
  } else {
    navbar.style.display = 'block';
    appContainer.classList.remove('no-nav');
    appContainer.classList.add('with-nav');
    document.body.classList.remove('library-page-active');
    page = renderLanding(navigate);
    window.location.hash = 'landing';
  }

  // Smooth fade transition between pages
  appContainer.style.opacity = 0;
  appContainer.style.transform = 'translateY(10px)';
  appContainer.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

  setTimeout(() => {
    appContainer.innerHTML = page.html;
    page.init(appContainer);
    
    // Fade in
    appContainer.style.opacity = 1;
    appContainer.style.transform = 'translateY(0)';
  }, 200);

  // Scroll to top on new page load
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// 2. Reactive Scroll sizing capsule Navbar Animation
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// 3. Setup Navigation Event Listeners
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const target = link.getAttribute('data-target');
    if (target) {
      e.preventDefault();
      navigate(target);
    }
  });
});

// Brand Logo & CTAs triggers
brandLogo.addEventListener('click', (e) => {
  e.preventDefault();
  navigate('landing');
});

btnBrowseCta.addEventListener('click', (e) => {
  e.preventDefault();
  navigate('library');
});

// 4. Mobile Burger menu toggle
mobileToggle.addEventListener('click', () => {
  mobileToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  
  // Transform burger bar animations
  const bars = mobileToggle.querySelectorAll('.bar');
  if (mobileToggle.classList.contains('active')) {
    bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
  } else {
    bars[0].style.transform = 'none';
    bars[1].style.opacity = '1';
    bars[2].style.transform = 'none';
  }
});

// 5. Initial Hash Routing resolution
function handleHashRoute() {
  const hash = window.location.hash;
  if (hash.startsWith('#library')) {
    const parts = hash.substring(1).split('?');
    const category = parts[1]?.split('=')[1] || 'all';
    navigate(`library?category=${category}`);
  } else {
    navigate('landing');
  }
}

// Window load and hashchange hooks
window.addEventListener('DOMContentLoaded', handleHashRoute);
window.addEventListener('hashchange', handleHashRoute);
