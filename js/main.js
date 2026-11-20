/* =========================================================
   香椎台調剤薬局 スクリプト
   ========================================================= */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initMenu();
    initHeroSlider();
  });

  /* ---------- トップのスライド ---------- */
  function initHeroSlider() {
    var root = document.querySelector('[data-hero-slider]');
    if (!root) return;
    var track = root.querySelector('.hero__track');
    var slides = root.querySelectorAll('.hero__slide');
    var dots = root.querySelectorAll('.hero__dot');
    var INTERVAL = 6000; // 切り替えの間隔（ミリ秒）
    var current = 0;
    var timer = null;

    function show(index) {
      current = (index + slides.length) % slides.length;
      track.style.transform = 'translateX(' + (-100 * current) + '%)';
      for (var i = 0; i < slides.length; i++) {
        // 見えていないスライドのリンクにはフォーカスが行かないようにする
        slides[i].toggleAttribute('inert', i !== current);
        slides[i].setAttribute('aria-hidden', String(i !== current));
        if (dots[i]) dots[i].setAttribute('aria-current', String(i === current));
      }
    }

    function start() {
      // 動きを減らす設定の方には自動で切り替えない
      if (timer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      timer = setInterval(function () { show(current + 1); }, INTERVAL);
    }
    function stop() {
      clearInterval(timer);
      timer = null;
    }

    Array.prototype.forEach.call(dots, function (dot, i) {
      dot.addEventListener('click', function () {
        stop();
        show(i);
        start();
      });
    });

    // マウスを乗せている間・フォーカス中は止める
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    show(0);
    start();
  }

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
