'use client'

import { useState } from 'react'

export default function CalculadorasPage() {
  const [peso, setPeso] = useState<number | ''>('')
  const [altura, setAltura] = useState<number | ''>('')
  const [idade, setIdade] = useState<number | ''>('')
  const [tmb, setTmb] = useState<number | null>(null)
  const [imc, setImc] = useState<number | null>(null)

  const calcular = () => {
    if (peso && altura) {
      const altMetros = Number(altura) / 100
      const imcCalc = Number(peso) / (altMetros * altMetros)
      setImc(Number(imcCalc.toFixed(2)))
    }

    if (peso && altura && idade) {
      // Equação de Mifflin-St Jeor
      const tmbCalc = 10 * Number(peso) + 6.25 * Number(altura) - 5 * Number(idade) + 5
      setTmb(Math.round(tmbCalc))
    }
  }

  return (
    <div className="space-y-6 text-slate-100">
      <h1 className="text-2xl font-bold text-emerald-400">Calculadora Nutricional Clínica</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="font-bold text-white">Parâmetros do Paciente</h2>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Peso (kg)</label>
            <input
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              placeholder="Ex: 70"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Altura (cm)</label>
            <input
              type="number"
              value={altura}
              onChange={(e) => setAltura(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              placeholder="Ex: 175"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Idade (Anos)</label>
            <input
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value === '' ? '' : Number(e.target.value))}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              placeholder="Ex: 30"
            />
          </div>
          <button
            onClick={calcular}
            className="w-full rounded-xl bg-emerald-500 py-3 font-bold text-slate-950 hover:bg-emerald-400"
          >
            Calcular IMC e TMB
          </button>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <h2 className="font-bold text-white">Resultados Obtidos</h2>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Índice de Massa Corporal (IMC)</span>
            <div className="text-3xl font-black text-emerald-400">{imc ? `${imc} kg/m²` : '--'}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-400">Taxa Metabólica Basal (TMB)</span>
            <div className="text-3xl font-black text-emerald-400">{tmb ? `${tmb} kcal/dia` : '--'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}