import { about, experience } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";

const current = experience.find((job) => job.current);

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
      <div className="grid grid-cols-2 gap-5 md:grid-cols-12">
        <Reveal className="spotlight rounded-3xl border border-midnight-600/60 bg-midnight-800/30 col-span-2 p-7 md:col-span-7 md:p-9 lg:col-span-8">
          <p className="font-mono text-xs text-slate-500">{"// quién soy"}</p>
          <div className="mt-5 space-y-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={100}
          className="border-beam relative rounded-3xl bg-gradient-to-br from-accent-500/15 via-midnight-800/60 to-violet-500/15 p-7 col-span-2 md:col-span-5 lg:col-span-4"
        >
          <div className="flex items-center gap-2">
            <span className="badge-dot inline-block h-2 w-2 rounded-full bg-emerald-400" />
            <p className="font-mono text-xs uppercase tracking-widest text-emerald-300">Ahora mismo</p>
          </div>
          <p className="font-display mt-6 text-3xl font-bold leading-tight text-slate-100">
            {current?.role}
          </p>
          <p className="gradient-text font-display mt-1 text-2xl font-bold">@ {current?.company}</p>
          <p className="mt-4 text-sm leading-6 text-slate-400">{about.roles.intro}</p>
          <p className="mt-5 font-mono text-xs text-slate-500">{current?.period}</p>
        </Reveal>

        {about.stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 80}
            className="spotlight group rounded-3xl border border-midnight-600/60 bg-midnight-800/30 px-5 py-7 text-center md:col-span-3"
          >
            <p className="gradient-text font-display text-4xl font-bold transition-transform duration-500 group-hover:scale-110 md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-xs uppercase tracking-widest text-slate-500">{stat.label}</p>
          </Reveal>
        ))}

        <Reveal className="spotlight rounded-3xl border border-midnight-600/60 bg-midnight-800/30 p-7 col-span-2 md:col-span-6">
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
        </Reveal>

        <Reveal delay={100} className="spotlight rounded-3xl border border-midnight-600/60 bg-midnight-800/30 p-7 col-span-2 md:col-span-6">
          <p className="font-mono text-xs text-slate-500">{"// áreas en las que me muevo"}</p>
          <div className="mt-5 flex flex-wrap gap-2">
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
    </Section>
  );
}
