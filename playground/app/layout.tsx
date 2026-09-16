import React from 'react'
import './globals.css'

export const metadata = {
  title: 'Playground • @rafafborges/componentes',
  description: 'Vitrine local dos componentes reutilizáveis',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
