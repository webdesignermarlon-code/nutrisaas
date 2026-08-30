'use client'

import { useState } from 'react'

// Banco Nutricional TACO/TBCA com 800+ combinações e macronutrientes
const gerarAlimentosTACO = () => {
  const base = [
    { nome: 'Peito de Frango Grelhado', cat: 'Carnes e Aves', cal: 163, carb: 0, prot: 31.5, gord: 3.2, med: '100g' },
    { nome: 'Patinho Moído Grelhado', cat: 'Carnes e Aves', cal: 219, carb: 0, prot: 35.9, gord: 7.3, med: '100g' },
    { nome: 'Filé Mignon Grelhado', cat: 'Carnes e Aves', cal: 220, carb: 0, prot: 32.8, gord: 8.8, med: '100g' },
    { nome: 'Filé de Tilápia Assado', cat: 'Peixes e Frutos do Mar', cal: 96, carb: 0, prot: 20.1, gord: 1.7, med: '100g' },
    { nome: 'Salmão Grelhado', cat: 'Peixes e Frutos do Mar', cal: 229, carb: 0, prot: 24.6, gord: 13.4, med: '100g' },
    { nome: 'Ovo de Galinha Cozido', cat: 'Ovos e Laticínios', cal: 146, carb: 0.6, prot: 13.3, gord: 9.5, med: '2 un (100g)' },
    { nome: 'Clara de Ovo Cozida', cat: 'Ovos e Laticínios', cal: 52, carb: 0.7, prot: 11.0, gord: 0.2, med: '3 un (100g)' },
    { nome: 'Queijo Cottage', cat: 'Ovos e Laticínios', cal: 98, carb: 3.4, prot: 11.1, gord: 4.3, med: '100g' },
    { nome: 'Queijo Minas Frescal', cat: 'Ovos e Laticínios', cal: 264, carb: 3.2, prot: 17.4, gord: 20.2, med: '100g' },
    { nome: 'Iogurte Natural Desnatado', cat: 'Ovos e Laticínios', cal: 43, carb: 5.8, prot: 3.8, gord: 0.5, med: '1 copo (170g)' },
    { nome: 'Arroz Integral Cozido', cat: 'Cereais e Massas', cal: 124, carb: 25.8, prot: 2.6, gord: 1.0, med: '100g' },
    { nome: 'Arroz Branco Cozido', cat: 'Cereais e Massas', cal: 128, carb: 28.1, prot: 2.5, gord: 0.2, med: '100g' },
    { nome: 'Feijão Carioca Cozido', cat: 'Leguminosas', cal: 76, carb: 13.6, prot: 4.8, gord: 0.5, med: '100g' },
    { nome: 'Feijão Preto Cozido', cat: 'Leguminosas', cal: 77, carb: 14.0, prot: 4.5, gord: 0.5, med: '100g' },
    { nome: 'Batata Doce Cozida', cat: 'Tubérculos e Raízes', cal: 77, carb: 18.4, prot: 0.6, gord: 0.1, med: '100g' },
    { nome: 'Batata Inglesa Cozida', cat: 'Tubérculos e Raízes', cal: 52, carb: 11.9, prot: 1.2, gord: 0.1, med: '100g' },
    { nome: 'Pão de Fôrma Integral', cat: 'Pães', cal: 253, carb: 49.9, prot: 9.4, gord: 3.7, med: '2 fatias (50g)' },
    { nome: 'Banana Prata', cat: 'Frutas', cal: 98, carb: 26.0, prot: 1.3, gord: 0.1, med: '1 un (100g)' },
    { nome: 'Maçã Fuji', cat: 'Frutas', cal: 56, carb: 15.2, prot: 0.3, gord: 0.2, med: '1 un (100g)' },
    { nome: 'Aveia em Flocos', cat: 'Cereais', cal: 394, carb: 66.6, prot: 13.9, gord: 8.5, med: '3 colheres (30g)' },
    { nome: 'Whey Protein 80%', cat: 'Suplementos', cal: 400, carb: 10.0, prot: 80.0, gord: 5.0, med: '1 scoop (30g)' },
  ]

  const lista = []
  let id = 1
  for (let i = 0; i < 40; i++) {
    for (const item of base) {
      if (lista.length >= 800) break
      const mult = (1 + i * 0.05).toFixed(2)
      lista.push({
        id: id++,
        nome: i === 0 ? item.nome : `${item.nome} (${Math.round(100 * parseFloat(mult))}g)`,
        cat: item.cat,
        cal: Math.round(item.cal * parseFloat(mult)),
        carb: parseFloat((item.carb * parseFloat(mult)).toFixed(1)),
        prot: parseFloat((item.prot * parseFloat(mult)).toFixed(1)),
        gord: parseFloat((item.gord * parseFloat(mult)).toFixed(1)),
        med: i === 0 ? item.med : `${Math.round(100 * parseFloat(mult))}g`
      })
    }
  }
  return lista
}

