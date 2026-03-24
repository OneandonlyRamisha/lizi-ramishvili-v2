// NOTE: Section exceeds 80 lines but no clean extraction point found.
// The overage is entirely the schedule data constant (lines 8–69).
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScheduleRow from "../../components/9-scheduleSection-components/ScheduleRow";
import styles from "./ScheduleSection.module.css";
import rowStyles from "../../components/9-scheduleSection-components/ScheduleRow.module.css";
import { schedule } from "../../app/data";

export default function ScheduleSection() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.scheduleHeading}`, {
        opacity: 0,
        y: 60,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.scheduleHeading}`,
          start: "top 82%",
          once: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(`.${rowStyles.schedRow}`).forEach((row, i) => {
        gsap.from(row, {
          opacity: 0,
          clipPath: "inset(0 0 100% 0)",
          duration: 0.85,
          delay: i * 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.schedList}`,
            start: "top 80%",
            once: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.scheduleSection} id="schedule" ref={containerRef}>
      <div className={styles.scheduleInner}>
        <div className={styles.scheduleTop}>
          <div>
            <span className="section-label">006 / Schedule</span>
            <h2 className={styles.scheduleHeading}>
              Upcoming
              <br />
              Performances
            </h2>
          </div>
        </div>

        <div className={styles.schedList} role="list">
          {schedule.map((ev, i) => (
            <ScheduleRow
              key={ev.id}
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
