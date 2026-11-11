"use client";

import { Fragment, useEffect, useRef, useState } from "react";

const STEPS = 50;
const DURATION = 2200; // ms de la generación completa
const PAD = 48; // margen del lienzo alrededor del título, para el ruido que se sale
const INTRO_FALLBACK = 1900;

type Line = { text: string; className?: string };

type P = {
  tx: number; ty: number; // posición final (píxel del texto)
  nx: number; ny: number; // ruido inicial fijo (como en un sampler determinista)
  dx: number; dy: number; // ruido inyectado con el cursor
  c: string;
};

const gauss = () => {
  const u = 1 - Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
};

const lerpColor = (stops: [number, number[]][], t: number) => {
  for (let i = 1; i < stops.length; i++) {
    const [p1, c1] = stops[i];
    const [p0, c0] = stops[i - 1];
    if (t <= p1) {
      const k = (t - p0) / (p1 - p0 || 1);
      return `rgb(${c0.map((v, j) => Math.round(v + (c1[j] - v) * k)).join(",")})`;
    }
  }
  return `rgb(${stops[stops.length - 1][1].join(",")})`;
};

// Mismos colores que .gradient-letter (globals.css).
const GRADIENT: [number, number[]][] = [
  [0, [125, 211, 252]],
  [0.4, [56, 189, 248]],
  [1, [167, 139, 250]],
];

/**
 * Título que se «genera» como en un modelo de difusión: cada píxel del texto parte de
 * ruido gaussiano y se va desruidando en 50 pasos. Al pasar el ratón se le inyecta
 * ruido y vuelve a converger. El texto real del <h1> está siempre en el DOM.
 */
