"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevPathRef = useRef(pathname + searchParams.toString());

  const startProgress = useCallback(() => {
    setVisible(true);
    setProgress(0);

    if (timerRef.current) clearInterval(timerRef.current);

    let current = 0;
    timerRef.current = setInterval(() => {
      current += Math.random() * 15;
      if (current >= 90) {
        current = 90;
        if (timerRef.current) clearInterval(timerRef.current);
      }
      setProgress(current);
    }, 200);
  }, []);

  const completeProgress = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  }, []);

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    if (prevPathRef.current !== currentPath) {
      completeProgress();
      prevPathRef.current = currentPath;
    }
  }, [pathname, searchParams, completeProgress]);

  // Intercept link clicks to start the progress bar immediately
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        anchor.target === "_blank"
      )
        return;

      const currentPath = pathname + searchParams.toString();
      // Only start progress if navigating to a different path
      if (href !== currentPath && href !== pathname) {
        startProgress();
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [pathname, searchParams, startProgress]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]">
      <div
        className="h-full bg-accent transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 8px rgba(0, 134, 196, 0.4)",
        }}
      />
    </div>
  );
}
