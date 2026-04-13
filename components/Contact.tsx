"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { fadeUp, springHover, stagger } from "@/lib/motion";

export function Contact() {
  return (
    <section id="contact" className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading
        label="Contact"
        title="A futuristic transmission panel for collaboration, opportunities, and product work."
        description="Reach out through direct channels or send a project brief through the glass interface below."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <motion.div variants={fadeUp} whileHover={{ y: -6 }} transition={springHover} className="interactive-card cosmic-border glass-panel rounded-[30px] p-8">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cosmic-ember/65">Email</p>
              <a href="mailto:psychomajid04@gmail.com" className="mt-2 block text-xl text-white/82 hover:text-white">
                psychomajid04@gmail.com
              </a>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cosmic-ember/65">GitHub</p>
              <a href="https://github.com/majidkhan2007" className="mt-2 block text-xl text-white/82 hover:text-white">
                github.com/majidkhan
              </a>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cosmic-ember/65">LinkedIn</p>
              <a href="https://www.linkedin.com/in/majid-khan-6045b73b7/" className="mt-2 block text-xl text-white/82 hover:text-white">
                linkedin.com/in/majidkhan
              </a>
            </div>
          </div>
        </motion.div>

        <motion.form variants={stagger} whileHover={{ y: -6 }} transition={springHover} className="interactive-card cosmic-border glass-panel rounded-[30px] p-8">
          <motion.div variants={fadeUp} className="grid gap-4">
            <input
              placeholder="Your Name"
              className="field-input rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-white/30"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="field-input rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-white/30"
            />
            <textarea
              rows={6}
              placeholder="Tell me about your project"
              className="field-input resize-none rounded-[22px] border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-white/30"
            />
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springHover}
              className="interactive-button animate-pulseGlow mt-2 rounded-2xl bg-gradient-to-r from-white via-[#ffb15f] to-[#ff8f2f] px-6 py-4 text-base font-semibold text-[#1b1207]"
            >
              Initiate Transmission
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
}
