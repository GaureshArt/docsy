import {
  Fragment_Mono,
  Geist,
  Geist_Mono,
  JetBrains_Mono,
  Press_Start_2P,
} from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"

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
