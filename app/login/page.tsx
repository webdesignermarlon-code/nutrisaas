'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [tipoUsuario, setTipoUsuario] = useState<'nutri' | 'paciente'>('nutri');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    // Lógica de Redirecionamento por Tipo de Usuário
    if (tipoUsuario === 'nutri') {
      if (email.toLowerCase().includes('admin') || email.toLowerCase().includes('marlon')) {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/nutri');
      }
    } else {
      router.push('/dashboard/paciente');
    }
  };

  // Atalho de preenchimento para testes rápidos
  const preencherCredenciaisTeste = (tipo: 'admin' | 'nutri' | 'paciente') => {
    if (tipo === 'admin') {
      setTipoUsuario('nutri');
      setEmail('marlon@admin.com');
      setSenha('123456');
    } else if (tipo === 'nutri') {
      setTipoUsuario('nutri');
      setEmail('luana.nutri@gmail.com');
      setSenha('123456');
    } else {
      setTipoUsuario('paciente');
      setEmail('ana.silva@gmail.com');
      setSenha('123456');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 font-sans text-white">
      <div className="w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Lado Esquerdo: Formulário de Login */}
        <div className="p-8 space-y-6 flex flex-col justify-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-2xl font-bold text-emerald-400">
              <span>🌱</span> NutriSaaS
            </div>
            <h1 className="text-xl font-bold">Acesse sua conta</h1>
            <p className="text-gray-400 text-xs">
              Selecione o seu perfil para acessar a plataforma.
            </p>
          </div>

          {/* Abas de Seleção: Profissional vs Paciente */}
          <div className="grid grid-cols-2 p-1 bg-gray-800 rounded-xl border border-gray-700 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setTipoUsuario('nutri');
                setErro('');
              }}
              className={`py-2 rounded-lg transition ${
                tipoUsuario === 'nutri'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              👩‍⚕️ Nutricionista
            </button>
            <button
              type="button"
              onClick={() => {
                setTipoUsuario('paciente');
                setErro('');
              }}
              className={`py-2 rounded-lg transition ${
                tipoUsuario === 'paciente'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              👤 Paciente
            </button>
          </div>

          {erro && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg">
              {erro}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">
                E-mail ou Usuário
              </label>
              <input
                type="email"
                placeholder={
                  tipoUsuario === 'nutri'
                    ? 'seu.email@nutri.com'
                    : 'seu.email@paciente.com'
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex justify-between items-center text-[11px]">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-700 bg-gray-800 text-emerald-500" />
                Lembrar de mim
              </label>
              <a href="#" className="text-emerald-400 hover:underline">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-lg transition shadow-lg text-sm"
            >
              Entrar no Sistema
            </button>
          </form>
        </div>

        {/* Lado Direito: Atalhos e Demonstração Rápida */}
        <div className="bg-gray-800/60 p-8 border-t md:border-t-0 md:border-l border-gray-800 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              ⚡ Acesso Rápido de Teste
            </span>
            <h2 className="text-sm font-bold text-gray-200">
              Clique abaixo para preencher dados de teste em 1 clique:
            </h2>

            <div className="space-y-2 text-xs">
              <button
                type="button"
                onClick={() => preencherCredenciaisTeste('admin')}
                className="w-full p-3 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-xl font-bold transition text-left flex justify-between items-center"
              >
                <span>👑 SuperAdmin (Marlon)</span>
                <span className="text-[10px] opacity-70">Entrar ➔</span>
              </button>

              <button
                type="button"
                onClick={() => preencherCredenciaisTeste('nutri')}
                className="w-full p-3 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 rounded-xl font-bold transition text-left flex justify-between items-center"
              >
                <span>👩‍⚕️ Nutricionista (Dra. Luana)</span>
                <span className="text-[10px] opacity-70">Entrar ➔</span>
              </button>

              <button
                type="button"
                onClick={() => preencherCredenciaisTeste('paciente')}
                className="w-full p-3 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-300 rounded-xl font-bold transition text-left flex justify-between items-center"
              >
                <span>👤 Paciente (Ana Silva)</span>
                <span className="text-[10px] opacity-70">Entrar ➔</span>
              </button>
            </div>
          </div>

          <div className="text-[10px] text-gray-500 text-center border-t border-gray-800 pt-4">
            NutriSaaS © 2026 • Plataforma de Gestão Nutricional
          </div>
        </div>

      </div>
    </div>
  );
}