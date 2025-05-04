// main.js: Handles sidebar highlighting, mobile hamburger menu, and contact form submission

/**
 * Highlights the current active link in the sidebar based on the page URL.
 * Adds 'active' class to the matching <a> element.
 */
function highlightActiveLink() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

/**
 * Toggles the visibility of the mobile nav-menu.
 * - Adds/removes the 'open' class to slide menu in/out.
 * - Updates ARIA attributes for accessibility.
 * - Toggles a body class to lock background scroll when open.
 */
function toggleMenu() {
  const navMenu   = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');
  const isOpen    = navMenu.classList.toggle('open');

  // Update ARIA-expanded on the button and ARIA-hidden on the nav
  hamburger.setAttribute('aria-expanded', isOpen);
  navMenu.setAttribute('aria-hidden', !isOpen);

  // Prevent background scrolling when menu is open
  document.body.classList.toggle('menu-open', isOpen);
}

/**
 * Listens for clicks/touches outside the nav menu or hamburger button
 * and closes the menu if it is currently open.
 * @param {Event} evt - The click or touch event
 */
function handleOutsideClick(evt) {
  const navMenu   = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');

  // Only act if menu is open
  if (!navMenu.classList.contains('open')) return;

  // Ignore clicks/touches inside the menu or on the button
  if (navMenu.contains(evt.target) || hamburger.contains(evt.target)) return;

  // Close the menu
  toggleMenu();
}

// Run setup once the DOM has fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // 1. Highlight the active sidebar link
  highlightActiveLink();

  // 2. Initialize hamburger toggle behavior
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    // Restore menu open state from previous session (mobile only)
    const wasOpen = localStorage.getItem('menuOpen') === 'true';
    if (wasOpen && window.matchMedia('(max-width: 768px)').matches) {
      navMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      navMenu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    }

    // Attach event listeners for click & touch
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchstart', e => { e.preventDefault(); toggleMenu(); });
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    // Persist open/closed state on each toggle
    ['click', 'touchstart'].forEach(evtName => {
      hamburger.addEventListener(evtName, () => {
        localStorage.setItem('menuOpen', navMenu.classList.contains('open'));
      });
    });
  }

  // 3. Set up contact form submission via Fetch API
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();  // Prevent traditional form post

      // Collect trimmed input values
      const data = {
        name:    form.name.value.trim(),
        email:   form.email.value.trim(),
        message: form.message.value.trim(),
      };

      try {
        // Send form data as JSON to backend endpoint
        const res = await fetch('http://127.0.0.1:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          alert('Message sent successfully!');
          form.reset();  // Clear form fields
        } else {
          const text = await res.text();
          console.error('Server error', res.status, text);
          alert(`Server returned ${res.status}: ${text}`);
        }
      } catch (err) {
        console.error('Network error:', err);
        alert('Network error. Please try again.');
      }
    });
  }
});
