'use client'

import { useState, useEffect } from 'react'

interface Paciente {
  id: number
  nome: string
  telefone: string
  objetivo: string
  status: string
  ultimaConsulta?: string
}

export default function PacientesPage() {
  const [isLight, setIsLight] = useState(false)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [modalAgendar, setModalAgendar] = useState<Paciente | null>(null)
  const [dataConsulta, setDataConsulta] = useState('')
  const [horaConsulta, setHoraConsulta] = useState('')
  const [tipoConsulta, setTipoConsulta] = useState('Acompanhamento')

  const [pacientes, setPacientes] = useState<Paciente[]>([
    { id: 1, nome: 'Maria Silva', telefone: '(21) 99888-7766', objetivo: 'Emagrecimento', status: 'Ativo' },
    { id: 2, nome: 'João Pedro Santos', telefone: '(21) 98765-4321', objetivo: 'Hipertrofia', status: 'Ativo' },
  ])

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

  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome) return

    const novo: Paciente = {
      id: Date.now(),
      nome,
      telefone: telefone || 'Não informado',
      objetivo: objetivo || 'Acompanhamento Geral',
      status: 'Ativo',
    }

    setPacientes([novo, ...pacientes])
    setNome('')
    setTelefone('')
    setObjetivo('')
  }

  const handleExcluir = (id: number, nomePaciente: string) => {
    if (confirm(`Tem certeza que deseja excluir o paciente "${nomePaciente}"?`)) {
      setPacientes(pacientes.filter((p) => p.id !== id))
    }
  }

  const handleAbrirWhatsApp = (paciente: Paciente) => {
    const numeroLimpo = paciente.telefone.replace(/\D/g, '')
    if (!numeroLimpo) {
      alert('Este paciente não possui um número de telefone válido cadastrado.')
      return
    }

    const mensagem = `Olá, ${paciente.nome}! Tudo bem? Sou seu nutricionista. Vamos agendar seu acompanhamento nutricional?`
    const url = `https://api.whatsapp.com/send?phone=55${numeroLimpo}&text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  const handleConfirmarAgendamento = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dataConsulta || !horaConsulta || !modalAgendar) return

    alert(`Consulta agendada com sucesso para ${modalAgendar.nome} em ${dataConsulta} às ${horaConsulta}!`)
    setModalAgendar(null)
    setDataConsulta('')
    setHoraConsulta('')
  }

  // Estilos dinâmicos do tema claro / escuro
  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgHeaderTable = isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-950 text-slate-400 border-slate-800'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  return (
    <div className="space-y-6">
      {/* Topo da Tela */}
      <div>
        <h1 className="text-2xl font-bold text-emerald-500">Gestão de Pacientes</h1>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Cadastre pacientes, agende consultas e inicie atendimentos via WhatsApp
        </p>
      </div>

      {/* Formulário de Cadastro */}
      <form onSubmit={handleCadastrar} className={`rounded-2xl border p-6 space-y-4 ${bgCard}`}>
        <h2 className="text-sm font-bold">Cadastrar Novo Paciente</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Nome Completo</label>
            <input
              type="text"
              placeholder="Ex: Ana Maria Souza"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Telefone / WhatsApp</label>
            <input
              type="text"
              placeholder="Ex: 21999998888"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Objetivo Principal</label>
            <input
              type="text"
              placeholder="Ex: Emagrecimento, Hipertrofia"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10"
            >
              + Cadastrar Paciente
            </button>
          </div>
        </div>
      </form>

      {/* Tabela de Pacientes */}
      <div className={`rounded-2xl border overflow-hidden ${bgCard}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b text-[10px] font-bold uppercase tracking-wider ${bgHeaderTable}`}>
                <th className="p-4">Nome</th>
                <th className="p-4">Telefone</th>
                <th className="p-4">Objetivo</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
              {pacientes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400">
                    Nenhum paciente cadastrado ainda.
                  </td>
                </tr>
              ) : (
                pacientes.map((p) => (
                  <tr key={p.id} className={`transition ${isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-950/40'}`}>
                    <td className="p-4 font-bold">{p.nome}</td>
                    <td className={`p-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{p.telefone}</td>
                    <td className={`p-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{p.objetivo}</td>
                    <td className="p-4">
                      <span className="bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-lg text-[10px] font-bold">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => setModalAgendar(p)}
                          className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-2.5 py-1 rounded-lg text-[11px] transition flex items-center gap-1 shadow-sm"
                          title="Agendar Consulta"
                        >
                          📅 Agendar
                        </button>
                        <button
                          onClick={() => handleAbrirWhatsApp(p)}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-2.5 py-1 rounded-lg text-[11px] transition flex items-center gap-1 shadow-sm"
                          title="Chamar no WhatsApp"
                        >
                          💬 WhatsApp
                        </button>
                        <button
                          onClick={() => handleExcluir(p.id, p.nome)}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-semibold px-2.5 py-1 rounded-lg text-[11px] transition"
                          title="Excluir paciente"
                        >
                          🗑️ Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Agendamento */}
      {modalAgendar && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 space-y-4 ${bgCard}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base">Agendar Consulta: {modalAgendar.nome}</h3>
              <button onClick={() => setModalAgendar(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleConfirmarAgendamento} className="space-y-3">
              <div>
                <label className={`block text-xs mb-1 ${textLabel}`}>Data da Consulta</label>
                <input
                  type="date"
                  value={dataConsulta}
                  onChange={(e) => setDataConsulta(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-xs mb-1 ${textLabel}`}>Horário</label>
                <input
                  type="time"
                  value={horaConsulta}
                  onChange={(e) => setHoraConsulta(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-xs mb-1 ${textLabel}`}>Tipo de Consulta</label>
                <select
                  value={tipoConsulta}
                  onChange={(e) => setTipoConsulta(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                >
                  <option value="Primeira Consulta">Primeira Consulta</option>
                  <option value="Retorno e Acompanhamento">Retorno e Acompanhamento</option>
                  <option value="Bioimpedância / Avaliação">Bioimpedância / Avaliação</option>
                  <option value="Consulta Online">Consulta Online</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalAgendar(null)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold ${isLight ? 'border-slate-300' : 'border-slate-800'}`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}