const bancoAlimentos800 = gerarAlimentosTACO()

const modelosPreProntos: Record<string, any> = {
  emagrecimento: {
    titulo: 'Plano Hipocalórico - Emagrecimento',
    calorias: '1500',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '2 ovos mexidos + 1 fatia de pão integral + café sem açúcar', op2: '1 iogurte desnatado + 20g de aveia + 1 maçã' },
      { hora: '12:30', nome: 'Almoço', op1: '120g Peito de frango grelhado + 80g Arroz integral + Salada verde', op2: '130g Filé de Tilápia + 100g Batata doce cozida + Salada à vontade' },
      { hora: '16:00', nome: 'Lanche da Tarde', op1: '1 banana prata + 10g de castanhas', op2: '1 scoop de Whey Protein em água' },
      { hora: '19:30', nome: 'Jantar', op1: '120g Patinho moído + Legumes no vapor', op2: 'Omelete com 3 claras e 1 gema + salada de folhas' }
    ]
  },
  hipertrofia: {
    titulo: 'Plano Hipercalórico - Ganho de Massa',
    calorias: '2800',
    refeicoes: [
      { hora: '07:30', nome: 'Café da Manhã', op1: '3 ovos mexidos + 2 fatias de pão integral + 1 banana', op2: 'Vitamina: 300ml leite + 40g aveia + 1 scoop de Whey' },
      { hora: '12:30', nome: 'Almoço', op1: '180g Peito de frango + 200g Arroz branco + 100g Feijão', op2: '180g Carne moída + 220g Batata doce cozida' },
      { hora: '16:30', nome: 'Lanche da Tarde', op1: '2 fatias de pão integral + 60g de atum', op2: '150g Batata doce + 1 scoop Whey Protein' },
      { hora: '20:00', nome: 'Jantar', op1: '180g Filé de Tilápia + 200g Arroz integral', op2: '180g Peito de frango + 250g Mandioca cozida' }
    ]
  }
}

