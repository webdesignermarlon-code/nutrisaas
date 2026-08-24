'use client';

import React, { useState } from 'react';

interface SolicitacaoExame {
  id: string;
  categoria: string;
  item: string;
  selecionado: boolean;
}

const EXAMES_LABORATORIAIS_BASE: SolicitacaoExame[] = [
  // Hematologia & Glicemia
  { id: 'ex_1', categoria: 'Hematologia & Metabolismo', item: 'Hemograma Completo', selecionado: true },
  { id: 'ex_2', categoria: 'Hematologia & Metabolismo', item: 'Glicemia de Jejum', selecionado: true },
  { id: 'ex_3', categoria: 'Hematologia & Metabolismo', item: 'Insulina de Jejum + HOMA-IR', selecionado: true },
  { id: 'ex_4', categoria: 'Hematologia & Metabolismo', item: 'Hemoglobina Glicada (HbA1c)', selecionado: false },
  
  // Perfil Lipídico
  { id: 'ex_5', categoria: 'Perfil Lipídico', item: 'Colesterol Total e Frações (HDL, LDL, VLDL)', selecionado: true },
  { id: 'ex_6', categoria: 'Perfil Lipídico', item: 'Triglicerídeos', selecionado: true },
  
  // Micronutrientes & Vitaminas
  { id: 'ex_7', categoria: 'Vitaminas & Minerais', item: 'Vitamina D (25-OH-Vitamina D)', selecionado: true },
  { id: 'ex_8', categoria: 'Vitaminas & Minerais', item: 'Vitamina B12 (Cobalamina)', selecionado: true },
  { id: 'ex_9', categoria: 'Vitaminas & Minerais', item: 'Ferritina e Ferro Sérico', selecionado: true },
  { id: 'ex_10', categoria: 'Vitaminas & Minerais', item: 'Zinco e Magnésio Sérico', selecionado: false },

  // Função Renal & Hepática
  { id: 'ex_11', categoria: 'Função Renal & Hepática', item: 'Ureia e Creatinina', selecionado: true },
  { id: 'ex_12', categoria: 'Função Renal & Hepática', item: 'TGO (AST) e TGP (ALT)', selecionado: true },
  { id: 'ex_13', categoria: 'Função Renal & Hepática', item: 'Gama GT e Ácido Úrico', selecionado: false },

  // Perfil Hormonal
  { id: 'ex_14', categoria: 'Hormônios & Tireoide', item: 'TSH e T4 Livre', selecionado: true },
  { id: 'ex_15', categoria: 'Hormônios & Tireoide', item: 'Testosterona Total e Livre', selecionado: false },
  { id: 'ex_16', categoria: 'Hormônios & Tireoide', item: 'Cortisol Basal (Manhã)', selecionado: false },
];

