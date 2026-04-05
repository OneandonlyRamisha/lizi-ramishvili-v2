"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./GallerySection.module.css";
import { galleryImages } from "../../app/data";

const gridClasses = [
  styles.gi1,
  styles.gi2,
  styles.gi3,
  styles.gi4,
  styles.gi5,
  styles.gi6,
];

export default function GallerySection() {
  const containerRef = useRef<HTMLElement>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.galleryHeading}`, {
        opacity: 0,
        y: 60,
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: `.${styles.galleryHeading}`,
          start: "top 82%",
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(`.${styles.galleryItem}`).forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
          duration: 1.1,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.galleryGrid}`,
            start: "top 80%",
            once: true,
          },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevImage = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i - 1 + galleryImages.length) % galleryImages.length : null));
  }, []);
  const nextImage = useCallback(() => {
    setLightboxIdx((i) => (i !== null ? (i + 1) % galleryImages.length : null));
  }, []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIdx, closeLightbox, prevImage, nextImage]);

  return (
    <section className={styles.gallerySection} id="gallery" ref={containerRef}>
      <div className={styles.galleryInner}>
        <header className={styles.galleryHeader}>
          <span className="section-label">003 / Gallery</span>
          <h2 className={styles.galleryHeading}>
            In
            <br />
            Performance
          </h2>
        </header>

        <div className={styles.galleryGrid}>
          {galleryImages.map((img, i) => (
            <div
              key={img.id}
              className={`${styles.galleryItem} ${gridClasses[i] ?? ""}`}
              onClick={() => setLightboxIdx(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setLightboxIdx(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={img.sizes}
              />
              <div className={styles.galleryOverlay} />
              <div className={styles.galleryCaption}>
                <div className={styles.captionTitle}>{img.title}</div>
                <div className={styles.captionSub}>{img.location}</div>
              </div>
              <div className={styles.galleryNumber} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <div
        className={`${styles.lightbox} ${lightboxIdx !== null ? styles.lightboxOpen : ""}`}
        onClick={closeLightbox}
      >
        {lightboxIdx !== null && (
          <>
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
              ✕
            </button>
            <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Previous">
              ‹
            </button>
            <img
              src={galleryImages[lightboxIdx].src}
              alt={galleryImages[lightboxIdx].alt}
              onClick={(e) => e.stopPropagation()}
            />
            <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Next">
              ›
            </button>
            <div className={styles.lightboxCaption} onClick={(e) => e.stopPropagation()}>
              <div className={styles.captionTitle}>{galleryImages[lightboxIdx].title}</div>
              <div className={styles.captionSub}>{galleryImages[lightboxIdx].location}</div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
