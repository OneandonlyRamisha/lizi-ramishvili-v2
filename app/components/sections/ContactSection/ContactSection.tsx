// NOTE: Section exceeds 80 lines but no clean extraction point found.
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactForm from "../../11-contactSection-components/ContactForm";
import ContactDetail from "../../11-contactSection-components/ContactDetail";

export default function ContactSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".contact-heading", {
        opacity: 0,
        y: 70,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".contact-grid > *", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 78%",
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="contact-section" id="contact" ref={containerRef}>
      <div className="contact-bg-text" aria-hidden="true">CONNECT</div>
      <div className="contact-inner">
        <h2 className="contact-heading">
          Let&rsquo;s
          <br />
          <span className="contact-accent">Connect</span>
        </h2>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <ContactDetail label="Management" value="management@liziramishvili.com" />
            <ContactDetail label="Bookings" value="bookings@liziramishvili.com" />
            <ContactDetail label="Press & Media" value="press@liziramishvili.com" />
          </div>
          <ContactForm />
        </div>
        <footer className="footer" role="contentinfo">
          <div className="footer-logo">Lizi Ramishvili</div>
          <nav className="footer-socials" aria-label="Social links">
            <a href="#" className="footer-social-link">Instagram</a>
            <a href="#" className="footer-social-link">YouTube</a>
            <a href="#" className="footer-social-link">Spotify</a>
          </nav>
          <div className="footer-copy">© 2026 Lizi Ramishvili</div>
        </footer>
      </div>
    </section>
  );
}
