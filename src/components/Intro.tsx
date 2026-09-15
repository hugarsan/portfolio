"use client";

import { useEffect, useState } from "react";

const LETTERS = "hugarsan".split("");

export default function Intro() {
  const [phase, setPhase] = useState<"show" | "exit">("show");
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    const t1 = window.setTimeout(() => setPhase("exit"), 2900);
    const t2 = window.setTimeout(() => {
      document.documentElement.style.overflow = "";
      setGone(true);
    }, 3900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight-950 transition-all duration-700 ${
        phase === "exit" ? "pointer-events-none -translate-y-6 opacity-0" : "opacity-100"
      }`}
      aria-hidden="true"
    >
      <div
        className="absolute h-80 w-80 rounded-full bg-accent-500/15 blur-[120px]"
        aria-hidden="true"
      />
      <p className="relative mb-4 animate-[fade-up_0.4s_ease_both] font-mono text-sm text-accent-400">
        <span className="text-slate-300">hugarsan@portfolio</span>
        <span className="text-accent-600">:</span>
        <span className="text-accent-600">~</span>
        <span className="text-slate-300">$</span>
      </p>
      <h1 className="relative font-display text-6xl font-bold tracking-tight text-slate-100 md:text-9xl">
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className="inline-block animate-[fade-up_0.45s_ease_both]"
            style={{ animationDelay: `${300 + i * 90}ms` }}
          >
            {letter}
          </span>
        ))}
      </h1>
      <div className="relative mt-8 h-px w-56 overflow-hidden rounded bg-midnight-700">
        <div className="h-full bg-accent-400 [animation:loader-fill_2.2s_ease_forwards_100ms]" />
      </div>
      <p className="relative mt-3 animate-[fade-up_0.6s_ease_1.6s_both] font-mono text-xs text-slate-600">
        inicializando portfolio…
      </p>
    </div>
  );
}