import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Butler & Stag — Independent Estate Agents | East London & Essex',
  description: 'Award-winning independent estate agents covering Bow, Chingford, Theydon Bois, Buckhurst Hill and Chelmsford. Selling, letting, and property management since 2012.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
