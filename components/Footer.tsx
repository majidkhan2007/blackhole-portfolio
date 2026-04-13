import { socialLinks } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-7xl px-6 pb-10 pt-8 md:px-10">
      <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-cosmic-ember/70 to-transparent" />
      <div className="flex flex-col items-center justify-between gap-5 text-sm text-white/45 md:flex-row">
        <p>Majid Khan. Built with cinematic motion and cosmic UI depth.</p>
        <div className="flex items-center gap-5">
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} className="interactive-button rounded-full px-2 py-1 transition hover:text-cosmic-ember">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
