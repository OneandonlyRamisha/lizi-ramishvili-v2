"use client";

import Image from "next/image";
import _styles from "./PressCell.module.css";

interface PressCellProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageSizes: string;
  label: string;
  children: React.ReactNode;
  /** Extra class applied to the inner <p> text element (e.g. "gc-large-num") */
  textClass?: string;
}

export default function PressCell({
  href,
  imageSrc,
  imageAlt,
  imageSizes,
  label,
  children,
  textClass = "",
}: PressCellProps) {
  return (
    <a
      className="gallery-cell"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className="gallery-cell-img"
        sizes={imageSizes}
      />
      <div className="gallery-cell-overlay" />
      <span className="gallery-cell-label">{label}</span>
      <p className={`gallery-cell-text${textClass ? ` ${textClass}` : ""}`}>
        {children}
      </p>
    </a>
  );
}
