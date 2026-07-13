function getBasePath() {
  return window.location.pathname.includes('/pages/') ? '../' : '';
}

function categoryUrl(catId) {
  return `${getBasePath()}pages/danh-muc.html?cat=${catId}`;
}

function productUrl(productId) {
  return `${getBasePath()}pages/chi-tiet.html?id=${productId}`;
}

function imgPath(src) {
  return src.startsWith('http') ? src : `${getBasePath()}${src}`;
}

function productImgAttrs(src, alt, options = {}) {
  const lazy = options.lazy !== false;
  const attrs = [
    `src="${imgPath(src)}"`,
    `alt="${alt}"`,
    lazy ? 'loading="lazy"' : '',
    'decoding="async"',
    options.priority ? 'fetchpriority="high"' : '',
  ].filter(Boolean).join(' ');
  return attrs;
}

function filterProductsByQuery(products, query) {
  if (!query) return products;
  return products.filter((p) => {
    const haystack = `${p.name} ${p.power} ${p.description || ''}`.toLowerCase();
    return haystack.includes(query);
  });
}

function renderCatalogSidebar(activeCatId) {
  const sidebar = document.getElementById('catalogSidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="catalog-sidebar__title">Danh mục</div>
    ${CATEGORIES.map((cat) => `
      <a href="${categoryUrl(cat.id)}" class="catalog-sidebar__link${cat.id === activeCatId ? ' is-active' : ''}">
        <i class="fa-solid ${cat.icon}"></i>
        <span>${cat.name}</span>
        <em>${cat.count}</em>
      </a>
    `).join('')}
  `;
}

function buildMegaPanelHtml(cat) {
  const featured = getFeaturedProducts(cat.id, 4);
  const megaItems = featured.map((p) => `
    <a href="${productUrl(p.id)}" class="mega-product">
      <img ${productImgAttrs(p.image, p.name, { lazy: true })}>
      <div class="mega-product__info">
        <strong>${p.name}</strong>
        <span class="mega-product__price">${formatPrice(p.price)}</span>
      </div>
    </a>
  `).join('');

  return `
    <div class="category-mega__head">
      <strong>${cat.name}</strong>
      <a href="${categoryUrl(cat.id)}">Xem tất cả ${cat.count} SP <i class="fa-solid fa-arrow-right"></i></a>
    </div>
    <div class="category-mega__grid">${megaItems}</div>
  `;
}

function renderCategoryMenu(container) {
  if (!container) return;

  container.innerHTML = CATEGORIES.map((cat) => `
    <li class="category-item" data-cat="${cat.id}">
      <a href="${categoryUrl(cat.id)}">
        <i class="fa-solid ${cat.icon}"></i>
        <span>${cat.name}</span>
        <i class="fa-solid fa-chevron-right"></i>
      </a>
    </li>
  `).join('');
}

function initCategoryMegaPanel() {
  const flyout = document.getElementById('categoryFlyout');
  const panel = document.getElementById('categoryMegaPanel');
  const items = document.querySelectorAll('.category-item');
  if (!flyout || !panel || !items.length) return;

  let hideTimer;

  function showPanel(catId) {
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (!cat) return;
    clearTimeout(hideTimer);
    panel.innerHTML = buildMegaPanelHtml(cat);
    panel.classList.add('is-visible');
    panel.setAttribute('aria-hidden', 'false');
  }

  function hidePanel() {
    panel.classList.remove('is-visible');
    panel.setAttribute('aria-hidden', 'true');
    items.forEach((item) => item.classList.remove('is-active'));
  }

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hidePanel, 120);
  }

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
      items.forEach((el) => el.classList.remove('is-active'));
      item.classList.add('is-active');
      showPanel(item.dataset.cat);
    });
  });

  flyout.addEventListener('mouseleave', scheduleHide);
  flyout.addEventListener('mouseenter', () => clearTimeout(hideTimer));
}

function renderProductCard(product, options = {}) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  const badge = options.badge || product.badge;
  const badgeHtml = badge
    ? `<span class="product-card__badge product-card__badge--${badge.includes('%') || badge.startsWith('-') ? 'sale' : 'top'}">${badge}</span>`
    : '';

  return `
    <article class="product-card">
      ${badgeHtml}
      <a href="${productUrl(product.id)}" class="product-card__image">
        <img ${productImgAttrs(product.image, product.name, { lazy: options.lazy !== false })}>
        <span class="product-card__power">${product.power}</span>
      </a>
      <h3 class="product-card__title"><a href="${productUrl(product.id)}">${product.name}</a></h3>
      <ul class="product-card__specs">
        <li><i class="fa-solid fa-bolt"></i> ${product.power}</li>
        <li><i class="fa-solid fa-sun"></i> ${product.lumens}</li>
        <li><i class="fa-solid fa-battery-full"></i> ${product.battery}</li>
      </ul>
      <div class="product-card__price">
        <span class="price-current">${formatPrice(product.price)}</span>
        ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
      </div>
      <div class="product-card__meta">
        <span class="rating"><i class="fa-solid fa-star"></i> ${product.rating.toFixed(1)}</span>
        <span class="sold">Đã bán ${product.sold.toLocaleString('vi-VN')}</span>
      </div>
      <div class="product-card__actions">
        <button type="button" class="btn-icon-cart" aria-label="Thêm vào giỏ"><i class="fa-solid fa-cart-shopping"></i></button>
        <a href="${productUrl(product.id)}" class="btn-add-cart">XEM CHI TIẾT</a>
      </div>
    </article>
  `;
}

function renderCategoryPage() {
  const params = new URLSearchParams(window.location.search);
  const catId = params.get('cat');
  const query = (params.get('q') || '').trim().toLowerCase();
  const titleEl = document.getElementById('catalogTitle');
  const descEl = document.getElementById('catalogDesc');
  const countEl = document.getElementById('catalogCount');
  const breadcrumbCat = document.getElementById('breadcrumbCat');
  const grid = document.getElementById('catalogGrid');
  if (!titleEl || !grid) return;

  if (query && !catId) {
    const products = filterProductsByQuery(PRODUCTS, query);
    document.title = `Tìm kiếm "${query}" – Phú Yên Solar`;
    titleEl.textContent = `Kết quả tìm kiếm “${query}”`;
    if (descEl) {
      descEl.textContent = products.length
        ? `Tìm thấy ${products.length} sản phẩm phù hợp với từ khóa của bạn.`
        : 'Không tìm thấy sản phẩm phù hợp. Vui lòng thử từ khóa khác hoặc liên hệ tư vấn.';
    }
    if (countEl) countEl.textContent = products.length;
    if (breadcrumbCat) {
      breadcrumbCat.textContent = 'Tìm kiếm';
      breadcrumbCat.href = `${getBasePath()}pages/danh-muc.html?q=${encodeURIComponent(query)}`;
    }
    renderCatalogSidebar(null);
    grid.innerHTML = products.length
      ? products.map((p) => renderProductCard(p)).join('')
      : '<p class="catalog-empty">Không có sản phẩm nào khớp với từ khóa.</p>';
    return;
  }

  const category = getCategoryById(catId);
  if (!category) {
    titleEl.textContent = 'Danh mục không tồn tại';
    if (descEl) descEl.textContent = 'Vui lòng chọn danh mục khác hoặc quay về trang chủ.';
    return;
  }

  document.title = `${category.name} – Phú Yên Solar`;
  titleEl.textContent = category.name;
  if (descEl) {
    descEl.textContent =
      `Khám phá ${category.count}+ sản phẩm ${category.name.toLowerCase()} chính hãng – giá tốt, bảo hành toàn quốc.`;
  }

  let products = getProductsByCategory(catId);
  if (query) {
    products = filterProductsByQuery(products, query);
    titleEl.textContent = `${category.name}: “${query}”`;
    if (descEl) {
      descEl.textContent = `Tìm thấy ${products.length} sản phẩm trong danh mục ${category.name.toLowerCase()}.`;
    }
  }

  if (countEl) countEl.textContent = products.length;
  if (breadcrumbCat) {
    breadcrumbCat.textContent = category.name;
    breadcrumbCat.href = categoryUrl(catId);
  }

  renderCatalogSidebar(catId);
  grid.innerHTML = products.length
    ? products.map((p) => renderProductCard(p)).join('')
    : '<p class="catalog-empty">Không có sản phẩm trong danh mục này.</p>';
}

function renderProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const product = getProductById(params.get('id'));

  if (!product) {
    document.getElementById('productTitle').textContent = 'Sản phẩm không tồn tại';
    return;
  }

  const category = getCategoryById(product.categoryId);
  document.title = `${product.name} – Phú Yên Solar`;
  document.getElementById('productTitle').textContent = product.name;
  document.getElementById('breadcrumbCat').textContent = category.name;
  document.getElementById('breadcrumbCat').href = categoryUrl(category.id);
  document.getElementById('breadcrumbProduct').textContent = product.name;

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  document.getElementById('productDetail').innerHTML = `
    <div class="product-detail__gallery">
      <img ${productImgAttrs(product.image, product.name, { lazy: false })} class="product-detail__main-img" id="productMainImg">
    </div>
    <div class="product-detail__info">
      <span class="product-detail__brand">Phú Yên Solar</span>
      <h1>${product.name}</h1>
      <div class="product-detail__rating">
        <span class="rating"><i class="fa-solid fa-star"></i> ${product.rating.toFixed(1)}</span>
        <span>Đã bán ${product.sold.toLocaleString('vi-VN')}</span>
      </div>
      <div class="product-detail__price">
        <span class="price-current">${formatPrice(product.price)}</span>
        ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ''}
        ${discount > 0 ? `<span class="product-detail__discount">-${discount}%</span>` : ''}
      </div>
      <ul class="product-detail__highlights">
        <li><i class="fa-solid fa-bolt"></i> Công suất: <strong>${product.power}</strong></li>
        <li><i class="fa-solid fa-sun"></i> Quang thông: <strong>${product.lumens}</strong></li>
        <li><i class="fa-solid fa-battery-full"></i> ${product.battery}</li>
        <li><i class="fa-solid fa-shield-halved"></i> Bảo hành 24 tháng</li>
      </ul>
      <div class="product-detail__actions">
        <button type="button" class="btn-add-cart"><i class="fa-solid fa-cart-shopping"></i> THÊM VÀO GIỎ</button>
        <a href="tel:0907673277" class="btn btn--primary btn--quote"><i class="fa-solid fa-phone"></i> BÁO GIÁ NGAY</a>
      </div>
      <div class="product-detail__trust">
        <span><i class="fa-solid fa-truck-fast"></i> Miễn phí vận chuyển</span>
        <span><i class="fa-solid fa-rotate-left"></i> Đổi trả 30 ngày</span>
        <span><i class="fa-solid fa-screwdriver-wrench"></i> Lắp đặt tận nơi</span>
      </div>
    </div>
  `;

  const specsRows = Object.entries(product.specs)
    .map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`)
    .join('');

  document.getElementById('productSpecs').innerHTML = `
    <h2>Thông số kỹ thuật</h2>
    <table class="spec-table">${specsRows}</table>
    <div class="product-detail__desc"><h2>Mô tả sản phẩm</h2><p>${product.description}</p></div>
  `;

  const related = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  document.getElementById('relatedGrid').innerHTML = related
    .map((p) => renderProductCard(p))
    .join('');
}

