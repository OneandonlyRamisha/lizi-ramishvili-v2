"use client";

import styles from "./Cursor.module.css";

void styles; // module imported for completeness; cursor classes live in globals.css

export default function Cursor() {
  return (
    <>
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  );
}
