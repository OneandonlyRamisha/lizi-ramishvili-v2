"use client";

import Image from "next/image";
import styles from "./PressCell.module.css";

interface PressCellProps {
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageSizes: string;
  label: string;
  children: React.ReactNode;
  /** Extra class applied to the inner <p> text element (e.g. styles.gcLargeNum from PressSection) */
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
      className={styles.galleryCell}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        className={styles.galleryCellImg}
        sizes={imageSizes}
      />
      <div className={styles.galleryCellOverlay} />
      <span className={styles.galleryCellLabel}>{label}</span>
      <p className={`${styles.galleryCellText}${textClass ? ` ${textClass}` : ""}`}>
        {children}
      </p>
    </a>
  );
}
