import { currentAge } from "@/lib/age";
import { about, experience, site } from "@/lib/data";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import ScrollWords from "@/components/ScrollWords";
import Section from "@/components/Section";
import TiltCard from "@/components/TiltCard";

const current = experience.find((job) => job.current);

// La edad se calcula al compilar; sin fecha configurada, la fila no aparece.
const age = currentAge();
const facts = age === null ? about.facts : [about.facts[0], { label: "Edad", value: `${age} años` }, ...about.facts.slice(1)];

// Código de barras decorativo, estable entre renders.
const bars = Array.from({ length: 42 }, (_, i) => 1 + Math.round(((Math.sin(i * 91.7) + 1) / 2) * 3));

export default function About() {
  return (
    <Section
      id="sobre-mi"
      index="01"
      tag="sobre_mí"
      title={
        <>
          Sobre <span className="gradient-text">mí</span>
        </>
      }
    >
      <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
          <p className="font-mono text-xs text-accent-400">{"// en una frase"}</p>
          <ScrollWords
            text={about.manifesto}
            highlight={["inteligencia", "artificial", "explicar,", "Stormbringer."]}
            className="font-display mt-5 text-3xl font-bold leading-[1.18] tracking-tight md:text-[2.75rem]"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 32)} delay={i * 100} className="border-l border-accent-500/30 pl-5">
                <p className="text-[15px] leading-7 text-slate-400">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <p className="font-mono text-xs text-slate-500">{"// áreas en las que me muevo"}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {about.roles.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-accent-500/25 bg-accent-500/[0.06] px-3.5 py-1.5 font-mono text-xs text-accent-300 transition-all hover:-translate-y-0.5 hover:border-accent-400/60 hover:bg-accent-500/15"
                >
                  {area}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <TiltCard>
              <div className="border-beam relative rounded-[1.75rem] bg-gradient-to-br from-midnight-800 via-midnight-900 to-midnight-950 shadow-[0_40px_100px_-30px_rgba(56,189,248,0.45)]">
                <div className="sheen pointer-events-none absolute inset-0 rounded-[1.75rem]" aria-hidden="true" />
                <div className="relative p-7">
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500">
                    <span>{site.username}.dev · id</span>
                    <span className="flex items-center gap-1.5 text-emerald-300">
                      <span className="badge-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      online
                    </span>
                  </div>

                  <div className="mt-7 flex items-center gap-5">
                    <div className="relative h-24 w-24 shrink-0 rounded-2xl bg-gradient-to-br from-accent-400 via-accent-500 to-violet-500 p-[2px] shadow-[0_0_40px_-6px_rgba(56,189,248,0.8)]">
                      {/* eslint-disable-next-line @next/next/no-img-element -- exportación estática, sin optimizador de imágenes */}
                      <img
                        src={site.photo}
                        alt={`Foto de ${site.name}`}
                        width={96}
                        height={96}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full rounded-[14px] object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-2xl font-bold leading-tight text-slate-100">{site.name}</p>
                      <p className="mt-1 text-sm text-accent-300">
                        {current?.role} @ {current?.company}
                      </p>
                    </div>
                  </div>

                  <dl className="mt-7 space-y-2.5 border-t border-dashed border-midnight-600 pt-5">
                    {facts.map((fact) => (
                      <div key={fact.label} className="flex items-baseline justify-between gap-4">
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-slate-500">{fact.label}</dt>
                        <dd className="text-right text-sm font-medium text-slate-200">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-7 flex items-end justify-between gap-4 border-t border-dashed border-midnight-600 pt-5">
                    <div className="flex h-9 items-end gap-[2px]" aria-hidden="true">
                      {bars.map((w, i) => (
                        <span key={i} className="h-full bg-slate-500/60" style={{ width: `${w}px` }} />
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-slate-600">{site.location}</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 70} className="spotlight rounded-2xl border border-midnight-600/60 bg-midnight-800/40 px-4 py-4">
                <p className="gradient-text font-display text-3xl font-bold">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-1 text-[11px] uppercase tracking-widest text-slate-500">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
