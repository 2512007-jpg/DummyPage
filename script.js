(() => {
  // Mobile navigation
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  const setNav = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  };
  toggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setNav(false)));

  // Menu tabs
  const tabs = document.querySelectorAll('.tab');
  const lists = document.querySelectorAll('.menu-list');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('active', active);
        t.setAttribute('aria-selected', String(active));
      });
      lists.forEach((l) => l.classList.toggle('active', l.id === tab.dataset.target));
    });
  });

  // Fade-in on scroll
  const targets = document.querySelectorAll('.section .container');
  targets.forEach((el) => el.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
  } else {
    targets.forEach((el) => el.classList.add('visible'));
  }

  // Contact form (client-side validation only; no backend yet)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('input, textarea').forEach((f) => {
      const valid = f.value.trim() !== '' && f.checkValidity();
      f.classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    status.classList.toggle('error', !ok);
    if (ok) {
      status.textContent = '送信ありがとうございました。(デモ表示です。実際には送信されていません)';
      form.reset();
    } else {
      status.textContent = '未入力または不正な項目があります。';
    }
  });
})();
