'use client'

import { useState, useEffect } from 'react'

interface SuplementoCatalogo {
  nome: string
  posologiaSugerida: string
}

interface CategoriaSuplemento {
  categoria: string
  icone: string
  suplementos: SuplementoCatalogo[]
}

const bancoSuplementacao: CategoriaSuplemento[] = [
  {
    categoria: 'Hipertrofia, Força & Desempenho Esportivo',
    icone: '🏋️‍♂️',
    suplementos: [
      { nome: 'Creatina Monohidratada 100% Pura', posologiaSugerida: 'Tomar 3g a 5g diluídos em 200ml de água, diariamente no mesmo horário.' },
      { nome: 'Whey Protein Isolado 100%', posologiaSugerida: 'Consumir 30g diluídos em 200ml de água no pós-treino ou lanche.' },
      { nome: 'Whey Protein Concentrado 80%', posologiaSugerida: 'Consumir 30g diluídos em água ou leite vegetal no pós-treino.' },
      { nome: 'Whey Protein Hidrolisado', posologiaSugerida: 'Consumir 30g diluídos em água logo após o treino intenso.' },
      { nome: 'Proteína Vegana (Ervilha + Arroz)', posologiaSugerida: 'Consumir 30g diluídos em 250ml de água no lanche da tarde.' },
      { nome: 'Caseína Micelar 100%', posologiaSugerida: 'Consumir 30g diluídos em água antes de dormir.' },
      { nome: 'Albumina Pura em Pó', posologiaSugerida: 'Consumir 20g a 30g no café da manhã ou antes de dormir.' },
      { nome: 'Beta-Alanina Pura', posologiaSugerida: 'Consumir 2g fracionados 2x ao dia (ou 4g pré-treino) com água.' },
      { nome: 'Citrulina Malato 2:1', posologiaSugerida: 'Consumir 6g a 8g diluídos em água 45 minutos antes do treino.' },
      { nome: 'L-Arginina Quelato 1000mg', posologiaSugerida: 'Tomar 2 cápsulas 30 a 45 minutos antes do treino.' },
      { nome: 'BCAA 2:1:1 Pura em Pó', posologiaSugerida: 'Consumir 5g a 10g durante ou imediatamente após o treino.' },
      { nome: 'EAA - Aminoácidos Essenciais', posologiaSugerida: 'Consumir 10g diluídos em água intrarefeição ou intra-treino.' },
      { nome: 'Cafeína Anidra 200mg', posologiaSugerida: 'Tomar 1 cápsula 30 a 45 minutos antes do treino (evitar após as 16h).' },
      { nome: 'Taurina 1000mg', posologiaSugerida: 'Tomar 1 a 2 cápsulas junto ao pré-treino.' },
      { nome: 'HMB (β-Hidroxi-β-Metilbutirato) 3g', posologiaSugerida: 'Tomar 3g ao dia divididos em 3 doses nas refeições.' },
      { nome: 'ZMA (Zinco, Magnésio, B6)', posologiaSugerida: 'Tomar 2 a 3 cápsulas 30 a 60 minutos antes de dormir em jejum.' },
      { nome: 'D-Ribose Pura', posologiaSugerida: 'Consumir 5g diluídos em água antes e após o treino.' },
      { nome: 'Palatinose (Isomaltulose)', posologiaSugerida: 'Consumir 15g a 20g diluídos em água 30 minutos antes de treinos longos.' },
      { nome: 'Nitrato de Beterraba em Pó', posologiaSugerida: 'Consumir 10g diluídos em água 2 a 3 horas antes do exercício.' },
      { nome: 'Cordyceps Sinensis 500mg', posologiaSugerida: 'Tomar 1 a 2 cápsulas pela manhã para VO2 máximo e energia.' },
      { nome: 'Peak O2 Blend Fitoterápico 1000mg', posologiaSugerida: 'Consumir 1g a 2g diluídos em água no pré-treino.' },
      { nome: 'Ashwagandha KSM-66 500mg', posologiaSugerida: 'Tomar 1 cápsula 2x ao dia para força, testo e controle de cortisol.' },
    ],
  },
  {
    categoria: 'Emagrecimento, Termogênicos & Saciedade',
    icone: '🔥',
    suplementos: [
      { nome: 'Picolinato de Cromo 250mcg', posologiaSugerida: 'Tomar 1 cápsula 30 minutos antes do almoço ou jantar.' },
      { nome: 'Psyllium em Pó 100% Puro', posologiaSugerida: 'Tomar 1 colher de sopa (10g) diluída em 300ml de água 20min antes do almoço.' },
      { nome: 'Spirulina Orgânica 500mg', posologiaSugerida: 'Tomar 2 cápsulas 30 minutos antes do almoço e do jantar.' },
      { nome: 'Chlorella Pyrenoidosa 500mg', posologiaSugerida: 'Tomar 2 a 4 comprimidos ao dia com água antes das refeições.' },
      { nome: 'L-Carnitina L-Tartarato 2000mg', posologiaSugerida: 'Tomar 2g diluídos em água pela manhã em jejum ou pré-treino.' },
      { nome: 'Extrato de Chá Verde (EGCG 50%) 500mg', posologiaSugerida: 'Tomar 1 cápsula após o café da manhã e após o almoço.' },
      { nome: 'Berberina HCL 500mg', posologiaSugerida: 'Tomar 1 cápsula 15 a 30 minutos antes das principais refeições (2x a 3x ao dia).' },
      { nome: 'Faseolamina 500mg + Cassiolamina 300mg', posologiaSugerida: 'Tomar 1 cápsula 15 minutos antes de refeições ricas em carboidratos.' },
      { nome: 'Quitosana (Chitosan) 500mg', posologiaSugerida: 'Tomar 2 cápsulas com 2 copos de água antes de refeições gordurosas.' },
      { nome: 'Glucomanan 500mg', posologiaSugerida: 'Tomar 2 cápsulas com 2 copos de água 30 minutos antes das refeições.' },
      { nome: 'Morosil 500mg (Extrato de Laranja Moro)', posologiaSugerida: 'Tomar 1 cápsula ao dia pela manhã ou antes do almoço.' },
      { nome: 'Cactin 500mg (Drenagem Linfática em Cápsula)', posologiaSugerida: 'Tomar 2 cápsulas no café da manhã com bastante água.' },
      { nome: 'Greenselect Phytosome 120mg', posologiaSugerida: 'Tomar 1 cápsula 2x ao dia após as principais refeições.' },
      { nome: 'Citrus Aurantium (Synephrine) 300mg', posologiaSugerida: 'Tomar 1 cápsula antes do treino ou pela manhã.' },
      { nome: 'Garcinia Cambogia 500mg', posologiaSugerida: 'Tomar 1 cápsula 30 a 60 minutos antes das refeições.' },
      { nome: 'Irvingia Gabonensis (Açafrão do Extremo Oriente) 250mg', posologiaSugerida: 'Tomar 1 cápsula 30 minutos antes do almoço e jantar.' },
      { nome: 'Capsaicina / Capsiate 6mg', posologiaSugerida: 'Tomar 1 cápsula após o café da manhã.' },
      { nome: 'Koubo 200mg (Doce sem Culpa)', posologiaSugerida: 'Tomar 1 cápsula 1 hora antes das refeições para inibir ansiedade por doces.' },
      { nome: 'Phytolaca / Cordia Ecalyculata 300mg', posologiaSugerida: 'Tomar 1 cápsula 30 minutos antes das refeições.' },
    ],
  },
  {
    categoria: 'Saúde Cognitiva, Memória, Foco & Nootrópicos',
    icone: '🧠',
    suplementos: [
      { nome: 'Ômega 3 Ultra Concentrado (DHA 500mg / EPA 400mg)', posologiaSugerida: 'Tomar 2 cápsulas ao dia junto às principais refeições.' },
      { nome: 'Fosfatidilserina 200mg', posologiaSugerida: 'Tomar 1 cápsula pela manhã para memória e redução de estresse metabólico.' },
      { nome: 'Coenzima Q10 (Ubiquinona) 100mg', posologiaSugerida: 'Tomar 1 cápsula no almoço com fonte de gordura saudável.' },
      { nome: 'L-Teanina 200mg + Cafeína 100mg', posologiaSugerida: 'Tomar 1 cápsula pela manhã para foco focado sem agitação.' },
      { nome: 'Magnésio L-Treonato 500mg', posologiaSugerida: 'Tomar 2 cápsulas à noite antes de dormir para neuroproteção e cognição.' },
      { nome: 'Bacopa Monnieri 300mg (Padronizada 50%)', posologiaSugerida: 'Tomar 1 cápsula ao dia junto de uma refeição.' },
      { nome: 'Ginkgo Biloba Extrato Seco 80mg', posologiaSugerida: 'Tomar 1 cápsula 2x ao dia para microcirculação cerebral.' },
      { nome: 'Ginseng Panax Extrato 200mg', posologiaSugerida: 'Tomar 1 cápsula pela manhã para energia física e mental.' },
      { nome: 'Rhodiola Rosea 300mg', posologiaSugerida: 'Tomar 1 cápsula pela manhã em jejum para fadiga mental e adaptógeno.' },
      { nome: 'Vinpocetina 5mg', posologiaSugerida: 'Tomar 1 cápsula 2x ao dia nas refeições.' },
      { nome: 'Alfa-GPC 300mg', posologiaSugerida: 'Tomar 1 cápsula pela manhã para síntese de acetilcolina.' },
      { nome: 'Citicolina (CDP-Colina) 250mg', posologiaSugerida: 'Tomar 1 cápsula 1 a 2x ao dia com alimentos.' },
      { nome: 'Huperzina A 100mcg', posologiaSugerida: 'Tomar 1 cápsula ao dia pela manhã.' },
      { nome: 'Lion\'s Mane (Juba de Leão / Hericium) 500mg', posologiaSugerida: 'Tomar 2 cápsulas ao dia para neurogênese e clareza mental.' },
      { nome: 'L-Tirosina 500mg', posologiaSugerida: 'Tomar 1 cápsula pela manhã em jejum para síntese de dopamina.' },
      { nome: 'Bitartarato de Colina 500mg', posologiaSugerida: 'Tomar 1 cápsula junto das refeições.' },
      { nome: '5-HTP (5-Hidroxitriptofano) 100mg', posologiaSugerida: 'Tomar 1 cápsula no final da tarde ou à noite para precursor de serotonina.' },
    ],
  },
  {
    categoria: 'Saúde Feminina, Modulação Hormonal & SOP',
    icone: '🌸',
    suplementos: [
      { nome: 'Myo-Inositol 2g + D-Chiro-Inositol 50mg', posologiaSugerida: 'Tomar 1 sachê diluído em água pela manhã para sensibilidade à insulina e SOP.' },
      { nome: 'Óleo de Prímula 1000mg', posologiaSugerida: 'Tomar 2 cápsulas ao dia junto das refeições para alívio de TPM e mastalgia.' },
      { nome: 'Óleo de Borage 1000mg', posologiaSugerida: 'Tomar 1 cápsula 2x ao dia para saúde da pele e equilíbrio hormonal.' },
      { nome: 'Maca Peruana Negra / Vermelha 1000mg', posologiaSugerida: 'Tomar 2 cápsulas pela manhã para libido, disposição e vitalidade.' },
      { nome: 'Agnus Castus (Vitex) 400mg', posologiaSugerida: 'Tomar 1 cápsula pela manhã para regulação do ciclo menstrual e progesterona.' },
      { nome: 'DIM (Diindolilmetano) 100mg', posologiaSugerida: 'Tomar 1 cápsula ao dia no almoço para metabolismo saudável do estrogênio.' },
      { nome: 'Boro Quelato 3mg', posologiaSugerida: 'Tomar 1 cápsula ao dia com refeição para saúde óssea e hormônios livres.' },
      { nome: 'Metilfolato (Vitamina B9 Ativa) 800mcg', posologiaSugerida: 'Tomar 1 cápsula ao dia para tentantes e gestantes.' },
      { nome: 'Vitamina B6 (Piridoxal-5-Fosfato) 50mg', posologiaSugerida: 'Tomar 1 cápsula ao dia para redução da retenção e retenção na TPM.' },
      { nome: 'Amora Miúra (Morus Nigra) 500mg', posologiaSugerida: 'Tomar 1 cápsula 2x ao dia para sintomas do climatério e menopausa.' },
      { nome: 'Trans-Resveratrol 100mg', posologiaSugerida: 'Tomar 1 cápsula ao dia no almoço para ação antioxidante e longevidade.' },
    ],
  },
  {
    categoria: 'Pediatria, Infantil & Hebiatria',
    icone: '👶',
    suplementos: [
      { nome: 'Multivitamínico e Mineral Infantil Gotas/Gummies', posologiaSugerida: 'Administrar a dose indicada de acordo com a faixa etária da criança.' },
      { nome: 'Ômega 3 DHA Infantil Gotas (Sabor Suave)', posologiaSugerida: 'Administrar 1ml ao dia misturado ao suco, leite ou comida.' },
      { nome: 'Ferro Bisglicinato Quelato Gotas (25mg/ml)', posologiaSugerida: 'Administrar a dosagem preventiva/terapêutica indicada por kg de peso corporal.' },
      { nome: 'Probióticos Infantis (L. Rhamnosus / B. Lactis)', posologiaSugerida: 'Misturar 1 sachê ao dia no leite morno, água ou papinha.' },
      { nome: 'Vitamina D3 Gotas (200 UI por gota)', posologiaSugerida: 'Administrar 2 a 5 gotas ao dia direto na boca ou líquido.' },
      { nome: 'Zinco Quelato Gotas Infantil (5mg/ml)', posologiaSugerida: 'Administrar 1ml ao dia para suporte imunológico e crescimento.' },
      { nome: 'Enzima Lactase Gotas Infantil', posologiaSugerida: 'Adicionar 5 a 10 gotas no leite ou mamadeira 15 minutos antes de servir.' },
      { nome: 'Vitamina C Gotas Infantil (100mg/ml)', posologiaSugerida: 'Administrar 10 a 20 gotas ao dia para imunidade.' },
    ],
  },
  {
    categoria: 'Imunidade, Articulações & Anti-inflamatórios',
    icone: '🛡️',
    suplementos: [
      { nome: 'Colágeno Tipo II Não Desnaturado 40mg', posologiaSugerida: 'Tomar 1 cápsula à noite ao deitar para regeneração e dores articulares.' },
      { nome: 'Colágeno Hidrolisado Verisol 2.5g', posologiaSugerida: 'Tomar 1 sachê diluído em água ao dia para firmeza da pele.' },
      { nome: 'Vitamina C 1000mg + Zinco Quelato 29mg', posologiaSugerida: 'Tomar 1 comprimido/cápsula ao dia após o café da manhã.' },
      { nome: 'Vitamina D3 5000 UI + Vitamina K2 (MK-7) 100mcg', posologiaSugerida: 'Tomar 1 dose ao dia no almoço com fonte de gordura.' },
      { nome: 'Extrato de Cúrcuma Longa (Curcumina 95% + Piperina)', posologiaSugerida: 'Tomar 1 cápsula (500mg) 2x ao dia junto das refeições.' },
      { nome: 'Glucosamina 1500mg + Condroitina 1200mg', posologiaSugerida: 'Tomar 1 sachê diluído em água 1x ao dia.' },
      { nome: 'MSM (Metilsulfonilmetano / Enxofre Orgânico) 1000mg', posologiaSugerida: 'Tomar 1 cápsula 2x ao dia para flexibilidade e dor muscular.' },
      { nome: 'Ácido Hialurônico 150mg', posologiaSugerida: 'Tomar 1 cápsula ao dia para hidratação articular e cutânea.' },
      { nome: 'Extrato de Própolis Verde Padronizado (EPP-AF) 500mg', posologiaSugerida: 'Tomar 1 a 2 cápsulas ao dia ou 20 gotas em água.' },
      { nome: 'Astragalus Membranaceus 500mg', posologiaSugerida: 'Tomar 1 cápsula 2x ao dia para fortalecer imunidade profunda.' },
      { nome: 'Echinacea Purpurea 400mg', posologiaSugerida: 'Tomar 1 cápsula 2x ao dia em períodos de baixa imunidade.' },
      { nome: 'Boswellia Serrata 300mg (Padronizada 65%)', posologiaSugerida: 'Tomar 1 cápsula 2x ao dia para inflamações articulares.' },
    ],
  },
  {
    categoria: 'Saúde Intestinal, Microbioma, Sono & Relaxamento',
    icone: '🌿',
    suplementos: [
      { nome: 'L-Glutamina Pura 100%', posologiaSugerida: 'Tomar 5g diluídos em 100ml de água morna em jejum para integridade da mucosa intestinal.' },
      { nome: 'Probióticos Multicepas (10 a 30 Bilhões UFC)', posologiaSugerida: 'Tomar 1 cápsula à noite antes de dormir.' },
      { nome: 'Prebióticos FOS (Frutooligossacarídeos) + Inulina 5g', posologiaSugerida: 'Tomar 1 colher de sopa diluída em água ou suco no café da manhã.' },
      { nome: 'Enzimas Digestivas Completa (Protease, Lipase, Amilase, Lactase)', posologiaSugerida: 'Tomar 1 cápsula imediatamente antes das refeições principais.' },
      { nome: 'Melatonina Gotas (0.21mg por gota)', posologiaSugerida: 'Administrar 1 a 3 gotas 30 minutos antes de deitar em ambiente escuro.' },
      { nome: 'Passiflora Incarnata 500mg', posologiaSugerida: 'Tomar 1 a 2 cápsulas ao final do dia para ansiedade leve e sono.' },
      { nome: 'Valeriana Officinalis 300mg', posologiaSugerida: 'Tomar 1 a 2 cápsulas 1 hora antes de dormir.' },
      { nome: 'Mulungu (Erythrina mulungu) Extrato 300mg', posologiaSugerida: 'Tomar 1 cápsula à noite para insônia e relaxamento nervoso.' },
      { nome: 'GABA (Ácido Gama-Aminobutírico) 500mg', posologiaSugerida: 'Tomar 1 cápsula antes de dormir com água.' },
      { nome: 'L-Triptofano 500mg', posologiaSugerida: 'Tomar 1 a 2 cápsulas à noite longe das proteínas da refeição.' },
      { nome: 'Magnésio Inositol / Bisglicinato 300mg', posologiaSugerida: 'Tomar 2 cápsulas à noite para relaxamento muscular e indução do sono.' },
    ],
  },
]

