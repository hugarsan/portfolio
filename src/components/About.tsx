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

          <div className="rounded-2xl border border-accent-500/25 bg-accent-500/[0.05] p-5">
            <p className="font-mono text-xs text-accent-400">{"// sobre mi situación actual"}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{about.roles.intro}</p>
          </div>

          <div className="rounded-2xl border border-midnight-600/60 bg-midnight-800/30 p-5">
            <p className="font-mono text-xs text-slate-500">{"// roles a los que aspiro"}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {about.roles.areas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-accent-500/25 bg-accent-500/[0.05] px-3 py-1 font-mono text-xs text-accent-300"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6 rounded-2xl border border-midnight-600/60 bg-midnight-800/30 p-6">
            <p className="font-mono text-xs text-slate-500">{`// datos.txt`}</p>
            <dl className="mt-5 space-y-3">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-center justify-between gap-4 border-b border-midnight-700/50 pb-3 last:border-0 last:pb-0"
                >
                  <dt className="text-sm text-slate-500">{fact.label}</dt>
                  <dd className="text-right text-sm font-medium text-slate-200">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-midnight-600/60 bg-midnight-800/30 px-5 py-5 text-center"
              >
                <p className="gradient-text font-mono text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
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