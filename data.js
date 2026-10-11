/* ============================================================
   BEAR · общий слой данных
   Хранение — localStorage, ключ 'bear_data_v1'
   ============================================================ */
(function (global) {
  'use strict';

  var KEY     = 'bear_data_v1';
  var SESSION = 'bear_admin_session_v1';
  var PASS_KEY = 'bear_pass_v1';

  /* ---------- SVG-иконки для категорий и заглушек ---------- */
  var ICONS = {
    faucet:
      '<path d="M22 34V16"/><path d="M22 16c0-6-4-8-9-8v5"/><rect x="18" y="34" width="8" height="2" rx="1"/>',
    bath:
      '<rect x="6" y="16" width="28" height="12" rx="4"/><path d="M13 16v-3a2 2 0 0 1 2-2h13"/>',
    toilet:
      '<rect x="10" y="8" width="20" height="12" rx="2"/><path d="M14 20v12M26 20v12M20 4v4"/>',
    shower:
      '<path d="M20 6v6"/><circle cx="20" cy="24" r="8"/><path d="M14 32l-2 4M20 34v4M26 32l2 4"/>',
    sink:
      '<ellipse cx="20" cy="22" rx="13" ry="7"/><path d="M20 15V9"/><circle cx="20" cy="22" r="1.5"/>',
    furniture:
      '<rect x="7" y="10" width="26" height="20" rx="2"/><path d="M7 16h26M14 10V6M26 10V6"/>',
    towel:
      '<circle cx="20" cy="20" r="10"/><path d="M20 10v20M10 20h20"/>',
    accessory:
      '<path d="M10 30V10h6v20M24 30V18h6v12"/><path d="M6 34h28"/>',
    mixer:
      '<path d="M22 34V16"/><path d="M22 16c0-6-4-8-9-8v5"/><rect x="18" y="34" width="8" height="2" rx="1"/>'
  };

  /* ---------- Начальные данные (сид) ---------- */
  var SEED = {
    settings: {
      brandName:  'Bear',
      tagline:    'Каталог сантехники · Том 01',
      topbarMid:  'Каталог · Том 01 · Весна-Лето 2026',
      phone:      '+7 (495) 123-45-67',
      email:      'studio@bear.ru',
      address:    'Москва, Красный Октябрь',
      heroKicker: 'Выпуск первый',
      heroTitle1: 'Сантехника',
      heroTitle2: 'как предмет',
      heroTitle3: 'интерьера',
      heroText:   'Каталог-издание европейских мануфактур: от серийных смесителей до авторской керамики. Каждый предмет — со спецификацией, происхождением и сроком службы.',
      subscribeText: 'Одно письмо в месяц. Премьеры мануфактур, технические обзоры, приглашения в шоурум и закрытые распродажи.',
      footerAbout: 'Каталог-издание сантехники и мебели для ванных комнат от европейских мануфактур. Работаем с 1994 года.'
    },
    categories: [
      { id: 'c1', num: '01', name: 'Смесители',           count: '042', icon: 'faucet' },
      { id: 'c2', num: '02', name: 'Ванны и поддоны',     count: '068', icon: 'bath' },
      { id: 'c3', num: '03', name: 'Унитазы и биде',      count: '056', icon: 'toilet' },
      { id: 'c4', num: '04', name: 'Душевые системы',     count: '038', icon: 'shower' },
      { id: 'c5', num: '05', name: 'Умывальники',         count: '092', icon: 'sink' },
      { id: 'c6', num: '06', name: 'Мебель',              count: '074', icon: 'furniture' },
      { id: 'c7', num: '07', name: 'Полотенце-сушители',  count: '028', icon: 'towel' },
      { id: 'c8', num: '08', name: 'Аксессуары',          count: '014', icon: 'accessory' }
    ],
    products: [
      { id: 'p1', article: '№ 001', brand: 'Grohe · DE', name: 'Смеситель для кухни Minta с выдвижным изливом', spec1: 'Вынос 220 мм', spec2: 'Латунь', rating: '4.9', reviews: '1248', price: 14990, oldPrice: 18500, clubPrice: 13790, tags: 'hit', icon: 'faucet', image: null, badge: 'Хит' },
      { id: 'p2', article: '№ 002', brand: 'Roca · ES',  name: 'Ванна акриловая Gap 170 × 75 см', spec1: '1700 мм', spec2: 'Акрил', rating: '4.7', reviews: '856', price: 22400, oldPrice: 28000, clubPrice: 20600, tags: 'sale', icon: 'bath', image: null, badge: '−20%' },
      { id: 'p3', article: '№ 003', brand: 'Hansgrohe · DE', name: 'Душевая система Raindance Select E 300', spec1: 'Ø 300 мм', spec2: 'Хром', rating: '5.0', reviews: '312', price: 142800, oldPrice: 0, clubPrice: 131400, tags: 'new premium', icon: 'shower', image: null, badge: 'Новинка' },
      { id: 'p4', article: '№ 004', brand: 'Villeroy & Boch · DE', name: 'Умывальник накладной Loop & Friends 60 см', spec1: '600 мм', spec2: 'Фарфор', rating: '4.8', reviews: '542', price: 96400, oldPrice: 113400, clubPrice: 88700, tags: 'hit sale', icon: 'sink', image: null, badge: '−15%' },
      { id: 'p5', article: '№ 005', brand: 'Dornbracht · DE', name: 'Смеситель для умывальника Meta с донным клапаном', spec1: 'Вынос 130 мм', spec2: 'Латунь', rating: '4.9', reviews: '87', price: 184500, oldPrice: 0, clubPrice: 169700, tags: 'premium', icon: 'faucet', image: null, badge: '' },
      { id: 'p6', article: '№ 006', brand: 'Grohe · DE', name: 'Тумба под умывальник Essence 800 мм с ящиками', spec1: '800 мм', spec2: 'МДФ, шпон', rating: '4.6', reviews: '224', price: 68900, oldPrice: 0, clubPrice: 63400, tags: 'hit', icon: 'furniture', image: null, badge: 'Хит' },
      { id: 'p7', article: '№ 007', brand: 'Valtec · RU', name: 'Комплект труб для разводки, 50 метров', spec1: '50 м', spec2: 'PEX-a', rating: '4.8', reviews: '1892', price: 8990, oldPrice: 11990, clubPrice: 8270, tags: 'sale', icon: 'accessory', image: null, badge: '−25%' },
      { id: 'p8', article: '№ 008', brand: 'Axor · DE', name: 'Полотенцесушитель водяной Uno 500 × 800', spec1: '500 × 800', spec2: 'Хром', rating: '4.7', reviews: '158', price: 27900, oldPrice: 31000, clubPrice: 25670, tags: 'new', icon: 'towel', image: null, badge: 'Новинка' }
    ]
  };

  /* ---------- Утилиты ---------- */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  function uid(prefix) {
    return (prefix || 'id') + '_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) {
        var initial = clone(SEED);
        localStorage.setItem(KEY, JSON.stringify(initial));
        return initial;
      }
      var data = JSON.parse(raw);
      // merge новых полей settings
      for (var k in SEED.settings) {
        if (!(k in data.settings)) data.settings[k] = SEED.settings[k];
      }
      if (!Array.isArray(data.categories)) data.categories = clone(SEED.categories);
      if (!Array.isArray(data.products))   data.products   = clone(SEED.products);
      return data;
    } catch (e) {
      console.error('Bear data load error', e);
      return clone(SEED);
    }
  }

  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      alert('Не удалось сохранить: превышен лимит хранилища браузера. Удалите несколько изображений или товаров.');
      return false;
    }
  }

  function reset() {
    localStorage.removeItem(KEY);
    return load();
  }

  function storageSize() {
    var raw = localStorage.getItem(KEY) || '';
    return new Blob([raw]).size;
  }

  /* ---------- Авторизация ---------- */
  function getPassword() {
    return localStorage.getItem(PASS_KEY) || 'bear2026';
  }
  function setPassword(p) {
    localStorage.setItem(PASS_KEY, p);
  }
  function isAuthed() {
    return sessionStorage.getItem(SESSION) === 'ok';
  }
  function login(pass) {
    if (pass === getPassword()) {
      sessionStorage.setItem(SESSION, 'ok');
      return true;
    }
    return false;
  }
  function logout() {
    sessionStorage.removeItem(SESSION);
  }

  /* ---------- Сжатие изображения ---------- */
  function compressImage(file, maxSize, quality, cb) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var w = img.width, h = img.height;
        if (w > h && w > maxSize) { h = Math.round(h * maxSize / w); w = maxSize; }
        else if (h > maxSize)    { w = Math.round(w * maxSize / h); h = maxSize; }
        var c = document.createElement('canvas');
        c.width = w; c.height = h;
        var ctx = c.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        cb(c.toDataURL('image/jpeg', quality));
      };
      img.onerror = function () { cb(null); };
      img.src = e.target.result;
    };
    reader.onerror = function () { cb(null); };
    reader.readAsDataURL(file);
  }

  /* ---------- Экспорт / импорт JSON ---------- */
  function exportJSON() {
    var data = load();
    return JSON.stringify(data, null, 2);
  }
  function importJSON(json) {
    var data = JSON.parse(json);
    if (!data || typeof data !== 'object') throw new Error('Неверный формат');
    if (!data.settings)   data.settings = clone(SEED.settings);
    if (!data.categories) data.categories = clone(SEED.categories);
    if (!data.products)   data.products = clone(SEED.products);
    save(data);
    return data;
  }

  /* ---------- SVG-хелперы для витрины ---------- */
  function iconSvg(key, size) {
    var path = ICONS[key] || ICONS.faucet;
    var vw = '0 0 40 40';
    var sw = 1.2;
    if (key === 'faucet' || key === 'mixer') { vw = '0 0 140 210'; sw = 1.4; }
    if (key === 'bath')   { vw = '0 0 200 130'; sw = 1.4; }
    if (key === 'sink')   { vw = '0 0 200 130'; sw = 1.4; }
    return '<svg viewBox="' + vw + '" fill="none" stroke="currentColor" stroke-width="' + sw + '" stroke-linecap="round" stroke-linejoin="round">' + path + '</svg>';
  }

  /* ---------- Экспорт ---------- */
  global.BearData = {
    ICONS: ICONS,
    SEED: SEED,
    load: load,
    save: save,
    reset: reset,
    uid: uid,
    storageSize: storageSize,
    getPassword: getPassword,
    setPassword: setPassword,
    isAuthed: isAuthed,
    login: login,
    logout: logout,
    compressImage: compressImage,
    exportJSON: exportJSON,
    importJSON: importJSON,
    iconSvg: iconSvg
  };

})(window);