export default function DiffusionName({ lines, className = "" }: { lines: Line[]; className?: string }) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const parts = useRef<P[]>([]);
  const pointer = useRef<{ x: number; y: number; t: number } | null>(null);
  const wake = useRef<() => void>(() => {});

  const [textOn, setTextOn] = useState(false);
  const [readout, setReadout] = useState("");
  const [hoverable, setHoverable] = useState(false);

  useEffect(() => {
    const h1 = h1Ref.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!h1 || !canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let raf = 0;
    let timer = 0;
    let start = 0;
    let phase: "idle" | "gen" | "done" = "idle";
    let lastStep = -1;
    let lastActive = 0;
    let W = 0, H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Muestrea los píxeles del texto tal y como lo pinta el navegador (misma fuente y posición).
    const sample = () => {
      const r = h1.getBoundingClientRect();
      W = Math.ceil(r.width + PAD * 2);
      H = Math.ceil(r.height + PAD * 2);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return [];
      const spans: { x0: number; x1: number; y0: number; y1: number; grad: boolean }[] = [];
      lineRefs.current.forEach((span, i) => {
        if (!span) return;
        const s = getComputedStyle(span);
        const sr = span.getBoundingClientRect();
        o.font = `${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
        if ("letterSpacing" in o) (o as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = s.letterSpacing;
        o.textBaseline = "alphabetic";
        const m = o.measureText(lines[i].text);
        const lineH = parseFloat(s.lineHeight) || sr.height;
        const asc = m.fontBoundingBoxAscent, desc = m.fontBoundingBoxDescent;
        const baseline = sr.top - r.top + PAD + (lineH - (asc + desc)) / 2 + asc;
        const x = sr.left - r.left + PAD;
        o.fillStyle = "#fff";
        o.fillText(lines[i].text, x, baseline);
        spans.push({ x0: x, x1: x + m.width, y0: sr.top - r.top + PAD, y1: sr.bottom - r.top + PAD, grad: i > 0 });
      });
      const data = o.getImageData(0, 0, W, H).data;
      let filled = 0;
      for (let i = 3; i < data.length; i += 4) if (data[i] > 128) filled++;
      const step = Math.max(2, Math.round(Math.sqrt(filled / 7000)));
      const spread = Math.max(W, H) * 0.32;
      const out: P[] = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          if (data[(y * W + x) * 4 + 3] <= 128) continue;
          const sp = spans.find((s) => y >= s.y0 && y <= s.y1) ?? spans[0];
          const c = sp?.grad ? lerpColor(GRADIENT, (x - sp.x0) / (sp.x1 - sp.x0 || 1)) : "rgb(241,245,249)";
          out.push({ tx: x, ty: y, nx: gauss() * spread, ny: gauss() * spread * 0.6, dx: 0, dy: 0, c });
        }
      }
      return out;
    };

    const size = () => Math.max(1.6, Math.min(3, Math.sqrt(W * H / Math.max(parts.current.length, 1)) * 0.55));

    const draw = (sigma: number, jitter: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const s = size();
      let color = "";
      for (const p of parts.current) {
        if (p.c !== color) ctx.fillStyle = color = p.c;
        const x = p.tx + p.nx * sigma + p.dx + (jitter ? gauss() * jitter : 0);
        const y = p.ty + p.ny * sigma + p.dy + (jitter ? gauss() * jitter : 0);
        ctx.fillRect(x, y, s, s);
      }
    };

    const frame = (now: number) => {
      raf = 0;
      if (phase === "gen") {
        const t = Math.min(1, (now - start) / DURATION);
        const k = Math.min(STEPS, Math.floor(t * STEPS));
        // Calendario de ruido: cae rápido al principio y afina al final, como un sampler.
        const sigma = Math.pow(1 - k / STEPS, 2.4);
        ctx.globalAlpha = 0.55 + 0.45 * (k / STEPS);
        draw(sigma, sigma * 6);
        if (k !== lastStep) {
          lastStep = k;
          setReadout(`difusión · paso ${k}/${STEPS} · σ ${sigma.toFixed(2)}`);
        }
        if (t >= 1) {
          phase = "done";
          ctx.globalAlpha = 1;
          setTextOn(true);
          setReadout(`generado en ${STEPS} pasos ✓`);
          return;
        }
        raf = requestAnimationFrame(frame);
        return;
      }
      if (phase === "done") {
        let energy = 0;
        const ptr = pointer.current;
        for (const p of parts.current) {
          if (ptr && now - ptr.t < 60) {
            const ddx = p.tx + p.dx - ptr.x, ddy = p.ty + p.dy - ptr.y;
            const d2 = ddx * ddx + ddy * ddy;
            if (d2 < 75 * 75) {
              const f = 1 - Math.sqrt(d2) / 75;
              p.dx += gauss() * 9 * f;
              p.dy += gauss() * 9 * f;
            }
          }
          p.dx *= 0.9;
          p.dy *= 0.9;
          energy = Math.max(energy, Math.abs(p.dx) + Math.abs(p.dy));
        }
        ctx.globalAlpha = 1;
        draw(0, 0);
        if (energy > 0.4 || (ptr && now - ptr.t < 60)) {
          lastActive = now;
          setReadout(`ruido inyectado · σ ${Math.min(1, energy / 40).toFixed(2)} → desruidando`);
          raf = requestAnimationFrame(frame);
        } else if (now - lastActive < 350) {
          raf = requestAnimationFrame(frame);
        } else {
          setTextOn(true);
          setReadout(`generado en ${STEPS} pasos ✓`);
        }
      }
    };

    wake.current = () => {
      if (phase !== "done") return;
      setTextOn(false);
      if (!raf) raf = requestAnimationFrame(frame);
    };

    if (reduce) {
      const id = requestAnimationFrame(() => setTextOn(true));
      return () => cancelAnimationFrame(id);
    }

    const intro = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--intro-delay"));
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      timer = window.setTimeout(() => {
        parts.current = sample();
        if (!parts.current.length) {
          setTextOn(true);
          return;
        }
        setHoverable(canHover);
        phase = "gen";
        start = performance.now();
        raf = requestAnimationFrame(frame);
      }, 100 + (Number.isNaN(intro) ? INTRO_FALLBACK : intro));
    });

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      if (phase !== "done") return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        parts.current = sample();
        draw(0, 0);
      }, 150);
    });
    ro.observe(h1);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [lines]);

  const onMove = (e: React.PointerEvent<HTMLHeadingElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    pointer.current = { x: e.clientX - r.left + PAD, y: e.clientY - r.top + PAD, t: performance.now() };
    wake.current();
  };

  return (
    <div className="relative">
      <h1 ref={h1Ref} onPointerMove={onMove} className={`relative ${className}`}>
        {lines.map((line, i) => (
          <Fragment key={line.text}>
            {i > 0 && " "}
            <span
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className={`block transition-opacity duration-200 ${line.className ?? ""}`}
              style={{ opacity: textOn ? 1 : 0 }}
            >
              {line.text}
            </span>
          </Fragment>
        ))}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute transition-opacity duration-200"
          style={{ left: -PAD, top: -PAD, opacity: textOn ? 0 : 1 }}
        />
      </h1>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-5 left-1 whitespace-nowrap font-mono text-[11px] font-normal tracking-normal text-slate-500"
      >
        {readout}
        {hoverable && readout.endsWith("✓") && <span className="text-slate-600"> · pasa el ratón para añadir ruido</span>}
      </span>
    </div>
  );
}
