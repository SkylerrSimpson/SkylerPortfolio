"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/content";
import styles from "./copy-email.module.css";

export function CopyEmail() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const copied = status === "copied";
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 3500);
  }
  return (
    <div className="copy-email">
      <Button variant="outline" className={styles.button} data-status={status} onClick={copy}>
        <span className={styles.icons} aria-hidden="true">
          <Copy className={styles.copyIcon} />
          <Check className={styles.copiedIcon} />
        </span>
        <span className={styles.labels}>
          <span className={styles.idleLabel} aria-hidden={copied}>
            Copy email
          </span>
          <span className={styles.copiedLabel} aria-hidden={!copied}>
            Copied!
          </span>
        </span>
      </Button>
      <span role="status" className={status === "failed" ? "copy-error" : "sr-only"}>
        {status === "failed"
          ? `Copy unavailable. Email ${profile.email}.`
          : status === "copied"
            ? "Email copied to clipboard."
            : ""}
      </span>
    </div>
  );
}
