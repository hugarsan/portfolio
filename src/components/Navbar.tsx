"use client";

import { useEffect, useState } from "react";
import { MenuIcon, XIcon } from "@/components/icons";

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-midnight-600/50 bg-midnight-950/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#inicio" className="font-mono text-lg font-semibold text-slate-100">
          hugarsan
          <span className="ml-0.5 inline-block h-4 w-2 animate-[blink_1s_steps(1)_infinite] bg-accent-400" />
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-accent-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="rounded-lg border border-accent-500/40 px-4 py-1.5 text-sm text-accent-300 transition-colors hover:bg-accent-500/10"
          >
            Contratar
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-slate-300 transition-colors hover:text-accent-400 md:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-midnight-600/50 bg-midnight-950/95 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-slate-300 transition-colors hover:bg-midnight-800 hover:text-accent-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}