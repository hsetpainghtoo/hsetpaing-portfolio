import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CursorLabel } from "@/components/cursor-label"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

/* Italic for accent words and large numerals; upright for the one giant
   word on the About hero. Each cut is only downloaded by a page that uses it. */
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})

/* Must be the address the site is really served from: link previews fetch
   the share image from here, and a wrong host means no image at all. */
const siteUrl = "https://hsetpaing-portfolio.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hset Paing Htoo, Frontend Developer",
    template: "%s | Hset Paing Htoo",
  },
  description:
    "Frontend developer building responsive interfaces with React, Next.js and TypeScript. Corporate sites, management dashboards and IoT monitoring front ends.",
  keywords: [
    "frontend developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Singapore",
    "Myanmar",
  ],
  authors: [{ name: "Hset Paing Htoo" }],
  creator: "Hset Paing Htoo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Hset Paing Htoo",
    title: "Hset Paing Htoo, Frontend Developer",
    description:
      "Frontend developer building responsive interfaces with React, Next.js and TypeScript.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hset Paing Htoo, Frontend Developer",
    description:
      "Frontend developer building responsive interfaces with React, Next.js and TypeScript.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0a" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-modal focus:rounded-full focus:bg-foreground focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-background"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="relative min-h-[70dvh]">
            {children}
          </main>
          <Footer />
          <div className="grain-overlay" aria-hidden="true" />
          <CursorLabel />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
