'use client'

import { useState, useEffect } from 'react'

export default function CalculadorasPage() {
  const [isLight, setIsLight] = useState(false)
  const [peso, setPeso] = useState('')
  const [altura, setAltura] = useState('')
  const [idade, setIdade] = useState('')
  const [sexo, setSexo] = useState<'masculino' | 'feminino'>('masculino')
  const [gorduraCorporal, setGorduraCorporal] = useState('')
  const [fatorAtividade, setFatorAtividade] = useState('1.375') // Ligeiramente ativo
  const [formula, setFormula] = useState<'mifflin' | 'harris' | 'katch'>('mifflin')
  const [objetivo, setObjetivo] = useState<'manutencao' | 'emagrecimento' | 'hipertrofia'>('emagrecimento')

  const [resultado, setResultado] = useState<{
    imc: number
    classificacaoImc: string
    tmb: number
    tdee: number
    metaCalorica: number
    aguaDiariaLitros: number
    macros: { protG: number; carbG: number; gordG: number }
  } | null>(null)

  useEffect(() => {
    const checkTheme = () => {
      const theme = localStorage.getItem('nutrisaas-theme')
      setIsLight(theme === 'light')
    }
    checkTheme()
    window.addEventListener('storage', checkTheme)
    const interval = setInterval(checkTheme, 500)
    return () => {
      window.removeEventListener('storage', checkTheme)
      clearInterval(interval)
    }
  }, [])

  const calcularTudo = (e: React.FormEvent) => {
    e.preventDefault()

    const p = parseFloat(peso)
    const a = parseFloat(altura)
    const i = parseInt(idade)
    const fa = parseFloat(fatorAtividade)
    const bf = parseFloat(gorduraCorporal)

    if (!p || !a || !i) {
      alert('Por favor, preencha Peso, Altura e Idade para realizar o cálculo.')
      return
    }

    // 1. Cálculo de IMC
    const alturaM = a / 100
    const imcVal = p / (alturaM * alturaM)
    let classImc = ''

    if (imcVal < 18.5) classImc = 'Abaixo do peso'
    else if (imcVal < 24.9) classImc = 'Eutrofia (Peso Normal)'
    else if (imcVal < 29.9) classImc = 'Sobrepeso'
    else if (imcVal < 34.9) classImc = 'Obesidade Grau I'
    else if (imcVal < 39.9) classImc = 'Obesidade Grau II'
    else classImc = 'Obesidade Grau III (Mórbida)'

    // 2. Cálculo da TMB (Taxa Metabólica Basal)
    let tmbVal = 0

    if (formula === 'mifflin') {
      // Mifflin-St Jeor
      if (sexo === 'masculino') {
        tmbVal = 10 * p + 6.25 * a - 5 * i + 5
      } else {
        tmbVal = 10 * p + 6.25 * a - 5 * i - 161
      }
    } else if (formula === 'harris') {
      // Harris-Benedict (Revisada 1984)
      if (sexo === 'masculino') {
        tmbVal = 88.362 + 13.397 * p + 4.799 * a - 5.677 * i
      } else {
        tmbVal = 447.593 + 9.247 * p + 3.098 * a - 4.33 * i
      }
    } else if (formula === 'katch') {
      // Katch-McArdle (Requer % de Gordura)
      if (!bf) {
        alert('Para usar a fórmula de Katch-McArdle, informe o % de gordura corporal.')
        return
      }
      const massaMagra = p * (1 - bf / 100)
      tmbVal = 370 + 21.6 * massaMagra
    }

    // 3. TDEE / GET (Gasto Energético Total)
    const tdeeVal = tmbVal * fa

    // 4. Meta Calórica ajustada por objetivo
    let metaCal = tdeeVal
    if (objetivo === 'emagrecimento') metaCal = tdeeVal * 0.8 // Déficit de 20%
    if (objetivo === 'hipertrofia') metaCal = tdeeVal * 1.15 // Superávit de 15%

    // 5. Ingestão Hídrica Recomendada (35ml a 40ml por kg)
    const aguaL = (p * 35) / 1000

    // 6. Distribuição de Macronutrientes (Proteína: 2g/kg, Gordura: 0.9g/kg, Restante Carboidrato)
    const protG = Math.round(p * 2)
    const gordG = Math.round(p * 0.9)
    const calProtGord = protG * 4 + gordG * 9
    const calCarb = Math.max(0, metaCal - calProtGord)
    const carbG = Math.round(calCarb / 4)

    setResultado({
      imc: parseFloat(imcVal.toFixed(1)),
      classificacaoImc: classImc,
      tmb: Math.round(tmbVal),
      tdee: Math.round(tdeeVal),
      metaCalorica: Math.round(metaCal),
      aguaDiariaLitros: parseFloat(aguaL.toFixed(1)),
      macros: { protG, carbG, gordG },
    })
  }

  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgSubCard = isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950/60 border-slate-800'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-emerald-500">Calculadora Nutricional Clínica</h1>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Cálculo avançado de TMB, GET/TDEE, divisão de macronutrientes e meta de hidratação
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Formulário de Parâmetros */}
        <form onSubmit={calcularTudo} className={`rounded-2xl border p-6 space-y-4 ${bgCard}`}>
          <h2 className="text-sm font-bold border-b pb-2">Parâmetros Antropométricos e Estilo de Vida</h2>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Sexo Biológico</label>
              <select
                value={sexo}
                onChange={(e) => setSexo(e.target.value as any)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Idade (Anos)</label>
              <input
                type="number"
                placeholder="Ex: 30"
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Peso (kg)</label>
              <input
                type="number"
                step="0.1"
                placeholder="Ex: 70"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                required
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Altura (cm)</label>
              <input
                type="number"
                placeholder="Ex: 175"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                required
              />
            </div>
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>% Gordura (Opcional)</label>
              <input
                type="number"
                step="0.1"
                placeholder="Ex: 18"
                value={gorduraCorporal}
                onChange={(e) => setGorduraCorporal(e.target.value)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs mb-1 ${textLabel}`}>Fator de Atividade Física (FA)</label>
            <select
              value={fatorAtividade}
              onChange={(e) => setFatorAtividade(e.target.value)}
              className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
            >
              <option value="1.2">Sedentário (Pouco ou nenhum exercício)</option>
              <option value="1.375">Ligeiramente Ativo (Exercício leve 1-3 dias/sem)</option>
              <option value="1.55">Moderadamente Ativo (Exercício moderado 3-5 dias/sem)</option>
              <option value="1.725">Muito Ativo (Exercício pesado 6-7 dias/sem)</option>
              <option value="1.9">Extremamente Ativo (Atleta/Trabalho físico pesado)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Fórmula Metabólica</label>
              <select
                value={formula}
                onChange={(e) => setFormula(e.target.value as any)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
              >
                <option value="mifflin">Mifflin-St Jeor (Padrão Ouro)</option>
                <option value="harris">Harris-Benedict (Revisada)</option>
                <option value="katch">Katch-McArdle (Requer % Gordura)</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs mb-1 ${textLabel}`}>Objetivo Nutricional</label>
              <select
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value as any)}
                className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
              >
                <option value="emagrecimento">Emagrecimento (-20% kcal)</option>
                <option value="manutencao">Manutenção (Eucalórica)</option>
                <option value="hipertrofia">Hipertrofia / Ganho (+15% kcal)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10 mt-2"
          >
            🧮 Calcular Parâmetros do Paciente
          </button>
        </form>

        {/* Resultados das Métricas */}
        <div className={`rounded-2xl border p-6 space-y-4 ${bgCard}`}>
          <h2 className="text-sm font-bold border-b pb-2">Resultados Obtidos</h2>

          {!resultado ? (
            <div className={`p-8 rounded-xl border border-dashed text-center space-y-2 ${isLight ? 'border-slate-300 bg-slate-50' : 'border-slate-800 bg-slate-950/40'}`}>
              <span className="text-3xl block">📊</span>
              <p className="text-xs text-slate-400">Preencha os dados ao lado para ver as metas calóricas e de macronutrientes.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Cards de Métricas Rápidas */}
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-xl border space-y-1 ${bgSubCard}`}>
                  <span className="text-[11px] text-slate-400 font-semibold block">IMC</span>
                  <div className="text-xl font-bold text-emerald-500">{resultado.imc} kg/m²</div>
                  <span className="text-[10px] text-slate-400 block">{resultado.classificacaoImc}</span>
                </div>

                <div className={`p-3.5 rounded-xl border space-y-1 ${bgSubCard}`}>
                  <span className="text-[11px] text-slate-400 font-semibold block">TMB (Basal)</span>
                  <div className="text-xl font-bold text-sky-500">{resultado.tmb} kcal/dia</div>
                  <span className="text-[10px] text-slate-400 block">Gasto em repouso</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-xl border space-y-1 ${bgSubCard}`}>
                  <span className="text-[11px] text-slate-400 font-semibold block">GET / TDEE Total</span>
                  <div className="text-xl font-bold text-purple-500">{resultado.tdee} kcal/dia</div>
                  <span className="text-[10px] text-slate-400 block">Com atividade física</span>
                </div>

                <div className={`p-3.5 rounded-xl border space-y-1 ${bgSubCard}`}>
                  <span className="text-[11px] text-slate-400 font-semibold block">Meta Calórica Diária</span>
                  <div className="text-xl font-bold text-amber-500">{resultado.metaCalorica} kcal/dia</div>
                  <span className="text-[10px] text-slate-400 block">Ajustada para {objetivo}</span>
                </div>
              </div>

              {/* Distribuição de Macronutrientes */}
              <div className={`p-4 rounded-xl border space-y-2 ${bgSubCard}`}>
                <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-wide">
                  🥗 Distribuição Sugerida de Macronutrientes
                </h3>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-[10px] text-slate-400 block">Proteínas</span>
                    <span className="text-sm font-bold text-emerald-500">{resultado.macros.protG}g</span>
                  </div>
                  <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
                    <span className="text-[10px] text-slate-400 block">Carboidratos</span>
                    <span className="text-sm font-bold text-sky-500">{resultado.macros.carbG}g</span>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <span className="text-[10px] text-slate-400 block">Gorduras</span>
                    <span className="text-sm font-bold text-amber-500">{resultado.macros.gordG}g</span>
                  </div>
                </div>
              </div>

              {/* Hidratação Recomendada */}
              <div className={`p-3.5 rounded-xl border flex justify-between items-center ${bgSubCard}`}>
                <div>
                  <span className="text-xs font-bold block">💧 Meta Diária de Água</span>
                  <span className="text-[10px] text-slate-400">35ml por kg de peso corporal</span>
                </div>
                <span className="text-lg font-bold text-sky-500">{resultado.aguaDiariaLitros} Litros/dia</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}