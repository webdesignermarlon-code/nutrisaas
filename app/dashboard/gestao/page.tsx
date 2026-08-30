'use client'

import { useState, useEffect } from 'react'

const listaExamesCategorizados = [
  {
    categoria: 'Hemograma e Bioquímica Geral',
    exames: [
      'Hemograma Completo com Plaquetas',
      'Glicemia em Jejum',
      'HbA1c (Hemoglobina Glicada)',
      'Insulina em Jejum',
      'HOMA-IR / HOMA-BETA',
      'Ureia e Creatinina',
      'Ácido Úrico',
      'Proteína C Reativa (PCR Ultrassensível)',
      'VSG (Velocidade de Hemossedimentação)',
    ],
  },
  {
    categoria: 'Perfil Lipídico e Cardiovascular',
    exames: [
      'Perfil Lipídico Completo (Colesterol Total, HDL, LDL, VLDL, Triglicerídeos)',
      'Apolipoproteína A1 (Apo A1)',
      'Apolipoproteína B (Apo B)',
      'Lp(a) - Lipoproteína A',
      'Homocisteína',
    ],
  },
  {
    categoria: 'Função Hepática e Biliar',
    exames: [
      'TGO (AST) e TGP (ALT)',
      'Gama GT (GGT)',
      'Fosfatase Alcalina',
      'Bilirrubinas Totais e Frações',
      'Proteínas Totais e Frações (Albumina e Globulina)',
    ],
  },
  {
    categoria: 'Vitamins, Minerais e Ferritina',
    exames: [
      'Vitamina D (25-OH Vitamina D)',
      'Vitamina B12 (Cobalamina)',
      'Fatores Fólicos (Ácido Fólico)',
      'Ferritina Sérica',
      'Ferro Sérico',
      'Capacidade Total de Ligação do Ferro (TIBC) / Saturação de Transferrina',
      'Zinco Sérico',
      'Magnésio Sérico',
      'Cálcio Total e Iônico',
      'Sódio e Potássio',
    ],
  },
  {
    categoria: 'Hormônios e Eixo Endocrinológico',
    exames: [
      'TSH Ultra Sensível',
      'T4 Livre e T3 Livre',
      'Anti-TPO e Anti-Tireoglobulina',
      'Cortisol Basal (Manhã)',
      'Testosterona Total e Livre',
      'Estradiol (E2) e Progesterona',
      'LH e FSH',
      'Prolactina',
      'DHEA e DHEA-S',
      'IGF-1 (Somatomedina C)',
    ],
  },
  {
    categoria: 'Exames de Urina e Fezes',
    exames: [
      'EAS (Urina Tipo 1)',
      'Amostra Isolada de Urina para Microalbuminúria',
      'Exame Parasitológico de Fezes (EPF)',
    ],
  },
]

