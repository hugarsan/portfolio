"use client";

import { useEffect, useState } from "react";
import Scramble from "@/components/Scramble";

const BOOT_LINES = [
  ["booting", "hugarsan.ai v2026.11"],
  ["loading weights", "grado_informatica_usal"],
  ["loading weights", "master_ia_unir"],
  ["mounting", "experience/stormbringer"],
  ["calibrating", "neural_field"],
];

const STEP = 230;
const OPEN_AT = 1750;
const GONE_AT = 2550;
const SEEN_KEY = "hugarsan:intro-seen";

// Retraso con el que el hero arranca sus animaciones (lo lee vía CSS).
const setHeroDelay = (ms: number) =>
  document.documentElement.style.setProperty("--intro-delay", `${ms}ms`);

export default function Intro() {
  const [phase, setPhase] = useState<"boot" | "open" | "gone">("boot");
  const [lines, setLines] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // Sin sessionStorage la intro se muestra siempre.
    }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeroDelay(0);
      const raf = requestAnimationFrame(() => setPhase("gone"));
      return () => cancelAnimationFrame(raf);
    }

    document.documentElement.style.overflow = "hidden";
    const timers = BOOT_LINES.map((_, i) => window.setTimeout(() => setLines(i + 1), 120 + i * STEP));
    const started = performance.now();
    let raf = 0;
    const count = (now: number) => {
      const p = Math.min(1, (now - started) / (OPEN_AT - 150));
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(count);
    };
    raf = requestAnimationFrame(count);

    const open = () => {
      setPhase((p) => (p === "boot" ? "open" : p));
      document.documentElement.style.overflow = "";
    };
    // Clic o tecla: saltar la intro.
    const skip = () => {
      stopListening();
      setHeroDelay(0);
      open();
      window.setTimeout(() => setPhase("gone"), 800);
    };
    const stopListening = () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);

    const tOpen = window.setTimeout(() => {
      stopListening();
      open();
    }, OPEN_AT);
    const tGone = window.setTimeout(() => setPhase("gone"), GONE_AT);

    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(tOpen);
      window.clearTimeout(tGone);
      cancelAnimationFrame(raf);
      stopListening();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "gone") return null;
  const opening = phase === "open";

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      {/* Telón: dos mitades que se abren hacia arriba y hacia abajo */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-midnight-950 transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          opening ? "-translate-y-full" : ""
        }`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-midnight-950 transition-transform duration-[800ms] ease-[cubic-bezier(0.77,0,0.18,1)] ${
          opening ? "translate-y-full" : ""
        }`}
      />
      <div
        className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent-300 to-transparent shadow-[0_0_30px_4px_rgba(56,189,248,0.7)] transition-all duration-500 ${
          opening ? "scale-x-150 opacity-0" : "scale-x-100 opacity-100"
        }`}
        style={{ width: `${pct}%`, left: `${(100 - pct) / 2}%` }}
      />

      <div
        className={`absolute inset-0 flex flex-col items-center justify-center px-6 transition-all duration-300 ${
          opening ? "scale-95 opacity-0 blur-sm" : "opacity-100"
        }`}
      >
        <div className="absolute h-96 w-96 rounded-full bg-accent-500/15 blur-[130px]" />

        <p className="relative mb-6 font-mono text-sm">
          <span className="text-slate-300">hugarsan@portfolio</span>
          <span className="text-accent-600">:~$</span>
          <span className="text-slate-400"> ./start --model hugo</span>
        </p>

        <h1 className="font-display relative text-6xl font-bold tracking-tighter text-slate-100 md:text-9xl">
          <Scramble text="hugarsan" delay={150} duration={1100} />
        </h1>

        <div className="relative mt-10 w-full max-w-md space-y-1 font-mono text-[11px] text-slate-500 md:text-xs">
          {BOOT_LINES.slice(0, lines).map(([verb, target]) => (
            <p key={target} className="flex animate-[fade-up_0.3s_ease_both] gap-2">
              <span className="text-accent-500">›</span>
              <span>{verb}</span>
              <span className="truncate text-slate-300">{target}</span>
              <span className="flex-1 overflow-hidden whitespace-nowrap text-slate-700">
                ................................................
              </span>
              <span className="text-emerald-400">ok</span>
            </p>
          ))}
        </div>

        <p className="relative mt-6 font-mono text-xs tabular-nums text-accent-300">{pct}%</p>
        <p className="absolute bottom-8 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
          pulsa cualquier tecla para saltar
        </p>
      </div>
    </div>
  );
}
