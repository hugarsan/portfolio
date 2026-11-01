"use client";

import { useEffect, useMemo, useState } from "react";
import { aiCore, aiCoreNodes, chat, type AICoreNode } from "@/lib/data";
import { getAnswer } from "@/lib/chatbot";

// Lienzo lógico 160×120 (4:3); el contenedor tiene la misma proporción, así que los círculos no se deforman.
const W = 160;
const H = 120;
const CORE = { x: 80, y: 60 };

type Placed = AICoreNode & { x: number; y: number };

const PROJECT_ANGLES: Record<string, number> = { detectia: -67.5, rutas: 22.5, viterbi: 67.5 };

const hubs = aiCoreNodes.filter((n) => n.kind !== "project");
const placed: Placed[] = aiCoreNodes.map((n) => {
  if (n.kind === "project") {
    const a = ((PROJECT_ANGLES[n.id] ?? 0) * Math.PI) / 180;
    return { ...n, x: CORE.x + Math.cos(a) * 66, y: CORE.y + Math.sin(a) * 50 };
  }
  const a = (hubs.indexOf(n) / hubs.length) * Math.PI * 2 - Math.PI / 2;
  return { ...n, x: CORE.x + Math.cos(a) * 50, y: CORE.y + Math.sin(a) * 40 };
});
const byId = Object.fromEntries(placed.map((n) => [n.id, n]));

type Edge = { from: Placed | typeof CORE; to: Placed | typeof CORE; ids: string[] };

const edges: Edge[] = [
  ...placed.filter((n) => n.kind !== "project").map((n) => ({ from: n, to: CORE, ids: [n.id] })),
  ...placed.flatMap((n) => (n.links ?? []).map((l) => ({ from: n, to: byId[l], ids: [n.id, l] }))),
];

