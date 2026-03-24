// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the repertoire data constant (lines 8–39).
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./RepertoireSection.module.css";
import { repertoire } from "../../app/data";

export default function RepertoireSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.repHeading}`, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.repHeading}`,
          start: "top 80%",
          once: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(`.${styles.repRow}`).forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          delay: i * 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 90%", once: true },
        });
        const nameEl = item.querySelector(`.${styles.repPieceName}`);
        if (nameEl) {
          gsap.from(nameEl, {
            x: -40,
            opacity: 0,
            duration: 1.1,
            delay: i * 0.07 + 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.repertoireSection} id="repertoire" ref={containerRef}>
      <div className={styles.repBgText} aria-hidden="true">
        PROGRAMME
      </div>
      <div className={styles.repInner}>
        <span className="section-label">004 / Repertoire</span>
        <h2 className={styles.repHeading}>
          Concert
          <br />
          <span style={{ lineHeight: 1.25 }}>Repertoire</span>
        </h2>
        <div className={styles.repList}>
          {repertoire.slice(0, 7).map((r, i) => (
            <div className={styles.repRow} key={i}>
              <span className={styles.repNum} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={styles.repCenter}>
                <span className={styles.repPieceName}>{r.piece}</span>
                <span className={styles.repOpus}>{r.opus}</span>
              </div>
              <span className={styles.repComposer}>{r.composer}</span>
              <div className={styles.repRule} aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className={styles.repFooter}>
          <a href="/repertoire" className={styles.repSeeMore}>
            See Full Repertoire <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
