// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the competitions/honours/scholarships data constants (lines 10–63).
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CompetitionRow from "../../components/4-recognitionSection-components/CompetitionRow";
import AwardItem from "../../components/4-recognitionSection-components/AwardItem";
import ScholarshipItem from "../../components/4-recognitionSection-components/ScholarshipItem";
import styles from "./RecognitionSection.module.css";
import compStyles from "../../components/4-recognitionSection-components/CompetitionRow.module.css";
import awardStyles from "../../components/4-recognitionSection-components/AwardItem.module.css";
import scholarshipStyles from "../../components/4-recognitionSection-components/ScholarshipItem.module.css";
import { competitions, honours, scholarships } from "../../app/data";

export default function RecognitionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.recHeading}`, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.recHeading}`,
          start: "top 80%",
          once: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(`.${compStyles.competitionRow}`).forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(`.${awardStyles.awardItem}`).forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(`.${scholarshipStyles.scholarshipItem}`).forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: i * 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.recognitionSection} id="recognition" ref={containerRef}>
      <div className={styles.recWatermark} aria-hidden="true">I</div>
      <div className={styles.recInner}>
        <span className="section-label">002 / Recognition</span>
        <div className={styles.recHeading}>
          <span>Honours</span>
          <div className={styles.recHeadingNote}>
            Competitions · Awards · Scholarships
          </div>
        </div>

        {/* Competitions */}
        <div className={styles.recCompetitions}>
          <span className={styles.recSubLabel}>Competitions</span>
          {competitions.map((c, i) => (
            <CompetitionRow
              key={i}
              numeral={c.numeral}
              prize={c.prize}
              name={c.name}
              year={c.year}
              location={c.location}
            />
          ))}
        </div>

        {/* Awards + Scholarships */}
        <div className={styles.recBottom}>
          <div>
            <span className={styles.recSubLabel}>Awards &amp; Honours</span>
            {honours.map((h, i) => (
              <AwardItem key={i} year={h.year} name={h.name} detail={h.detail} />
            ))}
          </div>

          <div>
            <span className={styles.scholarshipIntro}>
              Foundations &amp; Scholarships
            </span>
            <ul className={styles.scholarshipList}>
              {scholarships.map((s, i) => (
                <ScholarshipItem key={i} name={s.name} note={s.note} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
