import { site } from "@/lib/data";
import Section from "@/components/Section";
import { GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon } from "@/components/icons";

export default function Contact() {
  return (
    <Section
      id="contacto"
      index="05"
      tag="contacto"
      title={
        <>
          ¿Trabajamos <span className="gradient-text">juntos?</span>
        </>
      }
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="leading-7 text-slate-400">
          ¿Tienes un proyecto en mente, una oportunidad en tu equipo o simplemente quieres
          hablar de tecnología? Estaré encantado de charlar contigo.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-block rounded-xl bg-accent-500 px-8 py-4 font-semibold text-midnight-950 transition-colors hover:bg-accent-400"
        >
          Escríbeme ahora
        </a>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        <a
          href={`mailto:${site.email}`}
          className="group rounded-2xl border border-midnight-600/60 bg-midnight-800/40 p-6 transition-colors hover:border-accent-500/40"
        >
          <MailIcon className="h-6 w-6 text-accent-400" />
          <p className="mt-4 text-sm text-slate-500">Email</p>
          <p className="mt-1 break-all text-sm font-medium text-slate-200 group-hover:text-accent-300">
            {site.email}
          </p>
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-midnight-600/60 bg-midnight-800/40 p-6 transition-colors hover:border-accent-500/40"
        >
          <LinkedInIcon className="h-6 w-6 text-accent-400" />
          <p className="mt-4 text-sm text-slate-500">LinkedIn</p>
          <p className="mt-1 text-sm font-medium text-slate-200 group-hover:text-accent-300">
            hugo-garcía-sánchez
          </p>
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-midnight-600/60 bg-midnight-800/40 p-6 transition-colors hover:border-accent-500/40"
        >
          <GitHubIcon className="h-6 w-6 text-accent-400" />
          <p className="mt-4 text-sm text-slate-500">GitHub</p>
          <p className="mt-1 text-sm font-medium text-slate-200 group-hover:text-accent-300">
            hugarsan
          </p>
        </a>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
        <MapPinIcon className="h-4 w-4 text-accent-400" />
        {site.location} · remoto disponible
      </div>
    </Section>
  );
}