/**
 * SnippetUI - Core Application Controller
 */
import './style.css';
import './mobile.css';
import { renderLanding } from './landing.js';
import { renderLibrary } from './library.js';
import { renderExtensionShowcase } from './extension.js';
import { renderPrivacy } from './privacy.js';
import { renderTerms } from './terms.js';
import { render404 } from './error404.js';
import Lenis from 'lenis';

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
let currentPage = null; // Store active page instance with destroy hooks
let globalLenis = null;  // Store global Lenis scroll controller

function closeMobileMenu() {
  mobileToggle.classList.remove('active');
  navMenu.classList.remove('active');
  const bars = mobileToggle.querySelectorAll('.bar');
  bars.forEach(bar => {
    bar.style.transform = 'none';
    bar.style.opacity = '1';
  });
}

// 1. Core Routing Manager
function navigate(target) {
  // Clear any existing active mobile menu states
  closeMobileMenu();

  // Prevent redundant renders
  if (currentView === target) return;

  // Clean up previous page resources before rendering new one
  if (currentPage && typeof currentPage.destroy === 'function') {
    currentPage.destroy();
  }

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
  let title = 'SnippetUI | Premium CSS & HTML Components Library';
  if (target.startsWith('library')) {
    navbar.style.display = 'none';
    appContainer.classList.remove('with-nav');
    appContainer.classList.add('no-nav');
    document.body.classList.add('library-page-active');

    // Destroy global Lenis scroll tracking to avoid viewport conflicts
    if (globalLenis) {
      globalLenis.destroy();
      globalLenis = null;
    }

    const parts = target.split('?');
    const category = parts[1]?.split('=')[1] || 'all';
    page = renderLibrary(navigate, category);
    window.location.hash = target;
    title = 'Components Library | SnippetUI';
  } else if (target === 'extension') {
    navbar.style.display = 'none';
    appContainer.classList.remove('with-nav');
    appContainer.classList.add('no-nav');
    document.body.classList.remove('library-page-active');

    // Lazy initialize global Lenis on window if not exists
    if (!globalLenis) {
      globalLenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        duration: 1.2
      });
    }
    // Resume global Lenis scroll tracking
    globalLenis.start();

    page = renderExtensionShowcase(navigate);
    window.location.hash = 'extension';
    title = 'VS Code Extension Integration | SnippetUI';
  } else if (target === 'privacy') {
    navbar.style.display = 'block';
    appContainer.classList.remove('no-nav');
    appContainer.classList.add('with-nav');
    document.body.classList.remove('library-page-active');

    // Lazy initialize global Lenis on window if not exists
    if (!globalLenis) {
      globalLenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        duration: 1.2
      });
    }
    // Resume global Lenis scroll tracking
    globalLenis.start();

    page = renderPrivacy(navigate);
    window.location.hash = 'privacy';
    title = 'Privacy Policy | SnippetUI';
  } else if (target === 'terms') {
    navbar.style.display = 'block';
    appContainer.classList.remove('no-nav');
    appContainer.classList.add('with-nav');
    document.body.classList.remove('library-page-active');

    // Lazy initialize global Lenis on window if not exists
    if (!globalLenis) {
      globalLenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        duration: 1.2
      });
    }
    // Resume global Lenis scroll tracking
    globalLenis.start();

    page = renderTerms(navigate);
    window.location.hash = 'terms';
    title = 'Terms of Service | SnippetUI';
  } else if (target === '404') {
    navbar.style.display = 'block';
    appContainer.classList.remove('no-nav');
    appContainer.classList.add('with-nav');
    document.body.classList.remove('library-page-active');

    // Lazy initialize global Lenis on window if not exists
    if (!globalLenis) {
      globalLenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        duration: 1.2
      });
    }
    // Resume global Lenis scroll tracking
    globalLenis.start();

    page = render404(navigate);
    window.location.hash = '404';
    title = 'Page Not Found | SnippetUI';
  } else {
    navbar.style.display = 'block';
    appContainer.classList.remove('no-nav');
    appContainer.classList.add('with-nav');
    document.body.classList.remove('library-page-active');

    // Lazy initialize global Lenis on window if not exists
    if (!globalLenis) {
      globalLenis = new Lenis({
        autoRaf: true,
        lerp: 0.09,
        duration: 1.2
      });
    }
    // Resume global Lenis scroll tracking
    globalLenis.start();

    page = renderLanding(navigate);
    window.location.hash = 'landing';
    title = 'SnippetUI | Premium CSS & HTML Components Library';
  }
  currentPage = page;
  document.title = title;

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

// 2. Reactive Scroll sizing capsule Navbar Animation & Scroll Spy
function updateNavbarActiveLink() {
  if (currentView !== 'landing') return;

  const sections = [
    { id: 'landing', link: document.querySelector('.nav-link[data-target="landing"]') },
    { id: 'pipeline-section', link: document.querySelector('a[href="#pipeline-section"]') },
    { id: 'categories-scroll-track', link: document.querySelector('a[href="#categories-scroll-track"]') },
    { id: 'extension-section', link: document.querySelector('a[href="#extension-section"]') },
    { id: 'faq-section', link: document.querySelector('a[href="#faq-section"]') }
  ];

  let activeSectionId = 'landing';

  sections.forEach(sec => {
    if (!sec.link) return;
    let element;
    if (sec.id === 'landing') {
      element = document.querySelector('.hero-section');
    } else {
      element = document.getElementById(sec.id);
    }
    
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.45) {
        activeSectionId = sec.id;
      }
    }
  });

  sections.forEach(sec => {
    if (!sec.link) return;
    if (sec.id === activeSectionId) {
      sec.link.classList.add('active');
    } else {
      sec.link.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateNavbarActiveLink();
});

// 3. Setup Navigation Event Listeners
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const target = link.getAttribute('data-target');
    if (target) {
      e.preventDefault();
      closeMobileMenu();
      navigate(target);
    }
  });
});

// Intercept scroll anchors with Lenis smooth scroll
document.querySelectorAll('.nav-anchor').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    closeMobileMenu();
    const hash = anchor.getAttribute('href');
    
    if (currentView !== 'landing') {
      navigate('landing');
      
      // Let the landing page render, then scroll smoothly
      setTimeout(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement && globalLenis) {
          globalLenis.scrollTo(targetElement);
        } else if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    } else {
      const targetElement = document.querySelector(hash);
      if (targetElement && globalLenis) {
        globalLenis.scrollTo(targetElement);
      } else if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Brand Logo & CTAs triggers
brandLogo.addEventListener('click', (e) => {
  e.preventDefault();
  closeMobileMenu();
  navigate('landing');
});

btnBrowseCta.addEventListener('click', (e) => {
  e.preventDefault();
  closeMobileMenu();
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
  } else if (hash === '#extension') {
    navigate('extension');
  } else if (hash === '#privacy') {
    navigate('privacy');
  } else if (hash === '#terms') {
    navigate('terms');
  } else if (hash === '#404') {
    navigate('404');
  } else if (hash === '' || hash === '#landing') {
    navigate('landing');
  } else {
    navigate('404');
  }
}

// Window load and hashchange hooks
window.addEventListener('DOMContentLoaded', handleHashRoute);
window.addEventListener('hashchange', handleHashRoute);