function initNavProductDropdown() {
  const navItem = document.querySelector('.nav-menu .has-dropdown');
  if (!navItem || navItem.querySelector('.nav-submenu')) return;

  const submenu = document.createElement('ul');
  submenu.className = 'nav-submenu';
  submenu.innerHTML = CATEGORIES.map((cat) => `
    <li><a href="${categoryUrl(cat.id)}"><i class="fa-solid ${cat.icon}"></i> ${cat.name}</a></li>
  `).join('');
  navItem.appendChild(submenu);
}

function initGlobalSearch() {
  document.querySelectorAll('form.search-bar').forEach((form) => {
    form.addEventListener('submit', (e) => {
      const input = form.querySelector('input[type="search"], input[name="q"]');
      const q = input?.value.trim();
      if (!q) return;

      e.preventDefault();
      const base = getBasePath();
      window.location.href = `${base}pages/danh-muc.html?q=${encodeURIComponent(q)}`;
    });
  });
}

function initCatalog() {
  const categoryList = document.getElementById('categoryList');
  if (categoryList) renderCategoryMenu(categoryList);

  initCategoryMegaPanel();
  initNavProductDropdown();
  initGlobalSearch();

  if (document.body.dataset.page === 'category') renderCategoryPage();
  if (document.body.dataset.page === 'product') renderProductDetail();
}

document.addEventListener('DOMContentLoaded', initCatalog);
