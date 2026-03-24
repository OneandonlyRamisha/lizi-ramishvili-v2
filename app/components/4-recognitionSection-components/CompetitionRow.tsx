"use client";

import styles from "./CompetitionRow.module.css";

interface CompetitionRowProps {
  numeral: string;
  prize: string;
  name: string;
  year: string | null;
  location: string;
}

export default function CompetitionRow({
  numeral,
  prize,
  name,
  year,
  location,
}: CompetitionRowProps) {
  return (
    <div className={styles.competitionRow}>
      <span className={styles.compNumeral} aria-hidden="true">
        {numeral}
      </span>
      <div>
        <span className={styles.compPrize}>{prize}</span>
        <div className={styles.compName}>{name}</div>
        <div className={styles.compLocation}>{location}</div>
      </div>
      <div className={styles.compYear} aria-hidden="true">
        {year ?? "—"}
      </div>
    </div>
  );
}
