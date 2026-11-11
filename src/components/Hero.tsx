import type { CSSProperties } from "react";
import { hero, site, skills } from "@/lib/data";
import CountUp from "@/components/CountUp";
import HeroTerminal from "@/components/HeroTerminal";
import Magnetic from "@/components/Magnetic";
import NeuralField from "@/components/NeuralField";
import Scramble from "@/components/Scramble";
import TypedRoles from "@/components/TypedRoles";
import { DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons";

// Las animaciones arrancan cuando se abre el telón de la intro (--intro-delay lo fija la intro).
const FADE = "animate-[fade-up_0.9s_cubic-bezier(0.22,1,0.36,1)_both]";
const delay = (step: number): CSSProperties => ({
  animationDelay: `calc(var(--intro-delay, 1900ms) + ${300 + step * 110}ms)`,
});

const marqueeItems = skills.categories.flatMap((category) => category.items);

const heroStats = [
  { value: "90,64%", label: "accuracy · DetectIA" },
  { value: "60K+", label: "noticias analizadas" },
  { value: "8,19", label: "nota media del grado" },
  { value: "3", label: "idiomas" },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen flex-col overflow-hidden pt-16">
      {/* Fondo: auroras, red neuronal, rejilla y rejilla iluminada por el cursor */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="aurora left-[5%] top-[10%] h-[34rem] w-[34rem] bg-accent-500/25" />
        <div className="aurora right-[0%] top-[30%] h-[30rem] w-[30rem] bg-violet-600/25 [animation-delay:-6s]" />
        <div className="aurora bottom-[-10%] left-[35%] h-[26rem] w-[26rem] bg-cyan-400/15 [animation-delay:-12s]" />
      </div>
      <NeuralField className="absolute inset-0 h-full w-full" />
      <div className="grid-overlay pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="grid-spot pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-midnight-950 to-transparent"
        aria-hidden="true"
      />

      <div className="pointer-events-none relative z-10 mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 items-center gap-16 px-6 py-14 lg:grid-cols-[1.2fr_1fr]">
        <div className="pointer-events-auto min-w-0">
          <a
            href="#experiencia"
            style={delay(0)}
            className={`${FADE} group inline-flex max-w-full items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 py-1.5 pl-2 pr-4 font-mono text-xs text-emerald-200 backdrop-blur transition-colors hover:border-emerald-300/60`}
          >
            <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
              Ahora
            </span>
            <span className="badge-dot inline-block h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
            <span className="truncate">{hero.badge}</span>
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>

          <p style={delay(1)} className={`${FADE} mt-8 font-mono text-sm text-accent-400`}>
            {"// hola, soy"}
          </p>
          <h1 className="font-display mt-3 text-[3.6rem] font-bold leading-[0.92] tracking-tighter text-slate-100 sm:text-7xl md:text-8xl lg:text-[7.2rem]">
            <Scramble text="Hugo" afterIntro delay={100} duration={700} className="block" />
            <Scramble
              text="García"
              afterIntro
              delay={350}
              duration={900}
              className="block drop-shadow-[0_0_40px_rgba(56,189,248,0.35)]"
              charClassName="gradient-letter"
            />
          </h1>

          <p
            style={delay(3)}
            className={`${FADE} mt-7 min-h-[3.5rem] font-mono text-base font-semibold text-slate-100 sm:min-h-[2.5rem] sm:text-lg md:text-2xl`}
          >
            <span className="mr-3 text-slate-500">$</span>
            <TypedRoles roles={hero.roles} />
          </p>

          <p style={delay(4)} className={`${FADE} mt-5 max-w-xl text-base leading-7 text-slate-400 md:text-lg`}>
            {hero.description}
          </p>

          <div style={delay(5)} className={`${FADE} mt-9 flex flex-col gap-3 sm:flex-row sm:items-center`}>
            <Magnetic>
              <a
                href={site.cv}
                download
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent-400 px-7 py-3.5 text-sm font-semibold text-midnight-950 shadow-[0_0_40px_-8px_rgba(56,189,248,0.7)] transition-shadow hover:shadow-[0_0_60px_-6px_rgba(56,189,248,0.95)] sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <DownloadIcon className="relative h-4 w-4" />
                <span className="relative">Descargar CV</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#laboratorio"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-7 py-3.5 text-center text-sm font-semibold text-emerald-200 backdrop-blur transition-colors hover:border-emerald-300/70 hover:text-emerald-100"
              >
                <span className="badge-dot inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Probar la IA en vivo
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contacto"
                className="block rounded-xl border border-midnight-600 bg-midnight-900/60 px-7 py-3.5 text-center text-sm font-semibold text-slate-200 backdrop-blur transition-colors hover:border-accent-500/50 hover:text-accent-300"
              >
                Hablemos
              </a>
            </Magnetic>
          </div>

          <div style={delay(6)} className={`${FADE} mt-8 flex items-center gap-5 text-slate-500`}>
            <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="transition-colors hover:text-accent-400">
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-accent-400">
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a href={`mailto:${site.email}`} aria-label="Email" className="transition-colors hover:text-accent-400">
              <MailIcon className="h-5 w-5" />
            </a>
            <span className="h-px w-10 bg-midnight-600" />
            <span className="font-mono text-xs">{site.location}</span>
            <span className="ml-auto hidden items-center gap-1.5 font-mono text-[11px] text-slate-600 md:flex">
              <kbd className="rounded border border-midnight-600 bg-midnight-900 px-1.5 py-0.5 text-slate-400">Ctrl</kbd>
              <kbd className="rounded border border-midnight-600 bg-midnight-900 px-1.5 py-0.5 text-slate-400">K</kbd>
              para navegar
            </span>
          </div>
        </div>

        <div style={delay(3)} className={`${FADE} pointer-events-auto hidden lg:block`}>
          <HeroTerminal startDelay={1900} />
        </div>
      </div>

      <div style={delay(7)} className={`${FADE} relative z-10 mx-auto w-full max-w-6xl px-6 pb-10`}>
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-midnight-700/70 bg-midnight-950/50 backdrop-blur md:grid-cols-4">
          {heroStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col px-5 py-4 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} ${
                i === 2 ? "md:border-l" : ""
              } border-midnight-700/70`}
            >
              <dt className="order-2 mt-1 text-[11px] uppercase tracking-wider text-slate-500">{stat.label}</dt>
              <dd className="gradient-text font-display order-1 text-2xl font-bold md:text-3xl">
                <CountUp value={stat.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#sobre-mi"
        aria-label="Bajar"
        className="relative z-10 mx-auto mb-6 hidden h-9 w-5 justify-center rounded-full border border-slate-600 pt-1.5 transition-colors hover:border-accent-400 md:flex"
      >
        <span className="h-2 w-1 animate-[scroll-dot_1.6s_ease-in_infinite] rounded-full bg-accent-400" />
      </a>

      <div className="marquee relative z-10 overflow-hidden border-y border-midnight-700/60 bg-midnight-950/60 py-4 backdrop-blur" aria-hidden="true">
        <div className="marquee-track flex w-max gap-10 pr-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10 whitespace-nowrap font-mono text-sm text-slate-500">
              {item}
              <span className="text-accent-500/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
