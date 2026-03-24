"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button className="rep-page-back" onClick={() => router.back()}>
      ← Back
    </button>
  );
}
