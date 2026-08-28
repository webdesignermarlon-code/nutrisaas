'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardIndex() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard/pacientes')
  }, [router])

  return (
    <div className="flex h-64 flex-col items-center justify-center space-y-3 text-slate-400">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      <p>Carregando painel...</p>
    </div>
  )
}