'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { DollarSign, CreditCard, Receipt, TrendingUp, TrendingDown, Calendar, Download, Eye, X, Plus, Search, Filter, Grid, List, Edit, Trash2, Building2, BarChart3, PieChart, LineChart, FileText, Package, ShoppingBag } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

interface LicensePlan {
  id: string
  name: 'Freemium' | 'Premium' | 'Platinum'
  price: number
  currency: 'TL' | 'USD'
  perShareFee: number
  monthlyTaskLimit: number
  maxTaskDuration: number
  userDataSharing: 'Var' | 'Yok'
  weeklyTaskRights: number
  sponsoredTaskRights: number
  features: string[]
  color: string
  isActive: boolean
}

interface Brand {
  id: string
  name: string
  logo: string
  currentPlan?: string
  assignedAt?: string
}

interface MarketItem {
  id: string
  name: string
  brand: string
  imageUrl: string
  quantitySold: number
  totalQPSpent: number
  lastSold: string
  totalUploaded: number
  currentStock: number
  price: number
  category: string
}

const mockLicensePlans: LicensePlan[] = [
  {
    id: '1',
    name: 'Freemium',
      price: 0,
    currency: 'TL',
    perShareFee: 0.5,
    monthlyTaskLimit: 10,
    maxTaskDuration: 7,
    userDataSharing: 'Yok',
    weeklyTaskRights: 2,
    sponsoredTaskRights: 0,
    features: ['Temel görev yönetimi', 'E-posta destek', 'Temel raporlar'],
    color: 'bg-gray-500',
    isActive: true
  },
  {
    id: '2',
    name: 'Premium',
    price: 99,
    currency: 'TL',
    perShareFee: 0.2,
    monthlyTaskLimit: 50,
    maxTaskDuration: 30,
    userDataSharing: 'Var',
    weeklyTaskRights: 12,
    sponsoredTaskRights: 5,
    features: ['Gelişmiş görev yönetimi', 'Öncelikli destek', 'Detaylı analitik', 'Özel entegrasyonlar'],
    color: 'bg-blue-500',
    isActive: true
  },
  {
    id: '3',
    name: 'Platinum',
      price: 299,
    currency: 'TL',
    perShareFee: 0.1,
    monthlyTaskLimit: 200,
    maxTaskDuration: 90,
    userDataSharing: 'Var',
    weeklyTaskRights: 50,
    sponsoredTaskRights: 20,
    features: ['Sınırsız görev yönetimi', '7/24 destek', 'Özel API erişimi', 'Özel entegrasyonlar', 'Öncelikli özellikler'],
    color: 'bg-purple-500',
    isActive: true
  }
]

const mockBrands: Brand[] = [
  { id: '1', name: 'Nike Türkiye', logo: 'https://picsum.photos/40/40?random=1' },
  { id: '2', name: 'Coca-Cola', logo: 'https://picsum.photos/40/40?random=2' },
  { id: '3', name: 'Samsung', logo: 'https://picsum.photos/40/40?random=3' },
  { id: '4', name: 'Adidas', logo: 'https://picsum.photos/40/40?random=4' }
]

