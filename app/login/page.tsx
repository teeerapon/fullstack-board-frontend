'use client'

import { useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const { signIn } = useAuth()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) return
    signIn(username)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#183D3D]">
      {/* Mobile Top Logo Section */}
      <div className="md:hidden bg-[#5C8374] h-[320px] rounded-b-[40px] flex items-center justify-center">
        <div className="text-center">
          <Image
            src="/images/pngtree.png"
            alt="a board"
            width={160}
            height={160}
            className="mx-auto"
          />
          <p className="text-white mt-4 text-lg italic">a Board</p>
        </div>
      </div>

      {/* ซ้าย (หรือด้านล่างใน mobile): ฟอร์ม login */}
      <div className="flex-1 flex items-center justify-center bg-[#183D3D] p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-white">Sign in</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            type="submit"
            className="w-full py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Desktop Right Side Image (ซ่อนไว้ใน mobile) */}
      <div className="hidden md:flex md:flex-1 items-center justify-center bg-[#5C8374] h-screen">
        <div className="text-center">
          <Image
            src="/images/pngtree.png"
            alt="a board"
            width={160}
            height={160}
            className="mx-auto"
          />
          <p className="text-white mt-4 text-lg italic">a Board</p>
        </div>
      </div>
    </div>
  )
}
