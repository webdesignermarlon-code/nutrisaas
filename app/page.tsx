'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const benefits = [
    {
      icon: '🥗',
      title: 'Montador de Dietas Rápido',
      desc: 'Crie planos alimentares personalizados calculando macronutrientes e calorias em tempo real.'
    },
    {
      icon: '📄',
      title: 'Anamnese Completa',
      desc: 'Fichas pré-prontas configuráveis para investigar histórico, hábitos, alergias e objetivos do paciente.'
    },
    {
      icon: '🧮',
      title: 'Calculadoras Nutricionais',
      desc: 'Gasto energético, GET, TMB e percentual de gordura calculados automaticamente em poucos cliques.'
    },
    {
      icon: '💊',
      title: 'Módulo de Suplementação',
      desc: 'Prescreva suplementos e fitoterápicos de forma clara e padronizada para exportação em PDF.'
    },
    {
      icon: '👥',
      title: 'Gestão de Pacientes',
      desc: 'Acompanhe a evolução de peso, medidas e dados de cada paciente de forma centralizada.'
    },
    {
      icon: '⚡',
      title: 'Interface Ultra Rápida',
      desc: 'Sistema leve, moderno e acessível de qualquer lugar: computador, tablet ou celular.'
    }
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* CSS para o efeito de texto brilhante/molhado e movimento dos cards */}
      <style jsx global>{`
        @keyframes shinyText {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .text-shine {
          background: linear-gradient(
            120deg,
            #10b981 0%,
            #34d399 25%,
            #ffffff 50%,
            #34d399 75%,
            #10b981 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shinyText 4s linear infinite;
        }
      `}</style>

      {/* Background Decorativo */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-600/15 blur-[120px]" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-teal-600/10 blur-[120px]" />
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-black tracking-tight text-emerald-400">🌱 NutriSaaS</span>
          </div>

          <nav className="hidden items-center space-x-8 text-sm font-medium text-slate-300 md:flex">
            <a href="#recursos" className="transition-colors hover:text-emerald-400">Recursos</a>
            <a href="#planos" className="transition-colors hover:text-emerald-400">Planos & Preços</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-semibold text-slate-300 transition-colors hover:text-white">
              Entrar
            </Link>
            <Link
              href="/login?tab=register"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95"
            >
              Testar Grátis
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 text-center lg:pt-20">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-5 py-2 text-xs sm:text-sm font-bold text-emerald-300 backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <span>✨ Feito de Nutricionista para Nutricionistas</span>
          </div>

          {/* TÍTULO COM O EFEITO DE BRILHO PASSANDO NA LETRA */}
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Monte dietas em minutos e <span className="text-shine">encante seus pacientes.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            A ferramenta exata criada por quem entende as dores reais do consultório. Economize horas no atendimento e entregue condutas impecáveis.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login?tab=register"
              className="w-full rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25 active:scale-95 sm:w-auto"
            >
              Começar Teste Grátis Agora →
            </Link>
            <a
              href="#planos"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-8 py-4 text-base font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white sm:w-auto"
            >
              Ver Planos & Valores
            </a>
          </div>

          {/* MOCKUP INTERATIVO */}
          <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/40 p-3 backdrop-blur-xl shadow-2xl">
            <div className="rounded-xl border border-slate-800/80 bg-slate-950 p-6 text-left">
              <div className="mb-6 flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-xs font-medium text-slate-500">app.nutrisaas.com.br/dashboard</div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="text-xs font-semibold text-slate-400">PACIENTES ATIVOS</div>
                  <div className="mt-2 text-3xl font-black text-white">128</div>
                  <div className="mt-1 text-xs text-emerald-400">↑ +14% este mês</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="text-xs font-semibold text-slate-400">DIETAS GERADAS</div>
                  <div className="mt-2 text-3xl font-black text-white">342</div>
                  <div className="mt-1 text-xs text-emerald-400">Tempo médio: 4 min</div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="text-xs font-semibold text-slate-400">SATISFAÇÃO DOS PACIENTES</div>
                  <div className="mt-2 text-3xl font-black text-emerald-400">99.4%</div>
                  <div className="mt-1 text-xs text-slate-400">Acompanhamento via app</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFÍCIOS COM MOVIMENTO E INTERAÇÃO DINÂMICA */}
        <section id="recursos" className="border-t border-slate-800/80 bg-slate-900/30 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                Desenvolvido por quem vive a Nutrição no dia a dia
              </h2>
              <p className="mt-4 text-slate-400">
                Livre-se de sistemas lentos e burocráticos. Tudo o que você precisa a poucos cliques.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/60 hover:bg-slate-900 hover:shadow-2xl hover:shadow-emerald-500/20"
                >
                  <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-500/10 blur-xl transition-all duration-500 group-hover:scale-150 group-hover:bg-emerald-500/20" />
                  
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl text-emerald-400 transition-transform duration-300 group-hover:scale-125 group-hover:bg-emerald-500 group-hover:text-slate-950">
                    {item.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO DE PREÇOS / PLANOS */}
        <section id="planos" className="border-t border-slate-800/80 py-24">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl font-black text-white sm:text-5xl">
              Invista no crescimento do seu consultório
            </h2>
            <p className="mt-4 text-slate-400">
              Escolha o plano ideal com teste grátis e cancele a qualquer momento.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-xl border border-slate-800 bg-slate-900 p-1">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`rounded-lg px-5 py-2 text-sm font-semibold transition-all ${
                    billingCycle === 'yearly'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Anual (2 meses grátis)
                </button>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <div className="relative w-full max-w-md rounded-3xl border-2 border-emerald-500/80 bg-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-xs font-black uppercase text-slate-950">
                  Mais Popular
                </div>

                <h3 className="text-2xl font-bold text-white">Plano Nutri Pro</h3>
                <p className="mt-2 text-xs text-slate-400">Acesso ilimitado a todas as ferramentas</p>

                <div className="mt-6 flex items-baseline justify-center space-x-1">
                  <span className="text-lg font-bold text-slate-400">R$</span>
                  <span className="text-5xl font-black text-white">
                    {billingCycle === 'monthly' ? '97' : '79'}
                  </span>
                  <span className="text-sm font-medium text-slate-400">/mês</span>
                </div>

                <p className="mt-1 text-xs text-emerald-400">
                  {billingCycle === 'yearly' ? 'Cobrado anualmente (R$ 948/ano)' : 'Cobrado mensalmente'}
                </p>

                <ul className="mt-8 space-y-4 text-left text-sm text-slate-300">
                  <li className="flex items-center space-x-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Pacientes ilimitados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Montador de dietas e calculadoras</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Anamnese e módulo de suplementação</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Exportação de PDFs personalizados</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Suporte prioritário</span>
                  </li>
                </ul>

                <Link
                  href="/login?tab=register"
                  className="mt-8 block w-full rounded-xl bg-emerald-500 py-4 text-center text-base font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25 active:scale-95"
                >
                  Testar 7 Dias Grátis
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} NutriSaaS. Desenvolvido para Nutricionistas.</p>
      </footer>
    </div>
  )
}