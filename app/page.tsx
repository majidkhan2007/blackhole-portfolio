import { About } from "@/components/About";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IntroOverlay } from "@/components/IntroOverlay";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { ScrollReset } from "@/components/ScrollReset";
import { SectionParticles } from "@/components/SectionParticles";
import { Skills } from "@/components/Skills";
import { Testimonials } from "@/components/Testimonials";
import { Timeline } from "@/components/Timeline";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-white">
      <IntroOverlay />
      <ScrollReset />
      <div className="pointer-events-none fixed inset-0 z-30 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_18%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.02),transparent_22%)]" />
      <Navbar />
      <Hero />
      <div className="relative z-20 w-full rounded-t-[3rem] bg-background shadow-[0_-20px_60px_rgba(0,0,0,0.8)] border-t border-white/5 md:rounded-t-[4rem]">
        <div className="relative isolate">
          <SectionParticles />
          <div className="relative z-10">
            <About />
            <Skills />
            <Projects />
            <Timeline />
            <Blog />
            <Testimonials />
            <Contact />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
