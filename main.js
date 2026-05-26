(function () {
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function closeMobileNav() {
    var panel = document.getElementById('nav-mobile');
    var toggle = document.getElementById('nav-toggle');
    var icon = document.getElementById('nav-toggle-icon');
    if (!panel || !toggle) return;
    panel.classList.add('hidden');
    toggle.setAttribute('aria-expanded', 'false');
    if (icon) icon.textContent = 'menu';
  }

  document.querySelectorAll('[data-scroll-to]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      scrollToId(btn.getAttribute('data-scroll-to'));
      closeMobileNav();
    });
  });

  var navToggle = document.getElementById('nav-toggle');
  var navMobile = document.getElementById('nav-mobile');
  var navIcon = document.getElementById('nav-toggle-icon');
  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var open = navMobile.classList.toggle('hidden') === false;
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (navIcon) navIcon.textContent = open ? 'close' : 'menu';
    });
  }

  document.querySelectorAll('.nav-mobile-link').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  function showToast(message) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.classList.add('opacity-100');
    setTimeout(function () {
      toast.classList.add('opacity-0', 'pointer-events-none');
      toast.classList.remove('opacity-100');
    }, 4000);
  }

  function setStatus(status, message, type) {
    if (!status) return;
    var base = 'font-body-sm text-xs text-center mt-4';
    var color = 'text-on-surface-variant';
    if (type === 'error') color = 'text-error';
    else if (type === 'success') color = 'text-secondary';
    else if (type === 'loading') color = 'text-on-surface-variant';
    status.textContent = message;
    status.className = base + ' ' + color;
    status.classList.remove('hidden');
  }

  var form = document.getElementById('contact-form');
  if (form) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var originalBtnText = submitBtn ? submitBtn.textContent : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('name').value || '').trim();
      var phone = (document.getElementById('phone').value || '').trim();
      var comment = (document.getElementById('comment').value || '').trim();
      var status = document.getElementById('form-status');

      if (!name || !phone || !comment) {
        setStatus(status, 'Заполните все поля формы', 'error');
        return;
      }

      setStatus(status, 'Отправляем заявку…', 'loading');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
      }

      var formData = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Network response was not ok');
          form.reset();
          setStatus(status, 'Спасибо! Заявка отправлена — мы свяжемся с вами в ближайшее время.', 'success');
          showToast('Заявка отправлена — мы свяжемся с вами в ближайшее время');
        })
        .catch(function () {
          setStatus(
            status,
            'Не удалось отправить форму. Позвоните нам по телефону 8-995-940-71-40 или попробуйте ещё раз.',
            'error'
          );
          showToast('Ошибка отправки — попробуйте ещё раз или позвоните нам');
        })
        .then(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText || 'Отправить заявку';
          }
        });
    });
  }
})();
