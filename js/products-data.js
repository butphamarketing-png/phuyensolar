const CATEGORIES = [
  { id: 'den-pha-nlmt', name: 'Đèn pha năng lượng mặt trời', icon: 'fa-lightbulb', count: 128 },
  { id: 'den-duong-nlmt', name: 'Đèn đường năng lượng mặt trời', icon: 'fa-road', count: 96 },
  { id: 'den-san-vuon-nlmt', name: 'Đèn sân vườn năng lượng mặt trời', icon: 'fa-seedling', count: 74 },
  { id: 'den-tru-nlmt', name: 'Đèn trụ năng lượng mặt trời', icon: 'fa-monument', count: 52 },
  { id: 'den-tuong-nlmt', name: 'Đèn tường năng lượng mặt trời', icon: 'fa-house-chimney', count: 45 },
  { id: 'den-cam-bien-nlmt', name: 'Đèn cảm biến năng lượng mặt trời', icon: 'fa-bolt', count: 38 },
  { id: 'den-trang-tri-nlmt', name: 'Đèn trang trí năng lượng mặt trời', icon: 'fa-star', count: 36 },
  { id: 'den-nha-xuong-nlmt', name: 'Đèn nhà xưởng năng lượng mặt trời', icon: 'fa-industry', count: 31 },
  { id: 'pin-nlmt', name: 'Pin năng lượng mặt trời', icon: 'fa-battery-full', count: 24 },
  { id: 'phu-kien-lap-dat', name: 'Phụ kiện lắp đặt', icon: 'fa-screwdriver-wrench', count: 18 },
];

const PRODUCT_IMAGES = [
  'images/products/pha-200w.jpg',
  'images/products/pha-300w.png',
  'images/products/pha-400w.jpg',
  'images/products/duong-150w.jpg',
  'images/products/duong-600w.png',
  'images/products/cam-bien-100w.jpg',
  'images/products/lien-cot-80w.jpg',
  'images/products/tru-50w.jpg',
];

