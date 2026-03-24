// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the stages data constant (lines 8–60).
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StageCard from "../../6-stagesSection-components/StageCard";
import styles from "./StagesSection.module.css";
import cardStyles from "../../6-stagesSection-components/StageCard.module.css";
import { stages, STAGES_ALSO } from "../../../data";

// CSS module class names are resolved here since they're only available via this module import
const stageClassNames = [
  cardStyles.scA,
  cardStyles.scB,
  cardStyles.scC,
  `${cardStyles.scD} ${cardStyles.sgBerlin}`,
  `${cardStyles.scE} ${cardStyles.sgSchubertiade}`,
  `${cardStyles.scF} ${cardStyles.sgGstaad}`,
];

export default function StagesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.stagesHeading}`, {
        opacity: 0,
        y: 60,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.stagesHeading}`,
          start: "top 82%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(`.${cardStyles.stageCard}`).forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
          duration: 1.1,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.stagesGrid}`,
            start: "top 80%",
            once: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.stagesSection} id="stages" ref={containerRef}>
      <div className={styles.stagesInner}>
        <header className={styles.stagesHeader}>
          <span className="section-label">003 / Stages</span>
          <h2 className={styles.stagesHeading}>
            World&rsquo;s
            <br />
            Great Stages
          </h2>
        </header>

        <div className={styles.stagesGrid}>
          {stages.map((s, i) => (
            <StageCard
              key={s.id}
              className={stageClassNames[i]}
              image={s.image}
              festival={s.festival}
              name={s.name}
              location={s.location}
              index={i}
            />
          ))}
        </div>

        <div className={styles.stagesAlso} aria-hidden="true">
          <span className={styles.stagesAlsoLabel}>Also performed at</span>
          <div className={styles.stagesAlsoMarquee}>
            <div className={styles.stagesAlsoTrack}>
              <span>{STAGES_ALSO}</span>
              <span>{STAGES_ALSO}</span>
              <span>{STAGES_ALSO}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
