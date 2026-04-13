import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-20 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_18%),linear-gradient(180deg,#000000,#000000)]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,143,47,0.12),transparent_70%)] blur-3xl" />

      <section className="interactive-card cosmic-border glass-panel relative z-10 w-full max-w-3xl rounded-[36px] px-8 py-12 text-center md:px-14 md:py-16">
        <p className="text-sm uppercase tracking-[0.38em] text-cosmic-ember/70">Signal Lost</p>
        <h1 className="mt-5 font-display text-6xl font-semibold tracking-[-0.08em] text-cosmic-white md:text-8xl">
          404
        </h1>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em] text-cosmic-white md:text-5xl">
          This route drifted beyond the event horizon.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/62 md:text-lg">
          The page you were looking for is not available right now. Let&apos;s route you back to the main interface.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="interactive-button rounded-2xl bg-gradient-to-r from-white via-[#ffb15f] to-[#ff8f2f] px-7 py-4 text-base font-semibold text-[#1b1207]"
          >
            Return Home
          </Link>
          <Link
            href="/#projects"
            className="interactive-button rounded-2xl border border-white/12 bg-white/5 px-7 py-4 text-base font-semibold text-white/82"
          >
            View Projects
          </Link>
        </div>
      </section>
    </main>
  );
}
