'use client'
import { Home, SquarePen } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function StaticSidebar() {
  const pathname = usePathname()

  const menu = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Our Blog', href: '/blog', icon: SquarePen },
  ]

  return (
    <ul className="space-y-4 text-md mt-5 text-black">
      {menu.map(({ name, href, icon: Icon }) => (
        <li key={href}>
          <Link
            href={href}
            className={`flex items-center gap-3 py-1 hover:underline ${pathname === href ? 'font-bold' : 'font-normal'
              }`}
          >
            <Icon className="w-5 h-5" />
            {name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
