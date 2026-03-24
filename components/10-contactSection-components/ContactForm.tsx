"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (formSubmitted) {
    return (
      <p className={styles.contactFormConfirmation}>
        Thank you — we&rsquo;ll be in touch soon.
      </p>
    );
  }

  return (
    <form
      className={styles.contactForm}
      onSubmit={(e) => {
        e.preventDefault();
        setFormSubmitted(true);
      }}
      aria-label="Contact form"
    >
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="name">
          Your Name
        </label>
        <input
          className={styles.formInput}
          id="name"
          type="text"
          placeholder="Full name"
          required
        />
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="email">
          Email Address
        </label>
        <input
          className={styles.formInput}
          id="email"
          type="email"
          placeholder="your@email.com"
          required
        />
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor="message">
          Message
        </label>
        <textarea
          className={`${styles.formInput} ${styles.formTextarea}`}
          id="message"
          placeholder="Tell me about your event or enquiry…"
          required
        />
      </div>
      <button type="submit" className={styles.formSubmit}>
        Send Message →
      </button>
    </form>
  );
}
