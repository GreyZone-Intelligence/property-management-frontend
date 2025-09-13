import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'PropertyOS - Enterprise Property Management',
  description: 'Advanced property management platform connecting landlords, managers, tenants, and vendors through AI-powered workflows.',
  keywords: 'property management, real estate, landlord, tenant, maintenance, vendor marketplace',
  authors: [{ name: 'GreyZone Intelligence' }],
  creator: 'Caulcrick Investments Group',
  publisher: 'GreyZone Intelligence',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://app.propertyos.com',
    siteName: 'PropertyOS',
    title: 'PropertyOS - Enterprise Property Management',
    description: 'Advanced property management platform with AI-powered vendor marketplace and predictive maintenance.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PropertyOS - Enterprise Property Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@PropertyOS',
    creator: '@GreyZoneIntel',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}