'use client';

import React, { useState } from 'react';
import { BANCO_TACO_COMPLETO, AlimentoTaco } from '../../../data/taco';

interface Alimento {
  id: string;
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  kcal: number;
  proteina: number;
  carboidrato: number;
  gordura: number;
}

interface OpcaoRefeicao {
  id: string;
  titulo: string;
  alimentos: Alimento[];
}

interface Refeicao {
  id: string;
  titulo: string;
  horario: string;
  opcoes: OpcaoRefeicao[];
}

interface ModeloDieta {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  refeicoes: Refeicao[];
}

const MODELOS_PRONTOS: ModeloDieta[] = [
  {
    id: 'autismo_seletividade',
    nome: 'Autismo / TEA & Seletividade Alimentar (Pediátrico/SGSC)',
    descricao: 'Sem glúten, sem caseína, adaptado para texturas aceitáveis e suporte neurológico.',
    icone: '🧩',
    refeicoes: [
      {
        id: 'aut_ref1',
        titulo: 'Café da Manhã Seletivo',
        horario: '08:00',
        opcoes: [
          {
            id: 'aut_op1',
            titulo: 'Opção 1 (Banana & Ovos Mexidos)',
            alimentos: [
              { id: 'aut_a1', nome: 'Banana Prata', categoria: 'Frutas', quantidade: 100, unidade: 'g', kcal: 98, proteina: 1.3, carboidrato: 26.0, gordura: 0.1 },
              { id: 'aut_a2', nome: 'Ovo Mexido / Frito (Azeite)', categoria: 'Ovos', quantidade: 60, unidade: 'g', kcal: 144, proteina: 9.3, carboidrato: 0.7, gordura: 11.1 },
            ],
          },
          {
            id: 'aut_op2',
            titulo: 'Opção 2 (Mingau de Aveia Sem Glúten)',
            alimentos: [
              { id: 'aut_a3', nome: 'Aveia em Flocos', categoria: 'Cereais', quantidade: 30, unidade: 'g', kcal: 118, proteina: 4.1, carboidrato: 20.0, gordura: 2.5 },
              { id: 'aut_a4', nome: 'Leite de Amêndoas (Sem Açúcar)', categoria: 'Laticínios Vegetais', quantidade: 150, unidade: 'ml', kcal: 22, proteina: 0.8, carboidrato: 0.5, gordura: 1.8 },
            ],
          },
        ],
      },
      {
        id: 'aut_ref2',
        titulo: 'Almoço (Textura Suave)',
        horario: '12:00',
        opcoes: [
          {
            id: 'aut_op3',
            titulo: 'Opção 1 (Arroz Soltinho & Frango Desfiado)',
            alimentos: [
              { id: 'aut_a5', nome: 'Arroz Branco Cozido', categoria: 'Cereais', quantidade: 100, unidade: 'g', kcal: 130, proteina: 2.5, carboidrato: 28.2, gordura: 0.2 },
              { id: 'aut_a6', nome: 'Peito de Frango Desfiado', categoria: 'Carnes', quantidade: 90, unidade: 'g', kcal: 148, proteina: 27.9, carboidrato: 0, gordura: 3.2 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'menopausa_saude_ossea',
    nome: 'Menopausa & Saúde Óssea / Metabólica (1.500 kcal)',
    descricao: 'Rica em Cálcio, Vitamina D, Magnésio e Fitoestrógenos para controle de fogachos e densidade óssea.',
    icone: '🌸',
    refeicoes: [
      {
        id: 'meno_ref1',
        titulo: 'Café da Manhã Anti-fogacho',
        horario: '07:30',
        opcoes: [
          {
            id: 'meno_op1',
            titulo: 'Opção 1 (Iogurte Fortificado com Linhaça & Mamão)',
            alimentos: [
              { id: 'm1', nome: 'Iogurte Natural Desnatado', categoria: 'Laticínios', quantidade: 170, unidade: 'g', kcal: 70, proteina: 6.4, carboidrato: 9.8, gordura: 0.5 },
              { id: 'm2', nome: 'Semente de Linhaça Dourada', categoria: 'Sementes', quantidade: 15, unidade: 'g', kcal: 74, proteina: 2.1, carboidrato: 6.5, gordura: 4.8 },
              { id: 'm3', nome: 'Mamão Papaia', categoria: 'Frutas', quantidade: 100, unidade: 'g', kcal: 45, proteina: 0.5, carboidrato: 11.5, gordura: 0.1 },
            ],
          },
        ],
      },
      {
        id: 'meno_ref2',
        titulo: 'Almoço Densitométrico',
        horario: '12:30',
        opcoes: [
          {
            id: 'meno_op3',
            titulo: 'Opção 1 (Sardinha Grelhada & Couve Refogada)',
            alimentos: [
              { id: 'm7', nome: 'Sardinha Conserva/Grelhada', categoria: 'Peixes', quantidade: 120, unidade: 'g', kcal: 250, proteina: 24.0, carboidrato: 0, gordura: 16.0 },
              { id: 'm8', nome: 'Couve Manteiga Refogada', categoria: 'Vegetais', quantidade: 80, unidade: 'g', kcal: 36, proteina: 1.4, carboidrato: 4.3, gordura: 1.2 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'pre_menopausa_hormonal',
    nome: 'Pré-Menopausa & Modulação Hormonal',
    descricao: 'Suporte nutricional para oscilações do ciclo, controle da TPM e flexibilidade metabólica.',
    icone: '🌺',
    refeicoes: [
      {
        id: 'pre_ref1',
        titulo: 'Desjejum Estabilizador',
        horario: '08:00',
        opcoes: [
          {
            id: 'pre_op1',
            titulo: 'Opção 1 (Ovos Mexidos com Espinafre & Abacate)',
            alimentos: [
              { id: 'p1', nome: 'Ovo de Galinha Cozido/Mexido', categoria: 'Ovos', quantidade: 120, unidade: 'g', kcal: 186, proteina: 15.6, carboidrato: 1.3, gordura: 12.7 },
              { id: 'p2', nome: 'Abacate', categoria: 'Frutas', quantidade: 60, unidade: 'g', kcal: 96, proteina: 1.2, carboidrato: 5.1, gordura: 8.7 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'terceira_idade_sarcopenia',
    nome: 'Terceira Idade & Prevenção da Sarcopenia (Idosos)',
    descricao: 'Alta densidade de proteínas, digestão facilitada, fibras solúveis e suporte cognitivo/articular.',
    icone: '👴',
    refeicoes: [
      {
        id: 'idoso_ref1',
        titulo: 'Café da Manhã de Alta Digestibilidade',
        horario: '07:30',
        opcoes: [
          {
            id: 'idoso_op1',
            titulo: 'Opção 1 (Mingau Proteico de Aveia e Whey)',
            alimentos: [
              { id: 'id1', nome: 'Aveia em Flocos', categoria: 'Cereais', quantidade: 40, unidade: 'g', kcal: 157, proteina: 5.5, carboidrato: 26.6, gordura: 3.3 },
              { id: 'id2', nome: 'Whey Protein Concentrado 80%', categoria: 'Suplementos', quantidade: 20, unidade: 'g', kcal: 80, proteina: 16.0, carboidrato: 1.2, gordura: 1.2 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'andropausa_testosterona',
    nome: 'Andropausa & Suporte à Testosterona Masculina',
    descricao: 'Rica em Zinco, Boro, Vitamina D3 e gorduras boas para síntese hormonal masculina.',
    icone: '⚡',
    refeicoes: [
      {
        id: 'andro_ref1',
        titulo: 'Café da Manhã Pro-Testosterona',
        horario: '07:00',
        opcoes: [
          {
            id: 'andro_op1',
            titulo: 'Opção 1 (Ovos Inteiros, Castanha do Pará & Abacate)',
            alimentos: [
              { id: 'an1', nome: 'Ovo de Galinha Cozido', categoria: 'Ovos', quantidade: 180, unidade: 'g', kcal: 279, proteina: 23.4, carboidrato: 2.0, gordura: 19.0 },
              { id: 'an2', nome: 'Castanha do Pará', categoria: 'Oleaginosas', quantidade: 15, unidade: 'g', kcal: 98, proteina: 2.1, carboidrato: 1.8, gordura: 9.9 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'bariatrica_pastosa',
    nome: 'Pós-Bariátrica (Fase Pastosa / Proteica)',
    descricao: 'Alta densidade de proteínas, fracionamento rigoroso e facilidade digestiva.',
    icone: '🩺',
    refeicoes: [
      {
        id: 'bar_ref1',
        titulo: 'Desjejum Proteico',
        horario: '07:00',
        opcoes: [
          {
            id: 'bar_op1',
            titulo: 'Opção 1 (Whey Isolado em Água)',
            alimentos: [
              { id: 'bar_a1', nome: 'Whey Protein Isolado 90%', categoria: 'Suplementos', quantidade: 30, unidade: 'g', kcal: 111, proteina: 27.0, carboidrato: 0.5, gordura: 0.2 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'emagrecimento_deficit',
    nome: 'Emagrecimento & Déficit Calórico (1.600 kcal)',
    descricao: 'Cardápio focado em densidade nutricional, saciedade e preservação de massa magra.',
    icone: '🔥',
    refeicoes: [
      {
        id: 'ref1',
        titulo: 'Café da Manhã',
        horario: '07:30',
        opcoes: [
          {
            id: 'op1_ref1',
            titulo: 'Opção 1 (Ovos & Pão Integral)',
            alimentos: [
              { id: 'a1', nome: 'Ovo de Galinha Cozido', categoria: 'Ovos', quantidade: 120, unidade: 'g', kcal: 186, proteina: 15.6, carboidrato: 1.3, gordura: 12.7 },
              { id: 'a2', nome: 'Pão Integral', categoria: 'Pães', quantidade: 50, unidade: 'g', kcal: 123, proteina: 4.7, carboidrato: 22.5, gordura: 1.6 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'diabetes_lowgi',
    nome: 'Diabetes & Controle Glicêmico (Baixo ÍG/SOP)',
    descricao: 'Modulação de carga glicêmica, aumento de fibras e controle estrito de insulina.',
    icone: '🩸',
    refeicoes: [
      {
        id: 'diab_ref1',
        titulo: 'Desjejum de Baixa Carga Glicêmica',
        horario: '07:30',
        opcoes: [
          {
            id: 'diab_op1',
            titulo: 'Opção 1 (Ovos com Abacate & Chia)',
            alimentos: [
              { id: 'diab_a1', nome: 'Ovo Mexido / Frito (Azeite)', categoria: 'Ovos', quantidade: 120, unidade: 'g', kcal: 288, proteina: 18.7, carboidrato: 1.4, gordura: 22.3 },
            ],
          },
        ],
      },
    ],
  },
];

export default function DietasPage() {
  const [paciente, setPaciente] = useState('Ana Silva');
  const [metaKcal, setMetaKcal] = useState<number>(1500);
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>(MODELOS_PRONTOS[0].refeicoes);
  const [baseAlimentos, setBaseAlimentos] = useState<AlimentoTaco[]>(BANCO_TACO_COMPLETO);

  // Modal Criar Nova Refeição (Pop-up)
  const [modalNovaRefeicaoAberto, setModalNovaRefeicaoAberto] = useState(false);
  const [novoTituloRefeicao, setNovoTituloRefeicao] = useState('');
  const [novoHorarioRefeicao, setNovoHorarioRefeicao] = useState('15:00');

  // Busca TACO Modal
  const [modalBuscaAberto, setModalBuscaAberto] = useState(false);
  const [refeicaoDestinoId, setRefeicaoDestinoId] = useState<string>('');
  const [opcaoDestinoId, setOpcaoDestinoId] = useState<string>('');
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');
  const [qtdGramasBusca, setQtdGramasBusca] = useState<number>(100);

  // Modal Cadastro Personalizado
  const [modalNovoAlimentoAberto, setModalNovoAlimentoAberto] = useState(false);
  const [novoNome, setNovoNome] = useState('');
  const [novoCategoria, setNovoCategoria] = useState('Personalizado');
  const [novoKcal, setNovoKcal] = useState<number>(100);
  const [novoProt, setNovoProt] = useState<number>(10);
  const [novoCarbo, setNovoCarbo] = useState<number>(10);
  const [novoGord, setNovoGord] = useState<number>(2);

  const calcularTotais = () => {
    let kcal = 0;
    let prot = 0;
    let carbo = 0;
    let gord = 0;

    refeicoes.forEach((ref) => {
      const opcaoPrincipal = ref.opcoes[0];
      if (opcaoPrincipal) {
        opcaoPrincipal.alimentos.forEach((item) => {
          kcal += item.kcal;
          prot += item.proteina;
          carbo += item.carboidrato;
          gord += item.gordura;
        });
      }
    });

    return {
      kcal: Math.round(kcal),
      prot: Number(prot.toFixed(1)),
      carbo: Number(carbo.toFixed(1)),
      gord: Number(gord.toFixed(1)),
    };
  };

  const totais = calcularTotais();

  const carregarModelo = (modelo: ModeloDieta) => {
    setRefeicoes(JSON.parse(JSON.stringify(modelo.refeicoes)));
  };

  const abrirModalAdicionar = (refId: string, opcId: string) => {
    setRefeicaoDestinoId(refId);
    setOpcaoDestinoId(opcId);
    setTermoBusca('');
    setCategoriaFiltro('Todas');
    setQtdGramasBusca(100);
    setModalBuscaAberto(true);
  };

  const adicionarAlimentoTaco = (itemTaco: AlimentoTaco) => {
    const fator = qtdGramasBusca / 100;
    const novoAlimento: Alimento = {
      id: `item_${Date.now()}`,
      nome: itemTaco.nome,
      categoria: itemTaco.categoria,
      quantidade: qtdGramasBusca,
      unidade: itemTaco.un,
      kcal: Math.round(itemTaco.kcal * fator),
      proteina: Number((itemTaco.p * fator).toFixed(1)),
      carboidrato: Number((itemTaco.c * fator).toFixed(1)),
      gordura: Number((itemTaco.g * fator).toFixed(1)),
    };

    setRefeicoes((prev) =>
      prev.map((ref) => {
        if (ref.id === refeicaoDestinoId) {
          return {
            ...ref,
            opcoes: ref.opcoes.map((opc) => {
              if (opc.id === opcaoDestinoId) {
                return { ...opc, alimentos: [...opc.alimentos, novoAlimento] };
              }
              return opc;
            }),
          };
        }
        return ref;
      })
    );

    setModalBuscaAberto(false);
  };

  const cadastrarEAdicionarAlimento = () => {
    if (!novoNome.trim()) return;
    const itemPersonalizado: AlimentoTaco = {
      nome: novoNome,
      categoria: novoCategoria,
      kcal: Number(novoKcal),
      p: Number(novoProt),
      c: Number(novoCarbo),
      g: Number(novoGord),
      un: 'g',
    };

    setBaseAlimentos([itemPersonalizado, ...baseAlimentos]);
    adicionarAlimentoTaco(itemPersonalizado);
    setModalNovoAlimentoAberto(false);
    setNovoNome('');
  };

  const removerAlimento = (refeicaoId: string, opcaoId: string, alimentoId: string) => {
    setRefeicoes((prev) =>
      prev.map((ref) => {
        if (ref.id === refeicaoId) {
          return {
            ...ref,
            opcoes: ref.opcoes.map((opc) => {
              if (opc.id === opcaoId) {
                return {
                  ...opc,
                  alimentos: opc.alimentos.filter((a) => a.id !== alimentoId),
                };
              }
              return opc;
            }),
          };
        }
        return ref;
      })
    );
  };

  const adicionarOpcaoSubstituicao = (refeicaoId: string) => {
    setRefeicoes((prev) =>
      prev.map((ref) => {
        if (ref.id === refeicaoId) {
          const numNovaOpcao = ref.opcoes.length + 1;
          const novaOpcao: OpcaoRefeicao = {
            id: `op_${Date.now()}`,
            titulo: `Opção ${numNovaOpcao} (Substituição)`,
            alimentos: [],
          };
          return { ...ref, opcoes: [...ref.opcoes, novaOpcao] };
        }
        return ref;
      })
    );
  };

  const removerOpcaoSubstituicao = (refeicaoId: string, opcaoId: string) => {
    setRefeicoes((prev) =>
      prev.map((ref) => {
        if (ref.id === refeicaoId) {
          return {
            ...ref,
            opcoes: ref.opcoes.filter((o) => o.id !== opcaoId),
          };
        }
        return ref;
      })
    );
  };

  const removerRefeicaoCompleta = (refeicaoId: string) => {
    setRefeicoes((prev) => prev.filter((ref) => ref.id !== refeicaoId));
  };

  const confirmarCriacaoRefeicao = () => {
    if (!novoTituloRefeicao.trim()) return;

    const nova: Refeicao = {
      id: `ref_${Date.now()}`,
      titulo: novoTituloRefeicao,
      horario: novoHorarioRefeicao,
      opcoes: [
        {
          id: `op1_${Date.now()}`,
          titulo: 'Opção 1 (Principal)',
          alimentos: [],
        },
      ],
    };

    setRefeicoes([...refeicoes, nova]);
    setModalNovaRefeicaoAberto(false);
    setNovoTituloRefeicao('');
  };

  const handleExportarPDF = () => {
    window.print();
  };

  const handleEnviarWhatsApp = () => {
    let texto = `*PLANO ALIMENTAR PERSONALIZADO*\n*Nutricionista:* Dra. Luana Santos\n*Paciente:* ${paciente}\n*Meta Calórica:* ${metaKcal} kcal\n\n`;

    refeicoes.forEach((ref) => {
      texto += `*${ref.titulo.toUpperCase()} (${ref.horario})*\n`;
      ref.opcoes.forEach((opc) => {
        texto += `  _${opc.titulo}_\n`;
        opc.alimentos.forEach((item) => {
          texto += `  • ${item.nome} - ${item.quantidade}${item.unidade}\n`;
        });
      });
      texto += `\n`;
    });

    texto += `_Dúvidas ou substituições? Fale diretamente comigo pelo chat oficial do app NutriSaaS!_`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  const categoriasDisponiveis = ['Todas', ...Array.from(new Set(baseAlimentos.map((i) => i.categoria)))];

  const alimentosFiltradosTaco = baseAlimentos.filter((item) => {
    const bateNome = item.nome.toLowerCase().includes(termoBusca.toLowerCase());
    const bateCategoria = categoriaFiltro === 'Todas' || item.categoria === categoriaFiltro;
    return bateNome && bateCategoria;
  });

  return (
    <div className="min-h-screen p-6 md:p-8 transition-colors duration-200 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Cabeçalho de Ações */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-gray-800 pb-4 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span>🥗</span> Montador de Dietas Clínico
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Prescrição com Opções de Substituição e Tabela TACO ({baseAlimentos.length} Alimentos).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-gray-900 dark:text-white"
          >
            <option value="Ana Silva">Paciente: Ana Silva</option>
            <option value="Lucas Mendes">Paciente: Lucas Mendes</option>
          </select>

          <button
            onClick={handleEnviarWhatsApp}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shadow-md"
          >
            <span>📱</span> Enviar via WhatsApp
          </button>

          <button
            onClick={handleExportarPDF}
            className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
          >
            <span>🖨️</span> Gerar PDF
          </button>
        </div>
      </div>

      {/* Modelos Clínicos Prontos */}
      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          Modelos Clínicos Prontos ({MODELOS_PRONTOS.length} Protocolos Disponíveis):
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {MODELOS_PRONTOS.map((modelo) => (
            <button
              key={modelo.id}
              onClick={() => carregarModelo(modelo)}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-emerald-500/50 p-3.5 rounded-xl text-left transition group shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{modelo.icone}</span>
                <p className="font-bold text-xs text-gray-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  {modelo.nome}
                </p>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                {modelo.descricao}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Grid Principal: Refeições + Calculadora */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Refeições e Opções */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Estrutura do Plano Alimentar
            </h2>
            <button
              onClick={() => {
                setNovoTituloRefeicao('');
                setNovoHorarioRefeicao('15:00');
                setModalNovaRefeicaoAberto(true);
              }}
              className="bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/20 px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1"
            >
              <span>➕</span> Adicionar Nova Refeição
            </button>
          </div>

          {refeicoes.length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-gray-900 border border-dashed border-gray-300 dark:border-gray-800 rounded-xl">
              <p className="text-sm text-gray-400">Nenhuma refeição cadastrada no plano.</p>
              <button
                onClick={() => setModalNovaRefeicaoAberto(true)}
                className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold"
              >
                + Criar Primeira Refeição
              </button>
            </div>
          ) : (
            refeicoes.map((refeicao) => (
              <div
                key={refeicao.id}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm space-y-4 relative group"
              >
                {/* Header da Refeição */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3 gap-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={refeicao.titulo}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRefeicoes((prev) =>
                          prev.map((r) => (r.id === refeicao.id ? { ...r, titulo: val } : r))
                        );
                      }}
                      className="bg-transparent font-bold text-sm text-emerald-600 dark:text-emerald-400 focus:outline-none border-b border-dashed border-gray-300 dark:border-gray-700"
                    />
                    <input
                      type="text"
                      value={refeicao.horario}
                      onChange={(e) => {
                        const val = e.target.value;
                        setRefeicoes((prev) =>
                          prev.map((r) => (r.id === refeicao.id ? { ...r, horario: val } : r))
                        );
                      }}
                      className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-0.5 rounded font-mono"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adicionarOpcaoSubstituicao(refeicao.id)}
                      className="bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/20 text-xs px-2.5 py-1 rounded font-semibold transition"
                    >
                      + Opção Substituição
                    </button>

                    <button
                      onClick={() => removerRefeicaoCompleta(refeicao.id)}
                      title="Excluir esta refeição"
                      className="text-rose-500 hover:bg-rose-500/10 p-1.5 rounded-lg text-xs font-bold transition border border-rose-500/20 flex items-center gap-1"
                    >
                      <span>🗑️</span> Excluir
                    </button>
                  </div>
                </div>

                {/* Bloco de Opções */}
                <div className="space-y-4">
                  {refeicao.opcoes.map((opcao, idxOpcao) => (
                    <div
                      key={opcao.id}
                      className="p-3.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-3"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          {opcao.titulo}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => abrirModalAdicionar(refeicao.id, opcao.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] px-2.5 py-1 rounded font-semibold transition"
                          >
                            + Alimento (TACO)
                          </button>

                          {idxOpcao > 0 && (
                            <button
                              onClick={() => removerOpcaoSubstituicao(refeicao.id, opcao.id)}
                              className="text-rose-500 hover:text-rose-600 text-xs font-semibold"
                            >
                              Excluir Opção
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Lista de Alimentos da Opção */}
                      {opcao.alimentos.length === 0 ? (
                        <p className="text-[11px] text-gray-400 italic py-1">
                          Nenhum alimento inserido. Clique em "+ Alimento (TACO)".
                        </p>
                      ) : (
                        <div className="space-y-1.5">
                          {opcao.alimentos.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 rounded-lg text-xs shadow-2xs"
                            >
                              <div className="flex-1">
                                <span className="font-semibold text-gray-800 dark:text-gray-200 block">
                                  {item.nome}
                                </span>
                                <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                  {item.quantidade} {item.unidade} • {item.categoria}
                                </span>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <span className="font-bold text-gray-700 dark:text-gray-300 block text-[11px]">
                                    {item.kcal} kcal
                                  </span>
                                  <span className="text-[9px] text-gray-400">
                                    P: {item.proteina}g | C: {item.carboidrato}g | G: {item.gordura}g
                                  </span>
                                </div>

                                <button
                                  onClick={() => removerAlimento(refeicao.id, opcao.id, item.id)}
                                  className="text-gray-400 hover:text-rose-500 text-xs font-bold px-1"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumo de Macros */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl shadow-sm space-y-6 sticky top-6">
            <h2 className="text-lg font-bold border-b border-gray-200 dark:border-gray-800 pb-2">
              📊 Totais & Balanço (Baseado na Opção 1)
            </h2>

            <div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-500 dark:text-gray-400">Meta Calórica Diária</span>
                <input
                  type="number"
                  value={metaKcal}
                  onChange={(e) => setMetaKcal(Number(e.target.value))}
                  className="w-20 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-0.5 text-right font-bold text-emerald-600 dark:text-emerald-400 focus:outline-none"
                />
              </div>

              <div className="w-full bg-gray-100 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    totais.kcal > metaKcal ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, (totais.kcal / metaKcal) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>Prescrito: {totais.kcal} kcal</span>
                <span>
                  {totais.kcal > metaKcal
                    ? `+${totais.kcal - metaKcal} kcal acima`
                    : `-${metaKcal - totais.kcal} kcal restantes`}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">
                    Proteínas Total
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {((totais.prot * 4) / (totais.kcal || 1) * 100).toFixed(0)}% das kcal
                  </span>
                </div>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {totais.prot}g
                </span>
              </div>

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 block">
                    Carboidratos Total
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {((totais.carbo * 4) / (totais.kcal || 1) * 100).toFixed(0)}% das kcal
                  </span>
                </div>
                <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  {totais.carbo}g
                </span>
              </div>

              <div className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 block">
                    Gorduras Total
                  </span>
                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                    {((totais.gord * 9) / (totais.kcal || 1) * 100).toFixed(0)}% das kcal
                  </span>
                </div>
                <span className="text-lg font-bold text-rose-600 dark:text-rose-400">
                  {totais.gord}g
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POP-UP: CRIAR NOVA REFEIÇÃO */}
      {modalNovaRefeicaoAberto && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-base text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <span>🍽️</span> Adicionar Nova Refeição
              </h3>
              <button
                onClick={() => setModalNovaRefeicaoAberto(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Nome da Refeição
                </label>
                <input
                  type="text"
                  placeholder="Ex: Almoço, Colação, Ceia, Pré-Treino..."
                  value={novoTituloRefeicao}
                  onChange={(e) => setNovoTituloRefeicao(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
                  Horário Previsto
                </label>
                <input
                  type="time"
                  value={novoHorarioRefeicao}
                  onChange={(e) => setNovoHorarioRefeicao(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setModalNovaRefeicaoAberto(false)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmarCriacaoRefeicao}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold transition shadow-md"
                >
                  Criar Refeição
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TACO COM FILTRO DE CATEGORIAS */}
      {modalBuscaAberto && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-xl shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-base text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <span>🔍</span> Tabela TACO/TBCA ({baseAlimentos.length} Alimentos Cadastrados)
              </h3>
              <button
                onClick={() => setModalBuscaAberto(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <input
                type="text"
                placeholder="Busque por nome (ex: Frango, Patinho, Salmão, Ovos)..."
                value={termoBusca}
                onChange={(e) => setTermoBusca(e.target.value)}
                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />

              <select
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2.5 text-xs text-gray-900 dark:text-white focus:outline-none"
              >
                {categoriasDisponiveis.map((cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <div className="w-28 flex items-center gap-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-2">
                <input
                  type="number"
                  value={qtdGramasBusca}
                  onChange={(e) => setQtdGramasBusca(Number(e.target.value))}
                  className="w-full bg-transparent text-xs font-bold text-right focus:outline-none"
                />
                <span className="text-[10px] text-gray-400">g</span>
              </div>
            </div>

            <button
              onClick={() => {
                setNovoNome(termoBusca);
                setModalNovoAlimentoAberto(true);
              }}
              className="w-full bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 py-2 rounded-lg text-xs font-semibold transition"
            >
              ➕ Não encontrou? Cadastrar suplemento/alimento personalizado
            </button>

            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {alimentosFiltradosTaco.length === 0 ? (
                <p className="text-xs text-gray-400 text-center py-4">Nenhum alimento encontrado.</p>
              ) : (
                alimentosFiltradosTaco.map((item, idx) => {
                  const fator = qtdGramasBusca / 100;
                  return (
                    <div
                      key={idx}
                      onClick={() => adicionarAlimentoTaco(item)}
                      className="p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-emerald-500/10 border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer transition flex justify-between items-center text-xs"
                    >
                      <div>
                        <p className="font-bold text-gray-800 dark:text-gray-200">{item.nome}</p>
                        <p className="text-[10px] text-gray-400">{item.categoria}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 block">
                          {Math.round(item.kcal * fator)} kcal
                        </span>
                        <span className="text-[10px] text-gray-400">
                          P:{(item.p * fator).toFixed(1)}g | C:{(item.c * fator).toFixed(1)}g | G:{(item.g * fator).toFixed(1)}g
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CADASTRO PERSONALIZADO */}
      {modalNovoAlimentoAberto && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <h3 className="font-bold text-base text-emerald-600 dark:text-emerald-400">
                ➕ Cadastrar Novo Alimento / Suplemento
              </h3>
              <button
                onClick={() => setModalNovoAlimentoAberto(false)}
                className="text-gray-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Nome do Alimento ou Marca</label>
                <input
                  type="text"
                  placeholder="Ex: Iogurte Hiperproteico X, Barra de Proteína Y"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-400 mb-1">Calorias / 100g (kcal)</label>
                  <input
                    type="number"
                    value={novoKcal}
                    onChange={(e) => setNovoKcal(Number(e.target.value))}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Proteínas / 100g (g)</label>
                  <input
                    type="number"
                    value={novoProt}
                    onChange={(e) => setNovoProt(Number(e.target.value))}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-gray-400 mb-1">Carboidratos / 100g (g)</label>
                  <input
                    type="number"
                    value={novoCarbo}
                    onChange={(e) => setNovoCarbo(Number(e.target.value))}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Gorduras / 100g (g)</label>
                  <input
                    type="number"
                    value={novoGord}
                    onChange={(e) => setNovoGord(Number(e.target.value))}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2"
                  />
                </div>
              </div>

              <button
                onClick={cadastrarEAdicionarAlimento}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-lg transition mt-2"
              >
                Salvar e Adicionar à Dieta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}