const WEB3FORMS_ACCESS_KEY = '2c26b364-f076-4523-861e-33c33a2b5b7b';
const RECAPTCHA_SITE_KEY = '6Lfu7JksAAAAANHlEqVNyw2GBeNutDvHgzaZkhzi';

function renderContactForm(fields) {
  return `
    <form class="contact-form" onsubmit="handleContactSubmit(event)" novalidate>
      <input type="hidden" name="access_key" value="${WEB3FORMS_ACCESS_KEY}">
      <input type="hidden" name="subject" value="New Contact Form Submission — Nirbhay Knitting Industries">
      <input type="hidden" name="from_name" value="Nirbhay Knitting Website">
      <input type="checkbox" name="botcheck" style="display:none;">
      <div class="form-group">
        <label for="contact-name" class="form-label">${fields.name}</label>
        <input type="text" id="contact-name" name="name" class="form-input" placeholder="Enter your full name" required autocomplete="name">
      </div>
      <div class="form-group">
        <label for="contact-email" class="form-label">${fields.email}</label>
        <input type="email" id="contact-email" name="email" class="form-input" placeholder="Enter your email address" required autocomplete="email">
      </div>
      <div class="form-group">
        <label for="contact-phone" class="form-label">${fields.phone}</label>
        <input type="tel" id="contact-phone" name="phone" class="form-input" placeholder="Enter your phone number" autocomplete="tel">
      </div>
      <div class="form-group">
        <label for="contact-message" class="form-label">${fields.message}</label>
        <textarea id="contact-message" name="message" class="form-textarea" placeholder="Tell us about your project or inquiry..." required></textarea>
      </div>
      <input type="hidden" name="recaptcha_token" id="recaptcha-token">
      <div class="mt-2">
        <button type="submit" class="btn-primary w-full justify-center" id="contact-submit-btn">
          <span class="btn-text">${fields.submit}</span>
          <svg class="w-4 h-4 btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
          </svg>
          <svg class="w-4 h-4 btn-spinner" style="display:none;animation:spin 1s linear infinite;" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" d="M12 2a10 10 0 0 1 10 10"/>
          </svg>
        </button>
      </div>
      <div id="contact-form-status" style="display:none;margin-top:1rem;padding:0.75rem 1rem;border-radius:0.5rem;font-size:0.875rem;text-align:center;"></div>
    </form>
  `;
}

async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('#contact-submit-btn');
  const btnText = btn.querySelector('.btn-text');
  const btnIcon = btn.querySelector('.btn-icon');
  const btnSpinner = btn.querySelector('.btn-spinner');
  const status = form.querySelector('#contact-form-status');

  // Basic validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // reCAPTCHA v3 — get token
  try {
    const recaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'contact_submit' });
    form.querySelector('#recaptcha-token').value = recaptchaToken;
  } catch {
    status.style.display = 'block';
    status.style.background = '#fff3e0';
    status.style.color = '#e65100';
    status.textContent = 'reCAPTCHA verification failed. Please refresh the page and try again.';
    return;
  }

  // Show loading state
  btn.disabled = true;
  btnText.textContent = 'Sending...';
  btnIcon.style.display = 'none';
  btnSpinner.style.display = 'inline-block';
  status.style.display = 'none';

  try {
    const formData = new FormData(form);
    // Remove reCAPTCHA token from payload (verified separately / Web3Forms doesn't use it)
    formData.delete('recaptcha_token');
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();

    if (result.success) {
      status.style.display = 'block';
      status.style.background = 'var(--accent-light, #e8f5e9)';
      status.style.color = 'var(--accent, #2e7d32)';
      status.textContent = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
      form.reset();
    } else {
      throw new Error(result.message || 'Submission failed');
    }
  } catch (err) {
    status.style.display = 'block';
    status.style.background = '#ffeaea';
    status.style.color = '#c62828';
    status.textContent = 'Something went wrong. Please try again or email us directly at info@nirbhayknits.com';
  } finally {
    btn.disabled = false;
    btnText.textContent = form.querySelector('#contact-form-status').style.color === 'rgb(198, 40, 40)' ? 'Send Message' : 'Send Message';
    btnIcon.style.display = 'inline-block';
    btnSpinner.style.display = 'none';
  }
}
