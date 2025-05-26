'use client'

import { SignOutButton } from './SignOutButton'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import StaticSidebar from './StaticSidebar'
import { useAuth } from '@/context/AuthContext'

export function LayoutWithNav({ children }: { children: React.ReactNode }) {
  const { username } = useAuth()
  const pathname = usePathname()
  const isLoginPage = pathname === '/login'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      {!isLoginPage && (
        <>
          <nav className="bg-[#183D3D] text-white px-4 py-3 flex items-center justify-between">
            <span className="text-xl font-semibold italic">a Board</span>
            <div className="md:hidden">
              <Sidebar />
            </div>
            <div className="hidden md:flex items-center gap-4">
              <span>{username}</span>
              <SignOutButton />
            </div>
          </nav>


          <div className="grid grid-cols-6 gap-4">
            <div className="hidden md:block col-start-1 col-end-2">
              <aside className="w-64 bg-[#F5F5F5] text-white p-6 h-screen">
                <StaticSidebar />
              </aside>
            </div>
            <div className="col-span-6 md:col-start-2 md:col-end-6">
              {/* Main content */}
              <main className="flex-1 bg-[#F5F5F5] p-4">
                {children}
              </main>
            </div>
            <div className="hidden md:block col-start-6 col-end-7"></div>
          </div>
        </>
      )}
      <div>
        {isLoginPage && (
          <div>
            {children}
          </div>
        )}
      </div>
    </div >
  )
}
