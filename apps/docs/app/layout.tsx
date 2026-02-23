import type { Metadata } from 'next'
import { Fragment_Mono, JetBrains_Mono, Press_Start_2P } from 'next/font/google'
import 'nextra-theme-docs/style.css'
import '@workspace/ui/globals.css'
import { Footer, Layout } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import { Steps } from 'nextra/components'
import NavbarCompo from '@/components/layout/navbar'

const DOCS_URL = 'https://docs.docsy.live'

export const metadata: Metadata = {
  metadataBase: new URL(DOCS_URL),
  title: {
    default: 'Docsy Documentation - Build RAG with ease',
    template: '%s | Docsy Docs',
  },
  description:
    'The complete guide to integrating Docsy. Learn how to connect your GitHub, configure RAG, and deploy your AI documentation chatbot.',
  keywords: [
    'Docsy documentation',
    'AI docs setup',
    'RAG integration guide',
    'GitHub to RAG tutorial',
    'Docsy API reference',
  ],
  authors: [{ name: 'Gauresh', url: 'https://github.com/GaureshArt' }],
  creator: 'Gauresh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: DOCS_URL,
    title: 'Docsy Docs - Setup & Integration Guide',
    description:
      'Everything you need to get your AI-powered documentation chatbot running in minutes.',
    siteName: 'Docsy Documentation',
    images: [
      {
        url: '/og-docs.png',
        width: 1200,
        height: 630,
        alt: 'Docsy Documentation Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Docsy Docs - AI Documentation Made Easy',
    description:
      'Transform your technical docs into an interactive AI assistant.',
    images: ['/og-docs.png'],
    creator: '@gaureshart',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--next-font-jetbrains-mono',
  style: ['normal'],
  weight: ['400', '700'],
})
const pressStart2p = Press_Start_2P({
  subsets: ['greek', 'latin', 'cyrillic-ext', 'latin-ext', 'cyrillic'],
  variable: '--next-font-pressStart2p',
  style: ['normal'],
  weight: ['400'],
})

const fragmentMono = Fragment_Mono({
  subsets: ['latin'],
  variable: '--next-font-fragment-mono',
  weight: ['400'],
})

const footer = <Footer>MIT {new Date().getFullYear()} © Docsy</Footer>
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body
        className={`${jetbrainsMono.variable} ${pressStart2p.variable} ${fragmentMono.variable} antialiased `}
      >
        <Layout
          navbar={NavbarCompo()}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/GaureshArt/docsy/tree/main/apps/docs"
          footer={footer}
        >
          <Steps />
          {children}
        </Layout>
      </body>
    </html>
  )
}
