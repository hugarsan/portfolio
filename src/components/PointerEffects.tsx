"use client";

import { useEffect, useRef } from "react";

// Halo que sigue al cursor, foco de las tarjetas .spotlight y barra de progreso de scroll.
export default function PointerEffects() {
  const glowRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;

    const paint = () => {
      frame = 0;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      document.documentElement.style.setProperty("--px", `${e.pageX}px`);
      document.documentElement.style.setProperty("--py", `${e.pageY}px`);
      if (!frame) frame = requestAnimationFrame(paint);

      const card = (e.target as Element | null)?.closest?.(".spotlight") as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      }
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };

    paint();
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={barRef}
        className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-accent-400 via-violet-400 to-accent-300"
        aria-hidden="true"
      />
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 -z-10 hidden h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.07),transparent_65%)] md:block"
        aria-hidden="true"
      />
    </>
  );
}
