"use client";

import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Nav.module.css";

interface NavProps {
  mobileNavOpen: boolean;
  setMobileNavOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  mainRef: RefObject<HTMLDivElement | null>;
  firstNavLinkRef: RefObject<HTMLAnchorElement | null>;
}

export default function Nav({ mobileNavOpen, setMobileNavOpen, firstNavLinkRef }: NavProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.from(nav, {
      opacity: 0,
      y: -24,
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
    });

    const onScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        nav.classList.add(styles.scrolled);
      } else {
        nav.classList.remove(styles.scrolled);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── NAV ── */}
      <nav className={styles.nav} ref={navRef}>
        <a href="#hero" className={styles.navLogo}>
          LR
        </a>
        <ul className={styles.navLinks}>
          <li><a href="#about">About</a></li>
          <li><a href="#recognition">Recognition</a></li>
          <li><a href="#repertoire">Repertoire</a></li>
          {/* <li><a href="#gallery">Gallery</a></li> */}
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* ── MOBILE NAV OVERLAY ── */}
      <div
        className={`${styles.mobileNav}${mobileNavOpen ? ` ${styles.open}` : ""}`}
        aria-hidden={!mobileNavOpen}
      >
        {[
          ["#about", "About"],
          ["#recognition", "Recognition"],
          ["#repertoire", "Repertoire"],
          // ["#gallery", "Gallery"],
          ["#schedule", "Schedule"],
          ["#contact", "Contact"],
        ].map(([href, label], idx) => (
          <a
            key={href}
            href={href}
            tabIndex={mobileNavOpen ? 0 : -1}
            onClick={() => setMobileNavOpen(false)}
            ref={idx === 0 ? firstNavLinkRef : undefined}
          >
            {label}
          </a>
        ))}
      </div>

      {/* ── HAMBURGER (fixed, always above overlay) ── */}
      <button
        className={`${styles.navHamburger}${mobileNavOpen ? ` ${styles.open}` : ""}`}
        aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </>
  );
}
