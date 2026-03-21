"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "./0-general/Nav";
import Cursor from "./0-general/Cursor";
import HeroSection from "./sections/1-HeroSection/HeroSection";
import MarqueeSection from "./sections/2-MarqueeSection/MarqueeSection";
import AboutSection from "./sections/3-AboutSection/AboutSection";
import RecognitionSection from "./sections/4-RecognitionSection/RecognitionSection";
import GlideSection from "./sections/5-GlideSection/GlideSection";
import StagesSection from "./sections/6-StagesSection/StagesSection";
import RepertoireSection from "./sections/7-RepertoireSection/RepertoireSection";
import PressSection from "./sections/8-PressSection/PressSection";
import ScheduleSection from "./sections/9-ScheduleSection/ScheduleSection";
import ContactSection from "./sections/10-ContactSection/ContactSection";

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
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.06, ease: "none" });
        gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: "power2.out" });
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
      gsap.from(".nav", { opacity: 0, y: -24, duration: 1, delay: 0.3, ease: "power2.out" });
    }, containerRef);

    return () => {
      if (onMove) window.removeEventListener("mousemove", onMove);
      ac?.abort();
      ctx.revert();
    };
  }, []);

  return (
    <div className="site" ref={containerRef}>
      <Cursor />

      <Nav
        mobileNavOpen={mobileNavOpen}
        setMobileNavOpen={setMobileNavOpen}
        mainRef={mainRef}
        firstNavLinkRef={firstNavLinkRef}
      />

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
