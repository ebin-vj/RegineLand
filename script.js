/* =============================================
   REGINELAND GROUP — MAIN JAVASCRIPT v2.0
   B2B Logistics & Trade
   ============================================= */
'use strict';

// =========================================
// 1. NAV: Transparent → Solid on scroll
// =========================================
(function initNav() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const threshold = 60;
  function updateNav() {
    if (window.scrollY > threshold) {
      header.classList.remove('transparent');
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
      header.classList.add('transparent');
    }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

// =========================================
// 2. MOBILE NAV TOGGLE
// =========================================
(function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu   = document.getElementById('nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    const lines = toggle.querySelectorAll('.hamburger-line');
    if (open) {
      lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      lines[1].style.opacity   = '0';
      lines[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      lines.forEach(l => { l.style.transform = ''; l.style.opacity = ''; });
    }
  });

  // Close on link click
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelectorAll('.hamburger-line').forEach(l => {
        l.style.transform = ''; l.style.opacity = '';
      });
    })
  );

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelectorAll('.hamburger-line').forEach(l => {
        l.style.transform = ''; l.style.opacity = '';
      });
    }
  });
})();

// =========================================
// 3. HERO SLIDER (auto-play + dot controls)
// =========================================
(function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current  = 0;
  let interval = null;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    dots[current]?.setAttribute('aria-selected', 'false');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    dots[current]?.setAttribute('aria-selected', 'true');
  }

  function start() {
    interval = setInterval(() => goTo(current + 1), 5000);
  }
  function reset() { clearInterval(interval); start(); }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); reset(); });
    dot.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i); reset(); }
    });
  });

  start();
})();

// =========================================
// 4. INTERSECTION OBSERVER — REVEAL
// =========================================
(function initReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
})();

// =========================================
// 5. ACTIVE NAV LINK
// =========================================
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href')?.split('#')[0].split('/').pop() || '';
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// =========================================
// 6. FOOTER YEAR
// =========================================
(function setYear() {
  const el = document.getElementById('current-year');
  if (el) el.textContent = new Date().getFullYear();
})();

// =========================================
// 7. ANIMATED COUNTER
// =========================================
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const easeOutExpo = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

  function animateCounter(el) {
    const raw    = el.getAttribute('data-count');
    const target = parseInt(raw, 10);
    const suffix = el.textContent.replace(/[0-9]/g, '').trim();
    const dur    = 2000;
    const start  = performance.now();

    function update(now) {
      const p  = Math.min((now - start) / dur, 1);
      const ep = easeOutExpo(p);
      el.textContent = Math.round(target * ep) + suffix;
      if (p < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
})();

// =========================================
// 8. SECTOR NAV TABS (sectors page)
// =========================================
(function initSectorTabs() {
  const tabs     = document.querySelectorAll('.sector-tab');
  const sections = document.querySelectorAll('.sector-section');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');
      const sec    = document.getElementById(target);
      if (sec) {
        const offset = document.querySelector('.sector-nav')?.offsetHeight || 0;
        const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
        window.scrollTo({ top: sec.offsetTop - offset - navH - 20, behavior: 'smooth' });
      }
    });
  });

  // Highlight on scroll
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id  = e.target.id;
        tabs.forEach(t => {
          t.classList.toggle('active', t.getAttribute('data-target') === id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
})();

// =========================================
// 9. OFFICE COUNTRY FILTER (network page)
// =========================================
(function initOfficeFilter() {
  const btns  = document.querySelectorAll('.country-btn');
  const cards = document.querySelectorAll('.office-card');
  if (!btns.length || !cards.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-country');

      cards.forEach(card => {
        const country = card.getAttribute('data-country');
        const show    = filter === 'all' || country === filter;
        card.style.display = show ? '' : 'none';
        if (show) {
          card.style.animation = 'countUp 0.35s ease both';
        }
      });
    });
  });
})();

// =========================================
// 10. SMART CONTACT FORM
// =========================================
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const submitBtn = form?.querySelector('.form-submit');
  if (!form) return;

  // Auto-populate office email based on selected office
  const officeSelect  = document.getElementById('contact-office');
  const officeEmailEl = document.getElementById('office-email-preview');
  const officeEmails  = {
    india:  'india@regineland.com',
    uk:     'uk@regineland.com',
    italy:  'italy@regineland.com',
    uae:    'uae@regineland.com',
    general:'info@regineland.com'
  };

  if (officeSelect && officeEmailEl) {
    officeSelect.addEventListener('change', () => {
      const val = officeSelect.value;
      if (val && officeEmails[val]) {
        officeEmailEl.textContent = `Your message will be sent to: ${officeEmails[val]}`;
        officeEmailEl.style.display = 'block';
      } else {
        officeEmailEl.style.display = 'none';
      }
    });
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (submitBtn) {
      submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> Sending…';
      submitBtn.disabled = true;
    }
    setTimeout(() => {
      if (submitBtn) {
        submitBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!';
        submitBtn.style.background = '#1a7a6e';
        submitBtn.style.color = '#fff';
      }
      form.reset();
      if (officeEmailEl) officeEmailEl.style.display = 'none';
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.innerHTML = 'Send Message <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
          submitBtn.style.background = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }
      }, 4000);
    }, 1500);
  });
})();

// =========================================
// 11. SMOOTH SCROLL for hash links
// =========================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id  = a.getAttribute('href').slice(1);
      const el  = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
      window.scrollTo({ top: el.offsetTop - navH - 20, behavior: 'smooth' });
    });
  });
})();

// =========================================
// 12. TRACK SHIPMENT STUB
// =========================================
(function initTracking() {
  const form  = document.getElementById('track-form');
  const input = document.getElementById('track-input');
  const result = document.getElementById('track-result');
  if (!form || !input) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const ref = input.value.trim();
    if (!ref) return;
    if (result) {
      result.innerHTML = `
        <div style="background:var(--sky);border:1px solid rgba(26,95,168,0.2);border-radius:var(--radius-md);padding:24px;margin-top:20px;">
          <p style="font-size:0.8rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:var(--blue);margin-bottom:8px;">Tracking Reference: ${ref}</p>
          <p style="font-size:1rem;font-weight:600;color:var(--navy);">For live tracking status, please contact your dedicated trade coordinator.</p>
          <p style="font-size:0.88rem;color:var(--text-muted);margin-top:8px;">Our team will provide real-time updates within 2 hours of inquiry.</p>
          <a href="contact.html" style="display:inline-block;margin-top:16px;" class="btn btn-navy btn-sm">Contact Trade Coordinator</a>
        </div>`;
    }
  });
})();

// =========================================
// 13. LANGUAGE SWITCHER
// =========================================
(function initLangSwitcher() {
  // Already handled via href links — just style active state
  const path = window.location.pathname;
  const isIt  = path.includes('/it/') || path.includes('\\it\\');
  const langEn = document.getElementById('lang-en');
  const langIt = document.getElementById('lang-it');
  if (!langEn || !langIt) return;

  if (isIt) {
    langIt.style.color = 'rgba(255,255,255,0.4)';
    langIt.style.cursor = 'default';
    langEn.style.color = '';
    langEn.style.cursor = '';
  }
})();
