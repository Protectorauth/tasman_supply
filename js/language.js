(function () {
  'use strict';

  const STORAGE_KEY = 'tasman-lang';
  const toggle = document.querySelector('.lang-toggle');
  const mobileToggle = document.querySelector('.lang-toggle-mobile');

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function applyText(lang) {
    document.querySelectorAll('[data-en][data-mi]').forEach(function (el) {
      var text = lang === 'mi' ? el.getAttribute('data-mi') : el.getAttribute('data-en');
      if (!text) return;
      if (el.tagName === 'OPTION') {
        el.textContent = text;
      } else {
        el.textContent = text;
      }
    });
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    if (lang === 'mi') {
      document.body.classList.add('lang-mi');
      document.documentElement.lang = 'mi';
    } else {
      document.body.classList.remove('lang-mi');
      document.documentElement.lang = 'en';
    }
    applyText(lang);
    updateToggleLabel(lang);
  }

  function updateToggleLabel(lang) {
    var label = lang === 'mi' ? 'MI ／ EN' : 'EN ／ MI';
    if (toggle) toggle.textContent = label;
    if (mobileToggle) mobileToggle.textContent = label;
  }

  function toggleLang() {
    setLang(getLang() === 'en' ? 'mi' : 'en');
  }

  setLang(getLang());

  if (toggle) toggle.addEventListener('click', toggleLang);
  if (mobileToggle) mobileToggle.addEventListener('click', toggleLang);
})();
