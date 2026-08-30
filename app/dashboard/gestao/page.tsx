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
    categoria: 'Vitaminas, Minerais e Ferritina',
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
  const [telefonePaciente, setTelefonePaciente] = useState('')
  const [observacoes, setObservacoes] = useState('')
  const [assinaturaImg, setAssinaturaImg] = useState<string | null>(null)

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

  // Processa a imagem enviada para carimbo/assinatura
  const handleUploadAssinatura = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAssinaturaImg(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleExame = (exame: string) => {
    if (examesSelecionados.includes(exame)) {
      setExamesSelecionados(examesSelecionados.filter((e) => e !== exame))
    } else {
      setExamesSelecionados([...examesSelecionados, exame])
    }
  }

  const handleImprimir = () => {
    if (!paciente) {
      alert('Por favor, informe o nome do paciente antes de imprimir ou gerar o PDF.')
      return
    }
    window.print()
  }

  const handleEnviarWhatsApp = () => {
    if (!paciente) {
      alert('Por favor, informe o nome do paciente.')
      return
    }

    let mensagem = `📋 *SOLICITAÇÃO DE EXAMES LABORATORIAIS*\n`
    mensagem += `👤 *Paciente:* ${paciente}\n`
    mensagem += `🩺 *Profissional:* ${nutricionista} (${crn})\n`
    mensagem += `📅 *Data:* ${new Date().toLocaleDateString('pt-BR')}\n`
    mensagem += `-----------------------------------\n\n`
    mensagem += `*Exames Solicitados:*\n`

    examesSelecionados.forEach((exame, idx) => {
      mensagem += `${idx + 1}. ${exame}\n`
    })

    if (observacoes) {
      mensagem += `\n📌 *Indicação / Observações:* ${observacoes}\n`
    }

    mensagem += `\n✨ _Documento assinado e emitido via NutriSaaS_`

    const url = `https://api.whatsapp.com/send?phone=${telefonePaciente.replace(/\D/g, '')}&text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgSubCard = isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  return (
    <div className="space-y-6">
      {/* Estilos para PDF e Impressão */}
      <style jsx global>{`
        @media print {
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          aside, nav, .no-print, button, input, select {
            display: none !important;
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

      {/* Topo Web */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 no-print">
        <div>
          <h1 className="text-2xl font-bold text-emerald-500">Solicitação de Exames Laboratoriais</h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Selecione exames, adicione sua assinatura digital e envie via PDF ou WhatsApp
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleImprimir}
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

      {/* Formulário Principal */}
      <div className={`rounded-2xl border p-6 space-y-6 gestao-print-container ${bgCard}`}>
        
        {/* Cabeçalho do PDF na Impressão */}
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

          <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between text-sm text-slate-800">
            <div><b>Paciente:</b> {paciente || '______________________________________'}</div>
            <div><b>Data:</b> {new Date().toLocaleDateString('pt-BR')}</div>
          </div>
        </div>

        {/* Cadastro Profissional e Paciente */}
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

        {/* Upload de Assinatura / Carimbo Digital */}
        <div className={`p-4 rounded-xl border no-print space-y-2 ${bgSubCard}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wide">
                ✍️ Assinatura ou Carimbo Digital do Profissional
              </h3>
              <p className="text-[11px] text-slate-400">
                Envie uma foto ou arquivo com fundo transparente para aparecer na guia do PDF
              </p>
            </div>

            <label className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition">
              + Selecionar Arquivo da Assinatura
              <input type="file" accept="image/*" onChange={handleUploadAssinatura} className="hidden" />
            </label>
          </div>

          {assinaturaImg && (
            <div className="flex items-center gap-4 pt-2">
              <div className="p-2 bg-white rounded-lg border border-slate-200 h-16 flex items-center">
                <img src={assinaturaImg} alt="Assinatura pré-visualização" className="max-h-12 object-contain" />
              </div>
              <button
                type="button"
                onClick={() => setAssinaturaImg(null)}
                className="text-xs text-red-400 hover:text-red-300 font-semibold"
              >
                ✕ Remover assinatura
              </button>
            </div>
          )}
        </div>

        {/* Seleção de Exames */}
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

        {/* Estrutura do PDF na Impressão com Assinatura */}
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

          {/* Área da Assinatura com Imagem no PDF */}
          <div className="mt-20 pt-4 text-center space-y-1 relative">
            {assinaturaImg && (
              <div className="flex justify-center mb-1">
                <img src={assinaturaImg} alt="Assinatura Digital" className="h-20 object-contain" />
              </div>
            )}
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