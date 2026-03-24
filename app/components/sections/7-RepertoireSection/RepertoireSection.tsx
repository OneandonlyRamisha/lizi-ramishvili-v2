// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the repertoire data constant (lines 8–39).
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const repertoire = [
  {
    piece: "Cello Concerto in B minor",
    composer: "Antonín Dvořák",
    opus: "Op. 104",
  },
  {
    piece: "Cello Concerto in E minor",
    composer: "Edward Elgar",
    opus: "Op. 85",
  },
  {
    piece: "Cello Concerto No. 1",
    composer: "Dmitri Shostakovich",
    opus: "Op. 107",
  },
  {
    piece: "Six Suites for Solo Cello",
    composer: "Johann Sebastian Bach",
    opus: "BWV 1007–1012",
  },
  {
    piece: "Cello Sonata in A major",
    composer: "Ludwig van Beethoven",
    opus: "Op. 69",
  },
  {
    piece: "Cello Concerto in A minor",
    composer: "Camille Saint-Saëns",
    opus: "Op. 33",
  },
  {
    piece: "Don Quixote",
    composer: "Richard Strauss",
    opus: "Op. 35",
  },
];

export default function RepertoireSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".rep-heading", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".rep-heading",
          start: "top 80%",
          once: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".rep-row").forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          delay: i * 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 90%", once: true },
        });
        const nameEl = item.querySelector(".rep-piece-name");
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
    <section className="repertoire-section" id="repertoire" ref={containerRef}>
      <div className="rep-bg-text" aria-hidden="true">PROGRAMME</div>
      <div className="rep-inner">
        <span className="section-label">004 / Repertoire</span>
        <h2 className="rep-heading">
          Signature
          <br />
          Works
        </h2>
        <div className="rep-list">
          {repertoire.slice(0, 7).map((r, i) => (
            <div className="rep-row" key={i}>
              <span className="rep-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="rep-center">
                <span className="rep-piece-name">{r.piece}</span>
                <span className="rep-opus">{r.opus}</span>
              </div>
              <span className="rep-composer">{r.composer}</span>
              <div className="rep-rule" aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="rep-footer">
          <a href="/repertoire" className="rep-see-more">
            See Full Repertoire <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
