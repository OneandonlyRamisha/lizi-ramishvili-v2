// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the stages data constant (lines 8–60).
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StageCard from "../../6-stagesSection-components/StageCard";

const stages = [
  {
    id: "carnegie",
    name: "Carnegie Hall",
    location: "New York, USA",
    festival: null,
    image: "/images/stages/carnegie-hall.jpg",
    className: "sc-a",
  },
  {
    id: "kloster",
    name: "Kloster Eberbach",
    location: "Rheingau, Germany",
    festival: "Rheingau Musik Festival",
    image: "/images/stages/kloster-eberbach.jpg",
    className: "sc-b",
  },
  {
    id: "tbilisi",
    name: "Tbilisi Conservatoire",
    location: "Tbilisi, Georgia",
    festival: "International Rostropovich Festival",
    image: "/images/stages/tbilisi-conservatoire.jpg",
    className: "sc-c",
  },
  {
    id: "berlin",
    name: "Konzerthaus Berlin",
    location: "Berlin, Germany",
    festival: "Young Euro Classic",
    image: null,
    className: "sc-d sg-berlin",
  },
  {
    id: "schubertiade",
    name: "Schubertiade",
    location: "Schwarzenberg, Austria",
    festival: "Schubertiade Festival",
    image: null,
    className: "sc-e sg-schubertiade",
  },
  {
    id: "gstaad",
    name: "Sommets Musicaux",
    location: "Gstaad, Switzerland",
    festival: "Sommets Musicaux de Gstaad",
    image: null,
    className: "sc-f sg-gstaad",
  },
];

const STAGES_ALSO =
  "Barbican London · Musica Mundi · Al Bustan Festival · Kronberg Academy · Ruhr Piano Festival · Casals Festival · ";

export default function StagesSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".stages-heading", {
        opacity: 0,
        y: 60,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stages-heading",
          start: "top 82%",
          once: true,
        },
      });

      gsap.from(".stages-meta", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stages-meta",
          start: "top 85%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".stage-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
          duration: 1.1,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stages-grid",
            start: "top 80%",
            once: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="stages-section" id="stages" ref={containerRef}>
      <div className="stages-inner">
        <header className="stages-header">
          <span className="section-label">003 / Stages</span>
          <div className="stages-title-row">
            <h2 className="stages-heading">
              World&rsquo;s
              <br />
              Great Stages
            </h2>
            <div className="stages-meta">
              <div className="stage-meta-item">
                <span className="stage-meta-number">87+</span>
                <span className="stage-meta-label">Concerts</span>
              </div>
              <div className="stage-meta-item">
                <span className="stage-meta-number">20+</span>
                <span className="stage-meta-label">Stages</span>
              </div>
              <div className="stage-meta-item">
                <span className="stage-meta-number">10+</span>
                <span className="stage-meta-label">Countries</span>
              </div>
            </div>
          </div>
        </header>

        <div className="stages-grid">
          {stages.map((s, i) => (
            <StageCard
              key={s.id}
              className={s.className}
              image={s.image}
              festival={s.festival}
              name={s.name}
              location={s.location}
              index={i}
            />
          ))}
        </div>

        <div className="stages-also" aria-hidden="true">
          <span className="stages-also-label">Also performed at</span>
          <div className="stages-also-marquee">
            <div className="stages-also-track">
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
