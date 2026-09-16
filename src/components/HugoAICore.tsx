import NeuralNebula from "@/components/NeuralNebula";
import Section from "@/components/Section";
import { aiCore } from "@/lib/data";

export default function HugoAICore() {
  return (
    <Section
      id="hugo-ai"
      index={aiCore.sectionIndex}
      tag={aiCore.sectionTag}
      title={
        <>
          Explora <span className="gradient-text">Hugo AI</span>
        </>
      }
    >
      <p className="max-w-2xl text-slate-400">{aiCore.subtitle}</p>
      <div className="mt-10 overflow-hidden rounded-2xl border border-midnight-600/60 bg-midnight-900/40">
        <NeuralNebula className="aspect-[16/9] w-full md:aspect-[21/9]" />
      </div>
    </Section>
  );
}
