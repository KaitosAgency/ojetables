"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { tabTitleAnimation } from "@/lib/site";

export function AnimatedTabTitle() {
  const pathname = usePathname();
  const originalTitleRef = useRef<string | null>(null);
  const messageIndexRef = useRef(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (!document.hidden) {
        originalTitleRef.current = document.title;
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    function clearAnimation() {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    function restoreTitle() {
      if (originalTitleRef.current) {
        document.title = originalTitleRef.current;
      }
    }

    function startAnimation() {
      clearAnimation();
      messageIndexRef.current = 0;
      document.title = tabTitleAnimation.messages[0];

      intervalRef.current = window.setInterval(() => {
        messageIndexRef.current =
          (messageIndexRef.current + 1) % tabTitleAnimation.messages.length;
        document.title = tabTitleAnimation.messages[messageIndexRef.current];
      }, tabTitleAnimation.intervalMs);
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        if (intervalRef.current === null) {
          originalTitleRef.current = document.title;
        }
        startAnimation();
        return;
      }

      clearAnimation();
      restoreTitle();
    }

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearAnimation();
      restoreTitle();
    };
  }, []);

  return null;
}