// Estrellas de fondo con posiciones pseudoaleatorias pero estables entre renders.
const stars = Array.from({ length: 70 }, (_, i) => {
  const r = (k: number) => ((Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { x: r(1) * W, y: r(2) * H, s: r(3) * 0.35 + 0.1, o: r(4) * 0.5 + 0.15 };
});

const neighbours = (id: string) => {
  const set = new Set<string>([id]);
  edges.forEach((e) => {
    if (e.ids.includes(id)) e.ids.forEach((x) => set.add(x));
  });
  if (id === "projects-hub") placed.filter((n) => n.kind === "project").forEach((n) => set.add(n.id));
  return set;
};

const KIND_LABEL = { now: "Ahora", hub: "Área", project: "Proyecto" } as const;

export default function NeuralNebula() {
  const [selected, setSelected] = useState("stormbringer");
  const [hovered, setHovered] = useState<string | null>(null);
  const [motionOk, setMotionOk] = useState(false);
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [typed, setTyped] = useState(0);

  const active = hovered ?? selected;
  const lit = useMemo(() => neighbours(active), [active]);
  const node = byId[selected];

  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  // Escribe la respuesta carácter a carácter.
  useEffect(() => {
    if (typed >= answer.length) return;
    const t = window.setTimeout(() => setTyped((n) => Math.min(answer.length, n + 3)), 12);
    return () => window.clearTimeout(t);
  }, [typed, answer]);

  const ask = (q: string) => {
    const text = q.trim();
    if (!text) return;
    setAsked(text);
    setAnswer(getAnswer(text));
    setTyped(motionOk ? 0 : Number.MAX_SAFE_INTEGER);
    setQuestion("");
  };

  const select = (id: string) => setSelected(id);

  return (
    <div className="grid gap-5 lg:grid-cols-[1.45fr_1fr]">
      {/* Constelación (desde md) */}
      <div className="relative hidden overflow-hidden rounded-3xl border border-midnight-600/60 bg-midnight-950/70 md:block">
        <div
          role="group"
          aria-label={aiCore.canvasLabel}
          className="relative aspect-[4/3] w-full"
          onMouseLeave={() => setHovered(null)}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            <defs>
              <radialGradient id="nebula-core">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nebula-cloud-a">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="nebula-cloud-b">
                <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
              </radialGradient>
            </defs>

            <ellipse cx="45" cy="40" rx="55" ry="40" fill="url(#nebula-cloud-a)" />
            <ellipse cx="120" cy="85" rx="55" ry="38" fill="url(#nebula-cloud-b)" />
            {stars.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.s} fill="#cbd5e1" opacity={s.o} />
            ))}

            <ellipse cx={CORE.x} cy={CORE.y} rx="50" ry="40" fill="none" stroke="rgba(148,163,184,0.12)" strokeWidth="0.2" strokeDasharray="0.6 1.4" />
            <ellipse cx={CORE.x} cy={CORE.y} rx="66" ry="50" fill="none" stroke="rgba(148,163,184,0.06)" strokeWidth="0.2" />
            <circle cx={CORE.x} cy={CORE.y} r="26" fill="url(#nebula-core)" />

            {edges.map((e, i) => {
              const on = e.ids.every((id) => lit.has(id)) && e.ids.includes(active);
              const path = `M ${e.from.x} ${e.from.y} L ${e.to.x} ${e.to.y}`;
              return (
                <g key={i}>
                  <path
                    d={path}
                    stroke={on ? "#7dd3fc" : "rgba(125,211,252,0.18)"}
                    strokeWidth={on ? 0.45 : 0.22}
                    fill="none"
                    className="transition-all duration-500"
                  />
                  {motionOk && (
                    <circle r={on ? 0.9 : 0.55} fill={on ? "#e0f2fe" : "#7dd3fc"} opacity={on ? 1 : 0.55}>
                      <animateMotion dur={`${on ? 1.4 : 3 + (i % 4) * 0.7}s`} begin={`${(i * 0.37) % 2}s`} repeatCount="indefinite" path={path} />
                    </circle>
                  )}
                </g>
              );
            })}

            {motionOk &&
              [0, 1, 2].map((k) => (
                <circle key={k} cx={CORE.x} cy={CORE.y} r="9" fill="none" stroke="#38bdf8" strokeWidth="0.25">
                  <animate attributeName="r" from="9" to="24" dur="3s" begin={`${k}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.6" to="0" dur="3s" begin={`${k}s`} repeatCount="indefinite" />
                </circle>
              ))}
          </svg>

          <div
            className="absolute z-10 flex h-[19%] w-[14.25%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent-400/60 bg-midnight-950/85 shadow-[0_0_60px_-4px_rgba(56,189,248,0.7)] backdrop-blur"
            style={{ left: "50%", top: "50%" }}
          >
            <span className="gradient-text font-display text-base font-black tracking-tight xl:text-lg">{aiCore.coreLabel}</span>
            <span className="font-mono text-[8px] text-slate-500">{aiCore.coreSubtext}</span>
          </div>

          {placed.map((n) => {
            const isActive = n.id === active;
            const isSelected = n.id === selected;
            const dim = !lit.has(n.id);
            const tone =
              n.kind === "now"
                ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200"
                : n.kind === "project"
                  ? "border-violet-400/50 bg-violet-500/10 text-violet-200"
                  : "border-accent-400/40 bg-midnight-900/85 text-slate-200";
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => select(n.id)}
                onMouseEnter={() => setHovered(n.id)}
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered(null)}
                aria-pressed={isSelected}
                aria-label={`${n.label}: ${n.areas.join(", ")}`}
                className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 font-mono text-[10px] font-semibold tracking-[0.12em] backdrop-blur transition-all duration-300 xl:text-[11px] ${tone} ${
                  isActive ? "scale-110 shadow-[0_0_28px_-2px_rgba(56,189,248,0.75)]" : ""
                } ${isSelected ? "ring-2 ring-accent-300/70 ring-offset-2 ring-offset-midnight-950" : ""} ${
                  dim ? "opacity-35" : "opacity-100"
                }`}
                style={{ left: `${(n.x / W) * 100}%`, top: `${(n.y / H) * 100}%` }}
              >
                {n.kind === "now" && <span className="badge-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                {n.label}
              </button>
            );
          })}

          <p className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] text-slate-600">
            {placed.length} nodos · {edges.length} conexiones
          </p>
        </div>
      </div>

      {/* Móvil: nodos como chips */}
      <div className="flex flex-wrap gap-2 md:hidden">
        {placed.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => select(n.id)}
            aria-pressed={n.id === selected}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] font-semibold tracking-wider transition-colors ${
              n.id === selected
                ? "border-accent-300 bg-accent-500/20 text-accent-100"
                : n.kind === "now"
                  ? "border-emerald-400/40 text-emerald-200"
                  : n.kind === "project"
                    ? "border-violet-400/40 text-violet-200"
                    : "border-midnight-600 text-slate-300"
            }`}
          >
            {n.label}
          </button>
        ))}
      </div>

      {/* Panel lateral: detalle del nodo + preguntar a Hugo AI */}
      <div className="flex min-w-0 flex-col gap-5">
        <div key={node.id} className="spotlight animate-[fade-up_0.4s_ease_both] rounded-3xl border border-midnight-600/60 bg-midnight-800/40 p-6">
          <div className="flex items-center justify-between gap-3">
            <span
              className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest ${
                node.kind === "now"
                  ? "bg-emerald-400/15 text-emerald-300"
                  : node.kind === "project"
                    ? "bg-violet-400/15 text-violet-300"
                    : "bg-accent-400/15 text-accent-300"
              }`}
            >
              {KIND_LABEL[node.kind]}
            </span>
            <span className="font-mono text-[10px] text-slate-600">
              {neighbours(node.id).size - 1} conexiones
            </span>
          </div>
          <h3 className="font-display mt-4 text-2xl font-bold tracking-tight text-slate-100">{node.label}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">{node.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {node.areas.map((a) => (
              <span key={a} className="rounded-md border border-midnight-600 bg-midnight-900/70 px-2.5 py-1 font-mono text-xs text-slate-300">
                {a}
              </span>
            ))}
          </div>
          <a href={node.href} className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-accent-300 transition-colors hover:text-accent-200">
            Ver en la web <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="border-beam flex flex-1 flex-col rounded-3xl bg-midnight-900/80">
          <div className="flex items-center gap-2 border-b border-midnight-700/80 px-5 py-3 font-mono text-xs">
            <span className="badge-dot h-2 w-2 rounded-full bg-accent-400" />
            <span className="text-slate-200">{chat.name}</span>
            <span className="text-slate-600">› pregúntame</span>
          </div>
          <div className="min-h-[9rem] flex-1 px-5 py-4 font-mono text-[12.5px] leading-6" aria-live="polite">
            {asked ? (
              <>
                <p className="text-slate-500">
                  <span className="text-emerald-400">›</span> {asked}
                </p>
                <p className="mt-2 max-h-56 overflow-y-auto whitespace-pre-line text-slate-300">
                  {answer.slice(0, typed)}
                  {typed < answer.length && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent-400" />}
                </p>
              </>
            ) : (
              <p className="whitespace-pre-line text-slate-400">{chat.greeting}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2 px-5 pb-3">
            {chat.suggestions.slice(0, 4).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="rounded-full border border-midnight-600 px-3 py-1 text-[11px] text-slate-400 transition-colors hover:border-accent-500/50 hover:text-accent-300"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex items-center gap-2 border-t border-midnight-700/80 px-4 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              ask(question);
            }}
          >
            <span className="font-mono text-accent-400">›</span>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Escribe una pregunta…"
              aria-label="Pregunta a Hugo AI"
              maxLength={200}
              className="min-w-0 flex-1 bg-transparent font-mono text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none"
            />
            <button type="submit" className="rounded-lg bg-accent-500/15 px-3 py-1.5 font-mono text-xs text-accent-300 transition-colors hover:bg-accent-500/25">
              Enviar ↵
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
