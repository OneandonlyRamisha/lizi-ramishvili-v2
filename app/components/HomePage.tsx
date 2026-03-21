"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StagesSection from "./sections/StagesSection";

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
];

const MARQUEE_TEXT =
  "CONCERT ARTIST · TBILISI · LONDON · VIENNA · BERLIN · PARIS · NEW YORK · TOKYO · AMSTERDAM · ";

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

const schedule = [
  {
    id: 1,
    day: "14",
    month: "APR",
    year: "2026",
    time: "19:30",
    venue: "Wigmore Hall",
    city: "London, United Kingdom",
    programme: "Bach · Britten · Shostakovich",
    status: "tickets" as const,
    link: "#",
  },
  {
    id: 2,
    day: "28",
    month: "APR",
    year: "2026",
    time: "20:00",
    venue: "Konzerthaus Berlin",
    city: "Berlin, Germany",
    programme: "Dvořák — Cello Concerto in B minor",
    status: "tickets" as const,
    link: "#",
  },
  {
    id: 3,
    day: "12",
    month: "MAY",
    year: "2026",
    time: "19:00",
    venue: "Palau de la Música",
    city: "Barcelona, Spain",
    programme: "Elgar · Brahms — Sonata in E minor",
    status: "enquire" as const,
    link: "#",
  },
  {
    id: 4,
    day: "03",
    month: "JUN",
    year: "2026",
    time: "18:30",
    venue: "Philharmonie de Paris",
    city: "Paris, France",
    programme: "Saint-Saëns · Debussy · Ravel",
    status: "tickets" as const,
    link: "#",
  },
  {
    id: 5,
    day: "19",
    month: "JUL",
    year: "2026",
    time: "21:00",
    venue: "Tbilisi Concert Hall",
    city: "Tbilisi, Georgia",
    programme: "Solo Recital — Six Suites for Cello, J.S. Bach",
    status: "sold-out" as const,
    link: "#",
  },
];

