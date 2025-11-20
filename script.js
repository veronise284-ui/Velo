document.addEventListener('DOMContentLoaded', () => {
  // -------- Smooth scroll for internal links --------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // -------- Contact form: simple mailto fallback --------
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
      }

      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href =
        `mailto:veronise284@gmail.com?subject=Portfolio%20message%20from%20${encodeURIComponent(name)}&body=${body}`;
    });
  }

  // -------- Typing animation for hero text --------
  const text = "I build accessible, clean websites and practical digital tools that support communities and learning.";
  const target = document.getElementById('animated-lead');
  const caret = document.querySelector('.typed-caret');

  if (target) {
    let i = 0;
    const speed = 40;          // typing speed in ms (adjust as you like)
    const startDelay = 300;    // delay before typing starts

    function type() {
      if (i <= text.length) {
        target.textContent = text.slice(0, i);
        i++;
        setTimeout(type, speed);
      } else {
        // keep caret but slow blink a bit after finishing
        if (caret) {
          caret.style.animationDuration = '1.2s';
        }
      }
    }

    setTimeout(type, startDelay);
  }

  // -------- Reveal-on-scroll animations for sections --------
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: just show all
    revealElements.forEach(el => el.classList.add('visible'));
  }
});

