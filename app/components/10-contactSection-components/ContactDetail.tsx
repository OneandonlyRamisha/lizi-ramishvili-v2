"use client";

import _styles from "./ContactDetail.module.css";

interface ContactDetailProps {
  label: string;
  value: string;
}

export default function ContactDetail({ label, value }: ContactDetailProps) {
  return (
    <div className="contact-detail">
      <div className="contact-detail-label">{label}</div>
      <div className="contact-detail-value">{value}</div>
    </div>
  );
}
