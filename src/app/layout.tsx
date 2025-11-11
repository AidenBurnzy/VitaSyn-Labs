import type { Metadata } from 'next'
import './globals.css'
import LoadingBar from '@/components/LoadingBar'

export const metadata: Metadata = {
  title: 'Evans Peptides - Research Laboratory',
  description: 'Premium research peptides for laboratory use. High-quality, third-party tested peptides for scientific research.',
  keywords: 'peptides, research chemicals, laboratory, BPC-157, TB-500, scientific research',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <LoadingBar />
        {children}
      </body>
    </html>
  )
}
