// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the schedule data constant (lines 8–69).
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScheduleRow from "../../9-scheduleSection-components/ScheduleRow";

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

export default function ScheduleSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="schedule-section" id="schedule" ref={containerRef}>
      <div className="schedule-inner">
        <div className="schedule-top">
          <div>
            <span className="section-label">006 / Schedule</span>
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
            <ScheduleRow
              key={ev.id}
              index={i}
              day={ev.day}
              month={ev.month}
              year={ev.year}
              time={ev.time}
              venue={ev.venue}
              city={ev.city}
              programme={ev.programme}
              status={ev.status}
              link={ev.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
