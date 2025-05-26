import './globals.css'
import type { Metadata } from 'next'
import { LayoutWithNav } from './components/LayoutWithNav'
import { AuthProvider } from './context/AuthContext'

export const metadata: Metadata = {
  title: 'aBoard',
  description: 'Community Board App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#F5F5F5] text-gray-900">
        <AuthProvider>
          <LayoutWithNav>{children}</LayoutWithNav>
        </AuthProvider>
      </body>
    </html>
  )
}
