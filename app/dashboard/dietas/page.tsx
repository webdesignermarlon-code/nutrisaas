'use client'

import { useState } from 'react'

// Banco Nutricional TACO/TBCA
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
    { nome: 'Feijão Carioca Cozido', cat: 'Leguminosas', cal: 76, carb: 13.6, prot: 4.8, gord: 0.5, med: '100g' },
    { nome: 'Batata Doce Cozida', cat: 'Tubérculos e Raízes', cal: 77, carb: 18.4, prot: 0.6, gord: 0.1, med: '100g' },
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

const bancoAlimentos = gerarAlimentosTACO()

const modelosPreProntos: Record<string, any> = {
  diabeticos: {
    titulo: 'Plano Controle Glicêmico (Diabetes Tipo 2 / Pré-Diabetes)',
    calorias: '1600',
    refeicoes: [
      { hora: '07:30', nome: 'Café da Manhã', op1: '2 ovos mexidos com azeite + 1 fatia de pão 100% integral + chá de canela', op2: '1 iogurte natural desnatado + 15g de semente de chia + 3 morangos' },
      { hora: '10:00', nome: 'Lanche da Manhã', op1: '30g de nozes ou castanhas do pará', op2: '1 abacate pequeno (100g) com limão e farelo de aveia' },
      { hora: '12:30', nome: 'Almoço', op1: '130g Peito de frango grelhado + 80g Arroz integral + 100g Feijão + Salada folhosa à vontade', op2: '140g Filé de Tilápia + 100g Quinoa cozida + Brócolis e couve-flor no vapor' },
      { hora: '16:00', nome: 'Lanche da Tarde', op1: '1 maçã com casca + 15g de pasta de amendoim integral', op2: '1 scoop de Whey Protein isolado diluído em água' },
      { hora: '19:30', nome: 'Jantar', op1: '130g Patinho moído + Abobrinha e refogado de couve no azeite', op2: 'Omelete com 3 claras e 1 gema + salada verde com azeite de oliva extra virgem' }
    ]
  },
  tea: {
    titulo: 'Plano Adaptado TEA (Seletividade Alimentar e Suporte Sensorial)',
    calorias: '1800',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: 'Panqueca crocante (1 ovo + 20g aveia + 1 banana amassada)', op2: 'Pão de fôrma integral tostado bem crocante + queijo cottage' },
      { hora: '10:30', nome: 'Lanche da Manhã', op1: 'Morangos frescos higienizados e cortados em cubos', op2: 'Uvas sem semente congeladas ou em temperatura ambiente' },
      { hora: '12:00', nome: 'Almoço', op1: '120g Tiras de peito de frango empanadas na farinha de aveia + 100g Batata sorriso caseira', op2: '120g Hambúrguer caseiro de patinho + 100g Arroz branco soltinho' },
      { hora: '15:30', nome: 'Lanche da Tarde', op1: 'Vitamina batida (Leite + banana + maçã sem casca)', op2: 'Iogurte natural batido com frutas vermelhas coado' },
      { hora: '19:00', nome: 'Jantar', op1: '120g Carne moída bem sequinha + 100g Macarrão sem molho picado', op2: 'Tiras de frango grelhado bem macias + 100g Purê de batata inglesa' }
    ]
  },
  mounjaro: {
    titulo: 'Plano Nutricional Protocolo GLP-1 (Mounjaro / Ozempic)',
    calorias: '1400',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '2 ovos cozidos ou mexidos + 1 xícara de chá digestivo (hortelã ou gengibre)', op2: '1 scoop de Whey Protein em água + 10g de chia' },
      { hora: '12:00', nome: 'Almoço', op1: '120g Peito de frango desfiado macio + 50g Arroz integral + Legumes cozidos', op2: '120g Filé de peixe assado + 60g Purê de mandioca + Salada leve' },
      { hora: '15:30', nome: 'Lanche da Tarde', op1: '1 iogurte proteico desnatado', op2: '1 fatia de queijo minas frescal + 1/2 maçã' },
      { hora: '19:00', nome: 'Jantar', op1: 'Sopa de legumes enriquecida com frango desfiado', op2: 'Omelete de claras com espinafre e cottage' }
    ]
  },
  bariatrica_pre: {
    titulo: 'Protocolo Pré-Bariátrica (Redução de Gordura Hepática)',
    calorias: '1200',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '1 scoop de Whey Protein + 200ml de leite desnatado', op2: '2 claras de ovo mexidas + café com adoçante' },
      { hora: '12:30', nome: 'Almoço', op1: '120g Peito de frango grelhado + Salada verde folhosa', op2: '130g Peixe grelhado + Brócolis no vapor' },
      { hora: '19:30', nome: 'Jantar', op1: 'Caldo claro de legumes batido com 100g de peito de frango', op2: '120g Patinho moído refogado + Abobrinha no vapor' }
    ]
  },
  bariatrica_pos: {
    titulo: 'Protocolo Pós-Bariátrica (Fase Pastosa / Semissólida)',
    calorias: '900',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '50ml de Iogurte proteico desnatado', op2: '50ml de mingau leve de aveia com proteína' },
      { hora: '12:00', nome: 'Almoço', op1: '60g Purê de frango com abóbora bem processado', op2: '60g Purê de peixe com batata inglesa' },
      { hora: '18:00', nome: 'Jantar', op1: '60g Sopa concentrada de patinho com legumes processados', op2: '60g Purê de mandioca com frango amaciado' }
    ]
  },
  obesidade: {
    titulo: 'Plano Reeducação Alimentar e Obesidade Severa',
    calorias: '1700',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '2 ovos mexidos + 2 fatias de pão integral + café sem açúcar', op2: '1 iogurte natural + 30g de aveia + 1 banana' },
      { hora: '12:30', nome: 'Almoço', op1: '150g Peito de frango + 100g Arroz integral + 100g Feijão + Salada', op2: '150g Patinho moído + 120g Batata doce + Salada' },
      { hora: '19:30', nome: 'Jantar', op1: '140g Peixe assado + 100g Mandioca + Legumes refogados', op2: 'Omelete de 3 ovos com legumes + salada folhosa' }
    ]
  },
  emagrecimento: {
    titulo: 'Plano Hipocalórico - Emagrecimento Ativo',
    calorias: '1500',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '2 ovos mexidos + 1 fatia de pão integral + café preto', op2: '1 iogurte desnatado + 20g de aveia + 1 maçã' },
      { hora: '12:30', nome: 'Almoço', op1: '120g Peito de frango grelhado + 80g Arroz integral + Salada verde', op2: '130g Filé de Tilápia + 100g Batata doce + Salada' },
      { hora: '19:30', nome: 'Jantar', op1: '120g Patinho moído + Legumes no vapor', op2: 'Omelete com 3 claras e 1 gema + salada de folhas' }
    ]
  },
  hipertrofia: {
    titulo: 'Plano Hipercalórico - Ganho de Massa Muscular',
    calorias: '2800',
    refeicoes: [
      { hora: '07:30', nome: 'Café da Manhã', op1: '3 ovos mexidos + 2 fatias de pão integral + 1 banana', op2: 'Vitamina: 300ml leite + 40g aveia + 1 scoop de Whey' },
      { hora: '12:30', nome: 'Almoço', op1: '180g Peito de frango + 200g Arroz branco + 100g Feijão', op2: '180g Carne moída + 220g Batata doce' },
      { hora: '20:00', nome: 'Jantar', op1: '180g Filé de Tilápia + 200g Arroz integral', op2: '180g Peito de frango + 250g Mandioca' }
    ]
  }
}

