import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero">
      {/* Video background */}
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-img.png"
        aria-hidden="true"
      >
        <source src="/hero-vid.mp4" type="video/mp4" />
      </video>
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={styles.heroContent}>
        <span className={styles.heroEyebrow}>Georgian Cellist</span>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroFirst}>Lizi</span>
          <span className={styles.heroLast}>Ramishvili</span>
        </h1>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
