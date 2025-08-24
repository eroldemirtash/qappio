'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ShoppingBag, Plus, Search, Edit, Trash2, Eye, Package, DollarSign, Tag, Star, X, Upload, Grid, List, Play, Pause } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { useBrands } from '@/contexts/BrandsContext'

interface MarketItem {
  id: string
  name: string
  description: string
  detailedDescription: string
  category: string
  qp: number
  imageUrl: string
  stock: number
  status: 'Aktif' | 'Pasif' | 'Tükendi'
  tags: string[]
  createdAt: string
  salesCount: number
  rating: number
  brand: string
}

const mockMarketItems: MarketItem[] = [
  {
    id: '1',
    name: 'Apple iPhone 15 Pro',
    description: 'En yeni iPhone modeli, A17 Pro çip ile gelişmiş performans',
    detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Elektronik & Teknoloji',
    qp: 45000,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
    stock: 50,
      status: 'Aktif',
    tags: ['iphone', 'apple', 'telefon'],
    createdAt: '2024-01-15',
    salesCount: 23,
    rating: 4.8,
    brand: 'Apple'
  },
  {
    id: '2',
    name: 'Nike Air Force 1',
    description: 'Klasik ve şık spor ayakkabı, günlük kullanım için ideal',
    detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Spor & Outdoor',
    qp: 3500,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    stock: 100,
      status: 'Aktif',
    tags: ['nike', 'ayakkabı', 'spor'],
    createdAt: '2024-01-10',
    salesCount: 45,
    rating: 4.6,
    brand: 'Nike'
  },
  {
    id: '3',
    name: 'Zara Kadın Ceket',
    description: 'Sonbahar koleksiyonu şık kadın ceket',
    detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Moda & Aksesuar',
    qp: 799,
    imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=300&fit=crop',
    stock: 25,
    status: 'Aktif',
    tags: ['zara', 'ceket', 'moda'],
    createdAt: '2024-01-12',
    salesCount: 12,
    rating: 4.9,
    brand: 'Zara'
  },
  {
    id: '4',
    name: 'Starbucks Hediye Kartı',
    description: '100₺ değerinde Starbucks hediye kartı',
    detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Hediye Çekleri',
    qp: 100,
    imageUrl: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop',
    stock: 200,
      status: 'Aktif',
    tags: ['hediye', 'kahve', 'starbucks'],
    createdAt: '2024-01-08',
    salesCount: 67,
    rating: 4.7,
    brand: 'Starbucks'
  },
  {
    id: '5',
    name: 'L\'Oreal Paris Parfüm',
    description: 'Kadın parfümü, zarif ve kalıcı koku',
    detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Kişisel Bakım & Kozmetik',
    qp: 250,
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
    stock: 0,
    status: 'Tükendi',
    tags: ['parfüm', 'kozmetik', 'kadın'],
    createdAt: '2024-01-05',
    salesCount: 89,
    rating: 4.5,
    brand: 'L\'Oreal'
  },
  {
    id: '6',
    name: 'PlayStation 5',
    description: 'Son nesil oyun konsolu, 4K oyun deneyimi',
    detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    category: 'Çocuk & Oyun',
    qp: 18000,
    imageUrl: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
    stock: 15,
      status: 'Aktif',
    tags: ['playstation', 'oyun', 'konsol'],
    createdAt: '2024-01-20',
    salesCount: 34,
    rating: 4.9,
    brand: 'Sony'
  }
]

