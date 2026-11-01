"use client";

import { useEffect, useState } from "react";

// Lo que dura la intro si aún no ha fijado --intro-delay.
const INTRO_FALLBACK = 1900;

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]#$%&*+=?";

type ScrambleProps = {
  text: string;
  /** Retraso antes de empezar, en ms. */
  delay?: number;
  /** Suma al retraso lo que tarde la intro en abrirse (variable CSS --intro-delay). */
  afterIntro?: boolean;
  /** Duración total del descifrado, en ms. */
  duration?: number;
  className?: string;
  charClassName?: string;
};

// Descifra el texto carácter a carácter, como si saliera de un modelo.
export default function Scramble({ text, delay = 0, afterIntro = false, duration = 1000, className = "", charClassName = "" }: ScrambleProps) {
  const [output, setOutput] = useState<string[]>(() => text.split("").map(() => ""));

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setOutput(text.split("")));
      return () => cancelAnimationFrame(raf);
    }
    let raf = 0;
    let start = 0;
    const intro = afterIntro ? parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--intro-delay")) : 0;
    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!start) start = now;
        const progress = Math.min(1, (now - start) / duration);
        const revealed = Math.floor(progress * text.length);
        setOutput(
          text.split("").map((ch, i) => {
            if (ch === " " || i < revealed) return ch;
            if (i > revealed + 6) return "";
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }),
        );
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay + (Number.isNaN(intro) ? INTRO_FALLBACK : intro));
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, afterIntro, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {output.map((ch, i) => (
          <span
            key={i}
            className={`${charClassName} ${ch !== text[i] ? "text-accent-300 opacity-70" : ""}`}
          >
            {ch === "" ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
