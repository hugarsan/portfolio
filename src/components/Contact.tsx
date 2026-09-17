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
          hablar de tecnología? Escríbeme por WhatsApp o email: contesto siempre.
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-8 inline-block rounded-xl bg-accent-500 px-8 py-4 font-semibold text-midnight-950 transition-colors hover:bg-accent-400"
        >
          Escríbeme ahora
        </a>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block rounded-xl border border-accent-500/40 px-8 py-4 font-semibold text-accent-300 transition-colors hover:border-accent-400/60 hover:text-accent-200"
        >
          Hablemos por WhatsApp · {site.whatsappNumber}
        </a>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-2xl border border-midnight-600/60 bg-midnight-800/40 p-6 transition-colors hover:border-accent-500/40"
        >
          <svg className="h-6 w-6 text-accent-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-2.6 3.2c-.1 0-.2 0-.4.1-.2.1-.4.5-.4 1 0 .5.4 1.7.8 2.性质l.2.3c.5.8 1.6 1.9 2.9 2.5.9.4 1.6.6 2.1.7.frame.argun..." />
          </svg>
          <p className="mt-4 text-sm text-slate-500">{site.whatsappLabel}</p>
          <p className="mt-1 text-sm font-medium text-slate-200 group-hover:text-accent-300">
            {site.whatsappNumber}
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
          <p className="mt-1 break-all text-sm font-medium text-slate-200 group-hover:text-accent-300">
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
        {site.location}
      </div>
    </Section>
  );
}
