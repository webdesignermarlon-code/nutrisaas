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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('nutrisaas-admin-theme') || localStorage.getItem('nutrisaas-theme');
                if (theme === 'light') {
                  document.documentElement.style.backgroundColor = '#f1f5f9';
                  document.body.style.backgroundColor = '#f1f5f9';
                } else {
                  document.documentElement.style.backgroundColor = '#020617';
                  document.body.style.backgroundColor = '#020617';
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen m-0 p-0 transition-colors duration-200">
        {children}
      </body>
    </html>
  )
}