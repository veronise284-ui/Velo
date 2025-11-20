// script.js — typed lead, reveal on scroll, smooth scroll, active nav, mobile menu, back-to-top

document.addEventListener("DOMContentLoaded", () => {
  // Typing animation
  const text = "I build accessible, clean websites and practical digital tools that support communities and learning.";
  const target = document.getElementById("animated-lead");
  const caret = document.querySelector(".typed-caret");
  let typingSpeed = 32; // ms per char (adjust here)

  if (target) {
    let i = 0;
    const type = () => {
      if (i <= text.length) {
        target.textContent = text.slice(0, i);
        i++;
        setTimeout(type, typingSpeed);
      } else if (caret) {
        caret.classList.add("caret-done");
        // gently reduce caret blink
        caret.style.opacity = '0.4';
      }
    };
    type();
  }

  // Smooth scroll for anchors and close mobile menu after click
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // close mobile nav if open
      document.querySelector('.mobile-menu-toggle')?.setAttribute('aria-expanded', 'false');
      document.querySelector('.main-nav')?.classList.remove('open');
    });
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver((entries, ob) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          ob.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(r => obs.observe(r));
  } else {
    reveals.forEach(r => r.classList.add("visible"));
  }

  // Active nav highlighting while scrolling
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const nav = document.querySelector(".main-nav");
  function highlightNav() {
    const scroll = window.scrollY;
    const offset = window.innerHeight * 0.25;
    let currentId = sections[0]?.id || "";
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top + window.scrollY;
      if (scroll + offset >= top) currentId = sec.id;
    });
    nav?.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`));
  }
  highlightNav();
  window.addEventListener('scroll', highlightNav);

  // Mobile menu toggle
  const toggle = document.querySelector('.mobile-menu-toggle');
  toggle?.addEventListener('click', () => {
    const navEl = document.querySelector('.main-nav');
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navEl.classList.toggle('open');
  });

  // Back to top button
  const back = document.getElementById('backToTop');
  function checkBackToTop() {
    if (window.scrollY > 400) back.style.display = 'block';
    else back.style.display = 'none';
  }
  back?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', checkBackToTop);
  checkBackToTop();

  // Contact form (mailto fallback)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      if (!name || !email || !message) { alert('Please fill all fields'); return; }
      const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
      window.location.href = `mailto:veronise284@gmail.com?subject=Portfolio%20message%20from%20${encodeURIComponent(name)}&body=${body}`;
    });
  }
});
