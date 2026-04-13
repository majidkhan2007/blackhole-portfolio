"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHidden(true), 2500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <motion.div
      animate={{
        opacity: hidden ? 0 : 1,
        scale: hidden ? 1.25 : 1,
        pointerEvents: hidden ? "none" : "auto",
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(56,24,10,0.5),rgba(12,6,3,0.92)_45%,#000_100%)]"
    >
      <div className="relative flex flex-col items-center gap-7">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="relative flex h-36 w-36 items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border border-[#ffb15f]/20" />
          <div className="absolute inset-[14px] rounded-full border border-[#ff8f2f]/35" />
          <div className="absolute inset-[28px] rounded-full border border-[#ff9f43]/20" />
          <div className="absolute inset-[42px] rounded-full bg-[radial-gradient(circle_at_center,#120804_0%,#000_65%)] shadow-[0_0_30px_rgba(0,0,0,0.8)]" />
          {Array.from({ length: 24 }).map((_, index) => (
            <motion.span
              key={index}
              animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.2, 0.9] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: index * 0.06,
                ease: "easeInOut",
              }}
              className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]"
              style={{ transform: `rotate(${index * 15}deg) translateY(-56px)` }}
            />
          ))}
        </motion.div>

        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.45em] text-[#ff9f43]/60">
            Entering Event Horizon
          </p>
          <div className="mx-auto mt-4 h-px w-28 overflow-hidden rounded-full bg-white/10">
            <motion.span
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="block h-full w-1/2 bg-gradient-to-r from-transparent via-[#ff9f43] to-transparent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
