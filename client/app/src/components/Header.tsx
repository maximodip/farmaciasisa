'use client'
import clsx from 'clsx'
import { Home, Users, Package, Menu, X, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavLinkProps {
  href: string
  icon: LucideIcon
  children: React.ReactNode
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const NavLink = ({ href, icon: Icon, children }: NavLinkProps) => (
    <Link
      href={href}
      className={clsx(
        'flex items-center space-x-2 px-3 py-2 rounded-md transition-colors',
        pathname === href
          ? 'text-emerald-600'
          : 'text-gray-600 hover:text-emerald-600'
      )}
    >
      <Icon size={18} />
      <span>{children}</span>
    </Link>
  )

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
            >
              <Image
                src={'/logo.jpg'}
                alt="logo de farmacia sisa"
                width={50}
                height={50}
              />
              <span className="text-2xl font-semibold">Farmacia Sisa</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-1 max-sm:hidden">
            <NavLink href="/" icon={Home}>
              Inicio
            </NavLink>
            <NavLink href="/productos" icon={Package}>
              Productos
            </NavLink>
            {/* <NavLink href="/clientes" icon={Users}>
              Clientes
            </NavLink> */}
          </nav>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-emerald-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <a
                href="/"
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                <span>Inicio</span>
              </a>

              <a
                href="/productos"
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package size={18} />
                <span>Productos</span>
              </a>

              <a
                href="/clientes"
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users size={18} />
                <span>Clientes</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
