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
  
  // ESTADO DO TEMA (Garante que nunca vai dessincronizar)
  const [isEscuro, setIsEscuro] = useState(true)
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
    // Função rigorosa para detectar se a página/menu está em Modo Escuro ou Claro
    const checarTema = () => {
      const htmlClass = document.documentElement.className
      const bodyClass = document.body.className
      const isDark = htmlClass.includes('dark') || bodyClass.includes('dark') || localStorage.getItem('theme') === 'dark'
      
      // Se não houver classe light explícita e o fundo geral for escuro
      setIsEscuro(isDark)
    }

    checarTema()

    // Ouve qualquer clique ou mudança na página para atualizar as cores dos cards no mesmo instante
    const observer = new MutationObserver(checarTema)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

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

    return () => observer.disconnect()
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

  // DEFINIÇÃO DIRETA E INFALÍVEL DAS CORES COM BASE NO ESTADO
  const estilos = {
    cardBg: isEscuro ? '#0f172a' : '#ffffff',
    cardBorder: isEscuro ? 'rgba(51, 65, 85, 0.8)' : '#e2e8f0',
    itemBg: isEscuro ? '#020617' : '#f8fafc',
    itemBorder: isEscuro ? 'rgba(30, 41, 59, 0.8)' : '#e2e8f0',
    textoPrincipal: isEscuro ? '#f8fafc' : '#0f172a',
    textoSecundario: isEscuro ? '#94a3b8' : '#64748b',
    headerBorder: isEscuro ? 'rgba(51, 65, 85, 0.6)' : '#e2e8f0'
  }

  // === SE ESTIVER LOGADO ===
  if (isLogado) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500 relative min-h-screen pb-16">
        
        {/* Cabeçalho */}
        <div 
          className="flex items-center justify-between pb-4 border-b transition-colors duration-300"
          style={{ borderColor: estilos.headerBorder }}
        >
          <div>
            <h1 className="text-2xl font-bold text-emerald-500 tracking-tight">
              Bem-vindo(a), Dr(a). {nomeUsuario}
            </h1>
            <p className="text-xs mt-0.5 transition-colors duration-300" style={{ color: estilos.textoSecundario }}>
              Aqui está o resumo da sua rotina clínica hoje.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-all border"
            style={{ backgroundColor: estilos.cardBg, borderColor: estilos.cardBorder }}
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
          <div 
            className="p-5 rounded-2xl border shadow-lg flex flex-col gap-1 transition-all duration-300"
            style={{ backgroundColor: estilos.cardBg, borderColor: estilos.cardBorder }}
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: estilos.textoSecundario }}>Total de Pacientes</span>
            <span className="text-3xl font-extrabold text-emerald-500">0</span>
          </div>
          <div 
            className="p-5 rounded-2xl border shadow-lg flex flex-col gap-1 transition-all duration-300"
            style={{ backgroundColor: estilos.cardBg, borderColor: estilos.cardBorder }}
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: estilos.textoSecundario }}>Dietas Ativas</span>
            <span className="text-3xl font-extrabold text-sky-500">0</span>
          </div>
          <div 
            className="p-5 rounded-2xl border shadow-lg flex flex-col gap-1 transition-all duration-300"
            style={{ backgroundColor: estilos.cardBg, borderColor: estilos.cardBorder }}
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: estilos.textoSecundario }}>Consultas Hoje</span>
            <span className="text-3xl font-extrabold text-amber-500">{atendimentos.length}</span>
          </div>
          <div 
            className="p-5 rounded-2xl border shadow-lg flex flex-col gap-1 transition-all duration-300"
            style={{ backgroundColor: estilos.cardBg, borderColor: estilos.cardBorder }}
          >
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: estilos.textoSecundario }}>Avisos / Retornos</span>
            <span className="text-3xl font-extrabold text-red-500">0</span>
          </div>
        </div>

        {/* Área Inferior */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Próximos Atendimentos */}
          <div 
            className="lg:col-span-2 rounded-2xl border shadow-lg overflow-hidden flex flex-col transition-all duration-300"
            style={{ backgroundColor: estilos.cardBg, borderColor: estilos.cardBorder }}
          >
            <div className="p-5 border-b flex justify-between items-center" style={{ borderColor: estilos.headerBorder }}>
              <h2 className="text-sm font-bold uppercase text-emerald-500 tracking-wider">Próximos Atendimentos</h2>
              <button className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors">Ver Agenda &rarr;</button>
            </div>
            
            <div className="p-5 space-y-3 flex-1">
              {atendimentos.length === 0 ? (
                <div className="p-8 text-center border border-dashed rounded-xl" style={{ borderColor: estilos.headerBorder }}>
                  <p className="text-sm" style={{ color: estilos.textoSecundario }}>Nenhum atendimento agendado para hoje.</p>
                  <button 
                    onClick={() => setModalAgendarAberto(true)}
                    className="mt-3 text-xs text-emerald-500 hover:underline font-semibold"
                  >
                    + Agendar uma consulta agora
                  </button>
                </div>
              ) : (
                atendimentos.map((paciente) => (
                  <div 
                    key={paciente.id} 
                    className="flex items-center justify-between p-4 rounded-xl border transition-all"
                    style={{ backgroundColor: estilos.itemBg, borderColor: estilos.itemBorder }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-lg border border-emerald-500/20">
                        {paciente.nome.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold" style={{ color: estilos.textoPrincipal }}>{paciente.nome}</p>
                        <p className="text-[11px]" style={{ color: estilos.textoSecundario }}>{paciente.tipo}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                        {paciente.hora}
                      </span>
                      <button
                        onClick={() => handleCancelarConsulta(paciente.id)}
                        className="text-xs text-red-500 hover:bg-red-500/10 px-2.5 py-1.5 rounded-lg transition-colors"
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
          <div 
            className="rounded-2xl border shadow-lg flex flex-col transition-all duration-300"
            style={{ backgroundColor: estilos.cardBg, borderColor: estilos.cardBorder }}
          >
            <div className="p-5 border-b" style={{ borderColor: estilos.headerBorder }}>
              <h2 className="text-sm font-bold uppercase text-emerald-500 tracking-wider">Ações Rápidas</h2>
            </div>
            
            <div className="p-5 flex flex-col gap-3">
              <button 
                onClick={() => setModalAgendarAberto(true)}
                className="w-full text-left p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/20 transition-all flex items-center gap-4 group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">📅</span>
                <div>
                  <p className="text-sm font-bold text-emerald-500">Agendar Consulta</p>
                  <p className="text-[10px]" style={{ color: estilos.textoSecundario }}>Marcar atendimento no sistema</p>
                </div>
              </button>

              <Link 
                href="/dashboard/pacientes" 
                className="w-full text-left p-4 rounded-xl border hover:border-emerald-500/50 transition-all flex items-center gap-4 group"
                style={{ backgroundColor: estilos.itemBg, borderColor: estilos.itemBorder }}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">👥</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: estilos.textoPrincipal }}>Novo Paciente</p>
                  <p className="text-[10px]" style={{ color: estilos.textoSecundario }}>Cadastrar prontuário</p>
                </div>
              </Link>
              
              <Link 
                href="/dashboard/dietas" 
                className="w-full text-left p-4 rounded-xl border hover:border-sky-500/50 transition-all flex items-center gap-4 group"
                style={{ backgroundColor: estilos.itemBg, borderColor: estilos.itemBorder }}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">🥗</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: estilos.textoPrincipal }}>Montar Dieta</p>
                  <p className="text-[10px]" style={{ color: estilos.textoSecundario }}>Criar plano alimentar</p>
                </div>
              </Link>

              <Link 
                href="/dashboard/anamnese" 
                className="w-full text-left p-4 rounded-xl border hover:border-amber-500/50 transition-all flex items-center gap-4 group"
                style={{ backgroundColor: estilos.itemBg, borderColor: estilos.itemBorder }}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">📄</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: estilos.textoPrincipal }}>Nova Anamnese</p>
                  <p className="text-[10px]" style={{ color: estilos.textoSecundario }}>Registrar avaliação clínica</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Modal Agendar Consulta */}
        {modalAgendarAberto && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div 
              className="w-full max-w-md rounded-2xl border p-6 shadow-2xl space-y-4"
              style={{ backgroundColor: estilos.cardBg, borderColor: estilos.cardBorder }}
            >
              <div className="flex justify-between items-center border-b pb-3" style={{ borderColor: estilos.headerBorder }}>
                <h3 className="text-lg font-bold text-emerald-500">Agendar Consulta</h3>
                <button onClick={() => setModalAgendarAberto(false)} style={{ color: estilos.textoSecundario }}>✕</button>
              </div>

              <form onSubmit={handleAgendarConsulta} className="space-y-4">
                <div>
                  <label className="block text-xs mb-1" style={{ color: estilos.textoSecundario }}>Nome do Paciente</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Maria Silva"
                    value={novoNome}
                    onChange={(e) => setNovoNome(e.target.value)}
                    className="w-full rounded-xl border p-3 text-sm focus:border-emerald-500 focus:outline-none"
                    style={{ backgroundColor: estilos.itemBg, borderColor: estilos.itemBorder, color: estilos.textoPrincipal }}
                  />
                </div>

                <div>
                  <label className="block text-xs mb-1" style={{ color: estilos.textoSecundario }}>Tipo de Consulta</label>
                  <select
                    value={novoTipo}
                    onChange={(e) => setNovoTipo(e.target.value)}
                    className="w-full rounded-xl border p-3 text-sm focus:border-emerald-500 focus:outline-none"
                    style={{ backgroundColor: estilos.itemBg, borderColor: estilos.itemBorder, color: estilos.textoPrincipal }}
                  >
                    <option value="Primeira Consulta">Primeira Consulta</option>
                    <option value="Retorno">Retorno</option>
                    <option value="Acompanhamento">Acompanhamento</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs mb-1" style={{ color: estilos.textoSecundario }}>Data</label>
                    <input
                      type="date"
                      value={novaData}
                      onChange={(e) => setNovaData(e.target.value)}
                      className="w-full rounded-xl border p-3 text-sm focus:border-emerald-500 focus:outline-none"
                      style={{ backgroundColor: estilos.itemBg, borderColor: estilos.itemBorder, color: estilos.textoPrincipal }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs mb-1" style={{ color: estilos.textoSecundario }}>Horário</label>
                    <input
                      type="time"
                      value={novoHorario}
                      onChange={(e) => setNovoHorario(e.target.value)}
                      className="w-full rounded-xl border p-3 text-sm focus:border-emerald-500 focus:outline-none"
                      style={{ backgroundColor: estilos.itemBg, borderColor: estilos.itemBorder, color: estilos.textoPrincipal }}
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModalAgendarAberto(false)}
                    className="w-1/2 py-3 rounded-xl border text-xs font-bold"
                    style={{ borderColor: estilos.headerBorder, color: estilos.textoPrincipal }}
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
      <div 
        className="w-full max-w-md rounded-2xl border p-8 shadow-2xl backdrop-blur-sm transition-all duration-300"
        style={{ backgroundColor: estilos.cardBg, borderColor: estilos.cardBorder }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-emerald-500 mb-1 tracking-tight">NutriSaaS</h1>
          <p className="text-xs" style={{ color: estilos.textoSecundario }}>Acesse o seu painel de gestão nutricional</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs" style={{ color: estilos.textoSecundario }}>E-mail Profissional</label>
            <input
              type="email"
              required
              placeholder="seuemail@consultorio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border p-3 text-sm focus:border-emerald-500 focus:outline-none transition-colors"
              style={{ backgroundColor: estilos.itemBg, borderColor: estilos.itemBorder, color: estilos.textoPrincipal }}
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-xs" style={{ color: estilos.textoSecundario }}>Senha de Acesso</label>
              <Link href="/esqueci-senha" className="text-[11px] font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                Esqueci a senha
              </Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-xl border p-3 text-sm focus:border-emerald-500 focus:outline-none transition-colors"
              style={{ backgroundColor: estilos.itemBg, borderColor: estilos.itemBorder, color: estilos.textoPrincipal }}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="manter"
              checked={manterConectado}
              onChange={(e) => setManterConectado(e.target.checked)}
              className="h-4 w-4 rounded text-emerald-500 focus:ring-emerald-500"
            />
            <label htmlFor="manter" className="text-xs cursor-pointer" style={{ color: estilos.textoSecundario }}>
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