const BIO_IMAGES = [
  "/images/biography/bio1.jpg",
  "/images/biography/bio2.jpg",
  "/images/biography/bio3.jpg",
  "/images/biography/bio4.jpg",
];

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

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % BIO_IMAGES.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ── CURSOR ──
      const cursor = document.querySelector<HTMLElement>(".cursor");
      const ring = document.querySelector<HTMLElement>(".cursor-ring");

      if (cursor && ring) {
        const onMove = (e: MouseEvent) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.06,
            ease: "none",
          });
          gsap.to(ring, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.35,
            ease: "power2.out",
          });
        };
        window.addEventListener("mousemove", onMove);

        document
          .querySelectorAll('a, button, [role="button"]')
          .forEach((el) => {
            el.addEventListener("mouseenter", () =>
              gsap.to(ring, { scale: 2.2, duration: 0.3 }),
            );
            el.addEventListener("mouseleave", () =>
              gsap.to(ring, { scale: 1, duration: 0.3 }),
            );
          });
      }

      // ── NAV ENTRANCE ──
      gsap.from(".nav", {
        opacity: 0,
        y: -24,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      });


      // ── ABOUT ──
      gsap.from(".about-section .section-label", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".about-slideshow-col", {
        opacity: 0,
        x: -50,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-section",
          start: "top 72%",
          once: true,
        },
      });
      gsap.from(".bio-name", {
        opacity: 0,
        y: 40,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".bio-name", start: "top 82%", once: true },
      });
      gsap.from(".bio-title-row", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bio-title-row",
          start: "top 86%",
          once: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".bio-chapter").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          delay: i * 0.06,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      gsap.from(".bio-award-box", {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".bio-award-box",
          start: "top 90%",
          once: true,
        },
      });

      // ── RECOGNITION ──
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

      // ── HORIZONTAL GLIDE TEXT ──
      gsap.to(".h-scroll-track", {
        x: "-25%",
        ease: "none",
        scrollTrigger: {
          trigger: ".h-scroll-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // ── STAGES ──
      // ── REPERTOIRE ──
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

      gsap.utils.toArray<HTMLElement>(".repertoire-item").forEach((item, i) => {
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

      // ── GALLERY ──
      gsap.from(".gallery-heading", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".gallery-heading",
          start: "top 80%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((item, i) => {
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

      // ── SCHEDULE ──
      gsap.from(".schedule-heading", {
        opacity: 0,
        y: 60,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".schedule-heading",
          start: "top 82%",
          once: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(".sched-row").forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
          duration: 0.85,
          delay: i * 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".sched-list",
            start: "top 80%",
            once: true,
          },
        });
      });

      // ── CONTACT ──
      gsap.from(".contact-heading", {
        opacity: 0,
        y: 70,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-heading",
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(".contact-grid > *", {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 78%",
          once: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="site" ref={containerRef}>
      {/* Custom cursor */}
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />

      {/* ── NAV ── */}
      <nav className="nav" role="navigation">
        <a href="#hero" className="nav-logo">
          LR
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#recognition">Recognition</a>
          </li>
          <li>
            <a href="#repertoire">Repertoire</a>
          </li>
          <li>
            <a href="#gallery">Press</a>
          </li>
          <li>
            <a href="#schedule">Schedule</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* ── MOBILE NAV OVERLAY ── */}
      <div
        className={`mobile-nav${mobileNavOpen ? " open" : ""}`}
        aria-hidden={!mobileNavOpen}
      >
        {[
          ["#about", "About"],
          ["#recognition", "Recognition"],
          ["#repertoire", "Repertoire"],
          ["#gallery", "Press"],
          ["#schedule", "Schedule"],
          ["#contact", "Contact"],
        ].map(([href, label]) => (
          <a key={href} href={href} onClick={() => setMobileNavOpen(false)}>
            {label}
          </a>
        ))}
      </div>

      {/* ── HAMBURGER (fixed, always above overlay) ── */}
      <button
        className={`nav-hamburger${mobileNavOpen ? " open" : ""}`}
        aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      {/* ── 1. HERO ── */}
      <section className="hero" id="hero">
        {/* Video background */}
        <video
          className="hero-video"
          src="/hero-vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="hero-overlay" aria-hidden="true" />

        <div className="hero-content">
          <span className="hero-eyebrow">Georgian Cellist</span>
          <h1 className="hero-title">
            <span className="hero-first">Lizi</span>
            <span className="hero-last">Ramishvili</span>
          </h1>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── 2. MARQUEE ── */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="marquee-text">
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. ABOUT ── */}
      <section className="about-section" id="about">
        <span className="section-label">001 / Artist</span>
        <div className="about-layout">
          {/* Left — sticky slideshow */}
          <div className="about-slideshow-col">
            <div className="bio-slideshow-frame">
              {BIO_IMAGES.map((src, i) => (
                <div
                  key={i}
                  className={`bio-slide${i === currentSlide ? " active" : ""}`}
                >
                  <Image
                    src={src}
                    alt={`Lizi Ramishvili — photograph ${i + 1}`}
                    fill
                    sizes="(max-width: 900px) 100vw, 42vw"
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
            {/* Dot indicators */}
            <div
              className="slideshow-dots"
              role="tablist"
              aria-label="Biography photos"
            >
              {BIO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  className={`dot${i === currentSlide ? " dot-active" : ""}`}
                  role="tab"
                  aria-selected={i === currentSlide}
                  aria-label={`Photo ${i + 1}`}
                  onClick={() => setCurrentSlide(i)}
                />
              ))}
            </div>
          </div>

          {/* Right — biography text */}
          <div className="about-bio-col">
            <h2 className="bio-name">
              Lizi
              <br />
              Ramishvili
            </h2>
            <div className="bio-title-row">
              <span className="bio-title">Cellist · Concert Artist</span>
              <div className="bio-title-line" aria-hidden="true" />
            </div>

            {bioChapters.map((ch, i) => (
              <div key={i} className="bio-chapter">
                <span className="bio-chapter-label">
                  {String(i + 1).padStart(2, "0")} / {ch.label}
                </span>
                <p className="bio-chapter-text">{ch.text}</p>
              </div>
            ))}

            {/* Forbes award callout */}
            <div className="bio-award-box" aria-label="Forbes recognition">
              <div className="bio-award-icon" aria-hidden="true">
                ✦
              </div>
              <div className="bio-award-content">
                <span className="bio-award-label">Recognition</span>
                <span className="bio-award-title">
                  Forbes Georgia — 30 Under 30
                  <br />
                  Culture &amp; Style · 2021
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. RECOGNITION ── */}
      <section className="recognition-section" id="recognition">
        <div className="rec-watermark" aria-hidden="true">
          I
        </div>
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
              <div key={i} className="competition-row">
                <span className="comp-numeral" aria-hidden="true">
                  {c.numeral}
                </span>
                <div>
                  <span className="comp-prize">{c.prize}</span>
                  <div className="comp-name">{c.name}</div>
                  <div className="comp-location">{c.location}</div>
                </div>
                <div className="comp-year" aria-hidden="true">
                  {c.year ?? "—"}
                </div>
              </div>
            ))}
          </div>

          {/* Awards + Scholarships */}
          <div className="rec-bottom">
            {/* Honours */}
            <div className="rec-awards">
              <span className="rec-sub-label">Awards &amp; Honours</span>
              {honours.map((h, i) => (
                <div key={i} className="award-item">
                  <span className="award-glyph" aria-hidden="true">
                    ✦
                  </span>
                  <div>
                    <span className="award-year">{h.year}</span>
                    <div className="award-name">{h.name}</div>
                    <div className="award-detail">{h.detail}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scholarships */}
            <div>
              <span className="scholarship-intro">
                Foundations &amp; Scholarships
              </span>
              <ul className="scholarship-list">
                {scholarships.map((s, i) => (
                  <li key={i} className="scholarship-item">
                    <span className="scholarship-name">{s.name}</span>
                    <span className="scholarship-note">{s.note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. HORIZONTAL GLIDE TEXT ── */}
      <div className="h-scroll-section" aria-hidden="true">
        <div className="h-scroll-track">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="h-scroll-text">
              CONCERT · RECITAL · CHAMBER · SOLO · CONCERTO · TBILISI ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* ── 5. STAGES ── */}
      {/* <StagesSection /> */}

      {/* ── 6. REPERTOIRE ── */}
      <section className="repertoire-section" id="repertoire">
        <div className="rep-bg-text" aria-hidden="true">
          PROGRAMME
        </div>
        <div className="rep-inner">
          <span className="section-label">003 / Repertoire</span>
          <h2 className="rep-heading">
            Signature
            <br />
            Works
          </h2>
          <ul className="rep-list" role="list">
            {repertoire.map((r, i) => (
              <li key={i} className="repertoire-item" role="listitem">
                <div className="rep-row-inner">
                  <span className="rep-idx" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="rep-center">
                    <h3 className="rep-piece-name">{r.piece}</h3>
                    <div className="rep-details">
                      <span className="rep-composer">{r.composer}</span>
                      <span className="rep-dot" aria-hidden="true">
                        ·
                      </span>
                      <span className="rep-opus">{r.opus}</span>
                    </div>
                  </div>
                  <span className="rep-deco" aria-hidden="true">
                    —
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <StagesSection />

      {/* ── 7. GALLERY ── */}
      <section className="gallery-section" id="gallery">
        <div className="gallery-inner">
          <span className="section-label">004 / Press</span>
          <h2 className="gallery-heading">
            Press
            <br />
            &amp; Media
          </h2>
          <div className="gallery-grid" role="list">
            <div className="gallery-item gi-1" role="listitem">
              <a
                className="gallery-cell"
                href="https://georgiatoday.ge/three-people-two-centuries-one-hall-a-chamber-music-night-at-the-tbilisi-conservatoire/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/lizi-press.jpg"
                  alt="Lizi Ramishvili performance"
                  fill
                  className="gallery-cell-img"
                  sizes="(max-width:860px) 100vw, 58vw"
                />
                <div className="gallery-cell-overlay" />
                <span className="gallery-cell-label">— Georgia Today</span>
                <p className="gallery-cell-text">
                  &ldquo;The cello seemed
                  <br />
                  to sing as Brahms
                  <br />
                  intended&rdquo;
                </p>
              </a>
            </div>
            <div className="gallery-item gi-2" role="listitem">
              <a
                className="gallery-cell"
                href="http://georgiatoday.ge/news/4572/Georgian-Musicians-to-Perform-at-Carnegie-Hall"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/stages/carnegie-hall.jpg"
                  alt="Carnegie Hall"
                  fill
                  className="gallery-cell-img"
                  sizes="(max-width:860px) 100vw, 42vw"
                />
                <div className="gallery-cell-overlay" />
                <span className="gallery-cell-label">Carnegie Hall, NYC</span>
                <p className="gallery-cell-text gc-large-num">
                  US
                  <br />
                  Debut
                </p>
              </a>
            </div>
            <div className="gallery-item gi-3" role="listitem">
              <a
                className="gallery-cell"
                href="https://agenda.ge/en/news/2017/1776"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/stages/kloster-eberbach.jpg"
                  alt="Konzerthaus Berlin"
                  fill
                  className="gallery-cell-img"
                  sizes="(max-width:860px) 100vw, 42vw"
                />
                <div className="gallery-cell-overlay" />
                <span className="gallery-cell-label">Konzerthaus Berlin</span>
                <p className="gallery-cell-text">
                  Georgian
                  <br />
                  Overtones
                </p>
              </a>
            </div>
            <div className="gallery-item gi-4" role="listitem">
              <a
                className="gallery-cell"
                href="https://www.facebook.com/khatiabuniatishvili/photos/1268180713234781/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/biography/bio2.jpg"
                  alt="Lizi Ramishvili"
                  fill
                  className="gallery-cell-img"
                  sizes="(max-width:860px) 100vw, 33vw"
                />
                <div className="gallery-cell-overlay" />
                <span className="gallery-cell-label">
                  — Khatia Buniatishvili
                </span>
                <p className="gallery-cell-text">
                  &ldquo;An amazing
                  <br />
                  talent&rdquo;
                </p>
              </a>
            </div>
            <div className="gallery-item gi-5" role="listitem">
              <a
                className="gallery-cell"
                href="https://www.liziramishvili.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/biography/bio4.jpg"
                  alt="Lizi Ramishvili"
                  fill
                  className="gallery-cell-img"
                  sizes="(max-width:860px) 100vw, 33vw"
                />
                <div className="gallery-cell-overlay" />
                <span className="gallery-cell-label">Forbes Georgia</span>
                <p className="gallery-cell-text">
                  30 Under
                  <br />
                  30 · 2021
                </p>
              </a>
            </div>
            <div className="gallery-item gi-6" role="listitem">
              <a
                className="gallery-cell"
                href="https://www.sommets-musicaux.com/artist/lizi-ramishvili/?lang=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/biography/bio1.jpg"
                  alt="Lizi Ramishvili at festival"
                  fill
                  className="gallery-cell-img"
                  sizes="(max-width:860px) 100vw, 33vw"
                />
                <div className="gallery-cell-overlay" />
                <span className="gallery-cell-label">
                  Kronberg · Gstaad · Rheingau
                </span>
                <p className="gallery-cell-text">
                  Festival
                  <br />
                  Artist
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. SCHEDULE ── */}
      <section className="schedule-section" id="schedule">
        <div className="schedule-inner">
          <div className="schedule-top">
            <div>
              <span className="section-label">005 / Schedule</span>
              <h2 className="schedule-heading">
                Upcoming
                <br />
                Performances
              </h2>
            </div>
            <span className="schedule-top-note">
              Season 2026 · {schedule.length} Concerts
            </span>
          </div>

          <div className="sched-list" role="list">
            {schedule.map((ev, i) => (
              <div key={ev.id} className="sched-row" role="listitem">
                <div className="sched-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Date zone */}
                <div className="sched-date">
                  <span className="sched-day">{ev.day}</span>
                  <span className="sched-month">
                    {ev.month} {ev.year}
                  </span>
                </div>

                {/* Vertical separator */}
                <div className="sched-sep" aria-hidden="true" />

                {/* Info */}
                <div className="sched-info">
                  <div className="sched-venue">{ev.venue}</div>
                  <div className="sched-city">{ev.city}</div>
                  <div className="sched-programme">{ev.programme}</div>
                </div>

                {/* CTA */}
                <div className="sched-cta">
                  <span className="sched-time">{ev.time}</span>
                  <a
                    className={`sched-btn${ev.status === "sold-out" ? " sold-out" : ev.status === "enquire" ? " enquire" : ""}`}
                    href={ev.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ev.status === "sold-out"
                      ? "Sold Out"
                      : ev.status === "enquire"
                        ? "Enquire →"
                        : "Tickets →"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CONTACT ── */}
      <section className="contact-section" id="contact">
        <div className="contact-bg-text" aria-hidden="true">
          CONNECT
        </div>
        <div className="contact-inner">
          <h2 className="contact-heading">
            Let&rsquo;s
            <br />
            <span className="contact-accent">Connect</span>
          </h2>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <div className="contact-detail">
                <div className="contact-detail-label">Management</div>
                <div className="contact-detail-value">
                  management@liziramishvili.com
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-label">Bookings</div>
                <div className="contact-detail-value">
                  bookings@liziramishvili.com
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-label">Press &amp; Media</div>
                <div className="contact-detail-value">
                  press@liziramishvili.com
                </div>
              </div>
            </div>
            <form
              className="contact-form"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Contact form"
            >
              <div className="form-field">
                <label className="form-label" htmlFor="name">
                  Your Name
                </label>
                <input
                  className="form-input"
                  id="name"
                  type="text"
                  placeholder="Full name"
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="form-input"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="form-input form-textarea"
                  id="message"
                  placeholder="Tell me about your event or enquiry…"
                />
              </div>
              <button type="submit" className="form-submit">
                Send Message →
              </button>
            </form>
          </div>
          <footer className="footer" role="contentinfo">
            <div className="footer-logo">Lizi Ramishvili</div>
            <nav className="footer-socials" aria-label="Social links">
              <a href="#" className="footer-social-link">
                Instagram
              </a>
              <a href="#" className="footer-social-link">
                YouTube
              </a>
              <a href="#" className="footer-social-link">
                Spotify
              </a>
            </nav>
            <div className="footer-copy">© 2026 Lizi Ramishvili</div>
          </footer>
        </div>
      </section>
    </div>
  );
}

// Has problems with resposinvess
