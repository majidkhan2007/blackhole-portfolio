"use client";

import type { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { projects } from "@/lib/data";
import { fadeUp, springHover, stagger } from "@/lib/motion";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const rotateX = useSpring(useTransform(mouseY, [0, 100], [5, -5]), {
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 100], [-5, 5]), {
    stiffness: 120,
    damping: 20,
    mass: 0.8,
  });
  const glowX = useSpring(useTransform(mouseX, [0, 100], [-10, 10]), {
    stiffness: 110,
    damping: 22,
  });
  const glowY = useSpring(useTransform(mouseY, [0, 100], [-8, 8]), {
    stiffness: 110,
    damping: 22,
  });

  const spotlight = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(244, 208, 142, 0.14), transparent 34%)`;
  const aura = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255, 159, 67, 0.08), transparent 46%)`;

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePointerLeave = () => {
    mouseX.set(50);
    mouseY.set(50);
  };

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.995 }}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ rotateX, rotateY }}
      className="interactive-card cosmic-border glass-panel group flex h-full rounded-[32px] p-3"
    >
      <motion.div
        aria-hidden
        style={{ backgroundImage: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <motion.div
        aria-hidden
        style={{ backgroundImage: aura, x: glowX, y: glowY }}
        className="pointer-events-none absolute inset-0 blur-3xl opacity-60"
      />

      <div className="project-card-shell relative flex w-full flex-col overflow-hidden rounded-[28px] border border-white/10 px-5 py-5 md:px-6">
        <div className="project-card-grid pointer-events-none absolute inset-0 opacity-15 transition-opacity duration-500 group-hover:opacity-25" />
        <div className="project-card-noise pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-50" />

        <div className="project-card-layer relative flex items-start justify-between gap-4" style={{ ["--layer-depth" as string]: "16px" }}>
          <div className="min-w-0">
            <p className="font-display text-[0.65rem] uppercase tracking-[0.35em] text-cosmic-ember/70">
              Featured Build 0{index + 1}
            </p>
            <h3 className="mt-4 max-w-[10ch] font-display text-[2.1rem] font-semibold tracking-[-0.07em] text-cosmic-white leading-[0.95] md:text-[2.35rem]">
              {project.title}
            </h3>
          </div>
          <span className="project-pill shrink-0 rounded-full px-4 py-2 text-[0.68rem] uppercase tracking-[0.24em] text-white/50">
            Live Surface
          </span>
        </div>

        <motion.div
          className="project-preview project-card-layer relative mt-6 h-44 overflow-hidden rounded-[24px] border border-white/10"
          style={{ ["--layer-depth" as string]: "18px" }}
        >
          <motion.div
            aria-hidden
            style={{ x: glowX, y: glowY }}
            className="absolute -right-8 top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,159,67,0.22),transparent_68%)] blur-xl"
          />
          <motion.div
            aria-hidden
            style={{ x: glowX, y: glowY }}
            className="absolute -left-6 top-4 h-20 w-20 rounded-[28px] border border-[#ff9f43]/14 bg-white/[0.06] backdrop-blur-xl"
          />
          <div className="absolute right-5 top-5 flex gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="project-pill rounded-full px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-white/55">
                {tag}
              </span>
            ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
            <div className="max-w-[12rem]">
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-white/42">Experience</p>
              <p className="mt-2 font-display text-[1.35rem] leading-tight tracking-[-0.05em] text-white">Immersive interface system</p>
            </div>
            <div className="rounded-full border border-[#ff9f43]/20 bg-[#ff9f43]/10 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-white/80">
              Reactive
            </div>
          </div>
        </motion.div>

        <p
          className="project-card-layer relative mt-6 text-[1rem] leading-8 text-white/70"
          style={{ ["--layer-depth" as string]: "10px" }}
        >
          {project.description}
        </p>

        <div
          className="project-card-layer relative mt-6 flex flex-wrap gap-2"
          style={{ ["--layer-depth" as string]: "8px" }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="project-pill rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.18em] text-cosmic-ember/80"
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="project-card-layer relative mt-auto flex gap-3 pt-8"
          style={{ ["--layer-depth" as string]: "12px" }}
        >
          <motion.a
            href={project.links.demo}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={springHover}
            className="interactive-button rounded-full bg-gradient-to-r from-white via-[#ffb15f] to-[#ff8f2f] px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#1b1207] shadow-[0_12px_30px_rgba(255,143,47,0.22)]"
          >
            Live Demo
          </motion.a>
          <motion.a
            href={project.links.github}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={springHover}
            className="interactive-button rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white/75"
          >
            GitHub
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading
        label="Projects"
        title="Floating glass panels for work that balances engineering depth with cinematic execution."
                description="Each project card is treated like a cinematic product surface, with warm highlights and restrained depth inspired by the black-hole scene."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mt-14 grid gap-6 lg:grid-cols-3"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
