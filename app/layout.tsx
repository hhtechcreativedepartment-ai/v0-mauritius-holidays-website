import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mauritius Holidays Direct | Award-Winning Mauritius Holiday Specialists',
  description: 'Book your dream Mauritius holiday with award-winning specialists. Luxury hotels, all-inclusive packages, honeymoons, family holidays, weddings & golf breaks. ATOL, IATA & ABTA protected.',
  keywords: 'Mauritius holidays, Mauritius hotels, all inclusive Mauritius, Mauritius honeymoon, Mauritius family holidays, Mauritius wedding, Mauritius golf',
  openGraph: {
    title: 'Mauritius Holidays Direct | Award-Winning Mauritius Holiday Specialists',
    description: 'Book your dream Mauritius holiday with award-winning specialists. Luxury hotels, all-inclusive packages, honeymoons & more.',
    type: 'website',
    locale: 'en_GB',
  },
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e3a5f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
