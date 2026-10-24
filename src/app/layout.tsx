import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Plus_Jakarta_Sans, Newsreader } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { RevealRoot } from '@/components/ui/RevealRoot'
import { site } from '@/lib/site'
import './globals.css'

const sans = Instrument_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-jakarta', display: 'swap', preload: false })
const newsreader = Newsreader({ subsets: ['latin'], weight: '500', variable: '--font-newsreader', display: 'swap', preload: false })

export const metadata: Metadata = { metadataBase: new URL(site.url) }
export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#fafafa' }, { media: '(prefers-color-scheme: dark)', color: '#0b0b0b' }],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${jakarta.variable} ${newsreader.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <noscript><style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style></noscript>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="3b200f32-8e98-4fe9-8894-34d2a12884b7" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <RevealRoot />
        <Analytics />
      </body>
    </html>
  )
}
