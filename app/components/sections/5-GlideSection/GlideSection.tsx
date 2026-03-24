"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function GlideSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".h-scroll-track", {
        x: "-50%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="h-scroll-section" aria-hidden="true" ref={containerRef}>
      <div className="h-scroll-track">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-scroll-text">
            LIZI RAMISHVILI · CARNEGIE HALL · WIGMORE HALL · BERLIN · PARIS · TBILISI · LONDON ·&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
