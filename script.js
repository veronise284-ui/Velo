// script.js — typed lead, reveal on scroll, smooth scroll, active nav, mobile menu, back-to-top
document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------- Typing animation ---------------------- */
  const text = "I build accessible, clean websites and practical digital tools that support communities and learning.";
  const target = document.getElementById("animated-lead");
  const caret = document.querySelector(".typed-caret");
  const typingSpeed = 32; // ms per char

  if (target) {
    let i = 0;
    const type = () => {
      target.textContent = text.slice(0, i);
      i++;
      if (i <= text.length) {
        setTimeout(type, typingSpeed);
      } else if (caret) {
        caret.classList.add("caret-done");
        // reduce blink and keep caret faintly visible
        caret.style.opacity = "0.4";
        caret.style.animation = "none";
      }
    };
    type();
  }

  /* ---------------------- Smooth scroll & close mobile nav ---------------------- */
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // close mobile nav if open
      const toggleBtn = document.querySelector('.mobile-menu-toggle');
      const navEl = document.querySelector('.main-nav');
      if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
      if (navEl) navEl.classList.remove('open');
    });
  });

  /* ---------------------- Reveal on scroll ---------------------- */
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(r => observer.observe(r));
  } else {
    // fallback: show all
    reveals.forEach(r => r.classList.add("visible"));
  }

  /* ---------------------- Active nav highlighting ---------------------- */
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const nav = document.querySelector(".main-nav");
  const navAnchors = nav ? Array.from(nav.querySelectorAll("a[href^='#']")) : [];

  function highlightNav() {
    if (!sections.length || !nav) return;
    const scroll = window.scrollY;
    const offset = Math.round(window.innerHeight * 0.25);
    let currentId = sections[0].id || "";
    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const top = sec.getBoundingClientRect().top + window.scrollY;
      if (scroll + offset >= top) currentId = sec.id;
    }
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
    });
  }
  highlightNav();
  window.addEventListener('scroll', highlightNav, { passive: true });

  /* ---------------------- Mobile menu toggle ---------------------- */
  const toggle = document.querySelector('.mobile-menu-toggle');
  const navEl = document.querySelector('.main-nav');
  if (toggle && navEl) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      navEl.classList.toggle('open');
    });
  }

  /* ---------------------- Back to top button ---------------------- */
  const back = document.getElementById('backToTop');
  function checkBackToTop() {
    if (!back) return;
    back.style.display = (window.scrollY > 400) ? 'block' : 'none';
  }
  if (back) {
    back.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', checkBackToTop, { passive: true });
    checkBackToTop();
  }

  /* ---------------------- Contact form (mailto fallback) ---------------------- */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (form.elements['name']?.value || '').trim();
      const email = (form.elements['email']?.value || '').trim();
      const message = (form.elements['message']?.value || '').trim();

      if (!name || !email || !message) {
        alert('Please fill all fields');
        return;
      }

      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:veronise284@gmail.com?subject=Portfolio%20message%20from%20${encodeURIComponent(name)}&body=${body}`;
    });
  }
});
