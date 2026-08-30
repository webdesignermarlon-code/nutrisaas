'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [isLogado, setIsLogado] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [manterConectado, setManterConectado] = useState(false)
  const router = useRouter()

  // Verifica se já está logado ao carregar a página
  useEffect(() => {
    const auth = sessionStorage.getItem('nutrisaas-auth') || localStorage.getItem('nutrisaas-auth')
    if (auth === 'true') {
      setIsLogado(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Salva a chave de acesso dependendo se marcou "Manter conectado"
    if (manterConectado) {
      localStorage.setItem('nutrisaas-auth', 'true')
    } else {
      sessionStorage.setItem('nutrisaas-auth', 'true')
    }
    
    setIsLogado(true)
    
    // Força o layout a atualizar imediatamente para mostrar o menu lateral
    window.dispatchEvent(new Event('storage'))
    router.refresh()
  }

  // Se estiver logado, mostra o painel real
  if (isLogado) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <h1 className="text-2xl font-bold text-emerald-500">Visão Geral (Dashboard)</h1>
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <p className="text-slate-300">Bem-vindo de volta! Selecione uma opção no menu lateral para começar seus atendimentos.</p>
        </div>
      </div>
    )
  }

  // Se NÃO estiver logado, mostra a tela de login idêntica ao seu design
  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <div className="w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-emerald-500 mb-1 tracking-tight">NutriSaaS</h1>
          <p className="text-xs text-slate-400">Acesse o seu painel de gestão nutricional</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs text-slate-400">E-mail Profissional</label>
            <input
              type="email"
              required
              placeholder="seuemail@consultorio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-xs text-slate-400">Senha de Acesso</label>
              {/* Aqui está o seu Esqueci a senha! */}
              <Link 
                href="/esqueci-senha" 
                className="text-[11px] font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                Esqueci a senha
              </Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="manter"
              checked={manterConectado}
              onChange={(e) => setManterConectado(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-950"
            />
            <label htmlFor="manter" className="text-xs text-slate-400 cursor-pointer">
              Manter conectado neste dispositivo
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors mt-2"
          >
            Entrar no Sistema
          </button>
          
          <div className="text-center pt-5 mt-2">
            <Link href="/cadastro" className="text-[11px] font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
              Não tem conta? Cadastre seu consultório
            </Link>
          </div>
        </form>

      </div>
    </div>
  )
}