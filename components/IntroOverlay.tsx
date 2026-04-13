"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function IntroOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center bg-black"
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.08, opacity: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-28 w-28 items-center justify-center rounded-full"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-white/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[12px] rounded-full border border-white/8"
              />
              {Array.from({ length: 14 }).map((_, index) => (
                <motion.span
                  key={index}
                  animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.9, 1.2, 0.9] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.08 }}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]"
                  style={{ transform: `rotate(${index * 25.7}deg) translateY(-44px)` }}
                />
              ))}
              <div className="absolute inset-[32px] rounded-full bg-[radial-gradient(circle_at_center,#090909_0%,#000_70%)]" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-center"
            >
              <p className="text-xs uppercase tracking-[0.5em] text-white/45">
                Initializing Experience
              </p>
              <p className="mt-3 text-lg font-semibold text-white/88">Majid Khan</p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
