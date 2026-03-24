"use client";

import styles from "./ScheduleRow.module.css";

interface ScheduleRowProps {
  day: string;
  month: string;
  year: string;
  time: string;
  venue: string;
  city: string;
  programme: string;
  status: "tickets" | "enquire" | "sold-out";
  link: string;
}

export default function ScheduleRow({
  day,
  month,
  year,
  time,
  venue,
  city,
  programme,
  status,
  link,
}: ScheduleRowProps) {
  const btnClass = `${styles.schedBtn}${
    status === "sold-out"
      ? ` ${styles.soldOut}`
      : status === "enquire"
        ? ` ${styles.enquire}`
        : ""
  }`;

  return (
    <div className={styles.schedRow} role="listitem">
      {/* Date zone */}
      <div className={styles.schedDate}>
        <span className={styles.schedDay}>{day}</span>
        <span className={styles.schedMonth}>
          {month} {year}
        </span>
      </div>

      {/* Vertical separator */}
      <div className={styles.schedSep} aria-hidden="true" />

      {/* Info */}
      <div className={styles.schedInfo}>
        <div className={styles.schedVenue}>{venue}</div>
        <div className={styles.schedCity}>{city}</div>
        <div className={styles.schedProgramme}>{programme}</div>
      </div>

      {/* CTA */}
      <div className={styles.schedCta}>
        <span className={styles.schedTime}>{time}</span>
        <a
          className={btnClass}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {status === "sold-out"
            ? "Sold Out"
            : status === "enquire"
              ? "Info Soon"
              : "Tickets →"}
        </a>
      </div>
    </div>
  );
}
