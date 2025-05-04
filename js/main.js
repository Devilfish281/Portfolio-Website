/*!
 Sphinx-style documentation:

 main.js
 =======
 - Sidebar link highlighting
 - Mobile hamburger menu
 - Contact form submission
 - Client-side flip transitions (enter/exit + popstate/pageshow)
*/

/** Highlight the current sidebar link */
function highlightActiveLink() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar .nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
}

/** Toggle the mobile nav menu */
function toggleMenu() {
  const navMenu   = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');
  const isOpen    = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  navMenu.setAttribute('aria-hidden', !isOpen);
  document.body.classList.toggle('menu-open', isOpen);
}

/** Close nav if clicking outside */
function handleOutsideClick(evt) {
  const navMenu   = document.getElementById('nav-menu');
  const hamburger = document.getElementById('hamburger');
  if (!navMenu.classList.contains('open')) return;
  if (navMenu.contains(evt.target) || hamburger.contains(evt.target)) return;
  toggleMenu();
}

document.addEventListener('DOMContentLoaded', () => {
  highlightActiveLink();

  // Mobile menu setup
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  if (hamburger && navMenu) {
    const wasOpen = localStorage.getItem('menuOpen') === 'true';
    if (wasOpen && window.matchMedia('(max-width: 768px)').matches) {
      navMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      navMenu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('menu-open');
    }
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('touchstart', e => { e.preventDefault(); toggleMenu(); });
    document.addEventListener('click', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    ['click', 'touchstart'].forEach(evtName => {
      hamburger.addEventListener(evtName, () => {
        localStorage.setItem('menuOpen', navMenu.classList.contains('open'));
      });
    });
  }

  // Contact form submission
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const data = {
        name:    form.name.value.trim(),
        email:   form.email.value.trim(),
        message: form.message.value.trim(),
      };
      try {
        const res = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          alert('Message sent successfully!');
          form.reset();
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

  /* ────────────────────────────────────────── */
  /* Flip-transition logic                     */
  /* ────────────────────────────────────────── */
  const pageEl = document.getElementById('page');
  if (pageEl) {
    // Clear any leftover exit classes before entering     
    pageEl.classList.remove('page-exit', 'page-exit-active'); 

    // Define and run the enter animation                 
    const runEnterAnimation = () => {                      
      pageEl.classList.remove('page-exit', 'page-exit-active'); 
      pageEl.classList.add('page-enter');                  
      requestAnimationFrame(() => {
        pageEl.classList.add('page-enter-active');         
      });
      pageEl.addEventListener('transitionend', () => {
        pageEl.classList.remove('page-enter', 'page-enter-active');
      }, { once: true });
    };
    runEnterAnimation();                                   

    // Intercept clicks on “View Details” & “Back” links
    const interceptLinks = selector => {
      document.querySelectorAll(selector).forEach(anchor => {
        anchor.addEventListener('click', evt => {
          if (evt.metaKey || evt.ctrlKey || anchor.target === '_blank') return;
          evt.preventDefault();
          pageEl.classList.add('page-exit');               
          requestAnimationFrame(() => {
            pageEl.classList.add('page-exit-active');      
          });
          pageEl.addEventListener('transitionend', () => {
            window.location.href = anchor.href;
          }, { once: true });
        });
      });
    };
    interceptLinks('a[href="project1.html"], a[href="projects.html"]');

    // Replay enter on back/forward and bfcache restores
    window.addEventListener('popstate', () => { runEnterAnimation(); }); 
    window.addEventListener('pageshow', () => { runEnterAnimation(); }); 
  }
});
