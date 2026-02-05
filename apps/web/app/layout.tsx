import {
  Fragment_Mono,
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Press_Start_2P,
} from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { Metadata } from "next"
import { SITE_URL } from "@/constant/site-config"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--next-font-jetbrains-mono",
  style: ["normal"],
  weight: ["400", "700"],
})
const pressStart2p = Press_Start_2P({
  subsets: ["greek", "latin", "cyrillic-ext", "latin-ext", "cyrillic"],
  variable: "--next-font-pressStart2p",
  style: ["normal"],
  weight: ["400"],
})

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  variable: "--next-font-fragment-mono",
  weight: ["400"],
})


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Docsy - Headless RAG Component for React & Next.js",
    template: "%s | Docsy"
  },
  description: "Transform your GitHub documentation into an intelligent Q&A system. Drop-in RAG component for React and Next.js applications.",
  keywords: ["RAG", "documentation", "AI", "Next.js", "React", "embeddings", "vector search", "Qdrant", "chatbot"],
  authors: [{ name: "Gauresh", url: "https://github.com/GaureshArt" }],
  creator: "Gauresh",
  openGraph: {
    type: "website",
    locale: "en_US",

    title: "Docsy - Headless RAG Component",
    description: "Transform your GitHub documentation into an intelligent Q&A system.",
    siteName: "Docsy",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Docsy - Headless RAG Component"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Docsy - Headless RAG Component",
    description: "Transform your GitHub documentation into an intelligent Q&A system.",
    images: ["/og-image.png"],
    creator: "@gaureshart"
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} ${jetbrainsMono.variable} ${pressStart2p.variable} ${fragmentMono.variable} antialiased `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