const mockMarketItems: MarketItem[] = [
  { 
    id: '1', 
    name: 'iPhone 15 Pro', 
    brand: 'Apple', 
    imageUrl: 'https://picsum.photos/60/60?random=1',
    quantitySold: 25, 
    totalQPSpent: 125000, 
    lastSold: '2024-01-15',
    totalUploaded: 100,
    currentStock: 75,
    price: 5000,
    category: 'Elektronik & Teknoloji'
  },
  { 
    id: '2', 
    name: 'Nike Air Max', 
    brand: 'Nike', 
    imageUrl: 'https://picsum.photos/60/60?random=2',
    quantitySold: 150, 
    totalQPSpent: 45000, 
    lastSold: '2024-01-20',
    totalUploaded: 200,
    currentStock: 50,
    price: 300,
    category: 'Spor & Outdoor'
  },
  { 
    id: '3', 
    name: 'Samsung Galaxy S24', 
    brand: 'Samsung', 
    imageUrl: 'https://picsum.photos/60/60?random=3',
    quantitySold: 30, 
    totalQPSpent: 90000, 
    lastSold: '2024-01-18',
    totalUploaded: 80,
    currentStock: 50,
    price: 3000,
    category: 'Elektronik & Teknoloji'
  },
  { 
    id: '4', 
    name: 'Coca-Cola Hediye Paketi', 
    brand: 'Coca-Cola', 
    imageUrl: 'https://picsum.photos/60/60?random=4',
    quantitySold: 500, 
    totalQPSpent: 25000, 
    lastSold: '2024-01-22',
    totalUploaded: 1000,
    currentStock: 500,
    price: 50,
    category: 'Yiyecek & İçecek'
  }
]

