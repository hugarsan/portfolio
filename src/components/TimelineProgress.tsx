"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Contenedor de la línea de tiempo: expone en --progress (0–1) cuánto se ha recorrido
// con el scroll, para que la línea se vaya rellenando a medida que se lee.
export default function TimelineProgress({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      el.style.setProperty("--progress", progress.toFixed(4));
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
  }, []);

  return (
    <div ref={ref} className={`relative [--progress:0] ${className}`}>
      {children}
    </div>
  );
}
