import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import { BrandsProvider } from '@/contexts/BrandsContext'
import QueryProvider from '@/providers/QueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Qappio Admin Panel',
  description: 'Qappio platform yönetim paneli',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <QueryProvider>
          <AuthProvider>
            <BrandsProvider>
              {children}
            </BrandsProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