export default function GestaoPage() {
  const [isLight, setIsLight] = useState(false)
  const [nutricionista, setNutricionista] = useState('Dra. Nutricionista')
  const [crn, setCrn] = useState('CRN 12345/RJ')
  const [paciente, setPaciente] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [examesSelecionados, setExamesSelecionados] = useState<string[]>([
    'Hemograma Completo com Plaquetas',
    'Glicemia em Jejum',
    'Perfil Lipídico Completo (Colesterol Total, HDL, LDL, VLDL, Triglicerídeos)',
    'Vitamina D (25-OH Vitamina D)',
  ])

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

  const toggleExame = (exame: string) => {
    if (examesSelecionados.includes(exame)) {
      setExamesSelecionados(examesSelecionados.filter((e) => e !== exame))
    } else {
      setExamesSelecionados([...examesSelecionados, exame])
    }
  }

  const handleImprimir = () => {
    if (!paciente) {
      alert('Por favor, informe o nome do paciente antes de imprimir.')
      return
    }
    window.print()
  }

  // Estilos dinâmicos do Modo Claro/Escuro
  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgSubCard = isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  return (
    <div className="space-y-6">
      {/* Estilos Especiais para Impressão PDF */}
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
          .gestao-print-container {
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
          <h1 className="text-2xl font-bold text-emerald-500">Solicitação de Exames Laboratoriais</h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Selecione os exames e gere a guia oficial timbrada pronta para impressão ou PDF
          </p>
        </div>

        <button
          onClick={handleImprimir}
          className="flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl hover:bg-emerald-400 transition text-xs shadow-lg shadow-emerald-500/10"
        >
          🖨️ Imprimir / Salvar PDF
        </button>
      </div>

      {/* Card do Formulário */}
      <div className={`rounded-2xl border p-6 space-y-6 gestao-print-container ${bgCard}`}>
        
        {/* Cabeçalho da Folha Oficial de Impressão PDF */}
        <div className="hidden print:block border-b border-slate-300 pb-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{nutricionista}</h1>
              <p className="text-sm font-semibold text-emerald-700">{crn}</p>
              <p className="text-xs text-slate-500">Prescrição e Solicitação de Exames Laboratoriais</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-extrabold text-emerald-600">NutriSaaS</span>
              <p className="text-xs text-slate-400">Atendimento Nutricional</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 grid grid-cols-2 text-sm text-slate-800">
            <div><b>Paciente:</b> {paciente || '______________________________________'}</div>
            <div className="text-right"><b>Data:</b> {new Date().toLocaleDateString('pt-BR')}</div>
          </div>
        </div>

        {/* Formulário do Profissional e Paciente (Interface Web) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 no-print">
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Nome do Nutricionista</label>
            <input
              type="text"
              value={nutricionista}
              onChange={(e) => setNutricionista(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Registro Profissional (CRN)</label>
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
              placeholder="Ex: Carlos Eduardo"
              value={paciente}
              onChange={(e) => setPaciente(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              required
            />
          </div>
        </div>

        {/* Seleção de Exames por Categoria (Interface Web) */}
        <div className="space-y-4 no-print">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold">Selecione os Exames Laboratoriais</h2>
            <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-lg">
              {examesSelecionados.length} exame(s) selecionado(s)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listaExamesCategorizados.map((cat, idx) => (
              <div key={idx} className={`p-4 rounded-xl border space-y-3 ${bgSubCard}`}>
                <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wide">
                  {cat.categoria}
                </h3>
                <div className="space-y-2">
                  {cat.exames.map((exame, i) => {
                    const marcado = examesSelecionados.includes(exame)
                    return (
                      <label
                        key={i}
                        className={`flex items-start gap-2.5 text-xs p-2 rounded-lg cursor-pointer transition ${
                          marcado
                            ? isLight ? 'bg-emerald-50 border border-emerald-300 font-medium' : 'bg-emerald-500/10 border border-emerald-500/30 font-medium'
                            : isLight ? 'hover:bg-slate-100' : 'hover:bg-slate-900'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={marcado}
                          onChange={() => toggleExame(exame)}
                          className="w-4 h-4 mt-0.5 rounded accent-emerald-500 cursor-pointer"
                        />
                        <span>{exame}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Observações e Indicação Clínica</label>
            <textarea
              placeholder="Ex: Exames solicitados para avaliação do perfil metabólico e acompanhamento nutricional..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={2}
              className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
            />
          </div>
        </div>

        {/* Lista de Exames Formatada para o PDF/Impressão */}
        <div className="hidden print:block space-y-4 mt-6">
          <h2 className="text-base font-bold text-slate-900 uppercase border-b pb-2">
            Solicitação de Exames Laboratoriais
          </h2>

          <ol className="list-decimal list-inside space-y-2 text-sm text-slate-900 font-medium">
            {examesSelecionados.map((exame, index) => (
              <li key={index} className="py-1 border-b border-slate-100">
                {exame}
              </li>
            ))}
          </ol>

          {observacoes && (
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-xs font-bold text-slate-700 uppercase mb-1">Indicação Clínica / Observações:</p>
              <p className="text-xs text-slate-800">{observacoes}</p>
            </div>
          )}

          {/* Rodapé e Assinatura do Profissional no PDF */}
          <div className="mt-24 pt-8 text-center space-y-1">
            <div className="w-64 border-t border-slate-400 mx-auto mb-2"></div>
            <p className="text-sm font-bold text-slate-900">{nutricionista}</p>
            <p className="text-xs text-slate-600">{crn}</p>
            <p className="text-[10px] text-slate-400 mt-4">Solicitação emitida digitalmente via NutriSaaS</p>
          </div>
        </div>

      </div>
    </div>
  )
}