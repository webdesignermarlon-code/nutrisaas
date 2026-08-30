import './globals.css'
import AuthGuard from '@/components/AuthGuard'

export const metadata = {
  title: 'NutriSaaS - Gestão para Nutricionistas',
  description: 'Sistema de gestão e prescrição nutricional em conformidade com LGPD e CFN',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AuthGuard>{children}</AuthGuard>
      </body>
    </html>
  )
}