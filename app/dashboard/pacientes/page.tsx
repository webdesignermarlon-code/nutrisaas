'use client'

import { useState, useEffect } from 'react'

interface RegistroEvolucao {
  data: string
  peso: number
  percentualGordura: number
}

interface Paciente {
  id: number
  nome: string
  telefone: string
  objetivo: string
  dataPrimeiraConsulta: string
  idade: number
  altura: number // em cm
  pesoInicial: number
  percentualGorduraInicial: number
  historicoEvolucao: RegistroEvolucao[]
  status: string
}

export default function PacientesPage() {
  const [isLight, setIsLight] = useState(false)
  
  // Campos de cadastro
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [objetivo, setObjetivo] = useState('')
  const [data1aConsulta, setData1aConsulta] = useState('')
  const [idade, setIdade] = useState('')
  const [altura, setAltura] = useState('')
  const [pesoInicial, setPesoInicial] = useState('')
  const [gorduraInicial, setGorduraInicial] = useState('')

  // Modais de ações
  const [pacienteEvolucao, setPacienteEvolucao] = useState<Paciente | null>(null)
  const [modalAgendar, setModalAgendar] = useState<Paciente | null>(null)

  // Campos para adicionar nova avaliação na Evolução
  const [novaDataAvaliacao, setNovaDataAvaliacao] = useState('')
  const [novoPesoAvaliacao, setNovoPesoAvaliacao] = useState('')
  const [novaGorduraAvaliacao, setNovaGorduraAvaliacao] = useState('')

  // Campos de Agendamento
  const [dataConsulta, setDataConsulta] = useState('')
  const [horaConsulta, setHoraConsulta] = useState('')
  const [tipoConsulta, setTipoConsulta] = useState('Retorno e Acompanhamento')
  const [enviarWhats, setEnviarWhats] = useState(true)

  // Banco de dados em estado local
  const [pacientes, setPacientes] = useState<Paciente[]>([])

  useEffect(() => {
    // Carrega do tema e do banco local
    const checkTheme = () => {
      const theme = localStorage.getItem('nutrisaas-theme')
      setIsLight(theme === 'light')
    }
    checkTheme()

    const salvos = localStorage.getItem('nutrisaas-pacientes-db')
    if (salvos) {
      try {
        setPacientes(JSON.parse(salvos))
      } catch (e) {
        console.error('Erro ao carregar banco de pacientes', e)
      }
    }

    window.addEventListener('storage', checkTheme)
    const interval = setInterval(checkTheme, 500)
    return () => {
      window.removeEventListener('storage', checkTheme)
      clearInterval(interval)
    }
  }, [])

  // Salva no banco de dados local sempre que houver alteração
  const salvarNoBanco = (novosPacientes: Paciente[]) => {
    setPacientes(novosPacientes)
    localStorage.setItem('nutrisaas-pacientes-db', JSON.stringify(novosPacientes))
  }

  const handleCadastrar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nome) return

    const pInit = parseFloat(pesoInicial) || 0
    const gInit = parseFloat(gorduraInicial) || 0
    const dConsulta = data1aConsulta || new Date().toISOString().split('T')[0]

    const novo: Paciente = {
      id: Date.now(),
      nome,
      telefone: telefone || 'Não informado',
      objetivo: objetivo || 'Acompanhamento Nutricional',
      dataPrimeiraConsulta: dConsulta,
      idade: parseInt(idade) || 0,
      altura: parseFloat(altura) || 0,
      pesoInicial: pInit,
      percentualGorduraInicial: gInit,
      status: 'Ativo',
      historicoEvolucao: [
        {
          data: dConsulta,
          peso: pInit,
          percentualGordura: gInit,
        },
      ],
    }

    const atualizada = [novo, ...pacientes]
    salvarNoBanco(atualizada)

    // Limpa o formulário
    setNome('')
    setTelefone('')
    setObjetivo('')
    setData1aConsulta('')
    setIdade('')
    setAltura('')
    setPesoInicial('')
    setGorduraInicial('')
  }

  const handleAdicionarEvolucao = (e: React.FormEvent) => {
    e.preventDefault()
    if (!pacienteEvolucao || !novoPesoAvaliacao) return

    const pesoNum = parseFloat(novoPesoAvaliacao)
    const gordNum = parseFloat(novaGorduraAvaliacao) || 0
    const dataReg = novaDataAvaliacao || new Date().toISOString().split('T')[0]

    const novoRegistro: RegistroEvolucao = {
      data: dataReg,
      peso: pesoNum,
      percentualGordura: gordNum,
    }

    const listaAtualizada = pacientes.map((p) => {
      if (p.id === pacienteEvolucao.id) {
        return {
          ...p,
          historicoEvolucao: [novoRegistro, ...p.historicoEvolucao],
        }
      }
      return p
    })

    salvarNoBanco(listaAtualizada)
    const pacienteAtualizado = listaAtualizada.find((p) => p.id === pacienteEvolucao.id) || null
    setPacienteEvolucao(pacienteAtualizado)

    setNovaDataAvaliacao('')
    setNovoPesoAvaliacao('')
    setNovaGorduraAvaliacao('')
    alert('Nova avaliação física registrada com sucesso!')
  }

  const handleExcluir = (id: number, nomePaciente: string) => {
    if (confirm(`Tem certeza que deseja excluir o prontuário de "${nomePaciente}"?`)) {
      const filtrados = pacientes.filter((p) => p.id !== id)
      salvarNoBanco(filtrados)
      if (pacienteEvolucao?.id === id) setPacienteEvolucao(null)
    }
  }

  const handleAbrirWhatsApp = (paciente: Paciente) => {
    const numeroLimpo = paciente.telefone.replace(/\D/g, '')
    if (!numeroLimpo) {
      alert('Este paciente não possui um número de telefone válido cadastrado.')
      return
    }

    const mensagem = `Olá, ${paciente.nome}! Tudo bem? Sou seu nutricionista. Vamos conversar sobre o seu acompanhamento?`
    const url = `https://api.whatsapp.com/send?phone=55${numeroLimpo}&text=${encodeURIComponent(mensagem)}`
    window.open(url, '_blank')
  }

  const handleConfirmarAgendamento = (e: React.FormEvent) => {
    e.preventDefault()
    if (!dataConsulta || !horaConsulta || !modalAgendar) return

    const partesData = dataConsulta.split('-')
    const dataFormatada = partesData.length === 3 ? `${partesData[2]}/${partesData[1]}/${partesData[0]}` : dataConsulta
    const numeroLimpo = modalAgendar.telefone.replace(/\D/g, '')

    if (enviarWhats && numeroLimpo) {
      const mensagem = `🗓️ *AGENDAMENTO DE CONSULTA NUTRICIONAL*\n\nOlá, *${modalAgendar.nome}*!\nSua consulta foi agendada com sucesso.\n\n📅 *Data:* ${dataFormatada}\n⏰ *Horário:* ${horaConsulta}\n📌 *Tipo:* ${tipoConsulta}\n\nQualquer dúvida ou necessidade de reagendamento, favor me avisar por aqui. Até breve!`
      const url = `https://api.whatsapp.com/send?phone=55${numeroLimpo}&text=${encodeURIComponent(mensagem)}`
      window.open(url, '_blank')
    } else {
      alert(`Consulta agendada para ${modalAgendar.nome} em ${dataFormatada} às ${horaConsulta}!`)
    }

    setModalAgendar(null)
    setDataConsulta('')
    setHoraConsulta('')
  }

  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgHeaderTable = isLight ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-950 text-slate-400 border-slate-800'
  const bgSubCard = isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-emerald-500">Banco de Dados e Gestão de Pacientes</h1>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Cadastre dados antropométricos iniciais, agende consultas e acompanhe a evolução física
        </p>
      </div>

      {/* Formulário de Cadastro Completo de Prontuário */}
      <form onSubmit={handleCadastrar} className={`rounded-2xl border p-6 space-y-4 ${bgCard}`}>
        <h2 className="text-sm font-bold border-b pb-2">Cadastrar Novo Paciente (Prontuário Inicial)</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Nome Completo *</label>
            <input
              type="text"
              placeholder="Ex: Ana Maria Souza"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              required
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Telefone / WhatsApp (com DDD)</label>
            <input
              type="text"
              placeholder="Ex: 21999998888"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Objetivo Principal</label>
            <input
              type="text"
              placeholder="Ex: Emagrecimento, Hipertrofia"
              value={objetivo}
              onChange={(e) => setObjetivo(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Data 1ª Consulta</label>
            <input
              type="date"
              value={data1aConsulta}
              onChange={(e) => setData1aConsulta(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Idade (Anos)</label>
            <input
              type="number"
              placeholder="Ex: 28"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Altura (cm)</label>
            <input
              type="number"
              placeholder="Ex: 165"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Peso Inicial (kg)</label>
            <input
              type="number"
              step="0.1"
              placeholder="Ex: 75.5"
              value={pesoInicial}
              onChange={(e) => setPesoInicial(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
            />
          </div>
          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>% Gordura Inicial</label>
            <input
              type="number"
              step="0.1"
              placeholder="Ex: 28.0"
              value={gorduraInicial}
              onChange={(e) => setGorduraInicial(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-6 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10"
          >
            + Cadastrar Paciente no Banco de Dados
          </button>
        </div>
      </form>

      {/* Tabela de Prontuários */}
      <div className={`rounded-2xl border overflow-hidden ${bgCard}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className={`border-b text-[10px] font-bold uppercase tracking-wider ${bgHeaderTable}`}>
                <th className="p-4">Paciente</th>
                <th className="p-4">1ª Consulta</th>
                <th className="p-4">Peso Inicial</th>
                <th className="p-4">Último Peso</th>
                <th className="p-4">Objetivo</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isLight ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
              {pacientes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400">
                    Nenhum paciente cadastrado ainda. Use o formulário acima para criar o primeiro prontuário.
                  </td>
                </tr>
              ) : (
                pacientes.map((p) => {
                  const ultimoRegistro = p.historicoEvolucao[0] || { peso: p.pesoInicial, percentualGordura: p.percentualGorduraInicial }
                  const d1 = p.dataPrimeiraConsulta ? p.dataPrimeiraConsulta.split('-').reverse().join('/') : '-'

                  return (
                    <tr key={p.id} className={`transition ${isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-950/40'}`}>
                      <td className="p-4 font-bold">
                        <div>{p.nome}</div>
                        <div className={`text-[10px] font-normal ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          {p.telefone} {p.idade ? `• ${p.idade} anos` : ''} {p.altura ? `• ${p.altura}cm` : ''}
                        </div>
                      </td>
                      <td className={`p-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{d1}</td>
                      <td className={`p-4 font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        {p.pesoInicial ? `${p.pesoInicial} kg` : '-'}
                      </td>
                      <td className="p-4 font-bold text-emerald-500">
                        {ultimoRegistro.peso ? `${ultimoRegistro.peso} kg` : '-'}
                      </td>
                      <td className={`p-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{p.objetivo}</td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end items-center gap-2">
                          <button
                            onClick={() => setPacienteEvolucao(p)}
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 font-bold px-2.5 py-1 rounded-lg text-[11px] transition flex items-center gap-1"
                            title="Ver Histórico de Evolução"
                          >
                            📈 Evolução ({p.historicoEvolucao.length})
                          </button>
                          <button
                            onClick={() => setModalAgendar(p)}
                            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-2.5 py-1 rounded-lg text-[11px] transition flex items-center gap-1 shadow-sm"
                            title="Agendar Consulta"
                          >
                            📅 Agendar
                          </button>
                          <button
                            onClick={() => handleAbrirWhatsApp(p)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-2.5 py-1 rounded-lg text-[11px] transition flex items-center gap-1 shadow-sm"
                            title="Chamar no WhatsApp"
                          >
                            💬
                          </button>
                          <button
                            onClick={() => handleExcluir(p.id, p.nome)}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-semibold px-2.5 py-1 rounded-lg text-[11px] transition"
                            title="Excluir paciente"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Prontuário e Evolução do Paciente */}
      {pacienteEvolucao && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl rounded-2xl border p-6 space-y-5 max-h-[90vh] overflow-y-auto ${bgCard}`}>
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-lg text-emerald-500">Evolução Clínica: {pacienteEvolucao.nome}</h3>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Histórico de avaliações antropométricas e alteração de composição corporal
                </p>
              </div>
              <button onClick={() => setPacienteEvolucao(null)} className="text-slate-400 hover:text-white text-lg">✕</button>
            </div>

            {/* Resumo Antropométrico */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className={`p-3 rounded-xl border ${bgSubCard}`}>
                <span className="text-[10px] text-slate-400 block font-semibold">Peso Inicial</span>
                <span className="text-sm font-bold">{pacienteEvolucao.pesoInicial ? `${pacienteEvolucao.pesoInicial} kg` : '-'}</span>
              </div>
              <div className={`p-3 rounded-xl border ${bgSubCard}`}>
                <span className="text-[10px] text-slate-400 block font-semibold">Último Peso</span>
                <span className="text-sm font-bold text-emerald-500">
                  {pacienteEvolucao.historicoEvolucao[0]?.peso ? `${pacienteEvolucao.historicoEvolucao[0].peso} kg` : '-'}
                </span>
              </div>
              <div className={`p-3 rounded-xl border ${bgSubCard}`}>
                <span className="text-[10px] text-slate-400 block font-semibold">Variação de Peso</span>
                {(() => {
                  const ult = pacienteEvolucao.historicoEvolucao[0]?.peso || pacienteEvolucao.pesoInicial
                  const diff = parseFloat((ult - pacienteEvolucao.pesoInicial).toFixed(1))
                  return (
                    <span className={`text-sm font-bold ${diff < 0 ? 'text-emerald-500' : diff > 0 ? 'text-amber-500' : 'text-slate-400'}`}>
                      {diff > 0 ? `+${diff}` : diff} kg
                    </span>
                  )
                })()}
              </div>
              <div className={`p-3 rounded-xl border ${bgSubCard}`}>
                <span className="text-[10px] text-slate-400 block font-semibold">% Gordura Atual</span>
                <span className="text-sm font-bold text-sky-500">
                  {pacienteEvolucao.historicoEvolucao[0]?.percentualGordura ? `${pacienteEvolucao.historicoEvolucao[0].percentualGordura}%` : '-'}
                </span>
              </div>
            </div>

            {/* Formulário de Nova Avaliação Física */}
            <form onSubmit={handleAdicionarEvolucao} className={`p-4 rounded-xl border space-y-3 ${bgSubCard}`}>
              <h4 className="text-xs font-bold uppercase text-emerald-500">+ Registrar Nova Reavaliação Física</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={`block text-[10px] mb-1 ${textLabel}`}>Data da Avaliação</label>
                  <input
                    type="date"
                    value={novaDataAvaliacao}
                    onChange={(e) => setNovaDataAvaliacao(e.target.value)}
                    className={`w-full rounded-xl border p-2 text-xs ${bgInput}`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-[10px] mb-1 ${textLabel}`}>Peso Atual (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 72.0"
                    value={novoPesoAvaliacao}
                    onChange={(e) => setNovoPesoAvaliacao(e.target.value)}
                    className={`w-full rounded-xl border p-2 text-xs ${bgInput}`}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-[10px] mb-1 ${textLabel}`}>% Gordura Atual</label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 24.5"
                    value={novaGorduraAvaliacao}
                    onChange={(e) => setNovaGorduraAvaliacao(e.target.value)}
                    className={`w-full rounded-xl border p-2 text-xs ${bgInput}`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2 rounded-xl text-xs transition"
              >
                Salvar Reavaliação no Histórico
              </button>
            </form>

            {/* Tabela de Histórico de Consultas */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold">Histórico de Consultas e Medições</h4>
              <div className="rounded-xl border overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className={`border-b text-[10px] font-bold uppercase ${bgHeaderTable}`}>
                      <th className="p-3">Data</th>
                      <th className="p-3">Peso</th>
                      <th className="p-3">% Gordura</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {pacienteEvolucao.historicoEvolucao.map((reg, idx) => {
                      const d = reg.data ? reg.data.split('-').reverse().join('/') : '-'
                      return (
                        <tr key={idx} className={isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-950/40'}>
                          <td className="p-3 font-semibold">{d}</td>
                          <td className="p-3 font-bold text-emerald-500">{reg.peso} kg</td>
                          <td className="p-3">{reg.percentualGordura ? `${reg.percentualGordura}%` : '-'}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setPacienteEvolucao(null)}
                className={`py-2 px-5 rounded-xl border text-xs font-semibold ${isLight ? 'border-slate-300' : 'border-slate-800'}`}
              >
                Fechar Prontuário
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Agendamento */}
      {modalAgendar && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 space-y-4 ${bgCard}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base">Agendar Consulta: {modalAgendar.nome}</h3>
              <button onClick={() => setModalAgendar(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleConfirmarAgendamento} className="space-y-3">
              <div>
                <label className={`block text-xs mb-1 ${textLabel}`}>Data da Consulta</label>
                <input
                  type="date"
                  value={dataConsulta}
                  onChange={(e) => setDataConsulta(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-xs mb-1 ${textLabel}`}>Horário</label>
                <input
                  type="time"
                  value={horaConsulta}
                  onChange={(e) => setHoraConsulta(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-xs mb-1 ${textLabel}`}>Tipo de Consulta</label>
                <select
                  value={tipoConsulta}
                  onChange={(e) => setTipoConsulta(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                >
                  <option value="Primeira Consulta">Primeira Consulta</option>
                  <option value="Retorno e Acompanhamento">Retorno e Acompanhamento</option>
                  <option value="Bioimpedância / Avaliação">Bioimpedância / Avaliação</option>
                  <option value="Consulta Online">Consulta Online</option>
                </select>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chkWhatsapp"
                  checked={enviarWhats}
                  onChange={(e) => setEnviarWhats(e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
                <label htmlFor="chkWhatsapp" className={`text-xs cursor-pointer ${textLabel}`}>
                  Enviar confirmação diretamente para o WhatsApp do paciente
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalAgendar(null)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold ${isLight ? 'border-slate-300' : 'border-slate-800'}`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}