import { skills } from "@/lib/data";
import Section from "@/components/Section";
import { CodeIcon, ServerIcon, SparklesIcon, WrenchIcon } from "@/components/icons";

const categoryIcons = {
  code: CodeIcon,
  server: ServerIcon,
  ai: SparklesIcon,
  tool: WrenchIcon,
} as const;

export default function Skills() {
  return (
    <Section
      id="habilidades"
      index="02"
      tag="habilidades"
      title={
        <>
          Mi <span className="gradient-text">stack</span>
        </>
      }
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.categories.map((category) => {
          const Icon = categoryIcons[category.icon as keyof typeof categoryIcons];
          return (
            <div
              key={category.title}
              className="rounded-2xl border border-midnight-600/60 bg-midnight-800/40 p-6 transition-colors hover:border-accent-500/40"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent-500/30 bg-accent-500/10 text-accent-400">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-slate-100">
                {category.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-midnight-600 bg-midnight-800/70 px-2.5 py-1 font-mono text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-5 font-mono text-sm text-slate-500">{"// competencias"}</h3>
          <div className="flex flex-wrap gap-2">
            {skills.competencies.map((competency) => (
              <span
                key={competency}
                className="rounded-full border border-midnight-600 bg-midnight-800/50 px-4 py-1.5 text-sm text-slate-300"
              >
                {competency}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 font-mono text-sm text-slate-500">{"// idiomas"}</h3>
          <div className="space-y-4">
            {skills.languages.map((language) => (
              <div key={language.name}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-200">{language.name}</span>
                  <span className="text-slate-500">{language.level}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-midnight-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-500 to-indigo-400"
                    style={{ width: `${language.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}