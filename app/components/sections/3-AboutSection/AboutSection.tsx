// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the bioChapters data constant (lines 10–31).
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BioSlideshow from "../../3-aboutSection-components/BioSlideshow";
import BioChapter from "../../3-aboutSection-components/BioChapter";
import BioAwardBox from "../../3-aboutSection-components/BioAwardBox";
import styles from "./AboutSection.module.css";
import bioChapterStyles from "../../3-aboutSection-components/BioChapter.module.css";
import bioAwardStyles from "../../3-aboutSection-components/BioAwardBox.module.css";
import { bioChapters } from "../../../data";

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".section-label", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(`.${styles.aboutSlideshowCol}`, {
        opacity: 0,
        x: -50,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 72%",
          once: true,
        },
      });
      gsap.from(`.${styles.bioName}`, {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: `.${styles.bioName}`, start: "top 82%", once: true },
      });
      gsap.from(`.${styles.bioTitleRow}`, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles.bioTitleRow}`,
          start: "top 86%",
          once: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(`.${bioChapterStyles.bioChapter}`).forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          delay: i * 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.from(`.${bioAwardStyles.bioAwardBox}`, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${bioAwardStyles.bioAwardBox}`,
          start: "top 90%",
          once: true,
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.aboutSection} id="about" ref={containerRef}>
      <div className={styles.aboutInner}>
      <span className="section-label">001 / About</span>
      <div className={styles.aboutLayout}>
        <div className={styles.aboutSlideshowCol}>
          <BioSlideshow />
        </div>

        {/* Right — biography text */}
        <div className={styles.aboutBioCol}>
          <h2 className={styles.bioName}>
            Lizi
            <br />
            Ramishvili
          </h2>
          <div className={styles.bioTitleRow}>
            <span className={styles.bioTitle}>Cellist · Concert Artist</span>
            <div className={styles.bioTitleLine} aria-hidden="true" />
          </div>

          {bioChapters.map((ch, i) => (
            <BioChapter key={i} index={i} label={ch.label} text={ch.text} />
          ))}

          {/* Forbes award callout */}
          <BioAwardBox />
        </div>
      </div>
      </div>
    </section>
  );
}
