"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { forward, loadModel, preprocess, type Model } from "@/lib/mlp";

const DRAW = 280; // resolución interna del lienzo de dibujo
const STROKE = 20;
const VIS_H = 380;

type Point = [number, number];

// Trazos de la demo automática (coordenadas 0..1). Cada dígito es una lista de trazos.
const arc = (cx: number, cy: number, rx: number, ry: number, from: number, to: number, n = 26): Point[] =>
  Array.from({ length: n + 1 }, (_, i) => {
    const a = ((from + ((to - from) * i) / n) * Math.PI) / 180;
    return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
  });
const DEMO: Point[][][] = [
  [[...arc(0.48, 0.36, 0.15, 0.13, -160, 90), ...arc(0.48, 0.63, 0.17, 0.15, -90, 160)]],
  [[[0.3, 0.24], [0.7, 0.24], [0.46, 0.8]]],
  [[...arc(0.5, 0.4, 0.16, 0.15, -170, 40), [0.32, 0.78], [0.71, 0.78]]],
  [[...arc(0.5, 0.5, 0.17, 0.27, -90, 270, 36)]],
  [[[0.66, 0.24], [0.38, 0.24], [0.36, 0.47], ...arc(0.5, 0.61, 0.17, 0.16, -140, 135)]],
  [[[0.56, 0.22], [0.5, 0.78]], [[0.46, 0.33], [0.56, 0.22]]],
];

type Vis = {
  acts: Float32Array[] | null;
  lastChange: number;
  pulses: { edge: number; t: number; speed: number }[];
  edges: { x1: number; y1: number; x2: number; y2: number; s: number; tone: number }[];
};

const fmtPct = (v: number) => `${(v * 100).toLocaleString("es-ES", { maximumFractionDigits: 1, minimumFractionDigits: 1 })} %`;

