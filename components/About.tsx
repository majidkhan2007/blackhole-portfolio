"use client";

import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { missionHighlights } from "@/lib/data";
import { fadeUp, springHover, stagger } from "@/lib/motion";
import { SectionHeading } from "@/components/SectionHeading";

function OrbitalAboutCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const rotateX = useSpring(useTransform(mouseY, [0, 100], [4, -4]), {
    stiffness: 120,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 100], [-4, 4]), {
    stiffness: 120,
    damping: 20,
  });
  const glow = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255, 159, 67, 0.16), transparent 36%)`;

  const handleMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    mouseY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  const handleLeave = () => {
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      transition={springHover}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY }}
      className={`interactive-card orbital-card cosmic-border glass-panel group ${className ?? ""}`}
    >
      <motion.div
        aria-hidden
        style={{ backgroundImage: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}

function HighlightIcon({ item }: { item: string }) {
  const baseClass = "h-5 w-5 stroke-white transition-transform duration-500 group-hover:scale-110 group-hover:stroke-[#ff9f43]";

  if (item === "Clean Code") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 8 4 12l4 4" />
        <path d="m16 8 4 4-4 4" />
        <path d="m14 4-4 16" />
      </svg>
    );
  }

  if (item === "Modern Stack") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4.5 7 12 11l7.5-4L12 3Z" />
        <path d="M4.5 12 12 16l7.5-4" />
        <path d="M4.5 17 12 21l7.5-4" />
      </svg>
    );
  }

  if (item === "Problem Solving") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={baseClass} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 9a2.5 2.5 0 1 1 5 0c0 1.4-.9 2-1.8 2.6-.8.5-1.2.9-1.2 1.9" />
        <path d="M12 17h.01" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" className={baseClass} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7.5A3.5 3.5 0 0 1 7.5 4h9A3.5 3.5 0 0 1 20 7.5v9a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5v-9Z" />
      <path d="m8 15 2.5-3 2 2 3.5-5" />
    </svg>
  );
}

export function About() {
  return (
    <motion.section
      id="about"
      initial="hidden"
      variants={fadeUp}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10"
    >
      <SectionHeading
        label="Mission Log"
        title="A developer focused on product clarity, interaction quality, and modern engineering."
        description="I build full stack experiences that feel as polished in motion as they are in code. My work blends premium UI craft, performance-aware frontend systems, and practical backend architecture."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <OrbitalAboutCard className="rounded-[28px] p-8 md:p-10">
          <div className="relative">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="relative text-[1.06rem] leading-9 text-white/64 transition-colors duration-300 group-hover:text-white/74">
            I care deeply about how software feels. Whether it&apos;s a landing page,
            dashboard, or product workflow, I focus on creating interfaces that are
            readable, responsive, and emotionally engaging without sacrificing technical depth.
            </p>
            <p className="relative mt-6 text-[1.06rem] leading-9 text-white/58 transition-colors duration-300 group-hover:text-white/70">
            My sweet spot is building visually ambitious web products with a production mindset:
            clean architecture, scalable components, thoughtful motion, and UI that leaves a lasting impression.
            </p>
          </div>
        </OrbitalAboutCard>

        <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2">
          {missionHighlights.map((item) => (
            <OrbitalAboutCard
              key={item}
              className="rounded-[24px] p-6"
            >
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.08))] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                  <HighlightIcon item={item} />
                </div>
                <h3 className="font-display text-[1.55rem] font-semibold tracking-[-0.04em] text-cosmic-white transition-transform duration-300 group-hover:translate-x-1">
                  {item}
                </h3>
                <p className="mt-3 text-sm leading-8 text-white/50 transition-colors duration-300 group-hover:text-white/64">
                Precision, structure, and polish applied to every detail of the product experience.
                </p>
                <div className="mt-5 h-px w-0 bg-gradient-to-r from-[#ff9f43]/70 to-transparent transition-[width] duration-500 group-hover:w-full" />
              </div>
            </OrbitalAboutCard>
          ))}
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
