'use client';

import React, { useState } from 'react';

// Tabela de alimentos simulada (baseada em 100g de cada item)
interface BaseAlimento {
  id: number;
  nome: string;
  unidadePadrao: string;
  kcal100g: number;
  proteina100g: number;
  carbo100g: number;
  gordura100g: number;
}

const TABELA_TACO: BaseAlimento[] = [
  { id: 1, nome: 'Pão de Forma Integral', unidadePadrao: 'g', kcal100g: 240, proteina100g: 9, carbo100g: 44, gordura100g: 3.5 },
  { id: 2, nome: 'Peito de Frango Grelhado', unidadePadrao: 'g', kcal100g: 165, proteina100g: 31, carbo100g: 0, gordura100g: 3.6 },
  { id: 3, nome: 'Arroz Integral Cozido', unidadePadrao: 'g', kcal100g: 124, proteina100g: 2.6, carbo100g: 25.8, gordura100g: 1 },
  { id: 4, nome: 'Ovo de Galinha Cozido', unidadePadrao: 'g', kcal100g: 146, proteina100g: 13, carbo100g: 0.8, gordura100g: 9.5 },
  { id: 5, nome: 'Banana Prata', unidadePadrao: 'g', kcal100g: 98, proteina100g: 1.3, carbo100g: 26, gordura100g: 0.3 },
  { id: 6, nome: 'Maçã Fuji com Casca', unidadePadrao: 'g', kcal100g: 56, proteina100g: 0.3, carbo100g: 14.5, gordura100g: 0.2 },
  { id: 7, nome: 'Tapioca (Massa)', unidadePadrao: 'g', kcal100g: 240, proteina100g: 0, carbo100g: 60, gordura100g: 0 },
  { id: 8, nome: 'Azeite de Oliva Extra Virgem', unidadePadrao: 'g', kcal100g: 884, proteina100g: 0, carbo100g: 0, gordura100g: 100 },
];

interface Alimento {
  id: number;
  nome: string;
  quantidade: number;
  unidade: string;
  kcal: number;
  proteina: number;
  carbo: number;
  gordura: number;
}

interface OpcaoRefeicao {
  id: number;
  nome: string;
  alimentos: Alimento[];
}

interface Refeicao {
  id: number;
  horario: string;
  titulo: string;
  opcoes: OpcaoRefeicao[];
}

