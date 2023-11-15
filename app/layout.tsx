import type { Metadata } from 'next'
import './globals.css'
import Providers from './Providers'
import Navbar from '@/components/Navbar/Navbar'


export const metadata: Metadata = {
  title: 'Get Knowledge',
  description: 'Courses for developers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
