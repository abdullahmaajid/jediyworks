import "./globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, Great_Vibes } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s — JEDIYWORKS",
    default: "JEDIYWORKS — A curated creative circle",
  },
  description: "Built by one. Executed by many. A creative circle for technology, visual, and audio — curated for what your project actually needs.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "JEDIYWORKS",
    description: "Built by one. Executed by many.",
    url: "/",
    siteName: "JEDIYWORKS",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${manrope.variable} ${greatVibes.variable} font-sans antialiased selection:bg-crimson selection:text-bone min-h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}