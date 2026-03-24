// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the pressCells data constant (lines 8–69). PressCell is already extracted.
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PressCell from "../../8-pressSection-components/PressCell";
import styles from "./PressSection.module.css";

const pressCells = [
  {
    gridClass: styles.gi1,
    href: "https://georgiatoday.ge/three-people-two-centuries-one-hall-a-chamber-music-night-at-the-tbilisi-conservatoire/",
    imageSrc: "/images/lizi-press.jpg",
    imageAlt: "Lizi Ramishvili performance",
    imageSizes: "(max-width:860px) 100vw, 58vw",
    label: "— Georgia Today",
    lines: ["\u201cThe cello seemed", "to sing as Brahms", "intended\u201d"],
    textClass: "",
  },
  {
    gridClass: styles.gi2,
    href: "http://georgiatoday.ge/news/4572/Georgian-Musicians-to-Perform-at-Carnegie-Hall",
    imageSrc: "/images/stages/carnegie-hall.jpg",
    imageAlt: "Carnegie Hall",
    imageSizes: "(max-width:860px) 100vw, 42vw",
    label: "Carnegie Hall, NYC",
    lines: ["US", "Debut"],
    textClass: styles.gcLargeNum,
  },
  {
    gridClass: styles.gi3,
    href: "https://agenda.ge/en/news/2017/1776",
    imageSrc: "/images/stages/kloster-eberbach.jpg",
    imageAlt: "Kloster Eberbach, Rheingau",
    imageSizes: "(max-width:860px) 100vw, 42vw",
    label: "Kloster Eberbach",
    lines: ["Georgian", "Overtones"],
    textClass: "",
  },
  {
    gridClass: styles.gi4,
    href: "https://www.facebook.com/khatiabuniatishvili/photos/1268180713234781/",
    imageSrc: "/images/biography/bio2.jpg",
    imageAlt: "Lizi Ramishvili",
    imageSizes: "(max-width:860px) 100vw, 33vw",
    label: "— Khatia Buniatishvili",
    lines: ["\u201cAn amazing", "talent\u201d"],
    textClass: "",
  },
  {
    gridClass: styles.gi5,
    href: "https://www.liziramishvili.com/",
    imageSrc: "/images/biography/bio4.jpg",
    imageAlt: "Lizi Ramishvili",
    imageSizes: "(max-width:860px) 100vw, 33vw",
    label: "Forbes Georgia",
    lines: ["30 Under", "30 \u00b7 2021"],
    textClass: "",
  },
  {
    gridClass: styles.gi6,
    href: "https://www.sommets-musicaux.com/artist/lizi-ramishvili/?lang=en",
    imageSrc: "/images/biography/bio1.jpg",
    imageAlt: "Lizi Ramishvili at festival",
    imageSizes: "(max-width:860px) 100vw, 33vw",
    label: "Kronberg \u00b7 Gstaad \u00b7 Rheingau",
    lines: ["Festival", "Artist"],
    textClass: "",
  },
];

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
            <div key={idx} className={`${styles.galleryItem} ${cell.gridClass}`} role="listitem">
              <PressCell
                href={cell.href}
                imageSrc={cell.imageSrc}
                imageAlt={cell.imageAlt}
                imageSizes={cell.imageSizes}
                label={cell.label}
                textClass={cell.textClass}
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
