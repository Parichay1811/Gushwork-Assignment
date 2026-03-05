document.addEventListener('DOMContentLoaded', () => {

  const stickyHeader = document.getElementById('stickyHeader');
  const hero = document.getElementById('hero');
  let lastScrollY = window.scrollY;
  let heroBottom = 0;

  function updateHeroBottom() {
    if (hero) {
      heroBottom = hero.offsetTop + hero.offsetHeight;
    }
  }

  updateHeroBottom();
  window.addEventListener('resize', updateHeroBottom);

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

  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const stickyMobileBtn = document.getElementById('stickyMobileMenuBtn');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  if (stickyMobileBtn) {
    stickyMobileBtn.addEventListener('click', () => {
      if (mobileMenu) mobileMenu.classList.toggle('open');
    });
  }

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

    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });
  }

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const index = parseInt(thumb.getAttribute('data-index'), 10);
      switchImage(index);
    });
  });

  if (imgPrev) imgPrev.addEventListener('click', () => switchImage(currentImageIndex - 1));
  if (imgNext) imgNext.addEventListener('click', () => switchImage(currentImageIndex + 1));

  const heroMainImage = document.getElementById('heroMainImage');
  const zoomLens = document.getElementById('zoomLens');
  const zoomPreview = document.getElementById('zoomPreview');

  if (heroMainImage && zoomLens && zoomPreview && mainImg) {
    const ZOOM_FACTOR = 2.5;
    const LENS_SIZE = 120;

    heroMainImage.addEventListener('mousemove', (e) => {
      const rect = heroMainImage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const imgW = rect.width;
      const imgH = rect.height;

      let lensX = x - LENS_SIZE / 2;
      let lensY = y - LENS_SIZE / 2;
      lensX = Math.max(0, Math.min(lensX, imgW - LENS_SIZE));
      lensY = Math.max(0, Math.min(lensY, imgH - LENS_SIZE));

      zoomLens.style.left = lensX + 'px';
      zoomLens.style.top = lensY + 'px';

      const bgW = imgW * ZOOM_FACTOR;
      const bgH = imgH * ZOOM_FACTOR;
      const bgX = -(lensX * ZOOM_FACTOR);
      const bgY = -(lensY * ZOOM_FACTOR);

      zoomPreview.style.backgroundImage = `url(${mainImg.src})`;
      zoomPreview.style.backgroundSize = `${bgW}px ${bgH}px`;
      zoomPreview.style.backgroundPosition = `${bgX}px ${bgY}px`;
    });

    heroMainImage.addEventListener('mouseenter', () => {
      zoomLens.classList.add('active');
      zoomPreview.classList.add('active');
    });

    heroMainImage.addEventListener('mouseleave', () => {
      zoomLens.classList.remove('active');
      zoomPreview.classList.remove('active');
    });
  }

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

  const processSteps = document.querySelectorAll('.process__step');

  processSteps.forEach(step => {
    step.addEventListener('click', () => {
      processSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });

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

  document.querySelectorAll('.section-header, .features__card, .testimonials__card, .solutions__card, .resources__item, .process__detail').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .fade-up {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-up.in-view {
      opacity: 1;
      transform: translateY(0);
    }
    .features__card.fade-up:nth-child(2) { transition-delay: 0.1s; }
    .features__card.fade-up:nth-child(3) { transition-delay: 0.2s; }
    .features__card.fade-up:nth-child(4) { transition-delay: 0.15s; }
    .features__card.fade-up:nth-child(5) { transition-delay: 0.25s; }
    .features__card.fade-up:nth-child(6) { transition-delay: 0.3s; }
    .testimonials__card.fade-up:nth-child(2) { transition-delay: 0.1s; }
    .testimonials__card.fade-up:nth-child(3) { transition-delay: 0.2s; }
    .testimonials__card.fade-up:nth-child(4) { transition-delay: 0.3s; }
    .solutions__card.fade-up:nth-child(2) { transition-delay: 0.1s; }
    .solutions__card.fade-up:nth-child(3) { transition-delay: 0.2s; }
    .resources__item.fade-up:nth-child(2) { transition-delay: 0.1s; }
    .resources__item.fade-up:nth-child(3) { transition-delay: 0.2s; }
    #mainImg {
      transition: opacity 0.15s ease;
    }
  `;
  document.head.appendChild(style);

});