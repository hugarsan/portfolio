import { courses, education, experience } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { BriefcaseIcon, GraduationIcon, TerminalIcon } from "@/components/icons";

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
      <div className="relative">
        <span
          className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-accent-400 via-violet-400/50 to-transparent md:left-[11px]"
          aria-hidden="true"
        />
        <ol className="space-y-8">
          {experience.map((job, i) => (
            <Reveal as="li" key={job.company} delay={i * 60} className="relative pl-10 md:pl-14">
              <span className="absolute left-0 top-7 flex h-[15px] w-[15px] items-center justify-center md:h-[23px] md:w-[23px]">
                {job.current && (
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/50" />
                )}
                <span
                  className={`relative h-full w-full rounded-full border-2 ${
                    job.current
                      ? "border-emerald-300 bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.8)]"
                      : job.highlight
                        ? "border-accent-300 bg-accent-500 shadow-[0_0_14px_rgba(56,189,248,0.6)]"
                        : "border-midnight-600 bg-midnight-900"
                  }`}
                />
              </span>

              <div
                className={`rounded-3xl p-6 md:p-8 ${
                  job.current
                    ? "border-beam bg-gradient-to-br from-emerald-400/[0.07] via-midnight-800/60 to-accent-500/[0.07]"
                    : job.highlight
                      ? "spotlight border border-accent-500/25 bg-accent-500/[0.04]"
                      : "spotlight border border-midnight-600/50 bg-midnight-800/20"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3
                        className={`font-display font-semibold ${
                          job.current ? "text-2xl text-white md:text-3xl" : "text-lg text-slate-100"
                        }`}
                      >
                        {job.role}
                      </h3>
                      {job.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Actual
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-1 flex items-center gap-2 ${
                        job.current ? "gradient-text font-display text-xl font-bold" : "text-sm text-accent-400"
                      }`}
                    >
                      {!job.current && <BriefcaseIcon className="h-3.5 w-3.5" />}
                      {job.company}
                    </p>
                  </div>
                  <p className="font-mono text-xs text-slate-500">
                    {job.period} · {job.location}
                  </p>
                </div>
                <p className={`mt-4 leading-7 ${job.current ? "text-base text-slate-300" : "text-sm text-slate-400"}`}>
                  {job.description}
                </p>
                {job.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-accent-500/25 bg-accent-500/10 px-2.5 py-1 font-mono text-xs text-accent-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>

      <div className="mt-24 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="mb-6 flex items-center gap-2 text-accent-400">
            <GraduationIcon className="h-5 w-5" />
            <h3 className="font-mono text-sm">{"// formación"}</h3>
          </div>
          <div className="space-y-4">
            {education.map((item) => (
              <div
                key={item.title}
                className="spotlight rounded-3xl border border-midnight-600/60 bg-midnight-800/30 p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-lg font-semibold text-slate-100">{item.title}</h4>
                  <span className="shrink-0 rounded-full border border-accent-500/30 bg-accent-500/10 px-2.5 py-0.5 font-mono text-[11px] text-accent-300">
                    {item.note}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{item.institution}</p>
                <p className="mt-2 font-mono text-xs text-slate-500">{item.period}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mb-6 flex items-center gap-2 text-accent-400">
            <TerminalIcon className="h-5 w-5" />
            <h3 className="font-mono text-sm">{"// cursos"}</h3>
          </div>
          <div className="flex flex-col gap-3">
            {courses.map((course) => (
              <div
                key={course.title}
                className="spotlight flex items-center gap-3 rounded-2xl border border-midnight-600/60 bg-midnight-800/30 px-5 py-4 text-sm text-slate-300"
              >
                <span className="text-accent-400">▹</span>
                <span className="flex-1">{course.title}</span>
                <span className="font-mono text-xs text-slate-500">
                  {course.institution} · {course.year}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
