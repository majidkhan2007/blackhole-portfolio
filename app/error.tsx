"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.02),transparent_18%),linear-gradient(180deg,#000000,#000000)]" />
      <div className="pointer-events-none absolute bottom-16 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,143,47,0.12),transparent_72%)] blur-3xl" />

      <section className="interactive-card cosmic-border glass-panel relative z-10 w-full max-w-3xl rounded-[36px] px-8 py-12 text-center md:px-14 md:py-16">
        <p className="text-sm uppercase tracking-[0.38em] text-cosmic-ember/70">System Fault</p>
        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.06em] text-cosmic-white md:text-6xl">
          Something interrupted the experience.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
          A runtime error occurred while loading this page. You can retry the current view or return to the main interface.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="interactive-button rounded-2xl bg-gradient-to-r from-white via-[#ffb15f] to-[#ff8f2f] px-7 py-4 text-base font-semibold text-[#1b1207]"
          >
            Retry View
          </button>
          <Link
            href="/"
            className="interactive-button rounded-2xl border border-white/12 bg-white/5 px-7 py-4 text-base font-semibold text-white/82"
          >
            Return Home
          </Link>
        </div>
      </section>
    </main>
  );
}
