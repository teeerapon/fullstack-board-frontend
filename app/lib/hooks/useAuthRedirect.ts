'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useAuthRedirect() {
  const router = useRouter()

  useEffect(() => {
    const username = localStorage.getItem('username')
    if (!username) {
      router.push('/login')
    }
  }, [router])
}
