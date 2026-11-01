import { projects } from "@/lib/data";
import CountUp from "@/components/CountUp";
import ProjectVisual from "@/components/ProjectVisual";
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
      {/* En escritorio las tarjetas se apilan al hacer scroll: cada una se queda fija un poco más abajo que la anterior. */}
      <div className="space-y-8 lg:space-y-[18vh] lg:pb-[8vh]">
        {projects.map((project, i) => (
          <div key={project.name} className="lg:sticky" style={{ top: `calc(6.5rem + ${i * 1.75}rem)` }}>
            <Reveal
              as="article"
              className="spotlight group overflow-hidden rounded-[2rem] border border-midnight-600/70 bg-midnight-900 shadow-[0_-20px_60px_-20px_rgba(3,8,15,0.9)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-500/[0.06] via-transparent to-violet-500/[0.06]" aria-hidden="true" />
              <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="gradient-text font-display text-5xl font-bold leading-none md:text-6xl">0{i + 1}</span>
                    <div className="flex flex-col gap-1.5">
                      <span className="w-fit rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-xs text-accent-300">
                        {project.tag}
                      </span>
                      <span className="font-mono text-xs text-slate-500">{project.year}</span>
                    </div>
                  </div>

                  <h3 className="font-display mt-6 text-3xl font-bold tracking-tight text-slate-100 md:text-4xl">{project.name}</h3>
                  <p className="mt-4 leading-7 text-slate-400">{project.summary}</p>

                  <ul className="mt-5 space-y-2.5 text-sm leading-6 text-slate-400">
                    {project.details.map((detail) => (
                      <li key={detail} className="flex gap-3">
                        <span className="mt-0.5 text-accent-400">▹</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {project.metrics && project.metrics.length > 0 && (
                    <dl className="mt-7 grid grid-cols-3 divide-x divide-midnight-700 rounded-2xl border border-midnight-700 bg-midnight-950/60">
                      {project.metrics.map((metric) => (
                        <div key={metric.label} className="flex flex-col px-4 py-3">
                          <dt className="order-2 text-[10px] uppercase tracking-wider text-slate-500">{metric.label}</dt>
                          <dd className="gradient-text font-display order-1 text-2xl font-bold md:text-3xl">
                            <CountUp value={metric.value} />
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  <div className="mt-auto pt-7">
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="rounded-md border border-midnight-600 bg-midnight-950/70 px-2.5 py-1 font-mono text-xs text-slate-300">
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

                <div className="transition-transform duration-700 group-hover:-translate-y-1">
                  <ProjectVisual kind={project.visual} />
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
