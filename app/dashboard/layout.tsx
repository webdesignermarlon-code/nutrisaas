'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [temaEscuro, setTemaEscuro] = useState(true);

  // SIMULAÇÃO DE PERFIL LOGADO
  const [usuarioRole, setUsuarioRole] = useState<'admin' | 'nutri'>('admin');

  const toggleTema = () => {
    if (temaEscuro) {
      document.documentElement.classList.remove('dark');
      setTemaEscuro(false);
    } else {
      document.documentElement.classList.add('dark');
      setTemaEscuro(true);
    }
  };

  const abrirSuporteNutriSaaS = () => {
    const telefoneSuporte = '5522999140912'; // WhatsApp do Suporte NutriSaaS (Marlon)
    const mensagem = encodeURIComponent(
      `Olá, suporte NutriSaaS! Sou a ${
        usuarioRole === 'admin' ? 'Marlon (Admin)' : 'Dra. Luana Santos'
      } e preciso de ajuda com o sistema.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${telefoneSuporte}&text=${mensagem}`, '_blank');
  };

  // Menu base da Nutricionista
  const menuItems = [
    { nome: 'Dashboard Nutri', path: '/dashboard/nutri', icone: '📊', adminOnly: false },
    { nome: 'Pacientes', path: '/dashboard/nutri/pacientes', icone: '👥', adminOnly: false },
    { nome: 'Montador de Dietas', path: '/dashboard/nutri/dietas', icone: '🥗', adminOnly: false },
    { nome: 'Anamnese', path: '/dashboard/nutri/anamnese', icone: '📝', adminOnly: false },
    { nome: 'Kit Gestão & Exames', path: '/dashboard/nutri/gestao', icone: '📑', adminOnly: false },
    { nome: 'Calculadoras', path: '/dashboard/nutri/calculadoras', icone: '🧮', adminOnly: false },
    { nome: 'Suplementação', path: '/dashboard/nutri/suplementacao', icone: '💊', adminOnly: false },
    { nome: 'Chat / Mensagens', path: '/dashboard/nutri/chat', icone: '💬', adminOnly: false },
  ];

  if (usuarioRole === 'admin') {
    menuItems.unshift({
      nome: 'Painel Admin (Marlon)',
      path: '/dashboard/admin',
      icone: '👑',
      adminOnly: true,
    });
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col justify-between print:hidden">
        <div>
          {/* Logo do Sistema */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl text-emerald-600 dark:text-emerald-400">
              <span>🌱</span> NutriSaaS
            </div>
            <button
              onClick={toggleTema}
              title="Alternar Modo Claro / Escuro"
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {temaEscuro ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Seletor de Teste de Perfil */}
          <div className="p-3 bg-amber-500/10 border-b border-amber-500/20 text-[10px] text-amber-500 font-mono flex items-center justify-between">
            <span>Perfil: <strong>{usuarioRole.toUpperCase()}</strong></span>
            <button
              onClick={() => setUsuarioRole(usuarioRole === 'admin' ? 'nutri' : 'admin')}
              className="underline text-[9px] hover:text-amber-400"
            >
              Alternar Visualização
            </button>
          </div>

          {/* Links do Menu */}
          <nav className="p-4 space-y-1.5">
            {menuItems.map((item) => {
              const ativo = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition ${
                    item.adminOnly
                      ? 'bg-purple-600/10 text-purple-400 border border-purple-500/30 hover:bg-purple-600/20'
                      : ativo
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                  }`}
                >
                  <span className="text-base">{item.icone}</span>
                  <span>{item.nome}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Rodapé da Sidebar com Botão de Suporte Técnico */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-3">
          <button
            onClick={abrirSuporteNutriSaaS}
            className="w-full bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-bold text-xs py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>🎧</span> Suporte NutriSaaS
          </button>

          <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
              {usuarioRole === 'admin' ? 'MA' : 'LS'}
            </div>
            <div className="overflow-hidden text-xs">
              <p className="font-bold truncate">
                {usuarioRole === 'admin' ? 'Marlon Andrade' : 'Dra. Luana Santos'}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                {usuarioRole === 'admin' ? 'SuperAdmin SaaS' : 'CRN-4 12345/RJ'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Conteúdo da Página */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}