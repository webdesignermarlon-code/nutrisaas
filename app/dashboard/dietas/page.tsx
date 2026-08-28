'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'

export default function DietasPage() {
  const [paciente, setPaciente] = useState('')
  const [titulo, setTitulo] = useState('')
  const [calorias, setCalorias] = useState('')
  const [refeicoes, setRefeicoes] = useState([
    { hora: '08:00', nome: 'Café da Manhã', descricao: '2 ovos mexidos + 1 fatia de pão integral + café preto' }
  ])
  const [loading, setLoading] = useState(false)

  const adicionarRefeicao = () => {
    setRefeicoes([
      ...refeicoes,
      { hora: '12:00', nome: 'Almoço', descricao: '150g frango grelhado + 100g arroz integral + salada à vontade' }
    ])
  }

  const handleSalvarDieta = async () => {
    if (!paciente || !titulo) {
      alert('Por favor, preencha o nome do paciente e o título do plano.')
      return
    }

    setLoading(true)
    const { error } = await supabase.from('dietas').insert([
      {
        paciente_nome: paciente,
        titulo: titulo,
        calorias_alvo: calorias ? parseInt(calorias) : null,
        refeicoes: refeicoes
      }
    ])

    if (!error) {
      alert('Plano alimentar salvo com sucesso no banco de dados!')
      setPaciente('')
      setTitulo('')
      setCalorias('')
    } else {
      alert('Erro ao salvar dieta: ' + error.message)
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6 text-slate-100">
      <h1 className="text-2xl font-bold text-emerald-400">Montador de Plano Alimentar</h1>

      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Nome do Paciente</label>
            <input
              type="text"
              placeholder="Ex: Maria Silva"
              value={paciente}
              onChange={(e) => setPaciente(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Título do Plano</label>
            <input
              type="text"
              placeholder="Ex: Dieta Hipertrofia - Fase 1"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Meta Calórica (kcal)</label>
            <input
              type="number"
              placeholder="Ex: 1800"
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-white">Refeições Estruturadas</h2>
            <button
              onClick={adicionarRefeicao}
              className="text-xs bg-emerald-500 text-slate-950 font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-400"
            >
              + Adicionar Refeição
            </button>
          </div>

          <div className="space-y-3">
            {refeicoes.map((ref, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-950 grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  defaultValue={ref.hora}
                  onChange={(e) => {
                    const newRefs = [...refeicoes]
                    newRefs[idx].hora = e.target.value
                    setRefeicoes(newRefs)
                  }}
                  className="rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white"
                />
                <input
                  type="text"
                  defaultValue={ref.nome}
                  onChange={(e) => {
                    const newRefs = [...refeicoes]
                    newRefs[idx].nome = e.target.value
                    setRefeicoes(newRefs)
                  }}
                  className="rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white"
                />
                <textarea
                  defaultValue={ref.descricao}
                  onChange={(e) => {
                    const newRefs = [...refeicoes]
                    newRefs[idx].descricao = e.target.value
                    setRefeicoes(newRefs)
                  }}
                  className="rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSalvarDieta}
          disabled={loading}
          className="w-full bg-emerald-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-emerald-400"
        >
          {loading ? 'Salvando Plano...' : 'Salvar Plano Alimentar'}
        </button>
      </div>
    </div>
  )
}