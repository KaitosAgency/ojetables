"use client";

import { Fragment, useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const PHRASES = ["pour professionnels", "et personnalisable"] as const;
const RESERVE_PHRASE = "pour professionnels";
const INTERVAL_MS = 5000;
const CHAR_DURATION_MS = 420;
const CHAR_STAGGER_MS = 26;

type Phase = "idle" | "exit" | "enter";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return true;
}

function getAnimatedCharCount(text: string) {
  return text.replace(/\s/g, "").length;
}

function getPhraseDuration(text: string) {
  const chars = getAnimatedCharCount(text);
  return CHAR_DURATION_MS + Math.max(chars - 1, 0) * CHAR_STAGGER_MS;
}

function SplitPhrase({ text, phase }: { text: string; phase: Phase }) {
  let animatedIndex = 0;
  const words = text.split(" ");

  return (
    <>
      {words.map((word, wordIndex) => (
        <Fragment key={`${text}-word-${wordIndex}`}>
          {wordIndex > 0 ? " " : null}
          {word.split("").map((char) => {
            const index = animatedIndex;
            animatedIndex += 1;

            return (
              <span
                key={`${text}-char-${wordIndex}-${index}`}
                className={cn(
                  "hero-tagline-char",
                  phase === "exit" && "hero-tagline-char-out",
                  phase === "enter" && "hero-tagline-char-in",
                )}
                style={phase !== "idle" ? { animationDelay: `${index * CHAR_STAGGER_MS}ms` } : undefined}
              >
                {char}
              </span>
            );
          })}
        </Fragment>
      ))}
    </>
  );
}

export function HeroRotatingTagline() {
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");

  const nextIndex = (index + 1) % PHRASES.length;
  const displayText =
    phase === "enter" ? PHRASES[nextIndex] : PHRASES[reduceMotion ? 0 : index];
  const renderPhase: Phase = reduceMotion ? "idle" : phase;

  useEffect(() => {
    if (reduceMotion) return;

    const interval = setInterval(() => {
      setPhase((current) => (current === "idle" ? "exit" : current));
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || phase === "idle") return;

    const text = phase === "exit" ? PHRASES[index] : PHRASES[nextIndex];
    const timeout = setTimeout(() => {
      if (phase === "exit") {
        setPhase("enter");
        return;
      }

      setIndex(nextIndex);
      setPhase("idle");
    }, getPhraseDuration(text));

    return () => clearTimeout(timeout);
  }, [phase, index, nextIndex, reduceMotion]);

  return (
    <span className="relative block text-brand-teal" aria-live="polite">
      <span className="invisible block" aria-hidden>
        <SplitPhrase text={RESERVE_PHRASE} phase="idle" />
      </span>
      <span className="absolute inset-0 block">
        <SplitPhrase text={displayText} phase={renderPhase} />
      </span>
    </span>
  );
}
