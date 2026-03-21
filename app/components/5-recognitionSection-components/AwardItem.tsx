"use client";

interface AwardItemProps {
  year: string;
  name: string;
  detail: string;
}

export default function AwardItem({ year, name, detail }: AwardItemProps) {
  return (
    <div className="award-item">
      <span className="award-glyph" aria-hidden="true">✦</span>
      <div>
        <span className="award-year">{year}</span>
        <div className="award-name">{name}</div>
        <div className="award-detail">{detail}</div>
      </div>
    </div>
  );
}
