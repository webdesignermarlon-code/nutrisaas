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
      // Libera a página de login e a página de admin sem checar sessão de nutri
      if (pathname === '/' || pathname === '/admin') {
        setVerificando(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        router.push('/')
      } else {
        setVerificando(false)
      }
    }

    verificarSessao()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && pathname !== '/' && pathname !== '/admin') {
        router.push('/')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [pathname, router])

  if (verificando && pathname !== '/' && pathname !== '/admin') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-emerald-500 font-bold text-sm">
        Verificando credenciais de acesso...
      </div>
    )
  }

  return <>{children}</>
}