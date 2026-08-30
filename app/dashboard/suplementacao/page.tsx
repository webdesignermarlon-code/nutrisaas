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
    categoria: 'Hipertrofia & Desempenho Esportivo',
    icone: '🏋️‍♂️',
    suplementos: [
      { nome: 'Creatina Monohidratada 100% Pura', posologiaSugerida: 'Tomar 3g a 5g diluído em 200ml de água, diariamente no mesmo horário.' },
      { nome: 'Whey Protein Isolado 100%', posologiaSugerida: 'Consumir 30g diluído em 200ml de água no pós-treino ou lanche intermediário.' },
      { nome: 'Beta-Alanina', posologiaSugerida: 'Consumir 2g fracionados 2x ao dia (ou 4g antes do treino) com água.' },
      { nome: 'Citrulina Malato', posologiaSugerida: 'Consumir 6g a 8g diluídos em água 45 minutos antes do treino.' },
      { nome: 'BCAA 2:1:1', posologiaSugerida: 'Consumir 5g durante ou imediatamente após o treino.' },
      { nome: 'Cafeína Anidra 200mg', posologiaSugerida: 'Tomar 1 cápsula 30 a 45 minutos antes do treino (evitar após as 16h).' },
      { nome: 'HMB (β-Hidroxi-β-Metilbutirato)', posologiaSugerida: 'Tomar 3g ao dia divididos em 3 doses de 1g nas refeições.' },
    ],
  },
  {
    categoria: 'Emagrecimento, Termogênicos & Saciedade',
    icone: '🔥',
    suplementos: [
      { nome: 'Picolinato de Cromo 250mcg', posologiaSugerida: 'Tomar 1 cápsula 30 minutos antes do almoço ou da refeição com mais carboidratos.' },
      { nome: 'Psyllium em Pó 100% Puro', posologiaSugerida: 'Tomar 1 colher de sopa (10g) diluída em 300ml de água 20min antes das refeições.' },
      { nome: 'L-Carnitina L-Tartarato 2000mg', posologiaSugerida: 'Tomar 2g diluídos em água pela manhã em jejum ou pré-treino.' },
      { nome: 'Extrato de Chá Verde (EGCG) 500mg', posologiaSugerida: 'Tomar 1 cápsula após o café da manhã ou almoço.' },
      { nome: 'Faseolamina 500mg + Cassiolamina 300mg', posologiaSugerida: 'Tomar 1 cápsula 15 minutos antes das principais refeições rico em amido/gordura.' },
      { nome: 'Chitosan (Quitosana) 500mg', posologiaSugerida: 'Tomar 2 cápsulas com 2 copos de água antes das refeições gordurosas.' },
    ],
  },
  {
    categoria: 'Saúde Cognitiva, Memória & Foco (Nootrópicos)',
    icone: '🧠',
    suplementos: [
      { nome: 'Ômega 3 Ultra Concentrado (DHA 500mg / EPA 400mg)', posologiaSugerida: 'Tomar 2 cápsulas ao dia junto às principais refeições.' },
      { nome: 'Fosfatidilserina 200mg', posologiaSugerida: 'Tomar 1 cápsula pela manhã para suporte de memória e redução de cortisol.' },
      { nome: 'Coenzima Q10 (Ubiquinona) 100mg', posologiaSugerida: 'Tomar 1 cápsula no almoço com fonte de gordura boa para otimizar absorção.' },
      { nome: 'L-Teanina 200mg + Cafeína 100mg', posologiaSugerida: 'Tomar 1 cápsula pela manhã para foco limpo sem ansiedade.' },
      { nome: 'Magnésio L-Treonato 500mg', posologiaSugerida: 'Tomar 2 cápsulas à noite antes de dormir para saúde cerebral e neuroproteção.' },
      { nome: 'Bacopa Monnieri 300mg (Padronizada 50%)', posologiaSugerida: 'Tomar 1 cápsula ao dia junto com refeição.' },
    ],
  },
  {
    categoria: 'Imunidade, Fortalecimento & Articulações',
    icone: '🛡️',
    suplementos: [
      { nome: 'Colágeno Tipo II Não Desnaturado 40mg', posologiaSugerida: 'Tomar 1 cápsula à noite ao deitar para regeneração articular.' },
      { nome: 'Vitamina C 1000mg + Zinco Quelato 29mg', posologiaSugerida: 'Tomar 1 comprimido/cápsula ao dia após o café da manhã.' },
      { nome: 'Vitamina D3 5000 UI + Vitamina K2 (MK-7) 100mcg', posologiaSugerida: 'Tomar 1 dose ao dia no almoço com gordura alimentar.' },
      { nome: 'Extrato de Cúrcuma Longa (Curcumina 95% + Piperina)', posologiaSugerida: 'Tomar 1 cápsula (500mg) 2x ao dia junto das refeições.' },
      { nome: 'Glucosamina 1500mg + Condroitina 1200mg', posologiaSugerida: 'Tomar 1 sachê diluído em água 1x ao dia.' },
    ],
  },
  {
    categoria: 'Pediatria & Saúde Infantil',
    icone: '👶',
    suplementos: [
      { nome: 'Multivitamínico e Mineral Infantil Gotas/Gummies', posologiaSugerida: 'Administrar a dose recomendada de acordo com a faixa etária da criança.' },
      { nome: 'Ômega 3 DHA Infantil Gotas (Sabor Suave)', posologiaSugerida: 'Administrar 1ml ao dia misturado ao suco ou comida.' },
      { nome: 'Ferro Quelato Bisglicinato Gotas', posologiaSugerida: 'Administrar a dosagem preventiva/terapêutica indicada por kg de peso corporal.' },
      { nome: 'Probióticos Infantis (L. Rhamnosus / B. Lactis)', posologiaSugerida: 'Misturar 1 sachê ao dia no leite morno ou papinha.' },
    ],
  },
  {
    categoria: 'Saúde Intestinal, Sono & Longevidade',
    icone: '🌿',
    suplementos: [
      { nome: 'L-Glutamina Pura 100%', posologiaSugerida: 'Tomar 5g diluídos em 100ml de água morna em jejum para integridade intestinal.' },
      { nome: 'Probióticos Multicepas (10 Bilhões UFC)', posologiaSugerida: 'Tomar 1 cápsula à noite antes de dormir.' },
      { nome: 'Melatonina Gotas (0.21mg por gota)', posologiaSugerida: 'Administrar 1 a 3 gotas 30 minutos antes de deitar em ambiente escuro.' },
      { nome: 'Trans-Resveratrol 100mg + Nicotinamida', posologiaSugerida: 'Tomar 1 cápsula pela manhã para suporte antienvelhecimento celular.' },
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

  // Item selecionado atual no form
  const [suplementoAtual, setSuplementoAtual] = useState('')
  const [posologiaAtual, setPosologiaAtual] = useState('')

  // Lista de itens prescrevidos na receita
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
      alert('Por favor, digite ou escolha um suplemento do catálogo.')
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

    msg += `✨ _Prescrição emitida via NutriSaaS_`

    const url = `https://api.whatsapp.com/send?phone=${telefonePaciente.replace(/\D/g, '')}&text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
  }

  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgSubCard = isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  return (
    <div className="space-y-6">
      {/* Estilos para PDF e Impressão Timbrada */}
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

      {/* Topo no Painel Web */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-emerald-500">Receituário de Suplementação & Manipulados</h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Banco de dados clínico completo de fórmulas e suplementos para todas as idades e objetivos
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
        
        {/* Painel do Banco de Dados de Suplementação */}
        <div className={`p-5 rounded-2xl border space-y-4 no-print ${bgCard}`}>
          <h2 className="text-sm font-bold text-emerald-500 flex items-center gap-2">
            📚 Banco de Dados de Suplementos
          </h2>
          <p className="text-[11px] text-slate-400">
            Clique em qualquer suplemento para carregar automaticamente o nome e posologia recomendada.
          </p>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {bancoSuplementacao.map((cat, idx) => (
              <div key={idx} className={`p-3 rounded-xl border space-y-2 ${bgSubCard}`}>
                <h3 className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
                  <span>{cat.icone}</span> {cat.categoria}
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
            ))}
          </div>
        </div>

        {/* Formulário e Visualização da Receita */}
        <div className={`lg:col-span-2 rounded-2xl border p-6 space-y-6 receita-print-container ${bgCard}`}>
          
          {/* Cabeçalho do PDF na Impressão Timbrada */}
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

          {/* Dados do Nutricionista e Paciente (Web) */}
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

          {/* Adicionar Suplemento à Receita */}
          <form onSubmit={handleAdicionarItem} className={`p-4 rounded-xl border space-y-3 no-print ${bgSubCard}`}>
            <h3 className="text-xs font-bold text-emerald-500 uppercase">+ Adicionar Suplemento à Prescrição</h3>
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Suplemento / Composto / Fórmula</label>
              <input
                type="text"
                placeholder="Ex: Creatina Monohidratada 100% Pura"
                value={suplementoAtual}
                onChange={(e) => setSuplementoAtual(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Posologia e Modo de Uso</label>
              <textarea
                placeholder="Ex: Tomar 5g diluído em 200ml de água, preferencialmente após o treino."
                value={posologiaAtual}
                onChange={(e) => setPosologiaAtual(e.target.value)}
                rows={2}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 px-4 rounded-xl text-xs transition"
            >
              + Incluir na Receita
            </button>
          </form>

          {/* Itens Incluídos na Receita */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold border-b pb-2 uppercase text-emerald-500 print:text-slate-900">
              Prescrição de Suplementação
            </h2>

            {itensReceita.length === 0 ? (
              <div className={`p-6 border border-dashed rounded-xl text-center text-xs text-slate-400 no-print ${isLight ? 'border-slate-300' : 'border-slate-800'}`}>
                Nenhum suplemento adicionado ainda. Escolha no banco de dados ao lado ou digite manualmente.
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

          {/* Rodapé e Assinatura na Impressão Timbrada */}
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