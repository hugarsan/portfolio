import type { CSSProperties, ReactNode } from "react";
import type { Project } from "@/lib/data";

// Ilustraciones de cada proyecto. Son esquemas de cómo funciona, no resultados reales:
// por eso llevan la etiqueta «ilustración».

function Frame({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="relative flex h-full min-h-[16rem] min-w-0 flex-col overflow-hidden rounded-2xl border border-midnight-600/70 bg-midnight-950/80">
      <div className="flex items-center gap-2 border-b border-midnight-700/80 px-4 py-2.5 font-mono text-[11px] text-slate-500">
        <span className="h-2 w-2 rounded-full bg-rose-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-300/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
        <span className="ml-2 min-w-0 truncate">{title}</span>
        <span className="ml-auto shrink-0 text-slate-700">ilustración</span>
      </div>
      <div className="grid-overlay relative flex-1 p-4 sm:p-5">{children}</div>
    </div>
  );
}

const TOKENS = [
  { word: "«exclusiva»", w: 82, fake: true },
  { word: "«urgente»", w: 64, fake: true },
  { word: "«según fuentes»", w: 46, fake: false },
  { word: "«ministerio»", w: 30, fake: false },
];

function Classifier() {
  return (
    <Frame title="detectia/predict.py">
      <div className="space-y-2">
        <div className="h-2.5 w-11/12 rounded bg-slate-700/70" />
        <div className="h-2.5 w-4/5 rounded bg-slate-700/50" />
        <div className="h-2.5 w-3/5 rounded bg-slate-700/40" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {[
          { label: "FAKE", p: 91, tone: "from-rose-500 to-rose-400", text: "text-rose-300" },
          { label: "REAL", p: 9, tone: "from-emerald-500 to-emerald-400", text: "text-emerald-300" },
        ].map((c) => (
          <div key={c.label} className="rounded-xl border border-midnight-700 bg-midnight-900/80 p-3">
            <div className="flex items-baseline justify-between font-mono text-xs">
              <span className={c.text}>{c.label}</span>
              <span className="text-slate-400">0.{String(c.p).padStart(2, "0")}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-midnight-700">
              <div className={`bar-grow h-full rounded-full bg-gradient-to-r ${c.tone}`} style={{ "--w": `${c.p}%` } as CSSProperties} />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-slate-500">explicación · SHAP</p>
      <div className="mt-3 space-y-2">
        {TOKENS.map((t, i) => (
          <div key={t.word} className="flex items-center gap-3 font-mono text-[11px]">
            <span className="w-24 shrink-0 truncate text-slate-400 sm:w-28">{t.word}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-midnight-800">
              <div
                className={`bar-grow h-full rounded-full ${t.fake ? "bg-rose-400/80" : "bg-accent-400/80"}`}
                style={{ "--w": `${t.w}%`, transitionDelay: `${400 + i * 120}ms` } as CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// Contenedores sobre una red de calles; el color indica el nivel de llenado.
const BINS = [
  { x: 30, y: 30, fill: 0.9 },
  { x: 90, y: 30, fill: 0.75 },
  { x: 150, y: 30, fill: 0.8 },
  { x: 150, y: 80, fill: 0.95 },
  { x: 90, y: 80, fill: 0.65 },
  { x: 30, y: 120, fill: 0.7 },
  { x: 90, y: 120, fill: 0.85 },
  { x: 150, y: 120, fill: 0.3 },
  { x: 120, y: 120, fill: 0.15 },
];
const ROUTE = "M 10 140 L 30 120 L 30 30 L 150 30 L 150 80 L 90 80 L 90 120 L 10 140";

function Routes() {
  return (
    <Frame title="rutas/optimizar.py --criterio llenado,co2">
      <svg viewBox="0 0 180 150" className="mx-auto block h-auto w-full max-w-[22rem]" aria-hidden="true">
        {[30, 90, 150].map((x) => (
          <line key={`v${x}`} x1={x} y1="10" x2={x} y2="140" stroke="rgba(148,163,184,0.18)" strokeWidth="5" strokeLinecap="round" />
        ))}
        {[30, 80, 120].map((y) => (
          <line key={`h${y}`} x1="15" y1={y} x2="165" y2={y} stroke="rgba(148,163,184,0.18)" strokeWidth="5" strokeLinecap="round" />
        ))}
        <path d={ROUTE} fill="none" stroke="#38bdf8" strokeWidth="2.2" strokeLinejoin="round" className="route-draw" pathLength={1} />
        {BINS.map((b) => (
          <g key={`${b.x}-${b.y}`}>
            <circle cx={b.x} cy={b.y} r="6.5" fill="#060d1f" stroke={b.fill > 0.6 ? "#fb7185" : "#475569"} strokeWidth="1.5" />
            <circle cx={b.x} cy={b.y} r={2 + b.fill * 3} fill={b.fill > 0.6 ? "#fb7185" : "#64748b"} />
          </g>
        ))}
        <rect x="2" y="132" width="16" height="16" rx="3" fill="#a78bfa" />
        <text x="10" y="143" textAnchor="middle" fontSize="8" fill="#060d1f" fontWeight="700">D</text>
        <circle r="3.5" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5">
          <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE} />
        </circle>
      </svg>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-slate-500">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-400" /> llenado alto (se visita)</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-500" /> se deja para otra ruta</span>
      </div>
    </Frame>
  );
}

// Trellis de 4 estados × 6 pasos con el camino superviviente resaltado.
const STEPS = 6;
const STATES = 4;
// Estados que recorre el codificador con los bits de abajo: s(t+1) = (2·s(t) + bit) mod 4.
const SURVIVOR = [0, 1, 2, 1, 3, 2, 0];
const BITS = ["1", "0", "1", "1", "0", "0"];
const sx = (t: number) => 18 + t * 26;
const sy = (s: number) => 22 + s * 28;

function Trellis() {
  const path = SURVIVOR.map((s, t) => `${t === 0 ? "M" : "L"} ${sx(t)} ${sy(s)}`).join(" ");
  return (
    <Frame title="viterbi/decode — K=3, tasa 1/2">
      <svg viewBox="0 0 192 140" className="mx-auto block h-auto w-full max-w-[24rem]" aria-hidden="true">
        {Array.from({ length: STEPS }, (_, t) =>
          Array.from({ length: STATES }, (_, s) =>
            [(s * 2) % STATES, (s * 2 + 1) % STATES].map((n) => (
              <line key={`${t}-${s}-${n}`} x1={sx(t)} y1={sy(s)} x2={sx(t + 1)} y2={sy(n)} stroke="rgba(148,163,184,0.14)" strokeWidth="0.8" />
            )),
          ),
        )}
        <path d={path} fill="none" stroke="url(#trellis-gradient)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" className="route-draw" pathLength={1} />
        <defs>
          <linearGradient id="trellis-gradient" x1="0" x2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {Array.from({ length: STEPS + 1 }, (_, t) =>
          Array.from({ length: STATES }, (_, s) => (
            <circle
              key={`n${t}-${s}`}
              cx={sx(t)}
              cy={sy(s)}
              r={SURVIVOR[t] === s ? 3.6 : 2.4}
              fill={SURVIVOR[t] === s ? "#e0f2fe" : "#1b2e5e"}
              stroke={SURVIVOR[t] === s ? "#38bdf8" : "none"}
            />
          )),
        )}
        {["00", "01", "10", "11"].map((label, s) => (
          <text key={label} x="2" y={sy(s) + 2.5} fontSize="6" fill="#64748b" fontFamily="monospace">
            {label}
          </text>
        ))}
        {BITS.map((b, t) => (
          <text key={t} x={(sx(t) + sx(t + 1)) / 2} y="134" textAnchor="middle" fontSize="7" fill="#7dd3fc" fontFamily="monospace">
            {b}
          </text>
        ))}
      </svg>
    </Frame>
  );
}

export default function ProjectVisual({ kind }: { kind: Project["visual"] }) {
  if (kind === "classifier") return <Classifier />;
  if (kind === "routes") return <Routes />;
  return <Trellis />;
}
