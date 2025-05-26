'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export function SignOutButton() {
  const { signOut, username } = useAuth()
  const router = useRouter()
  const isLoggedIn = !!username

  const handleClick = async () => {
    if (isLoggedIn) {
      await signOut()

      Swal.fire({
        icon: 'success',
        title: 'Signed out successfully!',
        showConfirmButton: false,
        timer: 1500,
      })

      router.push('/')
    } else {
      router.push('/login')
    }
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-1 rounded bg-[#5C8374] text-white"
    >
      {isLoggedIn ? 'Sign out' : 'Sign in'}
    </button>
  )
}
