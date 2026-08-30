'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [verificando, setVerificando] = useState(true)

  useEffect(() => {
    const verificarSessao = async () => {
      // Se estiver na raiz (página de login), não bloqueia
      if (pathname === '/') {
        setVerificando(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        // Sem sessão ativa, redireciona imediatamente para o login
        router.push('/')
      } else {
        setVerificando(false)
      }
    }

    verificarSessao()

    // Ouve mudanças de estado de autenticação (ex: logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && pathname !== '/') {
        router.push('/')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [pathname, router])

  if (verificando && pathname !== '/') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500 font-bold text-sm">
        Verificando credenciais de acesso...
      </div>
    )
  }

  return <>{children}</>
}