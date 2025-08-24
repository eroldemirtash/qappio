'use client'

import { useState, useRef } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Building2, Plus, Search, Edit, Trash2, Eye, Save, X, Image as ImageIcon, Upload, Grid, List, Target, Share2, DollarSign, UserPlus, Globe, Phone, MapPin, Calendar, Crown, Star, Users } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { useBrands, Brand } from '@/contexts/BrandsContext'

interface Follower {
  id: number
  name: string
  avatar: string
  email: string
  level: string
  followedAt: string
  isActive: boolean
}

interface Follower {
  id: number
  name: string
  avatar: string
  email: string
  level: string
  followedAt: string
  isActive: boolean
}

interface BrandProfile {
  name: string
  logo: string
  coverImage: string
  email: string
  phone: string
  website: string
  description: string
  category: string
  address: string
  foundedYear: string
  socialMedia: {
    instagram: string
    twitter: string
    facebook: string
    linkedin: string
  }
  license: {
    type: 'Freemium' | 'Premium' | 'Platinium'
    startDate: string
    endDate: string
    price: number
    features: string[]
  }
}

export default function BrandsPage() {
  const { brands, addBrand, updateBrand, deleteBrand } = useBrands()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [newBrand, setNewBrand] = useState<Omit<Brand, 'id' | 'users' | 'missions' | 'totalShares' | 'createdAt'>>({
    name: '',
    logo: '',
    email: '',
    balance: 0,
    status: 'Aktif',
    category: '',
    followers: 0
  })

  const [newBrandProfile, setNewBrandProfile] = useState<BrandProfile>({
      name: '',
      logo: '',
    coverImage: '',
      email: '',
    phone: '',
    website: '',
    description: '',
    category: '',
    address: '',
    foundedYear: '',
    socialMedia: {
      instagram: '',
      twitter: '',
      facebook: '',
      linkedin: ''
    },
    license: {
      type: 'Freemium',
      startDate: '',
      endDate: '',
      price: 0,
      features: []
    }
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)

  const categories = ['Spor Giyim', 'İçecek', 'Teknoloji', 'Fast Food', 'Otomotiv', 'Kozmetik', 'Gıda', 'Moda']

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (isEdit && editingBrand) {
          setEditingBrand(prev => prev ? {
            ...prev,
            logo: e.target?.result as string
          } : null)
        } else {
          setNewBrand(prev => ({
            ...prev,
            logo: e.target?.result as string
          }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

    const handleAddBrand = () => {
    if (newBrand.name && newBrand.email && newBrand.category) {
      const brand: Brand = {
        id: Date.now(),
        ...newBrand,
        users: 0,
        missions: 0,
        totalShares: 0,
        followers: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      
      addBrand(brand)
    setNewBrand({
      name: '',
      logo: '',
      email: '',
      balance: 0,
      status: 'Aktif',
        category: '',
        followers: 0
      })
      setIsModalOpen(false)
    }
  }

  const handleCreateBrandProfile = () => {
    if (newBrandProfile.name && newBrandProfile.email && newBrandProfile.category) {
      // Marka profilini oluştur ve brands listesine ekle
      const brand: Brand = {
        id: Date.now(),
        name: newBrandProfile.name,
        logo: newBrandProfile.logo || 'https://via.placeholder.com/150x150/6B7280/FFFFFF?text=' + newBrandProfile.name.charAt(0),
        coverImage: newBrandProfile.coverImage || '',
        email: newBrandProfile.email,
        balance: newBrandProfile.license.price,
        status: 'Aktif',
        category: newBrandProfile.category,
        users: 0,
        missions: 0,
        totalShares: 0,
        followers: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      
      addBrand(brand)
      
      // Profil formunu sıfırla
      setNewBrandProfile({
        name: '',
        logo: '',
        coverImage: '',
        email: '',
        phone: '',
        website: '',
        description: '',
        category: '',
        address: '',
        foundedYear: '',
        socialMedia: {
          instagram: '',
          twitter: '',
          facebook: '',
          linkedin: ''
        },
        license: {
          type: 'Freemium',
          startDate: '',
          endDate: '',
          price: 0,
          features: []
        }
      })
      
      setIsProfileModalOpen(false)
    }
  }

  const handleEditBrand = () => {
    if (editingBrand && editingBrand.name && editingBrand.email) {
      updateBrand(editingBrand.id, editingBrand)
      setEditingBrand(null)
      setIsEditModalOpen(false)
    }
  }

  const handleDeleteBrand = (id: number) => {
    if (confirm('Bu markayı silmek istediğinizden emin misiniz?')) {
      deleteBrand(id)
    }
  }

  const handleView = (brand: Brand) => {
    setSelectedBrand(brand)
    setIsDetailModalOpen(true)
  }

  const filteredBrands = brands.filter(brand => {
    const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         brand.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || brand.status === statusFilter
    const matchesCategory = !categoryFilter || brand.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <DashboardLayout>
        {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Marka Yönetimi</h1>
        <p className="text-gray-600">Tüm markaları görüntüleyin, düzenleyin ve yeni markalar ekleyin</p>
      </div>

      {/* Brands Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
          <div>
                <p className="text-blue-100 text-sm font-medium">Toplam Marka</p>
                <p className="text-2xl font-bold">{brands.length}</p>
          </div>
              <Building2 className="w-8 h-8 text-blue-200" />
        </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Toplam Görev</p>
                <p className="text-2xl font-bold">{brands.reduce((sum, brand) => sum + brand.missions, 0)}</p>
              </div>
              <Target className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Toplam Paylaşım</p>
                <p className="text-2xl font-bold">{brands.reduce((sum, brand) => sum + brand.totalShares, 0).toLocaleString()}</p>
              </div>
              <Share2 className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-100 text-sm font-medium">Toplam Takipçi</p>
                <p className="text-2xl font-bold">{brands.reduce((sum, brand) => sum + brand.followers, 0).toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-pink-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Toplam Bakiye</p>
                <p className="text-2xl font-bold">₺{brands.reduce((sum, brand) => sum + brand.balance, 0).toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Add Button */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Input
                  placeholder="Marka ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search size={18} />}
            className="w-full sm:w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tüm Durumlar</option>
            <option value="Aktif">Aktif</option>
            <option value="Pasif">Pasif</option>
          </select>
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
        </div>
        <div className="flex items-center gap-4">
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
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
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsProfileModalOpen(true)}
              leftIcon={<UserPlus size={18} />}
              className="w-full lg:w-auto"
            >
              Marka Profili Oluştur
            </Button>
            <Button
              onClick={() => setIsModalOpen(true)}
              leftIcon={<Plus size={18} />}
              className="w-full lg:w-auto"
            >
              Yeni Marka Ekle
            </Button>
            </div>
          </div>
        </div>

      {/* Brands Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand) => (
          <Card key={brand.id} className="qappio-card-hover">
            {/* Cover Image */}
            {brand.coverImage && (
              <div className="relative h-32 overflow-hidden rounded-t-xl">
                <img 
                  src={brand.coverImage} 
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
            )}
            
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                    <p className="text-sm text-gray-600">{brand.email}</p>
                  </div>
                </div>
                <Badge 
                  variant={brand.status === 'Aktif' ? 'success' : 'danger'}
                >
                  {brand.status}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <p className="text-gray-500">Bakiye</p>
                  <p className="font-semibold text-gray-900">₺{brand.balance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Kategori</p>
                  <p className="font-semibold text-gray-900">{brand.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Kullanıcı</p>
                  <p className="font-semibold text-gray-900">{brand.users}</p>
                </div>
                <div>
                  <p className="text-gray-500">Görev</p>
                  <p className="font-semibold text-gray-900">{brand.missions}</p>
                </div>
                <div>
                  <p className="text-gray-500">Paylaşım</p>
                  <p className="font-semibold text-gray-900">{brand.totalShares.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-500">Takipçi</p>
                  <p className="font-semibold text-pink-600">{brand.followers.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(brand.createdAt).toLocaleDateString('tr-TR')}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleView(brand)}
                  >
                    <Eye size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingBrand(brand)
                      setIsEditModalOpen(true)
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteBrand(brand.id)}
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marka</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bakiye</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Görev</th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paylaşım</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Takipçi</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBrands.map((brand) => (
                  <tr key={brand.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                          <img 
                            src={brand.logo} 
                            alt={brand.name}
                          className="w-10 h-10 rounded-lg object-cover mr-3"
                          />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                          <div className="text-sm text-gray-500">{brand.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="default" className="capitalize">{brand.category}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={brand.status === 'Aktif' ? 'success' : 'danger'}>
                        {brand.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">₺{brand.balance.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{brand.users}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{brand.missions}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">{brand.totalShares.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-pink-600">{brand.followers.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingBrand(brand)
                            setIsEditModalOpen(true)
                          }}
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBrand(brand.id)}
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

        {/* Add Brand Modal */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Yeni Marka Ekle</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Marka Adı"
                    value={newBrand.name}
                  onChange={(e) => setNewBrand(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Marka adını girin"
                  required
                />
                
                <Input
                  label="E-posta"
                    type="email"
                    value={newBrand.email}
                  onChange={(e) => setNewBrand(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="info@marka.com"
                  required
                />
                
                <Input
                  label="Bakiye (₺)"
                    type="number"
                    value={newBrand.balance}
                  onChange={(e) => setNewBrand(prev => ({ ...prev, balance: Number(e.target.value) }))}
                    placeholder="0"
                  required
                />
                
                <select
                  value={newBrand.category}
                  onChange={(e) => setNewBrand(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Kategori Seçin</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                    <select
                      value={newBrand.status}
                  onChange={(e) => setNewBrand(prev => ({ ...prev, status: e.target.value as 'Aktif' | 'Pasif' }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Pasif">Pasif</option>
                    </select>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    {newBrand.logo ? (
                      <div className="space-y-4">
                        <img 
                          src={newBrand.logo} 
                          alt="Preview" 
                          className="w-20 h-20 object-cover rounded-lg mx-auto"
                        />
                        <Button
                          variant="secondary"
                          onClick={() => setNewBrand(prev => ({ ...prev, logo: '' }))}
                        >
                          Logoyu Kaldır
                        </Button>
                  </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload size={48} className="mx-auto text-gray-400" />
                  <div>
                          <p className="text-sm text-gray-600">
                            Logo yüklemek için tıklayın
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF (max. 5MB)
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          PC'den Logo Seç
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, false)}
                          className="hidden"
                        />
                      </div>
                    )}
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
                  onClick={handleAddBrand}
                  disabled={!newBrand.name || !newBrand.email || !newBrand.category}
                >
                  Marka Ekle
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

              {/* Brand Detail Modal */}
        {isDetailModalOpen && selectedBrand && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Marka Detayları</h2>
                <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <X size={24} />
                </button>
              </div>
                
                <div className="space-y-6">
                  {/* Cover Image */}
                  {selectedBrand.coverImage && (
                    <div className="relative">
                      <img 
                        src={selectedBrand.coverImage} 
                        alt="Cover"
                        className="w-full h-48 object-cover rounded-xl border border-gray-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
                  )}
                  
                  {/* Brand Header */}
                  <div className="flex items-center space-x-4">
                    <img 
                      src={selectedBrand.logo} 
                      alt={selectedBrand.name}
                      className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedBrand.name}</h3>
                      <p className="text-gray-600">{selectedBrand.email}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge variant={selectedBrand.status === 'Aktif' ? 'success' : 'danger'}>
                          {selectedBrand.status}
                        </Badge>
                        <Badge variant="default" className="capitalize">{selectedBrand.category}</Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Statistics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <p className="text-2xl font-bold text-blue-600">{selectedBrand.missions}</p>
                      <p className="text-sm text-gray-500">Toplam Görev</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <p className="text-2xl font-bold text-green-600">{selectedBrand.users}</p>
                      <p className="text-sm text-gray-500">Kullanıcı</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                      <p className="text-2xl font-bold text-purple-600">{selectedBrand.totalShares.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Toplam Paylaşım</p>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-xl">
                      <p className="text-2xl font-bold text-pink-600">{selectedBrand.followers.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Takipçi</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-xl">
                      <p className="text-2xl font-bold text-yellow-600">₺{selectedBrand.balance.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">Bakiye</p>
                    </div>
                  </div>
                  
                  {/* Additional Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2">Marka Bilgileri</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Kategori:</span>
                          <span className="font-medium">{selectedBrand.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Durum:</span>
                          <Badge variant={selectedBrand.status === 'Aktif' ? 'success' : 'danger'}>
                            {selectedBrand.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Kayıt Tarihi:</span>
                          <span className="font-medium">{new Date(selectedBrand.createdAt).toLocaleDateString('tr-TR')}</span>
                        </div>
                        {selectedBrand.phone && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Telefon:</span>
                            <span className="font-medium">{selectedBrand.phone}</span>
          </div>
        )}
                        {selectedBrand.website && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Website:</span>
                            <a href={selectedBrand.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline">
                              {selectedBrand.website}
                            </a>
                          </div>
                        )}
                        {selectedBrand.address && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Adres:</span>
                            <span className="font-medium">{selectedBrand.address}</span>
                          </div>
                        )}
                        {selectedBrand.foundedYear && (
                          <div className="flex justify-between">
                            <span className="text-gray-500">Kuruluş Yılı:</span>
                            <span className="font-medium">{selectedBrand.foundedYear}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-2">Performans Özeti</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Görev Başına Paylaşım:</span>
                          <span className="font-medium">
                            {selectedBrand.missions > 0 ? Math.round(selectedBrand.totalShares / selectedBrand.missions) : 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Kullanıcı Başına Görev:</span>
                          <span className="font-medium">
                            {selectedBrand.users > 0 ? Math.round(selectedBrand.missions / selectedBrand.users * 100) / 100 : 0}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Ortalama Bakiye:</span>
                          <span className="font-medium">₺{selectedBrand.balance.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* License Information */}
                  {selectedBrand.license && (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Crown className="w-5 h-5 mr-2 text-blue-600" />
                        Lisans Bilgileri
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                          <p className="text-xs text-gray-500 mb-1">Lisans Tipi</p>
                          <Badge variant="level" className="capitalize">{selectedBrand.license.type}</Badge>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                          <p className="text-xs text-gray-500 mb-1">Başlangıç</p>
                          <p className="text-sm font-medium">{new Date(selectedBrand.license.startDate).toLocaleDateString('tr-TR')}</p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                          <p className="text-xs text-gray-500 mb-1">Bitiş</p>
                          <p className="text-sm font-medium">{new Date(selectedBrand.license.endDate).toLocaleDateString('tr-TR')}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                        <p className="text-xs text-gray-500 mb-2">Lisans Özellikleri</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedBrand.license.features.map((feature, index) => (
                            <Badge key={index} variant="info" size="sm">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Social Media */}
                  {selectedBrand.socialMedia && (
                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Globe className="w-5 h-5 mr-2 text-gray-600" />
                        Sosyal Medya
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedBrand.socialMedia.instagram && (
                          <a href={`https://instagram.com/${selectedBrand.socialMedia.instagram}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow">
                            <span className="text-sm font-medium">Instagram</span>
                          </a>
                        )}
                        {selectedBrand.socialMedia.twitter && (
                          <a href={`https://twitter.com/${selectedBrand.socialMedia.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg hover:shadow-lg transition-shadow">
                            <span className="text-sm font-medium">Twitter</span>
                          </a>
                        )}
                        {selectedBrand.socialMedia.facebook && (
                          <a href={`https://facebook.com/${selectedBrand.socialMedia.facebook}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition-shadow">
                            <span className="text-sm font-medium">Facebook</span>
                          </a>
                        )}
                        {selectedBrand.socialMedia.linkedin && (
                          <a href={`https://linkedin.com/company/${selectedBrand.socialMedia.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg hover:shadow-lg transition-shadow">
                            <span className="text-sm font-medium">LinkedIn</span>
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Takipçi Listesi */}
                  <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-200">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-pink-600" />
                      Takipçi Listesi ({selectedBrand.followers})
                    </h4>
                    {selectedBrand.followersList && selectedBrand.followersList.length > 0 ? (
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {selectedBrand.followersList.map((follower) => (
                          <div key={follower.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-pink-200 shadow-sm">
                            <div className="flex items-center space-x-3">
                              <img 
                                src={follower.avatar} 
                                alt={follower.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{follower.name}</div>
                                <div className="text-sm text-gray-500">{follower.email}</div>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Badge variant="level" className="text-xs">
                                    {follower.level}
                                  </Badge>
                                  <span className="text-xs text-gray-400">
                                    {new Date(follower.followedAt).toLocaleDateString('tr-TR')}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={follower.isActive ? 'success' : 'danger'} size="sm">
                                {follower.isActive ? 'Aktif' : 'Pasif'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                        <p>Henüz takipçi bulunmuyor</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-end mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={() => setIsDetailModalOpen(false)}
                  >
                    Kapat
                  </Button>
                  <Button
                    onClick={() => {
                      setEditingBrand(selectedBrand)
                      setIsDetailModalOpen(false)
                      setIsEditModalOpen(true)
                    }}
                  >
                    Düzenle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Brand Profile Creation Modal */}
        {isProfileModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Marka Profili Oluştur</h2>
                <button 
                    onClick={() => setIsProfileModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Sol Kolon - Temel Bilgiler */}
              <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Temel Bilgiler</h3>
                    
                    <Input
                      label="Marka Adı *"
                      value={newBrandProfile.name}
                      onChange={(e) => setNewBrandProfile(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Marka adını girin"
                      required
                    />
                    
                    <Input
                      label="E-posta *"
                      type="email"
                      value={newBrandProfile.email}
                      onChange={(e) => setNewBrandProfile(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="info@marka.com"
                      required
                    />
                    
                    <Input
                      label="Telefon"
                      value={newBrandProfile.phone}
                      onChange={(e) => setNewBrandProfile(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+90 555 123 45 67"
                    />
                    
                    <Input
                      label="Website"
                      value={newBrandProfile.website}
                      onChange={(e) => setNewBrandProfile(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://www.marka.com"
                    />
                    
                    <select
                      value={newBrandProfile.category}
                      onChange={(e) => setNewBrandProfile(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Kategori Seçin *</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    
                    <Input
                      label="Kuruluş Yılı"
                      value={newBrandProfile.foundedYear}
                      onChange={(e) => setNewBrandProfile(prev => ({ ...prev, foundedYear: e.target.value }))}
                      placeholder="2020"
                    />
                    
                    <Input
                      label="Adres"
                      value={newBrandProfile.address}
                      onChange={(e) => setNewBrandProfile(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="İstanbul, Türkiye"
                    />
                    
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                      <textarea
                        value={newBrandProfile.description}
                        onChange={(e) => setNewBrandProfile(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Marka hakkında kısa açıklama..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={3}
                      />
                    </div>
                </div>
                  
                  {/* Sağ Kolon - Lisans ve Sosyal Medya */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Lisans Bilgileri</h3>
                    
                    <select
                      value={newBrandProfile.license.type}
                      onChange={(e) => setNewBrandProfile(prev => ({ 
                        ...prev, 
                        license: { ...prev.license, type: e.target.value as 'Freemium' | 'Premium' | 'Platinium' }
                      }))}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Freemium">Freemium Plan</option>
                      <option value="Premium">Premium Plan</option>
                      <option value="Platinium">Platinium Plan</option>
                    </select>
                    
                    <Input
                      label="Lisans Başlangıç Tarihi *"
                      type="date"
                      value={newBrandProfile.license.startDate}
                      onChange={(e) => setNewBrandProfile(prev => ({ 
                        ...prev, 
                        license: { ...prev.license, startDate: e.target.value }
                      }))}
                      required
                    />
                    
                    <Input
                      label="Lisans Bitiş Tarihi *"
                      type="date"
                      value={newBrandProfile.license.endDate}
                      onChange={(e) => setNewBrandProfile(prev => ({ 
                        ...prev, 
                        license: { ...prev.license, endDate: e.target.value }
                      }))}
                      required
                    />
                    
                    <Input
                      label="Lisans Ücreti (₺) *"
                      type="number"
                      value={newBrandProfile.license.price}
                      onChange={(e) => setNewBrandProfile(prev => ({ 
                        ...prev, 
                        license: { ...prev.license, price: Number(e.target.value) }
                      }))}
                      placeholder="0"
                      required
                    />

                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Lisans Özellikleri</label>
                      <div className="space-y-2">
                        {['Görev Oluşturma', 'Kullanıcı Yönetimi', 'Analitik Raporlar', 'API Erişimi', 'Öncelikli Destek'].map((feature, index) => (
                          <label key={index} className="flex items-center">
                    <input
                              type="checkbox"
                              checked={newBrandProfile.license.features.includes(feature)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewBrandProfile(prev => ({
                                    ...prev,
                                    license: {
                                      ...prev.license,
                                      features: [...prev.license.features, feature]
                                    }
                                  }))
                                } else {
                                  setNewBrandProfile(prev => ({
                                    ...prev,
                                    license: {
                                      ...prev.license,
                                      features: prev.license.features.filter(f => f !== feature)
                                    }
                                  }))
                                }
                              }}
                              className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2 mt-6">Sosyal Medya</h3>
                    
                    <Input
                      label="Instagram"
                      value={newBrandProfile.socialMedia.instagram}
                      onChange={(e) => setNewBrandProfile(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                      }))}
                      placeholder="@markaadi"
                    />
                    
                    <Input
                      label="Twitter"
                      value={newBrandProfile.socialMedia.twitter}
                      onChange={(e) => setNewBrandProfile(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                      }))}
                      placeholder="@markaadi"
                    />
                    
                    <Input
                      label="Facebook"
                      value={newBrandProfile.socialMedia.facebook}
                      onChange={(e) => setNewBrandProfile(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                      }))}
                      placeholder="markaadi"
                    />
                    
                    <Input
                      label="LinkedIn"
                      value={newBrandProfile.socialMedia.linkedin}
                      onChange={(e) => setNewBrandProfile(prev => ({ 
                        ...prev, 
                        socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                      }))}
                      placeholder="markaadi"
                    />
                  </div>
                </div>
                
                {/* Logo Upload */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo Yükle</h3>
                  {newBrandProfile.logo ? (
                    <div className="space-y-4">
                      <img
                        src={newBrandProfile.logo}
                        alt="Logo Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setNewBrandProfile(prev => ({ ...prev, logo: '' }))}
                        className="text-red-600 hover:text-red-700"
                      >
                        Logoyu Kaldır
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload size={48} className="mx-auto text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Logo yüklemek için tıklayın
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG veya SVG formatında, maksimum 5MB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = 'image/*'
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.readAsDataURL(file)
                              reader.onload = (e) => {
                                setNewBrandProfile(prev => ({
                                  ...prev,
                                  logo: e.target?.result as string
                                }))
                              }
                            }
                          }
                          input.click()
                        }}
                      >
                        Logo Seç
                      </Button>
                    </div>
                  )}
                </div>

                {/* Cover Image Upload */}
                <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Kapak Resmi Yükle</h3>
                  {newBrandProfile.coverImage ? (
                    <div className="space-y-4">
                      <img
                        src={newBrandProfile.coverImage}
                        alt="Cover Image Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-200"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setNewBrandProfile(prev => ({ ...prev, coverImage: '' }))}
                        className="text-red-600 hover:text-red-700"
                      >
                        Kapak Resmini Kaldır
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload size={48} className="mx-auto text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Kapak resmi yüklemek için tıklayın
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG formatında, önerilen boyut: 1200x400px, maksimum 5MB
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          const input = document.createElement('input')
                          input.type = 'file'
                          input.accept = 'image/*'
                          input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.readAsDataURL(file)
                              reader.onload = (e) => {
                                setNewBrandProfile(prev => ({
                                  ...prev,
                                  coverImage: e.target?.result as string
                                }))
                              }
                            }
                          }
                          input.click()
                        }}
                      >
                        Kapak Resmi Seç
                      </Button>
                    </div>
                    )}
                  </div>
                
                <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={() => setIsProfileModalOpen(false)}
                  >
                    İptal
                  </Button>
                  <Button
                    onClick={handleCreateBrandProfile}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    Marka Profili Oluştur
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Brand Modal */}
        {isEditModalOpen && editingBrand && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Marka Düzenle</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <Input
                  label="Marka Adı"
                  value={editingBrand.name}
                  onChange={(e) => setEditingBrand(prev => prev ? { ...prev, name: e.target.value } : null)}
                  placeholder="Marka adını girin"
                  required
                />
                
                <Input
                  label="E-posta"
                    type="email"
                    value={editingBrand.email}
                  onChange={(e) => setEditingBrand(prev => prev ? { ...prev, email: e.target.value } : null)}
                  placeholder="info@marka.com"
                  required
                />
                
                <Input
                  label="Bakiye (₺)"
                    type="number"
                    value={editingBrand.balance}
                  onChange={(e) => setEditingBrand(prev => prev ? { ...prev, balance: Number(e.target.value) } : null)}
                  placeholder="0"
                  required
                />
                
                <select
                  value={editingBrand.category}
                  onChange={(e) => setEditingBrand(prev => prev ? { ...prev, category: e.target.value } : null)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Kategori Seçin</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                
                    <select
                      value={editingBrand.status}
                  onChange={(e) => setEditingBrand(prev => prev ? { ...prev, status: e.target.value as 'Aktif' | 'Pasif' } : null)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                    >
                      <option value="Aktif">Aktif</option>
                      <option value="Pasif">Pasif</option>
                    </select>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    {editingBrand.logo ? (
                      <div className="space-y-4">
                        <img 
                          src={editingBrand.logo} 
                          alt="Preview" 
                          className="w-20 h-20 object-cover rounded-lg mx-auto"
                        />
                        <Button
                          variant="secondary"
                          onClick={() => setEditingBrand(prev => prev ? { ...prev, logo: '' } : null)}
                        >
                          Logoyu Kaldır
                        </Button>
                  </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload size={48} className="mx-auto text-gray-400" />
                  <div>
                          <p className="text-sm text-gray-600">
                            Logo yüklemek için tıklayın
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF (max. 5MB)
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => editFileInputRef.current?.click()}
                        >
                          PC'den Logo Seç
                        </Button>
                        <input
                          ref={editFileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, true)}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
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
                  onClick={handleEditBrand}
                  disabled={!editingBrand.name || !editingBrand.email || !editingBrand.category}
                >
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </div>
          </div>
      </div>
      )}
    </DashboardLayout>
  )
}
