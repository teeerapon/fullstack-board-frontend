'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, SquarePen } from 'lucide-react'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Our Blog', href: '/blog', icon: SquarePen },
  ]

  return (
    <>
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 top-2 right-10 z-50 text-white rounded"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-64 bg-[#183D3D] text-white p-6 transform transition-transform duration-300 z-40
        ${open ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 md:relative md:flex md:w-64`}
      >
        <ul className="space-y-4 text-lg mt-12 md:mt-0">
          {menuItems.map(({ name, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center space-x-3 py-1 hover:underline ${active ? 'font-bold' : 'font-normal'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Overlay (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
        />
      )}
    </>
  )
}
