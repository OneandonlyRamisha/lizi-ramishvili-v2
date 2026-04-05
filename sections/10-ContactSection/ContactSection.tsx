"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ContactSection.module.css";

const CONTACT_EMAIL = "lizi_ramishvili@yahoo.com";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Heading reveal — split lines
      gsap.from(`.${styles.headingLine}`, {
        y: "110%",
        duration: 1.4,
        ease: "power4.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: `.${styles.headingBlock}`,
          start: "top 78%",
          once: true,
        },
      });

      // Email block reveal
      gsap.from(`.${styles.emailBlock}`, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.emailBlock}`,
          start: "top 82%",
          once: true,
        },
      });

      // Footer fade
      gsap.from(`.${styles.footer}`, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.footer}`,
          start: "top 92%",
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.contactSection} id="contact" ref={containerRef}>
      {/* Giant watermark */}
      <div className={styles.bgGlyph} aria-hidden="true">
        ♩
      </div>

      <div className={styles.contactInner}>
        {/* Top: label + heading */}
        <div className={styles.topRow}>
          <span className="section-label">005 / Contact</span>
        </div>

        <div className={styles.headingBlock}>
          <div className={styles.headingLineWrap}>
            <span className={styles.headingLine}>Let&rsquo;s</span>
          </div>
          <div className={styles.headingLineWrap}>
            <span className={`${styles.headingLine} ${styles.headingAccent}`}>
              Connect
            </span>
          </div>
        </div>

        {/* Single email — hero element */}
        <div className={styles.emailBlock}>
          <span className={styles.emailLabel}>
            For bookings, press & all enquiries
          </span>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.emailLink}>
            {CONTACT_EMAIL}
            <span className={styles.emailArrow}>→</span>
          </a>
        </div>

        {/* Footer */}
        <footer className={styles.footer} role="contentinfo">
          <div className={styles.footerTop}>
            <div className={styles.footerLogo}>Lizi Ramishvili</div>
            <nav className={styles.footerSocials} aria-label="Social links">
              <a
                href="https://www.instagram.com/lizi_ramishvili_/"
                className={styles.footerSocialLink}
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/share/1AVM9dpN6F/?mibextid=wwXIfr"
                className={styles.footerSocialLink}
              >
                Facebook
              </a>
            </nav>
          </div>
          <div className={styles.footerBottom}>
            <span className={styles.footerCopy}>
              © 2026 Lizi Ramishvili. All rights reserved.
            </span>
            <span className={styles.footerMade}>
              Made with{" "}
              <span className={styles.footerHeart} aria-label="love">
                ♡
              </span>{" "}
              by{" "}
              <a
                href="https://lukaramishvili.com"
                className={styles.footerCredit}
                target="_blank"
                rel="noopener noreferrer"
              >
                Luka Ramishvili
              </a>
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
