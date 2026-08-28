'use client'

import { useState, useEffect } from 'react'

const bancoLocalTACO = [
  { id: 1, nome: 'Arroz integral cozido', calorias: 124, carboidratos: 25.8, proteinas: 2.6, gorduras: 1.0, medida_padrao: '100g' },
  { id: 2, nome: 'Feijão carioca cozido', calorias: 76, carboidratos: 13.6, proteinas: 4.8, gorduras: 0.5, medida_padrao: '100g' },
  { id: 3, nome: 'Peito de frango grelhado', calorias: 163, carboidratos: 0.0, proteinas: 31.5, gorduras: 3.2, medida_padrao: '100g' },
  { id: 4, nome: 'Ovo de galinha cozido', calorias: 146, carboidratos: 0.6, proteinas: 13.3, gorduras: 9.5, medida_padrao: '2 un (100g)' },
  { id: 5, nome: 'Filé de Tilápia assado', calorias: 96, carboidratos: 0.0, proteinas: 20.1, gorduras: 1.7, medida_padrao: '100g' },
  { id: 6, nome: 'Batata doce cozida', calorias: 77, carboidratos: 18.4, proteinas: 0.6, gorduras: 0.1, medida_padrao: '100g' },
  { id: 7, nome: 'Pão de fôrma integral', calorias: 253, carboidratos: 49.9, proteinas: 9.4, gorduras: 3.7, medida_padrao: '2 fatias (50g)' },
  { id: 8, nome: 'Banana prata', calorias: 98, carboidratos: 26.0, proteinas: 1.3, gorduras: 0.1, medida_padrao: '1 un (100g)' },
  { id: 9, nome: 'Aveia em flocos', calorias: 394, carboidratos: 66.6, proteinas: 13.9, gorduras: 8.5, medida_padrao: '3 colheres (30g)' },
  { id: 10, nome: 'Azeite de oliva extra virgem', calorias: 884, carboidratos: 0.0, proteinas: 0.0, gorduras: 100.0, medida_padrao: '1 colher (10ml)' },
]

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
  const [refeicoes, setRefeicoes] = useState([
    { hora: '08:00', nome: 'Café da Manhã', op1: '2 ovos mexidos + 1 fatia de pão integral', op2: '1 iogurte desnatado + 20g de aveia' }
  ])

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

  const alimentosFiltrados = bancoLocalTACO.filter(a =>
    a.nome.toLowerCase().includes(buscaAlimento.toLowerCase())
  )

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-400">Montador Avançado de Dietas</h1>
          <p className="text-xs text-slate-400">Modelos prontos, 2 opções por refeição e busca de alimentos</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => carregarModelo('emagrecimento')} className="text-xs bg-slate-800 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-700">🔥 Emagrecimento</button>
          <button onClick={() => carregarModelo('hipertrofia')} className="text-xs bg-slate-800 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-700">💪 Hipertrofia</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <input type="text" placeholder="Nome do Paciente" value={paciente} onChange={(e) => setPaciente(e.target.value)} className="rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white" />
            <input type="text" placeholder="Título do Plano" value={titulo} onChange={(e) => setTitulo(e.target.value)} className="rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white" />
            <input type="number" placeholder="Meta Calórica (kcal)" value={calorias} onChange={(e) => setCalorias(e.target.value)} className="rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white" />
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

          <button onClick={() => alert('Plano alimentador salvo!')} className="w-full bg-emerald-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-emerald-400">Salvar Plano Alimentar</button>
        </div>

        {/* Tabela de Alimentos */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
          <h2 className="font-bold text-sm text-white">Banco TACO</h2>
          <input
            type="text"
            placeholder="Buscar alimento..."
            value={buscaAlimento}
            onChange={(e) => setBuscaAlimento(e.target.value)}
            className="w-full rounded border border-slate-800 bg-slate-950 p-2 text-xs text-white"
          />

          <div className="space-y-2 max-h-[450px] overflow-y-auto">
            {alimentosFiltrados.map((item) => (
              <div key={item.id} className="p-2.5 rounded border border-slate-800 bg-slate-950 text-xs space-y-1">
                <div className="font-semibold text-white">{item.nome}</div>
                <div className="text-[10px] text-slate-400">🔥 {item.calorias} kcal | P: {item.proteinas}g | C: {item.carboidratos}g</div>
                <div className="flex gap-1 pt-1">
                  <button onClick={() => adicionarAlimento(`${item.medida_padrao} de ${item.nome}`, 0, 'op1')} className="flex-1 text-[10px] bg-emerald-500/10 text-emerald-400 py-1 rounded">+ Opção 1</button>
                  <button onClick={() => adicionarAlimento(`${item.medida_padrao} de ${item.nome}`, 0, 'op2')} className="flex-1 text-[10px] bg-sky-500/10 text-sky-400 py-1 rounded">+ Opção 2</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}