"use client";

export default function BioAwardBox() {
  return (
    <div className="bio-award-box" aria-label="Forbes recognition">
      <div className="bio-award-icon" aria-hidden="true">
        ✦
      </div>
      <div className="bio-award-content">
        <span className="bio-award-label">Recognition</span>
        <span className="bio-award-title">
          Forbes Georgia — 30 Under 30
          <br />
          Culture &amp; Style · 2021
        </span>
      </div>
    </div>
  );
}
