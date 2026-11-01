"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";

const TOPICS = ["Oportunidad", "Proyecto", "Charlar de IA", "Otro"];

// Hora local en Madrid, para que se vea cuándo estoy despierto.
export function MadridClock() {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" });
    const tick = () => setNow(fmt.format(new Date()));
    const raf = requestAnimationFrame(tick);
    const t = window.setInterval(tick, 15_000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(t);
    };
  }, []);

  return <span className="tabular-nums">{now ?? "--:--"}</span>;
}

export function CopyEmail() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => navigator.clipboard?.writeText(site.email).then(() => setCopied(true))}
      className="rounded-lg border border-midnight-600 px-3 py-1.5 font-mono text-xs text-slate-400 transition-colors hover:border-accent-400/60 hover:text-accent-200"
    >
      {copied ? "✓ copiado" : "copiar email"}
    </button>
  );
}

// Redacta el mensaje aquí y lo abre en el correo o en WhatsApp del visitante (no se envía nada a ningún servidor).
export default function ContactComposer() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");

  const body = `${message.trim()}${name.trim() ? `\n\n— ${name.trim()}` : ""}`;
  const subject = `[hugarsan.dev] ${topic}${name.trim() ? ` · ${name.trim()}` : ""}`;
  const ready = message.trim().length > 0;

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const whatsapp = `https://wa.me/${site.whatsappHref.match(/wa\.me\/(\d+)/)?.[1] ?? ""}?text=${encodeURIComponent(`${topic}: ${body}`)}`;

  return (
    <form
      className="border-beam flex h-full flex-col rounded-3xl bg-midnight-900/85 backdrop-blur"
      onSubmit={(e) => {
        e.preventDefault();
        if (ready) window.location.href = mailto;
      }}
    >
      <div className="flex items-center gap-2 border-b border-midnight-700/80 px-5 py-3 font-mono text-xs text-slate-500">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-2">nuevo_mensaje.md</span>
        <span className="ml-auto text-slate-600">{message.length}/1000</span>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-5 md:p-6">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Tu nombre</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            autoComplete="name"
            placeholder="Ada Lovelace"
            className="mt-2 w-full border-b border-midnight-600 bg-transparent pb-2 text-slate-100 placeholder:text-slate-600 focus:border-accent-400 focus:outline-none"
          />
        </label>

        <fieldset>
          <legend className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Sobre qué</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {TOPICS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                aria-pressed={topic === t}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  topic === t
                    ? "border-accent-300 bg-accent-500/20 text-accent-100"
                    : "border-midnight-600 text-slate-400 hover:border-accent-500/50 hover:text-slate-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-1 flex-col">
          <span className="font-mono text-[11px] uppercase tracking-widest text-slate-500">Mensaje</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1000}
            rows={5}
            placeholder="Hola Hugo, me gustaría hablar contigo sobre…"
            className="mt-2 w-full flex-1 resize-none rounded-xl border border-midnight-600 bg-midnight-950/60 p-3 text-sm leading-6 text-slate-100 placeholder:text-slate-600 focus:border-accent-400 focus:outline-none"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={!ready}
            className="group relative inline-flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent-400 px-6 py-3.5 text-sm font-semibold text-midnight-950 shadow-[0_0_40px_-8px_rgba(56,189,248,0.8)] transition-all hover:shadow-[0_0_60px_-6px_rgba(56,189,248,1)] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-enabled:group-hover:translate-x-full" />
            <span className="relative">Abrir en mi correo</span>
            <span className="relative transition-transform group-enabled:group-hover:translate-x-1">→</span>
          </button>
          <a
            href={ready ? whatsapp : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!ready}
            className={`inline-flex items-center justify-center rounded-xl border px-6 py-3.5 text-sm font-semibold transition-colors ${
              ready
                ? "border-emerald-400/50 text-emerald-300 hover:bg-emerald-400/10"
                : "pointer-events-none border-midnight-600 text-slate-600"
            }`}
          >
            Enviar por WhatsApp
          </a>
        </div>
        <p className="font-mono text-[11px] text-slate-600">
          No se guarda nada: el mensaje se abre en tu propio correo o en WhatsApp.
        </p>
      </div>
    </form>
  );
}
