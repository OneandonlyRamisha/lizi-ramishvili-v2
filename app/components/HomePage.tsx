"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./sections/HeroSection/HeroSection";
import MarqueeSection from "./sections/MarqueeSection/MarqueeSection";
import AboutSection from "./sections/AboutSection/AboutSection";
import RecognitionSection from "./sections/RecognitionSection/RecognitionSection";
import GlideSection from "./sections/GlideSection/GlideSection";
import StagesSection from "./sections/StagesSection/StagesSection";
import RepertoireSection from "./sections/RepertoireSection/RepertoireSection";
import PressSection from "./sections/PressSection/PressSection";
import ScheduleSection from "./sections/ScheduleSection/ScheduleSection";
import ContactSection from "./sections/ContactSection/ContactSection";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Mobile nav focus trap
  useEffect(() => {
    if (!mainRef.current) return;
    if (mobileNavOpen) {
      mainRef.current.setAttribute("inert", "");
      mainRef.current.setAttribute("aria-hidden", "true");
      firstNavLinkRef.current?.focus();
    } else {
      mainRef.current.removeAttribute("inert");
      mainRef.current.removeAttribute("aria-hidden");
    }
  }, [mobileNavOpen]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // ── CURSOR — hoisted outside gsap.context so cleanup has access ──
    const cursor = document.querySelector<HTMLElement>(".cursor");
    const ring = document.querySelector<HTMLElement>(".cursor-ring");

    let onMove: ((e: MouseEvent) => void) | null = null;
    let ac: AbortController | null = null;

    if (cursor && ring) {
      onMove = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.06,
          ease: "none",
        });
        gsap.to(ring, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.35,
          ease: "power2.out",
        });
      };
      window.addEventListener("mousemove", onMove);

      ac = new AbortController();
      document.querySelectorAll<Element>('a, button, [role="button"]').forEach((el) => {
        el.addEventListener("mouseenter", () => gsap.to(ring, { scale: 2.2, duration: 0.3 }), { signal: ac!.signal });
        el.addEventListener("mouseleave", () => gsap.to(ring, { scale: 1, duration: 0.3 }), { signal: ac!.signal });
      });
    }

    const ctx = gsap.context(() => {
      // ── NAV ENTRANCE ──
      gsap.from(".nav", {
        opacity: 0,
        y: -24,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });
    }, containerRef);

    return () => {
      if (onMove) window.removeEventListener("mousemove", onMove);
      ac?.abort();
      ctx.revert();
    };
  }, []);

  return (
    <div className="site" ref={containerRef}>
      {/* Custom cursor */}
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />

      {/* ── NAV ── */}
      <nav className="nav">
        <a href="#hero" className="nav-logo">
          LR
        </a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#recognition">Recognition</a></li>
          <li><a href="#repertoire">Repertoire</a></li>
          <li><a href="#gallery">Press</a></li>
          <li><a href="#schedule">Schedule</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* ── MOBILE NAV OVERLAY ── */}
      <div
        className={`mobile-nav${mobileNavOpen ? " open" : ""}`}
        aria-hidden={!mobileNavOpen}
      >
        {[
          ["#about", "About"],
          ["#recognition", "Recognition"],
          ["#repertoire", "Repertoire"],
          ["#gallery", "Press"],
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
        className={`nav-hamburger${mobileNavOpen ? " open" : ""}`}
        aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <div ref={mainRef}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <RecognitionSection />
        <GlideSection />
        <StagesSection />
        <RepertoireSection />
        <PressSection />
        <ScheduleSection />
        <ContactSection />
      </div>
    </div>
  );
}
