"use client";

import React from "react";

type CopyProps = {
  text: string;
  onCopy?: () => void;
  children: React.ReactNode;
};

/**
 * Minimal client-side copy-to-clipboard wrapper to avoid typing issues with
 * the `react-copy-to-clipboard` package in the Next.js/React 18 type setup.
 *
 * It provides the small subset of the original API used in the app:
 * - `text` (string) to copy
 * - `onCopy` callback when copy succeeds
 * - `children` element that will be clickable
 */
export const CopyToClipboard = ({ text, onCopy, children }: CopyProps) => {
  const handleClick: React.MouseEventHandler = async e => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(text);
      onCopy?.();
    } catch (err) {
      // Best-effort: if clipboard API fails, just log and don't throw
      // (this keeps the UI resilient during SSR/build checks)
      // eslint-disable-next-line no-console
      console.error("Copy to clipboard failed:", err);
    }
  };

  return (
    // Use a span so it can wrap icons / buttons without changing layout.
    // The click handler mirrors the original component behaviour.
    <span onClick={handleClick}>{children}</span>
  );
};

export default CopyToClipboard;
