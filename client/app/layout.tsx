import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Header from './src/components/Header'
import Footer from './src/components/Footer'
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Farmacia Sisa App',
  description:
    'Aplicacion web para el control de cuentas de clientes y productos de una farmacia',
  icons: {
    icon: '/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-dvh">
          {children}
          <Toaster />
        </main>
        <Footer />
      </body>
    </html>
  )
}
