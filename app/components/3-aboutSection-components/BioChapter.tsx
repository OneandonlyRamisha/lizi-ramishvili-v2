"use client";

import _styles from "./BioChapter.module.css";

interface BioChapterProps {
  index: number;
  label: string;
  text: string;
}

export default function BioChapter({ index, label, text }: BioChapterProps) {
  return (
    <div className="bio-chapter">
      <span className="bio-chapter-label">
        {String(index + 1).padStart(2, "0")} / {label}
      </span>
      <p className="bio-chapter-text">{text}</p>
    </div>
  );
}