export default function FinancePage() {
  const [licensePlans, setLicensePlans] = useState<LicensePlan[]>(mockLicensePlans)
  const [brands, setBrands] = useState<Brand[]>(mockBrands)
  const [marketItems, setMarketItems] = useState<MarketItem[]>(mockMarketItems)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<LicensePlan | null>(null)
  const [viewingPlan, setViewingPlan] = useState<LicensePlan | null>(null)
  const [newPlan, setNewPlan] = useState<Omit<LicensePlan, 'id'>>({
    name: 'Freemium',
    price: 0,
    currency: 'TL',
    perShareFee: 0.5,
    monthlyTaskLimit: 10,
    maxTaskDuration: 7,
    userDataSharing: 'Yok',
    weeklyTaskRights: 2,
    sponsoredTaskRights: 0,
    features: [''],
    color: 'bg-gray-500',
    isActive: true
  })
  const [selectedPlanForAssign, setSelectedPlanForAssign] = useState<LicensePlan | null>(null)
  const [selectedBrandForAssign, setSelectedBrandForAssign] = useState<string>('')
  const [brandSearchTerm, setBrandSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'plans' | 'market' | 'analytics'>('plans')

  const handleEditPlan = (plan: LicensePlan) => {
    setEditingPlan({ ...plan })
    setIsEditModalOpen(true)
  }

  const handleViewPlan = (plan: LicensePlan) => {
    setViewingPlan(plan)
    setIsViewModalOpen(true)
  }

  const handleAddPlan = () => {
    setIsAddModalOpen(true)
  }

  const handleSaveNewPlan = () => {
    if (newPlan.name && newPlan.price >= 0) {
      const plan: LicensePlan = {
        id: Date.now().toString(),
        ...newPlan
      }
      setLicensePlans(prev => [...prev, plan])
      setNewPlan({
        name: 'Freemium',
      price: 0,
        currency: 'TL',
        perShareFee: 0.5,
        monthlyTaskLimit: 10,
        maxTaskDuration: 7,
        userDataSharing: 'Yok',
        weeklyTaskRights: 2,
        sponsoredTaskRights: 0,
        features: [''],
        color: 'bg-gray-500',
        isActive: true
      })
      setIsAddModalOpen(false)
    }
  }

  const handleSavePlan = () => {
    if (editingPlan) {
      setLicensePlans(prev => prev.map(p => p.id === editingPlan.id ? editingPlan : p))
      setIsEditModalOpen(false)
      setEditingPlan(null)
    }
  }

  const handleDeletePlan = (planId: string) => {
    if (confirm('Bu planı silmek istediğinizden emin misiniz?')) {
      setLicensePlans(prev => prev.filter(p => p.id !== planId))
    }
  }

  const handleAssignPlan = (plan: LicensePlan) => {
    setSelectedPlanForAssign(plan)
    setIsAssignModalOpen(true)
  }

  const handleConfirmAssign = () => {
    if (selectedPlanForAssign && selectedBrandForAssign) {
      setBrands(prev => prev.map(b => 
        b.id === selectedBrandForAssign 
          ? { ...b, currentPlan: selectedPlanForAssign.name, assignedAt: new Date().toISOString() }
          : b
      ))
      setIsAssignModalOpen(false)
      setSelectedPlanForAssign(null)
      setSelectedBrandForAssign('')
      setBrandSearchTerm('')
    }
  }

  const handleExportPlanPDF = (plan: LicensePlan) => {
    // Individual plan PDF export
    const content = `
      Qappio Lisans Teklifi
      =====================
      
      Plan: ${plan.name}
      Fiyat: ₺${plan.price}/ay
      
      Özellikler:
      ${plan.features.map(feature => `• ${feature}`).join('\n')}
      
      Teknik Detaylar:
      • Aylık Görev Limiti: ${plan.monthlyTaskLimit}
      • Maksimum Görev Süresi: ${plan.maxTaskDuration} gün
      • Kullanıcı Data Paylaşımı: ${plan.userDataSharing}
      • Haftalık Görev Hakkı: ${plan.weeklyTaskRights}
      • Sponsorlu Görev Hakkı: ${plan.sponsoredTaskRights}
      • Görev Paylaşımı Başına Ücret: ₺${plan.perShareFee}
      
      İletişim:
      Qappio Türkiye
      info@qappio.com
      +90 xxx xxx xx xx
      
      Bu teklif 30 gün geçerlidir.
    `
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Qappio_${plan.name}_Teklif.pdf`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => {
    // Full page PDF export
    const content = `
      Qappio Finans Raporu
      =====================
      
      Lisans Planları:
      ${licensePlans.map(plan => `
        ${plan.name}:
        - Fiyat: ₺${plan.price}
        - Aylık Görev Limiti: ${plan.monthlyTaskLimit}
        - Maksimum Süre: ${plan.maxTaskDuration} gün
        - Özellikler: ${plan.features.join(', ')}
      `).join('')}
      
      Market Raporu:
      ${marketItems.map(item => `
        ${item.name} (${item.brand}):
        - Satın Alınan: ${item.quantitySold}
        - Toplam QP: ${item.totalQPSpent.toLocaleString()}
      `).join('')}
    `
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Qappio_Finans_Raporu.pdf'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getPlanColor = (planName: string) => {
    switch (planName) {
      case 'Freemium': return 'bg-gray-500'
      case 'Premium': return 'bg-blue-500'
      case 'Platinum': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const GRADIENT_COLORS = {
    primary: 'linear-gradient(135deg, #0A192F 0%, #0E1D5A 50%, #0BD3C8 100%)',
    secondary: 'linear-gradient(135deg, #0E1D5A 0%, #0BD3C8 100%)'
  }

  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Finans & Lisanslar</h1>
          <Button onClick={handleExportPDF}>
            <FileText className="w-4 h-4 mr-2" />
            PDF İndir
          </Button>
          <Button onClick={handleAddPlan} className="ml-2">
            <Plus className="w-4 h-4 mr-2" />
            Yeni Lisans Oluştur
          </Button>
          </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
          <button 
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'plans' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Lisans Planları
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'market' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Market Raporu
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'analytics' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Analiz
          </button>
        </div>

        {/* License Plans Tab */}
        {activeTab === 'plans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {licensePlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className={`inline-block w-3 h-3 rounded-full ${getPlanColor(plan.name)} mr-2`} />
                      <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                      <p className="text-2xl font-bold text-blue-600">{plan.currency === 'TL' ? '₺' : '$'}{plan.price}</p>
              </div>
                    <Badge variant={plan.isActive ? 'success' : 'warning'}>
                      {plan.isActive ? 'Aktif' : 'Pasif'}
                    </Badge>
              </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Aylık Görev Limiti:</span>
                      <span className="font-medium">{plan.monthlyTaskLimit}</span>
            </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Maksimum Süre:</span>
                      <span className="font-medium">{plan.maxTaskDuration} gün</span>
          </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Haftalık Hakkı:</span>
                      <span className="font-medium">{plan.weeklyTaskRights}</span>
              </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sponsorlu Hakkı:</span>
                      <span className="font-medium">{plan.sponsoredTaskRights}</span>
              </div>
            </div>

                  <div className="space-y-2 mb-4">
                    <h4 className="font-medium text-gray-900">Özellikler:</h4>
                    <ul className="space-y-1">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                      {plan.features.length > 3 && (
                        <li className="text-sm text-gray-500">+{plan.features.length - 3} daha...</li>
                      )}
                    </ul>
          </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleEditPlan(plan)}
                      className="w-full"
                      size="sm"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Düzenle
                    </Button>
                    <Button
                      onClick={() => handleAssignPlan(plan)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      Markaya Ata
                    </Button>
                    <Button
                      onClick={() => handleViewPlan(plan)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Görüntüle
                    </Button>
                    <Button
                      onClick={() => handleExportPlanPDF(plan)}
                      variant="outline"
                      className="w-full"
                      size="sm"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Teklif İndir
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="w-full"
                      onClick={() => handleDeletePlan(plan.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Sil
                    </Button>
              </div>
                </CardContent>
              </Card>
            ))}
              </div>
        )}

        {/* Market Report Tab */}
        {activeTab === 'market' && (
          <div className="space-y-6">
            {/* Market Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-4">
            <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                      <p className="text-sm text-gray-600">Toplam Ürün</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {marketItems.reduce((sum, item) => sum + item.totalUploaded, 0).toLocaleString()}
                      </p>
              </div>
            </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
            <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                      <p className="text-sm text-gray-600">Toplam Satış</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {marketItems.reduce((sum, item) => sum + item.quantitySold, 0).toLocaleString()}
                      </p>
              </div>
            </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <DollarSign className="w-6 h-6 text-purple-600" />
          </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Toplam QP Kazanımı</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {marketItems.reduce((sum, item) => sum + item.totalQPSpent, 0).toLocaleString()}
                      </p>
        </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <ShoppingBag className="w-6 h-6 text-orange-600" />
              </div>
                    <div className="ml-4">
                      <p className="text-sm text-gray-600">Mevcut Stok</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {marketItems.reduce((sum, item) => sum + item.currentStock, 0).toLocaleString()}
                      </p>
            </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Market Satış Raporu</h3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex-1 min-w-48">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marka Filtrele</label>
            <select 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => {
                        // Brand filter logic will be implemented
                      }}
                    >
                      <option value="">Tüm Markalar</option>
                      {Array.from(new Set(marketItems.map(item => item.brand))).map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
                  </div>
                  
                  <div className="flex-1 min-w-48">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Filtrele</label>
            <select 
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onChange={(e) => {
                        // Category filter logic will be implemented
                      }}
                    >
                      <option value="">Tüm Kategoriler</option>
                      {Array.from(new Set(marketItems.map(item => item.category))).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
            </select>
          </div>
        </div>

          <div className="overflow-x-auto">
            <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Ürün</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Marka</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Kategori</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Fiyat</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Yüklenen</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Satılan</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Stok</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Toplam QP</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Son Satış</th>
                </tr>
              </thead>
                    <tbody>
                      {marketItems.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={item.imageUrl} 
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">ID: {item.id}</p>
                        </div>
                      </div>
                    </td>
                          <td className="py-3 px-4 text-gray-600">{item.brand}</td>
                          <td className="py-3 px-4 text-gray-600">{item.category}</td>
                          <td className="py-3 px-4 text-gray-900 font-medium">{item.price} QP</td>
                          <td className="py-3 px-4 text-gray-900 font-medium">{item.totalUploaded.toLocaleString()}</td>
                          <td className="py-3 px-4 text-green-600 font-semibold">{item.quantitySold.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.currentStock > 50 ? 'bg-green-100 text-green-800' :
                              item.currentStock > 20 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.currentStock.toLocaleString()}
                      </span>
                    </td>
                          <td className="py-3 px-4 text-blue-600 font-semibold">{item.totalQPSpent.toLocaleString()} QP</td>
                          <td className="py-3 px-4 text-gray-600">{new Date(item.lastSold).toLocaleDateString('tr-TR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>

                {/* Stock Summary */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Stok Özeti</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {marketItems.filter(item => item.currentStock > 50).length}
                      </p>
                      <p className="text-sm text-gray-600">Yeterli Stok</p>
          </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">
                        {marketItems.filter(item => item.currentStock > 20 && item.currentStock <= 50).length}
                      </p>
                      <p className="text-sm text-gray-600">Düşük Stok</p>
                      </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-red-600">
                        {marketItems.filter(item => item.currentStock <= 20).length}
                      </p>
                      <p className="text-sm text-gray-600">Kritik Stok</p>
          </div>
        </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <TrendingUp className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Detaylı Finans Analizi</h3>
              <p className="text-gray-600 mb-6">
                Kapsamlı finansal performans analizi, grafikler ve raporlar için ayrı sayfaya yönlendiriliyorsunuz.
              </p>
              <Button 
                onClick={() => window.location.href = '/finance/analytics'}
                style={{ background: GRADIENT_COLORS.primary }}
                className="text-white border-0"
              >
                Analiz Sayfasına Git
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Edit Plan Modal */}
        {isEditModalOpen && editingPlan && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Plan Düzenle: {editingPlan.name}</h2>
                <button 
                    onClick={() => setIsEditModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat</label>
                      <div className="flex">
                  <select
                          value={editingPlan.currency}
                          onChange={(e) => setEditingPlan(prev => prev ? { ...prev, currency: e.target.value as 'TL' | 'USD' } : null)}
                          className="px-3 py-3 border border-r-0 border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        >
                          <option value="TL">₺</option>
                          <option value="USD">$</option>
                  </select>
                        <Input
                          type="number"
                          value={editingPlan.price}
                          onChange={(e) => setEditingPlan(prev => prev ? { ...prev, price: Number(e.target.value) } : null)}
                          placeholder="99"
                          className="rounded-l-none"
                          required
                        />
                      </div>
                </div>

                    <Input
                      label="Görev Paylaşımı Başına Ücret (₺)"
                      type="number"
                      step="0.01"
                      value={editingPlan.perShareFee}
                      onChange={(e) => setEditingPlan(prev => prev ? { ...prev, perShareFee: Number(e.target.value) } : null)}
                      placeholder="0.10"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Aylık Görev Verme Adeti"
                      type="number"
                      value={editingPlan.monthlyTaskLimit}
                      onChange={(e) => setEditingPlan(prev => prev ? { ...prev, monthlyTaskLimit: Number(e.target.value) } : null)}
                      placeholder="50"
                      required
                    />
                    
                    <Input
                      label="Görev Süresi (Max) - Gün"
                      type="number"
                      value={editingPlan.maxTaskDuration}
                      onChange={(e) => setEditingPlan(prev => prev ? { ...prev, maxTaskDuration: Number(e.target.value) } : null)}
                      placeholder="30"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Data Paylaşımı</label>
                    <select
                        value={editingPlan.userDataSharing}
                        onChange={(e) => setEditingPlan(prev => prev ? { ...prev, userDataSharing: e.target.value as 'Var' | 'Yok' } : null)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      >
                        <option value="Yok">Yok</option>
                        <option value="Var">Var</option>
                    </select>
                  </div>
                    
                    <Input
                      label="Haftanın Görevi Hakkı (Aylık)"
                      type="number"
                      value={editingPlan.weeklyTaskRights}
                      onChange={(e) => setEditingPlan(prev => prev ? { ...prev, weeklyTaskRights: Number(e.target.value) } : null)}
                      placeholder="12"
                      required
                    />
                </div>

                  <Input
                    label="Sponsorlu Görev Verme Hakkı (Aylık)"
                      type="number"
                    value={editingPlan.sponsoredTaskRights}
                    onChange={(e) => setEditingPlan(prev => prev ? { ...prev, sponsoredTaskRights: Number(e.target.value) } : null)}
                    placeholder="5"
                    required
                  />
                  </div>

                <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditModalOpen(false)}
                >
                  İptal
                  </Button>
                  <Button
                    onClick={handleSavePlan}
                  >
                    Kaydet
                  </Button>
                </div>
                        </div>
                      </div>
                      </div>
        )}

        {/* Assign Plan Modal */}
        {isAssignModalOpen && selectedPlanForAssign && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md">
              <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Plan Ata</h2>
                        <button 
                    onClick={() => setIsAssignModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                        </button>
                </div>

              <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Seçilen Plan</label>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium text-gray-900">{selectedPlanForAssign.name}</p>
                      <p className="text-sm text-gray-600">{selectedPlanForAssign.currency === 'TL' ? '₺' : '$'}{selectedPlanForAssign.price}/ay</p>
                    </div>
                </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marka Seçin</label>
                    <Input
                      label="Marka Ara"
                      value={brandSearchTerm}
                      onChange={(e) => setBrandSearchTerm(e.target.value)}
                      placeholder="Marka adı yazın..."
                      className="mb-3"
                    />
                    <select
                      value={selectedBrandForAssign}
                      onChange={(e) => setSelectedBrandForAssign(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Marka seçin...</option>
                      {filteredBrands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                </div>
              </div>

                <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={() => setIsAssignModalOpen(false)}
                  >
                    İptal
                  </Button>
                  <Button
                    onClick={handleConfirmAssign}
                    disabled={!selectedBrandForAssign}
                  >
                    Ata
                  </Button>
          </div>
                      </div>
          </div>
        </div>
        )}

        {/* View Plan Modal */}
        {isViewModalOpen && viewingPlan && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Plan Detayları: {viewingPlan.name}</h2>
                <button
                    onClick={() => setIsViewModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <p className="text-sm text-gray-600">Plan Adı:</p>
                    <p className="text-lg font-semibold text-gray-900">{viewingPlan.name}</p>
                </div>
                  <div>
                    <p className="text-sm text-gray-600">Fiyat:</p>
                    <p className="text-lg font-semibold text-blue-600">{viewingPlan.currency === 'TL' ? '₺' : '$'}{viewingPlan.price}/ay</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Aylık Görev Limiti:</p>
                    <p className="text-lg font-semibold text-blue-600">{viewingPlan.monthlyTaskLimit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Maksimum Süre:</p>
                    <p className="text-lg font-semibold text-blue-600">{viewingPlan.maxTaskDuration} gün</p>
                </div>
                  <div>
                    <p className="text-sm text-gray-600">Kullanıcı Data Paylaşımı:</p>
                    <p className="text-lg font-semibold text-blue-600">{viewingPlan.userDataSharing}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Haftalık Görev Hakkı:</p>
                    <p className="text-lg font-semibold text-blue-600">{viewingPlan.weeklyTaskRights}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Sponsorlu Görev Hakkı:</p>
                    <p className="text-lg font-semibold text-blue-600">{viewingPlan.sponsoredTaskRights}</p>
                </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Özellikler:</h4>
                  <ul className="space-y-1">
                    {viewingPlan.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
              </div>

                <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={() => setIsViewModalOpen(false)}
                  >
                    Kapat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add New Plan Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Yeni Lisans Oluştur</h2>
                <button 
                    onClick={() => setIsAddModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Plan Adı</label>
                    <select
                         value={newPlan.name}
                         onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value as 'Freemium' | 'Premium' | 'Platinum' }))}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         required
                       >
                         <option value="Freemium">Freemium</option>
                         <option value="Premium">Premium</option>
                         <option value="Platinum">Platinum</option>
                    </select>
                  </div>
                  <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Fiyat</label>
                       <div className="flex">
                    <select
                           value={newPlan.currency}
                           onChange={(e) => setNewPlan(prev => ({ ...prev, currency: e.target.value as 'TL' | 'USD' }))}
                           className="px-3 py-3 border border-r-0 border-gray-200 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                           required
                         >
                           <option value="TL">₺</option>
                           <option value="USD">$</option>
                    </select>
                         <Input
                           type="number"
                           value={newPlan.price}
                           onChange={(e) => setNewPlan(prev => ({ ...prev, price: Number(e.target.value) }))}
                           placeholder="0"
                           className="rounded-l-none"
                           required
                         />
                       </div>
                  </div>
                </div>

                   <div className="grid grid-cols-2 gap-4">
                     <Input
                       label="Görev Paylaşımı Başına Ücret (₺)"
                       type="number"
                       step="0.01"
                       value={newPlan.perShareFee}
                       onChange={(e) => setNewPlan(prev => ({ ...prev, perShareFee: Number(e.target.value) }))}
                       placeholder="0.10"
                       required
                     />
                     <Input
                       label="Aylık Görev Verme Adeti"
                       type="number"
                       value={newPlan.monthlyTaskLimit}
                       onChange={(e) => setNewPlan(prev => ({ ...prev, monthlyTaskLimit: Number(e.target.value) }))}
                       placeholder="10"
                       required
                    />
                  </div>

                   <div className="grid grid-cols-2 gap-4">
                     <Input
                       label="Görev Süresi (Max) - Gün"
                       type="number"
                       value={newPlan.maxTaskDuration}
                       onChange={(e) => setNewPlan(prev => ({ ...prev, maxTaskDuration: Number(e.target.value) }))}
                       placeholder="7"
                       required
                     />
                  <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Data Paylaşımı</label>
                    <select
                         value={newPlan.userDataSharing}
                         onChange={(e) => setNewPlan(prev => ({ ...prev, userDataSharing: e.target.value as 'Var' | 'Yok' }))}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         required
                       >
                         <option value="Yok">Yok</option>
                         <option value="Var">Var</option>
                    </select>
                  </div>
                </div>

                   <div className="grid grid-cols-2 gap-4">
                     <Input
                       label="Haftanın Görevi Hakkı (Aylık)"
                      type="number"
                       value={newPlan.weeklyTaskRights}
                       onChange={(e) => setNewPlan(prev => ({ ...prev, weeklyTaskRights: Number(e.target.value) }))}
                       placeholder="2"
                       required
                     />
                     <Input
                       label="Sponsorlu Görev Verme Hakkı (Aylık)"
                       type="number"
                       value={newPlan.sponsoredTaskRights}
                       onChange={(e) => setNewPlan(prev => ({ ...prev, sponsoredTaskRights: Number(e.target.value) }))}
                       placeholder="0"
                       required
                     />
                </div>

                   <div className="grid grid-cols-2 gap-4">
                     <Input
                       label="Özellikler (Ayrıca virgülle ayırın)"
                       value={newPlan.features.join(', ')}
                       onChange={(e) => setNewPlan(prev => ({ ...prev, features: e.target.value.split(',').map(f => f.trim()) }))}
                       placeholder="Temel görev yönetimi, E-posta destek"
                     />
                     <div>
                       <label className="block text-sm font-medium text-gray-700 mb-2">Plan Rengi</label>
                       <select
                         value={newPlan.color}
                         onChange={(e) => setNewPlan(prev => ({ ...prev, color: e.target.value }))}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                         required
                       >
                         <option value="bg-gray-500">Gri</option>
                         <option value="bg-blue-500">Mavi</option>
                         <option value="bg-purple-500">Mor</option>
                         <option value="bg-green-500">Yeşil</option>
                         <option value="bg-red-500">Kırmızı</option>
                       </select>
                </div>
              </div>

                  <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      onClick={() => setIsAddModalOpen(false)}
                >
                  İptal
                    </Button>
                    <Button
                      onClick={handleSaveNewPlan}
                    >
                      Kaydet
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
