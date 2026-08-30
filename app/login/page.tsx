'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 1. Entrega a "chave" de autenticação para o DashboardLayout liberar o painel
    sessionStorage.setItem('nutrisaas-auth', 'true')
    
    // 2. Faz o redirecionamento suave para a rota principal do dashboard
    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
        <h1 className="mb-2 text-center text-2xl font-bold text-emerald-400">NutriSaaS</h1>
        <p className="mb-6 text-center text-xs text-slate-400">Acesse sua plataforma de atendimento nutricional</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-slate-400">E-mail</label>
            <input
              type="email"
              required
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            {/* Rótulo de Senha + Link de Esqueci a Senha alinhados */}
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-xs text-slate-400">Senha</label>
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
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
          >
            Entrar no Painel
          </button>
        </form>
      </div>
    </div>
  )
}