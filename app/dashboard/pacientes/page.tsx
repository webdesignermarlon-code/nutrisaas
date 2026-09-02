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
  
  // Antropometria
  modoCalculoGordura: 'manual' | 'dobras' | 'medidas'
  triceps: string
  subescapular: string
  suprailiaca: string
  abdomenDobra: string
  cintura: string
  pescoco: string
  quadril: string
  
  // Prontuário e Histórico
  historicoEvolucao: EvolucaoRegistro[]
  observacoesProntuario: string
}

export default function PacientesPage() {
  const [isLight, setIsLight] = useState(false)
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  
  // Busca em tempo real
  const [busca, setBusca] = useState('')

  // Detalhamento do Prontuário
  const [pacienteDetalhadoId, setPacienteDetalhadoId] = useState<number | null>(null)

  // Estado do Formulário de Cadastro/Edição
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

  // Campos Antropométricos
  const [modoCalculoGordura, setModoCalculoGordura] = useState<'manual' | 'dobras' | 'medidas'>('dobras')
  const [triceps, setTriceps] = useState('')
  const [subescapular, setSubescapular] = useState('')
  const [suprailiaca, setSuprailiaca] = useState('')
  const [abdomenDobra, setAbdomenDobra] = useState('')
  const [cintura, setCintura] = useState('')
  const [pescoco, setPescoco] = useState('')
  const [quadril, setQuadril] = useState('')

  // Modal de Nova Avaliação
  const [modalEvolucaoAberto, setModalEvolucaoAberto] = useState(false)
  const [novoPesoEvolucao, setNovoPesoEvolucao] = useState('')
  const [novaGorduraEvolucao, setNovaGorduraEvolucao] = useState('')
  const [novaCinturaEvolucao, setNovaCinturaEvolucao] = useState('')
  const [novaQuadrilEvolucao, setNovaQuadrilEvolucao] = useState('')
  const [fotoAntesEvolucao, setFotoAntesEvolucao] = useState<string | null>(null)
  const [fotoDepoisEvolucao, setFotoDepoisEvolucao] = useState<string | null>(null)

  // Controle de Seções Sanfona no Prontuário
  const [secaoPlanoAberto, setSecaoPlanoAberto] = useState(true)
  const [secaoPrescricaoAberto, setSecaoPrescricaoAberto] = useState(true)
  const [secaoAvaliacoesAberto, setSecaoAvaliacoesAberto] = useState(true)

  useEffect(() => {
    const checkTheme = () => {
      const theme = localStorage.getItem('nutrisaas-theme')
      setIsLight(theme === 'light')
    }
    checkTheme()

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

  // CÁLCULO AUTOMÁTICO DE GORDURA CORPORAL (POR PESO/ALTURA/IDADE OU DOBRAS)
  useEffect(() => {
    if (modoCalculoGordura === 'manual') return

    const numIdade = parseFloat(idade.replace(',', '.')) || 0
    const numPeso = parseFloat(pesoInicial.replace(',', '.')) || 0
    let numAltura = parseFloat(altura.replace(',', '.')) || 0
    if (numAltura > 3) numAltura = numAltura / 100 // Se digitou em cm (180), converte pra m (1.80)

    if (modoCalculoGordura === 'dobras') {
      const tri = parseFloat(triceps) || 0
      const sub = parseFloat(subescapular) || 0
      const sup = parseFloat(suprailiaca) || 0
      const abd = parseFloat(abdomenDobra) || 0
      const somaDobras = tri + sub + sup + abd

      // 1. Se preencheu dobras cutâneas, calcula por Jackson & Pollock
      if (somaDobras > 0) {
        let densidadeCorporal = 0
        const idCalculo = numIdade || 25
        if (genero === 'feminino') {
          densidadeCorporal = 1.096095 - (0.000695 * somaDobras) + (0.0000011 * Math.pow(somaDobras, 2)) - (0.0000714 * idCalculo)
        } else {
          densidadeCorporal = 1.10938 - (0.0008267 * somaDobras) + (0.0000016 * Math.pow(somaDobras, 2)) - (0.0002574 * idCalculo)
        }

        if (densidadeCorporal > 0) {
          const percentualGordura = ((4.95 / densidadeCorporal) - 4.5) * 100
          if (!isNaN(percentualGordura) && percentualGordura > 0 && percentualGordura < 70) {
            setGorduraInicial(percentualGordura.toFixed(1))
            return
          }
        }
      }

      // 2. Se ainda não preencheu dobras, mas colocou Peso, Altura e Idade -> Estimativa por Deurenberg (IMC + Idade)
      if (numPeso > 0 && numAltura > 0 && numIdade > 0) {
        const imc = numPeso / (numAltura * numAltura)
        const fatorSexo = genero === 'masculino' ? 1 : 0
        const percentualGordura = (1.20 * imc) + (0.23 * numIdade) - (10.8 * fatorSexo) - 5.4
        if (!isNaN(percentualGordura) && percentualGordura > 3 && percentualGordura < 70) {
          setGorduraInicial(percentualGordura.toFixed(1))
        }
      }
    } else if (modoCalculoGordura === 'medidas') {
      const numCintura = parseFloat(cintura) || 0
      const numPescoco = parseFloat(pescoco) || 0
      const numQuadril = parseFloat(quadril) || 0

      if (numCintura > 0 && numPescoco > 0 && numAltura > 0) {
        let percentualGordura = 0
        const altCm = numAltura < 3 ? numAltura * 100 : numAltura
        if (genero === 'masculino') {
          percentualGordura = 86.010 * Math.log10(numCintura - numPescoco) - 70.041 * Math.log10(altCm) + 36.76
        } else if (numQuadril > 0) {
          percentualGordura = 163.205 * Math.log10(numCintura + numQuadril - numPescoco) - 97.684 * Math.log10(altCm) - 78.387
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

  const atualizarBanco = (novosPacientes: Paciente[]) => {
    setPacientes(novosPacientes)
    localStorage.setItem('nutrisaas-pacientes-db', JSON.stringify(novosPacientes))
  }

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

  const handleSalvarPaciente = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome.trim()) return

    if (editingId) {
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
      const novoPaciente: Paciente = {
        id: Date.now(),
        nome,
        genero,
        telefone,
        objetivo,
        dataConsulta: dataConsulta || new Date().toISOString().split('T')[0],
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

  const handleExcluirPaciente = (id: number) => {
    if (confirm('Tem certeza que deseja excluir permanentemente este paciente?')) {
      const listaFiltrada = pacientes.filter((p) => p.id !== id)
      atualizarBanco(listaFiltrada)
      if (editingId === id) limparFormulario()
      if (pacienteDetalhadoId === id) setPacienteDetalhadoId(null)
    }
  }

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

  const calcularIMC = (pesoKg: string, alturaCm: string) => {
    const p = parseFloat(pesoKg.replace(',', '.'))
    let a = parseFloat(alturaCm.replace(',', '.'))
    if (!p || !a) return '-'
    if (a > 3) a = a / 100
    const imc = p / (a * a)
    return imc.toFixed(2).replace('.', ',')
  }

  const formatarAlturaM = (alturaCm: string) => {
    let a = parseFloat(alturaCm.replace(',', '.'))
    if (!a) return '1,70m'
    if (a > 3) a = a / 100
    return `${a.toFixed(2).replace('.', ',')}m`
  }

  const extrairIniciais = (nomeCompleto: string) => {
    const partes = nomeCompleto.trim().split(' ')
    if (partes.length >= 2) {
      return (partes[0].charAt(0) + partes[partes.length - 1].charAt(0)).toUpperCase()
    }
    return nomeCompleto.slice(0, 2).toUpperCase()
  }

  const pacientesFiltrados = pacientes.filter((p) => {
    const termo = busca.toLowerCase()
    return (
      p.nome.toLowerCase().includes(termo) ||
      p.telefone.includes(termo) ||
      p.objetivo.toLowerCase().includes(termo)
    )
  })

  const pacienteAtivo = pacientes.find((p) => p.id === pacienteDetalhadoId)

  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgSubCard = isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/70 border-slate-800'
  const textMuted = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'
  const borderDivider = isLight ? 'border-slate-200' : 'border-slate-800'

  return (
    <div className="space-y-6">
      
      {/* SE UM PACIENTE ESTIVER SELECIONADO: EXIBE A FICHA ESTILO DIETBOX */}
      {pacienteAtivo ? (
        <div className="space-y-5 animate-in fade-in duration-300">
          
          {/* Topo do Prontuário - Apenas Nome, Altura, Peso e IMC */}
          <div className={`p-5 rounded-2xl border ${bgCard}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200/20">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-500/20 text-slate-400 font-extrabold flex items-center justify-center text-lg border border-slate-500/30">
                  {extrairIniciais(pacienteAtivo.nome)}
                </div>
                <div>
                  <h1 className="text-xl font-bold flex flex-wrap items-center gap-2">
                    {pacienteAtivo.nome}
                    <span className="text-sm font-normal text-slate-400">
                      - {formatarAlturaM(pacienteAtivo.altura)} | {(pacienteAtivo.ultimoPeso || pacienteAtivo.pesoInicial || '70').replace('.', ',')}kg | IMC: {calcularIMC(pacienteAtivo.ultimoPeso || pacienteAtivo.pesoInicial || '70', pacienteAtivo.altura || '165')}
                    </span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setModalEvolucaoAberto(true)}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10 flex items-center gap-1.5"
                >
                  + Nova Avaliação Física
                </button>
              </div>
            </div>

            {/* Navegação Secundária do Prontuário */}
            <div className="flex items-center justify-between pt-3 text-xs font-semibold">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setPacienteDetalhadoId(null)}
                  className="text-emerald-500 hover:underline flex items-center gap-1"
                >
                  &larr; Lista de Pacientes
                </button>
                <span className="text-emerald-500 flex items-center gap-1 border-b-2 border-emerald-500 pb-0.5">
                  🏥 Prontuário
                </span>
              </div>
              <span className="text-slate-400 cursor-pointer hover:text-white">❓ Suporte</span>
            </div>
          </div>

          {/* SEÇÃO 1: PLANO ALIMENTAR */}
          <div className={`rounded-2xl border overflow-hidden ${bgCard}`}>
            <div
              onClick={() => setSecaoPlanoAberto(!secaoPlanoAberto)}
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-500/5 transition"
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>{secaoPlanoAberto ? '⌄' : '❯'}</span>
                <span>Plano alimentar</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Planos inativos</span>
                <span>Enviar e-mail</span>
                <span>Salvar em PDF ▼</span>
                <span>Imprimir ▼</span>
                <span className="text-emerald-500 font-bold">Visualizar ▼</span>
              </div>
            </div>

            {secaoPlanoAberto && (
              <div className={`p-4 border-t space-y-2 ${borderDivider} ${bgSubCard}`}>
                <div className="p-3 rounded-xl border border-slate-200/20 bg-white dark:bg-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs">🥣</span>
                    <div>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mr-2">
                        Todos os dias
                      </span>
                      <span className="text-xs font-semibold">{pacienteAtivo.objetivo || 'Plano Personalizado'}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{pacienteAtivo.dataConsulta || 'Recente'}</span>
                    <button className="hover:text-emerald-500 font-bold">≡ ▼</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SEÇÃO 2: PRESCRIÇÕES */}
          <div className={`rounded-2xl border overflow-hidden ${bgCard}`}>
            <div
              onClick={() => setSecaoPrescricaoAberto(!secaoPrescricaoAberto)}
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-500/5 transition"
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>{secaoPrescricaoAberto ? '⌄' : '❯'}</span>
                <span>Prescrições (1)</span>
              </div>
            </div>

            {secaoPrescricaoAberto && (
              <div className={`p-4 border-t space-y-2 ${borderDivider} ${bgSubCard}`}>
                <div className="p-3 rounded-xl border border-slate-200/20 bg-white dark:bg-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-sky-500/10 text-sky-500 text-xs">💊</span>
                    <div>
                      <span className="text-xs font-bold mr-2">Suplementação e Fórmulas</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">
                        disponível no app
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>Atualizado em: {pacienteAtivo.dataConsulta || 'Recente'}</span>
                    <button className="hover:text-emerald-500 font-bold">≡ ▼</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* SEÇÃO 3: AVALIAÇÕES ANTROPOMÉTRICAS */}
          <div className={`rounded-2xl border overflow-hidden ${bgCard}`}>
            <div
              onClick={() => setSecaoAvaliacoesAberto(!secaoAvaliacoesAberto)}
              className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-500/5 transition"
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>{secaoAvaliacoesAberto ? '⌄' : '❯'}</span>
                <span>Avaliações antropométricas ({pacienteAtivo.historicoEvolucao.length + 1})</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>Formulário offline ▼</span>
                <span>Gráficos</span>
                <span className="text-emerald-500 font-bold">Comparativos ▼</span>
              </div>
            </div>

            {secaoAvaliacoesAberto && (
              <div className={`p-4 border-t space-y-2 ${borderDivider} ${bgSubCard}`}>
                
                {pacienteAtivo.historicoEvolucao.map((evalItem, idx) => (
                  <div key={evalItem.id} className="p-3 rounded-xl border border-slate-200/20 bg-white dark:bg-slate-900 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="p-2 rounded-lg bg-sky-500/10 text-sky-500 text-xs">📷</span>
                      <span className="text-xs font-bold">{pacienteAtivo.historicoEvolucao.length - idx + 1}ª Avaliação Física</span>
                      <span className="text-xs text-slate-400">({evalItem.peso}kg | {evalItem.gordura}% gordura)</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span>{evalItem.data}</span>
                      <button className="hover:text-emerald-500 font-bold">≡ ▼</button>
                    </div>
                  </div>
                ))}

                <div className="p-3 rounded-xl border border-slate-200/20 bg-white dark:bg-slate-900 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-sky-500/10 text-sky-500 text-xs">📷</span>
                    <span className="text-xs font-bold">1ª Avaliação Física</span>
                    <span className="text-xs text-slate-400">({pacienteAtivo.pesoInicial}kg | {pacienteAtivo.gorduraInicial}% gordura)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{pacienteAtivo.dataConsulta}</span>
                    <button className="hover:text-emerald-500 font-bold">≡ ▼</button>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* SEÇÃO 4: RESUMO CLÍNICO */}
          <div className={`p-5 rounded-2xl border space-y-2 ${bgCard}`}>
            <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Resumo</h3>
            <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed">
              <strong>{pacienteAtivo.nome}</strong> é seu paciente desde <strong>{pacienteAtivo.dataConsulta || 'o cadastro inicial'}</strong>. Sua última interação foi <strong>{pacienteAtivo.historicoEvolucao[0]?.data || pacienteAtivo.dataConsulta || 'recente'}</strong>. De acordo com a última avaliação antropométrica, realizada em <strong>{pacienteAtivo.historicoEvolucao[0]?.data || pacienteAtivo.dataConsulta}</strong>, <strong>{pacienteAtivo.nome}</strong> possui <strong>{formatarAlturaM(pacienteAtivo.altura)}</strong> e <strong>{(pacienteAtivo.ultimoPeso || pacienteAtivo.pesoInicial || '70').replace('.', ',')}kg</strong>. O IMC é de <strong>{calcularIMC(pacienteAtivo.ultimoPeso || pacienteAtivo.pesoInicial || '70', pacienteAtivo.altura || '165')}</strong>.
            </p>
          </div>

        </div>
      ) : (

        /* MODO PADRÃO: FORMULÁRIO E LISTA DE PACIENTES */
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-emerald-500">Banco de Dados e Gestão de Pacientes</h1>
            <p className={`text-xs ${textMuted}`}>
              Cadastre dados antropométricos, acompanhe o % de gordura automático e veja a evolução corporal
            </p>
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
                    type="text"
                    placeholder="Ex: 38"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs mb-1 ${textMuted}`}>Altura (cm ou m)</label>
                  <input
                    type="text"
                    placeholder="Ex: 180 ou 1.80"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                    className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  />
                </div>

                <div>
                  <label className={`block text-xs mb-1 ${textMuted}`}>Peso Inicial (kg)</label>
                  <input
                    type="text"
                    placeholder="Ex: 85"
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
                      <option value="dobras">Dobras Cutâneas (ou Estimativa por Peso/Altura)</option>
                      <option value="medidas">Circunferências (US Navy Method)</option>
                      <option value="manual">Manual / Bioimpedância</option>
                    </select>
                  </div>
                </div>

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

          {/* BARRA DE BUSCA EM TEMPO REAL E TABELA */}
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
                            {extrairIniciais(paciente.nome)}
                          </div>
                          <div>
                            <p
                              onClick={() => setPacienteDetalhadoId(paciente.id)}
                              className="font-bold hover:text-emerald-500 cursor-pointer transition"
                            >
                              {paciente.nome}
                            </p>
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
                            onClick={() => setPacienteDetalhadoId(paciente.id)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 font-semibold text-[11px] border border-emerald-500/20 transition"
                          >
                            👁️ Prontuário
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
        </div>
      )}

      {/* MODAL ADICIONAR EVOLUÇÃO / AVALIAÇÃO FÍSICA */}
      {modalEvolucaoAberto && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-2xl border p-6 space-y-4 ${bgCard}`}>
            <div className="flex justify-between items-center border-b pb-3 border-slate-800">
              <h3 className="font-bold text-sm text-emerald-500">+ Nova Avaliação Física / Consulta de Retorno</h3>
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

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className={`block text-xs mb-1 ${textMuted}`}>Foto Inicial / Antes</label>
                  <label className={`block p-3 border border-dashed rounded-xl text-center cursor-pointer hover:border-emerald-500 transition ${bgSubCard}`}>
                    <span className="text-xs text-emerald-500 font-bold block">📷 Anexar Foto</span>
                    <input type="file" accept="image/*" onChange={(e) => handleUploadFoto(e, 'antes')} className="hidden" />
                  </label>
                  {fotoAntesEvolucao && <span className="text-[10px] text-emerald-500 block text-center mt-1">✓ Foto Anexada</span>}
                </div>

                <div>
                  <label className={`block text-xs mb-1 ${textMuted}`}>Foto Atual / Depois</label>
                  <label className={`block p-3 border border-dashed rounded-xl text-center cursor-pointer hover:border-emerald-500 transition ${bgSubCard}`}>
                    <span className="text-xs text-emerald-500 font-bold block">📷 Anexar Foto</span>
                    <input type="file" accept="image/*" onChange={(e) => handleUploadFoto(e, 'depois')} className="hidden" />
                  </label>
                  {fotoDepoisEvolucao && <span className="text-[10px] text-emerald-500 block text-center mt-1">✓ Foto Anexada</span>}
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
                  Salvar Avaliação
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}