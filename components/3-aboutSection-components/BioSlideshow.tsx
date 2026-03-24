"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./BioSlideshow.module.css";
import { BIO_IMAGES } from "../../app/data";

export default function BioSlideshow() {
  const slideTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((s) => (s + 1) % BIO_IMAGES.length);
    }, 4200);
    return () => clearInterval(slideTimerRef.current);
  }, []);

  return (
    <>
      <div className={styles.bioSlideshowFrame}>
        {BIO_IMAGES.map((src, i) => (
          <div
            key={i}
            className={`${styles.bioSlide}${i === currentSlide ? ` ${styles.active}` : ""}`}
          >
            <Image
              src={src}
              alt={`Lizi Ramishvili — photograph ${i + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              className={styles.bioSlideImg}
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      {/* Dot indicators */}
      <div
        className={styles.slideshowDots}
        role="tablist"
        aria-label="Biography photos"
      >
        {BIO_IMAGES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot}${i === currentSlide ? ` ${styles.dotActive}` : ""}`}
            role="tab"
            aria-selected={i === currentSlide}
            aria-label={`Photo ${i + 1}`}
            onClick={() => {
              clearInterval(slideTimerRef.current);
              setCurrentSlide(i);
              slideTimerRef.current = setInterval(() => {
                setCurrentSlide((s) => (s + 1) % BIO_IMAGES.length);
              }, 4200);
            }}
          />
        ))}
      </div>
    </>
  );
}
