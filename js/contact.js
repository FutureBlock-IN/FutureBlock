function initContactForm() {
  var form = document.getElementById('contact-form');
  var successMsg = document.getElementById('form-success');
  if (!form) return;

  var btn = form.querySelector('button[type="submit"]');
  var btnDefaultHtml = btn ? btn.innerHTML : 'Send Message';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    var fields = form.querySelectorAll('input[required], textarea[required], select[required]');
    var valid = true;
    fields.forEach(function (f) {
      f.classList.remove('error');
      var empty = f.tagName === 'SELECT' ? !f.value : !f.value.trim();
      if (empty) {
        f.classList.add('error');
        valid = false;
      }
    });
    if (!valid) return;

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending...';
    }

    try {
      var res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        form.style.display = 'none';
        if (successMsg) {
          successMsg.classList.add('is-visible');
        }
      } else {
        throw new Error('Failed');
      }
    } catch (err) {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = btnDefaultHtml;
      }
      alert('Something went wrong. Please email us directly at info@futureblock.in');
    }
  });

  form.querySelectorAll('input, textarea, select').forEach(function (field) {
    field.addEventListener('input', function () {
      field.classList.remove('error');
    });
    field.addEventListener('change', function () {
      field.classList.remove('error');
    });
  });
}

function prefillServiceFromURL() {
  var params = new URLSearchParams(window.location.search);
  var service = params.get('service');

  if (!service) return;

  var select = document.querySelector('#contact-form select[name="service"]');
  if (!select) return;

  var options = select.querySelectorAll('option');
  var matched = false;
  options.forEach(function (opt) {
    if (opt.value === service || opt.textContent.trim() === service) {
      opt.selected = true;
      matched = true;
    }
  });

  if (!matched) return;

  var placeholder = select.querySelector('option[disabled]');
  if (placeholder) placeholder.selected = false;

  select.style.borderColor = 'var(--gold)';
  select.style.background = 'rgba(200,168,90,0.06)';

  setTimeout(function () {
    var contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 300);
}

function initTechAccordion() {
  document.querySelectorAll('.tech-stack-group').forEach(function (group) {
    var header = group.querySelector('.tech-stack-header');
    if (!header) return;

    header.addEventListener('click', function () {
      group.classList.toggle('open');
    });
  });
}

function initTechStagger() {
  document.querySelectorAll('.tech-card').forEach(function (card, i) {
    card.dataset.delay = String(i * 40);
    card.setAttribute('data-animate', '');
  });
}

document.addEventListener('DOMContentLoaded', prefillServiceFromURL);