export default function GestaoExamesPage() {
  const [paciente, setPaciente] = useState('Ana Silva');
  const [exames, setExames] = useState<SolicitacaoExame[]>(EXAMES_LABORATORIAIS_BASE);
  const [observacoesExame, setObservacoesExame] = useState('Jejum de 8 a 12 horas conforme orientação do laboratório.');

  // Configurações do Profissional & Endereço
  const [nomeProfissional, setNomeProfissional] = useState('Dra. Luana Santos');
  const [crn, setCrn] = useState('12345/RJ');
  const [endereco, setEndereco] = useState('Rua Centro, 123 - Sala 402 - Rio das Ostras, RJ');
  const [telefone, setTelefone] = useState('(22) 99999-8888');
  const [exibirRodape, setExibirRodape] = useState(true);
  const [mostrarConfig, setMostrarConfig] = useState(false);

  const toggleExame = (id: string) => {
    setExames((prev) =>
      prev.map((e) => (e.id === id ? { ...e, selecionado: !e.selecionado } : e))
    );
  };

  const examesSelecionados = exames.filter((e) => e.selecionado);

  const handleGerarPDFOuImprimir = () => {
    document.title = `Guia_Exames_${paciente.replace(/\s+/g, '_')}`;
    window.print();
  };

  const handleEnviarWhatsApp = () => {
    let texto = `*EXAMES LABORATORIAIS - ${paciente.toUpperCase()}*\n`;
    texto += `*Profissional:* ${nomeProfissional} (CRN ${crn})\n\n`;
    texto += `*SOLICITAÇÃO DE EXAMES:* \n\n`;
    
    examesSelecionados.forEach((e) => {
      texto += ` • ${e.item}\n`;
    });
    
    if (observacoesExame) {
      texto += `\n_Obs: ${observacoesExame}_\n\n`;
    }

    texto += `📄 *Acesse ou baixe o PDF oficial no link abaixo:*\nhttps://nutrisaas.com.br/pdf/guia-${paciente.toLowerCase().replace(/\s+/g, '-')}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  // Separa SOMENTE OS SELECIONADOS em 2 colunas
  const metade = Math.ceil(examesSelecionados.length / 2);
  const col1Pdf = examesSelecionados.slice(0, metade);
  const col2Pdf = examesSelecionados.slice(metade);

  return (
    <div className="min-h-screen p-6 md:p-8 transition-colors duration-200 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* CSS Específico para Ocultar Cabeçalhos do Navegador na Impressão/PDF */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 15mm 10mm 15mm 10mm;
          }
          body {
            background-color: #ffffff !important;
            color: #000000 !important;
          }
          body * {
            visibility: hidden;
          }
          #folha-timbrada-print, #folha-timbrada-print * {
            visibility: visible;
          }
          #folha-timbrada-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

      {/* ======================================================== */}
      {/* FOLHA TIMBRADA EXCLUSIVA PARA PDF / IMPRESSÃO */}
      {/* ======================================================== */}
      <div id="folha-timbrada-print" className="hidden print:block print:p-4 print:bg-white print:text-black font-sans w-full text-xs">
        {/* Topo Timbrado */}
        <div className="flex justify-between items-start mb-6 border-b-2 border-rose-600 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-4xl">🍎</span>
          </div>
          <div className="text-right">
            <h1 className="text-xl font-bold text-rose-600">{nomeProfissional}</h1>
            <p className="text-[11px] text-gray-600 font-semibold">Nutrição Clínica & Funcional</p>
            <p className="text-[10px] text-gray-500">CRN - {crn}</p>
          </div>
        </div>

        {/* Título Central */}
        <h2 className="text-center font-bold text-base uppercase mb-6 tracking-wider underline">
          SOLICITAÇÃO DE EXAMES LABORATORIAIS
        </h2>

        {/* Nome do Paciente */}
        <div className="mb-6 font-semibold border-b border-black pb-1.5 flex justify-between text-sm">
          <div>
            <span>Para: </span>
            <span className="font-bold ml-2">{paciente}</span>
          </div>
          <div className="text-xs text-gray-600 font-mono">
            Data: {new Date().toLocaleDateString('pt-BR')}
          </div>
        </div>

        <p className="font-bold mb-4">Solicito os seguintes exames laboratoriais:</p>

        {/* Grid de 2 Colunas APENAS COM OS EXAMES SELECIONADOS */}
        {examesSelecionados.length === 0 ? (
          <p className="italic text-gray-500 py-4">Nenhum exame foi selecionado.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-8 text-xs">
            <div className="space-y-1.5">
              {col1Pdf.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border border-black inline-block text-center text-[10px] leading-tight font-bold">
                    ✓
                  </span>
                  <span className="font-semibold text-gray-900">{item.item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1.5">
              {col2Pdf.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border border-black inline-block text-center text-[10px] leading-tight font-bold">
                    ✓
                  </span>
                  <span className="font-semibold text-gray-900">{item.item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Observações da Nutricionista */}
        {observacoesExame && (
          <div className="mb-8 p-3 border border-dashed border-gray-400 text-xs italic bg-gray-50/50 rounded">
            <strong>Instruções / Observações:</strong> {observacoesExame}
          </div>
        )}

        {/* Assinatura do Profissional */}
        <div className="pt-16 text-center space-y-1">
          <div className="w-64 border-t border-black mx-auto"></div>
          <p className="font-bold text-xs">{nomeProfissional}</p>
          <p className="text-[10px] text-gray-600">Nutricionista • CRN {crn}</p>
        </div>

        {/* Textos Legais de Validade do CFN */}
        <div className="mt-12 text-[8px] text-gray-500 leading-tight space-y-1 border-t pt-3">
          <p>
            <strong>RESOLUÇÃO CFN Nº 306/2003 E RESOLUÇÃO CFN Nº 236/2000:</strong> Compete ao nutricionista a solicitação de exames laboratoriais necessários à avaliação, prescrição e evolução nutricional do paciente.
          </p>
        </div>

        {/* Rodapé com Endereço Opcional */}
        {exibirRodape && (endereco || telefone) && (
          <div className="mt-6 text-center text-[9px] text-gray-500 border-t pt-2 space-y-0.5">
            {endereco && <p>📍 {endereco}</p>}
            {telefone && <p>📞 {telefone}</p>}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* INTERFACE PRINCIPAL DO SISTEMA (TELA) */}
      {/* ======================================================== */}
      <div className="print:hidden">
        {/* Cabeçalho de Ações */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 dark:border-gray-800 pb-4 mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span>📑</span> Solicitação de Exames Laboratoriais
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Marque os exames necessários e gere a guia oficial timbrada em PDF.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setMostrarConfig(!mostrarConfig)}
              className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 px-3.5 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
            >
              <span>⚙️</span> Editar Endereço / Dados
            </button>

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
              onClick={handleGerarPDFOuImprimir}
              className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-md"
            >
              <span>📄</span> Gerar Guia em PDF / Imprimir
            </button>
          </div>
        </div>

        {/* PAINEL DE CONFIGURAÇÃO DE ENDEREÇO E CABEÇALHO */}
        {mostrarConfig && (
          <div className="mb-6 p-5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-800 pb-2">
              ⚙️ Dados do Profissional & Endereço Impresso no Rodapé
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-gray-600 dark:text-gray-400 font-semibold mb-1">
                  Nome da Nutricionista
                </label>
                <input
                  type="text"
                  value={nomeProfissional}
                  onChange={(e) => setNomeProfissional(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-gray-600 dark:text-gray-400 font-semibold mb-1">
                  CRN
                </label>
                <input
                  type="text"
                  value={crn}
                  onChange={(e) => setCrn(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-gray-600 dark:text-gray-400 font-semibold mb-1">
                  Endereço do Consultório
                </label>
                <input
                  type="text"
                  placeholder="Ex: Rua Centro, 123 - Sala 402 - Rio de Janeiro, RJ"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-gray-600 dark:text-gray-400 font-semibold mb-1">
                  Telefone / WhatsApp
                </label>
                <input
                  type="text"
                  placeholder="(21) 99999-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-2 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-gray-700 dark:text-gray-300">
                <input
                  type="checkbox"
                  checked={exibirRodape}
                  onChange={(e) => setExibirRodape(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                />
                <span>Exibir Endereço e Telefone no Rodapé do PDF/Impressão</span>
              </label>
            </div>
          </div>
        )}

        {/* SELEÇÃO DE EXAMES EM CATEGORIAS NA TELA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wider">
              Marque os exames que devem constar no pedido:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from(new Set(exames.map((e) => e.categoria))).map((cat) => (
                <div
                  key={cat}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-sm space-y-3"
                >
                  <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-800 pb-2">
                    {cat}
                  </h3>
                  <div className="space-y-2">
                    {exames
                      .filter((e) => e.categoria === cat)
                      .map((exame) => (
                        <label
                          key={exame.id}
                          className="flex items-center gap-2 text-xs cursor-pointer text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                        >
                          <input
                            type="checkbox"
                            checked={exame.selecionado}
                            onChange={() => toggleExame(exame.id)}
                            className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                          />
                          <span className={exame.selecionado ? 'font-bold text-emerald-600 dark:text-emerald-400' : ''}>
                            {exame.item}
                          </span>
                        </label>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAINEL LATERAL DE RESUMO */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm space-y-4 h-fit sticky top-6">
            <h3 className="font-bold text-sm border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center justify-between">
              <span>📋 Resumo do Pedido</span>
              <span className="text-xs text-emerald-500 font-mono">
                {examesSelecionados.length} selecionados
              </span>
            </h3>

            <div className="space-y-2 text-xs">
              <p className="text-gray-500 dark:text-gray-400">
                <strong className="text-gray-800 dark:text-gray-200">Paciente:</strong> {paciente}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                <strong className="text-gray-800 dark:text-gray-200">Profissional:</strong> {nomeProfissional} (CRN {crn})
              </p>
            </div>

            <div className="border-t border-b border-gray-100 dark:border-gray-800 py-3 max-h-60 overflow-y-auto space-y-1.5 text-xs">
              {examesSelecionados.length === 0 ? (
                <p className="text-gray-400 italic text-center py-2">Nenhum exame selecionado.</p>
              ) : (
                examesSelecionados.map((e) => (
                  <div key={e.id} className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>• {e.item}</span>
                    <button
                      onClick={() => toggleExame(e.id)}
                      className="text-rose-500 hover:text-rose-600 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Instruções / Observações ao Laboratório:
              </label>
              <textarea
                rows={2}
                value={observacoesExame}
                onChange={(e) => setObservacoesExame(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-2 text-xs focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}