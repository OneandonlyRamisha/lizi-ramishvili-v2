// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the competitions/honours/scholarships data constants (lines 10–63).
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CompetitionRow from "../../5-recognitionSection-components/CompetitionRow";
import AwardItem from "../../5-recognitionSection-components/AwardItem";
import ScholarshipItem from "../../5-recognitionSection-components/ScholarshipItem";

const competitions = [
  {
    numeral: "I",
    prize: "First Prize · Golden Nutcracker",
    name: "Nutcracker International TV Competition",
    year: "2010",
    location: "Russia",
  },
  {
    numeral: "I",
    prize: "Grand Prix",
    name: "Renaissance International Competition",
    year: null,
    location: "Armenia",
  },
  {
    numeral: "✦",
    prize: "National Winner — International Final",
    name: "Classical Eurovision Competition",
    year: "2012",
    location: "Georgia",
  },
  {
    numeral: "✦",
    prize: "Special Finalist Prize · €1,000",
    name: "Classic Strings Cello Competition",
    year: null,
    location: "International",
  },
];

const honours = [
  {
    year: "2017",
    name: "Zhvania Tsinandali Award",
    detail: "For Young Scholars and Artists · Georgia",
  },
  {
    year: "2021",
    name: "Forbes Georgia — 30 Under 30",
    detail: "Culture & Style Category",
  },
];

const scholarships = [
  {
    name: "Fundación Albéniz",
    note: "Full scholarship + Fernando Solar González cello · Reina Sofía School, Madrid",
  },
  { name: "Mstislav Rostropovich Foundation", note: "Full scholarship" },
  { name: "Nikolai Miaskovsky Foundation", note: "Full scholarship" },
  { name: "Boris Pergamenschikov Foundation", note: "Full scholarship" },
  { name: "Boris Ustinov Foundation", note: "Full scholarship" },
];

export default function RecognitionSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".rec-heading", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".rec-heading",
          start: "top 80%",
          once: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".competition-row").forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          x: -40,
          duration: 0.8,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".award-item").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          delay: i * 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".scholarship-item").forEach((el, i) => {
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
    <section className="recognition-section" id="recognition" ref={containerRef}>
      <div className="rec-watermark" aria-hidden="true">I</div>
      <div className="rec-inner">
        <span className="section-label">002 / Recognition</span>
        <div className="rec-heading">
          <span>Honours</span>
          <div className="rec-heading-note">
            Competitions · Awards · Scholarships
          </div>
        </div>

        {/* Competitions */}
        <div className="rec-competitions">
          <span className="rec-sub-label">Competitions</span>
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
        <div className="rec-bottom">
          <div className="rec-awards">
            <span className="rec-sub-label">Awards &amp; Honours</span>
            {honours.map((h, i) => (
              <AwardItem key={i} year={h.year} name={h.name} detail={h.detail} />
            ))}
          </div>

          <div>
            <span className="scholarship-intro">
              Foundations &amp; Scholarships
            </span>
            <ul className="scholarship-list">
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
