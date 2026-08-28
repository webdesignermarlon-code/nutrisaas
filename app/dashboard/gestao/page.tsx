'use client'

import { useState } from 'react'

export default function GestaoPage() {
  const [paciente, setPaciente] = useState('')
  const [examesSelecionados, setExamesSelecionados] = useState<string[]>([
    'Hemograma Completo',
    'Glicemia em Jejum',
    'Perfil Lipídico (HDL, LDL, VLDL)'
  ])

  const listaExames = [
    'Hemograma Completo',
    'Glicemia em Jejum',
    'Perfil Lipídico (HDL, LDL, VLDL)',
    'Vitamina D (25-OH)',
    'Vitamina B12',
    'Hormônios Tireoidianos (TSH, T4 Livre)',
    'Ureia e Creatinina',
    'TGO e TGP'
  ]

  const toggleExame = (exame: string) => {
    if (examesSelecionados.includes(exame)) {
      setExamesSelecionados(examesSelecionados.filter((e) => e !== exame))
    } else {
      setExamesSelecionados([...examesSelecionados, exame])
    }
  }

  const handleGerarPedido = (e: React.FormEvent) => {
    e.preventDefault()
    if (!paciente) {
      alert('Por favor, informe o nome do paciente.')
      return
    }
    alert(`Pedido de exames para ${paciente} gerado com sucesso!`)
  }

  return (
    <div className="space-y-6 text-slate-100">
      <h1 className="text-2xl font-bold text-emerald-400">Solicitação de Exames & Kit Gestão</h1>

      <form onSubmit={handleGerarPedido} className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Nome do Paciente</label>
          <input
            type="text"
            placeholder="Ex: Carlos Eduardo"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-3 text-sm text-white focus:border-emerald-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-2">Selecione os Exames Laboratoriais</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {listaExames.map((exame, i) => (
              <label key={i} className="flex items-center space-x-3 p-3 rounded-lg border border-slate-800 bg-slate-950 cursor-pointer hover:border-slate-700">
                <input
                  type="checkbox"
                  checked={examesSelecionados.includes(exame)}
                  onChange={() => toggleExame(exame)}
                  className="accent-emerald-500 h-4 w-4"
                />
                <span>{exame}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-emerald-500 font-bold text-slate-950 px-6 py-2.5 rounded-xl hover:bg-emerald-400"
        >
          Gerar Pedido de Exame
        </button>
      </form>
    </div>
  )
}