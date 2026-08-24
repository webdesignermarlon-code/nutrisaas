'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [ciclo, setCiclo] = useState<'mensal' | 'anual'>('anual');

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-emerald-500 selection:text-gray-950 overflow-x-hidden">
      
      {/* 1. NAVEGAÇÃO SUPERIOR (HEADER FIXO) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-emerald-400 tracking-tight">
            <span className="text-2xl animate-pulse">🌱</span> NutriSaaS
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-gray-300">
            <a href="#beneficios" className="hover:text-emerald-400 transition">Benefícios</a>
            <a href="#funcionalidades" className="hover:text-emerald-400 transition">Recursos</a>
            <a href="#depoimentos" className="hover:text-emerald-400 transition">Depoimentos</a>
            <a href="#planos" className="hover:text-emerald-400 transition">Planos</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs font-bold text-gray-300 hover:text-white px-3 py-2 transition"
            >
              Entrar
            </Link>
            <Link
              href="/planos"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-emerald-600/20 hover:scale-105 transform duration-200"
            >
              Testar 15 Dias Grátis
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION COM MOVIMENTO */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-emerald-400 backdrop-blur-md animate-bounce">
            <span>✨</span> A Plataforma #1 para Nutricionistas de Alta Performance
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            Aumente a retenção de pacientes e{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              elimine o tempo perdido
            </span>{' '}
            com burocracia.
          </h1>

          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Prescreva dietas com a Tabela TACO em minutos, monte fórmulas manipuladas com +100 ativos e automatize lembretes pelo WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/planos"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-8 py-4 rounded-xl transition shadow-xl shadow-emerald-600/30 hover:scale-105 transform duration-200 flex items-center justify-center gap-2"
            >
              <span>🚀</span> Testar Grátis por 15 Dias
            </Link>
            <a
              href="#beneficios"
              className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-gray-200 border border-gray-800 font-bold text-sm px-8 py-4 rounded-xl transition hover:scale-105 transform duration-200 flex items-center justify-center gap-2"
            >
              <span>🎬</span> Ver Recursos
            </a>
          </div>

          {/* SIMULAÇÃO VISUAL DE PAINEL */}
          <div className="pt-12 relative max-w-4xl mx-auto">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 md:p-6 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center gap-2 border-b border-gray-800 pb-4 mb-4">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-[10px] text-gray-500 font-mono ml-2">nutrisaas.com.br/dashboard</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="bg-gray-800/80 p-4 rounded-xl space-y-2 border border-gray-700/50">
                  <span className="text-xs font-bold text-gray-400">Pacientes Ativos</span>
                  <p className="text-2xl font-bold text-emerald-400">48 Pacientes</p>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    +8 este mês
                  </span>
                </div>

                <div className="bg-gray-800/80 p-4 rounded-xl space-y-2 border border-gray-700/50">
                  <span className="text-xs font-bold text-gray-400">Lembretes por WhatsApp</span>
                  <p className="text-2xl font-bold text-emerald-400">100% Confirmados</p>
                  <span className="text-[10px] text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded">
                    Automação Ativa
                  </span>
                </div>

                <div className="bg-gray-800/80 p-4 rounded-xl space-y-2 border border-gray-700/50">
                  <span className="text-xs font-bold text-gray-400">Guia de Suplementação</span>
                  <p className="text-2xl font-bold text-white">+100 Ativos</p>
                  <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                    Prescrição Rápida
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SEÇÃO DE PLANOS */}
      <section id="planos" className="py-20 px-6 bg-gray-900/80 border-t border-gray-800">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Planos & Investimento</h2>
            <p className="text-3xl md:text-4xl font-extrabold">Comece com 15 Dias Grátis</p>
            <p className="text-gray-400 text-xs">Sem necessidade de cartão de crédito para testar.</p>

            <div className="pt-4 flex items-center justify-center gap-3 text-xs font-bold">
              <span className={ciclo === 'mensal' ? 'text-white' : 'text-gray-500'}>Mensal</span>
              <button
                onClick={() => setCiclo(ciclo === 'mensal' ? 'anual' : 'mensal')}
                className="w-12 h-6 bg-emerald-600 rounded-full p-1 relative transition duration-200"
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition duration-200 ${
                    ciclo === 'anual' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={ciclo === 'anual' ? 'text-emerald-400' : 'text-gray-500'}>
                Anual <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md text-[10px] ml-1">Com Desconto</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            
            {/* Plano Profissional */}
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8 space-y-6 flex flex-col justify-between hover:border-gray-700 transition">
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Plano Profissional</h3>
                <p className="text-gray-400 text-xs">Para nutricionistas autônomas em crescimento.</p>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    R$ {ciclo === 'anual' ? '87' : '97'}
                  </span>
                  <span className="text-gray-400 text-xs">/mês</span>
                </div>

                <ul className="space-y-3 text-xs text-gray-300 pt-2 border-t border-gray-800">
                  <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Até 100 Pacientes Ativos</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Lembretes no WhatsApp</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Montador de Dietas TACO</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Guia de Suplementação (+100 Ativos)</li>
                </ul>
              </div>

              <Link
                href="/planos"
                className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-emerald-400 border border-emerald-500/30 text-center font-bold text-xs rounded-xl transition"
              >
                Ativar 15 Dias Grátis
              </Link>
            </div>

            {/* Plano Elite */}
            <div className="bg-gray-950 border-2 border-emerald-500 rounded-2xl p-8 space-y-6 flex flex-col justify-between shadow-2xl relative">
              <div className="absolute top-0 right-0 bg-emerald-500 text-gray-950 font-extrabold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Mais Vendido
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-emerald-400">Plano Elite & Consultório</h3>
                <p className="text-gray-400 text-xs">Pacientes ilimitados e suporte prioritário.</p>
                
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    R$ {ciclo === 'anual' ? '127' : '147'}
                  </span>
                  <span className="text-gray-400 text-xs">/mês</span>
                </div>

                <ul className="space-y-3 text-xs text-gray-300 pt-2 border-t border-gray-800">
                  <li className="flex items-center gap-2 font-semibold text-white"><span className="text-emerald-400 font-bold">✓</span> Pacientes ILIMITADOS</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Disparo Automático 24h de Lembretes</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Portal do Paciente Exclusivo</li>
                  <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Suporte Prioritário no WhatsApp</li>
                </ul>
              </div>

              <Link
                href="/planos"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-center font-bold text-xs rounded-xl transition shadow-lg shadow-emerald-600/30"
              >
                Ativar 15 Dias Grátis
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="py-8 px-6 border-t border-gray-900 text-xs text-gray-500 text-center">
        <p>NutriSaaS © 2026 • Todos os direitos reservados.</p>
      </footer>

    </div>
  );
}