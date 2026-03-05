// Run script after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // Sticky header elements
  const stickyHeader = document.getElementById('stickyHeader');
  const hero = document.getElementById('hero');
  let lastScrollY = window.scrollY;
  let heroBottom = 0;

  // Calculate bottom position of hero section
  function updateHeroBottom() {
    if (hero) {
      heroBottom = hero.offsetTop + hero.offsetHeight;
    }
  }

  updateHeroBottom();
  window.addEventListener('resize', updateHeroBottom);

  // Show sticky header when scrolling down past hero section
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const scrollingDown = currentScrollY > lastScrollY;

    if (currentScrollY > heroBottom && scrollingDown) {
      stickyHeader.classList.add('visible');
    } else if (!scrollingDown) {
      stickyHeader.classList.remove('visible');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });


  // Mobile menu elements
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const stickyMobileBtn = document.getElementById('stickyMobileMenuBtn');

  // Toggle mobile menu from main button
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  // Close mobile menu when a link is clicked
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // Toggle mobile menu from sticky header button
  if (stickyMobileBtn) {
    stickyMobileBtn.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.toggle('open');
    });
  }


  // Image gallery data
  const images = [
    { full: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=120&h=90&fit=crop' },
    { full: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=120&h=90&fit=crop' },
    { full: 'https://images.unsplash.com/photo-1589792923962-537704632910?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1589792923962-537704632910?w=120&h=90&fit=crop' },
    { full: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=120&h=90&fit=crop' },
    { full: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop', thumb: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=120&h=90&fit=crop' }
  ];

  let currentImageIndex = 0;
  const mainImg = document.getElementById('mainImg');
  const thumbnails = document.querySelectorAll('.hero__thumb');
  const imgPrev = document.getElementById('imgPrev');
  const imgNext = document.getElementById('imgNext');

  // Change main image
  function switchImage(index) {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;
    currentImageIndex = index;

    if (mainImg) {
      mainImg.style.opacity = '0.6';
      setTimeout(() => {
        mainImg.src = images[index].full;
        mainImg.style.opacity = '1';
      }, 150);
    }

    // Update active thumbnail
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }

  // Thumbnail click event
  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.getAttribute('data-index'), 10);
      switchImage(index);
    });
  });

  // Previous and next buttons
  if (imgPrev) imgPrev.addEventListener('click', () => switchImage(currentImageIndex - 1));
  if (imgNext) imgNext.addEventListener('click', () => switchImage(currentImageIndex + 1));


  // Zoom elements
  const heroMainImage = document.getElementById('heroMainImage');
  const zoomLens = document.getElementById('zoomLens');
  const zoomPreview = document.getElementById('zoomPreview');

  if (heroMainImage && zoomLens && zoomPreview && mainImg) {

    const ZOOM_FACTOR = 2.5;
    const LENS_SIZE = 120;

    // Move zoom lens with mouse
    heroMainImage.addEventListener('mousemove', (e) => {
      const rect = heroMainImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let lensX = x - LENS_SIZE / 2;
      let lensY = y - LENS_SIZE / 2;

      lensX = Math.max(0, Math.min(lensX, rect.width - LENS_SIZE));
      lensY = Math.max(0, Math.min(lensY, rect.height - LENS_SIZE));

      zoomLens.style.left = lensX + 'px';
      zoomLens.style.top = lensY + 'px';

      zoomPreview.style.backgroundImage = `url(${mainImg.src})`;
      zoomPreview.style.backgroundSize = `${rect.width * ZOOM_FACTOR}px ${rect.height * ZOOM_FACTOR}px`;
      zoomPreview.style.backgroundPosition = `${-(lensX * ZOOM_FACTOR)}px ${-(lensY * ZOOM_FACTOR)}px`;
    });

    // Show zoom on hover
    heroMainImage.addEventListener('mouseenter', () => {
      zoomLens.classList.add('active');
      zoomPreview.classList.add('active');
    });

    // Hide zoom when mouse leaves
    heroMainImage.addEventListener('mouseleave', () => {
      zoomLens.classList.remove('active');
      zoomPreview.classList.remove('active');
    });
  }


  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(faq => {
        faq.classList.remove('active');
        const btn = faq.querySelector('.faq__question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // App carousel scroll
  const appCarousel = document.getElementById('appCarousel');
  const appPrev = document.getElementById('appPrev');
  const appNext = document.getElementById('appNext');

  if (appCarousel && appPrev && appNext) {
    const scrollAmount = 300;

    appPrev.addEventListener('click', () => {
      appCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    appNext.addEventListener('click', () => {
      appCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }


  // Process step active state
  const processSteps = document.querySelectorAll('.process__step');

  processSteps.forEach(step => {
    step.addEventListener('click', () => {
      processSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });


  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // Fade-up animation using Intersection Observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.section-header, .features__card, .testimonials__card, .solutions__card, .resources__item, .process__detail'
  ).forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

});