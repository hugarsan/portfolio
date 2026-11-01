import { site } from "@/lib/data";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: MailIcon, external: false },
  { label: site.whatsappLabel, value: site.whatsappNumber, href: site.whatsappHref, Icon: PhoneIcon, external: true },
  { label: "LinkedIn", value: "hugo-garcía-sánchez", href: site.linkedin, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: site.username, href: site.github, Icon: GitHubIcon, external: true },
];

export default function Contact() {
  return (
    <Section
      id="contacto"
      index="06"
      tag="contacto"
      title={
        <>
          ¿Hablamos <span className="gradient-text">de IA?</span>
        </>
      }
    >
      <Reveal className="border-beam relative overflow-hidden rounded-[2rem] bg-midnight-900/70 px-6 py-16 text-center md:px-16 md:py-20">
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent-500/20 blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/20 blur-[100px]"
          aria-hidden="true"
        />
        <div className="grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative">
          <p className="font-mono text-sm text-accent-400">{"> conexión abierta_"}</p>
          <p className="font-display mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-slate-100 md:text-5xl">
            Si te interesa la IA aplicada, los LLMs o los datos,{" "}
            <span className="gradient-text">me encantará charlar.</span>
          </p>
          <p className="mx-auto mt-6 max-w-xl leading-7 text-slate-400">
            Escríbeme por email o WhatsApp para hablar de tecnología, proyectos o colaboraciones: contesto siempre.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${site.email}`}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent-400 px-8 py-4 font-semibold text-midnight-950 shadow-[0_0_50px_-8px_rgba(56,189,248,0.8)] transition-shadow hover:shadow-[0_0_70px_-6px_rgba(56,189,248,1)] sm:w-auto"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <MailIcon className="relative h-5 w-5" />
              <span className="relative">Escríbeme ahora</span>
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-accent-500/40 bg-midnight-950/50 px-8 py-4 font-semibold text-accent-300 transition-colors hover:border-accent-300 hover:text-accent-200 sm:w-auto"
            >
              <PhoneIcon className="h-5 w-5" />
              WhatsApp · {site.whatsappNumber}
            </a>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map(({ label, value, href, Icon, external }, i) => (
          <Reveal key={label} delay={i * 80}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="spotlight group flex h-full flex-col rounded-3xl border border-midnight-600/60 bg-midnight-800/40 p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <Icon className="h-6 w-6 text-accent-400" />
                <span className="text-slate-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-300">
                  ↗
                </span>
              </div>
              <p className="mt-5 text-sm text-slate-500">{label}</p>
              <p className="mt-1 break-all text-sm font-medium text-slate-200 group-hover:text-accent-300">{value}</p>
            </a>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
        <MapPinIcon className="h-4 w-4 text-accent-400" />
        {site.location}
      </div>
    </Section>
  );
}
