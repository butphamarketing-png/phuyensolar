document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initCategoryDropdown();
  initMobileNav();
  initFlashCountdown();
  initWhyIconSpin();
  initStatCounters();
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

  const minDisplay = new Promise((resolve) => setTimeout(resolve, 1800));
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
