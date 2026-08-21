'use client';

import React, { useState } from 'react';

interface Paciente {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  objetivo: string;
  status: 'Ativo' | 'Inativo';
}

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([
    { id: 1, nome: 'Ana Silva', email: 'ana.silva@email.com', telefone: '(22) 99988-7766', objetivo: 'Emagrecimento', status: 'Ativo' },
    { id: 2, nome: 'Lucas Mendes', email: 'lucas.mendes@email.com', telefone: '(22) 98877-6655', objetivo: 'Ganho de Massa', status: 'Ativo' },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');
  const [novoObjetivo, setNovoObjetivo] = useState('Emagrecimento');

  const handleSalvarPaciente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome) return;

    const novo = {
      id: Date.now(),
      nome: novoNome,
      email: novoEmail,
      telefone: novoTelefone,
      objetivo: novoObjetivo,
      status: 'Ativo' as const,
    };

    setPacientes([...pacientes, novo]);
    setNovoNome('');
    setNovoEmail('');
    setNovoTelefone('');
    setModalAberto(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold">Gestão de Pacientes</h1>
          <p className="text-gray-400 text-sm">Gerencie os cadastros e prontuários da sua clínica.</p>
        </div>
        <button
          onClick={() => setModalAberto(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          + Cadastrar Paciente
        </button>
      </div>

      {/* Tabela de Pacientes */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-800 bg-gray-800/40 text-gray-400 text-xs uppercase font-semibold">
              <th className="p-4">Nome</th>
              <th className="p-4">Contato</th>
              <th className="p-4">Objetivo</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {pacientes.map((p) => (
              <tr key={p.id} className="hover:bg-gray-800/30 transition">
                <td className="p-4 font-medium">{p.nome}</td>
                <td className="p-4 text-gray-400">
                  <div>{p.email}</div>
                  <div className="text-xs text-gray-500">{p.telefone}</div>
                </td>
                <td className="p-4">{p.objetivo}</td>
                <td className="p-4">
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">
                    {p.status}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-emerald-400 hover:underline text-xs font-semibold">
                    Ver Prontuário
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Cadastro */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Novo Paciente</h2>
            <form onSubmit={handleSalvarPaciente} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Nome Completo</label>
                <input
                  type="text"
                  required
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">E-mail</label>
                <input
                  type="email"
                  required
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Telefone / WhatsApp</label>
                <input
                  type="text"
                  required
                  value={novoTelefone}
                  onChange={(e) => setNovoTelefone(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Objetivo Principal</label>
                <select
                  value={novoObjetivo}
                  onChange={(e) => setNovoObjetivo(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
                >
                  <option value="Emagrecimento">Emagrecimento</option>
                  <option value="Ganho de Massa">Ganho de Massa Muscle</option>
                  <option value="Reeducação Alimentar">Reeducação Alimentar</option>
                  <option value="Performance Esportiva">Performance Esportiva</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                >
                  Salvar Paciente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}