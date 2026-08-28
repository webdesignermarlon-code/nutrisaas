'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<any[]>([])
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [loading, setLoading] = useState(false)

  const carregarPacientes = async () => {
    const { data } = await supabase.from('pacientes').select('*').order('created_at', { ascending: false })
    if (data) setPacientes(data)
  }

  useEffect(() => {
    carregarPacientes()
  }, [])

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('pacientes').insert([{ nome, telefone, objetivo }])

    if (!error) {
      setNome('')
      setTelefone('')
      setObjetivo('')
      carregarPacientes()
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-emerald-400">Gestão de Pacientes</h1>
      </div>

      <form onSubmit={handleSalvar} className="grid grid-cols-1 gap-4 rounded-xl border border-slate-800 bg-slate-900 p-6 md:grid-cols-4">
        <input
          type="text"
          placeholder="Nome do Paciente"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Telefone / WhatsApp"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Objetivo (ex: Emagrecimento)"
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
          className="rounded-lg border border-slate-800 bg-slate-950 px-4 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-emerald-500 font-bold text-slate-950 hover:bg-emerald-400"
        >
          {loading ? 'Cadastrando...' : '+ Cadastrar Paciente'}
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-xs text-slate-400 uppercase">
            <tr>
              <th className="p-4">Nome</th>
              <th className="p-4">Telefone</th>
              <th className="p-4">Objetivo</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-slate-500">
                  Nenhum paciente cadastrado ainda.
                </td>
              </tr>
            ) : (
              pacientes.map((p) => (
                <tr key={p.id} className="border-t border-slate-800 hover:bg-slate-800/40">
                  <td className="p-4 font-semibold text-white">{p.nome}</td>
                  <td className="p-4">{p.telefone || '-'}</td>
                  <td className="p-4">{p.objetivo || '-'}</td>
                  <td className="p-4"><span className="rounded bg-emerald-500/10 px-2 py-1 text-xs text-emerald-400">Ativo</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}