export default function NeuralLab() {
  const rootRef = useRef<HTMLDivElement>(null);
  const drawRef = useRef<HTMLCanvasElement>(null);
  const visRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<Model | null>(null);
  const visState = useRef<Vis>({ acts: null, lastChange: 0, pulses: [], edges: [] });
  const drawing = useRef(false);
  const last = useRef<Point | null>(null);
  const userTook = useRef(false);
  const visible = useRef(false);
  const pending = useRef(false);

  const [model, setModel] = useState<Model | null>(null);
  const [failed, setFailed] = useState(false);
  const [probs, setProbs] = useState<Float32Array | null>(null);
  const [ms, setMs] = useState<number | null>(null);
  const [demo, setDemo] = useState(true);

  // --- Inferencia -------------------------------------------------------------------
  const infer = useCallback(() => {
    const m = modelRef.current;
    const c = drawRef.current;
    if (!m || !c) return;
    const t0 = performance.now();
    const input = preprocess(c);
    if (!input) {
      visState.current.acts = null;
      setProbs(null);
      setMs(null);
      return;
    }
    const acts = forward(m, input);
    const dt = performance.now() - t0;
    visState.current.acts = acts;
    visState.current.lastChange = performance.now();
    visState.current.edges = [];
    setProbs(acts[acts.length - 1]);
    setMs(dt);
  }, []);

  const scheduleInfer = useCallback(() => {
    if (pending.current) return;
    pending.current = true;
    requestAnimationFrame(() => {
      pending.current = false;
      infer();
    });
  }, [infer]);

  // --- Dibujo -----------------------------------------------------------------------
  const ctx2d = () => {
    const ctx = drawRef.current?.getContext("2d", { willReadFrequently: true }) ?? null;
    if (ctx) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = STROKE;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }
    return ctx;
  };

  const clear = useCallback(() => {
    const ctx = drawRef.current?.getContext("2d");
    ctx?.clearRect(0, 0, DRAW, DRAW);
    visState.current.acts = null;
    setProbs(null);
    setMs(null);
  }, []);

  const segment = (a: Point, b: Point) => {
    const ctx = ctx2d();
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
  };

  const toCanvas = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const r = e.currentTarget.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * DRAW, ((e.clientY - r.top) / r.height) * DRAW];
  };

  const takeOver = () => {
    if (!userTook.current) {
      userTook.current = true;
      setDemo(false);
      clear();
    }
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    takeOver();
    e.currentTarget.setPointerCapture(e.pointerId);
    drawing.current = true;
    const p = toCanvas(e);
    last.current = p;
    segment(p, p);
    scheduleInfer();
  };
  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !last.current) return;
    const p = toCanvas(e);
    segment(last.current, p);
    last.current = p;
    scheduleInfer();
  };
  const onUp = () => {
    drawing.current = false;
    last.current = null;
  };

  // --- Carga perezosa del modelo cuando la sección se acerca ---------------------------
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let loaded = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting && !loaded) {
          loaded = true;
          loadModel("/models/mnist-mlp.json")
            .then((m) => {
              modelRef.current = m;
              setModel(m);
            })
            .catch(() => setFailed(true));
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // --- Demo automática: dibuja dígitos hasta que el visitante toca el lienzo ----------
  useEffect(() => {
    if (!model) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    let timer = 0;
    let digit = 0;
    const wait = (ms: number) => new Promise<void>((r) => (timer = window.setTimeout(r, ms)));

    const run = async () => {
      while (!cancelled && !userTook.current) {
        if (!visible.current) {
          await wait(400);
          continue;
        }
        clear();
        const strokes = DEMO[digit % DEMO.length].map((s) => s.map(([x, y]) => [x * DRAW, y * DRAW] as Point));
        digit++;
        for (const stroke of strokes) {
          for (let i = 1; i < stroke.length && !cancelled && !userTook.current; i++) {
            // Subdivide cada tramo para que el trazo avance a velocidad constante.
            const [a, b] = [stroke[i - 1], stroke[i]];
            const steps = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 9));
            for (let s = 1; s <= steps && !userTook.current; s++) {
              const p0: Point = [a[0] + ((b[0] - a[0]) * (s - 1)) / steps, a[1] + ((b[1] - a[1]) * (s - 1)) / steps];
              const p1: Point = [a[0] + ((b[0] - a[0]) * s) / steps, a[1] + ((b[1] - a[1]) * s) / steps];
              segment(p0, p1);
              if (!reduce) {
                infer();
                await wait(16);
              }
            }
          }
        }
        if (cancelled || userTook.current) break;
        infer();
        await wait(2600);
      }
    };
    run();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
    // segment/ctx2d solo usan refs; no hace falta re-lanzar la demo por ellos.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [model, clear, infer]);

  // --- Visualización de la red ---------------------------------------------------------
  useEffect(() => {
    const canvas = visRef.current;
    if (!canvas || !model) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let W = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      W = canvas.clientWidth;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(VIS_H * dpr);
      visState.current.edges = [];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const sizes = model.sizes;
    const layout = () => {
      const img = Math.min(112, W * 0.22);
      const outLabel = 92;
      const x0 = img + 18;
      const xs = [img / 2, x0 + (W - outLabel - x0) * 0.18, x0 + (W - outLabel - x0) * 0.6, W - outLabel];
      const ys = sizes.map((n, li) => {
        if (li === 0) return [];
        const top = 22, bottom = VIS_H - 22;
        const gap = (bottom - top) / (n - 1);
        return Array.from({ length: n }, (_, i) => top + gap * i);
      });
      return { img, xs, ys };
    };

    // Conexiones más influyentes: |activación de origen × peso| de las neuronas más activas.
    const buildEdges = (acts: Float32Array[]) => {
      const { img, xs, ys } = layout();
      const edges: Vis["edges"] = [];
      const imgTop = VIS_H / 2 - img / 2;
      const top = (arr: Float32Array, k: number) =>
        Array.from(arr, (v, i) => [v, i] as const)
          .sort((a, b) => b[0] - a[0])
          .slice(0, k)
          .filter(([v]) => v > 0)
          .map(([, i]) => i);

      // Entrada → capa 1: desde el centro de masas de los píxeles que más empujan a cada neurona.
      const L1 = model.layers[0];
      const maxA1 = Math.max(...acts[1], 1e-6);
      for (const j of top(acts[1], 14)) {
        let sx = 0, sy = 0, sw = 0;
        for (let i = 0; i < 784; i++) {
          const c = acts[0][i] * L1.w[i * L1.outDim + j];
          if (c > 0) {
            sx += c * (i % 28);
            sy += c * Math.floor(i / 28);
            sw += c;
          }
        }
        if (sw === 0) continue;
        edges.push({
          x1: xs[0] - img / 2 + ((sx / sw + 0.5) / 28) * img,
          y1: imgTop + ((sy / sw + 0.5) / 28) * img,
          x2: xs[1], y2: ys[1][j], s: acts[1][j] / maxA1, tone: 0,
        });
      }
      for (let li = 1; li < 3; li++) {
        const L = model.layers[li];
        const targets = li === 2 ? top(acts[3], 3) : top(acts[li + 1], 10);
        const contrib: { i: number; j: number; c: number }[] = [];
        for (const j of targets) {
          for (let i = 0; i < L.inDim; i++) {
            const c = acts[li][i] * L.w[i * L.outDim + j];
            if (c > 0) contrib.push({ i, j, c });
          }
        }
        contrib.sort((a, b) => b.c - a.c);
        const keep = contrib.slice(0, li === 2 ? 14 : 28);
        const maxC = keep[0]?.c ?? 1;
        for (const { i, j, c } of keep) {
          edges.push({ x1: xs[li], y1: ys[li][i], x2: xs[li + 1], y2: ys[li + 1][j], s: c / maxC, tone: li });
        }
      }
      return edges;
    };

    const tones = ["56,189,248", "139,92,246", "52,211,153"];

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible.current) return;
      const st = visState.current;
      const { img, xs, ys } = layout();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, VIS_H);
      const acts = st.acts;
      if (acts && st.edges.length === 0) {
        st.edges = buildEdges(acts);
        st.pulses = [];
      }
      const fresh = acts ? Math.max(0, 1 - (now - st.lastChange) / 2500) : 0;

      // Rejilla tenue de conexiones (siempre), para que se lea como una red aunque no haya dibujo.
      ctx.lineWidth = 1;
      for (let li = 1; li < 3; li++) {
        ctx.strokeStyle = "rgba(148,163,184,0.035)";
        ctx.beginPath();
        for (let a = 0; a < ys[li].length; a += 3)
          for (let b = 0; b < ys[li + 1].length; b += 2) {
            ctx.moveTo(xs[li], ys[li][a]);
            ctx.lineTo(xs[li + 1], ys[li + 1][b]);
          }
        ctx.stroke();
      }

      // Conexiones activas.
      if (acts) {
        st.edges.forEach((e) => {
          const g = ctx.createLinearGradient(e.x1, e.y1, e.x2, e.y2);
          g.addColorStop(0, `rgba(${tones[e.tone]},${0.08 + 0.4 * e.s})`);
          g.addColorStop(1, `rgba(${tones[Math.min(e.tone + 1, 2)]},${0.08 + 0.5 * e.s})`);
          ctx.strokeStyle = g;
          ctx.lineWidth = 0.6 + 1.6 * e.s;
          ctx.beginPath();
          ctx.moveTo(e.x1, e.y1);
          ctx.lineTo(e.x2, e.y2);
          ctx.stroke();
        });
        // Impulsos que viajan por las conexiones.
        if (!reduce && st.edges.length) {
          const want = Math.round(10 + 40 * fresh);
          while (st.pulses.length < want) {
            const edge = Math.floor(Math.random() * st.edges.length);
            st.pulses.push({ edge, t: 0, speed: 0.008 + Math.random() * 0.014 });
          }
          st.pulses = st.pulses.filter((p) => p.t <= 1);
          st.pulses.forEach((p) => {
            p.t += p.speed;
            const e = st.edges[p.edge];
            if (!e) return;
            const x = e.x1 + (e.x2 - e.x1) * p.t;
            const y = e.y1 + (e.y2 - e.y1) * p.t;
            ctx.fillStyle = `rgba(${tones[Math.min(e.tone + 1, 2)]},${0.35 + 0.6 * e.s})`;
            ctx.beginPath();
            ctx.arc(x, y, 1.2 + 1.4 * e.s, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }

      // Entrada: lo que ve la red (28×28).
      const imgTop = VIS_H / 2 - img / 2;
      const cell = img / 28;
      ctx.fillStyle = "rgba(6,13,31,0.9)";
      ctx.fillRect(xs[0] - img / 2, imgTop, img, img);
      if (acts) {
        for (let i = 0; i < 784; i++) {
          const v = acts[0][i];
          if (v < 0.04) continue;
          ctx.fillStyle = `rgba(125,211,252,${v})`;
          ctx.fillRect(xs[0] - img / 2 + (i % 28) * cell, imgTop + Math.floor(i / 28) * cell, cell + 0.3, cell + 0.3);
        }
      }
      ctx.strokeStyle = "rgba(56,189,248,0.35)";
      ctx.lineWidth = 1;
      ctx.strokeRect(xs[0] - img / 2 + 0.5, imgTop + 0.5, img - 1, img - 1);
      ctx.font = "10px var(--font-jetbrains-mono), monospace";
      ctx.fillStyle = "rgba(148,163,184,0.7)";
      ctx.textAlign = "center";
      ctx.fillText("entrada 28×28", xs[0], imgTop + img + 16);

      // Neuronas.
      for (let li = 1; li < 4; li++) {
        const a = acts?.[li];
        const max = a ? Math.max(...a, 1e-6) : 1;
        const r = li === 3 ? 7 : li === 2 ? 3.6 : 2.6;
        ys[li].forEach((y, i) => {
          const v = a ? a[i] / max : 0;
          const tone = tones[li === 3 ? 2 : li === 2 ? 1 : 0];
          if (v > 0.05) {
            ctx.fillStyle = `rgba(${tone},${0.15 * v})`;
            ctx.beginPath();
            ctx.arc(xs[li], y, r * (2.2 + 1.2 * fresh * v), 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = v > 0.05 ? `rgba(${tone},${0.35 + 0.65 * v})` : "rgba(51,65,85,0.7)";
          ctx.beginPath();
          ctx.arc(xs[li], y, r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      // Salida: dígito y barra de probabilidad.
      const out = acts?.[3];
      const best = out ? out.indexOf(Math.max(...out)) : -1;
      ys[3].forEach((y, d) => {
        const p = out ? out[d] : 0;
        const isBest = d === best;
        ctx.textAlign = "left";
        ctx.font = `${isBest ? "bold " : ""}13px var(--font-jetbrains-mono), monospace`;
        ctx.fillStyle = isBest ? "rgb(110,231,183)" : "rgba(148,163,184,0.75)";
        ctx.fillText(String(d), xs[3] + 14, y + 4.5);
        ctx.fillStyle = "rgba(30,41,59,0.8)";
        ctx.fillRect(xs[3] + 28, y - 2, 56, 4);
        ctx.fillStyle = isBest ? "rgb(52,211,153)" : "rgba(56,189,248,0.7)";
        ctx.fillRect(xs[3] + 28, y - 2, 56 * p, 4);
      });

      ctx.textAlign = "center";
      ctx.font = "10px var(--font-jetbrains-mono), monospace";
      ctx.fillStyle = "rgba(148,163,184,0.6)";
      const narrow = W < 520;
      (narrow
        ? [String(sizes[1]), String(sizes[2]), "softmax"]
        : [`oculta 1 · ${sizes[1]}`, `oculta 2 · ${sizes[2]}`, "softmax · 10"]
      ).forEach((t, i) => {
        ctx.fillText(t, xs[i + 1] + (i === 2 ? 40 : 0), VIS_H - 4);
      });
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [model]);

  const best = probs ? probs.indexOf(Math.max(...probs)) : null;
  const confidence = probs && best !== null ? probs[best] : null;

  return (
    <div ref={rootRef} className="grid gap-6 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      {/* Lienzo de dibujo */}
      <div className="border-beam rounded-3xl">
        <div className="flex h-full flex-col rounded-3xl bg-midnight-900/85 p-5 backdrop-blur">
          <div className="mb-3 flex items-center justify-between font-mono text-xs">
            <span className="text-slate-400">input.canvas</span>
            <span className={`flex items-center gap-1.5 ${demo ? "text-violet-300" : "text-emerald-300"}`}>
              <span className={`badge-dot inline-block h-1.5 w-1.5 rounded-full ${demo ? "bg-violet-400" : "bg-emerald-400"}`} />
              {demo ? "demo automática" : "tu turno"}
            </span>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-2xl border border-midnight-600 bg-midnight-950">
            <div className="grid-overlay pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <canvas
              ref={drawRef}
              width={DRAW}
              height={DRAW}
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              aria-label="Lienzo para dibujar un número del 0 al 9"
              className="relative h-full w-full cursor-crosshair touch-none"
            />
            {demo && model && (
              <p className="pointer-events-none absolute inset-x-0 bottom-2 text-center font-mono text-[11px] text-slate-500">
                dibuja aquí para tomar el control
              </p>
            )}
            {!model && (
              <p className="absolute inset-0 grid place-items-center font-mono text-xs text-slate-500">
                {failed ? "no se pudo cargar el modelo" : "cargando pesos…"}
              </p>
            )}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => {
                takeOver();
                clear();
              }}
              className="flex-1 rounded-xl border border-midnight-600 bg-midnight-950/60 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-accent-500/50 hover:text-accent-300"
            >
              Borrar
            </button>
          </div>

          <div className="mt-5 flex items-end justify-between rounded-2xl border border-midnight-700/80 bg-midnight-950/60 px-4 py-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">predicción</p>
              <p className="font-display text-5xl font-bold leading-none text-emerald-300 drop-shadow-[0_0_24px_rgba(52,211,153,0.45)]">
                {best ?? "–"}
              </p>
            </div>
            <div className="text-right font-mono text-xs leading-5">
              <p className="text-slate-400">
                confianza <span className="text-slate-100">{confidence !== null ? fmtPct(confidence) : "–"}</span>
              </p>
              <p className="text-slate-400">
                inferencia{" "}
                <span className="text-slate-100">
                  {ms !== null ? `${ms.toLocaleString("es-ES", { maximumFractionDigits: 1, minimumFractionDigits: 1 })} ms` : "–"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Red en directo */}
      <div className="flex min-w-0 flex-col rounded-3xl border border-midnight-700/80 bg-midnight-900/60 p-5 backdrop-blur">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
          <span className="text-slate-400">
            mlp.forward<span className="text-slate-600">(x)</span>
          </span>
          <span className="text-slate-500">ReLU · softmax · inferencia 100 % en tu navegador</span>
        </div>
        <canvas ref={visRef} style={{ height: VIS_H }} className="w-full" aria-hidden="true" />
        <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-midnight-700/70 bg-midnight-700/70 sm:grid-cols-4">
          {[
            ["precisión test", model ? fmtPct(model.testAccuracy) : "–"],
            ["parámetros", model ? model.params.toLocaleString("es-ES") : "–"],
            ["pesos", model ? model.quantization : "–"],
            ["framework", "numpy a mano"],
          ].map(([k, v]) => (
            <div key={k} className="bg-midnight-950/80 px-4 py-3">
              <dt className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{k}</dt>
              <dd className="gradient-text font-display mt-1 text-lg font-bold">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
