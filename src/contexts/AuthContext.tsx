'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface User {
  id: string
  email: string
  name?: string
  role: 'admin' | 'moderator'
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check for existing user session
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('qappio_admin_user')
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          setUser(userData)
        } catch (error) {
          localStorage.removeItem('qappio_admin_user')
        }
      }
    }
    setLoading(false)
  }, [])

  // Redirect to login if not authenticated and not on login page
  useEffect(() => {
    if (!loading && !user && pathname !== '/login') {
      router.push('/login')
    }
  }, [user, loading, pathname, router])

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      // Mock login - replace with actual API call
      if (email === 'admin@qappio.com' && password === 'admin123') {
        const userData: User = {
          id: '1',
          email: 'admin@qappio.com',
          name: 'Admin User',
          role: 'admin',
          avatar: 'https://i.pravatar.cc/150?img=1'
        }
        
        setUser(userData)
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('qappio_admin_user', JSON.stringify(userData))
        }
        
        router.push('/')
        return { success: true, message: 'Giriş başarılı!' }
      } else {
        return { success: false, message: 'Geçersiz e-posta veya şifre' }
      }
    } catch (error) {
      return { success: false, message: 'Giriş sırasında bir hata oluştu' }
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('qappio_admin_user')
    }
    router.push('/login')
  }

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
