'use client'

import { useState } from 'react'

export default function SuplementacaoPage() {
  const [paciente, setPaciente] = useState('')
  const [suplemento, setSuplemento] = useState('')
  const [posologia, setPosologia] = useState('')

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!paciente || !suplemento) {
      alert('Por favor, informe o paciente e o suplemento.')
      return
    }
    alert(`Receita de suplementação para ${paciente} emitida com sucesso!`)
    setPaciente('')
    setSuplemento('')
    setPosologia('')
  }

  return (
    <div className="space-y-6 text-slate-100">
      <h1 className="text-2xl font-bold text-emerald-400">Receituário de Suplementação</h1>

      <form onSubmit={handleSalvar} className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Nome do Paciente</label>
          <input
            type="text"
            placeholder="Ex: Mariana Costa"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Suplemento / Composto</label>
          <input
            type="text"
            placeholder="Ex: Creatina Monohidratada 100% Pura"
            value={suplemento}
            onChange={(e) => setSuplemento(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Posologia e Modo de Uso</label>
          <textarea
            value={posologia}
            onChange={(e) => setPosologia(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            rows={3}
            placeholder="Ex: Tomar 5g diluído em 200ml de água, preferencialmente após o treino."
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-500 font-bold text-slate-950 px-6 py-2.5 rounded-xl hover:bg-emerald-400"
        >
          Emitir Receita
        </button>
      </form>
    </div>
  )
}