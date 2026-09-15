import { ArrowUpIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-midnight-700/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
        <p className="font-mono text-xs">© 2026 hugarsan · diseñado y desarrollado con Next.js</p>
        <a
          href="#inicio"
          className="flex items-center gap-1.5 transition-colors hover:text-accent-400"
        >
          Volver arriba
          <ArrowUpIcon className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}