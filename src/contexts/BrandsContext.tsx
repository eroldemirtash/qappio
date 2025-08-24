'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Brand {
  id: number
  name: string
  logo: string
  coverImage?: string
  email: string
  balance: number
  status: 'Aktif' | 'Pasif'
  category: string
  users: number
  missions: number
  totalShares: number
  followers: number
  createdAt: string
  license?: {
    type: 'Freemium' | 'Premium' | 'Platinium'
    startDate: string
    endDate: string
    price: number
    features: string[]
  }
  phone?: string
  website?: string
  description?: string
  address?: string
  foundedYear?: string
  socialMedia?: {
    instagram: string
    twitter: string
    facebook: string
    linkedin: string
  }
  followersList?: any[]
}

interface BrandsContextType {
  brands: Brand[]
  addBrand: (brand: Brand) => void
  updateBrand: (id: number, brand: Partial<Brand>) => void
  deleteBrand: (id: number) => void
  getBrandNames: () => string[]
  getBrandLogo: (brandName: string) => string | undefined
}

const BrandsContext = createContext<BrandsContextType | undefined>(undefined)

export function BrandsProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([
    {
      id: 1,
      name: 'Nike Türkiye',
      logo: 'https://picsum.photos/60/60?random=21',
      email: 'info@nike.com.tr',
      balance: 25000,
      status: 'Aktif',
      category: 'Spor Giyim',
      users: 1250,
      missions: 23,
      totalShares: 847,
      followers: 2847,
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      name: 'Coca-Cola',
      logo: 'https://picsum.photos/60/60?random=22',
      email: 'info@coca-cola.com.tr',
      balance: 18000,
      status: 'Aktif',
      category: 'İçecek',
      users: 890,
      missions: 15,
      totalShares: 623,
      followers: 1956,
      createdAt: '2024-01-02'
    },
    {
      id: 3,
      name: 'Samsung',
      logo: 'https://picsum.photos/60/60?random=23',
      email: 'info@samsung.com.tr',
      balance: 32000,
      status: 'Aktif',
      category: 'Teknoloji',
      users: 2100,
      missions: 31,
      totalShares: 1247,
      followers: 3421,
      createdAt: '2024-01-03'
    },
    {
      id: 4,
      name: 'McDonald\'s',
      logo: 'https://picsum.photos/60/60?random=24',
      email: 'info@mcdonalds.com.tr',
      balance: 15000,
      status: 'Aktif',
      category: 'Fast Food',
      users: 750,
      missions: 12,
      totalShares: 456,
      followers: 1289,
      createdAt: '2024-01-04'
    },
    {
      id: 5,
      name: 'Adidas',
      logo: 'https://picsum.photos/60/60?random=25',
      email: 'info@adidas.com.tr',
      balance: 22000,
      status: 'Aktif',
      category: 'Spor Giyim',
      users: 980,
      missions: 18,
      totalShares: 789,
      followers: 2156,
      createdAt: '2024-01-05'
    }
  ])

  const addBrand = (brand: Brand) => {
    setBrands(prev => [brand, ...prev])
  }

  const updateBrand = (id: number, brand: Partial<Brand>) => {
    setBrands(prev => prev.map(b => b.id === id ? { ...b, ...brand } : b))
  }

  const deleteBrand = (id: number) => {
    setBrands(prev => prev.filter(b => b.id !== id))
  }

  const getBrandNames = () => {
    return brands.map(brand => brand.name)
  }

  const getBrandLogo = (brandName: string) => {
    const brand = brands.find(b => b.name === brandName)
    return brand?.logo
  }

  return (
    <BrandsContext.Provider value={{
      brands,
      addBrand,
      updateBrand,
      deleteBrand,
      getBrandNames,
      getBrandLogo
    }}>
      {children}
    </BrandsContext.Provider>
  )
}

export function useBrands() {
  const context = useContext(BrandsContext)
  if (context === undefined) {
    throw new Error('useBrands must be used within a BrandsProvider')
  }
  return context
}
