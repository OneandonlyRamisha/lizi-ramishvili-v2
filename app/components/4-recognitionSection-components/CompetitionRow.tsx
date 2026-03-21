"use client";

interface CompetitionRowProps {
  numeral: string;
  prize: string;
  name: string;
  year: string | null;
  location: string;
}

export default function CompetitionRow({
  numeral,
  prize,
  name,
  year,
  location,
}: CompetitionRowProps) {
  return (
    <div className="competition-row">
      <span className="comp-numeral" aria-hidden="true">
        {numeral}
      </span>
      <div>
        <span className="comp-prize">{prize}</span>
        <div className="comp-name">{name}</div>
        <div className="comp-location">{location}</div>
      </div>
      <div className="comp-year" aria-hidden="true">
        {year ?? "—"}
      </div>
    </div>
  );
}
