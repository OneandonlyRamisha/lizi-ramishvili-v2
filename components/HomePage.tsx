"use client";

import { useEffect, useRef, useState } from "react";
import Nav from "./0-general/Nav";
import { ScheduleEventData } from "../app/data";
import HeroSection from "../sections/1-HeroSection/HeroSection";
import MarqueeSection from "../sections/2-MarqueeSection/MarqueeSection";
import AboutSection from "../sections/3-AboutSection/AboutSection";
import RecognitionSection from "../sections/4-RecognitionSection/RecognitionSection";
import GlideSection from "../sections/5-GlideSection/GlideSection";
import StagesSection from "../sections/6-StagesSection/StagesSection";
import RepertoireSection from "../sections/7-RepertoireSection/RepertoireSection";
import PressSection from "../sections/8-PressSection/PressSection";
import ScheduleSection from "../sections/9-ScheduleSection/ScheduleSection";
import ContactSection from "../sections/10-ContactSection/ContactSection";

export default function HomePage({ scheduleEvents = [] }: { scheduleEvents?: ScheduleEventData[] }) {
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


  return (
    <div className="site" ref={containerRef}>
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
        <RepertoireSection />
        <StagesSection />
        <PressSection />
        <ScheduleSection events={scheduleEvents} />
        <ContactSection />
      </div>
    </div>
  );
}
