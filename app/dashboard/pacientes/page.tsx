'use client'

import { useState, useEffect } from 'react'

interface Paciente {
  id: number
  nome: string
  telefone: string
  objetivo: string
  status: string
}

export default function PacientesPage() {
  const [isLight, setIsLight] = useState(false)
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [objetivo, setObjetivo] = useState('')
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
          Cadastre novos pacientes e gerencie o histórico de consultas
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
              placeholder="Ex: (21) 99999-8888"
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
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
              {pacientes.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-400">
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}