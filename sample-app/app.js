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
        d.setAttribute('aria-current', i === current ? 'true' : 'false');
      });
      // Hide non-active slides from assistive technology (A11Y-019)
      slides.forEach(function (s, i) {
        s.setAttribute('aria-hidden', i !== current ? 'true' : 'false');
      });
    }

    // A11Y-008: respect prefers-reduced-motion and pause on keyboard focus
    var autoPlay;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function startAuto() {
      if (!reducedMotion) {
        autoPlay = setInterval(function () { show(current + 1); }, 3000);
      }
    }

    function stopAuto() {
      clearInterval(autoPlay);
    }

    startAuto();

    var heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('focusin', stopAuto);
      heroSection.addEventListener('focusout', startAuto);
      heroSection.addEventListener('mouseenter', stopAuto);
      heroSection.addEventListener('mouseleave', startAuto);
    }

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

      // Clear previous errors
      form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
      form.querySelectorAll('[required]').forEach(function (field) {
        field.classList.remove('error');
        field.removeAttribute('aria-describedby');
      });

      // A11Y-009 / A11Y-010: inject text error messages and link via aria-describedby
      form.querySelectorAll('[required]').forEach(function (field) {
        if (!field.value.trim()) {
          field.classList.add('error');
          var errId = field.id + '-error';
          var msg = document.createElement('span');
          msg.id = errId;
          msg.className = 'field-error';
          msg.textContent = 'This field is required.';
          field.insertAdjacentElement('afterend', msg);
          field.setAttribute('aria-describedby', errId);
          valid = false;
        }
      });

      var email = document.getElementById('email');
      if (email && email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.classList.add('error');
        var emailErrId = 'email-format-error';
        var existing = document.getElementById(emailErrId);
        if (!existing) {
          var emailMsg = document.createElement('span');
          emailMsg.id = emailErrId;
          emailMsg.className = 'field-error';
          emailMsg.textContent = 'Please enter a valid email address.';
          email.insertAdjacentElement('afterend', emailMsg);
        }
        email.setAttribute('aria-describedby', emailErrId);
        valid = false;
      }

      if (valid) {
        showConfirmationModal();
      }
    });
  }

  // A11Y-011 / A11Y-012 / A11Y-013: focus management, focus trap, and alertdialog
  function showConfirmationModal() {
    var backdrop = document.getElementById('confirmation-modal');
    if (!backdrop) return;

    var trigger = document.activeElement;
    backdrop.classList.add('open');

    var closeBtn = document.getElementById('modal-close-btn');
    // Move focus into the modal
    if (closeBtn) {
      closeBtn.focus();
    }

    function trapFocus(e) {
      var focusable = Array.prototype.slice.call(
        backdrop.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])')
      ).filter(function (el) { return !el.disabled; });
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      if (e.key === 'Escape') {
        closeModal();
      }
    }

    function closeModal() {
      backdrop.classList.remove('open');
      backdrop.removeEventListener('keydown', trapFocus);
      if (trigger) { trigger.focus(); }
    }

    backdrop.addEventListener('keydown', trapFocus);

    if (closeBtn) {
      // Replace old listener by cloning (avoids stacking listeners on re-open)
      var newClose = closeBtn.cloneNode(true);
      closeBtn.parentNode.replaceChild(newClose, closeBtn);
      newClose.addEventListener('click', closeModal);
    }
  }

  function initFaq() {
    // A11Y-025 / A11Y-026: toggle aria-expanded on FAQ buttons
    document.querySelectorAll('.faq-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var body = btn.nextElementSibling;
        if (!body) return;
        var isOpen = body.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    });
  }

  function initNewsletterBtn() {
    var btn = document.getElementById('newsletter-action');
    if (!btn) return;
    btn.addEventListener('click', function () {
      btn.textContent = 'Thanks for signing up!';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHero();
    initBookingForm();
    initFaq();
    initNewsletterBtn();
  });

}());
