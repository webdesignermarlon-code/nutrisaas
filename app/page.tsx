'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dietas')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Background Decorativo com Gradients */}
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
            <a href="#beneficios" className="transition-colors hover:text-emerald-400">Benefícios</a>
            <a href="#planos" className="transition-colors hover:text-emerald-400">Planos</a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 transition-colors hover:text-white"
            >
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
        <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 text-center lg:pt-24">
          <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>A plataforma completa para Nutricionistas de Alta Performance</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
            Monte dietas em minutos e <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">encante seus pacientes.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Simplifique sua rotina no consultório com cálculo automatizado, anamnese inteligente, gerenciamento de pacientes e prescrição de suplementação em um só lugar.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/login?tab=register"
              className="w-full rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25 active:scale-95 sm:w-auto"
            >
              Começar Teste Grátis Agora →
            </Link>
            <a
              href="#recursos"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/60 px-8 py-4 text-base font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white sm:w-auto"
            >
              Conhecer Recursos
            </a>
          </div>

          {/* MOCKUP INTERATIVO DA PLATAFORMA */}
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

        {/* BENEFÍCIOS / RECURSOS */}
        <section id="recursos" className="border-t border-slate-800/80 bg-slate-900/30 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center">
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                Tudo o que você precisa para alavancar seu consultório
              </h2>
              <p className="mt-4 text-slate-400">
                Desenvolvido pensado na usabilidade prática do dia a dia do nutricionista.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl text-emerald-400">
                  🥗
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Montador de Dietas Rápido</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Crie planos alimentares personalizados calculando macronutrientes e calorias em tempo real.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl text-emerald-400">
                  📄
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Anamnese Completa</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Fichas pré-prontas configuráveis para investigar histórico, hábitos, alergias e objetivos do paciente.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl text-emerald-400">
                  🧮
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Calculadoras Nutricionais</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Gasto energético, GET, TMB e percentual de gordura calculados automaticamente em poucos cliques.
                </p>
              </div>

              {/* Card 4 */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl text-emerald-400">
                  💊
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Módulo de Suplementação</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Prescreva suplementos e fitoterápicos de forma clara e padronizada para exportação em PDF.
                </p>
              </div>

              {/* Card 5 */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl text-emerald-400">
                  👥
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Gestão de Pacientes</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Acompanhe a evolução de peso, medidas e dados de cada paciente de forma centralizada.
                </p>
              </div>

              {/* Card 6 */}
              <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-8 transition-all hover:border-emerald-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-500/5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl text-emerald-400">
                  ⚡
                </div>
                <h3 className="mt-6 text-xl font-bold text-white">Interface Ultra Rápida</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Sistema leve, moderno e acessível de qualquer lugar: computador, tablet ou celular.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-12 backdrop-blur-xl">
            <h2 className="text-3xl font-black text-white sm:text-5xl">
              Pronta para modernizar o seu atendimento?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Cadastre-se agora e comece a utilizar todas as ferramentas no seu consultório imediatamente.
            </p>
            <div className="mt-8">
              <Link
                href="/login?tab=register"
                className="inline-block rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25 active:scale-95"
              >
                Criar Minha Conta Grátis
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} NutriSaaS. Todos os direitos reservados.</p>
      </footer>
    </div>
  )
}