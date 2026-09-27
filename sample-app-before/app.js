(function () {

  function initHero() {
    var wrapper = document.querySelector('.hero-slides');
    if (!wrapper) return;
    var slides = wrapper.querySelectorAll('.hero-slide');
    var dots   = document.querySelectorAll('.hero-dot');
    if (!slides.length) return;

    var current = 0;
    function show(n) {
      current = (n + slides.length) % slides.length;
      wrapper.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    setInterval(function () { show(current + 1); }, 3000);
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { show(i); });
    });
  }

  function initBookingForm() {
    var form = document.getElementById('booking-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;

      form.querySelectorAll('[required]').forEach(function (field) {
        field.classList.remove('error');
        if (!field.value.trim()) {
          field.classList.add('error');
          valid = false;
        }
      });

      var email = document.getElementById('email');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('error');
        valid = false;
      }

      if (valid) {
        showConfirmationModal();
      }
    });
  }

  function showConfirmationModal() {
    var backdrop = document.getElementById('confirmation-modal');
    if (!backdrop) return;
    backdrop.classList.add('open');

    document.getElementById('modal-close-btn').addEventListener('click', function () {
      backdrop.classList.remove('open');
    });
  }

  function initFaq() {
    document.querySelectorAll('.faq-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var body = btn.nextElementSibling;
        if (!body) return;
        body.classList.toggle('open');
      });
    });
  }

  function initNewsletterDiv() {
    var div = document.getElementById('newsletter-action');
    if (!div) return;
    div.addEventListener('click', function () {
      div.textContent = 'Thanks for signing up!';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initBookingForm();
    initFaq();
    initNewsletterDiv();
  });

}());
