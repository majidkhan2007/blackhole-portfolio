"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { springHover } from "@/lib/motion";

const codingInsights = [
  "Small functions are easier to test, reuse, and trust.",
  "Clear variable names prevent bugs before they happen.",
  "Ship the simple solution first, then optimize with data.",
  "Readable code usually outlives clever code.",
  "Strong components start with an obvious API.",
  "Good error states are part of product design.",
  "Refactor when logic becomes harder to explain than to write.",
  "Consistency in naming makes teams build faster.",
  "useEffect(() => loadData(), []) runs after the first paint.",
  "useState is simple, but good state names matter even more.",
  "Extract repeated JSX before the UI becomes hard to scan.",
  "A prop should explain intent, not implementation detail.",
  "React keys should be stable, not generated during render.",
  "const [open, setOpen] = useState(false) is clearer than vague state.",
  "Handle loading, empty, and error states before polishing animations.",
  "Split big components when one file starts doing too many jobs.",
  "Memoization helps only when you can prove rerenders are expensive.",
  "Prefer derived state over duplicating the same value twice.",
  "A clean folder structure is a speed feature for teams.",
  "Write code for the next reader, even if that reader is you.",
  "useRef stores values without forcing a rerender.",
  "Good UI feels fast when state changes are predictable.",
  "Break complex logic into helpers before adding more conditions.",
  "Reusable code is useful only when reuse stays easy to understand.",
  "Name handlers by action: handleSubmit beats handleClickTwo.",
  "A custom hook is great when logic repeats across components.",
  "Default states should make the first render feel complete.",
  "If styling is hard to maintain, the component may be too broad.",
  "Build the happy path first, then protect the edge cases.",
  "startTransition helps when updates should feel less blocking.",
  "Keep side effects separate from pure rendering logic.",
  "A smaller API surface usually creates a better component.",
];

function shuffleInsightOrder(length: number) {
  const order = Array.from({ length }, (_, index) => index);

  for (let index = order.length - 1; index > 1; index -= 1) {
    const swapIndex = 1 + Math.floor(Math.random() * index);
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }

  return order;
}

