import { about } from "@/lib/data";
import Section from "@/components/Section";

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
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-5 text-base leading-7 text-slate-400">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>

        <div>
          <div className="rounded-2xl border border-midnight-600 bg-midnight-800/50 p-6">
            <p className="mb-4 font-mono text-xs text-slate-500">{`// datos.txt`}</p>
            <dl className="space-y-3">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center justify-between gap-4 border-b border-midnight-700/60 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-sm text-slate-500">{fact.label}</dt>
                  <dd className="text-right text-sm font-medium text-slate-200">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-midnight-600/60 bg-midnight-800/30 px-4 py-5 text-center"
              >
                <p className="gradient-text font-mono text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}