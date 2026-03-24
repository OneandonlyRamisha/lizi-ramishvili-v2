import styles from "./AwardItem.module.css";

interface AwardItemProps {
  year: string;
  name: string;
  detail: string;
}

export default function AwardItem({ year, name, detail }: AwardItemProps) {
  return (
    <div className={styles.awardItem}>
      <span className={styles.awardGlyph} aria-hidden="true">✦</span>
      <div>
        <span className={styles.awardYear}>{year}</span>
        <div className={styles.awardName}>{name}</div>
        <div className={styles.awardDetail}>{detail}</div>
      </div>
    </div>
  );
}
