'use client'

import { useState } from 'react'

export default function AnamnesePage() {
  const [paciente, setPaciente] = useState('')
  const [historico, setHistorico] = useState('')
  const [rotina, setRotina] = useState('')
  const [alergias, setAlergias] = useState('')

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!paciente) {
      alert('Por favor, informe o nome do paciente.')
      return
    }
    alert(`Anamnese de ${paciente} registrada com sucesso!`)
    setPaciente('')
    setHistorico('')
    setRotina('')
    setAlergias('')
  }

  return (
    <div className="space-y-6 text-slate-100">
      <h1 className="text-2xl font-bold text-emerald-400">Ficha de Anamnese Nutricional</h1>

      <form onSubmit={handleSalvar} className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Nome do Paciente</label>
          <input
            type="text"
            placeholder="Ex: João Silva"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Histórico Clínico e Patologias</label>
          <textarea
            value={historico}
            onChange={(e) => setHistorico(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            rows={3}
            placeholder="Hipertensão, diabetes, histórico familiar de doenças..."
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Alergias e Intolerâncias Alimentares</label>
          <input
            type="text"
            value={alergias}
            onChange={(e) => setAlergias(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            placeholder="Intolerância à lactose, alergia a frutos do mar..."
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Rotina, Sono e Hábitos Intestinais</label>
          <textarea
            value={rotina}
            onChange={(e) => setRotina(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            rows={3}
            placeholder="Ingestão hídrica diária, qualidade do sono, funcionamento intestinal..."
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-500 font-bold text-slate-950 px-6 py-2.5 rounded-xl hover:bg-emerald-400"
        >
          Salvar Anamnese
        </button>
      </form>
    </div>
  )
}