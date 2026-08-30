'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('nutrisaas-theme')
    if (theme === 'light') {
      setIsLight(true)
      document.documentElement.classList.add('light')
    } else {
      setIsLight(false)
      document.documentElement.classList.remove('light')
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = !isLight
    setIsLight(nextTheme)
    localStorage.setItem('nutrisaas-theme', nextTheme ? 'light' : 'dark')
    if (nextTheme) {
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
    }
  }

  const menu = [
    { name: 'Visão Geral (Dashboard)', href: '/dashboard', icon: '📊' },
    { name: 'Pacientes', href: '/dashboard/pacientes', icon: '👥' },
    { name: 'Montador de Dietas', href: '/dashboard/dietas', icon: '🥗' },
    { name: 'Anamnese', href: '/dashboard/anamnese', icon: '📄' },
    { name: 'Kit Gestão & Exames', href: '/dashboard/gestao', icon: '📋' },
    { name: 'Calculadoras', href: '/dashboard/calculadoras', icon: '🧮' },
    { name: 'Suplementação', href: '/dashboard/suplementacao', icon: '💊' },
    { name: 'Chat / Mensagens', href: '/dashboard/chat', icon: '💬' },
  ]

  return (
    <div className={`flex min-h-screen transition-colors duration-200 ${
      isLight ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Sidebar Lateral */}
      <aside className={`w-64 border-r p-4 flex flex-col justify-between no-print transition-colors duration-200 ${
        isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xl font-extrabold text-emerald-500">NutriSaaS</span>
            <button
              onClick={toggleTheme}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition ${
                isLight 
                  ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200' 
                  : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              }`}
              title="Alternar Modo Claro / Escuro"
            >
              {isLight ? '☀️ Claro' : '🌙 Escuro'}
            </button>
          </div>

          <nav className="space-y-1">
            {menu.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                    active
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      : isLight
                      ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-800/40 text-[11px] text-slate-500 flex justify-between items-center">
          <span>Painel Nutricionista</span>
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}