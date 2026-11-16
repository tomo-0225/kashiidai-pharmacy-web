/* =========================================================
   香椎台調剤薬局 スクリプト
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initMenu();
  });

  /* ---------- スマホ用ハンバーガーメニュー ---------- */
  function initMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var nav = document.getElementById('global-nav');
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });

    // メニュー内のリンクを押したら閉じる
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    // Escキーで閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    // PC幅に戻ったら開閉状態をリセット
    var desktop = window.matchMedia('(min-width: 961px)');
    var reset = function (mq) { if (mq.matches) setOpen(false); };
    if (desktop.addEventListener) {
      desktop.addEventListener('change', reset);
    } else {
      desktop.addListener(reset); // 古いSafari向け
    }
  }
})();