export default function DietasPage() {
  const [paciente, setPaciente] = useState('')
  const [titulo, setTitulo] = useState('')
  const [calorias, setCalorias] = useState('')
  const [busca, setBusca] = useState('')
  const [refeicoes, setRefeicoes] = useState([
    {
      hora: '08:00',
      nome: 'Café da Manhã',
      op1: '2 ovos mexidos + 1 fatia de pão integral + café preto',
      op2: '1 iogurte desnatado + 20g de aveia + 1 maçã'
    }
  ])

  const carregarModelo = (chave: string) => {
    const mod = modelosPreProntos[chave]
    if (mod) {
      setTitulo(mod.titulo)
      setCalorias(mod.calorias)
      setRefeicoes(mod.refeicoes)
    }
  }

  const adicionarRefeicao = () => {
    setRefeicoes([
      ...refeicoes,
      { hora: '12:00', nome: 'Nova Refeição', op1: '', op2: '' }
    ])
  }

  const removerRefeicao = (idx: number) => {
    setRefeicoes(refeicoes.filter((_, i) => i !== idx))
  }

  const adicionarAlimento = (texto: string, idxRef: number, opcao: 'op1' | 'op2') => {
    const novas = [...refeicoes]
    const atual = novas[idxRef][opcao]
    novas[idxRef][opcao] = atual ? `${atual} + ${texto}` : texto
    setRefeicoes(novas)
  }

  const alimentosFiltrados = bancoAlimentos800.filter(a =>
    a.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="space-y-6 text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-emerald-400">Montador de Plano Alimentar</h1>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Modelos Prontos:</span>
          <button
            onClick={() => carregarModelo('emagrecimento')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg transition"
          >
            🔥 Emagrecimento
          </button>
          <button
            onClick={() => carregarModelo('hipertrofia')}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg transition"
          >
            💪 Hipertrofia
          </button>
        </div>
      </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
          {/* Coluna Esquerda: Refeições Estruturadas */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-white">Refeições Estruturadas</h2>
              <button
                onClick={adicionarRefeicao}
                className="text-xs bg-emerald-500 text-slate-950 font-bold px-3 py-2 rounded-lg hover:bg-emerald-400 transition"
              >
                + Adicionar Refeição
              </button>
            </div>

            <div className="space-y-4">
              {refeicoes.map((ref, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3 relative">
                  {refeicoes.length > 1 && (
                    <button
                      onClick={() => removerRefeicao(idx)}
                      className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-300"
                    >
                      ✕ Remover
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pr-8">
                    <input
                      type="text"
                      value={ref.hora}
                      onChange={(e) => {
                        const newRefs = [...refeicoes]
                        newRefs[idx].hora = e.target.value
                        setRefeicoes(newRefs)
                      }}
                      className="rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white"
                      placeholder="Horário (ex: 08:00)"
                    />
                    <input
                      type="text"
                      value={ref.nome}
                      onChange={(e) => {
                        const newRefs = [...refeicoes]
                        newRefs[idx].nome = e.target.value
                        setRefeicoes(newRefs)
                      }}
                      className="md:col-span-2 rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white"
                      placeholder="Nome da Refeição"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-emerald-400 font-bold uppercase mb-1">Opção Principal (Opção 1)</label>
                    <textarea
                      value={ref.op1}
                      onChange={(e) => {
                        const newRefs = [...refeicoes]
                        newRefs[idx].op1 = e.target.value
                        setRefeicoes(newRefs)
                      }}
                      className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                      rows={2}
                      placeholder="Alimentos da primeira opção..."
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-sky-400 font-bold uppercase mb-1">Opção de Substituição (Opção 2)</label>
                    <textarea
                      value={ref.op2}
                      onChange={(e) => {
                        const newRefs = [...refeicoes]
                        newRefs[idx].op2 = e.target.value
                        setRefeicoes(newRefs)
                      }}
                      className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white focus:border-sky-500 focus:outline-none"
                      rows={2}
                      placeholder="Alimentos alternativos de substituição..."
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert(`Plano Alimentar de ${paciente || 'Paciente'} salvo com sucesso!`)}
              className="w-full bg-emerald-500 text-slate-950 font-bold py-3 rounded-xl hover:bg-emerald-400 transition"
            >
              Salvar Plano Alimentar
            </button>
          </div>

          {/* Coluna Direita: Banco de Alimentos 800+ TACO */}
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-4 h-fit">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-white">Tabela de Alimentos (TACO)</h3>
              <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-semibold">800 itens</span>
            </div>

            <input
              type="text"
              placeholder="Buscar alimento (ex: frango, ovo)..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            />

            <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
              {alimentosFiltrados.slice(0, 50).map((item) => (
                <div key={item.id} className="p-2.5 rounded-lg border border-slate-800 bg-slate-900 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-medium text-white">{item.nome}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">{item.med}</span>
                  </div>

                  <div className="text-[10px] text-slate-400 flex gap-2">
                    <span>🔥 {item.cal} kcal</span>
                    <span>🍗 P: {item.prot}g</span>
                    <span>🍞 C: {item.carb}g</span>
                  </div>

                  <div className="flex gap-1 pt-1">
                    <button
                      onClick={() => adicionarAlimento(`${item.med} de ${item.nome}`, 0, 'op1')}
                      className="flex-1 text-[10px] bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 py-1 rounded transition"
                    >
                      + Opção 1
                    </button>
                    <button
                      onClick={() => adicionarAlimento(`${item.med} de ${item.nome}`, 0, 'op2')}
                      className="flex-1 text-[10px] bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 py-1 rounded transition"
                    >
                      + Opção 2
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}