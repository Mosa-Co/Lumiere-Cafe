// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check if user has a saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Apply saved theme or default to dark
  if (savedTheme === 'light') {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    themeToggle.checked = true;
  } else {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    themeToggle.checked = false;
  }
  
  // Handle theme toggle change
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  });
  
  // Add scroll class to navbar
  const navbar = document.querySelector('.navbar');
  
  const addScrollClass = () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  // Call on page load
  addScrollClass();
  
  // Add event listener for scroll
  window.addEventListener('scroll', addScrollClass);
  
  // Add intersection observer for animation
  const sections = document.querySelectorAll('.menu-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    observer.observe(section);
  });
});