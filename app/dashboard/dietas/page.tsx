'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

const dietasPreProntas: Record<string, any> = {
  emagrecimento: {
    titulo: 'Plano Hipocalórico - Emagrecimento Ativo',
    calorias: 1500,
    refeicoes: [
      { hora: '07:30', nome: 'Café da Manhã', op1: '2 ovos cozidos + 1 fatia de pão integral', op2: '1 iogurte desnatado + 20g de aveia' },
      { hora: '12:30', nome: 'Almoço', op1: '120g Frango grelhado + 80g Arroz integral', op2: '130g Filé de Tilápia + 100g Batata doce' },
    ]
  },
  hipertrofia: {
    titulo: 'Plano Hipercalórico - Ganho de Massa Muscular',
    calorias: 2800,
    refeicoes: [
      { hora: '07:00', nome: 'Café da Manhã', op1: '3 ovos mexidos + 2 fatias de pão integral', op2: 'Vitamina com aveia, banana e Whey' },
      { hora: '13:00', nome: 'Almoço', op1: '180g Frango + 200g Arroz + 100g Feijão', op2: '180g Carne moída + 220g Macarrão' },
    ]
  }
}

export default function DietasPage() {
  const [paciente, setPaciente] = useState('')
  const [titulo, setTitulo] = useState('')
  const [calorias, setCalorias] = useState('')
  const [buscaAlimento, setBuscaAlimento] = useState('')
  const [alimentos, setAlimentos] = useState<any[]>([])
  const [loadingAlimentos, setLoadingAlimentos] = useState(false)
  const [refeicoes, setRefeicoes] = useState([
    { hora: '08:00', nome: 'Café da Manhã', op1: '', op2: '' }
  ])

  // Buscar alimentos do Supabase com filtro dinâmico
  useEffect(() => {
    const carregarAlimentos = async () => {
      setLoadingAlimentos(true)
      let query = supabase.from('alimentos').select('*').limit(30)
      
      if (buscaAlimento) {
        query = query.ilike('nome', `%${buscaAlimento}%`)
      }

      const { data } = await query
      if (data) setAlimentos(data)
      setLoadingAlimentos(false)
    }

    const timer = setTimeout(() => carregarAlimentos(), 300)
    return () => clearTimeout(timer)
  }, [buscaAlimento])

  const carregarModelo = (chave: string) => {
    const modelo = dietasPreProntas[chave]
    if (modelo) {
      setTitulo(modelo.titulo)
      setCalorias(modelo.calorias.toString())
      setRefeicoes(modelo.refeicoes)
    }
  }

  const adicionarAlimento = (texto: string, idxRef: number, opcao: 'op1' | 'op2') => {
    const novas = [...refeicoes]
    const atual = novas[idxRef][opcao]
    novas[idxRef][opcao] = atual ? `${atual} + ${texto}` : texto
    setRefeicoes(novas)
  }

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-400">Montador Conectado ao Banco TACO</h1>
          <p className="text-xs text-slate-400">Prescreva planos com busca no banco de dados do Supabase</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => carregarModelo('emagrecimento')} className="text-xs bg-slate-800 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg">🔥 Emagrecimento</button>
          <button onClick={() => carregarModelo('hipertrofia')} className="text-xs bg-slate-800 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg">💪 Hipertrofia</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <input type="text" placeholder="Nome do Paciente" value={paciente} onChange={(e) => setPaciente(e.target.value)} className="rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white" />
            <input type="text" placeholder="Título do Plano" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white" />
          </div>

          {refeicoes.map((ref, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900 space-y-3">
              <div className="flex gap-2">
                <input type="text" value={ref.hora} onChange={(e) => { const n = [...refeicoes]; n[idx].hora = e.target.value; setRefeicoes(n) }} className="w-24 rounded border border-slate-800 bg-slate-950 p-2 text-xs" />
                <input type="text" value={ref.nome} onChange={(e) => { const n = [...refeicoes]; n[idx].nome = e.target.value; setRefeicoes(n) }} className="flex-1 rounded border border-slate-800 bg-slate-950 p-2 text-xs" />
              </div>
              <div>
                <label className="block text-[10px] text-emerald-400 font-bold mb-1">Opção Principal (Opção 1)</label>
                <textarea value={ref.op1} onChange={(e) => { const n = [...refeicoes]; n[idx].op1 = e.target.value; setRefeicoes(n) }} className="w-full rounded border border-slate-800 bg-slate-950 p-2 text-xs" rows={2} />
              </div>
              <div>
                <label className="block text-[10px] text-sky-400 font-bold mb-1">Opção de Substituição (Opção 2)</label>
                <textarea value={ref.op2} onChange={(e) => { const n = [...refeicoes]; n[idx].op2 = e.target.value; setRefeicoes(n) }} className="w-full rounded border border-slate-800 bg-slate-950 p-2 text-xs" rows={2} />
              </div>
            </div>
          ))}
        </div>

        {/* Busca Supabase */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
          <h2 className="font-bold text-sm text-white">Banco TACO (Supabase)</h2>
          <input
            type="text"
            placeholder="Buscar alimento no banco..."
            value={buscaAlimento}
            onChange={(e) => setBuscaAlimento(e.target.value)}
            className="w-full rounded border border-slate-800 bg-slate-950 p-2 text-xs text-white"
          />

          <div className="space-y-2 max-h-[450px] overflow-y-auto">
            {loadingAlimentos ? (
              <p className="text-xs text-slate-500">Buscando...</p>
            ) : (
              alimentos.map((item) => (
                <div key={item.id} className="p-2.5 rounded border border-slate-800 bg-slate-950 text-xs space-y-1">
                  <div className="font-semibold text-white">{item.nome}</div>
                  <div className="text-[10px] text-slate-400">🔥 {item.calorias} kcal | P: {item.proteinas}g | C: {item.carboidratos}g</div>
                  <div className="flex gap-1 pt-1">
                    <button onClick={() => adicionarAlimento(`${item.medida_padrao} de ${item.nome}`, 0, 'op1')} className="flex-1 text-[10px] bg-emerald-500/10 text-emerald-400 py-1 rounded">+ Opção 1</button>
                    <button onClick={() => adicionarAlimento(`${item.medida_padrao} de ${item.nome}`, 0, 'op2')} className="flex-1 text-[10px] bg-sky-500/10 text-sky-400 py-1 rounded">+ Opção 2</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}