'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('nutrisaas-theme')
    setIsLight(theme === 'light')
  }, [])

  const estatisticas = [
    { titulo: 'Pacientes Ativos', valor: '42', icone: '👥', tendencia: '+12% este mês', cor: 'text-emerald-500' },
    { titulo: 'Dietas Prescritas', valor: '128', icone: '🥗', tendencia: '+8 esta semana', cor: 'text-sky-500' },
    { titulo: 'Consultas no Mês', valor: '36', icone: '📅', tendencia: '95% de assiduidade', cor: 'text-purple-500' },
    { titulo: 'Taxa de Retorno', valor: '88%', icone: '📈', tendencia: '+5% satisfação', cor: 'text-amber-500' },
  ]

  const proximasConsultas = [
    { nome: 'Ana Paula Souza', horario: '09:00', tipo: 'Retorno - Emagrecimento', status: 'Confirmado' },
    { nome: 'Carlos Eduardo Santos', horario: '10:30', tipo: 'Primeira Consulta - Hipertrofia', status: 'Confirmado' },
    { nome: 'Mariana Lima', horario: '14:00', tipo: 'Acompanhamento GLP-1', status: 'Pendente' },
    { nome: 'Roberto Alves', horario: '16:00', tipo: 'Reavaliação Bariátrica', status: 'Confirmado' },
  ]

  return (
    <div className="space-y-6">
      {/* Topo do Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-500">Painel Principal de Gestão</h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Bem-vindo de volta! Acompanhe o desempenho do seu consultório em tempo real.
          </p>
        </div>

        <Link
          href="/dashboard/dietas"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10"
        >
          + Criar Novo Plano Alimentar
        </Link>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {estatisticas.map((item, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border transition ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span className={`text-xs font-semibold ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {item.titulo}
              </span>
              <span className="text-xl">{item.icone}</span>
            </div>
            <div className={`text-2xl font-bold ${item.cor}`}>{item.valor}</div>
            <span className="text-[10px] text-slate-400 block mt-1">{item.tendencia}</span>
          </div>
        ))}
      </div>

      {/* Grid Principal: Consultas e Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Próximas Consultas do Dia */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border space-y-4 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-base">Agenda de Hoje</h2>
            <Link href="/dashboard/pacientes" className="text-xs text-emerald-500 hover:underline font-semibold">
              Ver todos os pacientes →
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
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                    c.status === 'Confirmado' 
                      ? 'bg-emerald-500/10 text-emerald-500' 
                      : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Atalhos de Acesso Rápido */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          isLight ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        }`}>
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
              href="/dashboard/calculadoras"
              className={`flex items-center gap-3 p-3 rounded-xl border transition text-xs font-semibold ${
                isLight ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-950 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>🧮</span>
              <div>
                <div>Calculadoras Nutricionais</div>
                <div className="text-[10px] text-slate-400 font-normal">GET, TDEE e gasto energético</div>
              </div>
            </Link>

            <Link
              href="/dashboard/anamnese"
              className={`flex items-center gap-3 p-3 rounded-xl border transition text-xs font-semibold ${
                isLight ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-950 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>📄</span>
              <div>
                <div>Ficha de Anamnese</div>
                <div className="text-[10px] text-slate-400 font-normal">Histórico clínico e antropometria</div>
              </div>
            </Link>

            <Link
              href="/dashboard/gestao"
              className={`flex items-center gap-3 p-3 rounded-xl border transition text-xs font-semibold ${
                isLight ? 'bg-slate-50 border-slate-200 hover:bg-slate-100' : 'bg-slate-950 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>📋</span>
              <div>
                <div>Kit Gestão & Exames</div>
                <div className="text-[10px] text-slate-400 font-normal">Pedidos de exames e atestados</div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}