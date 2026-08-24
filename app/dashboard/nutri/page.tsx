'use client';

import React, { useState } from 'react';

interface Consulta {
  id: string;
  horario: string;
  paciente: string;
  tipo: 'Primeira Consulta' | 'Retorno / Acompanhamento' | 'Avaliação Física';
  status: 'Confirmado' | 'Pendente' | 'Concluído';
  telefone: string;
}

const CONSULTAS_HOJE_INICIAIS: Consulta[] = [
  {
    id: 'c1',
    horario: '08:30',
    paciente: 'Ana Silva',
    tipo: 'Retorno / Acompanhamento',
    status: 'Confirmado',
    telefone: '22999887766',
  },
  {
    id: 'c2',
    horario: '10:00',
    paciente: 'Lucas Mendes',
    tipo: 'Primeira Consulta',
    status: 'Confirmado',
    telefone: '22988776655',
  },
  {
    id: 'c3',
    horario: '14:00',
    paciente: 'Carla Souza',
    tipo: 'Avaliação Física',
    status: 'Pendente',
    telefone: '22997773333',
  },
  {
    id: 'c4',
    horario: '16:00',
    paciente: 'Roberto Alves',
    tipo: 'Retorno / Acompanhamento',
    status: 'Confirmado',
    telefone: '21981112233',
  },
];

