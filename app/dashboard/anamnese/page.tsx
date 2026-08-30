'use client'

import { useState, useEffect } from 'react'

export default function AnamnesePage() {
  const [isLight, setIsLight] = useState(false)
  const [paciente, setPaciente] = useState('')
  const [historico, setHistorico] = useState('')
  const [alergias, setAlergias] = useState('')
  const [rotina, setRotina] = useState('')

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

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Anamnese de ${paciente || 'Paciente'} salva com sucesso!`)
  }

  // Estilos dinâmicos de tema claro e escuro
  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-emerald-500">Ficha de Anamnese Nutricional</h1>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Registre o histórico clínico, alergias e hábitos do paciente
        </p>
      </div>

      <form onSubmit={handleSalvar} className={`rounded-2xl border p-6 space-y-5 ${bgCard}`}>
        <div>
          <label className={`block text-xs mb-1 ${textLabel}`}>Nome do Paciente</label>
          <input
            type="text"
            placeholder="Ex: João Silva"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            className={`w-full rounded-xl border p-3 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
          />
        </div>

        <div>
          <label className={`block text-xs mb-1 ${textLabel}`}>Histórico Clínico e Patologias</label>
          <textarea
            placeholder="Hipertensão, diabetes, histórico familiar de doenças, medicações em uso..."
            value={historico}
            onChange={(e) => setHistorico(e.target.value)}
            rows={3}
            className={`w-full rounded-xl border p-3 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
          />
        </div>

        <div>
          <label className={`block text-xs mb-1 ${textLabel}`}>Alergias e Intolerâncias Alimentares</label>
          <textarea
            placeholder="Intolerância à lactose, alergia a frutos do mar, aversões alimentares..."
            value={alergias}
            onChange={(e) => setAlergias(e.target.value)}
            rows={3}
            className={`w-full rounded-xl border p-3 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
          />
        </div>

        <div>
          <label className={`block text-xs mb-1 ${textLabel}`}>Rotina, Sono e Hábitos Intestinais</label>
          <textarea
            placeholder="Ingestão hídrica diária, qualidade do sono, nível de estresse, funcionamento intestinal (escala de Bristol)..."
            value={rotina}
            onChange={(e) => setRotina(e.target.value)}
            rows={3}
            className={`w-full rounded-xl border p-3 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-6 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10"
          >
            Salvar Anamnese
          </button>
        </div>
      </form>
    </div>
  )
}