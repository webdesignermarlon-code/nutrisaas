'use client'

import { useState, useEffect } from 'react'

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

// Modelos Clínicos Completos (6 Refeições)
const modelosPreProntos: Record<string, any> = {
  diabeticos: {
    titulo: 'Plano Controle Glicêmico (Diabetes Tipo 2 / Pré-Diabetes)',
    calorias: '1600',
    refeicoes: [
      { hora: '07:30', nome: 'Café da Manhã', op1: '2 ovos mexidos com azeite + 1 fatia de pão 100% integral + chá de canela', op2: '1 iogurte natural desnatado + 15g de semente de chia + 3 morangos' },
      { hora: '10:00', nome: 'Lanche da Manhã', op1: '30g de nozes ou castanhas do pará', op2: '1 abacate pequeno (100g) com limão e farelo de aveia' },
      { hora: '12:30', nome: 'Almoço', op1: '130g Peito de frango grelhado + 80g Arroz integral + 100g Feijão + Salada folhosa à vontade', op2: '140g Filé de Tilápia + 100g Quinoa cozida + Brócolis e couve-flor no vapor' },
      { hora: '16:00', nome: 'Lanche da Tarde', op1: '1 maçã com casca + 15g de pasta de amendoim integral', op2: '1 scoop de Whey Protein isolado diluído em água' },
      { hora: '19:30', nome: 'Jantar', op1: '130g Patinho moído + Abobrinha e refogado de couve no azeite', op2: 'Omelete com 3 claras e 1 gema + salada verde com azeite de oliva' },
      { hora: '21:30', nome: 'Ceia', op1: '1 xícara de chá de camomila + 3 castanhas-do-pará', op2: '100g de iogurte natural desnatado com canela em pó' }
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
      { hora: '19:00', nome: 'Jantar', op1: '120g Carne moída bem sequinha + 100g Macarrão sem molho picado', op2: 'Tiras de frango grelhado bem macias + 100g Purê de batata inglesa' },
      { hora: '21:00', nome: 'Ceia', op1: '1 copo de leite morno com canela', op2: '1 banana assada com aveia polvilhada' }
    ]
  },
  mounjaro: {
    titulo: 'Plano Nutricional Protocolo GLP-1 (Mounjaro / Ozempic)',
    calorias: '1400',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '2 ovos cozidos + 1 xícara de chá de hortelã ou gengibre', op2: '1 scoop de Whey Protein em água + 10g de chia' },
      { hora: '10:30', nome: 'Lanche da Manhã', op1: '1/2 xícara de mamão papaia em cubos', op2: '1 iogurte proteico desnatado' },
      { hora: '12:00', nome: 'Almoço', op1: '120g Peito de frango desfiado macio + 50g Arroz integral + Legumes cozidos', op2: '120g Filé de peixe assado + 60g Purê de mandioca + Salada leve' },
      { hora: '15:30', nome: 'Lanche da Tarde', op1: '1 fatia de queijo minas frescal + 1/2 maçã', op2: '1 scoop de Whey Protein batido com água de coco' },
      { hora: '19:00', nome: 'Jantar', op1: 'Sopa leve de legumes com peito de frango desfiado', op2: 'Omelete de claras com espinafre e queijo cottage' },
      { hora: '21:00', nome: 'Ceia', op1: 'Chá de erva-doce sem açúcar', op2: '1 xícara de chá de camomila com limão' }
    ]
  },
  bariatrica_pre: {
    titulo: 'Protocolo Pré-Bariátrica (Redução de Gordura Hepática)',
    calorias: '1200',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '1 scoop de Whey Protein + 200ml de leite desnatado', op2: '2 claras de ovo mexidas + café com adoçante' },
      { hora: '10:30', nome: 'Lanche da Manhã', op1: '1 iogurte 0% gordura e 0% açúcar', op2: 'Gelatina zero açúcar + 1 colher de cottage' },
      { hora: '12:30', nome: 'Almoço', op1: '120g Peito de frango grelhado + Salada verde folhosa', op2: '130g Peixe grelhado + Brócolis no vapor' },
      { hora: '16:00', nome: 'Lanche da Tarde', op1: '1 scoop de Whey Protein + 100ml de água', op2: '1 fatia fina de queijo ricota' },
      { hora: '19:30', nome: 'Jantar', op1: 'Caldo claro de legumes batido com 100g de peito de frango', op2: '120g Patinho moído refogado + Abobrinha no vapor' },
      { hora: '21:30', nome: 'Ceia', op1: 'Chá de camomila com gotas de limão', op2: 'Gelatina zero açúcar' }
    ]
  },
  bariatrica_pos: {
    titulo: 'Protocolo Pós-Bariátrica (Fase Pastosa / Semissólida)',
    calorias: '900',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '50ml de Iogurte proteico desnatado', op2: '50ml de mingau leve de aveia com proteína' },
      { hora: '10:00', nome: 'Lanche da Manhã', op1: '50ml de purê de maçã assada sem açúcar', op2: '50ml de mamão papaia processado' },
      { hora: '12:00', nome: 'Almoço', op1: '60g Purê de frango com abóbora bem processado', op2: '60g Purê de peixe com batata inglesa' },
      { hora: '15:00', nome: 'Lanche da Tarde', op1: '1 scoop de Whey Isolado em 150ml de água (tomar devagar)', op2: '50g de queijo cottage amaciado' },
      { hora: '18:00', nome: 'Jantar', op1: '60g Sopa concentrada de patinho com legumes processados', op2: '60g Purê de mandioca com frango amaciado' },
      { hora: '20:30', nome: 'Ceia', op1: '50ml de chá de erva-doce gelado', op2: '50ml de infusão de camomila' }
    ]
  },
  obesidade: {
    titulo: 'Plano Reeducação Alimentar e Obesidade Severa',
    calorias: '1700',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '2 ovos mexidos + 2 fatias de pão integral + café sem açúcar', op2: '1 iogurte natural + 30g de aveia + 1 banana' },
      { hora: '10:30', nome: 'Lanche da Manhã', op1: '1 maçã + 3 castanhas-do-pará', op2: '1 xícara de morangos frescos' },
      { hora: '12:30', nome: 'Almoço', op1: '150g Peito de frango + 100g Arroz integral + 100g Feijão + Salada', op2: '150g Patinho moído + 120g Batata doce + Salada' },
      { hora: '16:00', nome: 'Lanche da Tarde', op1: '2 fatias de pão integral + 1 fatia de queijo minas', op2: '1 scoop de Whey Protein em água + 1 kiwi' },
      { hora: '19:30', nome: 'Jantar', op1: '140g Peixe assado + 100g Mandioca + Legumes refogados', op2: 'Omelete de 3 ovos com legumes + salada folhosa' },
      { hora: '21:30', nome: 'Ceia', op1: '1 iogurte desnatado com canela', op2: '1 xícara de chá de hortelã + 1 torrada integral' }
    ]
  },
  emagrecimento: {
    titulo: 'Plano Hipocalórico - Emagrecimento Ativo',
    calorias: '1500',
    refeicoes: [
      { hora: '08:00', nome: 'Café da Manhã', op1: '2 ovos mexidos + 1 fatia de pão integral + café preto', op2: '1 iogurte desnatado + 20g de aveia + 1 maçã' },
      { hora: '10:30', nome: 'Lanche da Manhã', op1: '1 kiwi ou 1 goiaba fresca', op2: '20g de sementes de abóbora tostadas' },
      { hora: '12:30', nome: 'Almoço', op1: '120g Peito de frango grelhado + 80g Arroz integral + Salada verde', op2: '130g Filé de Tilápia + 100g Batata doce + Salada' },
      { hora: '16:00', nome: 'Lanche da Tarde', op1: '1 banana prata + 10g de castanhas', op2: '1 scoop de Whey Protein em água' },
      { hora: '19:30', nome: 'Jantar', op1: '120g Patinho moído + Legumes no vapor', op2: 'Omelete com 3 claras e 1 gema + salada de folhas' },
      { hora: '21:30', nome: 'Ceia', op1: '1 xícara de chá de erva-cidreira', op2: '2 fatias finas de queijo minas frescal' }
    ]
  },
  hipertrofia: {
    titulo: 'Plano Hipercalórico - Ganho de Massa Muscular',
    calorias: '2800',
    refeicoes: [
      { hora: '07:30', nome: 'Café da Manhã', op1: '3 ovos mexidos + 2 fatias de pão integral + 1 banana + 20g pasta amendoim', op2: 'Vitamina: 300ml leite + 40g aveia + 1 scoop de Whey + 1 banana' },
      { hora: '10:00', nome: 'Lanche da Manhã', op1: '2 fatias de pão integral + 60g de atum em conserva', op2: '150g Batata doce cozida + 100g Frango desfiado' },
      { hora: '12:30', nome: 'Almoço', op1: '180g Peito de frango + 200g Arroz branco + 100g Feijão + Salada', op2: '180g Carne moída + 220g Macarrão integral com molho caseiro' },
      { hora: '16:00', nome: 'Pré-Treino / Lanche', op1: '150g Batata doce + 1 scoop Whey Protein', op2: '2 bananas + 30g Aveia + 1 colher de mel' },
      { hora: '19:30', nome: 'Jantar', op1: '180g Filé de Tilápia + 200g Arroz integral + Salada no azeite', op2: '180g Peito de frango + 250g Mandioca cozida' },
      { hora: '21:30', nome: 'Ceia', op1: '30g Whey Protein + 15g Pasta de amendoim + 100ml de leite', op2: '150g Iogurte grego + 20g de nozes picadas' }
    ]
  }
}

