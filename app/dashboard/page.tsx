'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Atendimento {
  id: string
  nome: string
  hora: string
  data: string
  tipo: string
}

export default function DashboardPage() {
  const [isLogado, setIsLogado] = useState(false)
  const [nomeUsuario, setNomeUsuario] = useState('Nutricionista')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [manterConectado, setManterConectado] = useState(false)
  const router = useRouter()

  // Estados do Agendamento
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([])
  const [modalAgendarAberto, setModalAgendarAberto] = useState(false)
  
  // Form de agendamento
  const [novoNome, setNovoNome] = useState('')
  const [novoTipo, setNovoTipo] = useState('Primeira Consulta')
  const [novaData, setNovaData] = useState('')
  const [novoHorario, setNovoHorario] = useState('14:00')

  useEffect(() => {
    const auth = sessionStorage.getItem('nutrisaas-auth') || localStorage.getItem('nutrisaas-auth')
    const savedName = sessionStorage.getItem('nutrisaas-nome') || localStorage.getItem('nutrisaas-nome')
    const savedEmail = sessionStorage.getItem('nutrisaas-email') || localStorage.getItem('nutrisaas-email')

    if (auth === 'true') {
      setIsLogado(true)
      if (savedName) {
        setNomeUsuario(savedName)
      } else if (savedEmail) {
        const nomeFormatado = savedEmail.split('@')[0].replace(/[._-]/g, ' ')
        setNomeUsuario(nomeFormatado.charAt(0).toUpperCase() + nomeFormatado.slice(1))
      }
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    
    const storage = manterConectado ? localStorage : sessionStorage
    storage.setItem('nutrisaas-auth', 'true')
    storage.setItem('nutrisaas-email', email)
    
    const savedName = storage.getItem('nutrisaas-nome')
    if (savedName) {
      setNomeUsuario(savedName)
    } else {
      const nomeFormatado = email.split('@')[0].replace(/[._-]/g, ' ')
      setNomeUsuario(nomeFormatado.charAt(0).toUpperCase() + nomeFormatado.slice(1))
    }

    setIsLogado(true)
    window.dispatchEvent(new Event('storage'))
    router.refresh()
  }

  const handleLogout = () => {
    localStorage.removeItem('nutrisaas-auth')
    localStorage.removeItem('nutrisaas-email')
    localStorage.removeItem('nutrisaas-nome')
    sessionStorage.removeItem('nutrisaas-auth')
    sessionStorage.removeItem('nutrisaas-email')
    sessionStorage.removeItem('nutrisaas-nome')
    
    setIsLogado(false)
    setNomeUsuario('Nutricionista')
    router.refresh()
  }

  const handleAgendarConsulta = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novoNome) return

    const novoAtendimento: Atendimento = {
      id: Date.now().toString(),
      nome: novoNome,
      tipo: novoTipo,
      data: novaData,
      hora: novoHorario
    }

    setAtendimentos((prev) => [...prev, novoAtendimento])
    setNovoNome('')
    setModalAgendarAberto(false)
  }

  const handleCancelarConsulta = (id: string) => {
    if (confirm('Tem certeza que deseja cancelar esta consulta?')) {
      setAtendimentos((prev) => prev.filter((item) => item.id !== id))
    }
  }

  // === SE ESTIVER LOGADO ===
  if (isLogado) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 relative min-h-screen pb-16">
        
        {/* Cabeçalho */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-500 tracking-tight">
              Bem-vindo(a), Dr(a). {nomeUsuario}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Aqui está o resumo da sua rotina clínica hoje.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all shadow-sm"
            title="Encerrar sessão"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sair da conta</span>
          </button>
        </div>

        {/* Cards de Métricas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm dark:shadow-lg flex flex-col gap-1 hover:border-emerald-500/40 transition-colors">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total de Pacientes</span>
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">0</span>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm dark:shadow-lg flex flex-col gap-1 hover:border-sky-500/40 transition-colors">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Dietas Ativas</span>
            <span className="text-3xl font-extrabold text-sky-600 dark:text-sky-400">0</span>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm dark:shadow-lg flex flex-col gap-1 hover:border-amber-500/40 transition-colors">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Consultas Hoje</span>
            <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">{atendimentos.length}</span>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm dark:shadow-lg flex flex-col gap-1 hover:border-red-500/40 transition-colors">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Avisos / Retornos</span>
            <span className="text-3xl font-extrabold text-red-600 dark:text-red-400">0</span>
          </div>
        </div>

        {/* Área Inferior */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Próximos Atendimentos */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm dark:shadow-lg overflow-hidden flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <h2 className="text-sm font-bold uppercase text-emerald-600 dark:text-emerald-500 tracking-wider">Próximos Atendimentos</h2>
              <button className="text-xs font-bold text-emerald-600 dark:text-emerald-500 hover:underline transition-colors">Ver Agenda &rarr;</button>
            </div>
            
            <div className="p-5 space-y-3 flex-1">
              {atendimentos.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Nenhum atendimento agendado para hoje.</p>
                  <button 
                    onClick={() => setModalAgendarAberto(true)}
                    className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                  >
                    + Agendar uma consulta agora
                  </button>
                </div>
              ) : (
                atendimentos.map((paciente) => (
                  <div key={paciente.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 transition-all shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 font-bold text-lg border border-emerald-500/20">
                        {paciente.nome.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{paciente.nome}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{paciente.tipo}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-400/20">
                        {paciente.hora}
                      </span>
                      <button
                        onClick={() => handleCancelarConsulta(paciente.id)}
                        className="text-xs text-red-500 hover:text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 px-2.5 py-1.5 rounded-lg transition-colors"
                        title="Cancelar consulta"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm dark:shadow-lg flex flex-col">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-sm font-bold uppercase text-emerald-600 dark:text-emerald-500 tracking-wider">Ações Rápidas</h2>
            </div>
            
            <div className="p-5 flex flex-col gap-3">
              <button 
                onClick={() => setModalAgendarAberto(true)}
                className="w-full text-left p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all flex items-center gap-4 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">📅</span>
                <div>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Agendar Consulta</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Marcar atendimento no sistema</p>
                </div>
              </button>

              <Link href="/dashboard/pacientes" className="w-full text-left p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500/50 transition-all flex items-center gap-4 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">👥</span>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Novo Paciente</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Cadastrar prontuário</p>
                </div>
              </Link>
              
              <Link href="/dashboard/dietas" className="w-full text-left p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 hover:border-sky-500/50 transition-all flex items-center gap-4 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">🥗</span>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Montar Dieta</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Criar plano alimentar</p>
                </div>
              </Link>

              <Link href="/dashboard/anamnese" className="w-full text-left p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800/80 hover:border-amber-500/50 transition-all flex items-center gap-4 group">
                <span className="text-2xl group-hover:scale-110 transition-transform">📄</span>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Nova Anamnese</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Registrar avaliação clínica</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Modal Agendar Consulta */}
        {modalAgendarAberto && (
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-500">Agendar Consulta</h3>
                <button onClick={() => setModalAgendarAberto(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">✕</button>
              </div>

              <form onSubmit={handleAgendarConsulta} className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Nome do Paciente</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maria Silva"
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Tipo de Consulta</label>
                  <select
                    value={novoTipo}
                    onChange={(e) => setNovoTipo(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Primeira Consulta">Primeira Consulta</option>
                    <option value="Retorno">Retorno</option>
                    <option value="Acompanhamento">Acompanhamento</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Data</label>
                    <input
                      type="date"
                      value={novaData}
                      onChange={(e) => setNovaData(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 dark:text-slate-400 mb-1">Horário</label>
                    <input
                      type="time"
                      value={novoHorario}
                      onChange={(e) => setNovoHorario(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalAgendarAberto(false)}
                    className="w-1/2 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-3 rounded-xl bg-emerald-500 text-xs font-bold text-slate-950 hover:bg-emerald-400"
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Suporte WhatsApp */}
        <a
          href="https://wa.me/5522999140912?text=Ol%C3%A1!%20Preciso%20de%20suporte%20no%20NutriSaaS."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-xl transition-all hover:scale-105"
        >
          <span className="text-base">💬</span>
          <span>Suporte WhatsApp</span>
        </a>

      </div>
    )
  }

  // === SE NÃO ESTIVER LOGADO ===
  return (
    <div className="flex items-center justify-center min-h-[75vh]">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-emerald-500 mb-1 tracking-tight">NutriSaaS</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Acesse o seu painel de gestão nutricional</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs text-slate-500 dark:text-slate-400">E-mail Profissional</label>
            <input
              type="email"
              required
              placeholder="seuemail@consultorio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-xs text-slate-500 dark:text-slate-400">Senha de Acesso</label>
              <Link href="/esqueci-senha" className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-500 hover:text-emerald-400 transition-colors">
                Esqueci a senha
              </Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-sm text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="manter"
              checked={manterConectado}
              onChange={(e) => setManterConectado(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-emerald-500 focus:ring-emerald-500"
            />
            <label htmlFor="manter" className="text-xs text-slate-500 dark:text-slate-400 cursor-pointer">
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
            <Link href="/cadastro" className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-500 hover:text-emerald-400 transition-colors">
              Não tem conta? Cadastre seu consultório
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}