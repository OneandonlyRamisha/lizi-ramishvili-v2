"use client";

import { useRouter } from "next/navigation";
import styles from "./repertoire-page.module.css";

export default function BackButton() {
  const router = useRouter();
  return (
    <button className={styles.repPageBack} onClick={() => router.back()}>
      ← Back
    </button>
  );
}
