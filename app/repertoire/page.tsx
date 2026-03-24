import type { Metadata } from "next";
import BackButton from "./BackButton";
import styles from "./repertoire-page.module.css";
import repStyles from "../../sections/7-RepertoireSection/RepertoireSection.module.css";
import { fullRepertoire } from "../data";

export const metadata: Metadata = {
  title: "Full Repertoire — Lizi Ramishvili",
  description: "Complete concert repertoire of cellist Lizi Ramishvili.",
};

export default function RepertoirePage() {
  return (
    <main className={styles.repPage}>
      <div className={styles.repPageInner}>
        <BackButton />
        <header className={styles.repPageHeader}>
          <span className="section-label">Full Repertoire</span>
          <h1 className={styles.repPageTitle}>Concert<br /><em>Repertoire</em></h1>
        </header>
        <div className={repStyles.repList}>
          {fullRepertoire.map((r, i) => (
            <div className={repStyles.repRow} key={i}>
              <span className={repStyles.repNum} aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className={repStyles.repCenter}>
                <span className={repStyles.repPieceName}>{r.piece}</span>
                <span className={repStyles.repOpus}>{r.opus}</span>
              </div>
              <span className={repStyles.repComposer}>{r.composer}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
