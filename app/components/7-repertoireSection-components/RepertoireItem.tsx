"use client";

import _styles from "./RepertoireItem.module.css";

interface RepertoireItemProps {
  piece: string;
  composer: string;
  opus: string;
  index: number;
}

export default function RepertoireItem({
  piece,
  composer,
  opus,
  index,
}: RepertoireItemProps) {
  return (
    <li className="repertoire-item" role="listitem">
      <div className="rep-row-inner">
        <span className="rep-idx" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="rep-center">
          <h3 className="rep-piece-name">{piece}</h3>
          <div className="rep-details">
            <span className="rep-composer">{composer}</span>
            <span className="rep-dot" aria-hidden="true">·</span>
            <span className="rep-opus">{opus}</span>
          </div>
        </div>
        <span className="rep-deco" aria-hidden="true">—</span>
      </div>
    </li>
  );
}
