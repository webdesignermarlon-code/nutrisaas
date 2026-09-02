'use client'

import { useState, useEffect } from 'react'

interface EvolucaoRegistro {
  id: number
  data: string
  peso: string
  gordura: string
  cintura: string
  quadril: string
  fotoAntes?: string
  fotoDepois?: string
}

interface Paciente {
  id: number
  nome: string
  genero: 'feminino' | 'masculino'
  telefone: string
  objetivo: string
  dataConsulta: string
  idade: string
  altura: string
  pesoInicial: string
  gorduraInicial: string
  ultimoPeso?: string
  
  // Medidas Antropométricas para Cálculo
  modoCalculoGordura: 'manual' | 'dobras' | 'medidas'
  triceps: string
  subescapular: string
  suprailiaca: string
  abdomenDobra: string
  cintura: string
  pescoco: string
  quadril: string
  
  // Histórico e Escaneamento Visual
  historicoEvolucao: EvolucaoRegistro[]
  observacoesProntuario: string
}

export default function PacientesPage() {
  const [isLight, setIsLight] = useState(false)
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  
  // Busca em tempo real
  const [busca, setBusca] = useState('')

  // Seleção e visualização de Prontuário / Evolução
  const [pacienteDetalhadoId, setPacienteDetalhadoId] = useState<number | null>(null)

  // Estado do Formulário
  const [editingId, setEditingId] = useState<number | null>(null)
  const [nome, setNome] = useState('')
  const [genero, setGenero] = useState<'feminino' | 'masculino'>('feminino')
  const [telefone, setTelefone] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [dataConsulta, setDataConsulta] = useState('')
  const [idade, setIdade] = useState('')
  const [altura, setAltura] = useState('')
  const [pesoInicial, setPesoInicial] = useState('')
  const [gorduraInicial, setGorduraInicial] = useState('')
  const [observacoes, setObservacoes] = useState('')

  // Campos para Cálculo Automático de Gordura
  const [modoCalculoGordura, setModoCalculoGordura] = useState<'manual' | 'dobras' | 'medidas'>('dobras')
  const [triceps, setTriceps] = useState('')
  const [subescapular, setSubescapular] = useState('')
  const [suprailiaca, setSuprailiaca] = useState('')
  const [abdomenDobra, setAbdomenDobra] = useState('')
  const [cintura, setCintura] = useState('')
  const [pescoco, setPescoco] = useState('')
  const [quadril, setQuadril] = useState('')

  // Modal para adicionar nova evolução/foto ao histórico do paciente
  const [modalEvolucaoAberto, setModalEvolucaoAberto] = useState(false)
  const [novoPesoEvolucao, setNovoPesoEvolucao] = useState('')
  const [novaGorduraEvolucao, setNovaGorduraEvolucao] = useState('')
  const [novaCinturaEvolucao, setNovaCinturaEvolucao] = useState('')
  const [novaQuadrilEvolucao, setNovaQuadrilEvolucao] = useState('')
  const [fotoAntesEvolucao, setFotoAntesEvolucao] = useState<string | null>(null)
  const [fotoDepoisEvolucao, setFotoDepoisEvolucao] = useState<string | null>(null)

  useEffect(() => {
    // 1. Sincronização de Tema
    const checkTheme = () => {
      const theme = localStorage.getItem('nutrisaas-theme')
      setIsLight(theme === 'light')
    }
    checkTheme()

    // 2. Carregamento do Banco de Dados Local
    const pacientesSalvos = localStorage.getItem('nutrisaas-pacientes-db')
    if (pacientesSalvos) {
      try {
        setPacientes(JSON.parse(pacientesSalvos))
      } catch (e) {
        console.error('Erro ao carregar banco de pacientes:', e)
      }
    }

    window.addEventListener('storage', checkTheme)
    const interval = setInterval(checkTheme, 500)
    return () => {
      window.removeEventListener('storage', checkTheme)
      clearInterval(interval)
    }
  }, [])

  // ==========================================
  // CÁLCULO AUTOMÁTICO DE % GORDURA CORPORAL
  // ==========================================
  useEffect(() => {
    if (modoCalculoGordura === 'manual') return

    const numIdade = parseFloat(idade) || 25
    const numAltura = parseFloat(altura) || 165
    const numPeso = parseFloat(pesoInicial) || 70

    if (modoCalculoGordura === 'dobras') {
      const tri = parseFloat(triceps) || 0
      const sub = parseFloat(subescapular) || 0
      const sup = parseFloat(suprailiaca) || 0
      const abd = parseFloat(abdomenDobra) || 0

      const somaDobras = tri + sub + sup + abd

      if (somaDobras > 0) {
        let densidadeCorporal = 0
        if (genero === 'feminino') {
          densidadeCorporal = 1.096095 - (0.000695 * somaDobras) + (0.0000011 * Math.pow(somaDobras, 2)) - (0.0000714 * numIdade)
        } else {
          densidadeCorporal = 1.10938 - (0.0008267 * somaDobras) + (0.0000016 * Math.pow(somaDobras, 2)) - (0.0002574 * numIdade)
        }

        if (densidadeCorporal > 0) {
          const percentualGordura = ((4.95 / densidadeCorporal) - 4.5) * 100
          if (!isNaN(percentualGordura) && percentualGordura > 0 && percentualGordura < 70) {
            setGorduraInicial(percentualGordura.toFixed(1))
          }
        }
      }
    } else if (modoCalculoGordura === 'medidas') {
      const numCintura = parseFloat(cintura) || 0
      const numPescoco = parseFloat(pescoco) || 0
      const numQuadril = parseFloat(quadril) || 0

      if (numCintura > 0 && numPescoco > 0 && numAltura > 0) {
        let percentualGordura = 0
        if (genero === 'masculino') {
          percentualGordura = 86.010 * Math.log10(numCintura - numPescoco) - 70.041 * Math.log10(numAltura) + 36.76
        } else if (numQuadril > 0) {
          percentualGordura = 163.205 * Math.log10(numCintura + numQuadril - numPescoco) - 97.684 * Math.log10(numAltura) - 78.387
        }

        if (!isNaN(percentualGordura) && percentualGordura > 2 && percentualGordura < 70) {
          setGorduraInicial(percentualGordura.toFixed(1))
        }
      }
    }
  }, [
    modoCalculoGordura, genero, idade, altura, pesoInicial,
    triceps, subescapular, suprailiaca, abdomenDobra,
    cintura, pescoco, quadril
  ])

  // Salvar no localStorage
  const atualizarBanco = (novosPacientes: Paciente[]) => {
    setPacientes(novosPacientes)
    localStorage.setItem('nutrisaas-pacientes-db', JSON.stringify(novosPacientes))
  }

  // Limpa Formulário
  const limparFormulario = () => {
    setEditingId(null)
    setNome('')
    setGenero('feminino')
    setTelefone('')
    setObjetivo('')
    setDataConsulta('')
    setIdade('')
    setAltura('')
    setPesoInicial('')
    setGorduraInicial('')
    setObservacoes('')
    setTriceps('')
    setSubescapular('')
    setSuprailiaca('')
    setAbdomenDobra('')
    setCintura('')
    setPescoco('')
    setQuadril('')
  }

  // Iniciar Edição do Paciente
  const handleIniciarEdicao = (paciente: Paciente) => {
    setEditingId(paciente.id)
    setNome(paciente.nome)
    setGenero(paciente.genero || 'feminino')
    setTelefone(paciente.telefone)
    setObjetivo(paciente.objetivo)
    setDataConsulta(paciente.dataConsulta)
    setIdade(paciente.idade)
    setAltura(paciente.altura)
    setPesoInicial(paciente.pesoInicial)
    setGorduraInicial(paciente.gorduraInicial)
    setObservacoes(paciente.observacoesProntuario || '')
    setModoCalculoGordura(paciente.modoCalculoGordura || 'dobras')
    setTriceps(paciente.triceps || '')
    setSubescapular(paciente.subescapular || '')
    setSuprailiaca(paciente.suprailiaca || '')
    setAbdomenDobra(paciente.abdomenDobra || '')
    setCintura(paciente.cintura || '')
    setPescoco(paciente.pescoco || '')
    setQuadril(paciente.quadril || '')

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Salvar / Atualizar Cadastro
  const handleSalvarPaciente = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim()) return

    if (editingId) {
      // Atualização
      const listaAtualizada = pacientes.map((p) => {
        if (p.id === editingId) {
          return {
            ...p,
            nome,
            genero,
            telefone,
            objetivo,
            dataConsulta,
            idade,
            altura,
            pesoInicial,
            gorduraInicial,
            ultimoPeso: p.ultimoPeso || pesoInicial,
            modoCalculoGordura,
            triceps,
            subescapular,
            suprailiaca,
            abdomenDobra,
            cintura,
            pescoco,
            quadril,
            observacoesProntuario: observacoes
          }
        }
        return p
      })
      atualizarBanco(listaAtualizada)
    } else {
      // Novo Cadastro
      const novoPaciente: Paciente = {
        id: Date.now(),
        nome,
        genero,
        telefone,
        objetivo,
        dataConsulta,
        idade,
        altura,
        pesoInicial,
        gorduraInicial,
        ultimoPeso: pesoInicial,
        modoCalculoGordura,
        triceps,
        subescapular,
        suprailiaca,
        abdomenDobra,
        cintura,
        pescoco,
        quadril,
        historicoEvolucao: [],
        observacoesProntuario: observacoes
      }
      atualizarBanco([novoPaciente, ...pacientes])
    }

    limparFormulario()
  }

  // Excluir Paciente
  const handleExcluirPaciente = (id: number) => {
    if (confirm('Tem certeza que deseja excluir permanentemente este paciente e todo o seu prontuário?')) {
      const listaFiltrada = pacientes.filter((p) => p.id !== id)
      atualizarBanco(listaFiltrada)
      if (editingId === id) limparFormulario()
      if (pacienteDetalhadoId === id) setPacienteDetalhadoId(null)
    }
  }

  // Adicionar Nova Consulta/Evolução no Prontuário Visual
  const handleAdicionarEvolucao = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pacienteDetalhadoId) return

    const novaEvolucao: EvolucaoRegistro = {
      id: Date.now(),
      data: new Date().toLocaleDateString('pt-BR'),
      peso: novoPesoEvolucao || '0',
      gordura: novaGorduraEvolucao || '0',
      cintura: novaCinturaEvolucao || '0',
      quadril: novaQuadrilEvolucao || '0',
      fotoAntes: fotoAntesEvolucao || undefined,
      fotoDepois: fotoDepoisEvolucao || undefined
    }

    const listaAtualizada = pacientes.map((p) => {
      if (p.id === pacienteDetalhadoId) {
        const novoHistorico = [novaEvolucao, ...p.historicoEvolucao]
        return {
          ...p,
          ultimoPeso: novoPesoEvolucao || p.ultimoPeso,
          historicoEvolucao: novoHistorico
        }
      }
      return p
    })

    atualizarBanco(listaAtualizada)
    setNovoPesoEvolucao('')
    setNovaGorduraEvolucao('')
    setNovaCinturaEvolucao('')
    setNovaQuadrilEvolucao('')
    setFotoAntesEvolucao(null)
    setFotoDepoisEvolucao(null)
    setModalEvolucaoAberto(false)
  }

  const handleUploadFoto = (e: React.ChangeEvent<HTMLInputElement>, tipo: 'antes' | 'depois') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (tipo === 'antes') setFotoAntesEvolucao(reader.result as string)
        else setFotoDepoisEvolucao(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Pacientes filtrados na busca
  const pacientesFiltrados = pacientes.filter((p) => {
    const termo = busca.toLowerCase()
    return (
      p.nome.toLowerCase().includes(termo) ||
      p.telefone.includes(termo) ||
      p.objetivo.toLowerCase().includes(termo)
    )
  })

  const pacienteAtivoDetalhado = pacientes.find((p) => p.id === pacienteDetalhadoId)

  // Classes do Tema
  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgSubCard = isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
  const textMuted = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'
  const borderDivider = isLight ? 'border-slate-200' : 'border-slate-800'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-500">Banco de Dados e Gestão de Pacientes</h1>
          <p className={`text-xs ${textMuted}`}>
            Cadastre dados antropométricos, acompanhe o % de gordura automático e veja a evolução corporal
          </p>
        </div>
      </div>

      {/* FORMULÁRIO DE CADASTRO / EDIÇÃO */}
      <div className={`p-6 rounded-2xl border ${bgCard}`}>
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800/40">
          <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
            {editingId ? '✏️ Modo de Edição de Prontuário' : '➕ Cadastrar Novo Paciente (Prontuário Inicial)'}
          </h2>
          {editingId && (
            <button
              onClick={limparFormulario}
              className="text-xs text-rose-500 hover:underline font-bold"
            >
              ✕ Cancelar Edição
            </button>
          )}
        </div>

        <form onSubmit={handleSalvarPaciente} className="space-y-5">
          {/* Dados Pessoais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label className={`block text-xs mb-1 ${textMuted}`}>Nome Completo *</label>
              <input
                type="text"
                required
                placeholder="Ex: Ana Maria Souza"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              />
            </div>

            <div>
              <label className={`block text-xs mb-1 ${textMuted}`}>Gênero Biológico *</label>
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value as 'feminino' | 'masculino')}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              >
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs mb-1 ${textMuted}`}>Telefone / WhatsApp (com DDD)</label>
              <input
                type="text"
                placeholder="Ex: 21999998888"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label className={`block text-xs mb-1 ${textMuted}`}>Objetivo Principal</label>
              <input
                type="text"
                placeholder="Ex: Emagrecimento, Hipertrofia"
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              />
            </div>

            <div>
              <label className={`block text-xs mb-1 ${textMuted}`}>Data 1ª Consulta</label>
              <input
                type="date"
                value={dataConsulta}
                onChange={(e) => setDataConsulta(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              />
            </div>

            <div>
              <label className={`block text-xs mb-1 ${textMuted}`}>Idade (Anos)</label>
              <input
                type="number"
                placeholder="Ex: 28"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              />
            </div>

            <div>
              <label className={`block text-xs mb-1 ${textMuted}`}>Altura (cm)</label>
              <input
                type="number"
                placeholder="Ex: 165"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              />
            </div>

            <div>
              <label className={`block text-xs mb-1 ${textMuted}`}>Peso Inicial (kg)</label>
              <input
                type="text"
                placeholder="Ex: 75.5"
                value={pesoInicial}
                onChange={(e) => setPesoInicial(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              />
            </div>
          </div>

          {/* PAINEL DE CÁLCULO AUTOMÁTICO DE GORDURA */}
          <div className={`p-4 rounded-xl border space-y-3 ${bgSubCard}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2 border-slate-700/30">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                ⚡ Módulo de Antropometria & Cálculo de Gordura Corporal
              </span>

              <div className="flex items-center gap-2 text-xs">
                <span className={textMuted}>Método:</span>
                <select
                  value={modoCalculoGordura}
                  onChange={(e) => setModoCalculoGordura(e.target.value as any)}
                  className={`rounded-lg border p-1.5 text-xs font-bold focus:outline-none ${bgInput}`}
                >
                  <option value="dobras">Dobras Cutâneas (Jackson & Pollock)</option>
                  <option value="medidas">Circunferências (US Navy Method)</option>
                  <option value="manual">Manual / Bioimpedância</option>
                </select>
              </div>
            </div>

            {/* Campos por Dobras */}
            {modoCalculoGordura === 'dobras' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 animate-in fade-in">
                <div>
                  <label className={`block text-[11px] mb-1 ${textMuted}`}>Tríceps (mm)</label>
                  <input
                    type="number"
                    placeholder="Ex: 12"
                    value={triceps}
                    onChange={(e) => setTriceps(e.target.value)}
                    className={`w-full rounded-xl border p-2 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>
                <div>
                  <label className={`block text-[11px] mb-1 ${textMuted}`}>Subescapular (mm)</label>
                  <input
                    type="number"
                    placeholder="Ex: 18"
                    value={subescapular}
                    onChange={(e) => setSubescapular(e.target.value)}
                    className={`w-full rounded-xl border p-2 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>
                <div>
                  <label className={`block text-[11px] mb-1 ${textMuted}`}>Suprailíaca (mm)</label>
                  <input
                    type="number"
                    placeholder="Ex: 15"
                    value={suprailiaca}
                    onChange={(e) => setSuprailiaca(e.target.value)}
                    className={`w-full rounded-xl border p-2 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>
                <div>
                  <label className={`block text-[11px] mb-1 ${textMuted}`}>Abdômen (mm)</label>
                  <input
                    type="number"
                    placeholder="Ex: 22"
                    value={abdomenDobra}
                    onChange={(e) => setAbdomenDobra(e.target.value)}
                    className={`w-full rounded-xl border p-2 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>
              </div>
            )}

            {/* Campos por Medidas */}
            {modoCalculoGordura === 'medidas' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-in fade-in">
                <div>
                  <label className={`block text-[11px] mb-1 ${textMuted}`}>Cintura (cm)</label>
                  <input
                    type="number"
                    placeholder="Ex: 78"
                    value={cintura}
                    onChange={(e) => setCintura(e.target.value)}
                    className={`w-full rounded-xl border p-2 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>
                <div>
                  <label className={`block text-[11px] mb-1 ${textMuted}`}>Pescoço (cm)</label>
                  <input
                    type="number"
                    placeholder="Ex: 36"
                    value={pescoco}
                    onChange={(e) => setPescoco(e.target.value)}
                    className={`w-full rounded-xl border p-2 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>
                {genero === 'feminino' && (
                  <div>
                    <label className={`block text-[11px] mb-1 ${textMuted}`}>Quadril (cm)</label>
                    <input
                      type="number"
                      placeholder="Ex: 98"
                      value={quadril}
                      onChange={(e) => setQuadril(e.target.value)}
                      className={`w-full rounded-xl border p-2 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Resultado do % de Gordura */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-700/20">
              <span className={`text-xs ${textMuted}`}>
                {modoCalculoGordura !== 'manual' ? '📊 % Gordura Calculado Automaticamente:' : '✍️ Digite o % Gordura Manual / Bioimpedância:'}
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ex: 22.5"
                  value={gorduraInicial}
                  onChange={(e) => setGorduraInicial(e.target.value)}
                  className={`w-28 rounded-xl border p-2 text-center text-sm font-extrabold text-emerald-500 focus:border-emerald-500 focus:outline-none ${bgInput}`}
                />
                <span className="text-xs font-bold text-emerald-500">%</span>
              </div>
            </div>
          </div>

          <div>
            <label className={`block text-xs mb-1 ${textMuted}`}>Observações do Prontuário / Histórico Clínico</label>
            <textarea
              rows={2}
              placeholder="Restrições alimentares, alergias, rotina de treino ou patologias associadas..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
            />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            {editingId && (
              <button
                type="button"
                onClick={limparFormulario}
                className={`px-5 py-2.5 rounded-xl border text-xs font-semibold ${bgCard}`}
              >
                Cancelar
              </button>
            )}
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10"
            >
              {editingId ? '💾 Salvar Alterações no Prontuário' : '+ Cadastrar Paciente no Banco de Dados'}
            </button>
          </div>
        </form>
      </div>

      {/* BARRA DE BUSCA EM TEMPO REAL E TABELA DE PACIENTES */}
      <div className={`rounded-2xl border overflow-hidden ${bgCard}`}>
        
        <div className={`p-4 border-b flex flex-col md:flex-row gap-4 justify-between items-center ${borderDivider}`}>
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="🔍 Pesquisar paciente por nome, WhatsApp ou objetivo..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs pl-3 pr-8 focus:border-emerald-500 focus:outline-none ${bgInput}`}
            />
            {busca && (
              <button
                onClick={() => setBusca('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <span className={`text-xs ${textMuted}`}>
            Exibindo <strong className="text-emerald-500">{pacientesFiltrados.length}</strong> de {pacientes.length} paciente(s)
          </span>
        </div>

        {/* TABELA DE PACIENTES */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className={`border-b uppercase font-bold text-[10px] tracking-wider ${borderDivider} ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-950/60 text-slate-400'}`}>
              <tr>
                <th className="p-4">Paciente</th>
                <th className="p-4">1ª Consulta</th>
                <th className="p-4">Peso Inicial</th>
                <th className="p-4">Último Peso</th>
                <th className="p-4">% Gordura</th>
                <th className="p-4">Objetivo</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${borderDivider}`}>
              {pacientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    {busca ? 'Nenhum paciente encontrado para a pesquisa.' : 'Nenhum paciente cadastrado ainda. Use o formulário acima para criar o primeiro prontuário.'}
                  </td>
                </tr>
              ) : (
                pacientesFiltrados.map((paciente) => (
                  <tr key={paciente.id} className={`transition ${isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-800/50'}`}>
                    <td className="p-4 font-bold flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-bold flex items-center justify-center text-xs">
                        {paciente.nome.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold">{paciente.nome}</p>
                        {paciente.telefone && <p className="text-[10px] text-slate-400">📱 {paciente.telefone}</p>}
                      </div>
                    </td>
                    <td className="p-4">{paciente.dataConsulta || '-'}</td>
                    <td className="p-4 font-semibold text-emerald-500">{paciente.pesoInicial ? `${paciente.pesoInicial} kg` : '-'}</td>
                    <td className="p-4 font-semibold">{paciente.ultimoPeso ? `${paciente.ultimoPeso} kg` : '-'}</td>
                    <td className="p-4 font-bold text-emerald-500">{paciente.gorduraInicial ? `${paciente.gorduraInicial}%` : '-'}</td>
                    <td className="p-4">{paciente.objetivo || '-'}</td>
                    <td className="p-4 text-right space-x-1.5">
                      <button
                        onClick={() => setPacienteDetalhadoId(pacienteDetalhadoId === paciente.id ? null : paciente.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 font-semibold text-[11px] border border-emerald-500/20 transition"
                      >
                        👁️ Prontuário Visual
                      </button>
                      <button
                        onClick={() => handleIniciarEdicao(paciente)}
                        className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 text-sky-500 hover:bg-sky-500/20 font-semibold text-[11px] border border-sky-500/20 transition"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleExcluirPaciente(paciente.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 font-semibold text-[11px] border border-rose-500/20 transition"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* MÓDULO VISUAL DE PRONTUÁRIO, EVOLUÇÃO E COMPARATIVO ANTES/DEPOIS */}
      {pacienteAtivoDetalhado && (
        <div className={`p-6 rounded-2xl border space-y-6 animate-in fade-in duration-300 ${bgCard}`}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 border-slate-800/40">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Prontuário e Escaneamento Corporal</span>
              <h2 className="text-xl font-bold">{pacienteAtivoDetalhado.nome}</h2>
              <p className={`text-xs ${textMuted}`}>
                Gênero: {pacienteAtivoDetalhado.genero === 'feminino' ? 'Feminino' : 'Masculino'} • Idade: {pacienteAtivoDetalhado.idade || '-'} anos • Altura: {pacienteAtivoDetalhado.altura || '-'} cm
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setModalEvolucaoAberto(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10"
              >
                + Registrar Nova Consulta / Evolução
              </button>
              <button
                onClick={() => setPacienteDetalhadoId(null)}
                className="p-2 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Histórico Clínico */}
          {pacienteAtivoDetalhado.observacoesProntuario && (
            <div className={`p-4 rounded-xl border ${bgSubCard}`}>
              <h3 className="text-xs font-bold uppercase text-emerald-500 mb-1">Observações do Prontuário</h3>
              <p className="text-xs leading-relaxed whitespace-pre-wrap">{pacienteAtivoDetalhado.observacoesProntuario}</p>
            </div>
          )}

          {/* Galeria de Fotos Antes/Depois e Histórico */}
          <div>
            <h3 className="text-xs font-bold uppercase text-emerald-500 mb-3 tracking-wider">Histórico de Escaneamento Corporal</h3>
            
            {pacienteAtivoDetalhado.historicoEvolucao.length === 0 ? (
              <div className={`p-6 text-center text-xs rounded-xl border border-dashed ${borderDivider} ${textMuted}`}>
                Nenhum registro de evolução adicionado para este paciente ainda. Clique no botão acima para inserir novas medições ou fotos comparativas.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pacienteAtivoDetalhado.historicoEvolucao.map((reg) => (
                  <div key={reg.id} className={`p-4 rounded-xl border space-y-3 ${bgSubCard}`}>
                    <div className="flex justify-between items-center border-b pb-2 border-slate-700/30">
                      <span className="text-xs font-bold text-emerald-500">📅 Consulta em: {reg.data}</span>
                      <span className="text-xs font-bold">Peso: {reg.peso} kg • Gordura: {reg.gordura}%</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <span className="block text-[10px] text-slate-400">Cintura</span>
                        <strong className="text-emerald-500">{reg.cintura ? `${reg.cintura} cm` : '-'}</strong>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <span className="block text-[10px] text-slate-400">Quadril</span>
                        <strong className="text-emerald-500">{reg.quadril ? `${reg.quadril} cm` : '-'}</strong>
                      </div>
                    </div>

                    {(reg.fotoAntes || reg.fotoDepois) && (
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {reg.fotoAntes && (
                          <div>
                            <span className="text-[10px] font-bold block mb-1 text-center text-slate-400">Antes</span>
                            <img src={reg.fotoAntes} alt="Antes" className="w-full h-36 object-cover rounded-lg border border-slate-700" />
                          </div>
                        )}
                        {reg.fotoDepois && (
                          <div>
                            <span className="text-[10px] font-bold block mb-1 text-center text-slate-400">Depois</span>
                            <img src={reg.fotoDepois} alt="Depois" className="w-full h-36 object-cover rounded-lg border border-slate-700" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL ADICIONAR EVOLUÇÃO / FOTOS DE CONSULTA */}
      {modalEvolucaoAberto && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-2xl border p-6 space-y-4 ${bgCard}`}>
            <div className="flex justify-between items-center border-b pb-3 border-slate-800">
              <h3 className="font-bold text-sm text-emerald-500">+ Nova Consulta de Retorno / Evolução</h3>
              <button onClick={() => setModalEvolucaoAberto(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAdicionarEvolucao} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs mb-1 ${textMuted}`}>Novo Peso (kg)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 73.2"
                    value={novoPesoEvolucao}
                    onChange={(e) => setNovoPesoEvolucao(e.target.value)}
                    className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${textMuted}`}>Novo % Gordura</label>
                  <input
                    type="text"
                    placeholder="Ex: 24.1"
                    value={novaGorduraEvolucao}
                    onChange={(e) => setNovaGorduraEvolucao(e.target.value)}
                    className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs mb-1 ${textMuted}`}>Cintura (cm)</label>
                  <input
                    type="text"
                    placeholder="Ex: 76"
                    value={novaCinturaEvolucao}
                    onChange={(e) => setNovaCinturaEvolucao(e.target.value)}
                    className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>
                <div>
                  <label className={`block text-xs mb-1 ${textMuted}`}>Quadril (cm)</label>
                  <input
                    type="text"
                    placeholder="Ex: 96"
                    value={novaQuadrilEvolucao}
                    onChange={(e) => setNovaQuadrilEvolucao(e.target.value)}
                    className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>
              </div>

              {/* Upload de Fotos Comparativas */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className={`block text-xs mb-1 ${textMuted}`}>Foto Inicial / Antes</label>
                  <label className={`block p-3 border border-dashed rounded-xl text-center cursor-pointer hover:border-emerald-500 transition ${bgSubCard}`}>
                    <span className="text-xs text-emerald-500 font-bold block">📷 Anexar Foto</span>
                    <input type="file" accept="image/*" onChange={(e) => handleUploadFoto(e, 'antes')} className="hidden" />
                  </label>
                  {fotoAntesEvolucao && <span className="text-[10px] text-emerald-500 block text-center mt-1">✓ Foto Antes anexada</span>}
                </div>

                <div>
                  <label className={`block text-xs mb-1 ${textMuted}`}>Foto Atual / Depois</label>
                  <label className={`block p-3 border border-dashed rounded-xl text-center cursor-pointer hover:border-emerald-500 transition ${bgSubCard}`}>
                    <span className="text-xs text-emerald-500 font-bold block">📷 Anexar Foto</span>
                    <input type="file" accept="image/*" onChange={(e) => handleUploadFoto(e, 'depois')} className="hidden" />
                  </label>
                  {fotoDepoisEvolucao && <span className="text-[10px] text-emerald-500 block text-center mt-1">✓ Foto Depois anexada</span>}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalEvolucaoAberto(false)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold ${bgCard}`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Salvar Evolução
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}