/* Contact Form Component — Static UI */
function renderContactForm(fields) {
  return `
    <form class="contact-form" onsubmit="event.preventDefault(); alert('Thank you! Form submission is not yet connected to a backend.'); return false;" novalidate>
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
      <div class="mt-2">
        <button type="submit" class="btn-primary w-full justify-center">
          ${fields.submit}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
          </svg>
        </button>
      </div>
    </form>
  `;
}
