"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { skillGroups } from "@/lib/data";
import { fadeUp, springHover, stagger } from "@/lib/motion";

export function Skills() {
  return (
    <section id="skills" className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading
        label="Skills"
        title="A futuristic toolkit shaped around frontend craft, backend systems, and immersive UI."
        description="Every skill area is presented like a system module: focused, measurable, and built to support production-ready experiences."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mt-14 grid gap-6 lg:grid-cols-3"
      >
        {skillGroups.map((group) => (
          <motion.div
            key={group.title}
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.01 }}
            whileTap={{ scale: 0.995 }}
            transition={springHover}
            className="interactive-card orbital-card cosmic-border glass-panel group rounded-[28px] p-7"
          >
            <h3 className="font-display text-[2rem] font-semibold tracking-[-0.05em] text-cosmic-white transition-transform duration-300 group-hover:translate-x-1">
              {group.title}
            </h3>
            <div className="mt-8 space-y-5">
              {group.items.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                >
                  <div className="mb-2 flex items-center justify-between text-sm text-white/70">
                    <span className="transition-colors duration-300 group-hover:text-white/82">{skill.name}</span>
                    <span className="text-cosmic-ember/80 transition-transform duration-300 group-hover:translate-x-1">{skill.level}%</span>
                  </div>
                  <div className="skill-track h-2.5 rounded-full bg-white/8">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-white via-[#ffb15f] to-[#ff8f2f] shadow-[0_0_18px_rgba(255,143,47,0.35)] transition-[filter,box-shadow] duration-300 group-hover:brightness-110 group-hover:shadow-[0_0_24px_rgba(255,143,47,0.45)]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
