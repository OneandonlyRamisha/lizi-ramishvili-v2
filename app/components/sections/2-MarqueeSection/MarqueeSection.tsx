import styles from "./MarqueeSection.module.css";
import { MARQUEE_TEXT } from "../../../data";

export default function MarqueeSection() {
  return (
    <div className={styles.marqueeStrip} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={styles.marqueeText}>
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
