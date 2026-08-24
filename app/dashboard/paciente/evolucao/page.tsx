'use client';

import React, { useState } from 'react';

interface Paciente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  objetivo: string;
  status: 'Ativo' | 'Inativo';
  ultimaConsulta: string;
}

const PACIENTES_INICIAIS: Paciente[] = [
  {
    id: '1',
    nome: 'Ana Silva',
    email: 'ana.silva@email.com',
    telefone: '(22) 99988-7766',
    objetivo: 'Emagrecimento',
    status: 'Ativo',
    ultimaConsulta: '2026-03-10',
  },
  {
    id: '2',
    nome: 'Lucas Mendes',
    email: 'lucas.mendes@email.com',
    telefone: '(22) 98877-6655',
    objetivo: 'Ganho de Massa',
    status: 'Ativo',
    ultimaConsulta: '2026-03-12',
  },
  {
    id: '3',
    nome: 'Carla Souza',
    email: 'carla.souza@email.com',
    telefone: '(22) 99777-3333',
    objetivo: 'Reeducação Alimentar',
    status: 'Inativo',
    ultimaConsulta: '2026-01-15',
  },
];

export default function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>(PACIENTES_INICIAIS);
  const [termoBusca, setTermoBusca] = useState('');
  const [modalNovoPaciente, setModalNovoPaciente] = useState(false);

  // Form de Novo Paciente
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [objetivo, setObjetivo] = useState('Emagrecimento');

  const handleSalvarPaciente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;

    const novo: Paciente = {
      id: `pac_${Date.now()}`,
      nome,
      email,
      telefone,
      objetivo,
      status: 'Ativo',
      ultimaConsulta: new Date().toISOString().split('T')[0],
    };

    setPacientes([novo, ...pacientes]);
    setModalNovoPaciente(false);
    setNome('');
    setEmail('');
    setTelefone('');
  };

  const removerPaciente = (id: string) => {
    setPacientes((prev) => prev.filter((p) => p.id !== id));
  };

  const pacientesFiltrados = pacientes.filter(
    (p) =>
      p.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      p.email.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 md:p-8 transition-colors duration-200 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-gray-800 pb-4 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span>👥</span> Gestão de Pacientes
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Gerencie os cadastros e prontuários da sua clínica.
          </p>
        </div>

        <button
          onClick={() => setModalNovoPaciente(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-md"
        >
          <span>+ Cadastrar Paciente</span>
        </button>
      </div>

      {/* Barra de Busca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar paciente por nome ou e-mail..."
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white shadow-2xs"
        />
      </div>

      {/* Tabela de Pacientes */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 font-semibold uppercase">
              <tr>
                <th className="p-4">NOME</th>
                <th className="p-4">CONTATO</th>
                <th className="p-4">OBJETIVO</th>
                <th className="p-4">STATUS</th>
                <th className="p-4 text-right">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {pacientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400 italic">
                    Nenhum paciente encontrado.
                  </td>
                </tr>
              ) : (
                pacientesFiltrados.map((paciente) => (
                  <tr
                    key={paciente.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
                  >
                    <td className="p-4 font-bold text-gray-800 dark:text-gray-200">
                      {paciente.nome}
                    </td>
                    <td className="p-4 text-gray-600 dark:text-gray-400">
                      <div>{paciente.email}</div>
                      <div className="text-[10px] text-gray-400">{paciente.telefone}</div>
                    </td>
                    <td className="p-4 text-gray-700 dark:text-gray-300">
                      {paciente.objetivo}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          paciente.status === 'Ativo'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            : 'bg-gray-500/10 text-gray-500 border border-gray-500/20'
                        }`}
                      >
                        {paciente.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => removerPaciente(paciente.id)}
                        className="text-rose-500 hover:bg-rose-500/10 p-1.5 rounded transition"
                        title="Excluir paciente"
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

      {/* POP-UP: CADASTRAR PACIENTE */}
      {modalNovoPaciente && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-base text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <span>👤</span> Novo Paciente
              </h3>
              <button
                onClick={() => setModalNovoPaciente(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarPaciente} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: João Souza"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  E-mail
                </label>
                <input
                  type="email"
                  placeholder="joao@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="(22) 99999-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Objetivo Principal
                </label>
                <select
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="Emagrecimento">Emagrecimento</option>
                  <option value="Ganho de Massa">Ganho de Massa</option>
                  <option value="Reeducação Alimentar">Reeducação Alimentar</option>
                  <option value="Saúde / Patologia">Saúde / Patologia</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalNovoPaciente(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md"
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