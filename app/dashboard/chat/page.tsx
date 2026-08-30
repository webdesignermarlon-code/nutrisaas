'use client'

import { useState, useEffect } from 'react'

interface Mensagem {
  id: number
  remetente: 'nutri' | 'paciente'
  texto: string
  imagem?: string
  horario: string
}

interface ConversaPaciente {
  id: number
  nome: string
  whatsapp: string
  avatar: string
  statusOnline: boolean
  naoLidas: number
  mensagens: Mensagem[]
}

const conversasIniciais: ConversaPaciente[] = [
  {
    id: 1,
    nome: 'Mariana Costa',
    whatsapp: '21999998888',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    statusOnline: true,
    naoLidas: 1,
    mensagens: [
      {
        id: 101,
        remetente: 'nutri',
        texto: 'Olá, Mariana! Como está o seguimento do plano alimentar essa semana?',
        horario: '10:15',
      },
      {
        id: 102,
        remetente: 'paciente',
        texto: 'Oi Dra.! Está indo super bem. Consegui preparar o almoço exatamente como combinamos!',
        horario: '10:18',
      },
      {
        id: 103,
        remetente: 'paciente',
        texto: 'Olha como ficou o meu prato de hoje:',
        imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
        horario: '10:19',
      },
    ],
  },
  {
    id: 2,
    nome: 'Carlos Eduardo',
    whatsapp: '21988887777',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    statusOnline: false,
    naoLidas: 0,
    mensagens: [
      {
        id: 201,
        remetente: 'nutri',
        texto: 'Carlos, lembre-se de ingerir os 3 litros de água hoje devido ao treino pesado!',
        horario: 'Ontem 16:30',
      },
      {
        id: 202,
        remetente: 'paciente',
        texto: 'Perfeito! Já estou na segunda garrafa de 1L. Obrigado pelo lembrete!',
        horario: 'Ontem 17:00',
      },
    ],
  },
]

