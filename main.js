(function () {
  var CONTACT_EMAIL = 'boletus18@mail.ru';

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

  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('name').value || '').trim();
      var phone = (document.getElementById('phone').value || '').trim();
      var comment = (document.getElementById('comment').value || '').trim();
      var status = document.getElementById('form-status');

      if (!name || !phone || !comment) {
        if (status) {
          status.textContent = 'Заполните все поля формы';
          status.className = 'font-body-sm text-xs text-center mt-4 text-error';
          status.classList.remove('hidden');
        }
        return;
      }

      var subject = encodeURIComponent('Заявка с сайта Boletus-LT');
      var body = encodeURIComponent(
        'Имя: ' + name + '\nТелефон: ' + phone + '\n\nКомментарий:\n' + comment
      );
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;

      if (status) {
        status.textContent = 'Откроется почтовый клиент — отправьте письмо или позвоните нам';
        status.className = 'font-body-sm text-xs text-center mt-4 text-secondary';
        status.classList.remove('hidden');
      }
      showToast('Заявка подготовлена — проверьте почтовый клиент');
      form.reset();
    });
  }
})();
