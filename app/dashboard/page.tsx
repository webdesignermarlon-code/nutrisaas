'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [isLight, setIsLight] = useState(false)
  const [modalAgendar, setModalAgendar] = useState(false)
  const [pacienteSelecionado, setPacienteSelecionado] = useState('Maria Silva')
  const [dataConsulta, setDataConsulta] = useState('')
  const [horaConsulta, setHoraConsulta] = useState('')
  const [tipoConsulta, setTipoConsulta] = useState('Retorno')
  const [enviarWhats, setEnviarWhats] = useState(true)

  const listaPacientesExemplo: Record<string, string> = {
    'Maria Silva': '21998887766',
    'João Pedro Santos': '21987654321',
    'Ana Paula Souza': '21999998888',
    'Carlos Eduardo Santos': '21977776666'
  }

  const [proximasConsultas, setProximasConsultas] = useState([
    { nome: 'Ana Paula Souza', horario: '09:00', tipo: 'Retorno - Emagrecimento', status: 'Confirmado' },
    { nome: 'Carlos Eduardo Santos', horario: '10:30', tipo: 'Primeira Consulta - Hipertrofia', status: 'Confirmado' },
    { nome: 'Mariana Lima', horario: '14:00', tipo: 'Acompanhamento GLP-1', status: 'Pendente' },
    { nome: 'Roberto Alves', horario: '16:00', tipo: 'Reavaliação Bariátrica', status: 'Confirmado' },
  ])

  useEffect(() => {
    const theme = localStorage.getItem('nutrisaas-theme')
    setIsLight(theme === 'light')
  }, [])

  const handleNovoAgendamento = (e: React.FormEvent) => {
    e.preventDefault()
    if (!horaConsulta || !dataConsulta) return

    setProximasConsultas([
      { nome: pacienteSelecionado, horario: horaConsulta, tipo: tipoConsulta, status: 'Confirmado' },
      ...proximasConsultas,
    ])

    const partesData = dataConsulta.split('-')
    const dataFormatada = partesData.length === 3 ? `${partesData[2]}/${partesData[1]}/${partesData[0]}` : dataConsulta

    const tel = listaPacientesExemplo[pacienteSelecionado]
    if (enviarWhats && tel) {
      const mensagem = `🗓️ *AGENDAMENTO DE CONSULTA NUTRICIONAL*\n\nOlá, *${pacienteSelecionado}*!\nSua consulta foi agendada com sucesso.\n\n📅 *Data:* ${dataFormatada}\n⏰ *Horário:* ${horaConsulta}\n📌 *Tipo:* ${tipoConsulta}\n\nQualquer dúvida, estou à disposição!`
      const url = `https://api.whatsapp.com/send?phone=55${tel}&text=${encodeURIComponent(mensagem)}`
      window.open(url, '_blank')
    } else {
      alert(`Consulta agendada no sistema para ${pacienteSelecionado} às ${horaConsulta}!`)
    }

    setModalAgendar(false)
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
            Acompanhe atendimentos e agende consultas com envio opcional para o WhatsApp.
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
        <div className={`p-5 rounded-2xl border ${bgCard}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400">Pacientes Ativos</span>
            <span className="text-xl">👥</span>
          </div>
          <div className="text-2xl font-bold text-emerald-500">42</div>
          <span className="text-[10px] text-slate-400 block mt-1">+12% este mês</span>
        </div>
        <div className={`p-5 rounded-2xl border ${bgCard}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400">Dietas Prescritas</span>
            <span className="text-xl">🥗</span>
          </div>
          <div className="text-2xl font-bold text-sky-500">128</div>
          <span className="text-[10px] text-slate-400 block mt-1">+8 esta semana</span>
        </div>
        <div className={`p-5 rounded-2xl border ${bgCard}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400">Consultas no Mês</span>
            <span className="text-xl">📅</span>
          </div>
          <div className="text-2xl font-bold text-purple-500">36</div>
          <span className="text-[10px] text-slate-400 block mt-1">95% de assiduidade</span>
        </div>
        <div className={`p-5 rounded-2xl border ${bgCard}`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-semibold text-slate-400">Taxa de Retorno</span>
            <span className="text-xl">📈</span>
          </div>
          <div className="text-2xl font-bold text-amber-500">88%</div>
          <span className="text-[10px] text-slate-400 block mt-1">+5% satisfação</span>
        </div>
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
            {proximasConsultas.map((c, i) => (
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
            ))}
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
                <div className="text-[10px] text-slate-400 font-normal">Agendamento e mensagens no WhatsApp</div>
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
                <label className={`block text-xs mb-1 ${textLabel}`}>Paciente</label>
                <select
                  value={pacienteSelecionado}
                  onChange={(e) => setPacienteSelecionado(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                >
                  <option value="Maria Silva">Maria Silva</option>
                  <option value="João Pedro Santos">João Pedro Santos</option>
                  <option value="Ana Paula Souza">Ana Paula Souza</option>
                  <option value="Carlos Eduardo Santos">Carlos Eduardo Santos</option>
                </select>
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
                  placeholder="Ex: Retorno, Presencial, Online"
                  required
                />
              </div>

              {/* Opção de Enviar ou Não por WhatsApp */}
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chkWhatsappDash"
                  checked={enviarWhats}
                  onChange={(e) => setEnviarWhats(e.target.checked)}
                  className="w-4 h-4 rounded accent-emerald-500 cursor-pointer"
                />
                <label htmlFor="chkWhatsappDash" className={`text-xs cursor-pointer ${textLabel}`}>
                  Enviar confirmação diretamente para o WhatsApp do paciente
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