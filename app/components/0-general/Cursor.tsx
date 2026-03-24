"use client";

import _styles from "./Cursor.module.css";

export default function Cursor() {
  return (
    <>
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-ring" aria-hidden="true" />
    </>
  );
}
