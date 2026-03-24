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

const bioChapters = [
  {
    label: "Early Life",
    text: "Born in Tbilisi, Georgia, in 1997, Lizi Ramishvili began her journey with the cello at the tender age of seven. Under the guidance of Professor Tamara Gabarashvili at the Paliashvili Central Music School, she quickly showcased her prodigious talent, delivering her first public performance just over a year into her studies.",
  },
  {
    label: "Education",
    text: "Lizi's dedication led her to the Pre-College division of the Kronberg Academy in Germany, studying under the esteemed cellist Frans Helmerson, and later to the Haute École de Musique de Genève in Switzerland. In 2017, she was accepted into the Reina Sofía School of Music in Madrid under Professor Jens Peter Maintz, supported by a scholarship from the Fundación Albéniz and a Fernando Solar González instrument scholarship.",
  },
  {
    label: "Competitions & Awards",
    text: "Lizi's talent has been recognised in numerous international competitions. She secured the First Prize and Golden Nutcracker at the Nutcracker International TV Competition in Russia, and the Grand Prize at the Renaissance International Competition in Armenia. In 2012 she represented Georgia at the Classical Eurovision Competition. In 2017 she received the Zhvania Tsinandali Award for Young Scholars and Artists, and has held full scholarships from the foundations of Mstislav Rostropovich, Nikolai Miaskovsky, Boris Pergamenschikov, and Boris Ustinov.",
  },
  {
    label: "Performances & Festivals",
    text: "Her performance career spans the world's most prestigious venues — Carnegie Hall in New York, the Berlin Konzerthaus, and countless international festivals including the Rheingau Music Festival, Ruhr Piano Festival, Musica Mundi, Young Euro Classic, Kronberg Academy Festival, Schubertiade Festival, Al Bustan, and the International Mstislav Rostropovich Festival, among many others.",
  },
  {
    label: "Collaborations",
    text: "Lizi has collaborated with Ivry Gitlis, Yuri Bashmet, Renaud Capuçon, Khatia Buniatishvili, Gvantsa Buniatishvili, Kazuki Yamada, Gianandrea Noseda, and Pietari Inkinen. She has performed with the Deutsche Radio Philharmonie Saarbrücken Kaiserslautern, Real Filharmonía de Galicia, Tbilisi Symphony Orchestra, Georgian Philharmonic Orchestra, National Chamber Orchestra of Armenia, National Symphony Orchestra of Azerbaijan, Novaya Rossiya State Symphony Orchestra, and the Tchaikovsky Symphony Orchestra, among others.",
  },
];

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
