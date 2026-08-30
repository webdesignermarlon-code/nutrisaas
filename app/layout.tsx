import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NutriSaaS - Gestão para Nutricionistas',
  description: 'Sistema de gestão e prescrição nutricional em conformidade com LGPD e CFN',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="antialiased min-h-screen transition-colors duration-200">
        {children}
      </body>
    </html>
  )
}