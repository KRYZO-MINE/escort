document.addEventListener('DOMContentLoaded', function() {
  initNavbar();
  initMobileMenu();
  initRevealOnScroll();
  initAgeVerification();
  initFAQAccordion();
  initTestimonialSlider();
  initCounters();
  initGallerySlider();
  initSearchFilter();
  initSmoothScroll();
  initHeroSlider();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('blur-nav');
    } else {
      navbar.classList.remove('blur-nav');
    }
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeMenu = document.getElementById('closeMenu');

  if (!hamburger || !mobileMenu || !closeMenu) return;

  hamburger.addEventListener('click', function() {
    mobileMenu.classList.add('open');
  });

  closeMenu.addEventListener('click', function() {
    mobileMenu.classList.remove('open');
  });

  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
    });
  });
}

function initRevealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  function checkReveals() {
    const windowHeight = window.innerHeight;
    reveals.forEach(reveal => {
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 150;

      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', checkReveals);
  checkReveals();
}

function initAgeVerification() {
  const ageModal = document.getElementById('ageModal');
  const enterBtn = document.getElementById('enterBtn');
  const leaveBtn = document.getElementById('leaveBtn');

  if (!ageModal || !enterBtn || !leaveBtn) return;

  const hasVerified = localStorage.getItem('ageVerified');
  if (hasVerified) {
    ageModal.style.display = 'none';
    return;
  }

  enterBtn.addEventListener('click', function() {
    localStorage.setItem('ageVerified', 'true');
    ageModal.style.display = 'none';
  });

  leaveBtn.addEventListener('click', function() {
    window.location.href = 'https://www.google.com';
  });
}

function initFAQAccordion() {
  const accordionBtns = document.querySelectorAll('.accordion-btn');
  if (!accordionBtns.length) return;

  accordionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const icon = this.querySelector('.accordion-icon');

      accordionBtns.forEach(otherBtn => {
        if (otherBtn !== this) {
          const otherContent = otherBtn.nextElementSibling;
          const otherIcon = otherBtn.querySelector('.accordion-icon');
          otherContent.classList.remove('open');
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      content.classList.toggle('open');
      if (icon) {
        icon.textContent = content.classList.contains('open') ? '−' : '+';
      }
    });
  });
}

function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  if (!track) return;

  const slides = track.children;
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;
  const totalSlides = slides.length;

  if (totalSlides === 0) return;

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('bg-yellow-600');
        dot.classList.remove('bg-gray-600');
      } else {
        dot.classList.add('bg-gray-600');
        dot.classList.remove('bg-yellow-600');
      }
    });
  }

  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });
  }

  setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 5000);
}

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length) return;

  let animated = false;

  function animateCounters() {
    if (animated) return;

    const windowHeight = window.innerHeight;
    const firstCounter = counters[0];
    if (!firstCounter) return;

    const counterTop = firstCounter.getBoundingClientRect().top;

    if (counterTop < windowHeight - 100) {
      animated = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '+';
          }
        };

        updateCounter();
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters();
}

function initGallerySlider() {
  const gallery = document.querySelector('.gallery-slider');
  if (!gallery) return;

  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      gallery.scrollBy({ left: -300, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      gallery.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
}

function initSearchFilter() {
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modelCards = document.querySelectorAll('.model-card');

  if (!searchInput && !filterBtns.length) return;

  let activeFilter = 'all';
  let searchTerm = '';

  function filterCards() {
    modelCards.forEach(card => {
      const name = card.getAttribute('data-name')?.toLowerCase() || '';
      const city = card.getAttribute('data-city')?.toLowerCase() || '';
      const category = card.getAttribute('data-category') || 'all';

      const matchesSearch = name.includes(searchTerm) || city.includes(searchTerm);
      const matchesFilter = activeFilter === 'all' || category === activeFilter;

      if (matchesSearch && matchesFilter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.toLowerCase();
      filterCards();
    });
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
          b.classList.remove('bg-yellow-600', 'text-black');
          b.classList.add('border-yellow-600', 'text-yellow-600');
        });
        btn.classList.add('bg-yellow-600', 'text-black');
        btn.classList.remove('border-yellow-600', 'text-yellow-600');
        activeFilter = btn.getAttribute('data-filter') || 'all';
        filterCards();
      });
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function initHeroSlider() {
  const track = document.getElementById('heroSliderTrack');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');
  const dotsContainer = document.getElementById('heroSliderDots');

  if (!track) return;

  const slides = track.children;
  const totalSlides = slides.length;
  let currentSlide = 0;
  let autoSlideInterval;

  if (totalSlides === 0) return;

  // Create dots
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('hero-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    const dots = dotsContainer.querySelectorAll('.hero-dot');
    dots.forEach((dot, i) => {
      if (i === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(currentSlide - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoSlide();
      goToSlide(currentSlide + 1);
      startAutoSlide();
    });
  }

  // Pause on hover
  track.parentElement.addEventListener('mouseenter', stopAutoSlide);
  track.parentElement.addEventListener('mouseleave', startAutoSlide);

  // Start auto slide
  startAutoSlide();
}
