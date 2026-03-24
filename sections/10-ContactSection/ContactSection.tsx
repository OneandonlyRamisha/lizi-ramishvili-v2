// NOTE: Section exceeds 80 lines but no clean extraction point found.
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "../../components/10-contactSection-components/ContactForm";
import ContactDetail from "../../components/10-contactSection-components/ContactDetail";
import styles from "./ContactSection.module.css";
import { contactDetails } from "../../app/data";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.contactHeading}`, {
        opacity: 0,
        y: 70,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.contactHeading}`,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(`.${styles.contactGrid} > *`, {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.contactGrid}`,
          start: "top 78%",
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.contactSection} id="contact" ref={containerRef}>
      <div className={styles.contactBgText} aria-hidden="true">CONNECT</div>
      <div className={styles.contactInner}>
        <h2 className={styles.contactHeading}>
          Let&rsquo;s
          <br />
          <span className={styles.contactAccent}>Connect</span>
        </h2>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h3>Get in Touch</h3>
            {contactDetails.map((d) => (
              <ContactDetail key={d.label} label={d.label} value={d.value} />
            ))}
          </div>
          <ContactForm />
        </div>
        <footer className={styles.footer} role="contentinfo">
          <div className={styles.footerTop}>
            <div className={styles.footerLogo}>Lizi Ramishvili</div>
            <nav className={styles.footerSocials} aria-label="Social links">
              <a href="#" className={styles.footerSocialLink}>Instagram</a>
              <a href="#" className={styles.footerSocialLink}>YouTube</a>
              <a href="#" className={styles.footerSocialLink}>Spotify</a>
            </nav>
          </div>
          <div className={styles.footerBottom}>
            <span className={styles.footerCopy}>© 2026 Lizi Ramishvili. All rights reserved.</span>
            <span className={styles.footerMade}>
              Made with <span className={styles.footerHeart} aria-label="love">♡</span> by{" "}
              <a href="https://lukaramishvili.com" className={styles.footerCredit} target="_blank" rel="noopener noreferrer">
                Luka Ramishvili
              </a>
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
