"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./GlideSection.module.css";

export default function GlideSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(`.${styles.hScrollTrack}`, {
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
    <div className={styles.hScrollSection} aria-hidden="true" ref={containerRef}>
      <div className={styles.hScrollTrack}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={styles.hScrollText}>
            LIZI RAMISHVILI · CARNEGIE HALL · WIGMORE HALL · BERLIN · PARIS · TBILISI · LONDON ·&nbsp;
          </span>
        ))}
      </div>
    </div>
  );
}
