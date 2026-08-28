'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboard/pacientes')
  }, [router])

  return (
    <div className="flex h-64 items-center justify-center text-slate-400">
      Redirecionando para o painel...
    </div>
  )
}