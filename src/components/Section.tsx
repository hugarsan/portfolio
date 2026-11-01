import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

type SectionProps = {
  id: string;
  index: string;
  tag: string;
  title: ReactNode;
  children: ReactNode;
};

export default function Section({ id, index, tag, title, children }: SectionProps) {
  return (
    <section id={id} className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="relative mb-12 md:mb-16">
          <span
            className="outline-text font-display pointer-events-none absolute -top-10 right-0 select-none text-[7rem] font-bold leading-none md:-top-16 md:text-[11rem]"
            aria-hidden="true"
          >
            {index}
          </span>
          <p className="mb-4 flex items-center gap-3 font-mono text-sm text-accent-400">
            <span className="h-px w-8 bg-gradient-to-r from-accent-400 to-transparent" />
            <span className="text-slate-600">{index}.</span> {tag}
          </p>
          <h2 className="font-display relative text-4xl font-bold tracking-tight text-slate-100 md:text-6xl">
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
