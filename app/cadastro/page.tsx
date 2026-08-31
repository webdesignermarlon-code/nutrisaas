'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CadastroPage() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [sucesso, setSucesso] = useState(false)
  const router = useRouter()

  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault()

    // Salva o nome e o email no navegador para exibir no dashboard
    localStorage.setItem('nutrisaas-nome', nome)
    localStorage.setItem('nutrisaas-email', email)
    localStorage.setItem('nutrisaas-auth', 'true')

    sessionStorage.setItem('nutrisaas-nome', nome)
    sessionStorage.setItem('nutrisaas-email', email)
    sessionStorage.setItem('nutrisaas-auth', 'true')

    setSucesso(true)

    // Redireciona para a dashboard após 1.5 segundos
    setTimeout(() => {
      window.dispatchEvent(new Event('storage'))
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800/80 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-emerald-500 mb-1 tracking-tight">NutriSaaS</h1>
          <p className="text-xs text-slate-400">Cadastre seu consultório para começar</p>
        </div>

        {sucesso ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center text-sm font-semibold space-y-2">
            <p>✓ Cadastro realizado com sucesso!</p>
            <p className="text-xs text-slate-400">Redirecionando para o painel...</p>
          </div>
        ) : (
          <form onSubmit={handleCadastro} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs text-slate-400">Nome Completo (ou Dr/Dra)</label>
              <input
                type="text"
                required
                placeholder="Ex: Dra. Mariana Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-400">E-mail Profissional</label>
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
              <label className="mb-1 block text-xs text-slate-400">Senha de Acesso</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors mt-2"
            >
              Criar minha conta
            </button>

            <div className="text-center pt-4">
              <Link href="/dashboard" className="text-[11px] font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                Já tem uma conta? Faça login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}