export default function MontadorDietasPage() {
  const [pacienteSelecionado, setPacienteSelecionado] = useState('Ana Silva');

  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([
    {
      id: 1,
      horario: '07:30',
      titulo: '1. Café da Manhã',
      opcoes: [
        { id: 1, nome: 'Opção 1 (Tradicional)', alimentos: [{ id: 101, nome: 'Ovo de Galinha Cozido', quantidade: 100, unidade: 'g', kcal: 146, proteina: 13, carbo: 0.8, gordura: 9.5 }] },
        { id: 2, nome: 'Opção 2 (Tapioca)', alimentos: [] },
        { id: 3, nome: 'Opção 3 (Vitamina)', alimentos: [] },
      ],
    },
  ]);

  // Controle do Modal
  const [modalAberto, setModalAberto] = useState(false);
  const [refeicaoAtivaId, setRefeicaoAtivaId] = useState<number | null>(null);
  const [opcaoAtivaId, setOpcaoAtivaId] = useState<number | null>(null);

  // Estados do Formulário e Autocomplete
  const [busca, setBusca] = useState('');
  const [alimentoSelecionado, setAlimentoSelecionado] = useState<BaseAlimento | null>(null);
  const [quantidade, setQuantidade] = useState<number | ''>(100);
  const [unidade, setUnidade] = useState('g');
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  // Filtra sugestões em tempo real ao digitar
  const sugestoes = TABELA_TACO.filter(item =>
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // Cálculo automático proporcional à quantidade digitada
  const fator = (Number(quantidade) || 0) / 100;
  const kcalCalc = alimentoSelecionado ? Math.round(alimentoSelecionado.kcal100g * fator) : 0;
  const protCalc = alimentoSelecionado ? Number((alimentoSelecionado.proteina100g * fator).toFixed(1)) : 0;
  const carboCalc = alimentoSelecionado ? Number((alimentoSelecionado.carbo100g * fator).toFixed(1)) : 0;
  const gordCalc = alimentoSelecionado ? Number((alimentoSelecionado.gordura100g * fator).toFixed(1)) : 0;

  const abrirModalAdicionar = (refeicaoId: number, opcaoId: number) => {
    setRefeicaoAtivaId(refeicaoId);
    setOpcaoAtivaId(opcaoId);
    setBusca('');
    setAlimentoSelecionado(null);
    setQuantidade(100);
    setModalAberto(true);
  };

  const selecionarAlimento = (item: BaseAlimento) => {
    setAlimentoSelecionado(item);
    setBusca(item.nome);
    setMostrarSugestoes(false);
  };

  const handleAdicionarAlimento = (e: React.FormEvent) => {
    e.preventDefault();
    if (!busca || !refeicaoAtivaId || !opcaoAtivaId) return;

    const novoAlimento: Alimento = {
      id: Date.now(),
      nome: busca,
      quantidade: Number(quantidade) || 0,
      unidade,
      kcal: kcalCalc,
      proteina: protCalc,
      carbo: carboCalc,
      gordura: gordCalc,
    };

    setRefeicoes(refeicoes.map(ref => {
      if (ref.id === refeicaoAtivaId) {
        return {
          ...ref,
          opcoes: ref.opcoes.map(op => {
            if (op.id === opcaoAtivaId) {
              return { ...op, alimentos: [...op.alimentos, novoAlimento] };
            }
            return op;
          })
        };
      }
      return ref;
    }));

    setModalAberto(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold">Montador de Planos Alimentares</h1>
          <p className="text-gray-400 text-sm">Busca inteligente de alimentos com cálculo de calorias automático.</p>
        </div>
      </div>

      {/* Lista de Refeições */}
      <div className="space-y-8">
        {refeicoes.map((ref) => (
          <div key={ref.id} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="font-semibold text-xl mb-4">{ref.titulo}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {ref.opcoes.map((op) => (
                <div key={op.id} className="bg-gray-800/40 border border-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-sm text-emerald-400 mb-3">{op.nome}</h4>
                  <div className="space-y-2 mb-4">
                    {op.alimentos.map((item) => (
                      <div key={item.id} className="text-xs bg-gray-900/60 p-2 rounded flex justify-between">
                        <span>{item.nome} ({item.quantidade}{item.unidade})</span>
                        <span className="text-emerald-400 font-bold">{item.kcal} kcal</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => abrirModalAdicionar(ref.id, op.id)}
                    className="w-full py-1.5 border border-dashed border-gray-700 hover:border-emerald-500 text-gray-400 hover:text-emerald-400 rounded text-xs font-medium transition"
                  >
                    + Adicionar Alimento
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Inteligente de Incluir Alimento */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md relative">
            <h2 className="text-lg font-bold mb-4">Incluir Alimento</h2>

            <form onSubmit={handleAdicionarAlimento} className="space-y-4">
              {/* Campo Nome com Autocomplete e Busca */}
              <div className="relative">
                <label className="block text-xs text-gray-400 mb-1">Nome do Alimento (Busca na tabela)</label>
                <input
                  type="text"
                  required
                  placeholder="Digite para buscar ex: Pão, Frango..."
                  value={busca}
                  onChange={(e) => {
                    setBusca(e.target.value);
                    setAlimentoSelecionado(null);
                    setMostrarSugestoes(true);
                  }}
                  onFocus={() => setMostrarSugestoes(true)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
                />

                {/* Lista Suspensa do Autocomplete */}
                {mostrarSugestoes && busca.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-gray-800 border border-gray-700 rounded-lg max-h-48 overflow-y-auto z-10 shadow-xl">
                    {sugestoes.length > 0 ? (
                      sugestoes.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => selecionarAlimento(item)}
                          className="p-2.5 text-xs hover:bg-emerald-600/20 hover:text-emerald-400 cursor-pointer border-b border-gray-700/50 flex justify-between"
                        >
                          <span>{item.nome}</span>
                          <span className="text-gray-400">{item.kcal100g} kcal / 100g</span>
                        </div>
                      ))
                    ) : (
                      <div className="p-3 text-xs text-gray-400">Nenhum alimento encontrado. Digite o nome livremente.</div>
                    )}
                  </div>
                )}
              </div>

              {/* Quantidade e Unidade */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Quantidade</label>
                  <input
                    type="number"
                    required
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Unidade</label>
                  <select
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="g">Grama (g)</option>
                    <option value="ml">Mililitros (ml)</option>
                    <option value="unid">Unidade(s)</option>
                  </select>
                </div>
              </div>

              {/* Campos de Calorias e Macros (Calculados Automaticamente) */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="bg-gray-800/60 p-2.5 rounded-lg border border-gray-700/50">
                  <label className="block text-[10px] text-gray-400 uppercase font-semibold">Calorias (kcal)</label>
                  <span className="text-lg font-bold text-emerald-400">{kcalCalc}</span>
                </div>
                <div className="bg-gray-800/60 p-2.5 rounded-lg border border-gray-700/50">
                  <label className="block text-[10px] text-gray-400 uppercase font-semibold">Proteínas (g)</label>
                  <span className="text-lg font-bold text-blue-400">{protCalc}</span>
                </div>
                <div className="bg-gray-800/60 p-2.5 rounded-lg border border-gray-700/50">
                  <label className="block text-[10px] text-gray-400 uppercase font-semibold">Carboidratos (g)</label>
                  <span className="text-lg font-bold text-amber-400">{carboCalc}</span>
                </div>
                <div className="bg-gray-800/60 p-2.5 rounded-lg border border-gray-700/50">
                  <label className="block text-[10px] text-gray-400 uppercase font-semibold">Gorduras (g)</label>
                  <span className="text-lg font-bold text-rose-400">{gordCalc}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-semibold transition"
                >
                  Adicionar à Dieta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}