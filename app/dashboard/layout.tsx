'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isLight, setIsLight] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkTheme = () => {
      const theme = localStorage.getItem('nutrisaas-theme')
      setIsLight(theme === 'light')
    }
    checkTheme()
    window.addEventListener('storage', checkTheme)
    const interval = setInterval(checkTheme, 500)
    return () => {
      window.removeEventListener('storage', checkTheme)
      clearInterval(interval)
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = isLight ? 'dark' : 'light'
    setIsLight(!isLight)
    localStorage.setItem('nutrisaas-theme', nextTheme)
  }

  const menuItems = [
    { label: 'Visão Geral (Dashboard)', icon: '📊', href: '/dashboard' },
    { label: 'Pacientes & Prontuário', icon: '👥', href: '/dashboard/pacientes' },
    { label: 'Montador de Dietas', icon: '🥗', href: '/dashboard/dietas' },
    { label: 'Anamnese', icon: '📄', href: '/dashboard/anamnese' },
    { label: 'Kit Gestão & Exames', icon: '📋', href: '/dashboard/gestao' },
    { label: 'Calculadoras', icon: '🧮', href: '/dashboard/calculadoras' },
    { label: 'Suplementação', icon: '💊', href: '/dashboard/suplementacao' },
    { label: 'Chat / Mensagens', icon: '💬', href: '/dashboard/chat' },
  ]

  const bgSidebar = isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
  const bgMain = isLight ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'

  return (
    <div className={`min-h-screen flex ${bgMain}`}>
      
      {/* Sidebar Fixo na Esquerda */}
      <aside className={`w-64 border-r flex flex-col justify-between shrink-0 no-print min-h-screen ${bgSidebar}`}>
        <div className="p-5 space-y-6">
          
          {/* Logo NutriSaaS + Botão do Tema */}
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="text-xl font-extrabold text-emerald-500 tracking-tight">
              NutriSaaS
            </Link>
            <button
              onClick={toggleTheme}
              className={`text-xs px-2.5 py-1 rounded-xl border font-semibold transition ${
                isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
              title="Alternar Tema Claro/Escuro"
            >
              {isLight ? '☀️ Claro' : '🌙 Escuro'}
            </button>
          </div>

          {/* Links do Menu Vertical */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    active
                      ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-bold'
                      : isLight
                      ? 'text-slate-600 hover:bg-slate-100'
                      : 'text-slate-400 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Selo LGPD / CFN no Rodapé do Sidebar */}
        <div className="p-4 border-t border-slate-800/40 text-[10px] space-y-1 opacity-80">
          <div className="flex items-center gap-1 text-emerald-500 font-bold">
            <span>🛡️</span> Conformidade LGPD & CFN
          </div>
          <p className={isLight ? 'text-slate-500' : 'text-slate-400'}>
            Prontuários eletrônicos protegidos (Lei 13.709/18).
          </p>
        </div>
      </aside>

      {/* Conteúdo Principal da Direita */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>

        {/* Rodapé Informativo */}
        <footer className={`border-t px-6 py-3 text-center text-[11px] no-print ${isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
          <b>NutriSaaS — Software de Gestão Nutricional</b> • Desenvolvido em conformidade com as diretrizes do CFN e LGPD.
        </footer>
      </div>

    </div>
  )
}