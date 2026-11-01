import NeuralNebula from "@/components/NeuralNebula";
import Reveal from "@/components/Reveal";
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
      <Reveal>
        <p className="max-w-2xl text-slate-400">{aiCore.subtitle}</p>
      </Reveal>
      <Reveal delay={120} className="mt-10">
        <NeuralNebula />
      </Reveal>
    </Section>
  );
}
