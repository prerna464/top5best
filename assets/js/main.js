/**
 * main.js — Top 5 Best Blog
 * Handles: category filtering, dropdown toggle, scroll reveal, header shadow
 */

(function () {
  'use strict';

  /* ── Element references ── */
  const cards         = document.querySelectorAll('.blog-card');
  const mcats         = document.querySelectorAll('.mcat');
  const sbItems       = document.querySelectorAll('.sb-cat-item');
  const catSection    = document.getElementById('categories-section');
  const latestSection = document.querySelector('.latest-wrap');
  const allMenu       = document.querySelector('.all-menu');
  const dropdown      = document.querySelector('.dropdown');
  const header        = document.querySelector('header');

  /* ════════════════════════════════════
     UTILITY: Smooth scroll to element
  ════════════════════════════════════ */
  function scrollToEl(el, extraOffset = 80) {
    const top = el.getBoundingClientRect().top + window.scrollY - extraOffset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  /* ════════════════════════════════════
     CATEGORY FILTER
  ════════════════════════════════════ */
  function filterCat(cat) {
    cards.forEach((card, i) => {
      const show = cat === 'all' || card.dataset.cat === cat;
      card.classList.toggle('hidden', !show);

      if (show) {
        card.classList.remove('visible');
        setTimeout(() => card.classList.add('visible'), i * 55);
      }
    });

    mcats.forEach(t   => t.classList.toggle('active', t.dataset.cat === cat));
    sbItems.forEach(s => s.classList.toggle('active', s.dataset.cat === cat));
  }

  /* ── Masthead tabs ── */
  mcats.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;

      if (cat === 'all') {
        // "All" tab: scroll to category image grid
        scrollToEl(catSection, 76);
        mcats.forEach(t => t.classList.toggle('active', t.dataset.cat === 'all'));
      } else {
        filterCat(cat);
        scrollToEl(latestSection, 80);
      }
    });
  });

  /* ── Sidebar category items ── */
  sbItems.forEach(s => {
    s.addEventListener('click', () => {
      filterCat(s.dataset.cat);
      scrollToEl(latestSection, 80);
    });
  });

  /* ════════════════════════════════════
     DROPDOWN TOGGLE (mobile-friendly)
  ════════════════════════════════════ */
  allMenu.addEventListener('click', e => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });

  // Close on outside click
  document.addEventListener('click', () => dropdown.classList.remove('open'));

  // Prevent clicks inside dropdown from closing it
  dropdown.addEventListener('click', e => e.stopPropagation());

  /* ════════════════════════════════════
     SCROLL REVEAL (IntersectionObserver)
  ════════════════════════════════════ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 65);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach(card => revealObserver.observe(card));

  /* ════════════════════════════════════
     HEADER SHADOW ON SCROLL
  ════════════════════════════════════ */
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 24px rgba(0,0,0,0.13)'
      : '0 2px 20px rgba(0,0,0,0.06)';
  }, { passive: true });

})();