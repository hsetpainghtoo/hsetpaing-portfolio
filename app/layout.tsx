import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Anton } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
})

const siteUrl = "https://hsetpaing.vercel.app"

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
    images: [
      {
        url: "/hph_portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Hset Paing Htoo, frontend developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hset Paing Htoo, Frontend Developer",
    description:
      "Frontend developer building responsive interfaces with React, Next.js and TypeScript.",
    images: ["/hph_portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f9fb" },
    { media: "(prefers-color-scheme: dark)", color: "#10131a" },
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
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-modal focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
          >
            Skip to content
          </a>
          {/* Scroll edge effect: content fades as it passes under the floating
              bar, instead of meeting a hard rule. */}
          <div className="scroll-edge" aria-hidden="true" />
          <Navbar />
          <main id="main-content" className="min-h-[60dvh] overflow-x-clip pt-20">
            {children}
          </main>
          <Footer />
          <div className="grain-overlay z-grain" aria-hidden="true" />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
