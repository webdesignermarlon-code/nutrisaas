'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [isLight, setIsLight] = useState(false)
  const [modalAgendar, setModalAgendar] = useState(false)
  const [pacienteSelecionado, setPacienteSelecionado] = useState('')
  const [dataConsulta, setDataConsulta] = useState('')
  const [horaConsulta, setHoraConsulta] = useState('')
  const [tipoConsulta, setTipoConsulta] = useState('Primeira Consulta')
  const [enviarWhats, setEnviarWhats] = useState(true)

  const [proximasConsultas, setProximasConsultas] = useState<
    Array<{ nome: string; horario: string; tipo: string; status: string }>
  >([])

  useEffect(() => {
    const theme = localStorage.getItem('nutrisaas-theme')
    setIsLight(theme === 'light')
  }, [])

  const estatisticas = [
    { titulo: 'Pacientes Ativos', valor: '0', icone: '👥', tendencia: 'Comece a cadastrar', cor: 'text-emerald-500' },
    { titulo: 'Dietas Prescritas', valor: '0', icone: '🥗', tendencia: 'Nenhuma dieta enviada', cor: 'text-sky-500' },
    { titulo: 'Consultas no Mês', valor: '0', icone: '📅', tendencia: 'Sem consultas agendadas', cor: 'text-purple-500' },
    { titulo: 'Taxa de Retorno', valor: '0%', icone: '📈', tendencia: 'Aguardando dados', cor: 'text-amber-500' },
  ]

  const handleNovoAgendamento = (e: React.FormEvent) => {
    e.preventDefault()
    if (!horaConsulta || !dataConsulta || !pacienteSelecionado) return

    setProximasConsultas([
      { nome: pacienteSelecionado, horario: horaConsulta, tipo: tipoConsulta, status: 'Confirmado' },
      ...proximasConsultas,
    ])

    const partesData = dataConsulta.split('-')
    const dataFormatada = partesData.length === 3 ? `${partesData[2]}/${partesData[1]}/${partesData[0]}` : dataConsulta

    if (enviarWhats) {
      const mensagem = `🗓️ *AGENDAMENTO DE CONSULTA NUTRICIONAL*\n\nOlá, *${pacienteSelecionado}*!\nSua consulta foi agendada com sucesso.\n\n📅 *Data:* ${dataFormatada}\n⏰ *Horário:* ${horaConsulta}\n📌 *Tipo:* ${tipoConsulta}\n\nQualquer dúvida, estou à disposição!`
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(mensagem)}`
      window.open(url, '_blank')
    } else {
      alert(`Consulta agendada no sistema para ${pacienteSelecionado} às ${horaConsulta}!`)
    }

    setModalAgendar(false)
    setPacienteSelecionado('')
    setDataConsulta('')
    setHoraConsulta('')
  }

  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-500">Painel Principal de Gestão</h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Bem-vinda! Acompanhe seus atendimentos e gerencie suas consultas.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setModalAgendar(true)}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-sky-500/10"
          >
            📅 + Agendar Consulta
          </button>
          <Link
            href="/dashboard/dietas"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10"
          >
            🥗 + Criar Plano Alimentar
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {estatisticas.map((item, idx) => (
          <div key={idx} className={`p-5 rounded-2xl border ${bgCard}`}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-400">{item.titulo}</span>
              <span className="text-xl">{item.icone}</span>
            </div>
            <div className={`text-2xl font-bold ${item.cor}`}>{item.valor}</div>
            <span className="text-[10px] text-slate-400 block mt-1">{item.tendencia}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 p-6 rounded-2xl border space-y-4 ${bgCard}`}>
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-base">Agenda de Consultas do Dia</h2>
            <Link href="/dashboard/pacientes" className="text-xs text-emerald-500 hover:underline font-semibold">
              Gerenciar Pacientes →
            </Link>
          </div>

          <div className="space-y-3">
            {proximasConsultas.length === 0 ? (
              <div className={`p-8 rounded-xl border border-dashed text-center space-y-2 ${isLight ? 'border-slate-300 bg-slate-50' : 'border-slate-800 bg-slate-950/40'}`}>
                <span className="text-2xl block">🗓️</span>
                <p className="text-xs font-medium text-slate-400">Nenhuma consulta agendada para hoje.</p>
                <button
                  onClick={() => setModalAgendar(true)}
                  className="text-xs text-emerald-500 font-bold hover:underline"
                >
                  Clique aqui para agendar uma nova consulta
                </button>
              </div>
            ) : (
              proximasConsultas.map((c, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-xl border flex justify-between items-center text-xs ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800/80'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm">{c.nome}</div>
                    <div className={isLight ? 'text-slate-600' : 'text-slate-400'}>{c.tipo}</div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="font-bold block text-emerald-500">{c.horario}</span>
                    <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-0.5 rounded font-medium">
                      {c.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className={`p-6 rounded-2xl border space-y-4 ${bgCard}`}>
          <h2 className="font-bold text-base">Atalhos do Sistema</h2>

          <div className="space-y-2.5">
            <Link
              href="/dashboard/dietas"
              className={`flex items-center gap-3 p-3 rounded-xl border transition text-xs font-semibold ${
                isLight ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-950 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>🥗</span>
              <div>
                <div className="text-emerald-500">Montador de Dietas</div>
                <div className="text-[10px] text-slate-400 font-normal">Modelos clínicos e banco TACO</div>
              </div>
            </Link>

            <Link
              href="/dashboard/pacientes"
              className={`flex items-center gap-3 p-3 rounded-xl border transition text-xs font-semibold ${
                isLight ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-950 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>👥</span>
              <div>
                <div>Ficha de Pacientes</div>
                <div className="text-[10px] text-slate-400 font-normal">Cadastre pacientes e agende consultas</div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {modalAgendar && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 space-y-4 ${bgCard}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base">Agendar Consulta</h3>
              <button onClick={() => setModalAgendar(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleNovoAgendamento} className="space-y-3">
              <div>
                <label className={`block text-xs mb-1 ${textLabel}`}>Nome do Paciente</label>
                <input
                  type="text"
                  placeholder="Ex: Nome da paciente"
                  value={pacienteSelecionado}
                  onChange={(e) => setPacienteSelecionado(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                  required
                />
              </div>

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
                <label className={`block text-xs mb-1 ${textLabel}`}>Tipo de Atendimento</label>
                <input
                  type="text"
                  value={tipoConsulta}
                  onChange={(e) => setTipoConsulta(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                  placeholder="Ex: Primeira Consulta, Retorno, Online"
                  required
                />
              </div>

              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chkWhatsappDash"
                  checked={enviarWhats}
                  onChange={(e) => setEnviarWhats(e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
                <label htmlFor="chkWhatsappDash" className={`text-xs cursor-pointer ${textLabel}`}>
                  Enviar confirmação para o WhatsApp do paciente
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalAgendar(false)}
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