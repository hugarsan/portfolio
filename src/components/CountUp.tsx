"use client";

import { useEffect, useRef, useState } from "react";

// Cuenta desde 0 hasta el valor la primera vez que entra en pantalla.
// Respeta el formato del texto original ("90,64%", "60K+", "8,19").
export default function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(match ? value.replace(match[2], match[2].replace(/\d/g, "0")) : value);

  useEffect(() => {
    if (!match || !ref.current) return;
    const [, prefix, num, suffix] = match;
    const decimals = (num.split(/[.,]/)[1] ?? "").length;
    const sep = num.includes(",") ? "," : ".";
    const target = parseFloat(num.replace(",", "."));
    let raf = 0;

    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown(`${prefix}${(target * eased).toFixed(decimals).replace(".", sep)}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        run();
      }
    });
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {shown}
    </span>
  );
}
