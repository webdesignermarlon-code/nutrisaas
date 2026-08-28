'use client'

import { useState } from 'react'

export default function ChatPage() {
  const [paciente, setPaciente] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleEnviar = (e: React.FormEvent) => {
    e.preventDefault()
    if (!paciente || !mensagem) {
      alert('Por favor, informe o paciente e a mensagem.')
      return
    }
    alert(`Mensagem enviada com sucesso para ${paciente}!`)
    setPaciente('')
    setMensagem('')
  }

  return (
    <div className="space-y-6 text-slate-100">
      <h1 className="text-2xl font-bold text-emerald-400">Canal de Comunicação com Pacientes</h1>

      <form onSubmit={handleEnviar} className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Nome do Paciente / WhatsApp</label>
          <input
            type="text"
            placeholder="Ex: João Silva (+55 21 99999-9999)"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">Mensagem</label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            rows={4}
            placeholder="Olá! Como está o seguimento da dieta esta semana? Ficou com alguma dúvida sobre os alimentos?"
          />
        </div>

        <button
          type="submit"
          className="bg-emerald-500 font-bold text-slate-950 px-6 py-2.5 rounded-xl hover:bg-emerald-400"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  )
}