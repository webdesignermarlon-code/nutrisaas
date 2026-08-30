'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [isCadastro, setIsCadastro] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [lembrarDeMim, setLembrarDeMim] = useState(true)
  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  // Cadastro de Nutricionista
  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setMensagemSucesso('')
    setCarregando(true)

    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin

      const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
          data: {
            nome_completo: nome,
          },
          emailRedirectTo: `${siteUrl}/dashboard`,
        },
      })

      if (error) {
        setErro(error.message)
      } else if (data.user) {
        setMensagemSucesso(
          '📧 Cadastro efetuado com sucesso! Um e-mail de confirmação foi enviado para a sua caixa de entrada. Por favor, acesse seu e-mail e clique no link de ativação para liberar o seu acesso.'
        )
        setIsCadastro(false)
        setSenha('')
      }
    } catch (err: any) {
      setErro('Ocorreu um erro ao tentar realizar o cadastro.')
    } finally {
      setCarregando(false)
    }
  }

  // Login de Nutricionista
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setMensagemSucesso('')
    setCarregando(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      })

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          setErro('⚠️ Seu e-mail ainda não foi confirmado. Acesse sua caixa de entrada e clique no link de ativação enviado.')
        } else {
          setErro('E-mail ou senha incorretos.')
        }
      } else if (data.user) {
        if (!lembrarDeMim) {
          sessionStorage.setItem('nutrisaas-session-temp', 'true')
        }
        router.push('/dashboard')
      }
    } catch (err: any) {
      setErro('Erro de conexão ao realizar login.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6 shadow-2xl">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-emerald-500 tracking-tight">NutriSaaS</h1>
          <p className="text-xs text-slate-400">
            {isCadastro
              ? 'Crie sua conta profissional de nutricionista'
              : 'Acesse o seu painel de gestão nutricional'}
          </p>
        </div>

        {mensagemSucesso && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-xs leading-relaxed">
            {mensagemSucesso}
          </div>
        )}

        {erro && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-xs">
            {erro}
          </div>
        )}

        <form onSubmit={isCadastro ? handleCadastro : handleLogin} className="space-y-4">
          {isCadastro && (
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Nome Completo do Nutricionista</label>
              <input
                type="text"
                placeholder="Dra. Mariana Costa"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">E-mail Profissional</label>
            <input
              type="email"
              placeholder="seuemail@consultorio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Senha de Acesso</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs text-white focus:border-emerald-500 focus:outline-none"
              required
            />
          </div>

          {!isCadastro && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="lembrar"
                checked={lembrarDeMim}
                onChange={(e) => setLembrarDeMim(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
              <label htmlFor="lembrar" className="text-xs text-slate-400 cursor-pointer">
                Manter conectado neste dispositivo
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-xs transition shadow-lg shadow-emerald-500/10"
          >
            {carregando
              ? 'Processando...'
              : isCadastro
              ? 'Criar Conta & Enviar E-mail de Confirmação'
              : 'Entrar no Sistema'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-800/60">
          <button
            type="button"
            onClick={() => {
              setIsCadastro(!isCadastro)
              setErro('')
              setMensagemSucesso('')
            }}
            className="text-xs text-emerald-400 hover:underline font-semibold"
          >
            {isCadastro
              ? 'Já possui uma conta? Faça Login'
              : 'Não tem conta? Cadastre seu consultório'}
          </button>
        </div>

      </div>
    </div>
  )
}