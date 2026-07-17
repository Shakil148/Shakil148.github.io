/* ==========================================================================
   MD Shakil Hossen — Portfolio Scripts
   Theme toggle, typed hero, counters, scroll animations, mobile nav, form.
   Pure vanilla ES6. No frameworks.
   ========================================================================== */

(() => {
  "use strict";

  /* ------------------- Theme (dark/light) ------------------- */
  const root = document.documentElement;
  const themeKey = "shakil-theme";
  const savedTheme =
    localStorage.getItem(themeKey) ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  root.setAttribute("data-theme", savedTheme);

  document.getElementById("themeToggle")?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(themeKey, next);
  });

  /* ------------------- Sticky nav shadow ------------------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav?.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ------------------- Mobile nav ------------------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelector(".nav__links");
  menuToggle?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(!!open));
  });
  navLinks?.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    })
  );

  /* ------------------- Footer year ------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------- Typed.js hero rotator ------------------- */
  const initTyped = () => {
    if (typeof window.Typed !== "function") return;
    new window.Typed("#typed", {
      strings: [
        "Senior PHP Developer.",
        "Laravel Specialist.",
        "FinTech Engineer.",
        "REST API Architect.",
        "Problem Solver.",
      ],
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 1600,
      loop: true,
      smartBackspace: true,
    });
  };
  window.addEventListener("load", initTyped);

  /* ------------------- AOS scroll animations ------------------- */
  window.addEventListener("load", () => {
    if (typeof window.AOS?.init === "function") {
      window.AOS.init({ duration: 700, easing: "ease-out-cubic", once: true, offset: 60 });
    }
  });

  /* ------------------- Animated counters ------------------- */
  const counters = document.querySelectorAll(".stat__num");
  const runCounter = (el) => {
    const target = Number(el.dataset.count || 0);
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          runCounter(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => io.observe(el));

  /* ------------------- Contact form (client-side only) ------------------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.style.color = "var(--primary)";
      status.textContent = "Please fill in all fields correctly.";
      return;
    }
    // Real submission would POST to an endpoint; we simulate success.
    status.style.color = "var(--success)";
    // status.textContent = "✅ Thanks! Your message has been sent. I'll reply within 24 hours.";
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    const mailto =
        `mailto:shakilpp148@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}

        Email: ${email}

        Message:
        ${message}`
    )}`;
    window.location.href = mailto;

    form.reset();
  });

  /* ------------------- Smooth anchor scroll offset ------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
})();
