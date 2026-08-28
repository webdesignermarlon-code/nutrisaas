'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { name: 'Pacientes', href: '/dashboard/pacientes', icon: '👥' },
  { name: 'Montador de Dietas', href: '/dashboard/dietas', icon: '🥗' },
  { name: 'Anamnese', href: '/dashboard/anamnese', icon: '📄' },
  { name: 'Kit Gestão & Exames', href: '/dashboard/gestao', icon: '📋' },
  { name: 'Calculadoras', href: '/dashboard/calculadoras', icon: '🧮' },
  { name: 'Suplementação', href: '/dashboard/suplementacao', icon: '💊' },
  { name: 'Chat / Mensagens', href: '/dashboard/chat', icon: '💬' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Sidebar / Menu Lateral */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 hidden md:block">
        <div className="mb-8 px-2 font-bold text-lg text-emerald-400">
          NutriSaaS
        </div>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}