import React from 'react';

export default function NutriDashboard() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Cabeçalho */}
      <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold">Painel do Nutricionista</h1>
          <p className="text-gray-400 text-sm">Bem-vindo(a) de volta! Aqui está o resumo do seu dia.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition">
          + Novo Paciente
        </button>
      </header>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-xs uppercase font-semibold">Atendimentos Hoje</p>
          <p className="text-3xl font-bold mt-2">6</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-xs uppercase font-semibold">Total de Pacientes</p>
          <p className="text-3xl font-bold mt-2">48</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-xs uppercase font-semibold">Dietas Pendentes</p>
          <p className="text-3xl font-bold mt-2 text-amber-500">3</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl">
          <p className="text-gray-400 text-xs uppercase font-semibold">Faturamento Mês</p>
          <p className="text-3xl font-bold mt-2 text-emerald-400">R$ 7.200</p>
        </div>
      </div>

      {/* Próximas Consultas e Feed de Refeições */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Próximas Consultas */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Agenda de Hoje</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div>
                <p className="font-medium">Ana Silva</p>
                <p className="text-xs text-gray-400">Retorno - Presencial</p>
              </div>
              <span className="text-sm font-semibold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                14:00
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div>
                <p className="font-medium">Lucas Mendes</p>
                <p className="text-xs text-gray-400">Primeira Consulta - Online</p>
              </div>
              <span className="text-sm font-semibold bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                15:30
              </span>
            </div>
          </div>
        </div>

        {/* Feed de Diário Alimentar Enviado pelos Pacientes */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">Feed do Diário</h2>
          <div className="space-y-4">
            <div className="p-3 bg-gray-800/50 rounded-lg text-sm border-l-2 border-emerald-500">
              <p className="font-semibold text-emerald-400">Camila Rocha</p>
              <p className="text-xs text-gray-300 mt-1">Enviou foto do Almoço (12:45)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}