export default function NutriDashboardPage() {
  const [consultas, setConsultas] = useState<Consulta[]>(CONSULTAS_HOJE_INICIAIS);
  const [modalNovoAgendamento, setModalNovoAgendamento] = useState(false);
  const [mostrarConfigFinanceira, setMostrarConfigFinanceira] = useState(false);

  // Configurações Financeiras da Nutricionista
  const [valorConsulta, setValorConsulta] = useState<number>(300);
  const [metaFaturamento, setMetaFaturamento] = useState<number>(10000);

  // Form de Novo Agendamento
  const [novoPaciente, setNovoPaciente] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');
  const [novoHorario, setNovoHorario] = useState('09:00');
  const [novoTipo, setNovoTipo] = useState<'Primeira Consulta' | 'Retorno / Acompanhamento' | 'Avaliação Física'>('Primeira Consulta');

  // Cálculo Dinâmico de Faturamento
  const totalConsultasMes = 32;
  const faturamentoAtual = totalConsultasMes * valorConsulta;

  const alternarStatusConsulta = (id: string, novoStatus: 'Confirmado' | 'Pendente' | 'Concluído') => {
    setConsultas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: novoStatus } : c))
    );
  };

  // Enviar Mensagem de Lembrete / Confirmação via WhatsApp
  const enviarConfirmacaoWhatsApp = (consulta: Consulta) => {
    const telefoneLimpo = consulta.telefone.replace(/\D/g, '');
    const dataHoje = new Date().toLocaleDateString('pt-BR');

    let texto = `Olá *${consulta.paciente}*, tudo bem?\n\n`;
    texto += `Passando para lembrar da sua consulta nutricional agendada para *hoje (${dataHoje}) às ${consulta.horario}* com a Dra. Luana Santos.\n\n`;
    texto += `Por favor, responda essa mensagem com *SIM* para confirmar ou *NÃO* caso precise remarcar.`;

    const url = `https://api.whatsapp.com/send?phone=55${telefoneLimpo}&text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  const handleSalvarAgendamento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoPaciente.trim()) return;

    const nova: Consulta = {
      id: `c_${Date.now()}`,
      horario: novoHorario,
      paciente: novoPaciente,
      tipo: novoTipo,
      status: 'Pendente',
      telefone: novoTelefone || '22999990000',
    };

    setConsultas([...consultas, nova].sort((a, b) => a.horario.localeCompare(b.horario)));
    setModalNovoAgendamento(false);
    setNovoPaciente('');
    setNovoTelefone('');
  };

  return (
    <div className="min-h-screen p-6 md:p-8 transition-colors duration-200 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-gray-800 pb-4 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span>👋</span> Bem-vinda de volta, Dra. Luana!
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Resumo do seu consultório para hoje, {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setMostrarConfigFinanceira(!mostrarConfigFinanceira)}
            className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
          >
            <span>⚙️</span> Configurar Valor da Consulta
          </button>

          <button
            onClick={() => setModalNovoAgendamento(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 shadow-md"
          >
            <span>📅+</span> Agendar Consulta
          </button>
        </div>
      </div>

      {/* PAINEL REFLÁTIL: CONFIGURAÇÃO DE VALOR POR CONSULTA */}
      {mostrarConfigFinanceira && (
        <div className="mb-8 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-800 pb-2">
            💰 Configuração de Preço e Meta Financeira
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-semibold mb-1">
                Valor Cobrado por Consulta (R$)
              </label>
              <input
                type="number"
                value={valorConsulta}
                onChange={(e) => setValorConsulta(Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2.5 font-bold text-emerald-600 dark:text-emerald-400"
              />
            </div>

            <div>
              <label className="block text-gray-600 dark:text-gray-400 font-semibold mb-1">
                Meta de Faturamento Mensal (R$)
              </label>
              <input
                type="number"
                value={metaFaturamento}
                onChange={(e) => setMetaFaturamento(Number(e.target.value))}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2.5 font-bold text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Cards de Métricas (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pacientes do Mês</span>
            <span className="text-xl">👥</span>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-2xl font-bold">48</span>
              <span className="text-xs text-gray-400 block">total cadastrados</span>
            </div>
            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-md border border-emerald-500/20">
              +8 este mês
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Consultas Hoje</span>
            <span className="text-xl">📅</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{consultas.length}</span>
            <span className="text-xs text-gray-400">agendadas</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Dietas Pendentes</span>
            <span className="text-xl">🥗</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-500">2</span>
            <span className="text-xs text-gray-400">aguardando envio</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-sm space-y-2">
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Faturamento Mês</span>
            <span className="text-xl">💰</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              R$ {faturamentoAtual.toLocaleString('pt-BR')}
            </span>
            <span className="text-[10px] text-gray-400">
              meta R$ {metaFaturamento.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span>⏰</span> Agenda de Hoje
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
              {consultas.filter((c) => c.status === 'Concluído').length} de {consultas.length} finalizadas
            </span>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm divide-y divide-gray-100 dark:divide-gray-800 overflow-hidden">
            {consultas.map((item) => (
              <div
                key={item.id}
                className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    {item.horario}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                      {item.paciente}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.tipo} • {item.telefone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'Confirmado'
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                        : item.status === 'Concluído'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    }`}
                  >
                    {item.status}
                  </span>

                  {/* Botão de Enviar Lembrete / Confirmação no WhatsApp */}
                  <button
                    onClick={() => enviarConfirmacaoWhatsApp(item)}
                    title="Enviar mensagem de confirmação no WhatsApp"
                    className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition flex items-center gap-1"
                  >
                    <span>📱</span> Confirmar
                  </button>

                  {item.status !== 'Concluído' && (
                    <button
                      onClick={() => alternarStatusConsulta(item.id, 'Concluído')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition"
                    >
                      ✓ Atender
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lembretes e Ações */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
              <span>🔔</span> Alertas & Retornos
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-lg space-y-1">
                <span className="font-bold text-amber-700 dark:text-amber-400 block">
                  🎂 Aniversariante do Dia
                </span>
                <p className="text-gray-600 dark:text-gray-300">
                  A paciente <strong>Ana Silva</strong> faz aniversário hoje!
                </p>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg space-y-1">
                <span className="font-bold text-blue-700 dark:text-blue-400 block">
                  🔄 Retorno Pendente (+30 dias)
                </span>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Lucas Mendes</strong> não agenda consulta há 35 dias.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm border-b border-gray-200 dark:border-gray-800 pb-2">
              ⚡ Ações Rápidas
            </h3>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <a
                href="/dashboard/nutri/dietas"
                className="p-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-emerald-500/10 border border-gray-200 dark:border-gray-700 rounded-lg font-bold text-gray-800 dark:text-gray-200 transition flex items-center gap-2"
              >
                <span>🥗</span> Montar Nova Dieta (TACO)
              </a>

              <a
                href="/dashboard/nutri/gestao"
                className="p-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-emerald-500/10 border border-gray-200 dark:border-gray-700 rounded-lg font-bold text-gray-800 dark:text-gray-200 transition flex items-center gap-2"
              >
                <span>📋</span> Emitir Solicitação de Exames
              </a>

              <a
                href="/dashboard/nutri/pacientes"
                className="p-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-emerald-500/10 border border-gray-200 dark:border-gray-700 rounded-lg font-bold text-gray-800 dark:text-gray-200 transition flex items-center gap-2"
              >
                <span>👤</span> Ver Lista de Pacientes
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* POP-UP: AGENDAMENTO */}
      {modalNovoAgendamento && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-base text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <span>📅</span> Agendar Nova Consulta
              </h3>
              <button
                onClick={() => setModalNovoAgendamento(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvarAgendamento} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Nome do Paciente
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ana Silva"
                  value={novoPaciente}
                  onChange={(e) => setNovoPaciente(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="Ex: 22999998888"
                  value={novoTelefone}
                  onChange={(e) => setNovoTelefone(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Horário
                </label>
                <input
                  type="time"
                  required
                  value={novoHorario}
                  onChange={(e) => setNovoHorario(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Tipo de Atendimento
                </label>
                <select
                  value={novoTipo}
                  onChange={(e) => setNovoTipo(e.target.value as any)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none"
                >
                  <option value="Primeira Consulta">Primeira Consulta</option>
                  <option value="Retorno / Acompanhamento">Retorno / Acompanhamento</option>
                  <option value="Avaliação Física">Avaliação Física</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalNovoAgendamento(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}