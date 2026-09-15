import { hero, site } from "@/lib/data";
import { ArrowDownIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
    >
      <div className="grid-overlay absolute inset-0" aria-hidden="true" />
      <div
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-xs text-emerald-300">
          <span className="badge-dot inline-block h-2 w-2 rounded-full bg-emerald-400" />
          {hero.badge}
        </span>

        <p className="mt-8 font-mono text-sm text-accent-400">hola, soy</p>
        <h1 className="font-display mt-3 text-5xl font-bold tracking-tight text-slate-100 md:text-7xl">
          Hugo <span className="gradient-text">García</span>
        </h1>

        <div className="mt-5 flex items-center justify-center font-mono text-lg font-semibold text-slate-100 md:text-2xl">
          <span className="mr-3 text-slate-500">$</span>
          <span>{hero.roleTitle}</span>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-balance text-base leading-7 text-slate-400 md:text-lg">
          {hero.description}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={site.cv}
            download
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-7 py-3.5 text-sm font-semibold text-midnight-950 transition-colors hover:bg-accent-400 sm:w-auto"
          >
            <DownloadIcon className="h-4 w-4" />
            Descargar CV
          </a>
          <a
            href="#proyectos"
            className="w-full rounded-xl border border-midnight-600 bg-midnight-800/50 px-7 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-accent-500/50 hover:text-accent-300 sm:w-auto"
          >
            Ver proyectos
          </a>
          <a
            href="#contacto"
            className="w-full rounded-xl border border-midnight-600 bg-midnight-800/50 px-7 py-3.5 text-sm font-semibold text-slate-200 transition-colors hover:border-accent-500/50 hover:text-accent-300 sm:w-auto"
          >
            Hablemos
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-slate-500">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-accent-400"
          >
            <GitHubIcon className="h-6 w-6" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent-400"
          >
            <LinkedInIcon className="h-6 w-6" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="transition-colors hover:text-accent-400"
          >
            <MailIcon className="h-6 w-6" />
          </a>
        </div>
      </div>

      <a
        href="#sobre-mi"
        aria-label="Bajar"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-[bounce-soft_2s_ease-in-out_infinite] text-slate-500 transition-colors hover:text-accent-400"
      >
        <ArrowDownIcon className="h-6 w-6" />
      </a>
    </section>
  );
}