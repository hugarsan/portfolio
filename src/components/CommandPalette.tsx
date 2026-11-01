"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { projects, site } from "@/lib/data";

type Command = { id: string; group: string; label: string; hint?: string; run: () => void };

export const OPEN_PALETTE_EVENT = "hugarsan:open-palette";

const go = (hash: string) => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
const open = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

// Paleta de comandos (Ctrl/⌘ + K) para moverse por el portfolio con el teclado.
export default function CommandPalette() {
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const visibleRef = useRef(false);

  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  const commands: Command[] = useMemo(
    () => [
      { id: "inicio", group: "Ir a", label: "Inicio", run: () => go("#inicio") },
      { id: "sobre", group: "Ir a", label: "Sobre mí", run: () => go("#sobre-mi") },
      { id: "stack", group: "Ir a", label: "Habilidades", run: () => go("#habilidades") },
      { id: "proyectos", group: "Ir a", label: "Proyectos", run: () => go("#proyectos") },
      { id: "exp", group: "Ir a", label: "Experiencia · Stormbringer", run: () => go("#experiencia") },
      { id: "ai", group: "Ir a", label: "Explorar Hugo AI", run: () => go("#hugo-ai") },
      { id: "contacto", group: "Ir a", label: "Contacto", run: () => go("#contacto") },
      ...projects.map((p) => ({
        id: `p-${p.name}`,
        group: "Proyectos",
        label: p.name,
        hint: p.tag,
        run: () => go("#proyectos"),
      })),
      {
        id: "cv",
        group: "Acciones",
        label: "Descargar CV",
        hint: "PDF",
        run: () => {
          const a = document.createElement("a");
          a.href = site.cv;
          a.download = "";
          a.click();
        },
      },
      {
        id: "email",
        group: "Acciones",
        label: "Copiar email",
        hint: site.email,
        run: () => {
          navigator.clipboard?.writeText(site.email).then(
            () => setToast("Email copiado"),
            () => setToast(site.email),
          );
        },
      },
      { id: "mail", group: "Acciones", label: "Enviar un email", run: () => (window.location.href = `mailto:${site.email}`) },
      { id: "wa", group: "Enlaces", label: "WhatsApp", hint: site.whatsappNumber, run: () => open(site.whatsappHref) },
      { id: "li", group: "Enlaces", label: "LinkedIn", run: () => open(site.linkedin) },
      { id: "gh", group: "Enlaces", label: "GitHub", hint: site.username, run: () => open(site.github) },
    ],
    [],
  );

  const results = useMemo(() => {
    const q = norm(query.trim());
    if (!q) return commands;
    return commands.filter((c) => norm(`${c.group} ${c.label} ${c.hint ?? ""}`).includes(q));
  }, [commands, query]);

  useEffect(() => {
    const show = () => {
      setQuery("");
      setActive(0);
      setVisible(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (visibleRef.current) setVisible(false);
        else show();
      } else if (e.key === "Escape") setVisible(false);
    };
    const onOpen = show;
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(t);
  }, [toast]);

  const runCommand = (c: Command) => {
    setVisible(false);
    c.run();
  };

  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 z-[90] flex items-start justify-center bg-midnight-950/70 px-4 pt-[14vh] backdrop-blur-sm"
          onClick={() => setVisible(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Paleta de comandos"
            onClick={(e) => e.stopPropagation()}
            className="border-beam w-full max-w-xl animate-[fade-up_0.25s_ease_both] overflow-hidden rounded-2xl bg-midnight-900/95 shadow-[0_30px_100px_-20px_rgba(56,189,248,0.4)]"
          >
            <div className="flex items-center gap-3 border-b border-midnight-700 px-4">
              <span className="font-mono text-accent-400">›</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive((a) => Math.min(a + 1, results.length - 1));
                  } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive((a) => Math.max(a - 1, 0));
                  } else if (e.key === "Enter" && results[active]) {
                    runCommand(results[active]);
                  }
                }}
                placeholder="Busca una sección, proyecto o acción…"
                aria-label="Buscar comando"
              maxLength={200}
                className="h-14 flex-1 bg-transparent font-mono text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
              <kbd className="rounded border border-midnight-600 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">ESC</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto p-2" role="listbox">
              {results.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-500">Sin resultados</li>}
              {results.map((c, i) => (
                <li key={c.id} role="option" aria-selected={i === active}>
                  {(i === 0 || results[i - 1].group !== c.group) && (
                    <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-widest text-slate-600">{c.group}</p>
                  )}
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onClick={() => runCommand(c)}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active ? "bg-accent-500/15 text-accent-200" : "text-slate-300"
                    }`}
                  >
                    <span>{c.label}</span>
                    {c.hint && <span className="truncate font-mono text-xs text-slate-500">{c.hint}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {toast && (
        <div className="fixed bottom-20 left-1/2 z-[95] -translate-x-1/2 animate-[fade-up_0.25s_ease_both] rounded-full border border-emerald-400/40 bg-midnight-900/95 px-4 py-2 font-mono text-xs text-emerald-300">
          {toast}
        </div>
      )}
    </>
  );
}
