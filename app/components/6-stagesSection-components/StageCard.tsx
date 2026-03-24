import React from "react";
import styles from "./StageCard.module.css";

interface StageCardProps {
  className: string;
  image: string | null;
  festival: string | null;
  name: string;
  location: string;
  index: number;
}

export default function StageCard({
  className,
  image,
  festival,
  name,
  location,
  index,
}: StageCardProps) {
  return (
    <div className={`${styles.stageCard} ${className}`}>
      {image && (
        <div
          className={styles.stageBg}
          style={{ "--stage-bg": `url(${image})` } as React.CSSProperties}
        />
      )}
      <div className={styles.stageOverlay} />
      <div className={styles.stageContent}>
        {festival && <div className={styles.stageFestival}>{festival}</div>}
        <div className={styles.stageName}>{name}</div>
        <div className={styles.stageLocation}>{location}</div>
      </div>
      <div className={styles.stageNumber} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}