interface ItemReceita {
  suplemento: string
  posologia: string
}

export default function SuplementacaoPage() {
  const [isLight, setIsLight] = useState(false)
  const [nutricionista, setNutricionista] = useState('Dra. Nutricionista')
  const [crn, setCrn] = useState('CRN 12345/RJ')
  const [paciente, setPaciente] = useState('')
  const [telefonePaciente, setTelefonePaciente] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [busca, setBusca] = useState('')

  const [suplementoAtual, setSuplementoAtual] = useState('')
  const [posologiaAtual, setPosologiaAtual] = useState('')
  const [itensReceita, setItensReceita] = useState<ItemReceita[]>([])

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

  const selecionarDoBanco = (item: SuplementoCatalogo) => {
    setSuplementoAtual(item.nome)
    setPosologiaAtual(item.posologiaSugerida)
  }

  const handleAdicionarItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!suplementoAtual) {
      alert('Por favor, escolha um suplemento do banco ou escreva o nome no campo manual.')
      return
    }

    setItensReceita([...itensReceita, { suplemento: suplementoAtual, posologia: posologiaAtual || 'Conforme orientação profissional.' }])
    setSuplementoAtual('')
    setPosologiaAtual('')
  }

  const handleRemoverItem = (index: number) => {
    setItensReceita(itensReceita.filter((_, i) => i !== index))
  }

  const handleImprimir = () => {
    if (!paciente) {
      alert('Por favor, informe o nome do paciente antes de gerar a receita.')
      return
    }
    if (itensReceita.length === 0) {
      alert('Adicione ao menos um suplemento na receita.')
      return
    }
    window.print()
  }

  const handleEnviarWhatsApp = () => {
    if (!paciente) {
      alert('Por favor, informe o nome do paciente.')
      return
    }
    if (itensReceita.length === 0) {
      alert('Adicione ao menos um suplemento para enviar a receita.')
      return
    }

    let msg = `💊 *RECEITUÁRIO DE SUPLEMENTAÇÃO E MANIPULADOS*\n`
    msg += `👤 *Paciente:* ${paciente}\n`
    msg += `🩺 *Profissional:* ${nutricionista} (${crn})\n`
    msg += `📅 *Data:* ${new Date().toLocaleDateString('pt-BR')}\n`
    msg += `-----------------------------------\n\n`

    itensReceita.forEach((item, i) => {
      msg += `*${i + 1}. ${item.suplemento}*\n`
      msg += `📌 *Modo de uso:* ${item.posologia}\n\n`
    })

    if (observacoes) {
      msg += `📝 *Observações do Nutricionista:* ${observacoes}\n\n`
    }

    msg += `✨ _Prescrição emitida digitalmente via NutriSaaS_`

    const url = `https://api.whatsapp.com/send?phone=${telefonePaciente.replace(/\D/g, '')}&text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  const bancoFiltrado = bancoSuplementacao.map((cat) => ({
    ...cat,
    suplementos: cat.suplementos.filter(
      (s) =>
        s.nome.toLowerCase().includes(busca.toLowerCase()) ||
        s.posologiaSugerida.toLowerCase().includes(busca.toLowerCase())
    ),
  })).filter((cat) => cat.suplementos.length > 0)

  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgSubCard = isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
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
          .receita-print-container {
            padding: 0px !important;
            background: #ffffff !important;
            color: #000000 !important;
            width: 100% !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-emerald-500">Receituário de Suplementação & Fórmulas</h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Banco de dados clínico com suplementos e manipulados + opção de escrita manual personalizada
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleImprimir}
            className="flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-400 transition text-xs shadow-lg shadow-emerald-500/10"
          >
            🖨️ Imprimir Receita PDF
          </button>
          <button
            onClick={handleEnviarWhatsApp}
            className="flex items-center gap-2 bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-500 transition text-xs shadow-lg shadow-emerald-600/10"
          >
            💬 Enviar via WhatsApp
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className={`p-5 rounded-2xl border space-y-4 no-print ${bgCard}`}>
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-emerald-500 flex items-center gap-1.5">
              📚 Catálogo de Suplementos (&gt;180)
            </h2>
          </div>

          <input
            type="text"
            placeholder="🔍 Buscar por nome ou componente..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className={`w-full rounded-xl border p-2 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
          />

          <div className="space-y-4 max-h-[620px] overflow-y-auto pr-1">
            {bancoFiltrado.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">
                Nenhum suplemento encontrado no filtro. Use o campo ao lado para digitar manualmente.
              </div>
            ) : (
              bancoFiltrado.map((cat, idx) => (
                <div key={idx} className={`p-3 rounded-xl border space-y-2 ${bgSubCard}`}>
                  <h3 className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                    <span>{cat.icone}</span> {cat.categoria} ({cat.suplementos.length})
                  </h3>
                  <div className="space-y-1">
                    {cat.suplementos.map((item, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => selecionarDoBanco(item)}
                        className={`w-full text-left text-xs p-2 rounded-lg transition border flex flex-col ${
                          isLight
                            ? 'bg-white border-slate-200 hover:border-emerald-400 text-slate-800'
                            : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50 text-slate-200'
                        }`}
                      >
                        <span className="font-semibold text-emerald-500">{item.nome}</span>
                        <span className="text-[10px] text-slate-400 line-clamp-1">{item.posologiaSugerida}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`lg:col-span-2 rounded-2xl border p-6 space-y-6 receita-print-container ${bgCard}`}>
          
          <div className="hidden print:block border-b border-slate-300 pb-4 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{nutricionista}</h1>
                <p className="text-sm font-semibold text-emerald-700">{crn}</p>
                <p className="text-xs text-slate-500">Prescrição Nutricional de Suplementos e Fórmulas Manipuladas</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-emerald-600">NutriSaaS</span>
                <p className="text-xs text-slate-400">Atendimento Nutricional</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between text-sm text-slate-800">
              <div><b>Paciente:</b> {paciente || '______________________________________'}</div>
              <div><b>Data:</b> {new Date().toLocaleDateString('pt-BR')}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 no-print">
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Nutricionista</label>
              <input
                type="text"
                value={nutricionista}
                onChange={(e) => setNutricionista(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>CRN</label>
              <input
                type="text"
                value={crn}
                onChange={(e) => setCrn(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Nome do Paciente *</label>
              <input
                type="text"
                placeholder="Ex: Mariana Costa"
                value={paciente}
                onChange={(e) => setPaciente(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                required
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>WhatsApp Paciente</label>
              <input
                type="text"
                placeholder="Ex: 21999998888"
                value={telefonePaciente}
                onChange={(e) => setTelefonePaciente(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
              />
            </div>
          </div>

          <form onSubmit={handleAdicionarItem} className={`p-4 rounded-xl border space-y-3 no-print ${bgSubCard}`}>
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-emerald-500 uppercase">
                ✏️ Escrever ou Editar Suplemento / Manipulado
              </h3>
              <span className="text-[10px] text-slate-400">Clique no catálogo ou digite do zero</span>
            </div>

            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Nome do Suplemento / Fórmula Personalizada</label>
              <input
                type="text"
                placeholder="Ex: Fórmula Manipulada: CoQ10 100mg + PQQ 10mg + Magnésio 200mg"
                value={suplementoAtual}
                onChange={(e) => setSuplementoAtual(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              />
            </div>

            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Posologia e Instruções de Uso</label>
              <textarea
                placeholder="Ex: Tomar 1 cápsula 2x ao dia após o café da manhã e após o almoço durante 60 dias."
                value={posologiaAtual}
                onChange={(e) => setPosologiaAtual(e.target.value)}
                rows={2}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              />
            </div>

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-5 rounded-xl text-xs transition shadow-md shadow-emerald-500/10"
            >
              + Incluir na Receita
            </button>
          </form>

          <div className="space-y-4">
            <h2 className="text-sm font-bold border-b pb-2 uppercase text-emerald-500 print:text-slate-900">
              Prescrição de Suplementação
            </h2>

            {itensReceita.length === 0 ? (
              <div className={`p-6 border border-dashed rounded-xl text-center text-xs text-slate-400 no-print ${isLight ? 'border-slate-300' : 'border-slate-800'}`}>
                Nenhum item adicionado ainda. Escolha no catálogo à esquerda ou digite manualmente acima.
              </div>
            ) : (
              <div className="space-y-3">
                {itensReceita.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border flex justify-between items-start ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="font-bold text-sm block text-emerald-500 print:text-slate-900">
                        {index + 1}. {item.suplemento}
                      </span>
                      <p className={`text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <b>Modo de uso:</b> {item.posologia}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoverItem(index)}
                      className="text-red-400 hover:text-red-300 text-xs no-print font-bold"
                      title="Remover suplemento"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="no-print">
            <label className={`block text-xs mb-1 ${textLabel}`}>Observações Gerais da Prescrição</label>
            <textarea
              placeholder="Ex: Ingerir bastante água ao longo do dia. Manter os suplementos em local seco e arejado..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={2}
              className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
            />
          </div>

          <div className="hidden print:block mt-24 pt-8 text-center space-y-1">
            <div className="w-64 border-t border-slate-400 mx-auto mb-2"></div>
            <p className="text-sm font-bold text-slate-900">{nutricionista}</p>
            <p className="text-xs text-slate-600">{crn}</p>
            <p className="text-[10px] text-slate-400 mt-4">Prescrição emitida digitalmente via NutriSaaS</p>
          </div>

        </div>

      </div>
    </div>
  )
}