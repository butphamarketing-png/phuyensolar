const pageType = document.body.dataset.page || '';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
  if (pageType === 'home') {
    initPageLoader();
    initFlashCountdown();
    initHeroSlider();
    initTrustSlider();
    initHomeProductPagination();
    initWhyIconSpin();
    initStatCounters();
    initAppointmentForm();
  }

  initCategoryDropdown();
  initMobileNav();
});

const isMobileView = () => window.innerWidth <= 992;

function initPageLoader() {
  const loader = document.getElementById('pageLoader');
  if (!loader) return;

  const hideLoader = () => {
    loader.classList.add('is-hidden');
    loader.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-loading');
  };

  if (prefersReducedMotion) {
    hideLoader();
    return;
  }

  const minDelay = 700;
  const minDisplay = new Promise((resolve) => setTimeout(resolve, minDelay));
  const pageReady = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve, { once: true });
  });

  Promise.all([minDisplay, pageReady]).then(hideLoader);
}

function closeMobileNav() {
  const navBar = document.getElementById('navBar');
  const toggle = document.getElementById('mobileToggle');
  if (!navBar || !toggle) return;

  navBar.classList.remove('is-nav-open');
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('nav-open');

  const icon = toggle.querySelector('i');
  if (icon) icon.className = 'fa-solid fa-bars';

  navBar.querySelectorAll('.has-dropdown.is-submenu-open').forEach((item) => {
    item.classList.remove('is-submenu-open');
  });
}

function initMobileNav() {
  const toggle = document.getElementById('mobileToggle');
  const navBar = document.getElementById('navBar');
  const categoryDropdown = document.getElementById('categoryDropdown');
  if (!toggle || !navBar) return;

  toggle.addEventListener('click', (e) => {
    if (!isMobileView()) return;
    e.stopPropagation();

    const willOpen = !navBar.classList.contains('is-nav-open');
    if (willOpen && categoryDropdown) {
      categoryDropdown.classList.remove('is-open');
      document.body.classList.remove('category-open');
    }

    navBar.classList.toggle('is-nav-open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
    document.body.classList.toggle('nav-open', willOpen);

    const icon = toggle.querySelector('i');
    if (icon) icon.className = willOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  navBar.querySelectorAll('.nav-menu > li > a').forEach((link) => {
    link.addEventListener('click', (e) => {
      if (!isMobileView()) return;

      const parent = link.closest('.has-dropdown');
      if (parent?.querySelector('.nav-submenu')) {
        e.preventDefault();
        parent.classList.toggle('is-submenu-open');
        return;
      }

      closeMobileNav();
    });
  });

  window.addEventListener('resize', () => {
    if (!isMobileView()) closeMobileNav();
  });
}

function initCategoryDropdown() {
  const categoryDropdown = document.getElementById('categoryDropdown');
  const categoryToggle = document.getElementById('categoryToggle');

  const closeDropdown = () => {
    if (!categoryDropdown || !categoryToggle) return;
    categoryDropdown.classList.remove('is-open');
    categoryToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('category-open');
  };

  if (categoryDropdown && categoryToggle) {
    categoryToggle.addEventListener('click', (e) => {
      if (!isMobileView()) return;
      e.stopPropagation();

      const willOpen = !categoryDropdown.classList.contains('is-open');
      if (willOpen) closeMobileNav();

      categoryDropdown.classList.toggle('is-open', willOpen);
      categoryToggle.setAttribute('aria-expanded', String(willOpen));
      document.body.classList.toggle('category-open', willOpen);
    });

    document.addEventListener('click', (e) => {
      if (!categoryDropdown.contains(e.target)) {
        closeDropdown();
      }
    });

    window.addEventListener('resize', () => {
      if (!isMobileView()) closeDropdown();
    });
  }
}

function initHeroSlider() {
  const slider = document.getElementById('heroSlider');
  const track = document.getElementById('heroTrack');
  const dotsWrap = document.getElementById('heroDots');
  if (!slider || !track) return;

  const slides = track.querySelectorAll('.hero-slide');
  const total = slides.length;
  if (total <= 1) return;

  let current = 0;
  let timer;

  if (dotsWrap) {
    dotsWrap.innerHTML = Array.from({ length: total }, (_, i) => `
      <button type="button" class="hero-slider__dot${i === 0 ? ' is-active' : ''}" aria-label="Slide ${i + 1}" data-index="${i}"></button>
    `).join('');
  }

  const goTo = (index) => {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsWrap?.querySelectorAll('.hero-slider__dot').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === current);
    });
  };

  const stopAuto = () => clearInterval(timer);

  const startAuto = () => {
    if (prefersReducedMotion) return;
    stopAuto();
    timer = setInterval(() => goTo(current + 1), 5000);
  };

  slider.querySelector('.hero-slider__btn--prev')?.addEventListener('click', () => {
    goTo(current - 1);
    startAuto();
  });

  slider.querySelector('.hero-slider__btn--next')?.addEventListener('click', () => {
    goTo(current + 1);
    startAuto();
  });

  dotsWrap?.querySelectorAll('.hero-slider__dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      goTo(Number(dot.dataset.index));
      startAuto();
    });
  });

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  slider.addEventListener('focusin', stopAuto);
  slider.addEventListener('focusout', startAuto);

  startAuto();
}