export default function ChatPage() {
  const [isLight, setIsLight] = useState(false)
  const [conversas, setConversas] = useState<ConversaPaciente[]>(conversasIniciais)
  const [conversaAtivaId, setConversaAtivaId] = useState<number>(1)
  const [textoMensagem, setTextoMensagem] = useState('')
  const [imagemAnexo, setImagemAnexo] = useState<string | null>(null)

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

  const conversaAtiva = conversas.find((c) => c.id === conversaAtivaId) || conversas[0]

  const handleUploadImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagemAnexo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault()
    if (!textoMensagem.trim() && !imagemAnexo) return

    const novaMsg: Mensagem = {
      id: Date.now(),
      remetente: 'nutri',
      texto: textoMensagem,
      imagem: imagemAnexo || undefined,
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }

    const conversasAtualizadas = conversas.map((c) => {
      if (c.id === conversaAtivaId) {
        return {
          ...c,
          mensagens: [...c.mensagens, novaMsg],
        }
      }
      return c
    })

    setConversas(conversasAtualizadas)
    setTextoMensagem('')
    setImagemAnexo(null)
  }

  const handleAbrirWhatsApp = (whatsapp: string) => {
    const num = whatsapp.replace(/\D/g, '')
    if (num) {
      window.open(`https://api.whatsapp.com/send?phone=55${num}`, '_blank')
    }
  }

  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgSubCard = isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
  const bgChatArea = isLight ? 'bg-slate-50/70' : 'bg-slate-950/80'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-emerald-500">Canal de Comunicação com Pacientes</h1>
        <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Acompanhe dúvidas, fotos de refeições e envio de mensagens para os seus pacientes
        </p>
      </div>

      {/* Grid Principal do Chat */}
      <div className={`rounded-2xl border grid grid-cols-1 md:grid-cols-3 overflow-hidden h-[680px] ${bgCard}`}>
        
        {/* Sidebar Esquerda - Lista de Conversas */}
        <div className={`border-r flex flex-col ${isLight ? 'border-slate-200 bg-slate-50/50' : 'border-slate-800 bg-slate-950/40'}`}>
          <div className="p-4 border-b border-slate-800/40">
            <h2 className="text-xs font-bold uppercase text-emerald-500">Conversas Recentes</h2>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/20">
            {conversas.map((c) => {
              const ultimaMsg = c.mensagens[c.mensagens.length - 1]
              const ativo = c.id === conversaAtivaId

              return (
                <button
                  key={c.id}
                  onClick={() => setConversaAtivaId(c.id)}
                  className={`w-full text-left p-4 flex items-center gap-3 transition ${
                    ativo
                      ? isLight ? 'bg-white border-l-4 border-l-emerald-500 shadow-sm' : 'bg-slate-800/80 border-l-4 border-l-emerald-500'
                      : isLight ? 'hover:bg-slate-100' : 'hover:bg-slate-900/60'
                  }`}
                >
                  <div className="relative">
                    <img src={c.avatar} alt={c.nome} className="w-11 h-11 rounded-full object-cover border border-slate-700" />
                    {c.statusOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-xs truncate">{c.nome}</span>
                      <span className="text-[10px] text-slate-400">{ultimaMsg?.horario}</span>
                    </div>
                    <p className={`text-xs truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                      {ultimaMsg?.imagem ? '📷 Foto enviada' : ultimaMsg?.texto}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Área Direita - Chat / Conversa do Paciente */}
        <div className="md:col-span-2 flex flex-col h-full">
          
          {/* Topo do Chat Ativo */}
          <div className={`p-4 border-b flex justify-between items-center ${isLight ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-900'}`}>
            <div className="flex items-center gap-3">
              <img src={conversaAtiva.avatar} alt={conversaAtiva.nome} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h2 className="font-bold text-sm">{conversaAtiva.nome}</h2>
                <span className="text-[10px] text-emerald-500 font-semibold">
                  {conversaAtiva.statusOnline ? '● Paciente Online' : 'Offline'}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleAbrirWhatsApp(conversaAtiva.whatsapp)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-600/10"
            >
              💬 Conversar no WhatsApp
            </button>
          </div>

          {/* Histórico de Mensagens */}
          <div className={`flex-1 p-4 overflow-y-auto space-y-4 ${bgChatArea}`}>
            {conversaAtiva.mensagens.map((msg) => {
              const eNutri = msg.remetente === 'nutri'

              return (
                <div key={msg.id} className={`flex ${eNutri ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[75%] p-3.5 rounded-2xl space-y-2 shadow-sm ${
                      eNutri
                        ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                        : isLight
                        ? 'bg-white border border-slate-200 text-slate-900 rounded-tl-none'
                        : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/60'
                    }`}
                  >
                    {msg.imagem && (
                      <div className="rounded-xl overflow-hidden border border-black/10">
                        <img src={msg.imagem} alt="Foto enviada" className="max-h-60 w-full object-cover" />
                      </div>
                    )}

                    {msg.texto && <p className="text-xs leading-relaxed whitespace-pre-wrap">{msg.texto}</p>}

                    <span className={`text-[9px] block text-right font-semibold ${eNutri ? 'text-slate-800/80' : 'text-slate-400'}`}>
                      {msg.horario}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pré-visualização de imagem antes de enviar */}
          {imagemAnexo && (
            <div className={`p-3 border-t flex items-center gap-3 ${bgSubCard}`}>
              <img src={imagemAnexo} alt="Anexo" className="w-14 h-14 rounded-lg object-cover border border-emerald-500" />
              <div className="flex-1 text-xs">
                <span className="font-bold text-emerald-500 block">Foto da refeição pronta para envio</span>
                <span className="text-[10px] text-slate-400">Clique em enviar para compartilhar com o paciente</span>
              </div>
              <button onClick={() => setImagemAnexo(null)} className="text-red-400 hover:text-red-300 text-xs font-bold">
                ✕ Remover
              </button>
            </div>
          )}

          {/* Form de Envio de Mensagem e Anexo de Foto */}
          <form onSubmit={handleEnviarMensagem} className={`p-4 border-t flex items-center gap-3 ${isLight ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-900'}`}>
            <label className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 cursor-pointer transition text-sm" title="Anexar foto ou arquivo">
              📷
              <input type="file" accept="image/*" onChange={handleUploadImagem} className="hidden" />
            </label>

            <input
              type="text"
              placeholder="Digite sua mensagem para o paciente..."
              value={textoMensagem}
              onChange={(e) => setTextoMensagem(e.target.value)}
              className={`flex-1 rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
            />

            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10"
            >
              Enviar
            </button>
          </form>

        </div>

      </div>
    </div>
  )
}