import type { Metadata, Viewport } from "next";
import { Caveat, Patrick_Hand, Shantell_Sans } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/content";

const display = Shantell_Sans({ subsets: ["latin"], axes: ["BNCE", "INFM"], variable: "--font-display", display: "swap" });
// Every face is hand-drawn: Shantell Sans for headings and body (its INFM axis
// sets how loose the marker strokes are), Patrick Hand for small labels and
// numbers, Caveat for margin notes.
const label = Patrick_Hand({ subsets: ["latin"], weight: "400", variable: "--font-label", display: "swap" });
const hand = Caveat({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-hand", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} · ML engineer & software developer`,
  description: profile.lede,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf7fc" },
    { media: "(prefers-color-scheme: dark)", color: "#17121d" },
  ],
};

// Runs before paint so a saved theme never flashes the wrong colours.
const themeScript = `try{var t=localStorage.getItem('doodle-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${label.variable} ${hand.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
