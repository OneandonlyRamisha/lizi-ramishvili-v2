import styles from "./BioChapter.module.css";

interface BioChapterProps {
  index: number;
  label: string;
  text: string;
}

export default function BioChapter({ index, label, text }: BioChapterProps) {
  return (
    <div className={styles.bioChapter}>
      <span className={styles.bioChapterLabel}>
        {String(index + 1).padStart(2, "0")} / {label}
      </span>
      <p className={styles.bioChapterText}>{text}</p>
    </div>
  );
}
