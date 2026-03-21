"use client";

export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      {/* Video background */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero-img.png"
        aria-hidden="true"
      >
        <source src="/hero-vid.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="hero-content">
        <span className="hero-eyebrow">Georgian Cellist</span>
        <h1 className="hero-title">
          <span className="hero-first">Lizi</span>
          <span className="hero-last">Ramishvili</span>
        </h1>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