export default function DietasPage() {
  const [nutricionista, setNutricionista] = useState('Dra. Nutricionista')
  const [crn, setCrn] = useState('CRN 12345/RJ')
  const [paciente, setPaciente] = useState('')
  const [telefonePaciente, setTelefonePaciente] = useState('')
  const [titulo, setTitulo] = useState('')
  const [calorias, setCalorias] = useState('')
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [refeicoes, setRefeicoes] = useState([
    {
      hora: '08:00',
      nome: 'Café da Manhã',
      op1: '2 ovos mexidos + 1 fatia de pão integral',
      op2: '1 iogurte desnatado + 20g de aveia'
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

  // Ação de Imprimir/Baixar PDF
  const handleImprimirPDF = () => {
    window.print()
  }

  // Ação de Enviar via WhatsApp
  const handleEnviarWhatsApp = () => {
    let mensagem = `📋 *PLANO ALIMENTAR PERSONALIZADO*\n`
    mensagem += `👤 *Paciente:* ${paciente || 'Paciente'}\n`
    mensagem += `🩺 *Nutricionista:* ${nutricionista} (${crn})\n`
    mensagem += `🎯 *Plano:* ${titulo || 'Prescrição Nutricional'}\n`
    if (calorias) mensagem += `🔥 *Meta Calórica:* ${calorias} kcal/dia\n`
    mensagem += `-----------------------------------\n\n`

    refeicoes.forEach((ref) => {
      mensagem += `⏰ *${ref.hora} - ${ref.nome}*\n`
      if (ref.op1) mensagem += `• *Opção 1:* ${ref.op1}\n`
      if (ref.op2) mensagem += `• *Opção 2:* ${ref.op2}\n`
      mensagem += `\n`
    })

    mensagem += `✨ _Acompanhamento Nutricional Exclusivo_`

    const url = `https://api.whatsapp.com/send?phone=${telefonePaciente.replace(/\D/g, '')}&text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  const alimentosFiltrados = bancoAlimentos.filter(a => {
    const porNome = a.nome.toLowerCase().includes(busca.toLowerCase())
    const porCat = categoria === 'Todas' || a.cat === categoria
    return porNome && porCat
  })

  return (
    <div className="space-y-6 text-slate-100">
      {/* Estilo Especial de Impressão (Apenas a Dieta Bonita e Profissional no PDF) */}
      <style jsx global>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          aside, nav, .no-print, button, input, select {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          .dieta-print-container {
            padding: 20px !important;
            background: #ffffff !important;
            color: #000000 !important;
            width: 100% !important;
          }
          .card-print {
            border: 1px solid #e2e8f0 !important;
            background-color: #f8fafc !important;
            color: #000000 !important;
            page-break-inside: avoid;
            margin-bottom: 15px !important;
            padding: 15px !important;
            border-radius: 8px !important;
          }
        }
      `}</style>

      {/* Topo do Montador */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-emerald-400">Montador de Plano Alimentar</h1>
          <p className="text-xs text-slate-400">Monte, imprima em PDF elegante ou envie diretamente via WhatsApp</p>
        </div>

        {/* Botões de Ação Profissional */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleImprimirPDF}
            className="flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-400 transition text-xs shadow-lg shadow-emerald-500/10"
          >
            🖨️ Imprimir / Salvar PDF
          </button>
          <button
            onClick={handleEnviarWhatsApp}
            className="flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-500 transition text-xs shadow-lg shadow-emerald-600/10"
          >
            💬 Enviar via WhatsApp
          </button>
        </div>
      </div>

      {/* Seletor de Modelos Clínicos */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-2 no-print">
        <span className="text-xs font-semibold text-slate-300 block">Modelos Clínicos Prontos para Uso Rápido:</span>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => carregarModelo('diabeticos')} className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium">🩺 Diabéticos</button>
          <button onClick={() => carregarModelo('tea')} className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium">🧩 TEA / Seletividade</button>
          <button onClick={() => carregarModelo('mounjaro')} className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium">💉 Mounjaro / GLP-1</button>
          <button onClick={() => carregarModelo('bariatrica_pre')} className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium">🏥 Pré-Bariátrica</button>
          <button onClick={() => carregarModelo('bariatrica_pos')} className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium">🥣 Pós-Bariátrica</button>
          <button onClick={() => carregarModelo('obesidade')} className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium">⚖️ Obesidade</button>
          <button onClick={() => carregarModelo('emagrecimento')} className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium">🔥 Emagrecimento</button>
          <button onClick={() => carregarModelo('hipertrofia')} className="text-xs bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 px-3 py-1.5 rounded-lg transition font-medium">💪 Hipertrofia</button>
        </div>
      </div>

      {/* Formulário Principal */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4 dieta-print-container">
        
        {/* Cabeçalho do PDF na Impressão */}
        <div className="hidden print:block border-b pb-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{nutricionista}</h1>
              <p className="text-sm text-slate-600">{crn}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-emerald-600">NutriSaaS</span>
              <p className="text-xs text-slate-500">Prescrição Alimentar</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between text-sm text-slate-800">
            <div><b>Paciente:</b> {paciente || 'Não informado'}</div>
            <div><b>Plano:</b> {titulo || 'Prescrição Alimentar'}</div>
            {calorias && <div><b>Meta Calórica:</b> {calorias} kcal</div>}
          </div>
        </div>

        {/* Dados do Profissional e Paciente (Interface Web) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 no-print">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Nome do Nutricionista</label>
            <input
              type="text"
              value={nutricionista}
              onChange={(e) => setNutricionista(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">CRN do Profissional</label>
            <input
              type="text"
              value={crn}
              onChange={(e) => setCrn(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Nome do Paciente</label>
            <input
              type="text"
              placeholder="Ex: Maria Silva"
              value={paciente}
              onChange={(e) => setPaciente(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">WhatsApp Paciente (com DDD)</label>
            <input
              type="text"
              placeholder="Ex: 21999998888"
              value={telefonePaciente}
              onChange={(e) => setTelefonePaciente(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 no-print">
          <div>
            <label className="block text-xs text-slate-400 mb-1">Título do Plano Alimentar</label>
            <input
              type="text"
              placeholder="Ex: Dieta Hipertrofia - Fase 1"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Meta Calórica (kcal)</label>
            <input
              type="number"
              placeholder="Ex: 1800"
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
          {/* Coluna Esquerda: Refeições Estruturadas */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2 no-print">
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
                <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-3 relative card-print">
                  {refeicoes.length > 1 && (
                    <button
                      onClick={() => removerRefeicao(idx)}
                      className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-300 no-print"
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
                      className="rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white print:border-none print:font-bold print:text-slate-900"
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
                      className="md:col-span-2 rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white print:border-none print:font-bold print:text-slate-900"
                      placeholder="Nome da Refeição"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-emerald-400 font-bold uppercase mb-1 print:text-emerald-700">Opção Principal (Opção 1)</label>
                    <textarea
                      value={ref.op1}
                      onChange={(e) => {
                        const newRefs = [...refeicoes]
                        newRefs[idx].op1 = e.target.value
                        setRefeicoes(newRefs)
                      }}
                      className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white focus:border-emerald-500 focus:outline-none print:bg-white print:text-slate-900 print:border-slate-300"
                      rows={2}
                      placeholder="Alimentos da primeira opção..."
                    />
                  </div>

                  {ref.op2 && (
                    <div>
                      <label className="block text-[10px] text-sky-400 font-bold uppercase mb-1 print:text-sky-700">Opção de Substituição (Opção 2)</label>
                      <textarea
                        value={ref.op2}
                        onChange={(e) => {
                          const newRefs = [...refeicoes]
                          newRefs[idx].op2 = e.target.value
                          setRefeicoes(newRefs)
                        }}
                        className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white focus:border-sky-500 focus:outline-none print:bg-white print:text-slate-900 print:border-slate-300"
                        rows={2}
                        placeholder="Alimentos alternativos de substituição..."
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Coluna Direita: Banco de Alimentos TACO */}
          <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950 p-4 h-fit no-print">
            <h3 className="font-bold text-sm text-white">Banco Nutricional TACO</h3>

            <input
              type="text"
              placeholder="Buscar por alimento (ex: frango, ovo)..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
            />

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded border border-slate-800 bg-slate-900 p-2 text-xs text-slate-300"
            >
              <option value="Todas">Todas as Categorias</option>
              <option value="Carnes e Aves">Carnes e Aves</option>
              <option value="Peixes e Frutos do Mar">Peixes e Frutos do Mar</option>
              <option value="Ovos e Laticínios">Ovos e Laticínios</option>
              <option value="Cereais e Massas">Cereais e Massas</option>
              <option value="Leguminosas">Leguminosas</option>
              <option value="Tubérculos e Raízes">Tubérculos e Raízes</option>
              <option value="Frutas">Frutas</option>
              <option value="Pães">Pães</option>
              <option value="Suplementos">Suplementos</option>
            </select>

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