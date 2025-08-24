'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Building2, 
  Target, 
  Users, 
  ShoppingCart, 
  Trophy, 
  Share2, 
  CreditCard, 
  Settings,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navigation = [
  { name: 'Ana Sayfa', href: '/', icon: Home },
  { name: 'Marka Yönetimi', href: '/brands', icon: Building2 },
  { name: 'Görev Yönetimi', href: '/missions', icon: Target },
  { name: 'Kullanıcı Yönetimi', href: '/users', icon: Users },
  { name: 'Market Yönetimi', href: '/market', icon: ShoppingCart },
  { name: 'Level Ayarları', href: '/levels', icon: Trophy },
  { name: 'Paylaşım Yönetimi', href: '/shares', icon: Share2 },
  { name: 'Finans & Lisanslar', href: '/finance', icon: CreditCard },
  { name: 'Ayarlar', href: '/settings', icon: Settings }
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-navy-900 to-blue-900 transform transition-transform duration-300 ease-in-out lg:hidden
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-turquoise-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            <span className="text-white font-semibold text-lg">Qappio</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200
                  ${isActive 
                    ? 'bg-white/20 text-white border-l-4 border-turquoise-400' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }
                `}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-navy-900 to-blue-900 transform transition-all duration-300 ease-in-out hidden lg:block
        ${collapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-turquoise-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Q</span>
            </div>
            {!collapsed && (
              <span className="text-white font-semibold text-lg">Qappio</span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="mt-6 px-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all duration-200 group
                  ${isActive 
                    ? 'bg-white/20 text-white border-l-4 border-turquoise-400' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                  }
                `}
                title={collapsed ? item.name : undefined}
              >
                <item.icon size={20} />
                {!collapsed && (
                  <span className="font-medium">{item.name}</span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.name}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
