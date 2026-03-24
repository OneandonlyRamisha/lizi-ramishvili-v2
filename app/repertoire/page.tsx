import type { Metadata } from "next";
import BackButton from "./BackButton";
import styles from "./repertoire-page.module.css";
import repStyles from "../components/sections/7-RepertoireSection/RepertoireSection.module.css";

export const metadata: Metadata = {
  title: "Full Repertoire — Lizi Ramishvili",
  description: "Complete concert repertoire of cellist Lizi Ramishvili.",
};

const fullRepertoire = [
  { piece: "Cello Concerto in B minor", composer: "Antonín Dvořák", opus: "Op. 104" },
  { piece: "Cello Concerto in E minor", composer: "Edward Elgar", opus: "Op. 85" },
  { piece: "Cello Concerto No. 1", composer: "Dmitri Shostakovich", opus: "Op. 107" },
  { piece: "Six Suites for Solo Cello", composer: "Johann Sebastian Bach", opus: "BWV 1007–1012" },
  { piece: "Cello Sonata in A major", composer: "Ludwig van Beethoven", opus: "Op. 69" },
  { piece: "Cello Concerto in A minor", composer: "Camille Saint-Saëns", opus: "Op. 33" },
  { piece: "Don Quixote", composer: "Richard Strauss", opus: "Op. 35" },
  { piece: "Cello Concerto No. 2", composer: "Dmitri Shostakovich", opus: "Op. 126" },
  { piece: "Variations on a Rococo Theme", composer: "Pyotr Ilyich Tchaikovsky", opus: "Op. 33" },
  { piece: "Cello Concerto", composer: "Robert Schumann", opus: "Op. 129" },
  { piece: "Kol Nidrei", composer: "Max Bruch", opus: "Op. 47" },
  { piece: "Cello Sonata No. 1", composer: "Johannes Brahms", opus: "Op. 38" },
  { piece: "Cello Sonata No. 2", composer: "Johannes Brahms", opus: "Op. 99" },
  { piece: "Cello Sonata in D minor", composer: "Claude Debussy", opus: "L. 135" },
  { piece: "Cello Sonata", composer: "Sergei Prokofiev", opus: "Op. 119" },
  { piece: "Cello Concerto No. 1", composer: "Camille Saint-Saëns", opus: "Op. 33" },
  { piece: "Pezzo Capriccioso", composer: "Pyotr Ilyich Tchaikovsky", opus: "Op. 62" },
  { piece: "Arpeggione Sonata", composer: "Franz Schubert", opus: "D. 821" },
];

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
