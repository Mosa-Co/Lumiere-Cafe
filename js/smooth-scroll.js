// Smooth scrolling functionality
document.addEventListener('DOMContentLoaded', () => {
  // Get all navigation links with hash links
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  // Add click event listener to each nav link
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default for links with hash
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        // Get the target section id
        const targetId = this.getAttribute('href');
        
        // Handle # link (scroll to top)
        if (targetId === '#') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          return;
        }
        
        // Find the target element
        const targetElement = document.querySelector(targetId);
        
        // If target exists, scroll to it
        if (targetElement) {
          // Get navbar height to offset scroll position
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Close mobile menu if open
          const navbarToggler = document.querySelector('.navbar-toggler');
          const navbarCollapse = document.querySelector('.navbar-collapse');
          
          if (navbarCollapse.classList.contains('show')) {
            // Use Bootstrap's collapse method if available
            if (bootstrap && bootstrap.Collapse) {
              const bsCollapse = new bootstrap.Collapse(navbarCollapse);
              bsCollapse.hide();
            } else {
              // Fallback
              navbarCollapse.classList.remove('show');
            }
          }
        }
      }
    });
  });
  
  // Handle active state for navigation items
  const sections = document.querySelectorAll('section');
  
  function setActiveNavItem() {
    const scrollPosition = window.scrollY + 100; // Offset for navbar
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Adjust for navbar
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to current section link
        const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }
  
  // Set active nav item on page load and scroll
  setActiveNavItem();
  window.addEventListener('scroll', setActiveNavItem);
});