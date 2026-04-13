"use client";

import { motion, useMotionTemplate, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const links = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Timeline", href: "#timeline", id: "timeline" },
  { label: "Blog", href: "#blog", id: "blog" },
  { label: "Reviews", href: "#testimonials", id: "testimonials" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Smart Hide / Reveal on scroll direction
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const direction = latest > lastScrollY.current ? "down" : "up";
      if (latest > 150 && direction === "down") setVisible(false);
      else setVisible(true);
      lastScrollY.current = latest;
    });
  }, [scrollY]);

  // Scroll-position based active section tracker
  useEffect(() => {
    const handleScroll = () => {
      // Use getBoundingClientRect for true document-level position (offsetTop is relative to offsetParent, not document)
      const triggerY = window.scrollY + 80;

      for (const { id } of [...links].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const absoluteTop = el.getBoundingClientRect().top + window.scrollY;
          if (absoluteTop <= triggerY) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bg = useTransform(scrollY, [0, 100], ["rgba(10,8,6,0.08)", "rgba(8,8,8,0.72)"]);
  const borderColor = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0.04)", "rgba(255,255,255,0.10)"]);
  const blurPx = useTransform(scrollY, [0, 100], [6, 28]);
  const backdropFilter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          key="navbar"
          initial={{ opacity: 0, y: -28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:px-10"
        >
          <motion.nav
            style={{ backgroundColor: bg, borderColor, backdropFilter }}
            className="group relative mx-auto flex w-full max-w-7xl items-center justify-between rounded-[24px] border px-3.5 py-2.5 md:px-5
              shadow-[0_4px_24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            {/* Ambient hover glow */}
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[24px] opacity-0 transition-opacity duration-700 group-hover:opacity-100">
              <div className="absolute -left-1/4 -top-full h-[200%] w-3/4 animate-pulse rounded-full bg-gradient-to-br from-[#ff9f43]/6 to-transparent blur-3xl" />
            </div>

            {/* Logo wordmark */}
            <motion.a
              href="#home"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              className="relative overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.05] px-4 py-2.5 text-xs font-black tracking-[0.16em] text-white"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-[#ff9f43]/4" />
              <span className="relative">MAJID.DEV</span>
            </motion.a>

            {/* Desktop navigation */}
            <div className="relative hidden items-center gap-px md:flex">
              {links.map(({ label, href, id }) => {
                const isActive = activeSection === id;
                return (
                  <motion.a
                    key={href}
                    href={href}
                    whileTap={{ scale: 0.96 }}
                    className={`group/link relative px-[14px] py-2 text-[13px] font-medium transition-colors duration-200 select-none ${
                      isActive
                        ? "text-[#ff9f43]"
                        : "text-white/40 hover:text-[#ff9f43]"
                    }`}
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <motion.span
                        layoutId="activePill"
                        className="absolute inset-0 rounded-[11px] border border-[#ff9f43]/20 bg-[#ff9f43]/[0.07] shadow-[inset_0_1px_0_rgba(255,159,67,0.08),0_2px_8px_rgba(0,0,0,0.2)]"
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                      />
                    )}

                    {/* Rolling underline on hover */}
                    <span className="relative z-10">
                      {label}
                      {/* Underline element — slides in from left on hover */}
                      <span
                        className={`absolute bottom-0 left-0 h-[1.5px] w-full origin-left scale-x-0 rounded-full bg-[#ff9f43] shadow-[0_0_6px_#ff9f43] transition-transform duration-300 ease-out group-hover/link:scale-x-100 ${
                          isActive ? "scale-x-100" : ""
                        }`}
                      />
                    </span>
                  </motion.a>
                );
              })}
            </div>

            {/* CTA button — always visible */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              className="relative overflow-hidden rounded-[14px] border border-[#ff9f43]/25 bg-[#ff9f43]/[0.08] px-4 py-2.5 text-[13px] font-bold tracking-wide text-[#ff9f43] transition-colors hover:bg-[#ff9f43]/[0.14]"
            >
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
              <span className="relative">Let&apos;s Talk</span>
            </motion.a>
          </motion.nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
