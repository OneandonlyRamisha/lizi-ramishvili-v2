"use client";

import _styles from "./MarqueeSection.module.css";

const MARQUEE_TEXT =
  "CONCERT ARTIST · TBILISI · LONDON · VIENNA · BERLIN · PARIS · NEW YORK · TOKYO · AMSTERDAM · ";

export default function MarqueeSection() {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="marquee-text">
            {MARQUEE_TEXT}
          </span>
        ))}
      </div>
    </div>
  );
}
