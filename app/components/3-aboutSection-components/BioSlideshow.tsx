"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import _styles from "./BioSlideshow.module.css";

const BIO_IMAGES = [
  "/images/biography/bio1.jpg",
  "/images/biography/bio2.jpg",
  "/images/biography/bio3.jpg",
  "/images/biography/bio4.jpg",
];

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
    <div className="about-slideshow-col">
      <div className="bio-slideshow-frame">
        {BIO_IMAGES.map((src, i) => (
          <div
            key={i}
            className={`bio-slide${i === currentSlide ? " active" : ""}`}
          >
            <Image
              src={src}
              alt={`Lizi Ramishvili — photograph ${i + 1}`}
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              className="bio-slide-img"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
      {/* Dot indicators */}
      <div
        className="slideshow-dots"
        role="tablist"
        aria-label="Biography photos"
      >
        {BIO_IMAGES.map((_, i) => (
          <button
            key={i}
            className={`dot${i === currentSlide ? " dot-active" : ""}`}
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
    </div>
  );
}
