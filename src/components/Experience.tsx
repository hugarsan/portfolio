import { courses, education, experience, type ExperienceItem } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import TimelineProgress from "@/components/TimelineProgress";
import { GraduationIcon, TerminalIcon } from "@/components/icons";

const main = experience.filter((job) => job.highlight);
const sideJobs = experience.filter((job) => !job.highlight);

const startYear = (period: string) => period.match(/\d{4}/)?.[0] ?? "";
const monogram = (institution: string) => (institution.includes("Salamanca") ? "USAL" : institution.split(/\s/)[0]);

function JobCard({ job }: { job: ExperienceItem }) {
  if (job.current) {
    return (
      <div className="border-beam relative rounded-3xl bg-gradient-to-br from-emerald-400/[0.08] via-midnight-800/70 to-accent-500/[0.08] p-7 md:p-9">
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
          <span className="outline-text font-display absolute -right-3 -top-6 select-none text-[7rem] font-bold leading-none md:text-[9rem]">
            NOW
          </span>
        </div>
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
            <span className="badge-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Puesto actual
          </span>
          <h3 className="font-display mt-5 text-3xl font-bold tracking-tight text-white md:text-4xl">{job.role}</h3>
          <p className="gradient-text font-display mt-1 text-2xl font-bold">{job.company}</p>
          <p className="mt-2 font-mono text-xs text-slate-400">
            {job.period} · {job.location}
          </p>
          <p className="mt-5 leading-7 text-slate-300">{job.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span key={tag} className="rounded-md border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 font-mono text-xs text-emerald-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="spotlight rounded-3xl border border-midnight-600/60 bg-midnight-800/40 p-6 md:p-7">
      <p className="font-mono text-xs text-slate-500">
        {job.period} · {job.location}
      </p>
      <h3 className="font-display mt-3 text-xl font-semibold text-slate-100">{job.role}</h3>
      <p className="mt-1 text-sm font-medium text-accent-400">{job.company}</p>
      <p className="mt-4 text-sm leading-6 text-slate-400">{job.description}</p>
      {job.tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <span key={tag} className="rounded-md border border-accent-500/25 bg-accent-500/10 px-2.5 py-1 font-mono text-xs text-accent-300">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  return (
    <Section
      id="experiencia"
      index="04"
      tag="experiencia"
      title={
        <>
          Mi <span className="gradient-text">recorrido</span>
        </>
      }
    >
      <TimelineProgress>
        {/* Línea: pista + relleno que avanza con el scroll + cabeza luminosa */}
        <div className="absolute bottom-0 left-[11px] top-0 w-px bg-midnight-700 lg:left-1/2" aria-hidden="true">
          <div
            className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-emerald-400 via-accent-400 to-violet-400"
            style={{ height: "calc(var(--progress) * 100%)" }}
          />
          <div
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-300 shadow-[0_0_18px_4px_rgba(56,189,248,0.8)]"
            style={{ top: "calc(var(--progress) * 100%)" }}
          />
        </div>

        <ol className="space-y-14 lg:space-y-20">
          {main.map((job, i) => {
            const right = i % 2 === 1;
            return (
              <Reveal as="li" key={job.company} className="relative grid items-center gap-6 pl-10 lg:grid-cols-2 lg:gap-16 lg:pl-0">
                {/* Nodo en la línea */}
                <span
                  className={`absolute left-[11px] top-8 z-10 h-[15px] w-[15px] -translate-x-1/2 rounded-full border-2 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 ${
                    job.current
                      ? "border-emerald-200 bg-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.9)]"
                      : "border-accent-200 bg-accent-500 shadow-[0_0_16px_rgba(56,189,248,0.7)]"
                  }`}
                  aria-hidden="true"
                />
                {job.current && (
                  <span
                    className="absolute left-[11px] top-8 z-0 h-[15px] w-[15px] -translate-x-1/2 animate-ping rounded-full bg-emerald-400/60 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2"
                    aria-hidden="true"
                  />
                )}

                {/* Año grande en el lado contrario (escritorio) */}
                <div className={`hidden lg:block ${right ? "lg:order-1 lg:text-right" : "lg:order-2"}`} aria-hidden="true">
                  <p
                    className={`font-display text-[6.5rem] font-bold leading-none tracking-tighter ${
                      job.current ? "gradient-text" : "outline-text"
                    }`}
                  >
                    {startYear(job.period)}
                  </p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-500">{job.company}</p>
                </div>

                <div className={right ? "lg:order-2" : "lg:order-1"}>
                  <JobCard job={job} />
                </div>
              </Reveal>
            );
          })}

          {sideJobs.length > 0 && (
            <Reveal as="li" className="relative pl-10 lg:pl-0">
              <span
                className="absolute left-[11px] top-8 z-10 h-[11px] w-[11px] -translate-x-1/2 rounded-full border-2 border-midnight-600 bg-midnight-900 lg:left-1/2"
                aria-hidden="true"
              />
              <div className="relative rounded-3xl border border-dashed border-midnight-600/80 bg-midnight-950/60 p-6 backdrop-blur lg:mx-auto lg:max-w-2xl">
                <p className="font-mono text-xs text-slate-500">{"// en paralelo a los estudios"}</p>
                <h3 className="font-display mt-2 text-lg font-semibold text-slate-200">Hostelería de alto nivel</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Eventos en hoteles de cinco estrellas compaginados con la carrera: ritmo, trabajo en equipo y aguante bajo presión.
                </p>
                <ul className="mt-4 divide-y divide-midnight-700/60">
                  {sideJobs.map((job) => (
                    <li key={job.company} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm">
                      <span className="text-slate-300">
                        {job.role} · <span className="text-slate-400">{job.company}</span>
                      </span>
                      <span className="font-mono text-xs text-slate-500">{job.period}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </ol>
      </TimelineProgress>

      <div className="mt-28 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Reveal className="mb-6 flex items-center gap-2 text-accent-400">
            <GraduationIcon className="h-5 w-5" />
            <h3 className="font-mono text-sm">{"// formación"}</h3>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {education.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 100}
                className="spotlight group relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-3xl border border-midnight-600/60 bg-gradient-to-br from-midnight-800/60 to-midnight-900/40 p-6"
              >
                <span
                  className="outline-text font-display pointer-events-none absolute -bottom-6 -right-2 select-none text-[6rem] font-bold leading-none transition-transform duration-700 group-hover:-translate-y-2"
                  aria-hidden="true"
                >
                  {monogram(item.institution)}
                </span>
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">{item.period}</span>
                  <span className="rounded-full border border-accent-500/30 bg-accent-500/10 px-2.5 py-0.5 font-mono text-[11px] text-accent-300">
                    {item.note}
                  </span>
                </div>
                <div className="relative mt-8">
                  <h4 className="font-display text-2xl font-bold leading-tight text-slate-100">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-400">{item.institution}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <Reveal className="mb-6 flex items-center gap-2 text-accent-400">
            <TerminalIcon className="h-5 w-5" />
            <h3 className="font-mono text-sm">{"// cursos"}</h3>
          </Reveal>
          <Reveal delay={100} className="overflow-hidden rounded-3xl border border-midnight-600/60 bg-midnight-900/70">
            <div className="flex items-center gap-2 border-b border-midnight-700/80 px-5 py-3 font-mono text-xs text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <span className="ml-2">ls cursos/</span>
            </div>
            <ul className="divide-y divide-midnight-700/60">
              {courses.map((course) => (
                <li key={course.title} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-accent-500/[0.05]">
                  <span className="rounded-md border border-accent-500/25 bg-accent-500/10 px-2 py-0.5 font-mono text-[11px] text-accent-300">
                    {course.year}
                  </span>
                  <span className="flex-1 text-sm text-slate-200 transition-colors group-hover:text-white">{course.title}</span>
                  <span className="font-mono text-xs text-slate-500">{course.institution}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
