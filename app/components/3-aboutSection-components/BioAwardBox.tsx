"use client";

import styles from "./BioAwardBox.module.css";

export default function BioAwardBox() {
  return (
    <div className={styles.bioAwardBox} aria-label="Forbes recognition">
      <div className={styles.bioAwardIcon} aria-hidden="true">
        ✦
      </div>
      <div>
        <span className={styles.bioAwardLabel}>Recognition</span>
        <span className={styles.bioAwardTitle}>
          Forbes Georgia — 30 Under 30
          <br />
          Culture &amp; Style · 2021
        </span>
      </div>
    </div>
  );
}
