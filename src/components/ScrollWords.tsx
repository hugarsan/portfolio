"use client";

import { useEffect, useRef, useState } from "react";

// Texto cuyas palabras se van encendiendo a medida que se hace scroll sobre él.
// `highlight` marca palabras que, una vez encendidas, llevan el degradado de acento.
export default function ScrollWords({ text, highlight = [], className = "" }: { text: string; highlight?: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const [lit, setLit] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setLit(words.length));
      return () => cancelAnimationFrame(raf);
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Empieza cuando el texto entra por abajo y termina cuando su final pasa por el 45 % de la pantalla.
      const progress = (vh * 0.9 - rect.top) / (rect.height + vh * 0.45);
      setLit(Math.round(Math.min(1, Math.max(0, progress)) * words.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [words.length]);

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => {
          const on = i < lit;
          const accent = highlight.some((h) => word.toLowerCase().startsWith(h.toLowerCase()));
          return (
            <span
              key={i}
              className={`transition-colors duration-500 ${on ? (accent ? "gradient-text" : "text-slate-100") : "text-slate-700"}`}
            >
              {word}{" "}
            </span>
          );
        })}
      </span>
    </p>
  );
}
