import { projects } from "@/lib/data";
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
          <article
            key={project.name}
            className="group relative overflow-hidden rounded-2xl border border-midnight-600/60 bg-midnight-800/40 p-8 transition-colors hover:border-accent-500/40 md:p-10"
          >
            <div
              className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-accent-500/5 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-sm text-accent-400">
                proyecto_0{i + 1}.py
              </p>
              <span className="rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-xs text-accent-300">
                {project.tag}
              </span>
            </div>

            <h3 className="font-display mt-6 text-2xl font-bold text-slate-100">
              {project.name}
            </h3>
            <p className="mt-3 max-w-3xl leading-7 text-slate-400">{project.summary}</p>

            <ul className="mt-4 max-w-3xl space-y-2 text-sm leading-6 text-slate-400">
              {project.details.map((detail) => (
                <li key={detail} className="flex gap-2">
                  <span className="text-accent-400">▹</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            {project.metrics && project.metrics.length > 0 && (
              <div className="mt-6 grid max-w-3xl grid-cols-3 gap-3">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-accent-500/25 bg-accent-500/[0.06] px-4 py-3 text-center"
                  >
                    <p className="gradient-text font-mono text-xl font-bold md:text-2xl">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-slate-400">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-midnight-600 bg-midnight-800/70 px-2.5 py-1 font-mono text-xs text-slate-300"
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
                  className="inline-flex items-center gap-2 rounded-lg border border-accent-500/40 px-4 py-2 font-mono text-xs text-accent-300 transition-colors hover:bg-accent-500/10"
                >
                  <GitHubIcon className="h-4 w-4" />
                  Código
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}