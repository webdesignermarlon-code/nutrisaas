'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLight, setIsLight] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const theme = localStorage.getItem('nutrisaas-theme')
    setIsLight(theme === 'light')
  }, [])

  const toggleTheme = () => {
    const nextTheme = isLight ? 'dark' : 'light'
    setIsLight(!isLight)
    localStorage.setItem('nutrisaas-theme', nextTheme)
  }

  const navItems = [
    { label: '📊 Visão Geral', href: '/dashboard' },
    { label: '👥 Pacientes & Prontuário', href: '/dashboard/pacientes' },
    { label: '🧮 Calculadoras Clínicas', href: '/dashboard/calculadoras' },
    { label: '💊 Suplementação & Fórmulas', href: '/dashboard/suplementacao' },
    { label: '💬 Canal de Atendimento', href: '/dashboard/chat' },
  ]

  return (
    <div className={`min-h-screen flex flex-col ${isLight ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      
      {/* Topo de Navegação */}
      <header className={`border-b px-6 py-3 flex justify-between items-center ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold text-emerald-500">NutriSaaS</span>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
            Em conformidade com LGPD & CFN
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}
          >
            {isLight ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
          </button>
        </div>
      </header>

      {/* Menu Principal */}
      <nav className={`border-b px-6 py-2 flex gap-2 overflow-x-auto ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/50 border-slate-800'}`}>
        {navItems.map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                active
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                  : isLight
                  ? 'text-slate-600 hover:bg-slate-200/60'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Conteúdo da Página */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>

      {/* Rodapé Obrigatório de Adequação Jurídica LGPD/CFN */}
      <footer className={`border-t px-6 py-4 text-center text-[11px] space-y-1 no-print ${isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
        <p>
          <b>NutriSaaS — Prontuário e Prescrição Nutricional Eletrônica</b> • Sistema desenvolvido em conformidade com a <b>LGPD (Lei nº 13.709/2018)</b> e resoluções do <b>CFN (Resoluções nº 656/2020 e 666/2020)</b>.
        </p>
        <p className="text-[10px] opacity-75">
          Os dados antropométricos e de saúde armazenados são de uso exclusivo do nutricionista responsável.
        </p>
      </footer>
    </div>
  )
}