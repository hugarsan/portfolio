import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import HugoAICore from "@/components/HugoAICore";
import HugoChat from "@/components/HugoChat";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import PointerEffects from "@/components/PointerEffects";
import CommandPalette from "@/components/CommandPalette";

export default function Home() {
  return (
    <div className="site-glow">
      <PointerEffects />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <HugoAICore />
        <Contact />
      </main>
      <HugoChat />
      <CommandPalette />
      <Footer />
    </div>
  );
}