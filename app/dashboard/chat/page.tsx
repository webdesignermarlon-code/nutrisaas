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
  avatar?: string
  mensagens: Mensagem[]
}

export default function ChatPage() {
  const [isLight, setIsLight] = useState(false)
  
  // Estado das conversas salvas no banco do profissional
  const [conversas, setConversas] = useState<ConversaPaciente[]>([])
  const [conversaAtivaId, setConversaAtivaId] = useState<number | null>(null)

  // Modais e inputs de novo paciente
  const [modalNovoChat, setModalNovoChat] = useState(false)
  const [novoNome, setNovoNome] = useState('')
  const [novoWhatsapp, setNovoWhatsapp] = useState('')

  // Inputs de envio de mensagem
  const [textoMensagem, setTextoMensagem] = useState('')
  const [imagemAnexo, setImagemAnexo] = useState<string | null>(null)

  useEffect(() => {
    // 1. Checa tema Claro / Escuro
    const checkTheme = () => {
      const theme = localStorage.getItem('nutrisaas-theme')
      setIsLight(theme === 'light')
    }
    checkTheme()

    // 2. Carrega as conversas salvas do profissional
    const conversasSalvas = localStorage.getItem('nutrisaas-chat-db')
    if (conversasSalvas) {
      try {
        const parsed = JSON.parse(conversasSalvas)
        setConversas(parsed)
        if (parsed.length > 0) {
          setConversaAtivaId(parsed[0].id)
        }
      } catch (e) {
        console.error('Erro ao carregar banco de chats', e)
      }
    } else {
      // Tenta puxar pacientes cadastrados na aba Pacientes caso não exista chat ainda
      const pacientesSalvos = localStorage.getItem('nutrisaas-pacientes-db')
      if (pacientesSalvos) {
        try {
          const pacientes = JSON.parse(pacientesSalvos)
          const chatsIniciais: ConversaPaciente[] = pacientes.map((p: any) => ({
            id: p.id,
            nome: p.nome,
            whatsapp: p.telefone || '',
            mensagens: [
              {
                id: Date.now(),
                remetente: 'nutri',
                texto: `Olá ${p.nome}, seja bem-vindo(a) ao acompanhamento nutricional! Como posso te ajudar hoje?`,
                horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
              },
            ],
          }))
          setConversas(chatsIniciais)
          if (chatsIniciais.length > 0) setConversaAtivaId(chatsIniciais[0].id)
          localStorage.setItem('nutrisaas-chat-db', JSON.stringify(chatsIniciais))
        } catch (e) {
          console.error(e)
        }
      }
    }

    window.addEventListener('storage', checkTheme)
    const interval = setInterval(checkTheme, 500)
    return () => {
      window.removeEventListener('storage', checkTheme)
      clearInterval(interval)
    }
  }, [])

  // Função central para salvar conversas no banco local do profissional
  const salvarConversasNoBanco = (novasConversas: ConversaPaciente[]) => {
    setConversas(novasConversas)
    localStorage.setItem('nutrisaas-chat-db', JSON.stringify(novasConversas))
  }

  // Criar um novo chat/paciente sob demanda
  const handleCriarNovoChat = (e: React.FormEvent) => {
    e.preventDefault()
    if (!novoNome) return

    const novoChat: ConversaPaciente = {
      id: Date.now(),
      nome: novoNome,
      whatsapp: novoWhatsapp,
      mensagens: [
        {
          id: Date.now(),
          remetente: 'nutri',
          texto: `Olá ${novoNome}! Canal de atendimento iniciado. Como podemos te orientar no seu plano alimentar?`,
          horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    }

    const listaAtualizada = [novoChat, ...conversas]
    salvarConversasNoBanco(listaAtualizada)
    setConversaAtivaId(novoChat.id)

    setNovoNome('')
    setNovoWhatsapp('')
    setModalNovoChat(false)
  }

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
    if ((!textoMensagem.trim() && !imagemAnexo) || !conversaAtivaId) return

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

    salvarConversasNoBanco(conversasAtualizadas)
    setTextoMensagem('')
    setImagemAnexo(null)
  }

  const handleAbrirWhatsApp = (whatsapp: string) => {
    const num = whatsapp.replace(/\D/g, '')
    if (num) {
      window.open(`https://api.whatsapp.com/send?phone=55${num}`, '_blank')
    } else {
      alert('Por favor, cadastre um número de WhatsApp com DDD para este paciente.')
    }
  }

  const conversaAtiva = conversas.find((c) => c.id === conversaAtivaId)

  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-100'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const bgSubCard = isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950 border-slate-800'
  const bgChatArea = isLight ? 'bg-slate-50/70' : 'bg-slate-950/80'
  const textLabel = isLight ? 'text-slate-600 font-semibold' : 'text-slate-400'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-emerald-500">Canal de Comunicação com Pacientes</h1>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Atendimento direto, troca de mensagens, fotos de refeições e orientações nutricionais
          </p>
        </div>

        <button
          onClick={() => setModalNovoChat(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10 flex items-center gap-1.5"
        >
          + Iniciar Novo Chat / Paciente
        </button>
      </div>

      {/* Grid Principal do Chat */}
      <div className={`rounded-2xl border grid grid-cols-1 md:grid-cols-3 overflow-hidden h-[680px] ${bgCard}`}>
        
        {/* Sidebar Esquerda - Lista de Conversas do Profissional */}
        <div className={`border-r flex flex-col ${isLight ? 'border-slate-200 bg-slate-50/50' : 'border-slate-800 bg-slate-950/40'}`}>
          <div className="p-4 border-b border-slate-800/40 flex justify-between items-center">
            <h2 className="text-xs font-bold uppercase text-emerald-500">Seus Pacientes em Atendimento</h2>
            <span className="text-[10px] text-slate-400 font-semibold">{conversas.length} cadastrados</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/20">
            {conversas.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">
                Nenhum chat aberto. Clique no botão acima para adicionar seu primeiro paciente.
              </div>
            ) : (
              conversas.map((c) => {
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
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-bold flex items-center justify-center text-sm">
                      {c.nome.charAt(0).toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-xs truncate">{c.nome}</span>
                        <span className="text-[10px] text-slate-400">{ultimaMsg?.horario}</span>
                      </div>
                      <p className={`text-xs truncate ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                        {ultimaMsg?.imagem ? '📷 Foto enviada' : ultimaMsg?.texto || 'Inicie a conversa...'}
                      </p>
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Área Direita - Chat com o Paciente Selecionado */}
        <div className="md:col-span-2 flex flex-col h-full">
          {!conversaAtiva ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
              <span className="text-4xl block">💬</span>
              <p className="text-sm font-semibold">Nenhum paciente selecionado</p>
              <p className="text-xs text-slate-400">Escolha um paciente da lista ao lado ou inicie um novo chat.</p>
            </div>
          ) : (
            <>
              {/* Topo do Chat Ativo */}
              <div className={`p-4 border-b flex justify-between items-center ${isLight ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-900'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 font-bold flex items-center justify-center text-sm">
                    {conversaAtiva.nome.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-bold text-sm">{conversaAtiva.nome}</h2>
                    <span className="text-[10px] text-slate-400">
                      {conversaAtiva.whatsapp ? `WhatsApp: ${conversaAtiva.whatsapp}` : 'Canal interno de atendimento'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAbrirWhatsApp(conversaAtiva.whatsapp)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 shadow-md shadow-emerald-600/10"
                >
                  💬 Abrir no WhatsApp
                </button>
              </div>

              {/* Histórico de Mensagens do Chat */}
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
                            <img src={msg.imagem} alt="Foto da refeição" className="max-h-60 w-full object-cover" />
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

              {/* Anexo de Imagem em Pré-visualização */}
              {imagemAnexo && (
                <div className={`p-3 border-t flex items-center gap-3 ${bgSubCard}`}>
                  <img src={imagemAnexo} alt="Anexo" className="w-14 h-14 rounded-lg object-cover border border-emerald-500" />
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-emerald-500 block">Foto da refeição pronta para envio</span>
                    <span className="text-[10px] text-slate-400">Clique em Enviar para anexar no prontuário do paciente</span>
                  </div>
                  <button onClick={() => setImagemAnexo(null)} className="text-red-400 hover:text-red-300 text-xs font-bold">
                    ✕ Remover
                  </button>
                </div>
              )}

              {/* Form de Envio */}
              <form onSubmit={handleEnviarMensagem} className={`p-4 border-t flex items-center gap-3 ${isLight ? 'border-slate-200 bg-white' : 'border-slate-800 bg-slate-900'}`}>
                <label className="p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 cursor-pointer transition text-sm" title="Anexar foto do prato/refeição">
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
            </>
          )}
        </div>

      </div>

      {/* Modal para Abrir Novo Chat sob demanda */}
      {modalNovoChat && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 space-y-4 ${bgCard}`}>
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base text-emerald-500">+ Iniciar Atendimento com Paciente</h3>
              <button onClick={() => setModalNovoChat(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCriarNovoChat} className="space-y-4">
              <div>
                <label className={`block text-xs mb-1 ${textLabel}`}>Nome Completo do Paciente *</label>
                <input
                  type="text"
                  placeholder="Ex: Juliana Alencar"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                  required
                />
              </div>

              <div>
                <label className={`block text-xs mb-1 ${textLabel}`}>WhatsApp (com DDD)</label>
                <input
                  type="text"
                  placeholder="Ex: 21999998888"
                  value={novoWhatsapp}
                  onChange={(e) => setNovoWhatsapp(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalNovoChat(false)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold ${isLight ? 'border-slate-300' : 'border-slate-800'}`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Criar Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}