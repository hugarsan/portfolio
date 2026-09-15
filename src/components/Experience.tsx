import { courses, education, experience } from "@/lib/data";
import Section from "@/components/Section";
import { GraduationIcon, TerminalIcon } from "@/components/icons";

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
      <ol className="space-y-0">
        {experience.map((job) => (
          <li key={job.company} className="relative pb-12 pl-10 last:pb-0">
            <span
              className={`absolute left-1 top-1 h-3.5 w-3.5 rounded-full ${
                job.highlight
                  ? "bg-accent-400 ring-4 ring-accent-500/20"
                  : "bg-midnight-600"
              }`}
            />
            <span className="absolute bottom-0 left-[6px] top-4 w-px -translate-x-1/2 bg-midnight-700" />

            <div
              className={`rounded-2xl border p-6 transition-colors md:p-7 ${
                job.highlight
                  ? "border-accent-500/30 bg-accent-500/[0.04]"
                  : "border-midnight-600/60 bg-midnight-800/30"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-slate-100">
                  {job.role}
                </h3>
                <p className="font-mono text-xs text-slate-500">
                  {job.period} · {job.location}
                </p>
              </div>
              <p className="mt-1 text-sm text-accent-400">{job.company}</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">{job.description}</p>
              {job.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
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
          </li>
        ))}
      </ol>

      <div className="mt-20 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2 text-accent-400">
            <GraduationIcon className="h-5 w-5" />
            <h3 className="font-mono text-sm">{"// formación"}</h3>
          </div>
          <div className="space-y-4">
            {education.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-midnight-600/60 bg-midnight-800/30 p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display font-semibold text-slate-100">{item.title}</h4>
                  <span className="rounded-full border border-midnight-600 px-2.5 py-0.5 font-mono text-[11px] text-slate-400">
                    {item.note}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{item.institution}</p>
                <p className="mt-2 font-mono text-xs text-slate-500">{item.period}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center gap-2 text-accent-400">
            <TerminalIcon className="h-5 w-5" />
            <h3 className="font-mono text-sm">{"// cursos"}</h3>
          </div>
          <div className="flex flex-col gap-3">
            {courses.map((course) => (
              <div
                key={course}
                className="flex items-center gap-3 rounded-xl border border-midnight-600/60 bg-midnight-800/30 px-5 py-4 text-sm text-slate-300"
              >
                <span className="text-accent-400">▹</span>
                {course}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}