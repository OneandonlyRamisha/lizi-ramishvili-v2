"use client";

import styles from "./ContactDetail.module.css";

interface ContactDetailProps {
  label: string;
  value: string;
}

export default function ContactDetail({ label, value }: ContactDetailProps) {
  return (
    <div className={styles.contactDetail}>
      <div className={styles.contactDetailLabel}>{label}</div>
      <div className={styles.contactDetailValue}>{value}</div>
    </div>
  );
}
