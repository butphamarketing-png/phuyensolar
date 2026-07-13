function initNavActive() {
  const page = document.body.dataset.page;
  if (!page) return;

  const navMap = { category: 'products', product: 'products', home: 'home' };
  const navKey = navMap[page] || page;

  document.querySelectorAll('.nav-menu a[data-nav]').forEach((link) => {
    link.classList.toggle('active', link.dataset.nav === navKey);
  });
}

function initProjectFilters() {
  const filters = document.querySelectorAll('.project-filter');
  const cards = document.querySelectorAll('.project-page-card');
  if (!filters.length || !cards.length) return;

  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      filters.forEach((f) => f.classList.toggle('is-active', f === btn));

      cards.forEach((card) => {
        const match = cat === 'all' || card.dataset.category === cat;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });
}

function initPolicyTabs() {
  const nav = document.querySelector('.policy-nav');
  if (!nav) return;

  const buttons = nav.querySelectorAll('button[data-policy]');
  const panels = document.querySelectorAll('.policy-panel');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.policy;
      buttons.forEach((b) => b.classList.toggle('is-active', b === btn));
      panels.forEach((p) => p.classList.toggle('is-active', p.id === id));
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (success) success.classList.add('is-visible');
    form.reset();
    setTimeout(() => success?.classList.remove('is-visible'), 5000);
  });
}

function renderPromoProducts() {
  const grid = document.getElementById('promoGrid');
  if (!grid || typeof PRODUCTS === 'undefined' || typeof renderProductCard !== 'function') return;

  const saleProducts = PRODUCTS
    .filter((p) => p.oldPrice && p.oldPrice > p.price)
    .sort((a, b) => (1 - a.price / a.oldPrice) - (1 - b.price / b.oldPrice))
    .slice(0, 8);

  grid.innerHTML = saleProducts.map((p) => {
    const discount = Math.round((1 - p.price / p.oldPrice) * 100);
    return renderProductCard(p, { badge: `-${discount}%` });
  }).join('');
}

function initInnerPages() {
  initNavActive();

  const page = document.body.dataset.page;
  if (page === 'projects') initProjectFilters();
  if (page === 'policy') initPolicyTabs();
  if (page === 'contact') initContactForm();
  if (page === 'promo') renderPromoProducts();
}

document.addEventListener('DOMContentLoaded', initInnerPages);
