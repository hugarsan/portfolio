"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { experience, site } from "@/lib/data";

const current = experience.find((job) => job.current);

const Key = ({ k }: { k: string }) => <span className="text-violet-300">&quot;{k}&quot;</span>;
const Str = ({ v }: { v?: string }) => <span className="text-emerald-300">&quot;{v}&quot;</span>;

type Block = { cmd: string; out: ReactNode };

const BLOCKS: Block[] = [
  { cmd: "whoami", out: <p className="text-slate-200">{site.name}</p> },
  {
    cmd: "cat trabajo_actual.json",
    out: (
      <pre className="whitespace-pre-wrap font-mono text-slate-300">
        <span className="text-slate-500">{"{"}</span>
        {"\n  "}<Key k="role" />: <Str v={current?.role} />,
        {"\n  "}<Key k="company" />: <Str v={current?.company} />,
        {"\n  "}<Key k="since" />: <Str v="2026-10" />,
        {"\n  "}<Key k="stack" />: [<Str v="LLMs" />, <Str v="agents" />, <Str v="data" />]
        {"\n"}<span className="text-slate-500">{"}"}</span>
      </pre>
    ),
  },
  {
    cmd: "python eval.py --model detectia",
    out: (
      <p className="text-slate-300">
        accuracy <span className="text-emerald-300">0.9064</span> · f1 <span className="text-emerald-300">0.9183</span>{" "}
        <span className="text-slate-500">(60K noticias)</span>
      </p>
    ),
  },
  {
    cmd: "ls formacion/",
    out: <p className="text-accent-300">grado_informatica_usal/{"  "}master_ia_unir/</p>,
  },
];

const Prompt = ({ children }: { children: ReactNode }) => (
  <p className="text-slate-400">
    <span className="text-emerald-400">➜</span> <span className="text-accent-300">~</span> {children}
  </p>
);

// Terminal que se escribe sola y se inclina en 3D siguiendo al cursor.
export default function HeroTerminal({ startDelay }: { startDelay: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [block, setBlock] = useState(0);
  const [typed, setTyped] = useState(0);
  const [showOut, setShowOut] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const fromIntro = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--intro-delay"));
    const delay = Number.isNaN(fromIntro) ? startDelay : fromIntro;
    const t = window.setTimeout(() => setStarted(true), delay + 700);
    return () => window.clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || block >= BLOCKS.length) return;
    const cmd = BLOCKS[block].cmd;
    let t: number;
    if (typed < cmd.length) t = window.setTimeout(() => setTyped((n) => n + 1), 32 + Math.random() * 40);
    else if (!showOut) t = window.setTimeout(() => setShowOut(true), 180);
    else
      t = window.setTimeout(() => {
        setBlock((b) => b + 1);
        setTyped(0);
        setShowOut(false);
      }, 420);
    return () => window.clearTimeout(t);
  }, [started, block, typed, showOut]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        card.style.transform = `perspective(1200px) rotateY(${x * -14}deg) rotateX(${y * 10}deg)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const done = block >= BLOCKS.length;

  return (
    <div ref={cardRef} className="relative transition-transform duration-300 ease-out [transform-style:preserve-3d]">
      <div className="border-beam rounded-2xl bg-midnight-900/85 shadow-[0_40px_120px_-30px_rgba(56,189,248,0.45)] backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-midnight-700/80 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-rose-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-300/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 font-mono text-xs text-slate-500">hugarsan@stormbringer: ~</span>
        </div>
        <div className="min-h-[22rem] space-y-4 p-6 font-mono text-[13px] leading-6">
          {BLOCKS.slice(0, block).map((b) => (
            <div key={b.cmd}>
              <Prompt>{b.cmd}</Prompt>
              {b.out}
            </div>
          ))}
          {!done && started && (
            <div>
              <Prompt>
                {BLOCKS[block].cmd.slice(0, typed)}
                {!showOut && <Caret />}
              </Prompt>
              {showOut && BLOCKS[block].out}
            </div>
          )}
          {(done || !started) && (
            <Prompt>
              <Caret />
            </Prompt>
          )}
        </div>
      </div>
      <div
        className="pointer-events-none absolute -bottom-6 -right-6 rounded-xl border border-emerald-400/30 bg-midnight-950/90 px-4 py-2.5 font-mono text-xs text-emerald-300 shadow-xl backdrop-blur [transform:translateZ(60px)]"
        aria-hidden="true"
      >
        <span className="badge-dot mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400" />
        status: shipping @ {current?.company}
      </div>
    </div>
  );
}

function Caret() {
  return <span className="inline-block h-4 w-2 translate-y-0.5 animate-[blink_1s_steps(1)_infinite] bg-accent-400" />;
}
