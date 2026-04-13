"use client";

import type { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { testimonials } from "@/lib/data";
import { fadeUp, springHover, stagger } from "@/lib/motion";

function TestimonialCard({
  item,
}: {
  item: (typeof testimonials)[number];
}) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const rotateX = useSpring(useTransform(mouseY, [0, 100], [4, -4]), {
    stiffness: 130,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 100], [-4, 4]), {
    stiffness: 130,
    damping: 20,
  });
  const glow = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(255, 159, 67, 0.16), transparent 34%)`;

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    mouseY.set(((event.clientY - bounds.top) / bounds.height) * 100);
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
      transition={springHover}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ rotateX, rotateY }}
      className="interactive-card orbital-card cosmic-border glass-panel group rounded-[26px] p-7"
    >
      <motion.div
        aria-hidden
        style={{ backgroundImage: glow }}
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <div className="relative mb-5 flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.06 }}
          className="h-14 w-14 rounded-full border border-[#f4d08e]/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,233,194,0.72),rgba(232,184,74,0.24),rgba(255,159,67,0.12))] shadow-[0_0_24px_rgba(232,184,74,0.16)]"
        />
        <div>
          <h3 className="font-display text-[1.55rem] font-semibold tracking-[-0.04em] text-cosmic-white">
            {item.name}
          </h3>
          <p className="text-sm text-white/45">{item.role}</p>
        </div>
      </div>
      <p className="relative text-[1.03rem] leading-9 text-white/70 transition-colors duration-300 group-hover:text-white/82">
        "{item.quote}"
      </p>
    </motion.article>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <SectionHeading
        label="Testimonials"
        title="Soft-floating reviews from people who value polish, clarity, and execution."
        description="These cards are treated like calm orbital modules to keep the social proof elegant instead of noisy."
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="mt-14 grid gap-6 lg:grid-cols-3"
      >
        {testimonials.map((item) => (
          <TestimonialCard key={item.name} item={item} />
        ))}
      </motion.div>
    </section>
  );
}
