import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Goon — Idea to Revenue in Days, Not Years',
  description: 'The AI-powered launch platform that turns non-technical founders into revenue-ready startups. Multi-agent orchestration: product strategy, coding, QA — all in one pipeline.',
  keywords: ['AI startup', 'no-code', 'startup launch', 'entrepreneur', 'revenue ready', 'goon'],
  openGraph: {
    title: 'Goon — Idea to Revenue in Days',
    description: 'Stop learning to code. Start earning revenue.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