const PRODUCT_TEMPLATES = {
  'den-pha-nlmt': [
    { name: 'Đèn NLMT Phi Thuyền M-PT1200W', power: '1200W', lumens: '14400lm', battery: 'Pin 48.000mAh', price: 3800000, oldPrice: 5400000, sold: 186 },
    { name: 'Đèn NLMT Phi Thuyền M-PT1000W', power: '1000W', lumens: '12000lm', battery: 'Pin 40.000mAh', price: 2800000, oldPrice: 3800000, sold: 243 },
    { name: 'Đèn Pha NLMT CP03.SL.RAD 300W', power: '300W', lumens: '3500lm', battery: 'Pin 30.000mAh', price: 1890000, oldPrice: 2737000, sold: 341 },
    { name: 'Đèn Pha NLMT CP03.SL.RAD 200W', power: '200W', lumens: '2500lm', battery: 'Pin 20.000mAh', price: 1290000, oldPrice: 2000000, sold: 1256 },
    { name: 'Đèn Pha NLMT CP05.SL.RF 350W', power: '350W', lumens: '4200lm', battery: 'Pin 35.000mAh', price: 3290000, oldPrice: 4500000, sold: 412 },
    { name: 'Đèn Pha Cao Áp 400W IP67', power: '400W', lumens: '4500lm', battery: 'Pin 40.000mAh', price: 3290000, oldPrice: 4200000, sold: 234 },
  ],
  'den-duong-nlmt': [
    { name: 'Đèn Đường NLMT Phi Thuyền M-PT500W', power: '500W', lumens: '6000lm', battery: 'Pin 25.000mAh', price: 1880000, oldPrice: 2200000, sold: 567 },
    { name: 'Đèn Đường NLMT CSD05.SL.RF 300W', power: '300W', lumens: '3600lm', battery: 'Pin 30.000mAh', price: 2990000, oldPrice: 3532000, sold: 892 },
    { name: 'Đèn Đường All In One 150W', power: '150W', lumens: '1800lm', battery: 'Pin 15.000mAh', price: 2990000, oldPrice: 4500000, sold: 892 },
    { name: 'Đèn Đường Liền Cột 80W', power: '80W', lumens: '1000lm', battery: 'Pin 12.000mAh', price: 1590000, oldPrice: 2450000, sold: 421 },
    { name: 'Đèn Đường NLMT CSD12.SL 120W', power: '120W', lumens: '1400lm', battery: 'Pin 18.000mAh', price: 2190000, oldPrice: 2800000, sold: 334 },
    { name: 'Đèn Đường Liền Thân 600W', power: '600W', lumens: '6000lm', battery: 'Pin 50.000mAh', price: 5990000, oldPrice: 7500000, sold: 1876 },
  ],
  'den-san-vuon-nlmt': [
    { name: 'Đèn Trụ Sân Vườn NLMT 50W', power: '50W', lumens: '600lm', battery: 'Pin 8.000mAh', price: 750000, oldPrice: 980000, sold: 987 },
    { name: 'Đèn Sân Vườn NLMT 80W', power: '80W', lumens: '960lm', battery: 'Pin 10.000mAh', price: 990000, oldPrice: 1350000, sold: 654 },
    { name: 'Đèn Cảnh Quan DSV01.SL 3W', power: '3W', lumens: '300lm', battery: 'Pin 2.000mAh', price: 350000, oldPrice: 480000, sold: 1203 },
    { name: 'Đèn Sân Vườn Liền Thân 100W', power: '100W', lumens: '1200lm', battery: 'Pin 12.000mAh', price: 1290000, oldPrice: 1680000, sold: 445 },
  ],
  'den-tru-nlmt': [
    { name: 'Đèn Trụ NLMT 30W', power: '30W', lumens: '360lm', battery: 'Pin 6.000mAh', price: 650000, oldPrice: 850000, sold: 532 },
    { name: 'Đèn Trụ NLMT 50W', power: '50W', lumens: '600lm', battery: 'Pin 8.000mAh', price: 750000, oldPrice: 980000, sold: 987 },
    { name: 'Đèn Trụ NLMT 80W', power: '80W', lumens: '960lm', battery: 'Pin 10.000mAh', price: 990000, oldPrice: 1350000, sold: 654 },
    { name: 'Đèn Trụ NLMT 100W', power: '100W', lumens: '1200lm', battery: 'Pin 12.000mAh', price: 1290000, oldPrice: 1680000, sold: 445 },
  ],
  'den-tuong-nlmt': [
    { name: 'Đèn Tường NLMT 20W', power: '20W', lumens: '240lm', battery: 'Pin 4.000mAh', price: 450000, oldPrice: 620000, sold: 876 },
    { name: 'Đèn Tường NLMT 30W', power: '30W', lumens: '360lm', battery: 'Pin 6.000mAh', price: 580000, oldPrice: 780000, sold: 654 },
    { name: 'Đèn Tường NLMT 50W', power: '50W', lumens: '600lm', battery: 'Pin 8.000mAh', price: 750000, oldPrice: 980000, sold: 432 },
    { name: 'Đèn Tường Cảm Biến 40W', power: '40W', lumens: '480lm', battery: 'Pin 7.000mAh', price: 680000, oldPrice: 890000, sold: 567 },
  ],
  'den-cam-bien-nlmt': [
    { name: 'Đèn Pha Cảm Biến Chuyển Động 100W', power: '100W', lumens: '1200lm', battery: 'Pin 10.000mAh', price: 890000, oldPrice: 1250000, sold: 643 },
    { name: 'Đèn Cảm Biến NLMT 60W', power: '60W', lumens: '720lm', battery: 'Pin 8.000mAh', price: 690000, oldPrice: 950000, sold: 789 },
    { name: 'Đèn Cảm Biến NLMT 80W', power: '80W', lumens: '960lm', battery: 'Pin 10.000mAh', price: 850000, oldPrice: 1100000, sold: 534 },
    { name: 'Đèn Cảm Biến NLMT 150W', power: '150W', lumens: '1800lm', battery: 'Pin 15.000mAh', price: 1190000, oldPrice: 1580000, sold: 412 },
  ],
  'den-trang-tri-nlmt': [
    { name: 'Đèn Trang Trí NLMT DSV01 2W', power: '2W', lumens: '200lm', battery: 'Pin 1.500mAh', price: 280000, oldPrice: 380000, sold: 1456 },
    { name: 'Đèn Trang Trí NLMT 10W', power: '10W', lumens: '120lm', battery: 'Pin 3.000mAh', price: 380000, oldPrice: 520000, sold: 987 },
    { name: 'Đèn Trang Trí NLMT 20W', power: '20W', lumens: '240lm', battery: 'Pin 4.000mAh', price: 450000, oldPrice: 620000, sold: 765 },
    { name: 'Đèn Cảnh Quan Lens Kim Cương 2W', power: '2W', lumens: '180lm', battery: 'Pin 1.500mAh', price: 320000, oldPrice: 450000, sold: 654 },
  ],
  'den-nha-xuong-nlmt': [
    { name: 'Đèn Nhà Xưởng NLMT 200W', power: '200W', lumens: '2400lm', battery: 'Pin 25.000mAh', price: 2490000, oldPrice: 3200000, sold: 234 },
    { name: 'Đèn Nhà Xưởng NLMT 300W', power: '300W', lumens: '3600lm', battery: 'Pin 30.000mAh', price: 3290000, oldPrice: 4200000, sold: 187 },
    { name: 'Đèn Nhà Xưởng NLMT 400W', power: '400W', lumens: '4800lm', battery: 'Pin 40.000mAh', price: 4290000, oldPrice: 5500000, sold: 156 },
    { name: 'Đèn Nhà Xưởng NLMT 500W', power: '500W', lumens: '6000lm', battery: 'Pin 45.000mAh', price: 4990000, oldPrice: 6200000, sold: 98 },
  ],
  'pin-nlmt': [
    { name: 'Pin NLMT LiFePO4 12V 20Ah', power: '20Ah', lumens: '—', battery: 'LiFePO4 12V', price: 1890000, oldPrice: 2400000, sold: 345 },
    { name: 'Pin NLMT LiFePO4 12V 30Ah', power: '30Ah', lumens: '—', battery: 'LiFePO4 12V', price: 2490000, oldPrice: 3100000, sold: 267 },
    { name: 'Pin NLMT LiFePO4 24V 40Ah', power: '40Ah', lumens: '—', battery: 'LiFePO4 24V', price: 3890000, oldPrice: 4800000, sold: 189 },
    { name: 'Bộ Lưu Điện NLMT LD01.SL 160Wh', power: '160Wh', lumens: '—', battery: '160Wh 6500K', price: 1290000, oldPrice: 1680000, sold: 456 },
  ],
  'phu-kien-lap-dat': [
    { name: 'Tấm Pin NLMT Mono 6V 40W', power: '40W', lumens: '—', battery: 'Mono 6V', price: 890000, oldPrice: 1150000, sold: 678 },
    { name: 'Tấm Pin NLMT Mono 6V 60W', power: '60W', lumens: '—', battery: 'Mono 6V', price: 1190000, oldPrice: 1480000, sold: 534 },
    { name: 'Bộ Giá Treo Đèn NLMT', power: '—', lumens: '—', battery: 'Inox 304', price: 280000, oldPrice: 380000, sold: 1234 },
    { name: 'Dây Cáp NLMT Chống Nước 5m', power: '—', lumens: '—', battery: 'IP67', price: 150000, oldPrice: 220000, sold: 2345 },
  ],
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const PRODUCTS = [];

Object.entries(PRODUCT_TEMPLATES).forEach(([categoryId, items]) => {
  items.forEach((item, index) => {
    const id = slugify(item.name);
    PRODUCTS.push({
      id,
      categoryId,
      name: item.name,
      power: item.power,
      lumens: item.lumens,
      battery: item.battery,
      price: item.price,
      oldPrice: item.oldPrice,
      image: PRODUCT_IMAGES[(PRODUCTS.length + index) % PRODUCT_IMAGES.length],
      rating: 4.7 + (index % 3) * 0.1,
      sold: item.sold,
      badge: index === 0 ? 'Bán chạy' : index === 1 ? '-20%' : null,
      description: `${item.name} – sản phẩm năng lượng mặt trời chính hãng Phú Yên Solar. Tự sạc ban ngày, chiếu sáng suốt đêm, tiết kiệm 100% điện lưới. Chuẩn chống nước IP67, bảo hành chính hãng 24–36 tháng.`,
      specs: {
        'Công suất': item.power,
        'Quang thông': item.lumens,
        'Pin / Nguồn': item.battery,
        'Chuẩn chống nước': 'IP67',
        'Nhiệt độ màu': '6500K',
        'Bảo hành': '24 tháng',
      },
    });
  });
});

function formatPrice(n) {
  return n.toLocaleString('vi-VN') + 'đ';
}

function getCategoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}

function getProductsByCategory(categoryId) {
  return PRODUCTS.filter((p) => p.categoryId === categoryId);
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

function getFeaturedProducts(categoryId, limit = 4) {
  return getProductsByCategory(categoryId).slice(0, limit);
}
