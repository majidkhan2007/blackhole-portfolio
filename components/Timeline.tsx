"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/lib/data";
import { fadeUp, springHover } from "@/lib/motion";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="timeline" ref={containerRef} className="relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={fadeUp}
        className="flex flex-col items-center text-center"
      >
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#ff9f43]">
          TRAJECTORY
        </p>
        <h2 className="mt-4 text-balance text-4xl font-bold tracking-tight text-white md:text-5xl">
          Journey Timeline
        </h2>
      </motion.div>

      <div className="relative mx-auto mt-20 max-w-5xl">
        {/* Fixed Horizontal Reference Points for Positioning */}
        {/* Static Background Line */}
        <div className="absolute bottom-0 left-[35px] top-0 w-px -translate-x-1/2 bg-white/5 md:left-1/2" />
        
        {/* Animated Progress Line */}
        <motion.div 
          style={{ scaleY, originY: 0, x: "-50%" }}
          className="absolute bottom-0 left-[35px] top-0 w-px bg-gradient-to-b from-[#ff9f43] to-transparent md:left-1/2" 
        />

        <div className="space-y-12 md:space-y-24">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.article
                key={item.year}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }
                  }
                }}
                className={`relative flex flex-col items-start md:items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content Card Wrapper */}
                <div
                  className={`relative z-10 w-full pl-[70px] md:w-1/2 md:pl-0 ${
                    isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
                  }`}
                >
                  <motion.div
                    whileHover={{ 
                      y: -8, 
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="interactive-card cosmic-border glass-panel group rounded-[16px] bg-[#0c0c0c]/80 p-7 md:p-8 cursor-pointer"
                  >
                    <motion.h2 
                      variants={{ hidden: { opacity: 0, x: isEven ? 10 : -10 }, visible: { opacity: 1, x: 0 } }}
                      className="text-3xl font-bold text-[#ff9f43] transition-colors group-hover:text-[#ffb36b]"
                    >
                      {item.year}
                    </motion.h2>
                    <motion.h3 
                      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                      className="mt-3 text-xl font-bold leading-snug text-white"
                    >
                      {item.title}
                    </motion.h3>
                    <motion.p 
                      variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                      className="mt-3 text-sm leading-relaxed text-white/50"
                    >
                      {item.description}
                    </motion.p>
                    
                    <div className="absolute inset-0 bg-[#ff9f43]/0 group-hover:bg-[#ff9f43]/[0.02] transition-colors pointer-events-none rounded-[16px]" />
                  </motion.div>
                </div>

                {/* Timeline Marker (Stable Centering) */}
                <motion.div 
                  initial={{ x: "-50%", scale: 1 }}
                  whileHover={{ scale: 1.3, x: "-50%" }}
                  whileTap={{ scale: 0.9, x: "-50%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute left-[35px] z-20 flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-full border border-[#ff9f43]/20 bg-[#0a0a0a] shadow-[0_0_30px_rgba(255,159,67,0.1)] md:left-1/2 hover:border-[#ff9f43]/50 hover:shadow-[0_0_40px_rgba(255,159,67,0.2)] overflow-visible"
                >
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.2, 1],
                      boxShadow: [
                        "0 0 12px #ff9f43", 
                        "0 0 24px #ff9f43", 
                        "0 0 12px #ff9f43"
                      ] 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="h-2.5 w-2.5 rounded-full bg-[#ff9f43]" 
                  />
                  
                  {/* Orbit Ring */}
                  <div className="absolute inset-1 rounded-full border border-[#ff9f43]/0 group-hover:border-[#ff9f43]/20 scale-0 group-hover:scale-100 transition-all duration-500" />
                </motion.div>

                {/* Empty Spacer for Desktop */}
                <div className="hidden w-1/2 md:block" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
