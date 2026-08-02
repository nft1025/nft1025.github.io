import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Chatbot } from "@/components/Chatbot";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Projects />
      <section className="grid gap-7 border-b border-[var(--border-soft)] px-8 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-14">
        <Skills />
        <Contact />
      </section>
      <footer className="px-8 py-7 text-center font-mono text-[11px] text-[var(--text-faint)] md:px-14">
        © 2026 NEIL FRANCIS A. TERESA — PORTFOLIO.
      </footer>
      <Chatbot />
    </main>
  );
}
