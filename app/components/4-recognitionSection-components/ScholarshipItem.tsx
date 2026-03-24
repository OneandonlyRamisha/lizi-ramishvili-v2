"use client";

import _styles from "./ScholarshipItem.module.css";

interface ScholarshipItemProps {
  name: string;
  note: string;
}

export default function ScholarshipItem({ name, note }: ScholarshipItemProps) {
  return (
    <li className="scholarship-item">
      <span className="scholarship-name">{name}</span>
      <span className="scholarship-note">{note}</span>
    </li>
  );
}
