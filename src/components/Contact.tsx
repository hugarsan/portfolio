import { experience, site } from "@/lib/data";
import ContactComposer, { CopyEmail, MadridClock } from "@/components/ContactComposer";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/icons";

const current = experience.find((job) => job.current);

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, Icon: MailIcon, external: false },
  { label: "LinkedIn", value: "hugo-garcía-sánchez", href: site.linkedin, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: `@${site.username}`, href: site.github, Icon: GitHubIcon, external: true },
  { label: site.whatsappLabel, value: site.whatsappNumber, href: site.whatsappHref, Icon: PhoneIcon, external: true },
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
      <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col">
          <Reveal>
            <p className="font-display text-3xl font-bold leading-tight tracking-tight text-slate-100 md:text-5xl">
              LLMs, agentes, datos o una idea a medio cocinar:{" "}
              <span className="gradient-text">cuéntamela.</span>
            </p>
            <p className="mt-5 max-w-lg leading-7 text-slate-400">
              Contesto siempre. Escríbeme directamente o redacta el mensaje aquí al lado y se abrirá en tu correo.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-midnight-600/60 bg-midnight-800/40 p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Hora en Madrid</p>
              <p className="font-display mt-1 text-2xl font-bold text-slate-100">
                <MadridClock />
              </p>
            </div>
            <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-300/80">Ahora en</p>
              <p className="font-display mt-1 flex items-center gap-2 text-2xl font-bold text-slate-100">
                <span className="badge-dot h-2 w-2 rounded-full bg-emerald-400" />
                {current?.company}
              </p>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-8">
            <ul className="border-t border-midnight-700/70">
              {channels.map(({ label, value, href, Icon, external }) => (
                <li key={label} className="border-b border-midnight-700/70">
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group relative isolate flex items-center gap-4 overflow-hidden py-5"
                  >
                    <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-accent-500/15 via-violet-500/10 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                    <Icon className="h-5 w-5 shrink-0 text-slate-500 transition-colors group-hover:text-accent-300" />
                    <span className="font-display text-xl font-semibold text-slate-200 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white md:text-2xl">
                      {label}
                    </span>
                    <span className="ml-auto hidden truncate font-mono text-xs text-slate-500 sm:block">{value}</span>
                    <span className="text-xl text-slate-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-300">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-3 text-sm text-slate-500">
              <CopyEmail />
              <span className="font-mono text-xs">{site.location}</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <ContactComposer />
        </Reveal>
      </div>
    </Section>
  );
}
