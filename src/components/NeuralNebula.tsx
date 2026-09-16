import { aiCore, aiCoreNodes } from "@/lib/data";

type NeuralNebulaProps = {
  className?: string;
};

export default function NeuralNebula({ className = "" }: NeuralNebulaProps) {
  const hubs = aiCoreNodes.filter((n) => n.kind === "hub");
  const projects = aiCoreNodes.filter((n) => n.kind !== "hub");

  return (
    <div
      role="img"
      aria-label={aiCore.canvasLabel}
      className={`relative flex min-h-[20rem] flex-wrap content-center items-center justify-center gap-3 p-4 ${className}`}
    >
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-center font-display text-3xl font-black tracking-tight text-transparent [text-shadow:0_0_40px_rgba(56,189,248,0.45)] md:text-4xl">
        <span className="sr-only">{aiCore.coreLabel}</span>
        <span aria-hidden className="bg-gradient-to-r from-sky-300 via-violet-300 to-sky-300 bg-clip-text">
          {aiCore.coreLabel}
        </span>
      </span>

      {hubs.map((node, i) => (
        <a
          key={node.id}
          href={node.href}
          aria-label={node.areas.join(", ")}
          className={`relative z-10 flex w-[min(92%,16rem)] flex-col items-center rounded-2xl border px-4 py-3 text-center transition-transform hover:-translate-y-1 ${
            i % 2 === 0
              ? "border-sky-400/40 bg-sky-400/10 hover:bg-sky-400/20"
              : "border-violet-400/30 bg-violet-400/10 hover:bg-violet-400/20"
          }`}
        >
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-200">
            {node.label}
          </span>
          <span className="mt-2 text-[10px] leading-relaxed text-slate-400">
            {node.areas.join(" · ")}
          </span>
        </a>
      ))}

      {projects.map((node) => (
        <a
          key={node.id}
          href={node.href}
          aria-label={node.areas.join(", ")}
          className="relative z-10 flex w-[min(92%,14rem)] flex-col items-center rounded-2xl border border-sky-400/50 bg-slate-950/60 px-4 py-3 text-center transition-transform hover:-translate-y-1"
        >
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-sky-300">
            {node.label}
          </span>
          <span className="mt-2 text-[10px] leading-relaxed text-slate-400">
            {node.areas.join(" · ")}
          </span>
        </a>
      ))}

      <noscript>
        <p className="w-full text-center text-sm text-slate-400">{aiCore.fallbackLabel}</p>
      </noscript>
    </div>
  );
}
