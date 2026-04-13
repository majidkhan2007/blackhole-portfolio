"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { blogPosts } from "@/lib/data";
import { fadeUp, springHover, stagger } from "@/lib/motion";

export function Blog() {
  return (
    <section id="blog" className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading
        label="Blog"
        title="Thoughts on motion, interface systems, and building for the modern web."
        description="Short-form writing cards that feel like editorial modules inside the same visual universe."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mt-14 grid gap-6 lg:grid-cols-3"
      >
        {blogPosts.map((post) => (
          <motion.article
            key={post.title}
            variants={fadeUp}
            whileHover={{ y: -10, scale: 1.015 }}
            whileTap={{ scale: 0.995 }}
            transition={springHover}
            className="interactive-card cosmic-border glass-panel rounded-[26px] p-7"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.26em] text-cosmic-ember/65">
              <span>{post.tag}</span>
              <span>{post.readingTime}</span>
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-cosmic-white">
              {post.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/58">{post.description}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
