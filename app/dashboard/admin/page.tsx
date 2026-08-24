'use client';

import React, { useState } from 'react';

interface NutricionistaCliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  plano: 'Mensal' | 'Anual' | 'Trial (15 dias)';
  valorMensal: number;
  status: 'Ativo' | 'Inadimplente' | 'Bloqueado' | 'Trial';
  diasRestantesTrial?: number;
  dataCadastro: string;
}

const CLIENTES_INICIAIS: NutricionistaCliente[] = [
  {
    id: 'nutri_1',
    nome: 'Dra. Luana Santos',
    email: 'luana.nutri@gmail.com',
    telefone: '(22) 99999-8888',
    plano: 'Trial (15 dias)',
    valorMensal: 0,
    status: 'Trial',
    diasRestantesTrial: 12,
    dataCadastro: '2026-08-20',
  },
  {
    id: 'nutri_2',
    nome: 'Dra. Juliana Silva',
    email: 'juliana.silva@nutri.com',
    telefone: '(21) 98888-7777',
    plano: 'Anual',
    valorMensal: 87.0,
    status: 'Ativo',
    dataCadastro: '2026-02-01',
  },
  {
    id: 'nutri_3',
    nome: 'Dr. Roberto Costa',
    email: 'roberto.costa@gmail.com',
    telefone: '(31) 97777-6666',
    plano: 'Mensal',
    valorMensal: 97.0,
    status: 'Inadimplente',
    dataCadastro: '2025-11-15',
  },
];

export default function SuperAdminDashboard() {
  const [clientes, setClientes] = useState<NutricionistaCliente[]>(CLIENTES_INICIAIS);
  const [termoBusca, setTermoBusca] = useState('');

  const totalAssinantesAtivos = clientes.filter((c) => c.status === 'Ativo').length;
  const totalEmTrial = clientes.filter((c) => c.status === 'Trial').length;
  const mrr = clientes
    .filter((c) => c.status === 'Ativo')
    .reduce((acc, curr) => acc + curr.valorMensal, 0);

  const alternarStatusAcesso = (id: string, novoStatus: 'Ativo' | 'Bloqueado') => {
    setClientes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: novoStatus } : c))
    );
  };

  const clientesFiltrados = clientes.filter((c) =>
    c.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    c.email.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-8 transition-colors duration-200 bg-gray-900 text-white font-sans">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-4 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-emerald-400">
            <span>👑</span> Painel Geral do Gestor (SuperAdmin)
          </h1>
          <p className="text-gray-400 text-sm">
            Gestão global de assinaturas, contas de teste (15 dias) e controle de acessos.
          </p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-xs font-mono text-emerald-400">
          Modo Administrador Ativo
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Faturamento Recorrente (MRR)
          </span>
          <p className="text-2xl font-bold text-emerald-400">
            R$ {mrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} /mês
          </p>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Assinantes Pagantes
          </span>
          <p className="text-2xl font-bold text-white">{totalAssinantesAtivos}</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Em Teste Grátis (Trial)
          </span>
          <p className="text-2xl font-bold text-emerald-400">{totalEmTrial} nutris</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Total na Base
          </span>
          <p className="text-2xl font-bold text-blue-400">{clientes.length}</p>
        </div>
      </div>

      {/* Tabela de Gestão de Clientes */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-bold">Gestão de Nutricionistas & Testes Grátis</h2>
          <input
            type="text"
            placeholder="Buscar por nome ou e-mail..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 w-full md:w-72"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4">Nutricionista</th>
                <th className="py-3 px-4">Contato</th>
                <th className="py-3 px-4">Plano</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ação de Acesso</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-700/50 transition">
                  <td className="py-3 px-4 font-bold text-white">
                    {cliente.nome}
                    <span className="block text-[10px] text-gray-400 font-normal">
                      Cadastrado em {cliente.dataCadastro}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-300">
                    {cliente.email}
                    <span className="block text-[10px] text-gray-400">{cliente.telefone}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="bg-gray-900 border border-gray-700 px-2 py-1 rounded font-mono">
                      {cliente.plano}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        cliente.status === 'Ativo'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : cliente.status === 'Trial'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : cliente.status === 'Inadimplente'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {cliente.status === 'Trial'
                        ? `Trial (${cliente.diasRestantesTrial}d restantes)`
                        : cliente.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {cliente.status === 'Bloqueado' || cliente.status === 'Inadimplente' ? (
                      <button
                        onClick={() => alternarStatusAcesso(cliente.id, 'Ativo')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        🔓 Reativar Acesso
                      </button>
                    ) : (
                      <button
                        onClick={() => alternarStatusAcesso(cliente.id, 'Bloqueado')}
                        className="bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 font-bold px-3 py-1.5 rounded-lg transition"
                      >
                        🔒 Bloquear
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}