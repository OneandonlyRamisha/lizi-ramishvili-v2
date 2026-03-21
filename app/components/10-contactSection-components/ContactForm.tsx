"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (formSubmitted) {
    return (
      <p className="contact-form-confirmation">
        Thank you — we&rsquo;ll be in touch soon.
      </p>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        setFormSubmitted(true);
      }}
      aria-label="Contact form"
    >
      <div className="form-field">
        <label className="form-label" htmlFor="name">
          Your Name
        </label>
        <input
          className="form-input"
          id="name"
          type="text"
          placeholder="Full name"
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="email">
          Email Address
        </label>
        <input
          className="form-input"
          id="email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="message">
          Message
        </label>
        <textarea
          className="form-input form-textarea"
          id="message"
          placeholder="Tell me about your event or enquiry…"
          required
        />
      </div>
      <button type="submit" className="form-submit">
        Send Message →
      </button>
    </form>
  );
}
