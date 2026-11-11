import NeuralLab from "@/components/NeuralLab";
import Reveal from "@/components/Reveal";
import Section from "@/components/Section";
import { site } from "@/lib/data";

export default function Lab() {
  return (
    <Section
      id="laboratorio"
      index="00"
      tag="laboratorio_en_vivo"
      title={
        <>
          Una red neuronal, <span className="gradient-text">en directo</span>
        </>
      }
    >
      <Reveal>
        <p className="max-w-2xl text-slate-400">
          Dibuja un número del 0 al 9. Una red que he entrenado desde cero, con backpropagation y Adam escritos a mano
          en numpy, lo reconoce mientras dibujas y te enseña qué neuronas se encienden. Todo ocurre en tu navegador: lo
          que dibujas no sale de tu pantalla.
        </p>
      </Reveal>
      <Reveal delay={120} className="mt-10">
        <NeuralLab />
      </Reveal>
      <Reveal delay={200}>
        <p className="mt-5 font-mono text-xs text-slate-500">
          {"// entrenamiento reproducible: "}
          <a
            href={`${site.github.replace(/\/$/, "")}/portfolio/blob/main/scripts/train-mnist.py`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-400 underline-offset-4 hover:underline"
          >
            scripts/train-mnist.py
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
