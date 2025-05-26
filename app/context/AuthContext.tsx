'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  username: string | null
  signIn: (username: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('username')
    if (stored) setUsername(stored)
  }, [])

  const signIn = (name: string) => {
    localStorage.setItem('username', name)
    setUsername(name)
    router.push('/')
  }

  const signOut = () => {
    localStorage.removeItem('username')
    setUsername(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
