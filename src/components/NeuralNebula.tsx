import { aiCore, aiCoreNodes } from "@/lib/data";

type NeuralNebulaProps = {
  className?: string;
};

const HUB_KIND = "hub";

export default function NeuralNebula({ className = "" }: NeuralNebulaProps) {
  return (
    <div
      role="img"
      aria-label={aiCore.canvasLabel}
      className={`flex min-h-[16rem] w-full flex-wrap content-center items-center justify-center gap-3 ${className}`}
    >
      {aiCoreNodes.map((node) => (
        <a
          key={node.id}
          href={node.href}
          aria-label={node.areas.join(", ")}
          className={`group flex max-w-[15rem] flex-col items-center rounded-2xl border px-4 py-3 text-center transition-transform hover:-translate-y-1 ${
            node.kind === HUB_KIND
              ? "border-sky-400/40 bg-sky-400/10 hover:bg-sky-400/20"
              : "border-violet-400/30 bg-violet-400/10 hover:bg-violet-400/20"
          }`}
        >
          <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-slate-200">
            {node.label}
          </span>
          <span className="mt-2 text-[10px] leading-relaxed text-slate-400">
            {node.areas.join(", ")}
          </span>
        </a>
      ))}
      <noscript>
        <p className="w-full text-center text-sm text-slate-400">{aiCore.fallbackLabel}</p>
      </noscript>
    </div>
  );
}