export default function MarketPage() {
  const { brands } = useBrands()
  const [categories, setCategories] = useState(['Elektronik & Teknoloji', 'Moda & Aksesuar', 'Yiyecek & İçecek', 'Hediye Çekleri', 'Spor & Outdoor', 'Kişisel Bakım & Kozmetik', 'Ev & Yaşam', 'Deneyim & Etkinlik', 'Çocuk & Oyun', 'Premium Özel', 'Tatil & Seyahat'])
  const [marketItems, setMarketItems] = useState<MarketItem[]>(mockMarketItems)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MarketItem | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const [selectedItem, setSelectedItem] = useState<MarketItem | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('')
  
  const [newItem, setNewItem] = useState<Omit<MarketItem, 'id' | 'salesCount' | 'rating' | 'createdAt'>>({
    name: '',
    description: '',
    detailedDescription: '',
    category: '',
    qp: 0,
    imageUrl: '',
    stock: 0,
    status: 'Aktif',
    tags: [],
    brand: ''
  })

  const handleAddItem = () => {
    if (newItem.name && newItem.description && newItem.category && newItem.brand) {
      const item: MarketItem = {
        id: Date.now().toString(),
        ...newItem,
        salesCount: 0,
        rating: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      
      setMarketItems(prev => [item, ...prev])
      setNewItem({
      name: '',
      description: '',
        detailedDescription: '',
      category: '',
        qp: 0,
        imageUrl: '',
        stock: 0,
        status: 'Aktif',
        tags: [],
        brand: ''
      })
      setIsModalOpen(false)
    }
  }

  const handleEditItem = () => {
    if (editingItem && editingItem.name && editingItem.description) {
      setMarketItems(prev => prev.map(item => 
        item.id === editingItem.id ? editingItem : item
      ))
      setIsEditModalOpen(false)
      setEditingItem(null)
    }
  }

  const handleDeleteItem = (id: string) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      setMarketItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const handlePublishItem = (id: string) => {
    setMarketItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'Aktif' as const } : item
    ))
  }

  const handlePauseItem = (id: string) => {
    setMarketItems(prev => prev.map(item => 
      item.id === id ? { ...item, status: 'Pasif' as const } : item
    ))
  }

  const addTag = () => {
    setNewItem(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }))
  }

  const removeTag = (index: number) => {
    setNewItem(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }))
  }

  const updateTag = (index: number, value: string) => {
    setNewItem(prev => ({
      ...prev,
      tags: prev.tags.map((tag, i) => i === index ? value : tag)
    }))
  }

  const filteredItems = marketItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !categoryFilter || item.category === categoryFilter
    const matchesBrand = !brandFilter || item.brand === brandFilter
    
    return matchesSearch && matchesCategory && matchesBrand
  })

  const sortedItems = sortBy ? [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'highest-qp':
        return b.qp - a.qp
      case 'lowest-qp':
        return a.qp - b.qp
      case 'highest-sales':
        return b.salesCount - a.salesCount
      case 'lowest-sales':
        return a.salesCount - b.salesCount
      case 'highest-rating':
        return b.rating - a.rating
      case 'lowest-rating':
        return a.rating - b.rating
      case 'highest-stock':
        return b.stock - a.stock
      case 'lowest-stock':
        return a.stock - b.stock
      case 'alphabetical':
        return a.name.localeCompare(b.name, 'tr-TR')
      case 'category':
        return a.category.localeCompare(b.category, 'tr-TR')
      case 'brand':
        return a.brand.localeCompare(b.brand, 'tr-TR')
      default:
        return 0
    }
  }) : filteredItems

  const totalRevenue = marketItems.reduce((sum, item) => sum + (item.qp * item.salesCount), 0)
  const totalItems = marketItems.length
  const activeItems = marketItems.filter(item => item.status === 'Aktif').length

  const getSortDisplayName = (sortValue: string) => {
    const sortOptions: { [key: string]: string } = {
      'newest': '📅 En Yeni',
      'oldest': '📅 En Eski',
      'highest-qp': '🏆 En Yüksek QP',
      'lowest-qp': '🏆 En Düşük QP',
      'highest-sales': '🔥 En Çok Satan',
      'lowest-sales': '🔥 En Az Satan',
      'highest-rating': '⭐ En Yüksek Puan',
      'lowest-rating': '⭐ En Düşük Puan',
      'highest-stock': '📦 En Çok Stok',
      'lowest-stock': '📦 En Az Stok',
      'alphabetical': '🔤 Alfabetik',
      'category': '🏷️ Kategori',
      'brand': '🏢 Marka'
    }
    return sortOptions[sortValue] || sortValue
  }

  return (
    <DashboardLayout>
        {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Market Yönetimi</h1>
            <p className="text-gray-600">Platform market ürünlerini yönetin ve satışları takip edin</p>
          </div>

      {/* User QP Balance Info */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">QP Sistemi Bilgilendirmesi</h3>
            <p className="text-sm text-gray-600">Market ürünleri Harcayabilir QP ile satın alınır</p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <p className="text-xs text-blue-600 font-medium">Toplam QP (Collected)</p>
                <p className="text-lg font-bold text-blue-900">∞ QP</p>
                <p className="text-xs text-blue-500">Level göstergesi</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-green-600 font-medium">Harcayabilir QP</p>
                <p className="text-lg font-bold text-green-900">∞ QP</p>
                <p className="text-xs text-green-500">Market bakiyesi</p>
              </div>
            </div>
          </div>
        </div>
        </div>

      {/* QP System Explanation */}
      <div className="mb-6 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h4 className="font-semibold text-gray-900 mb-3">QP Sistemi Nasıl Çalışır?</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-blue-900">Toplam QP (Collected QP)</p>
                <p className="text-gray-600">Kullanıcının görevlerden kazandığı toplam puan. Bu değer hiç azalmaz, sadece artar ve seviye belirlemede kullanılır.</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-green-900">Harcayabilir QP (Spendable QP)</p>
                <p className="text-gray-600">Kullanıcının markette harcayabileceği mevcut bakiye. Ürün alındığında bu değer düşer.</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-purple-900">Market Alışverişi</p>
                <p className="text-gray-600">Ürün satın alındığında sadece Harcayabilir QP düşer, Toplam QP etkilenmez.</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-orange-900">Seviye Sistemi</p>
                <p className="text-gray-600">Toplam QP miktarına göre kullanıcı seviyesi belirlenir (Snapper, Seeker, Crafter, Viralist, Qappian).</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <DollarSign size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam QP</p>
                <p className="text-2xl font-bold text-gray-900">{totalRevenue.toLocaleString()} QP</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Package size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Toplam Ürün</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <ShoppingBag size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Aktif Ürün</p>
                <p className="text-2xl font-bold text-gray-900">{activeItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Add Button */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Input
                  placeholder="Ürün ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
            className="w-full sm:w-64"
                />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select 
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tüm Markalar</option>
            {brands.map(brand => (
              <option key={brand.id} value={brand.name}>{brand.name}</option>
            ))}
            </select>
            <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sıralama Seçin</option>
            <option value="newest">📅 En Yeni</option>
            <option value="oldest">📅 En Eski</option>
            <option value="highest-qp">🏆 En Yüksek QP</option>
            <option value="lowest-qp">🏆 En Düşük QP</option>
            <option value="highest-sales">🔥 En Çok Satan</option>
            <option value="lowest-sales">🔥 En Az Satan</option>
            <option value="highest-rating">⭐ En Yüksek Puan</option>
            <option value="lowest-rating">⭐ En Düşük Puan</option>
            <option value="highest-stock">📦 En Çok Stok</option>
            <option value="lowest-stock">📦 En Az Stok</option>
            <option value="alphabetical">🔤 Alfabetik</option>
            <option value="category">🏷️ Kategori</option>
            <option value="brand">🏢 Marka</option>
            </select>
          </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus size={18} />}
            className="w-full sm:w-auto"
          >
            Ürün Ekle
          </Button>
          </div>
        </div>

      {/* Sort Info Card */}
      {sortBy && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-blue-600 font-medium">Sıralama:</span>
              <span className="text-blue-800">{getSortDisplayName(sortBy)}</span>
          </div>
            <button
              onClick={() => setSortBy('')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Sıralamayı Temizle
            </button>
          </div>
        </div>
      )}

      {/* View Toggle */}
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-md transition-colors ${
            viewMode === 'grid' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Grid className="w-4 h-4" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-md transition-colors ${
            viewMode === 'list' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <List className="w-4 h-4" />
        </button>
      </div>

      {/* Market Items Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <Card key={item.id} className="qappio-card-hover">
              <CardHeader className="pb-3">
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />

                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                  <Badge 
                    variant={item.status === 'Aktif' ? 'success' : item.status === 'Tükendi' ? 'danger' : 'warning'}
                  >
                    {item.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">{item.qp} QP</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Harcanacak</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{item.rating}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Kategori</p>
                    <p className="font-semibold text-gray-900">{item.category}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Stok</p>
                    <p className="font-semibold text-gray-900">{item.stock}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Satış</p>
                    <p className="font-semibold text-gray-900">{item.salesCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Marka</p>
                    <p className="font-semibold text-gray-900">{item.brand}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                  <div className="flex items-center space-x-2">
                    {item.status === 'Aktif' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handlePauseItem(item.id)}
                        className="bg-yellow-600 text-white hover:bg-yellow-700"
                      >
                        <Pause size={16} />
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handlePublishItem(item.id)}
                        className="bg-green-600 text-white hover:bg-green-700"
                      >
                        <Play size={16} />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedItem(item)
                        setIsDetailModalOpen(true)
                      }}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingItem(item)
                        setIsEditModalOpen(true)
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ürün</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marka</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QP (Harcanacak)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="default" className="capitalize">{item.category}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.qp.toLocaleString()} QP</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={item.status === 'Aktif' ? 'success' : item.status === 'Tükendi' ? 'danger' : 'warning'}>
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {item.status === 'Aktif' ? (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handlePauseItem(item.id)}
                            className="bg-yellow-600 text-white hover:bg-yellow-700"
                          >
                            <Pause className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handlePublishItem(item.id)}
                            className="bg-green-600 text-white hover:bg-green-700"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedItem(item)
                            setIsDetailModalOpen(true)
                          }}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingItem(item)
                            setIsEditModalOpen(true)
                          }}
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ürün bulunamadı</h3>
          <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin</p>
        </div>
      )}

      {/* Add Item Modal */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Ürün Adı"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ürün adını girin"
                  required
                  />

                    <select
                  value={newItem.category}
                  onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Kategori Seçin</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                
                <Input
                  label="QP (Ürün Puanı)"
                      type="number"
                  value={newItem.qp}
                  onChange={(e) => setNewItem(prev => ({ ...prev, qp: Number(e.target.value) }))}
                      placeholder="0"
                  required
                />
                
                    <select
                  value={newItem.brand}
                  onChange={(e) => setNewItem(prev => ({ ...prev, brand: e.target.value }))}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Marka Seçin</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.name}>{brand.name}</option>
                      ))}
                    </select>
                
                    <select
                  value={newItem.status}
                  onChange={(e) => setNewItem(prev => ({ ...prev, status: e.target.value as 'Aktif' | 'Pasif' | 'Tükendi' }))}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Pasif">Pasif</option>
                  <option value="Tükendi">Tükendi</option>
                    </select>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Görseli</label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (e) => {
                              setNewItem(prev => ({ ...prev, imageUrl: e.target?.result as string }))
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    {newItem.imageUrl && (
                      <div className="relative">
                        <img
                          src={newItem.imageUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    <Input
                      label="veya Görsel URL"
                      value={newItem.imageUrl}
                      onChange={(e) => setNewItem(prev => ({ ...prev, imageUrl: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ürün açıklamasını girin"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detaylı Açıklama</label>
                  <textarea
                    value={newItem.detailedDescription}
                    onChange={(e) => setNewItem(prev => ({ ...prev, detailedDescription: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ürün detaylı açıklamasını girin"
                  />
              </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Etiketler</label>
                  <div className="space-y-2">
                    {newItem.tags.map((tag, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={tag}
                          onChange={(e) => updateTag(index, e.target.value)}
                          placeholder={`Etiket ${index + 1}`}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTag(index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addTag}
                      size="sm"
                    >
                      Etiket Ekle
                    </Button>
                  </div>
                </div>
                

              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  onClick={handleAddItem}
                  disabled={!newItem.name || !newItem.description || !newItem.category || !newItem.brand}
                >
                  Ürün Ekle
                </Button>
              </div>
              </div>
            </div>
          </div>
        )}

      {/* Edit Item Modal */}
      {isEditModalOpen && editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Ürün Düzenle</h2>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Ürün Adı"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, name: e.target.value } : null)}
                  placeholder="Ürün adını girin"
                  required
                />
                
                    <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, category: e.target.value } : null)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Kategori Seçin</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                
                <Input
                  label="QP (Ürün Puanı)"
                      type="number"
                  value={editingItem.qp}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, qp: Number(e.target.value) } : null)}
                  placeholder="0"
                  required
                />
                
                    <select
                  value={editingItem.brand}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, brand: e.target.value } : null)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Marka Seçin</option>
                  {brands.map(brand => (
                    <option key={brand.id} value={brand.name}>{brand.name}</option>
                      ))}
                    </select>
                
                    <select
                  value={editingItem.status}
                  onChange={(e) => setEditingItem(prev => prev ? { ...prev, status: e.target.value as 'Aktif' | 'Pasif' | 'Tükendi' } : null)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Pasif">Pasif</option>
                  <option value="Tükendi">Tükendi</option>
                    </select>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ürün Görseli</label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (e) => {
                              setEditingItem(prev => prev ? { ...prev, imageUrl: e.target?.result as string } : null)
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                    {editingItem.imageUrl && (
                      <div className="relative">
                        <img
                          src={editingItem.imageUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                    <Input
                      label="veya Görsel URL"
                      value={editingItem.imageUrl}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, imageUrl: e.target.value } : null)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ürün açıklamasını girin"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detaylı Açıklama</label>
                  <textarea
                    value={editingItem.detailedDescription}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, detailedDescription: e.target.value } : null)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ürün detaylı açıklamasını girin"
                  />
              </div>


              </div>
              
              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  onClick={handleEditItem}
                  disabled={!editingItem.name || !editingItem.description}
                >
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {isDetailModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Ürün Detayları</h2>
                <button
                  onClick={() => setIsDetailModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <img 
                  src={selectedItem.imageUrl} 
                  alt={selectedItem.name}
                  className="w-full h-64 object-cover rounded-lg"
                />
                
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedItem.name}</h3>
                  <p className="text-gray-600">{selectedItem.description}</p>
            </div>
                
                {selectedItem.detailedDescription && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Detaylı Açıklama</h4>
                    <p className="text-gray-600">{selectedItem.detailedDescription}</p>
          </div>
        )}
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Kategori</p>
                    <p className="font-semibold">{selectedItem.category}</p>
      </div>
                  <div>
                    <p className="text-sm text-gray-500">Marka</p>
                    <p className="font-semibold">{selectedItem.brand}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">QP (Harcanacak)</p>
                    <p className="font-semibold">{selectedItem.qp} QP</p>
                    <p className="text-xs text-gray-500 mt-1">Bu ürünü satın almak için gereken QP miktarı</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Stok</p>
                    <p className="font-semibold">{selectedItem.stock}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Satış Sayısı</p>
                    <p className="font-semibold">{selectedItem.salesCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Puan</p>
                    <p className="font-semibold">{selectedItem.rating}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant={selectedItem.status === 'Aktif' ? 'success' : selectedItem.status === 'Tükendi' ? 'danger' : 'warning'}>
                    {selectedItem.status}
                  </Badge>

                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Etiketler</h4>
                  <div className="flex flex-wrap gap-2">
                                         {selectedItem.tags.map((tag, index) => (
                       <Badge key={index} variant="default">{tag}</Badge>
                     ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => setIsDetailModalOpen(false)}
                >
                  Kapat
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
