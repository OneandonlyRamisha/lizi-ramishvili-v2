// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the pressCells data constant (lines 8–69). PressCell is already extracted.
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PressCell from "../../components/8-pressSection-components/PressCell";
import styles from "./PressSection.module.css";
import { pressCells } from "../../app/data";

// Resolve CSS module class names from the gridKey/textClassKey strings in data
type StylesWithIndex = Record<string, string>;
const stylesTyped = styles as StylesWithIndex;

export default function PressSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.galleryHeading}`, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.galleryHeading}`,
          start: "top 80%",
          once: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(`.${styles.galleryItem}`).forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          scale: 0.96,
          duration: 1,
          delay: (i % 3) * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 90%", once: true },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.gallerySection} id="gallery" ref={containerRef}>
      <div className={styles.galleryInner}>
        <span className="section-label">005 / Press</span>
        <h2 className={styles.galleryHeading}>
          Press
          <br />
          &amp; Media
        </h2>
        <div className={styles.galleryGrid} role="list">
          {pressCells.map((cell, idx) => (
            <div key={idx} className={`${styles.galleryItem} ${stylesTyped[cell.gridKey] ?? ""}`} role="listitem">
              <PressCell
                href={cell.href}
                imageSrc={cell.imageSrc}
                imageAlt={cell.imageAlt}
                imageSizes={cell.imageSizes}
                label={cell.label}
                textClass={cell.textClassKey ? (stylesTyped[cell.textClassKey] ?? "") : ""}
              >
                {cell.lines.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < cell.lines.length - 1 && <br />}
                  </span>
                ))}
              </PressCell>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
