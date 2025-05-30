// Language toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const languageToggle = document.getElementById('language-toggle');
  const html = document.querySelector('html');
  
  // Elements with data attributes
  const elementsWithDataAttrs = document.querySelectorAll('[data-en], [data-ar]');
  const inputsWithPlaceholder = document.querySelectorAll('[data-en-placeholder], [data-ar-placeholder]');
  
  // Check if user has a saved language preference
  const savedLanguage = localStorage.getItem('language');
  
  // Apply saved language or default to English
  if (savedLanguage === 'ar') {
    changeToArabic();
    languageToggle.checked = true;
  } else {
    changeToEnglish();
    languageToggle.checked = false;
  }
  
  // Handle language toggle change
  languageToggle.addEventListener('change', () => {
    if (languageToggle.checked) {
      changeToArabic();
    } else {
      changeToEnglish();
    }
  });
  
  // Function to change language to English
  function changeToEnglish() {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    localStorage.setItem('language', 'en');
    
    elementsWithDataAttrs.forEach(element => {
      if (element.hasAttribute('data-en')) {
        element.textContent = element.getAttribute('data-en');
      }
      if (element.hasAttribute('data-en-placeholder')) {
        element.setAttribute('placeholder', element.getAttribute('data-en-placeholder'));
      }
    });
  }
  
  // Function to change language to Arabic
  function changeToArabic() {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    localStorage.setItem('language', 'ar');
    
    elementsWithDataAttrs.forEach(element => {
      if (element.hasAttribute('data-ar')) {
        element.textContent = element.getAttribute('data-ar');
      }
      if (element.hasAttribute('data-ar-placeholder')) {
        element.setAttribute('placeholder', element.getAttribute('data-ar-placeholder'));
      }
    });
  }
  
  // Handle Bootstrap RTL CSS
  function loadBootstrapRTL() {
    const rtlStylesheet = document.getElementById('bootstrap-rtl');
    
    if (html.getAttribute('dir') === 'rtl') {
      if (!rtlStylesheet) {
        const link = document.createElement('link');
        link.id = 'bootstrap-rtl';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.rtl.min.css';
        document.head.appendChild(link);
      }
    } else {
      if (rtlStylesheet) {
        rtlStylesheet.remove();
      }
    }
  }
  
  // Load RTL styles initially and on language change
  loadBootstrapRTL();
  languageToggle.addEventListener('change', loadBootstrapRTL);
});