function MagneticButton({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate3d(${x * 0.12}px, ${y * 0.14}px, 0) scale(1.04)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0) scale(1)";
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`interactive-button ${className}`}
    >
      {children}
    </a>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeInsightPosition, setActiveInsightPosition] = useState(0);
  const [insightOrder, setInsightOrder] = useState(() => Array.from({ length: codingInsights.length }, (_, index) => index));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Smooth the raw scroll progress — eliminates jank/stutter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // --- GPU-safe transforms only (opacity + scale, NO blur) ---
  // Video scale: subtle zoom as you scroll
  const videoScale = useTransform(smoothProgress, [0, 1], [1, 1.18]);

  // Whole hero fades out as you scroll — NO blur, much cheaper
  const heroOpacity = useTransform(smoothProgress, [0.25, 0.75], [1, 0]);

  // Dark overlay intensifies as you scroll
  const overlayOpacity = useTransform(smoothProgress, [0, 0.7], [0.08, 0.92]);

  // Text fades and shrinks slightly — NO blur
  const textOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const textScale  = useTransform(smoothProgress, [0, 0.3], [1, 0.92]);

  useEffect(() => {
    setInsightOrder(shuffleInsightOrder(codingInsights.length));

    const timer = window.setInterval(() => {
      setActiveInsightPosition((current) => {
        const next = current + 1;

        if (next >= codingInsights.length) {
          setInsightOrder(shuffleInsightOrder(codingInsights.length));
          return 0;
        }

        return next;
      });
    }, 10000);

    return () => window.clearInterval(timer);
  }, []);

  const activeInsight = codingInsights[insightOrder[activeInsightPosition] ?? 0];

  return (
    <section ref={sectionRef} id="home" className="relative h-[150vh]">
      {/* Fixed background layer — GPU composited via will-change */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="fixed inset-0 z-0 h-screen w-full overflow-hidden"
      >
        {/* Video — scaled independently for parallax feel */}
        <motion.div
          style={{ scale: videoScale }}
          className="absolute inset-0 will-change-transform"
        >
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="https://res.cloudinary.com/dtoddppoy/video/upload/v1775490564/Interstellar_Gargantua__black_hole_4K_live_wallpaper_for_free_windows_7_8_10_11_2160p60_wq4wx0.webm"
              type="video/webm"
            />
          </video>
        </motion.div>

        {/* Static vignette layers — no animation, no cost */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,220,170,0.08),transparent_22%),linear-gradient(180deg,rgba(10,7,6,0.12),rgba(10,7,6,0.12)_30%,rgba(10,7,6,0.42)_70%,rgba(0,0,0,0.85)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_38%,rgba(0,0,0,0.45)_100%)]" />

        {/* Animated dark overlay — opacity only, GPU-safe */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="pointer-events-none absolute inset-0 will-change-[opacity] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,4,2,0.65)_60%,rgba(4,2,1,0.95)_100%)]"
        />

        {/* Hero text content */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex h-full items-center justify-center px-6 will-change-transform md:px-10"
        >
          <div className="hero-float relative w-full max-w-3xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.45em] text-cosmic-ember/65">
              Preparing Interface
            </p>

            <h1 className="text-5xl font-semibold leading-[0.92] tracking-[-0.06em] md:text-7xl">
              <span className="group relative inline-grid cursor-default">
                <span className="col-start-1 row-start-1 text-white transition-opacity duration-300 ease-out group-hover:opacity-0">
                  Majid Khan
                </span>
                <span className="col-start-1 row-start-1 bg-gradient-to-r from-white via-[#ffb15f] to-[#ff7a1a] bg-clip-text text-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                  Majid Khan
                </span>
              </span>
            </h1>
            <p className="mt-5 text-xl font-medium text-white/75 md:text-3xl">
              Full Stack Developer
            </p>
            <p className="text-balance mx-auto mt-6 max-w-2xl text-base leading-8 text-white/55 md:text-lg">
              Building futuristic digital experiences inspired by space and
              modern technology.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton
                href="#projects"
                className="animate-pulseGlow rounded-2xl bg-gradient-to-r from-white via-[#ffb15f] to-[#ff8f2f] px-8 py-4 text-base font-semibold text-[#1b1207] shadow-[0_0_34px_rgba(255,143,47,0.24)]"
              >
                View Projects
              </MagneticButton>
              <MagneticButton
                href="#contact"
                className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white/80 backdrop-blur-xl hover:bg-white/10"
              >
                Download Resume
              </MagneticButton>
            </div>

          </div>
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-40 left-1/2 z-10 flex w-full max-w-2xl -translate-x-1/2 justify-center px-6 text-center md:bottom-44"
        >
          <div className="min-h-[3.25rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeInsight}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-center text-[1rem] tracking-[-0.03em] text-white/78 md:text-[1.12rem]"
              >
                <span className="group relative inline-grid cursor-default">
                  <span className="col-start-1 row-start-1 text-white/78 transition-opacity duration-300 ease-out group-hover:opacity-0">
                    {activeInsight}
                  </span>
                  <span className="col-start-1 row-start-1 bg-gradient-to-r from-white via-[#ffb15f] to-[#ff7a1a] bg-clip-text text-transparent opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                    {activeInsight}
                  </span>
                </span>
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4"
        >
          <span className="scroll-label text-[10px] font-semibold uppercase tracking-[0.5em] text-white/50">
            Scroll To Enter
          </span>

          {/* Line with traveling dot */}
          <div className="relative h-24 w-px overflow-visible">
            {/* Static gradient line */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-[#ff9f43]/30 to-transparent rounded-full" />
            {/* Traveling light dot */}
            <div className="scroll-dot absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-white to-[#ff9f43] shadow-[0_0_8px_#ff9f43]" />
          </div>

          {/* Chevron arrows bouncing down */}
          <div className="flex flex-col items-center gap-0.5 -mt-2">
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="opacity-60 animate-bounce" style={{ animationDelay: "0ms" }}>
              <path d="M1 1L6 6L11 1" stroke="#ff9f43" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="opacity-35 animate-bounce" style={{ animationDelay: "150ms" }}>
              <path d="M1 1L6 6L11 1" stroke="#ff9f43" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
