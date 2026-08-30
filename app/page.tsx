'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [isLight, setIsLight] = useState(false)
  const [isCadastro, setIsCadastro] = useState(false)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [lembrarDeMim, setLembrarDeMim] = useState(true)
  const [mensagemSucesso, setMensagemSucesso] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  useEffect(() => {
    const theme = localStorage.getItem('nutrisaas-theme')
    setIsLight(theme === 'light')
  }, [])

  const toggleTheme = () => {
    const nextTheme = isLight ? 'dark' : 'light'
    setIsLight(!isLight)
    localStorage.setItem('nutrisaas-theme', nextTheme)
  }

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
          data: { nome_completo: nome },
          emailRedirectTo: `${siteUrl}/dashboard`,
        },
      })

      if (error) {
        setErro(error.message)
      } else if (data.user) {
        setMensagemSucesso(
          '📧 Cadastro efetuado com sucesso! Um e-mail de confirmação foi enviado para sua caixa de entrada. Por favor, clique no link de ativação para liberar o seu acesso.'
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
          setErro('⚠️ Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada e clique no link de ativação.')
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

  const bgPage = isLight ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'
  const bgCard = isLight ? 'bg-white border-slate-200 text-slate-900 shadow-xl' : 'bg-slate-900 border-slate-800 text-slate-100 shadow-2xl'
  const bgInput = isLight ? 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400' : 'bg-slate-950 border-slate-800 text-white'
  const textDesc = isLight ? 'text-slate-600' : 'text-slate-400'

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative ${bgPage}`}>
      
      {/* Botão de Alternar Tema no Topo Direito */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleTheme}
          className={`px-3.5 py-2 rounded-xl border text-xs font-semibold transition ${
            isLight ? 'bg-white border-slate-300 text-slate-700 shadow-sm' : 'bg-slate-900 border-slate-800 text-slate-300'
          }`}
        >
          {isLight ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
        </button>
      </div>

      <div className={`w-full max-w-md border p-8 rounded-3xl space-y-6 ${bgCard}`}>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-emerald-500 tracking-tight">NutriSaaS</h1>
          <p className={`text-xs ${textDesc}`}>
            {isCadastro
              ? 'Crie sua conta profissional de nutricionista'
              : 'Acesse o seu painel de gestão nutricional'}
          </p>
        </div>

        {mensagemSucesso && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-2xl text-xs leading-relaxed">
            {mensagemSucesso}
          </div>
        )}

        {erro && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-2xl text-xs">
            {erro}
          </div>
        )}

        <form onSubmit={isCadastro ? handleCadastro : handleLogin} className="space-y-4">
          {isCadastro && (
            <div>
              <label className={`block text-xs font-semibold mb-1 ${textDesc}`}>Nome Completo do Nutricionista</label>
              <input
                type="text"
                placeholder="Dra. Mariana Costa"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={`w-full rounded-xl border p-3 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
                required
              />
            </div>
          )}

          <div>
            <label className={`block text-xs font-semibold mb-1 ${textDesc}`}>E-mail Profissional</label>
            <input
              type="email"
              placeholder="seuemail@consultorio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-xl border p-3 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
              required
            />
          </div>

          <div>
            <label className={`block text-xs font-semibold mb-1 ${textDesc}`}>Senha de Acesso</label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className={`w-full rounded-xl border p-3 text-xs focus:border-emerald-500 focus:outline-none ${bgInput}`}
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
              <label htmlFor="lembrar" className={`text-xs cursor-pointer ${textDesc}`}>
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

        <div className={`text-center pt-2 border-t ${isLight ? 'border-slate-200' : 'border-slate-800'}`}>
          <button
            type="button"
            onClick={() => {
              setIsCadastro(!isCadastro)
              setErro('')
              setMensagemSucesso('')
            }}
            className="text-xs text-emerald-500 hover:underline font-semibold"
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