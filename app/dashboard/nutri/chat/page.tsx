'use client';

import React, { useState } from 'react';

interface Mensagem {
  id: number;
  remetente: 'nutri' | 'paciente';
  texto: string;
  horario: string;
  imagemUrl?: string;
}

export default function ChatNutriPage() {
  const [pacienteAtivo, setPacienteAtivo] = useState('Ana Silva');

  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      id: 1,
      remetente: 'paciente',
      texto: 'Dra. Luana, acabei de fazer o almoço! Substituí o frango por tilápia grelhada como combinamos.',
      horario: '12:45',
      imagemUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      remetente: 'nutri',
      texto: 'Ficou excelente, Ana! A quantidade de vegetais está perfeita. Parabéns pela escolha!',
      horario: '12:50',
    },
  ]);

  const [novaMensagem, setNovaMensagem] = useState('');

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaMensagem.trim()) return;

    const msg: Mensagem = {
      id: Date.now(),
      remetente: 'nutri',
      texto: novaMensagem,
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setMensagens([...mensagens, msg]);
    setNovaMensagem('');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 md:p-8 flex flex-col h-screen">
      {/* Cabeçalho */}
      <div className="border-b border-gray-800 pb-4 mb-6">
        <h1 className="text-2xl font-bold">Central de Mensagens & Feed Alimentar</h1>
        <p className="text-gray-400 text-sm">Acompanhamento e suporte direto aos pacientes da Dra. Luana Santos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1 overflow-hidden">
        {/* Lista de Pacientes no Chat */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col justify-start space-y-3">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pacientes Ativos</h2>

          <button
            onClick={() => setPacienteAtivo('Ana Silva')}
            className={`p-3 rounded-lg text-left transition flex items-center justify-between border ${
              pacienteAtivo === 'Ana Silva'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                : 'bg-gray-800/40 border-gray-800 text-gray-300 hover:bg-gray-800'
            }`}
          >
            <div>
              <p className="font-semibold text-sm">Ana Silva</p>
              <p className="text-[10px] text-gray-400">Enviou foto do almoço</p>
            </div>
            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </button>

          <button
            onClick={() => setPacienteAtivo('Lucas Mendes')}
            className={`p-3 rounded-lg text-left transition flex items-center justify-between border ${
              pacienteAtivo === 'Lucas Mendes'
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                : 'bg-gray-800/40 border-gray-800 text-gray-300 hover:bg-gray-800'
            }`}
          >
            <div>
              <p className="font-semibold text-sm">Lucas Mendes</p>
              <p className="text-[10px] text-gray-400">Dúvida sobre pré-treino</p>
            </div>
          </button>
        </div>

        {/* Área da Conversa */}
        <div className="md:col-span-3 bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col justify-between overflow-hidden">
          {/* Topo do Chat */}
          <div className="border-b border-gray-800 pb-3 mb-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg text-gray-200">{pacienteAtivo}</h3>
              <p className="text-xs text-emerald-400 font-medium">● Online agora</p>
            </div>
            <button className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 px-3 py-1.5 rounded-lg transition">
              Ver Prontuário do Paciente
            </button>
          </div>

          {/* Histórico de Mensagens */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4">
            {mensagens.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.remetente === 'nutri' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-4 rounded-xl border ${
                    msg.remetente === 'nutri'
                      ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-100'
                      : 'bg-gray-800/80 border-gray-700/60 text-gray-200'
                  }`}
                >
                  {msg.imagemUrl && (
                    <div className="mb-3 rounded-lg overflow-hidden border border-gray-700">
                      <img src={msg.imagemUrl} alt="Foto da refeição" className="w-full h-48 object-cover" />
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{msg.texto}</p>
                  <span className="text-[10px] text-gray-400 block text-right mt-1.5">{msg.horario}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Campo de Envio */}
          <form onSubmit={handleEnviarMensagem} className="flex gap-2 border-t border-gray-800 pt-4">
            <input
              type="text"
              placeholder={`Escreva uma mensagem para ${pacienteAtivo}...`}
              value={novaMensagem}
              onChange={(e) => setNovaMensagem(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-sm focus:outline-none focus:border-emerald-500 text-white"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg text-sm transition shadow-md"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}