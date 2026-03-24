"use client";

import React from "react";
import _styles from "./StageCard.module.css";

interface StageCardProps {
  className: string;
  image: string | null;
  festival: string | null;
  name: string;
  location: string;
  index: number;
}

export default function StageCard({
  className,
  image,
  festival,
  name,
  location,
  index,
}: StageCardProps) {
  return (
    <div className={`stage-card ${className}`}>
      {image && (
        <div
          className="stage-bg"
          style={{ "--stage-bg": `url(${image})` } as React.CSSProperties}
        />
      )}
      <div className="stage-overlay" />
      <div className="stage-content">
        {festival && <div className="stage-festival">{festival}</div>}
        <div className="stage-name">{name}</div>
        <div className="stage-location">{location}</div>
      </div>
      <div className="stage-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </div>
    </div>
  );
}
