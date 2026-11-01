import { projects } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { GitHubIcon } from "@/components/icons";

export default function Projects() {
  return (
    <Section
      id="proyectos"
      index="03"
      tag="proyectos"
      title={
        <>
          Proyectos <span className="gradient-text">destacados</span>
        </>
      }
    >
      <div className="space-y-6">
        {projects.map((project, i) => (
          <Reveal
            as="article"
            key={project.name}
            className="spotlight group overflow-hidden rounded-3xl border border-midnight-600/60 bg-midnight-800/40 p-8 md:p-12"
          >
            <span
              className="outline-text font-display pointer-events-none absolute -top-6 right-4 select-none text-[8rem] opacity-60 font-bold leading-none transition-transform duration-700 group-hover:translate-y-2 md:text-[11rem]"
              aria-hidden="true"
            >
              0{i + 1}
            </span>

            <div className="relative grid gap-10 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-sm text-accent-400">proyecto_0{i + 1}.py</p>
                  <span className="rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-xs text-accent-300">
                    {project.tag}
                  </span>
                  <span className="font-mono text-xs text-slate-600">{project.year}</span>
                </div>

                <h3 className="font-display mt-6 text-3xl font-bold tracking-tight text-slate-100 transition-colors group-hover:text-white md:text-4xl">
                  {project.name}
                </h3>
                <p className="mt-4 max-w-2xl leading-7 text-slate-400">{project.summary}</p>

                <ul className="mt-5 max-w-2xl space-y-2.5 text-sm leading-6 text-slate-400">
                  {project.details.map((detail) => (
                    <li key={detail} className="flex gap-3">
                      <span className="mt-0.5 text-accent-400">▹</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-between gap-8">
                {project.metrics && project.metrics.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-2xl border border-accent-500/20 bg-midnight-950/50 px-4 py-4 text-center backdrop-blur lg:flex lg:items-baseline lg:justify-between lg:text-left"
                      >
                        <p className="gradient-text font-display text-2xl font-bold md:text-3xl">{metric.value}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div />
                )}

                <div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-midnight-600 bg-midnight-900/70 px-2.5 py-1 font-mono text-xs text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-lg border border-accent-500/40 px-4 py-2 font-mono text-xs text-accent-300 transition-colors hover:bg-accent-500/10"
                    >
                      <GitHubIcon className="h-4 w-4" />
                      Ver en GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