function initTrustSlider() {
  const viewport = document.getElementById('trustSlider');
  const prev = document.querySelector('.trust-slider__btn--prev');
  const next = document.querySelector('.trust-slider__btn--next');
  if (!viewport) return;

  const items = viewport.querySelectorAll('.trust-item');
  const visible = 3;
  let index = 0;
  const maxIndex = Math.max(0, items.length - visible);

  const update = () => {
    if (!isMobileView()) {
      viewport.style.transform = '';
      return;
    }
    const offset = (100 / visible) * index;
    viewport.style.transform = `translateX(-${offset}%)`;
  };

  prev?.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    update();
  });

  next?.addEventListener('click', () => {
    index = Math.min(maxIndex, index + 1);
    update();
  });

  window.addEventListener('resize', () => {
    index = Math.min(index, maxIndex);
    update();
  });

  update();
}

function extendProductGrid(grid, mode, targetCount) {
  if (typeof PRODUCTS === 'undefined' || typeof renderProductCard !== 'function') return;

  const cards = grid.querySelectorAll('.product-card');
  if (cards.length >= targetCount) return;

  const existingIds = new Set(
    [...grid.querySelectorAll('a[href*="id="]')].map((a) => {
      const match = a.href.match(/id=([^&]+)/);
      return match ? match[1] : null;
    }).filter(Boolean)
  );

  let pool = [...PRODUCTS];
  if (mode === 'sale') {
    pool = pool
      .filter((p) => p.oldPrice && p.oldPrice > p.price)
      .sort((a, b) => (1 - a.price / a.oldPrice) - (1 - b.price / b.oldPrice));
  } else {
    pool = pool.sort((a, b) => b.sold - a.sold);
  }

  pool
    .filter((p) => !existingIds.has(p.id))
    .slice(0, targetCount - cards.length)
    .forEach((product, i) => {
      let badge;
      if (mode === 'sale' && product.oldPrice) {
        badge = `-${Math.round((1 - product.price / product.oldPrice) * 100)}%`;
      } else if (mode === 'bestseller') {
        badge = `TOP ${cards.length + i + 1}`;
      }
      grid.insertAdjacentHTML('beforeend', renderProductCard(product, { badge }));
    });
}

function initHomeProductPagination() {
  const configs = [
    { gridId: 'flashGrid', paginationId: 'flashPagination', mode: 'sale' },
    { gridId: 'bestsellerGrid', paginationId: 'bestsellerPagination', mode: 'bestseller' },
  ];

  const perPage = 4;
  const totalPages = 3;

  configs.forEach(({ gridId, paginationId, mode }) => {
    const grid = document.getElementById(gridId);
    const pagination = document.getElementById(paginationId);
    if (!grid || !pagination) return;

    const applyPage = () => {
      if (!isMobileView()) {
        grid.querySelectorAll('.product-card').forEach((card) => {
          card.classList.remove('is-hidden-page');
        });
        return;
      }

      extendProductGrid(grid, mode, perPage * totalPages);
      const activeBtn = pagination.querySelector('.grid-pagination__btn.is-active');
      const page = Number(activeBtn?.dataset.page || 1);
      const cards = [...grid.querySelectorAll('.product-card')];

      cards.forEach((card, i) => {
        const cardPage = Math.floor(i / perPage) + 1;
        card.classList.toggle('is-hidden-page', cardPage !== page);
      });
    };

    pagination.querySelectorAll('.grid-pagination__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        pagination.querySelectorAll('.grid-pagination__btn').forEach((b) => {
          b.classList.remove('is-active');
        });
        btn.classList.add('is-active');
        applyPage();
      });
    });

    window.addEventListener('resize', applyPage);
    applyPage();
  });
}

function initFlashCountdown() {
  ['flashCountdown', 'promoCountdown'].forEach((id) => {
    const countdown = document.getElementById(id);
    if (!countdown) return;

    const endTime = new Date();
    endTime.setHours(23, 59, 59, 999);

    const units = {
      days: countdown.querySelector('[data-unit="days"]'),
      hours: countdown.querySelector('[data-unit="hours"]'),
      minutes: countdown.querySelector('[data-unit="minutes"]'),
      seconds: countdown.querySelector('[data-unit="seconds"]'),
    };

    const pad = (n) => String(n).padStart(2, '0');

    const tick = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) {
        Object.values(units).forEach((el) => { if (el) el.textContent = '00'; });
        return;
      }

      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);

      if (units.days) units.days.textContent = pad(d);
      if (units.hours) units.hours.textContent = pad(h);
      if (units.minutes) units.minutes.textContent = pad(m);
      if (units.seconds) units.seconds.textContent = pad(s);
    };

    tick();
    setInterval(tick, 1000);
  });
}

function initWhyIconSpin() {
  const cards = document.querySelectorAll('.why-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.35, rootMargin: '0px 0px -40px 0px' }
  );

  cards.forEach((card) => observer.observe(card));
}

function initStatCounters() {
  const statsBlock = document.getElementById('testimonialStats');
  if (!statsBlock) return;

  const counters = statsBlock.querySelectorAll('.stat-counter');
  if (!counters.length) return;

  const formatValue = (value, decimals, separator) => {
    if (decimals > 0) return value.toFixed(decimals);
    const intVal = Math.round(value);
    if (separator === 'dot') {
      return intVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return String(intVal);
  };

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.value);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const separator = el.dataset.separator || '';
    const duration = 1800;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      el.textContent = formatValue(current, decimals, separator);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatValue(target, decimals, separator);
      }
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counters.forEach((counter, index) => {
          setTimeout(() => animateCounter(counter), index * 120);
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(statsBlock);
}

function initAppointmentForm() {
  const form = document.getElementById('appointmentForm');
  const success = document.getElementById('appointmentSuccess');
  const dateInput = document.getElementById('apptDate');
  if (!form) return;

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (success) success.classList.add('is-visible');
    form.reset();
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }
    setTimeout(() => success?.classList.remove('is-visible'), 5000);
  });
}
