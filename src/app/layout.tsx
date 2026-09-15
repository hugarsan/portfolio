import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/data";
import Intro from "@/components/Intro";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const description = `${site.name} — ${site.title}. Desarrollo de software y aplicaciones de IA: React, FastAPI, PostgreSQL, Docker y modelos de lenguaje (NLP, LLMs).`;

export const metadata: Metadata = {
  title: {
    default: `hugarsan · ${site.name}`,
    template: "%s · hugarsan",
  },
  description,
  applicationName: "hugarsan",
  authors: [{ name: site.name, url: site.github }],
  keywords: [
    "Hugo García",
    "desarrollador de software",
    "inteligencia artificial",
    "machine learning",
    "NLP",
    "LLMs",
    "React",
    "FastAPI",
    "portfolio",
  ],
  openGraph: {
    title: `hugarsan · ${site.name}`,
    description,
    type: "website",
    locale: "es_ES",
    siteName: "hugarsan",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Intro />
        {children}
      </body>
    </html>
  );
}