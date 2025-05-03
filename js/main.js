// Highlight the active link on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#sidebar .nav-link').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  
    // Simple contact form handler
    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        form.reset();
      });
    }
  });
  