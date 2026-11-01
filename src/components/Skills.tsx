import type { CSSProperties } from "react";
import { skills } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { CodeIcon, ServerIcon, SparklesIcon, WrenchIcon } from "@/components/icons";

const categoryIcons = {
  code: CodeIcon,
  server: ServerIcon,
  ai: SparklesIcon,
  tool: WrenchIcon,
} as const;

const [aiCategory, ...otherCategories] = skills.categories;
const software = otherCategories.find((c) => c.icon === "code");
const databases = otherCategories.find((c) => c.icon === "server");
const tools = otherCategories.find((c) => c.icon === "tool");

// Reparte las tecnologías de IA en dos órbitas: las primeras, en la interior.
const INNER = 5;
const orbit = aiCategory.items.map((item, i) => {
  const inner = i < INNER;
  const ringSize = inner ? INNER : aiCategory.items.length - INNER;
  const index = inner ? i : i - INNER;
  const angle = (index / ringSize) * Math.PI * 2 + (inner ? 0 : Math.PI / ringSize);
  const r = inner ? 27 : 45;
  return { item, inner, left: 50 + Math.cos(angle) * r, top: 50 + Math.sin(angle) * r };
});

const RING = 2 * Math.PI * 34;

function CategoryCard({ category, className = "", delay = 0 }: { category?: (typeof skills.categories)[number]; className?: string; delay?: number }) {
  if (!category) return null;
  const Icon = categoryIcons[category.icon as keyof typeof categoryIcons];
  return (
    <Reveal delay={delay} className={`spotlight group flex flex-col rounded-3xl border border-midnight-600/60 bg-midnight-800/40 p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent-500/30 bg-accent-500/10 text-accent-400 transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:shadow-[0_0_30px_-4px_rgba(56,189,248,0.6)]">
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-mono text-xs text-slate-600">{String(category.items.length).padStart(2, "0")}</span>
      </div>
      <h3 className="font-display mt-5 text-xl font-semibold text-slate-100">{category.title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {category.items.map((item, i) => (
          <span
            key={item}
            style={{ transitionDelay: `${i * 25}ms` }}
            className="rounded-md border border-midnight-600 bg-midnight-900/70 px-2.5 py-1 font-mono text-xs text-slate-300 transition-all duration-300 group-hover:border-accent-500/30 hover:!border-accent-400 hover:text-accent-200"
          >
            {item}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <Section
      id="habilidades"
      index="02"
      tag="habilidades"
      title={
        <>
          Mi <span className="gradient-text">stack</span>
        </>
      }
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* IA y datos: el núcleo, con sus tecnologías en órbita */}
        <Reveal className="spotlight relative overflow-hidden rounded-3xl border border-accent-500/25 bg-gradient-to-br from-accent-500/[0.08] via-midnight-800/50 to-violet-500/[0.08] p-6 md:col-span-2 lg:row-span-2 md:p-8">
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-accent-400">{"// donde pongo el foco"}</p>
              <h3 className="font-display mt-2 text-3xl font-bold text-slate-100 md:text-4xl">{aiCategory.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                Modelos clásicos y profundos, NLP, LLMs y agentes, con explicabilidad para entender lo que predicen.
              </p>
            </div>
            <span className="gradient-text font-display text-5xl font-bold">{aiCategory.items.length}</span>
          </div>

          {/* Órbita (desde sm) */}
          <div className="relative mx-auto mt-4 hidden aspect-square w-full max-w-[26rem] sm:block" aria-hidden="true">
            <div className="absolute inset-[23%] rounded-full border border-dashed border-accent-400/20" />
            <div className="absolute inset-[5%] rounded-full border border-accent-400/10" />
            <div className="absolute inset-[38%] rounded-full bg-accent-500/20 blur-2xl" />
            <div className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-accent-400/50 bg-midnight-950/80 text-accent-300 shadow-[0_0_50px_-6px_rgba(56,189,248,0.8)]">
              <SparklesIcon className="h-9 w-9" />
            </div>
            {[true, false].map((inner) => (
              <div
                key={String(inner)}
                className={`orbit-ring absolute inset-0 ${inner ? "" : "is-reverse"}`}
                style={{ "--orbit-duration": inner ? "38s" : "60s" } as CSSProperties}
              >
                {orbit
                  .filter((o) => o.inner === inner)
                  .map((o) => (
                    <div key={o.item} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${o.left}%`, top: `${o.top}%` }}>
                      <span
                        className={`orbit-chip block whitespace-nowrap rounded-full border px-3 py-1 font-mono text-xs backdrop-blur ${
                          inner
                            ? "border-accent-400/50 bg-midnight-900/90 text-accent-200"
                            : "border-violet-400/40 bg-midnight-900/90 text-violet-200"
                        }`}
                      >
                        {o.item}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>

          {/* Móvil: chips */}
          <div className="mt-6 flex flex-wrap gap-2 sm:hidden">
            {aiCategory.items.map((item) => (
              <span key={item} className="rounded-full border border-accent-400/40 bg-midnight-900/80 px-3 py-1 font-mono text-xs text-accent-200">
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <CategoryCard category={software} delay={80} />
        <CategoryCard category={tools} delay={160} />
        <CategoryCard category={databases} delay={80} />

        <Reveal delay={160} className="spotlight rounded-3xl border border-midnight-600/60 bg-midnight-800/30 p-6">
          <h3 className="font-mono text-xs text-slate-500">{"// idiomas"}</h3>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {skills.languages.map((language) => (
              <div key={language.name} className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20">
                  <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90" aria-hidden="true">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="currentColor" strokeWidth="5" className="text-midnight-700" />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="none"
                      stroke="url(#lang-gradient)"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={RING}
                      className="ring-progress"
                      style={{ "--ring-full": RING, "--ring-target": RING * (1 - language.pct / 100) } as CSSProperties}
                    />
                    <defs>
                      <linearGradient id="lang-gradient" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#a78bfa" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-xs font-semibold text-slate-200">
                    {language.pct}%
                  </span>
                </div>
                <p className="mt-2 text-sm font-medium text-slate-200">{language.name}</p>
                <p className="text-[11px] text-slate-500">{language.level}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={240} className="spotlight rounded-3xl border border-midnight-600/60 bg-midnight-800/30 p-6 md:col-span-2 lg:col-span-1">
          <h3 className="font-mono text-xs text-slate-500">{"// competencias"}</h3>
          <ul className="mt-4 space-y-2">
            {skills.competencies.map((competency, i) => (
              <li key={competency} className="group/item flex items-center gap-3 text-sm text-slate-300">
                <span className="font-mono text-[11px] text-slate-600">{String(i + 1).padStart(2, "0")}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-midnight-600 to-transparent transition-all group-hover/item:from-accent-400" />
                <span className="transition-colors group-hover/item:text-accent-200">{competency}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
