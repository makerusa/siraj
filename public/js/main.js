// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// Mark active nav link
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (
    (href === '/' && (currentPath === '/' || currentPath === '/index')) ||
    (href !== '/' && currentPath.startsWith(href))
  ) {
    a.classList.add('active');
  }
});

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const successAlert = document.getElementById('alert-success');
  const errorAlert = document.getElementById('alert-error');
  const submitBtn = document.getElementById('submit-btn');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    successAlert.style.display = 'none';
    errorAlert.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    const body = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      subject: contactForm.subject?.value?.trim() || '',
      message: contactForm.message.value.trim(),
    };

    try {
      const res = await fetch('/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        successAlert.style.display = 'block';
        contactForm.reset();
      } else {
        errorAlert.textContent = data.error || 'Something went wrong.';
        errorAlert.style.display = 'block';
      }
    } catch {
      errorAlert.textContent = 'Unable to send. Please check your connection.';
      errorAlert.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}
