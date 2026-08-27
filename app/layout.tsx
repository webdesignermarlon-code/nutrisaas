'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string>('')

  useEffect(() => {
    const email = localStorage.getItem('user_email') || ''
    setUserEmail(email)
  }, [])

  const handleSetAdmin = () => {
    localStorage.setItem('user_email', 'andradewebdesigner@gmail.com')
    setUserEmail('andradewebdesigner@gmail.com')
    router.push('/dashboard/admin')
  }

  const isAdmin = userEmail === 'andradewebdesigner@gmail.com' || pathname.startsWith('/dashboard/admin')

  const navItems = [
    { name: 'Dashboard Nutri', href: '/dashboard/nutri', icon: '📊' },
    { name: 'Pacientes', href: '/dashboard/pacientes', icon: '👥' },
    { name: 'Montador de Dietas', href: '/dashboard/dietas', icon: '🥗' },
    { name: 'Anamnese', href: '/dashboard/anamnese', icon: '📄' },
    { name: 'Kit Gestão & Exames', href: '/dashboard/gestao', icon: '📋' },
    { name: 'Calculadoras', href: '/dashboard/calculadoras', icon: '🧮' },
    { name: 'Suplementação', href: '/dashboard/suplementacao', icon: '💊' },
    { name: 'Chat / Mensagens', href: '/dashboard/chat', icon: '💬' },
  ]

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-slate-800/80 bg-slate-900/60 backdrop-blur-xl">
        <div className="flex h-16 items-center border-b border-slate-800/80 px-6">
          <Link href="/" className="text-xl font-black text-emerald-400">
            🌱 NutriSaaS
          </Link>
        </div>

        <div className="flex-1 space-y-1 p-4">
          {/* Botão do Admin */}
          {isAdmin ? (
            <Link
              href="/dashboard/admin"
              className={`mb-4 flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                pathname === '/dashboard/admin'
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
              }`}
            >
              <span>👑</span>
              <span>Painel Admin (Marlon)</span>
            </Link>
          ) : (
            <button
              onClick={handleSetAdmin}
              className="mb-4 flex w-full items-center space-x-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs font-bold text-amber-400 transition-all hover:bg-amber-500/20"
            >
              <span>👑</span>
              <span>Alternar para Acesso Admin</span>
            </button>
          )}

          <div className="pb-2 pt-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase">
            Menu Nutricionista
          </div>

          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500 font-bold text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )
          })}
        </div>

        {/* Rodapé da Sidebar */}
        <div className="border-t border-slate-800/80 p-4">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            <span>← Voltar ao Site</span>
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  )
}