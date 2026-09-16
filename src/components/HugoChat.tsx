"use client";

import { useState } from "react";

import { chat } from "@/lib/data";

type Message = { role: "user" | "bot"; text: string };

function replyFor(input: string): string {
  const q = input.toLowerCase();

  if (/(quien es|quién es|presenta|biograf)/.test(q)) {
    return "Hugo es un ingeniero especializado en inteligencia artificial, análisis de datos y desarrollo de software. Vive en Extremadura, España.";
  }

  if (/(experiencia|trabajo|curriculum)/.test(q)) {
    return "Hugo tiene experiencia como AI Engineer en Talentum Startups / AIR Institute y como desarrollador. Échale un vistazo a la sección Experiencia.";
  }

  if (/(proyecto|desarroll)/.test(q)) {
    return "Proyectos destacados: DetectIA (detección de noticias falsas con IA), Rutas de datos optimizadas (VRP) y códigos convolucionales con Viterbi. Explora la sección Proyectos.";
  }

  if (/(tecnolog|stack|herramienta)/.test(q)) {
    return "Trabaja con Python, TypeScript, Next.js, React, FastAPI, Docker, XGBoost, LSTM y transformers (BETO). Detalle en Habilidades.";
  }

  if (/(contacto|contactar|email|mail|escribir)/.test(q)) {
    return "Puedes escribirle a través de la sección Contacto del portfolio. ¡Gracias por tu interés!";
  }

  return chat.fallback;
}

export default function HugoChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: replyFor(text) }]);
    }, 350);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div className="mb-3 flex w-[min(90vw,22rem)] flex-col overflow-hidden rounded-2xl border border-midnight-600/50 bg-midnight-950/95 shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-midnight-600/50 px-4 py-3">
            <p className="font-mono text-xs font-semibold tracking-wide text-slate-100">
              <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-accent-400" />
              {chat.displayName}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-400 transition-colors hover:text-accent-400"
              aria-label="Cerrar chat"
            >
              ✕
            </button>
          </div>

          <div className="max-h-72 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <p className="rounded-xl rounded-bl-sm border border-midnight-600/40 bg-midnight-800/60 px-3 py-2 text-sm leading-relaxed text-slate-300">
                {chat.greeting}
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-line rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto rounded-br-sm border border-accent-500/30 bg-accent-500/15 text-accent-100"
                    : "rounded-bl-sm border border-midnight-600/40 bg-midnight-800/60 text-slate-300"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {chat.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setMessages((prev) => [...prev, { role: "user", text: s }]);
                    window.setTimeout(() => {
                      setMessages((prev) => [
                        ...prev,
                        { role: "bot", text: replyFor(s) },
                      ]);
                    }, 350);
                  }}
                  className="rounded-full border border-midnight-600/50 px-3 py-1 text-xs text-slate-400 transition-colors hover:border-accent-500/40 hover:text-accent-300"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex items-center gap-2 border-t border-midnight-600/50 px-3 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={chat.placeholders[0]}
              aria-label="Pregunta a Hugo AI"
              className="min-w-0 flex-1 rounded-lg border border-midnight-600/50 bg-midnight-900/60 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:border-accent-500/50 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-lg bg-accent-500/15 px-3 py-2 text-sm font-medium text-accent-300 transition-colors hover:bg-accent-500/25"
            >
              Enviar
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar Hugo AI" : "Abrir Hugo AI"}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-accent-500/40 bg-midnight-950/90 text-accent-300 shadow-lg backdrop-blur transition-transform hover:scale-105"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M4 5h16v11H8l-4 4V5Z" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
