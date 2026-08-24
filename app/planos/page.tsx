'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlanosCheckoutPage() {
  const router = useRouter();
  const [ciclo, setCiclo] = useState<'mensal' | 'anual'>('anual');
  const [modalCheckout, setModalCheckout] = useState(false);
  const [isTrial, setIsTrial] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState<{
    nome: string;
    preco: number;
    cicloTexto: string;
  } | null>(null);

  const [metodoPagamento, setMetodoPagamento] = useState<'pix' | 'cartao'>('pix');
  const [processando, setProcessando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  // Form de cadastro / checkout
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const iniciarTrialGratis = () => {
    setIsTrial(true);
    setPlanoSelecionado({
      nome: 'Teste Grátis (15 Dias)',
      preco: 0,
      cicloTexto: '15 dias de acesso total grátis',
    });
    setModalCheckout(true);
  };

  const abrirCheckout = (nomePlano: string, precoMensal: number) => {
    setIsTrial(false);
    const valorFinal = ciclo === 'anual' ? precoMensal : precoMensal + 10;
    setPlanoSelecionado({
      nome: nomePlano,
      preco: valorFinal,
      cicloTexto: ciclo === 'anual' ? 'cobrado anualmente' : 'cobrado mensalmente',
    });
    setModalCheckout(true);
  };

  const handleFinalizarCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessando(true);

    setTimeout(() => {
      setProcessando(false);
      setSucesso(true);

      setTimeout(() => {
        router.push('/dashboard/nutri');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans p-6 md:p-12 flex flex-col justify-between">
      <div className="max-w-5xl mx-auto w-full space-y-10">
        
        {/* Cabeçalho */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-2xl font-bold text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
            <span>🌱</span> NutriSaaS
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Escolha como quer começar no seu consultório
          </h1>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Experimente por 15 dias sem pagar nada ou escolha um plano profissional com desconto.
          </p>

          {/* BANNER DE TESTE GRÁTIS */}
          <div className="pt-4 max-w-md mx-auto">
            <button
              onClick={iniciarTrialGratis}
              className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border-2 border-emerald-500/50 p-4 rounded-2xl transition group flex items-center justify-between text-left shadow-lg"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                  Sem Cartão de Crédito
                </span>
                <p className="font-bold text-sm text-white group-hover:text-emerald-300">
                  🎁 Testar Grátis por 15 Dias
                </p>
                <p className="text-[11px] text-gray-400">Acesso completo a todas as ferramentas</p>
              </div>
              <span className="text-xs font-bold bg-emerald-600 text-white px-3 py-2 rounded-xl group-hover:scale-105 transition">
                Começar Grátis ➔
              </span>
            </button>
          </div>

          {/* Toggle Mensal / Anual */}
          <div className="pt-6 flex items-center justify-center gap-3 text-xs font-bold">
            <span className={ciclo === 'mensal' ? 'text-white' : 'text-gray-500'}>Cobrança Mensal</span>
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
              Cobrança Anual <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md text-[10px] ml-1">Desconto</span>
            </span>
          </div>
        </div>

        {/* Cards de Planos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          
          {/* Plano Profissional */}
          <div className="bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-2xl p-8 space-y-6 flex flex-col justify-between shadow-xl relative">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-200">Plano Profissional</h3>
              <p className="text-gray-400 text-xs">Para nutricionistas autônomas em crescimento.</p>
              
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  R$ {ciclo === 'anual' ? '87' : '97'}
                </span>
                <span className="text-gray-400 text-xs">/mês</span>
              </div>

              <ul className="space-y-3 text-xs text-gray-300 pt-2 border-t border-gray-800">
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Até 100 Pacientes Ativos</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Lembretes de Consulta via WhatsApp</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Montador de Dietas (Tabela TACO)</li>
                <li className="flex items-center gap-2"><span className="text-emerald-400 font-bold">✓</span> Emissão de Exames em PDF</li>
              </ul>
            </div>

            <button
              onClick={() => abrirCheckout('Plano Profissional', 87)}
              className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-emerald-400 border border-emerald-500/30 font-bold text-xs rounded-xl transition"
            >
              Assinar Plano Profissional
            </button>
          </div>

          {/* Plano Elite */}
          <div className="bg-gray-900 border-2 border-emerald-500/80 rounded-2xl p-8 space-y-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-gray-950 font-extrabold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Mais Vendido
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-emerald-400">Plano Elite & Consultório</h3>
              <p className="text-gray-400 text-xs">Pacientes ilimitados e suporte prioritário no WhatsApp.</p>
              
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

            <button
              onClick={() => abrirCheckout('Plano Elite & Consultório', 127)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-lg"
            >
              Assinar Plano Elite
            </button>
          </div>

        </div>
      </div>

      {/* MODAL DE ATIVAÇÃO / CHECKOUT */}
      {modalCheckout && planoSelecionado && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-6">
            
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-emerald-400">
                  {planoSelecionado.nome}
                </h3>
                <p className="text-gray-400 text-xs">
                  {isTrial
                    ? '15 dias totalmente grátis • Sem necessidade de cartão'
                    : `R$ ${planoSelecionado.preco},00 / mês (${planoSelecionado.cicloTexto})`}
                </p>
              </div>
              <button
                onClick={() => setModalCheckout(false)}
                className="text-gray-400 hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            {sucesso ? (
              <div className="py-8 text-center space-y-3">
                <div className="text-4xl animate-bounce">🎉</div>
                <h3 className="text-lg font-bold text-emerald-400">
                  {isTrial ? 'Período de Teste Ativado!' : 'Pagamento Aprovado!'}
                </h3>
                <p className="text-gray-400 text-xs">
                  Sua conta foi liberada por 15 dias. Redirecionando para o seu Dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleFinalizarCadastro} className="space-y-4 text-xs">
                
                {!isTrial && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMetodoPagamento('pix')}
                      className={`py-2.5 rounded-xl font-bold border transition ${
                        metodoPagamento === 'pix'
                          ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500'
                          : 'bg-gray-800 text-gray-400 border-gray-700'
                      }`}
                    >
                      ❖ Pix Instantâneo
                    </button>
                    <button
                      type="button"
                      onClick={() => setMetodoPagamento('cartao')}
                      className={`py-2.5 rounded-xl font-bold border transition ${
                        metodoPagamento === 'cartao'
                          ? 'bg-emerald-600/20 text-emerald-400 border-emerald-500'
                          : 'bg-gray-800 text-gray-400 border-gray-700'
                      }`}
                    >
                      💳 Cartão de Crédito
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Dra. Luana Santos"
                    value={nomeCompleto}
                    onChange={(e) => setNomeCompleto(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">E-mail Profissional</label>
                    <input
                      type="email"
                      required
                      placeholder="dra.luana@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-1">WhatsApp</label>
                    <input
                      type="text"
                      required
                      placeholder="(22) 99999-8888"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {isTrial ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-1 text-center">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      🚀 15 Dias de Acesso Ilimitado
                    </span>
                    <p className="text-[11px] text-gray-300">
                      Você pode cancelar ou assinar um plano definitivo a qualquer momento.
                    </p>
                  </div>
                ) : metodoPagamento === 'pix' ? (
                  <div className="p-4 bg-gray-800/80 border border-gray-700 rounded-xl space-y-2 text-center">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Aprovação Imediata via Pix
                    </span>
                    <p className="text-[11px] text-gray-300">
                      Chave Pix gerada automaticamente após confirmação.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-1">Número do Cartão</label>
                      <input
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-white focus:outline-none font-mono"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processando}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-bold text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                >
                  {processando ? (
                    <span>Ativando Conta...</span>
                  ) : isTrial ? (
                    <span>Ativar 15 Dias Grátis Agora ➔</span>
                  ) : (
                    <span>Confirmar & Ativar Assinatura ➔</span>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </div>
  );
}