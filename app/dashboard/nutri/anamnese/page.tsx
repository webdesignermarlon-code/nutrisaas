'use client';

import React, { useState } from 'react';

export default function AnamnesePage() {
  const [paciente, setPaciente] = useState('Ana Silva');
  const [tipoBristol, setTipoBristol] = useState<number>(3);

  const [sintomas, setSintomas] = useState({
    quedaCabelo: false,
    unhasFracas: false,
    cansacoExcessivo: false,
    compulsaoDoces: false,
    insonia: false,
    maDigestao: false,
    enxaqueca: false,
    retencaoLiquido: false,
  });

  const [intolerancias, setIntolerancias] = useState({
    lactose: false,
    gluten: false,
    corantes: false,
    frutosDoMar: false,
  });

  const [observacoesClinicas, setObservacoesClinicas] = useState(
    'Paciente relata maior vontade de doces no período pré-menstrual e episódios eventuais de distensão abdominal pós-almoço.'
  );

  const toggleSintoma = (chave: keyof typeof sintomas) => {
    setSintomas((prev) => ({ ...prev, [chave]: !prev[chave] }));
  };

  const toggleIntolerancia = (chave: keyof typeof intolerancias) => {
    setIntolerancias((prev) => ({ ...prev, [chave]: !prev[chave] }));
  };

  const bristolDescricoes: { [key: number]: { titulo: string; desc: string; alerta: string; cor: string } } = {
    1: { titulo: 'Tipo 1: Caroços duros separados', desc: 'Passagem difícil. Indicativo de constipação severa e baixa ingestão hídrica/fibras.', alerta: '⚠️ Constipação Severa', cor: 'border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400' },
    2: { titulo: 'Tipo 2: Salsicha com caroços', desc: 'Ligeiramente constipado. Necessita de maior aporte de água e fibras solúveis.', alerta: '⚠️ Constipação Leve', cor: 'border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    3: { titulo: 'Tipo 3: Salsicha com fendas na superfície', desc: 'Formato normal e aceitável.', alerta: '✅ Normal', cor: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    4: { titulo: 'Tipo 4: Salsicha suave e macia', desc: 'Formato ideal. Indica boa digestão e ecossistema intestinal equilibrado.', alerta: '⭐ Ideal / Saudável', cor: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
    5: { titulo: 'Tipo 5: Pedaços moles com bordas nítidas', desc: 'Passagem fácil, mas com tendência a trânsito rápido.', alerta: '⚠️ Trânsito Rápido', cor: 'border-amber-500/50 bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    6: { titulo: 'Tipo 6: Pedaços esfarrapados e pastosos', desc: 'Indicativo de inflamação intestinal, disbiose ou sensibilidade alimentar.', alerta: '⚠️ Diarreia Leve', cor: 'border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400' },
    7: { titulo: 'Tipo 7: Totalmente líquido', desc: 'Diarreia severa. Risco de desidratação e má absorção de nutrientes.', alerta: '🚨 Diarreia Severa', cor: 'border-rose-500/50 bg-rose-500/10 text-rose-600 dark:text-rose-400' },
  };

  return (
    <div className="min-h-screen p-6 md:p-8 transition-colors duration-200 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-gray-800 pb-4 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span>📋</span> Anamnese & Rastreamento Metabólico
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Questionário guiado de sinais, sintomas e ecossistema intestinal para suporte na consulta da Dra. Luana Santos.
          </p>
        </div>

        <select
          value={paciente}
          onChange={(e) => setPaciente(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white"
        >
          <option value="Ana Silva">Paciente: Ana Silva</option>
          <option value="Lucas Mendes">Paciente: Lucas Mendes</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna 1: Rastreamento de Sinais & Sintomas */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl space-y-6 shadow-sm">
          <h2 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 border-b border-gray-200 dark:border-gray-800 pb-2">
            1. Sinais & Sintomas Frequentes
          </h2>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Marque os sintomas relatados para direcionar a conduta e a suplementação:
          </p>

          <div className="space-y-2.5">
            {[
              { chave: 'quedaCabelo', rotulo: '💇‍♀️ Queda de Cabelo / Unhas Quebradiças' },
              { chave: 'cansacoExcessivo', rotulo: '🔋 Cansaço / Fadiga ao Acordar' },
              { chave: 'compulsaoDoces', rotulo: '🍫 Compulsão por Doces / Carboidratos' },
              { chave: 'insonia', rotulo: '🌙 Dificuldade para Dormir / Sono Picado' },
              { chave: 'maDigestao', rotulo: '🤢 Estufamento / Má Digestão' },
              { chave: 'enxaqueca', rotulo: '🤯 Dores de Cabeça / Enxaqueca' },
              { chave: 'retencaoLiquido', rotulo: '💧 Retenção de Líquidos / Inchaço' },
            ].map((item) => (
              <label
                key={item.chave}
                className={`flex items-center justify-between p-3 rounded-lg border text-xs font-medium cursor-pointer transition ${
                  sintomas[item.chave as keyof typeof sintomas]
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400'
                    : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>{item.rotulo}</span>
                <input
                  type="checkbox"
                  checked={sintomas[item.chave as keyof typeof sintomas]}
                  onChange={() => toggleSintoma(item.chave as keyof typeof sintomas)}
                  className="accent-emerald-500 w-4 h-4 rounded"
                />
              </label>
            ))}
          </div>

          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 pt-2 border-t border-gray-200 dark:border-gray-800">
            Intolerâncias & Sensibilidades
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {[
              { chave: 'lactose', rotulo: '🥛 Lactose' },
              { chave: 'gluten', rotulo: '🌾 Glúten' },
              { chave: 'corantes', rotulo: '🎨 Corantes' },
              { chave: 'frutosDoMar', rotulo: '🦐 Frutos do Mar' },
            ].map((item) => (
              <label
                key={item.chave}
                className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                  intolerancias[item.chave as keyof typeof intolerancias]
                    ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-400'
                    : 'bg-gray-50 dark:bg-gray-800/40 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>{item.rotulo}</span>
                <input
                  type="checkbox"
                  checked={intolerancias[item.chave as keyof typeof intolerancias]}
                  onChange={() => toggleIntolerancia(item.chave as keyof typeof intolerancias)}
                  className="accent-rose-500 w-3.5 h-3.5 rounded"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Coluna 2 e 3: Escala de Bristol & Resumo Clínico */}
        <div className="lg:col-span-2 space-y-6">
          {/* Módulo Escala de Bristol */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center justify-between">
              <span>💩 Escala de Bristol (Saúde Intestinal)</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-normal">Avaliador Rápido</span>
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
              Selecione o formato habitual informado pelo paciente para análise da digestão e ecossistema intestinal:
            </p>

            {/* Botões Tipos de 1 a 7 */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setTipoBristol(num)}
                  className={`py-3 rounded-lg font-bold text-sm border transition flex flex-col items-center gap-1 ${
                    tipoBristol === num
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg scale-105'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="text-xs">Tipo</span>
                  <span className="text-base">{num}</span>
                </button>
              ))}
            </div>

            {/* Card Explicativo */}
            <div className={`p-5 rounded-xl border ${bristolDescricoes[tipoBristol].cor}`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-sm">{bristolDescricoes[tipoBristol].titulo}</h3>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded border border-current">
                  {bristolDescricoes[tipoBristol].alerta}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {bristolDescricoes[tipoBristol].desc}
              </p>
            </div>
          </div>

          {/* Anotações Gerais da Anamnese */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
              📝 Parecer e Observações da Dra. Luana Santos
            </h2>
            <textarea
              rows={5}
              value={observacoesClinicas}
              onChange={(e) => setObservacoesClinicas(e.target.value)}
              placeholder="Anotações adicionais da consulta..."
              className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={() => alert('Anamnese salva com sucesso no prontuário do paciente!')}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-lg text-xs font-semibold transition shadow-md"
              >
                Salvar no Prontuário de {paciente}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}