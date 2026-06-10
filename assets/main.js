// Burxon landing page — minimal JS.
// Responsibilities:
//  1. Theme toggle (persist in localStorage, fall back to prefers-color-scheme).
//  2. Footer year.
//  3. Mark <details> closed icons accessible.
// Kept tiny, deferred, zero deps — performance budget < 2s FCP on 4G.

(function () {
  'use strict';

  // --- Theme toggle ---
  var STORAGE_KEY = 'burxon-theme';
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var icon = document.getElementById('theme-icon');

  function setIcon() {
    if (!icon) return;
    icon.textContent = root.classList.contains('dark') ? '☀️' : '🌙';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setIcon();
  }

  function readStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {
      /* ignore quota / disabled storage */
    }
  }

  // Sync icon with whatever the bootstrap script applied pre-paint.
  setIcon();

  if (btn) {
    btn.addEventListener('click', function () {
      var next = root.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(next);
      writeStoredTheme(next);
    });
  }

  // Follow OS changes only when the user has not made an explicit choice.
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    var listener = function (e) {
      if (readStoredTheme()) return;
      applyTheme(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', listener);
    else if (mq.addListener) mq.addListener(listener);
  }

  // --- Footer year ---
  var year = document.getElementById('year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
