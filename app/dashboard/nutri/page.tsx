'use client'

import { useState } from 'react'

export default function NutriDashboard() {
  const [loading] = useState(false)
  const [userName] = useState('Nutricionista')
  const [patients] = useState<any[]>([])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-lg">Carregando dados do seu consultório...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white">
      {/* Cabeçalho */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">👋 Bem-vindo(a), {userName}!</h1>
          <p className="text-sm text-slate-400">Resumo do seu consultório</p>
        </div>
        <button className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500">
          + Agendar Consulta
        </button>
      </div>

      {/* Cards de Métricas Zerados */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-xs text-slate-400">PACIENTES CADASTRADOS</p>
          <h2 className="mt-2 text-3xl font-bold">{patients.length}</h2>
          <span className="text-xs text-slate-500">Total no sistema</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-xs text-slate-400">CONSULTAS HOJE</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
          <span className="text-xs text-slate-500">Nenhum agendamento</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-xs text-slate-400">DIETAS PENDENTES</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
          <span className="text-xs text-slate-500">Tudo em dia</span>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-xs text-slate-400">FATURAMENTO MÊS</p>
          <h2 className="mt-2 text-3xl font-bold">R$ 0,00</h2>
          <span className="text-xs text-slate-500">Sem registros</span>
        </div>
      </div>

      {/* Agenda Vazia */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h3 className="mb-4 text-lg font-semibold">Agenda de Hoje</h3>
        {patients.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <p className="text-base">Nenhum paciente ou consulta cadastrada ainda.</p>
            <p className="text-xs mt-1">Cadastre o seu primeiro paciente para começar a gerenciar os atendimentos.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {patients.map((patient: any) => (
              <div key={patient.id} className="flex items-center justify-between rounded-lg bg-slate-800/50 p-4">
                <div>
                  <p className="font-medium text-white">{patient.name}</p>
                  <p className="text-xs text-slate-400">{patient.phone || 'Sem telefone'}</p>
                </div>
                <span className="rounded bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                  Cadastrado
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}