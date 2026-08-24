'use client';

import React, { useState } from 'react';

export default function CalculadorasPage() {
  const [sexo, setSexo] = useState<'feminino' | 'masculino'>('feminino');
  const [idade, setIdade] = useState<number>(28);
  const [peso, setPeso] = useState<number>(68);
  const [altura, setAltura] = useState<number>(165);
  const [gordura, setGordura] = useState<number>(24);
  const [fatorAF, setFatorAF] = useState<number>(1.375); // Ligeiramente ativo
  const [proteinaGkg, setProteinaGkg] = useState<number>(2.0);

  // 1. Cálculo do IMC
  const alturaM = altura / 100;
  const imc = peso / (alturaM * alturaM);

  const getClassificacaoIMC = (imcVal: number) => {
    if (imcVal < 18.5) return { texto: 'Abaixo do Peso', cor: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    if (imcVal < 25) return { texto: 'Eutrofia (Peso Normal)', cor: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' };
    if (imcVal < 30) return { texto: 'Sobrepeso', cor: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' };
    if (imcVal < 35) return { texto: 'Obesidade Grau I', cor: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' };
    return { texto: 'Obesidade Severa', cor: 'text-rose-700 dark:text-rose-500', bg: 'bg-rose-600/20 border-rose-600/40' };
  };

  const statusIMC = getClassificacaoIMC(imc);

  // 2. Fórmulas de Taxa Metabólica Basal (TMB)
  // Mifflin-St Jeor
  const tmbMifflin = sexo === 'feminino'
    ? (10 * peso) + (6.25 * altura) - (5 * idade) - 161
    : (10 * peso) + (6.25 * altura) - (5 * idade) + 5;

  // Harris-Benedict
  const tmbHarris = sexo === 'feminino'
    ? 447.593 + (9.247 * peso) + (3.098 * altura) - (4.330 * idade)
    : 88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade);

  // Katch-McArdle (Massa Magra)
  const massaMagra = peso * (1 - (gordura / 100));
  const tmbKatch = 370 + (21.6 * massaMagra);

  // Gasto Energético Total (GET - Baseado em Mifflin)
  const getMifflin = tmbMifflin * fatorAF;
  const getHarris = tmbHarris * fatorAF;
  const getKatch = tmbKatch * fatorAF;

  // 3. Distribuição de Macros
  const proteinaGrama = peso * proteinaGkg;
  const proteinaKcal = proteinaGrama * 4;

  const gorduraKcal = getMifflin * 0.25; // 25% do GET em gordura
  const gorduraGrama = gorduraKcal / 9;

  const carboidratoKcal = Math.max(0, getMifflin - (proteinaKcal + gorduraKcal));
  const carboidratoGrama = carboidratoKcal / 4;

  return (
    <div className="min-h-screen p-6 md:p-8 transition-colors duration-200 bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Cabeçalho */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-4 mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
          <span>🧮</span> Calculadora Clínica & Fórmulas Energéticas
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Cálculos instantâneos de TMB, GET e divisão de macros para suporte na consulta clínica da Dra. Luana Santos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Painel Esquerdo: Entrada de Dados do Paciente */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-6">
          <h2 className="text-base font-bold text-emerald-600 dark:text-emerald-400 border-b border-gray-100 dark:border-gray-800 pb-3 flex items-center gap-2">
            <span>1.</span> Dados do Paciente
          </h2>

          {/* Sexo */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Sexo Biológico
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSexo('feminino')}
                className={`py-2.5 rounded-xl font-bold text-xs transition border ${
                  sexo === 'feminino'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Feminino
              </button>
              <button
                type="button"
                onClick={() => setSexo('masculino')}
                className={`py-2.5 rounded-xl font-bold text-xs transition border ${
                  sexo === 'masculino'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Masculino
              </button>
            </div>
          </div>

          {/* Idade e Peso */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Idade (anos)
              </label>
              <input
                type="number"
                value={idade}
                onChange={(e) => setIdade(Number(e.target.value))}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Peso (kg)
              </label>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(Number(e.target.value))}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
          </div>

          {/* Altura e % Gordura */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Altura (cm)
              </label>
              <input
                type="number"
                value={altura}
                onChange={(e) => setAltura(Number(e.target.value))}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                % Gordura (Opcional)
              </label>
              <input
                type="number"
                value={gordura}
                onChange={(e) => setGordura(Number(e.target.value))}
                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
              />
            </div>
          </div>

          {/* Nível de Atividade Física */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Nível de Atividade Física (Fator AF)
            </label>
            <select
              value={fatorAF}
              onChange={(e) => setFatorAF(Number(e.target.value))}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-xl p-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm cursor-pointer"
            >
              <option value={1.2}>Sedentário (Pouco ou nenhum exercício)</option>
              <option value={1.375}>Ligeiramente Ativo (Exercício leve 1 a 3 dias/sem)</option>
              <option value={1.55}>Moderadamente Ativo (Exercício moderado 3 a 5 dias/sem)</option>
              <option value={1.725}>Muito Ativo (Exercício pesado 6 a 7 dias/sem)</option>
              <option value={1.9}>Extremamente Ativo (Atleta / Treino pesado diário)</option>
            </select>
          </div>

          {/* Meta de Proteína g/kg */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Meta de Proteína (g/kg)
              </label>
              <span className="text-xs font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-md">
                {proteinaGkg} g/kg
              </span>
            </div>
            <input
              type="range"
              min="1.2"
              max="3.0"
              step="0.1"
              value={proteinaGkg}
              onChange={(e) => setProteinaGkg(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Painel Direito: Resultados Calculados */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: ÍNDICE DE MASSA CORPORAL (IMC) */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ÍNDICE DE MASSA CORPORAL (IMC)
              </h3>
              <span className={`text-xs font-bold px-3 py-1 rounded-lg border ${statusIMC.bg} ${statusIMC.cor}`}>
                {statusIMC.texto}
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {imc.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">kg/m²</span>
            </div>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Faixa de Eutrofia esperada para adultos: 18.5 a 24.9 kg/m²
            </p>
          </div>

          {/* Card 2: COMPARATIVO DE TMB E GET */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span>🔥</span> Taxa Metabólica Basal (TMB) e GET por Equação
              </h3>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                Comparativo Automático
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Mifflin-St Jeor */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                  MIFFLIN-ST JEOR (RECOMENDADA)
                </span>
                <p className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-400">
                  {Math.round(tmbMifflin)} <span className="text-xs font-normal">kcal TMB</span>
                </p>
                <div className="pt-2 border-t border-emerald-500/20 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Gasto Total (GET): <strong className="text-gray-900 dark:text-white">{Math.round(getMifflin)} kcal</strong>
                </div>
              </div>

              {/* Harris-Benedict */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                  HARRIS-BENEDICT
                </span>
                <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">
                  {Math.round(tmbHarris)} <span className="text-xs font-normal">kcal TMB</span>
                </p>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Gasto Total (GET): <strong className="text-gray-900 dark:text-white">{Math.round(getHarris)} kcal</strong>
                </div>
              </div>

              {/* Katch-McArdle */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                  KATCH-MCARDLE (% GORDURA)
                </span>
                <p className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">
                  {Math.round(tmbKatch)} <span className="text-xs font-normal">kcal TMB</span>
                </p>
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Gasto Total (GET): <strong className="text-gray-900 dark:text-white">{Math.round(getKatch)} kcal</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: DISTRIBUIÇÃO DE MACRONUTRIENTES */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
              <span>🥩</span> Distribuição de Macronutrientes Prescrita
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Proteínas */}
              <div className="p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl space-y-1">
                <span className="text-xs font-bold text-blue-700 dark:text-blue-400 block">Proteínas</span>
                <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-300">
                  {Math.round(proteinaGrama)}g <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">/ dia</span>
                </p>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  {Math.round(proteinaKcal)} kcal ({proteinaGkg} g/kg)
                </p>
              </div>

              {/* Carboidratos */}
              <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl space-y-1">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block">Carboidratos</span>
                <p className="text-3xl font-extrabold text-amber-900 dark:text-amber-300">
                  {Math.round(carboidratoGrama)}g <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">/ dia</span>
                </p>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  {Math.round(carboidratoKcal)} kcal (Restante da Meta)
                </p>
              </div>

              {/* Gorduras Boas */}
              <div className="p-4 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 rounded-xl space-y-1">
                <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block">Gorduras Boas</span>
                <p className="text-3xl font-extrabold text-rose-900 dark:text-rose-300">
                  {Math.round(gorduraGrama)}g <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">/ dia</span>
                </p>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  {Math.round(gorduraKcal)} kcal (25% do GET)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}