'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false)

  // Seu e-mail de administrador definido para liberação do painel
  const ADMIN_EMAIL = 'andradewebdesigner@gmail.com'

  useEffect(() => {
    // Verifica o e-mail logado no localStorage ou na sessão
    const userEmail = localStorage.getItem('user_email') || ''
    if (userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      setIsAdmin(true)
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      {/* Sidebar Lateral */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 px-2">
            <span className="text-xl font-bold text-emerald-400">🌱 NutriSaaS</span>
          </div>

          {/* Navegação */}
          <nav className="space-y-1">
            {/* Exibe o botão de Admin APENAS se o e-mail for o seu */}
            {isAdmin && (
              <Link
                href="/dashboard/admin"
                className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  pathname === '/dashboard/admin'
                    ? 'bg-purple-900/50 text-purple-300 border border-purple-700/50'
                    : 'text-purple-400 hover:bg-slate-800'
                }`}
              >
                <span>👑</span>
                <span>Painel Admin (Marlon)</span>
              </Link>
            )}

            <Link
              href="/dashboard/nutri"
              className={`flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                pathname === '/dashboard/nutri'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span>📊</span>
              <span>Dashboard Nutri</span>
            </Link>

            <Link
              href="/dashboard/pacientes"
              className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <span>👥</span>
              <span>Pacientes</span>
            </Link>

            <Link
              href="/dashboard/dietas"
              className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <span>🥗</span>
              <span>Montador de Dietas</span>
            </Link>

            <Link
              href="/dashboard/anamnese"
              className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <span>📄</span>
              <span>Anamnese</span>
            </Link>

            <Link
              href="/dashboard/gestao"
              className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <span>📋</span>
              <span>Kit Gestão & Exames</span>
            </Link>

            <Link
              href="/dashboard/calculadoras"
              className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <span>🧮</span>
              <span>Calculadoras</span>
            </Link>

            <Link
              href="/dashboard/suplementacao"
              className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <span>💊</span>
              <span>Suplementação</span>
            </Link>

            <Link
              href="/dashboard/chat"
              className="flex items-center space-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <span>💬</span>
              <span>Chat / Mensagens</span>
            </Link>
          </nav>
        </div>

        {/* Botão de Suporte */}
        <div className="pt-4 border-t border-slate-800">
          <button className="w-full flex items-center justify-center space-x-2 rounded-lg border border-slate-800 bg-slate-900 py-2 text-xs font-semibold text-emerald-400 hover:bg-slate-800">
            <span>🎧</span>
            <span>Suporte NutriSaaS</span>
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}