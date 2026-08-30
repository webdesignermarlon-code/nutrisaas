'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

interface NutricionistaAdmin {
  id: string
  email: string
  nome: string
  status: 'Ativo' | 'Bloqueado' | 'Inadimplente'
  whatsapp: string
  criadoEm: string
}

export default function AdminPage() {
  const [isLight, setIsLight] = useState(false)
  const [isAdminLogado, setIsAdminLogado] = useState(false)
  const [senhaAdmin, setSenhaAdmin] = useState('')
  const [erroLogin, setErroLogin] = useState('')

  // Lista de profissionais cadastrados (simulada/gerenciada no banco ou localStorage)
  const [nutris, setNutris] = useState<NutricionistaAdmin[]>([
    {
      id: '1',
      nome: 'Marlon Andrade de Oliveira',
      email: 'marlon@nutrisaas.com',
      whatsapp: '21999998888',
      status: 'Ativo',
      criadoEm: '2026-03-01',
    },
    {
      id: '2',
      nome: 'Dra. Mariana Costa',
      email: 'mariana.nutri@gmail.com',
      whatsapp: '21988887777',
      status: 'Ativo',
      criadoEm: '2026-03-10',
    },
    {
      id: '3',
      nome: 'Dr. Carlos Eduardo',
      email: 'carlos.junior@outlook.com',
      whatsapp: '21977776666',
      status: 'Inadimplente',
      criadoEm: '2026-02-15',
    },
  ])

  // Modal de Disparo WhatsApp
  const [modalWhats, setModalWhats] = useState<NutricionistaAdmin | null>(null)
  const [tipoMensagem, setTipoMensagem] = useState<'bloqueio' | 'pagamento' | 'atualizacao'>('bloqueio')
  const [textoPersonalizado, setTextoPersonalizado] = useState('')

  useEffect(() => {
    const checkTheme = () => {
      const theme = localStorage.getItem('nutrisaas-theme')
      setIsLight(theme === 'light')
    }
    checkTheme()

    // Carrega dados salvos do localStorage se houver
    const salvos = localStorage.getItem('nutrisaas-admin-nutris')
    if (salvos) {
      try {
        setNutris(JSON.parse(salvos))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const salvarNutris = (novaLista: NutricionistaAdmin[]) => {
    setNutris(novaLista)
    localStorage.setItem('nutrisaas-admin-nutris', JSON.stringify(novaLista))
  }

  // Senha de Segurança Admin Master (Você pode alterar conforme preferir)
  const handleLoginAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    if (senhaAdmin === 'admin123' || senhaAdmin === 'marlon2026') {
      setIsAdminLogado(true)
      setErroLogin('')
    } else {
      setErroLogin('Senha de Administrador incorreta.')
    }
  }

  const alternarStatus = (id: string, novoStatus: 'Ativo' | 'Bloqueado' | 'Inadimplente') => {
    const atualizada = nutris.map((n) => (n.id === id ? { ...n, status: novoStatus } : n))
    salvarNutris(atualizada)
  }

  const excluirNutri = (id: string, nome: string) => {
    if (confirm(`Tem certeza que deseja remover o acesso de "${nome}" permanentemente?`)) {
      const filtrada = nutris.filter((n) => n.id !== id)
      salvarNutris(filtrada)
    }
  }

  const enviarWhatsAppAdmin = (nutri: NutricionistaAdmin) => {
    const num = nutri.whatsapp.replace(/\D/g, '')
    if (!num) {
      alert('Este profissional não possui um número de WhatsApp cadastrado.')
      return
    }

    let msg = ''
    if (tipoMensagem === 'bloqueio') {
      msg = `⚠️ *AVISO IMPORTANTE - NUTRISAAS*\n\nOlá, *${nutri.nome}*.\nIdentificamos pendências relativas à sua assinatura do NutriSaaS. Seu acesso ao sistema encontra-se *bloqueado*. Para regularizar seu pagamento e reativar imediatamente o seu painel, por favor entre em contato conosco ou acesse a central de assinaturas.`
    } else if (tipoMensagem === 'pagamento') {
      msg = `💳 *LEMBRETE DE PAGAMENTO - NUTRISAAS*\n\nOlá, *${nutri.nome}*!\nSua mensalidade do software NutriSaaS está próxima do vencimento. Evite interrupções no atendimento aos seus pacientes regularizando sua assinatura.`
    } else {
      msg = `🚀 *NOVIDADES E ATUALIZAÇÕES NO NUTRISAAS*\n\nOlá, *${nutri.nome}*!\nLançamos novas ferramentas incríveis no seu painel de gestão nutricional (banco com +180 suplementos, escaneamento corporal DEXA e chat com envio de fotos). Acesse agora e confira!`
    }

    const url = `https://api.whatsapp.com/send?phone=55${num}&text=${encodeURIComponent(msg)}`
    window.open(url, '_blank')
    setModalWhats(null)
  }

  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-800 text-white'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  // Se não estiver logado como Admin, exibe tela de segurança Master
  if (!isAdminLogado) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
          <div className="text-center space-y-2">
            <span className="text-3xl block">🔐</span>
            <h1 className="text-2xl font-extrabold text-emerald-500">Painel Master (Admin)</h1>
            <p className="text-xs text-slate-400">Área restrita de gestão de licenças, bloqueios e acessos</p>
          </div>

          {erroLogin && <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs">{erroLogin}</div>}

          <form onSubmit={handleLoginAdmin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Senha de Administrador Master</label>
              <input
                type="password"
                placeholder="••••••••"
                value={senhaAdmin}
                onChange={(e) => setSenhaAdmin(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10"
            >
              Acessar Painel Master
            </button>
          </form>

          <div className="text-center pt-2">
            <Link href="/dashboard" className="text-xs text-emerald-400 hover:underline">
              ← Voltar para o Dashboard de Nutricionista
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen p-6 max-w-7xl mx-auto space-y-6 ${isLight ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'}`}>
      
      {/* Topo do Admin */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4 border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-emerald-500">Painel Master Admin</h1>
            <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] px-2.5 py-0.5 rounded-full font-bold">
              👑 Acesso Master Autorizado
            </span>
          </div>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Gerenciamento global de nutricionistas, controle de acessos, bloqueios e disparos automáticos via WhatsApp
          </p>
        </div>

        <Link
          href="/dashboard"
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm"
        >
          Ir para o Sistema (Nutri)
        </Link>
      </div>

      {/* Cards de Métricas Rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className={`p-4 rounded-2xl border ${bgCard}`}>
          <span className="text-xs text-slate-400 font-semibold block">Total de Profissionais</span>
          <span className="text-2xl font-extrabold text-emerald-500">{nutris.length}</span>
        </div>
        <div className={`p-4 rounded-2xl border ${bgCard}`}>
          <span className="text-xs text-slate-400 font-semibold block">Contas Ativas</span>
          <span className="text-2xl font-extrabold text-sky-500">
            {nutris.filter((n) => n.status === 'Ativo').length}
          </span>
        </div>
        <div className={`p-4 rounded-2xl border ${bgCard}`}>
          <span className="text-xs text-slate-400 font-semibold block">Inadimplentes / Bloqueados</span>
          <span className="text-2xl font-extrabold text-red-500">
            {nutris.filter((n) => n.status === 'Bloqueado' || n.status === 'Inadimplente').length}
          </span>
        </div>
        <div className={`p-4 rounded-2xl border ${bgCard}`}>
          <span className="text-xs text-slate-400 font-semibold block">Faturamento Estimado</span>
          <span className="text-2xl font-extrabold text-amber-500">R$ {(nutris.filter(n => n.status === 'Ativo').length * 97).toLocaleString('pt-BR')},00</span>
        </div>
      </div>

      {/* Tabela de Gestão de Nutricionistas */}
      <div className={`rounded-2xl border overflow-hidden ${bgCard}`}>
        <div className="p-4 border-b border-slate-800/40 flex justify-between items-center">
          <h2 className="text-sm font-bold uppercase text-emerald-500">Profissionais Cadastrados na Plataforma</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b text-[10px] font-bold uppercase ${isLight ? 'bg-slate-100 text-slate-600' : 'bg-slate-950 text-slate-400'}`}>
                <th className="p-4">Profissional</th>
                <th className="p-4">WhatsApp</th>
                <th className="p-4">Data Cadastro</th>
                <th className="p-4">Status da Assinatura</th>
                <th className="p-4 text-right">Ações & Bloqueios / WhatsApp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {nutris.map((n) => (
                <tr key={n.id} className={isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-950/40'}>
                  <td className="p-4 font-bold">
                    <div>{n.nome}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{n.email}</div>
                  </td>
                  <td className="p-4">{n.whatsapp || 'Não informado'}</td>
                  <td className="p-4">{n.criadoEm}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        n.status === 'Ativo'
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : n.status === 'Inadimplente'
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}
                    >
                      {n.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      {/* Botões de Status */}
                      {n.status !== 'Ativo' && (
                        <button
                          onClick={() => alternarStatus(n.id, 'Ativo')}
                          className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 font-bold px-2 py-1 rounded-lg text-[10px]"
                        >
                          ✓ Ativar
                        </button>
                      )}
                      {n.status !== 'Inadimplente' && (
                        <button
                          onClick={() => alternarStatus(n.id, 'Inadimplente')}
                          className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 border border-amber-500/20 font-bold px-2 py-1 rounded-lg text-[10px]"
                        >
                          ⚠️ Inadimplente
                        </button>
                      )}
                      {n.status !== 'Bloqueado' && (
                        <button
                          onClick={() => alternarStatus(n.id, 'Bloqueado')}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 font-bold px-2 py-1 rounded-lg text-[10px]"
                        >
                          🔒 Bloquear
                        </button>
                      )}

                      {/* Botão de Disparo WhatsApp */}
                      <button
                        onClick={() => setModalWhats(n)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-lg text-[10px] flex items-center gap-1 shadow-sm"
                        title="Enviar mensagem via WhatsApp"
                      >
                        💬 WhatsApp
                      </button>

                      <button
                        onClick={() => excluirNutri(n.id, n.nome)}
                        className="text-red-400 hover:text-red-300 font-bold px-1.5 py-1 text-xs"
                        title="Excluir profissional"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Disparo WhatsApp */}
      {modalWhats && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 space-y-4 ${bgCard}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-emerald-500">Enviar WhatsApp para: {modalWhats.nome}</h3>
              <button onClick={() => setModalWhats(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`block text-xs mb-1 ${textLabel}`}>Selecione o Modelo de Mensagem</label>
                <select
                  value={tipoMensagem}
                  onChange={(e) => setTipoMensagem(e.target.value as any)}
                  className={`w-full rounded-xl border p-2.5 text-xs ${bgInput}`}
                >
                  <option value="bloqueio">🔒 Aviso de Bloqueio de Acesso por Inadimplência</option>
                  <option value="pagamento">💳 Lembrete de Renovação de Pagamento</option>
                  <option value="atualizacao">🚀 Informativo de Novas Atualizações do Sistema</option>
                </select>
              </div>

              <div className="p-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs space-y-1">
                <span className="font-bold text-emerald-500 block">Prévia da Mensagem:</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  {tipoMensagem === 'bloqueio' && `⚠️ Aviso: Seu acesso ao NutriSaaS encontra-se bloqueado por pendência na assinatura. Regularize para reativar.`}
                  {tipoMensagem === 'pagamento' && `💳 Lembrete: Sua mensalidade do NutriSaaS vence em breve. Evite interrupções no atendimento.`}
                  {tipoMensagem === 'atualizacao' && `🚀 Novidades: Lançamos novas ferramentas no NutriSaaS (banco de suplementos e chat com fotos). Acesse já!`}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setModalWhats(null)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold ${isLight ? 'border-slate-300' : 'border-slate-800'}`}
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => enviarWhatsAppAdmin(modalWhats)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition shadow-md"
              >
                Enviar via WhatsApp 💬
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}