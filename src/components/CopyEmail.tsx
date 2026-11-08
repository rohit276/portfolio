"use client";

import { useState } from "react";

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-line px-5 py-2.5 text-[0.95rem] font-medium text-ink transition hover:border-amber"
      aria-live="polite"
    >
      {copied ? "Email copied" : "Copy email"}
    </button>
  );
}
