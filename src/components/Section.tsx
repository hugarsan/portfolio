import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  index: string;
  tag: string;
  title: ReactNode;
  children: ReactNode;
};

export default function Section({ id, index, tag, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24 py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 md:mb-16">
          <p className="mb-3 font-mono text-sm text-accent-400">
            <span className="text-slate-600">{index}.</span> {tag}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-slate-100 md:text-5xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}