"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export function SectionHeading({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeUp}
      className="max-w-3xl"
    >
      <p className="text-sm uppercase tracking-[0.35em] text-cosmic-ember/70">{label}</p>
      <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] text-cosmic-white md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-white/58">{description}</p>
      ) : null}
    </motion.div>
  );
}
