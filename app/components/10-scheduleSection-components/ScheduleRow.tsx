"use client";

interface ScheduleRowProps {
  index: number;
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
  index,
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
  return (
    <div className="sched-row" role="listitem">
      <div className="sched-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Date zone */}
      <div className="sched-date">
        <span className="sched-day">{day}</span>
        <span className="sched-month">
          {month} {year}
        </span>
      </div>

      {/* Vertical separator */}
      <div className="sched-sep" aria-hidden="true" />

      {/* Info */}
      <div className="sched-info">
        <div className="sched-venue">{venue}</div>
        <div className="sched-city">{city}</div>
        <div className="sched-programme">{programme}</div>
      </div>

      {/* CTA */}
      <div className="sched-cta">
        <span className="sched-time">{time}</span>
        <a
          className={`sched-btn${status === "sold-out" ? " sold-out" : status === "enquire" ? " enquire" : ""}`}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {status === "sold-out"
            ? "Sold Out"
            : status === "enquire"
              ? "Enquire →"
              : "Tickets →"}
        </a>
      </div>
    </div>
  );
}
