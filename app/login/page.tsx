'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseAnonKey)

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [crn, setCrn] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    if (searchParams.get('tab') === 'register') {
      setMode('register')
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (mode === 'register') {
        // Realiza o cadastro real no Supabase Auth
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              crn: crn,
              role: 'nutri',
            },
          },
        })

        if (error) throw error

        setMessage({
          text: 'Cadastro realizado com sucesso! Enviamos um e-mail de confirmação para você.',
          type: 'success',
        })
      } else {
        // Login no Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        localStorage.setItem('user_email', email)
        if (data.user?.user_metadata?.full_name) {
          localStorage.setItem('user_name', data.user.user_metadata.full_name)
        }

        router.push('/dashboard/nutri')
      }
    } catch (err: any) {
      setMessage({
        text: err.message || 'Ocorreu um erro ao processar. Verifique os dados.',
        type: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl backdrop-blur-xl">
      {/* LOGO */}
      <div className="mb-6 text-center">
        <Link href="/" className="inline-block text-3xl font-black text-emerald-400">
          🌱 NutriSaaS
        </Link>
        <p className="mt-2 text-xs text-slate-400">Plataforma de Gestão Nutricional</p>
      </div>

      {/* ABAS ENTRAR / CRIAR CONTA */}
      <div className="mb-6 flex rounded-xl border border-slate-800 bg-slate-950 p-1">
        <button
          type="button"
          onClick={() => {
            setMode('login')
            setMessage(null)
          }}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
            mode === 'login'
              ? 'bg-emerald-500 text-slate-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('register')
            setMessage(null)
          }}
          className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all ${
            mode === 'register'
              ? 'bg-emerald-500 text-slate-950'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Criar Conta
        </button>
      </div>

      {/* MENSAGEM DE ERRO OU SUCESSO */}
      {message && (
        <div
          className={`mb-4 rounded-lg p-3 text-xs font-semibold ${
            message.type === 'success'
              ? 'border border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
              : 'border border-red-500/30 bg-red-500/10 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* FORMULÁRIO */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-300">
                Nome Completo
              </label>
              <input
                type="text"
                required
                placeholder="Dra. Nome Sobrenome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-300">
                CRN (Registro Profissional)
              </label>
              <input
                type="text"
                required
                placeholder="CRN-4 12345"
                value={crn}
                onChange={(e) => setCrn(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </>
        )}

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-300">
            E-mail Profissional
          </label>
          <input
            type="email"
            required
            placeholder="seuemail@nutri.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-300">
            Senha
          </label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-emerald-500 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
        >
          {loading
            ? 'Processando...'
            : mode === 'login'
            ? 'Entrar no Sistema'
            : 'Criar Minha Conta'}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        NutriSaaS © {new Date().getFullYear()} • Todos os direitos reservados.
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-slate-100">
      <Suspense fallback={<div className="text-white">Carregando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}