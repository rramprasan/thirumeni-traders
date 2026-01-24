// Duplicate gallery items for seamless loop once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Rewrite image paths from "images/..." to "assets/images/..."
  document.querySelectorAll('img[src^="images/"]').forEach((img) => {
    img.src = img.src.replace(/images\//, 'assets/images/');
  });
  // Update favicon if present
  const favicon = document.querySelector('link[rel="icon"][href^="images/"]');
  if (favicon) favicon.href = favicon.getAttribute('href').replace(/^images\//, 'assets/images/');

  // Duplicate gallery items for seamless loop
  const track = document.getElementById("galleryTrack");
  if (track) {
    const items = Array.from(track.children);
    items.forEach((item) => {
      track.appendChild(item.cloneNode(true));
    });
  }
});

// Initialize lucide icons
if (window.lucide && typeof window.lucide.createIcons === 'function') {
  window.lucide.createIcons();
}

// Mobile menu toggle with ARIA state
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileBtn?.addEventListener('click', () => {
  const nowHidden = mobileMenu.classList.toggle('hidden');
  mobileBtn.setAttribute('aria-expanded', (!nowHidden).toString());
});

// Set footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll progress bar + subtle parallax + back-to-top
const progressEl = document.getElementById('scrollProgressBar');
const progressWrap = document.getElementById('scrollProgress');
const heroBgEl = document.getElementById('heroBg');
const backToTopBtn = document.getElementById('backToTop');
let ticking = false;

function updateProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0;
  if (progressEl) progressEl.style.width = `${ratio * 100}%`;
  if (progressWrap) progressWrap.style.opacity = '1';

  // Subtle parallax for hero background
  if (heroBgEl) {
    const offset = Math.min(60, scrollTop * 0.08);
    heroBgEl.style.transform = `translateY(${offset}px)`;
    heroBgEl.style.willChange = 'transform';
  }

  // Toggle back-to-top visibility
  if (backToTopBtn) {
    if (scrollTop > window.innerHeight * 0.25) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  }
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    window.requestAnimationFrame(updateProgress);
    ticking = true;
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

// Back-to-top click
backToTopBtn?.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reveal on scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));

// Scrollspy: highlight active nav link by observed section
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('header nav a.nav-link'));
const linkById = new Map(navLinks.map((a) => [a.getAttribute('href')?.replace('#', '') || '', a]));

const scrollSpy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach((l) => l.classList.remove('active'));
      const active = linkById.get(id);
      if (active) active.classList.add('active');
    }
  });
}, {
  root: null,
  rootMargin: '-45% 0px -45% 0px',
  threshold: 0.01,
});

sections.forEach((sec) => scrollSpy.observe(sec));

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('lightboxClose');
const prevBtn = document.getElementById('lightboxPrev');
const nextBtn = document.getElementById('lightboxNext');

const galleryImages = Array.from(document.querySelectorAll('#gallery img'));
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  if (!lightboxImg || !galleryImages[index]) return;
  lightboxImg.src = galleryImages[index].src;
  lightboxImg.alt = galleryImages[index].alt;
  lightbox?.classList.remove('hidden');
  lightbox?.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox?.classList.add('hidden');
  lightbox?.classList.remove('flex');
  document.body.style.overflow = '';
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  openLightbox(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(currentIndex);
}

galleryImages.forEach((img, index) => {
  img.addEventListener('click', () => openLightbox(index));
});

closeBtn?.addEventListener('click', closeLightbox);
nextBtn?.addEventListener('click', showNext);
prevBtn?.addEventListener('click', showPrev);

lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox || lightbox.classList.contains('hidden')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});
