import type { Metadata } from "next";
import { CustomCursor } from "@/components/CustomCursor";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Event Horizon Portfolio",
  description: "Cinematic futuristic portfolio with shader-driven black hole visuals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
