import styles from "./RepertoireItem.module.css";

interface RepertoireItemProps {
  piece: string;
  composer: string;
  opus: string;
  index: number;
}

export default function RepertoireItem({
  piece,
  composer,
  opus,
  index,
}: RepertoireItemProps) {
  return (
    <li className={styles.repertoireItem} role="listitem">
      <div className={styles.repRowInner}>
        <span className={styles.repIdx} aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className={styles.repCenter}>
          <h3 className={styles.repPieceName}>{piece}</h3>
          <div className={styles.repDetails}>
            <span className={styles.repComposer}>{composer}</span>
            <span className={styles.repDot} aria-hidden="true">·</span>
            <span className={styles.repOpus}>{opus}</span>
          </div>
        </div>
        <span className={styles.repDeco} aria-hidden="true">—</span>
      </div>
    </li>
  );
}
