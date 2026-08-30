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

  useEffect(() => {
    const auth = sessionStorage.getItem('nutrisaas-auth') || localStorage.getItem('nutrisaas-auth')
    if (auth === 'true') {
      setIsLogado(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (manterConectado) {
      localStorage.setItem('nutrisaas-auth', 'true')
    } else {
      sessionStorage.setItem('nutrisaas-auth', 'true')
    }
    
    setIsLogado(true)
    window.dispatchEvent(new Event('storage'))
    router.refresh()
  }

  // === SE ESTIVER LOGADO: MOSTRA O DASHBOARD COMPLETO ===
  if (isLogado) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <h1 className="text-2xl font-bold text-emerald-500 tracking-tight">Visão Geral (Dashboard)</h1>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-lg flex flex-col gap-1 hover:border-emerald-500/30 transition-colors">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total de Pacientes</span>
            <span className="text-3xl font-extrabold text-emerald-400">124</span>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-lg flex flex-col gap-1 hover:border-sky-500/30 transition-colors">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dietas Ativas</span>
            <span className="text-3xl font-extrabold text-sky-400">89</span>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-lg flex flex-col gap-1 hover:border-amber-500/30 transition-colors">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Consultas Hoje</span>
            <span className="text-3xl font-extrabold text-amber-400">5</span>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-lg flex flex-col gap-1 hover:border-red-500/30 transition-colors">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avisos / Retornos</span>
            <span className="text-3xl font-extrabold text-red-400">2</span>
          </div>
        </div>

        {/* Área Inferior: Agenda e Ações */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Agenda de Hoje */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-lg overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-800/60 flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase text-emerald-500 tracking-wider">Próximos Atendimentos</h2>
              <button className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors">Ver Agenda &rarr;</button>
            </div>
            <div className="p-5 space-y-3 flex-1">
              {/* Lista mockada de pacientes */}
              {[
                { nome: 'Ana Carolina Silva', hora: '14:00', tipo: 'Primeira Consulta' },
                { nome: 'Carlos Eduardo Oliveira', hora: '15:30', tipo: 'Retorno' },
                { nome: 'Mariana Souza', hora: '17:00', tipo: 'Acompanhamento' },
              ].map((paciente, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-emerald-500/30 transition-all shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-lg border border-emerald-500/20">
                      {paciente.nome.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">{paciente.nome}</p>
                      <p className="text-[11px] text-slate-400">{paciente.tipo}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-400/20">
                      {paciente.hora}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Atalhos Rápidos */}
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-lg flex flex-col">
             <div className="p-5 border-b border-slate-800/60">
              <h2 className="text-sm font-bold uppercase text-emerald-500 tracking-wider">Ações Rápidas</h2>
            </div>
            <div className="p-5 flex flex-col gap-3">
              <Link href="/dashboard/pacientes" className="w-full text-left p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all flex items-center gap-4 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">👥</span>
                <div>
                  <p className="text-sm font-bold text-slate-200">Novo Paciente</p>
                  <p className="text-[10px] text-slate-400">Cadastrar prontuário</p>
                </div>
              </Link>
              <Link href="/dashboard/dietas" className="w-full text-left p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-sky-500/50 hover:bg-sky-500/5 transition-all flex items-center gap-4 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">🥗</span>
                <div>
                  <p className="text-sm font-bold text-slate-200">Montar Dieta</p>
                  <p className="text-[10px] text-slate-400">Criar plano alimentar</p>
                </div>
              </Link>
              <Link href="/dashboard/anamnese" className="w-full text-left p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all flex items-center gap-4 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">📄</span>
                <div>
                  <p className="text-sm font-bold text-slate-200">Nova Anamnese</p>
                  <p className="text-[10px] text-slate-400">Registrar avaliação clínica</p>
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    )
  }

  // === SE NÃO ESTIVER LOGADO: MOSTRA A TELA DE LOGIN ===
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