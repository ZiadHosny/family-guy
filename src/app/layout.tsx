import { Navigation } from '@/components'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Family Guy',
  description: 'Come here and learn more about Family Guy!',
  icons: ['logo.png']
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}