export default function DietasPage() {
  const [isLight, setIsLight] = useState(false)
  const [nutricionista, setNutricionista] = useState('Dra. Nutricionista')
  const [crn, setCrn] = useState('CRN 12345/RJ')
  const [paciente, setPaciente] = useState('')
  const [telefonePaciente, setTelefonePaciente] = useState('')
  const [titulo, setTitulo] = useState('')
  const [calorias, setCalorias] = useState('')
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todas')
  const [refeicaoAtivaIndex, setRefeicaoAtivaIndex] = useState(0)

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

  const [refeicoes, setRefeicoes] = useState([
    { hora: '08:00', nome: 'Café da Manhã', op1: '2 ovos mexidos + 1 fatia de pão integral', op2: '1 iogurte desnatado + 20g de aveia' }
  ])

  const carregarModelo = (chave: string) => {
    const mod = modelosPreProntos[chave]
    if (mod) {
      setTitulo(mod.titulo)
      setCalorias(mod.calorias)
      setRefeicoes(mod.refeicoes)
      setRefeicaoAtivaIndex(0)
    }
  }

  const adicionarRefeicao = () => {
    const novas = [
      ...refeicoes,
      { hora: '12:00', nome: 'Nova Refeição', op1: '', op2: '' }
    ]
    setRefeicoes(novas)
    setRefeicaoAtivaIndex(novas.length - 1)
  }

  const removerRefeicao = (idx: number) => {
    const filtradas = refeicoes.filter((_, i) => i !== idx)
    setRefeicoes(filtradas)
    if (refeicaoAtivaIndex >= filtradas.length) {
      setRefeicaoAtivaIndex(Math.max(0, filtradas.length - 1))
    }
  }

  const adicionarAlimento = (texto: string, idxRef: number, opcao: 'op1' | 'op2') => {
    if (idxRef < 0 || idxRef >= refeicoes.length) return
    const novas = [...refeicoes]
    const atual = novas[idxRef][opcao]
    novas[idxRef][opcao] = atual ? `${atual} + ${texto}` : texto
    setRefeicoes(novas)
  }

  const handleImprimirPDF = () => {
    window.print()
  }

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

  // Estilos de modo claro/escuro dinâmicos
  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgSubCard = isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/50 border-slate-800'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  return (
    <div className="space-y-6">
      <style jsx global>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          aside, nav, .no-print, button, input, select {
            display: none !important;
          }
          .dieta-print-container {
            padding: 0px !important;
            background: #ffffff !important;
            color: #000000 !important;
            width: 100% !important;
          }
          .card-print {
            border: 1px solid #cbd5e1 !important;
            background-color: #f8fafc !important;
            color: #0f172a !important;
            page-break-inside: avoid;
            margin-bottom: 16px !important;
            padding: 16px !important;
            border-radius: 8px !important;
          }
          .print-header-text {
            display: block !important;
            font-size: 16px !important;
            font-weight: bold !important;
            color: #0f172a !important;
            margin-bottom: 8px !important;
          }
          .print-value-text {
            display: block !important;
            font-size: 13px !important;
            color: #334155 !important;
            white-space: pre-wrap !important;
          }
        }
      `}</style>

      {/* Topo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-emerald-500">Montador de Plano Alimentar</h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Modelos completos de 6 refeições com ajuste perfeito no modo claro e escuro
          </p>
        </div>

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

      {/* Modelos Prontos */}
      <div className={`rounded-2xl border p-4 space-y-2 no-print ${bgCard}`}>
        <span className={`text-xs block ${textLabel}`}>Modelos Clínicos Prontos (Completos - 6 Refeições):</span>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => carregarModelo('diabeticos')} className={`text-xs border px-3 py-1.5 rounded-lg transition font-medium ${isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-emerald-700' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700'}`}>🩺 Diabéticos</button>
          <button onClick={() => carregarModelo('tea')} className={`text-xs border px-3 py-1.5 rounded-lg transition font-medium ${isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-emerald-700' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700'}`}>🧩 TEA / Seletividade</button>
          <button onClick={() => carregarModelo('mounjaro')} className={`text-xs border px-3 py-1.5 rounded-lg transition font-medium ${isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-emerald-700' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700'}`}>💉 Mounjaro / GLP-1</button>
          <button onClick={() => carregarModelo('bariatrica_pre')} className={`text-xs border px-3 py-1.5 rounded-lg transition font-medium ${isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-emerald-700' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700'}`}>🏥 Pré-Bariátrica</button>
          <button onClick={() => carregarModelo('bariatrica_pos')} className={`text-xs border px-3 py-1.5 rounded-lg transition font-medium ${isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-emerald-700' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700'}`}>🥣 Pós-Bariátrica</button>
          <button onClick={() => carregarModelo('obesidade')} className={`text-xs border px-3 py-1.5 rounded-lg transition font-medium ${isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-emerald-700' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700'}`}>⚖️ Obesidade</button>
          <button onClick={() => carregarModelo('emagrecimento')} className={`text-xs border px-3 py-1.5 rounded-lg transition font-medium ${isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-emerald-700' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700'}`}>🔥 Emagrecimento</button>
          <button onClick={() => carregarModelo('hipertrofia')} className={`text-xs border px-3 py-1.5 rounded-lg transition font-medium ${isLight ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-emerald-700' : 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border-slate-700'}`}>💪 Hipertrofia</button>
        </div>
      </div>

      <div className={`rounded-2xl border p-6 space-y-4 dieta-print-container ${bgCard}`}>
        
        {/* PDF Header na Impressão */}
        <div className="hidden print:block border-b border-slate-300 pb-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{nutricionista}</h1>
              <p className="text-sm text-slate-600">{crn}</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold text-emerald-700">NutriSaaS</span>
              <p className="text-xs text-slate-500">Plano Alimentar Personalizado</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-200 flex justify-between text-sm text-slate-800">
            <div><b>Paciente:</b> {paciente || 'Não informado'}</div>
            <div><b>Plano:</b> {titulo || 'Prescrição Alimentar'}</div>
            {calorias && <div><b>Meta:</b> {calorias} kcal/dia</div>}
          </div>
        </div>

        {/* Inputs de Cadastro */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 no-print">
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Nutricionista</label>
            <input type="text" value={nutricionista} onChange={(e) => setNutricionista(e.target.value)} className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`} />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>CRN</label>
            <input type="text" value={crn} onChange={(e) => setCrn(e.target.value)} className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`} />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Nome do Paciente</label>
            <input type="text" placeholder="Ex: Maria Silva" value={paciente} onChange={(e) => setPaciente(e.target.value)} className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`} />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>WhatsApp Paciente</label>
            <input type="text" placeholder="Ex: 21999998888" value={telefonePaciente} onChange={(e) => setTelefonePaciente(e.target.value)} className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 no-print">
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Título do Plano Alimentar</label>
            <input type="text" placeholder="Ex: Dieta Hipertrofia - Fase 1" value={titulo} onChange={(e) => setTitulo(e.target.value)} className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`} />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Meta Calórica (kcal)</label>
            <input type="number" placeholder="Ex: 1800" value={calorias} onChange={(e) => setCalorias(e.target.value)} className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`} />
          </div>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          
          {/* Refeições Estruturadas */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center mb-2 no-print">
              <h2 className="text-lg font-bold">Refeições Estruturadas</h2>
              <button onClick={adicionarRefeicao} className="text-xs bg-emerald-500 text-slate-950 font-bold px-3 py-2 rounded-xl hover:bg-emerald-400 transition">
                + Adicionar Refeição
              </button>
            </div>

            <div className="space-y-4">
              {refeicoes.map((ref, idx) => {
                const isAtiva = refeicaoAtivaIndex === idx
                return (
                  <div
                    key={idx}
                    onClick={() => setRefeicaoAtivaIndex(idx)}
                    className={`p-4 rounded-xl border transition cursor-pointer card-print relative ${
                      isAtiva
                        ? isLight
                          ? 'border-emerald-500 bg-emerald-50/40 shadow-sm'
                          : 'border-emerald-500 bg-slate-950 shadow-md shadow-emerald-500/5'
                        : isLight
                        ? 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                        : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="no-print flex justify-between items-center mb-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${
                        isAtiva
                          ? 'bg-emerald-500 text-slate-950'
                          : isLight ? 'bg-slate-200 text-slate-600' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {isAtiva ? '✓ Refeição Selecionada para Inserção' : 'Clique para Selecionar'}
                      </span>

                      {refeicoes.length > 1 && (
                        <button onClick={(e) => { e.stopPropagation(); removerRefeicao(idx); }} className="text-xs text-red-500 hover:text-red-400 font-semibold">
                          ✕ Remover
                        </button>
                      )}
                    </div>

                    <div className="hidden print:block print-header-text">
                      ⏰ {ref.hora || '00:00'} - {ref.nome || 'Refeição'}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 no-print mb-3">
                      <input
                        type="text"
                        value={ref.hora}
                        onChange={(e) => {
                          const newRefs = [...refeicoes]
                          newRefs[idx].hora = e.target.value
                          setRefeicoes(newRefs)
                        }}
                        className={`rounded-xl border p-2 text-xs ${bgInput}`}
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
                        className={`md:col-span-2 rounded-xl border p-2 text-xs ${bgInput}`}
                        placeholder="Nome da Refeição"
                      />
                    </div>

                    {/* Opção 1 */}
                    <div className="mb-3">
                      <label className={`block text-[10px] font-bold uppercase mb-1 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>Opção Principal (Opção 1)</label>
                      <textarea
                        value={ref.op1}
                        onChange={(e) => {
                          const newRefs = [...refeicoes]
                          newRefs[idx].op1 = e.target.value
                          setRefeicoes(newRefs)
                        }}
                        className={`w-full rounded-xl border p-2 text-xs focus:border-emerald-500 focus:outline-none no-print ${bgInput}`}
                        rows={2}
                        placeholder="Alimentos da primeira opção..."
                      />
                      <div className="hidden print:block print-value-text">{ref.op1 || 'Nenhum alimento inserido.'}</div>
                    </div>

                    {/* Opção 2 */}
                    <div>
                      <label className={`block text-[10px] font-bold uppercase mb-1 ${isLight ? 'text-sky-700' : 'text-sky-400'}`}>Opção de Substituição (Opção 2)</label>
                      <textarea
                        value={ref.op2}
                        onChange={(e) => {
                          const newRefs = [...refeicoes]
                          newRefs[idx].op2 = e.target.value
                          setRefeicoes(newRefs)
                        }}
                        className={`w-full rounded-xl border p-2 text-xs focus:border-sky-500 focus:outline-none no-print ${bgInput}`}
                        rows={2}
                        placeholder="Alimentos de substituição..."
                      />
                      <div className="hidden print:block print-value-text">{ref.op2 || 'Sem opção de substituição.'}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Banco TACO */}
          <div className={`space-y-3 rounded-2xl border p-4 h-fit no-print ${bgSubCard}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm">Banco Nutricional TACO</h3>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-semibold">
                Destino: Refeição {refeicaoAtivaIndex + 1}
              </span>
            </div>

            <div>
              <label className={`block text-[10px] mb-1 ${textLabel}`}>Adicionar alimento na refeição:</label>
              <select
                value={refeicaoAtivaIndex}
                onChange={(e) => setRefeicaoAtivaIndex(Number(e.target.value))}
                className={`w-full rounded-xl border p-2 text-xs font-semibold text-emerald-500 ${bgInput}`}
              >
                {refeicoes.map((r, i) => (
                  <option key={i} value={i}>
                    {i + 1}. {r.hora} - {r.nome || 'Refeição'}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="Buscar alimento (ex: frango, ovo)..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className={`w-full rounded-xl border p-2 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
            />

            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className={`w-full rounded-xl border p-2 text-xs ${bgInput}`}
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

            <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
              {alimentosFiltrados.slice(0, 50).map((item) => (
                <div key={item.id} className={`p-2.5 rounded-xl border space-y-1.5 ${isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'}`}>
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-semibold">{item.nome}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-800 text-slate-400'}`}>{item.med}</span>
                  </div>

                  <div className={`text-[10px] flex gap-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <span>🔥 {item.cal} kcal</span>
                    <span>🍗 P: {item.prot}g</span>
                    <span>🍞 C: {item.carb}g</span>
                  </div>

                  <div className="flex gap-1 pt-1">
                    <button
                      onClick={() => adicionarAlimento(`${item.med} de ${item.nome}`, refeicaoAtivaIndex, 'op1')}
                      className="flex-1 text-[10px] bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 py-1 rounded-lg transition font-semibold"
                    >
                      + Opção 1
                    </button>
                    <button
                      onClick={() => adicionarAlimento(`${item.med} de ${item.nome}`, refeicaoAtivaIndex, 'op2')}
                      className="flex-1 text-[10px] bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 py-1 rounded-lg transition font-semibold"
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