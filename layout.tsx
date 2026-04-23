import type { Metadata } from 'next'
import { Oswald, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const oswald = Oswald({ 
  subsets: ["latin", "cyrillic"],
  weight: ["700"],
  variable: "--font-oswald"
});

const inter = Inter({ 
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: 'AI Studio — Обучение и продакшн с ИИ',
  description: 'Курсы по ИИ фото и видео, корпоративные тренинги, ИИ продакшн под ключ для брендов.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-[#0e0e0e]">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
