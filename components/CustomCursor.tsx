"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const interactiveSelector =
  'a, button, input, textarea, [role="button"], .interactive-card, .interactive-button, .orbital-card';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const ringX = useSpring(pointerX, { stiffness: 260, damping: 24, mass: 0.7 });
  const ringY = useSpring(pointerY, { stiffness: 260, damping: 24, mass: 0.7 });
  const dotX = useSpring(pointerX, { stiffness: 700, damping: 40, mass: 0.3 });
  const dotY = useSpring(pointerY, { stiffness: 700, damping: 40, mass: 0.3 });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateEnabled = () => setEnabled(mediaQuery.matches);

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);

    return () => {
      mediaQuery.removeEventListener("change", updateEnabled);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
      setVisible(true);

      const target = event.target as Element | null;
      setInteractive(Boolean(target?.closest(interactiveSelector)));
    };

    const handleLeaveWindow = () => {
      setVisible(false);
      setInteractive(false);
    };

    const handleEnterWindow = () => {
      setVisible(true);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeaveWindow);
    window.addEventListener("blur", handleLeaveWindow);
    document.addEventListener("pointerenter", handleEnterWindow);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeaveWindow);
      window.removeEventListener("blur", handleLeaveWindow);
      document.removeEventListener("pointerenter", handleEnterWindow);
    };
  }, [enabled, pointerX, pointerY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden="true"
        className={`custom-cursor-ring ${visible ? "opacity-100" : "opacity-0"} ${
          interactive ? "custom-cursor-ring-active" : ""
        }`}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        aria-hidden="true"
        className={`custom-cursor-dot ${visible ? "opacity-100" : "opacity-0"} ${
          interactive ? "custom-cursor-dot-active" : ""
        }`}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
