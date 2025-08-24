'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Crown, Plus, Edit, Trash2, X, Palette, Target, Award, Users, Star, Search, Eye, Grid, List } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

interface Level {
  id: string
  name: string
  displayName: string
  minPoints: number
  maxPoints: number
  color: string
  gradient: string
  description: string
  benefits: string[]
  requirements: string[]
  badgeUrl: string
  isActive: boolean
  userCount: number
  createdAt: string
}

const mockLevels: Level[] = [
  {
    id: '1',
    name: 'snapper',
    displayName: 'Snapper',
      minPoints: 0,
      maxPoints: 999,
    color: '#FCD34D',
    gradient: 'from-yellow-400 to-orange-500',
    description: 'Yeni başlayan fotoğrafçılar ve içerik üreticileri',
    benefits: [
      'Temel görevlere katılım',
      'Topluluk desteği',
      'Eğitim materyalleri'
    ],
    requirements: [
      'Hesap oluşturma',
      'İlk görevi tamamlama'
    ],
    badgeUrl: 'https://via.placeholder.com/100x100/FCD34D/FFFFFF?text=S',
    isActive: true,
    userCount: 1250,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'seeker',
    displayName: 'Seeker',
      minPoints: 1000,
      maxPoints: 2499,
    color: '#FB923C',
    gradient: 'from-orange-400 to-red-500',
    description: 'Deneyimli içerik üreticileri ve arayış içindeki kullanıcılar',
    benefits: [
      'Gelişmiş görevlere erişim',
      'Özel rozetler',
      'Mentorluk programı'
    ],
    requirements: [
      '1000 puan toplama',
      'En az 10 görev tamamlama'
    ],
    badgeUrl: 'https://via.placeholder.com/100x100/FB923C/FFFFFF?text=Se',
    isActive: true,
    userCount: 890,
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    name: 'crafter',
    displayName: 'Crafter',
      minPoints: 2500,
      maxPoints: 4999,
    color: '#34D399',
    gradient: 'from-green-400 to-emerald-500',
    description: 'Uzman içerik üreticileri ve yaratıcı sanatçılar',
    benefits: [
      'Premium görevlere erişim',
      'Özel etkinlikler',
      'Marka işbirlikleri'
    ],
    requirements: [
      '2500 puan toplama',
      'En az 25 görev tamamlama',
      'Yüksek kalite standartları'
    ],
    badgeUrl: 'https://via.placeholder.com/100x100/34D399/FFFFFF?text=Cr',
    isActive: true,
    userCount: 456,
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    name: 'viralist',
    displayName: 'Viralist',
      minPoints: 5000,
      maxPoints: 9999,
    color: '#F87171',
    gradient: 'from-red-400 to-pink-500',
    description: 'Viral içerik üreticileri ve sosyal medya fenomenleri',
    benefits: [
      'VIP görevlere erişim',
      'Özel etkinlikler',
      'Marka ortaklıkları',
      'Öncelikli destek'
    ],
    requirements: [
      '5000 puan toplama',
      'En az 50 görev tamamlama',
      'Viral içerik üretimi',
      'Yüksek etkileşim oranları'
    ],
    badgeUrl: 'https://via.placeholder.com/100x100/F87171/FFFFFF?text=Vi',
    isActive: true,
    userCount: 234,
    createdAt: '2024-01-01'
  },
  {
    id: '5',
    name: 'qappian',
    displayName: 'Qappian',
      minPoints: 10000,
      maxPoints: 99999,
    color: '#60A5FA',
    gradient: 'from-blue-400 to-indigo-500',
    description: 'Elite içerik üreticileri ve platform şampiyonları',
    benefits: [
      'Tüm görevlere erişim',
      'Özel rozetler ve unvanlar',
      'Platform temsilciliği',
      'Özel etkinlikler',
      'Marka işbirlikleri',
      'Mentorluk fırsatları'
    ],
    requirements: [
      '10000 puan toplama',
      'En az 100 görev tamamlama',
      'Mükemmel kalite standartları',
      'Topluluk katkısı',
      'Platform değerlerine uyum'
    ],
    badgeUrl: 'https://via.placeholder.com/100x100/60A5FA/FFFFFF?text=Qa',
    isActive: true,
    userCount: 89,
    createdAt: '2024-01-01'
  }
]

const colorPalette = [
  { name: 'Sarı', hex: '#FCD34D', gradient: 'from-yellow-400 to-orange-500' },
  { name: 'Turuncu', hex: '#FB923C', gradient: 'from-orange-400 to-red-500' },
  { name: 'Yeşil', hex: '#34D399', gradient: 'from-green-400 to-emerald-500' },
  { name: 'Kırmızı', hex: '#F87171', gradient: 'from-red-400 to-pink-500' },
  { name: 'Mavi', hex: '#60A5FA', gradient: 'from-blue-400 to-indigo-500' },
  { name: 'Mor', hex: '#A78BFA', gradient: 'from-purple-400 to-violet-500' },
  { name: 'Pembe', hex: '#F472B6', gradient: 'from-pink-400 to-rose-500' },
  { name: 'Teal', hex: '#2DD4BF', gradient: 'from-teal-400 to-cyan-500' }
]

export default function LevelsPage() {
  const [levels, setLevels] = useState<Level[]>(mockLevels)
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingLevel, setEditingLevel] = useState<Level | null>(null)
  const [newLevel, setNewLevel] = useState<Omit<Level, 'id' | 'userCount' | 'createdAt'>>({
    name: '',
    displayName: '',
    minPoints: 0,
    maxPoints: 999,
    color: '#FCD34D',
    gradient: 'from-yellow-400 to-orange-500',
    description: '',
    benefits: [''],
    requirements: [''],
    badgeUrl: '',
    isActive: true
  })
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [viewingLevel, setViewingLevel] = useState<Level | null>(null)

  const handleAddLevel = () => {
    if (newLevel.name && newLevel.displayName && newLevel.description) {
      const level: Level = {
        id: Date.now().toString(),
        ...newLevel,
        userCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      
      setLevels(prev => [...prev, level])
      setNewLevel({
        name: '',
        displayName: '',
        minPoints: 0,
        maxPoints: 999,
        color: '#FCD34D',
        gradient: 'from-yellow-400 to-orange-500',
        description: '',
        benefits: [''],
        requirements: [''],
        badgeUrl: '',
        isActive: true
      })
      setIsModalOpen(false)
    }
  }

  const handleEditLevel = () => {
    if (editingLevel && editingLevel.name && editingLevel.displayName && editingLevel.description) {
      // Boş avantaj ve gereksinimleri filtrele
      const filteredBenefits = editingLevel.benefits.filter(b => b.trim())
      const filteredRequirements = editingLevel.requirements.filter(r => r.trim())
      
      const updatedLevel = {
        ...editingLevel,
        benefits: filteredBenefits.length > 0 ? filteredBenefits : [''],
        requirements: filteredRequirements.length > 0 ? filteredRequirements : ['']
      }
      
      setLevels(prev => prev.map(l => 
        l.id === editingLevel.id ? updatedLevel : l
      ))
      setEditingLevel(null)
      setIsEditModalOpen(false)
    }
  }

  const handleDeleteLevel = (id: string) => {
    if (confirm('Bu seviyeyi silmek istediğinizden emin misiniz?')) {
      setLevels(prev => prev.filter(l => l.id !== id))
    }
  }

  const addBenefit = () => {
    setNewLevel(prev => ({
      ...prev,
      benefits: [...prev.benefits, '']
    }))
  }

  const removeBenefit = (index: number) => {
    setNewLevel(prev => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }))
  }

  const updateBenefit = (index: number, value: string) => {
    setNewLevel(prev => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }))
  }

  const addRequirement = () => {
    setNewLevel(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }))
  }

  const removeRequirement = (index: number) => {
    setNewLevel(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }))
  }

  const updateRequirement = (index: number, value: string) => {
    setNewLevel(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }))
  }

  const addEditingBenefit = () => {
    setEditingLevel(prev => prev ? ({
      ...prev,
      benefits: [...prev.benefits, '']
    }) : null)
  }

  const removeEditingBenefit = (index: number) => {
    setEditingLevel(prev => prev ? ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index)
    }) : null)
  }

  const updateEditingBenefit = (index: number, value: string) => {
    setEditingLevel(prev => prev ? ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => i === index ? value : benefit)
    }) : null)
  }

  const addEditingRequirement = () => {
    setEditingLevel(prev => prev ? ({
      ...prev,
      requirements: [...prev.requirements, '']
    }) : null)
  }

  const removeEditingRequirement = (index: number) => {
    setEditingLevel(prev => prev ? ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }) : null)
  }

  const updateEditingRequirement = (index: number, value: string) => {
    setEditingLevel(prev => prev ? ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }) : null)
  }

  const filteredLevels = levels.filter(level => 
    level.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    level.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleView = (level: Level) => {
    setViewingLevel(level)
    setIsViewModalOpen(true)
  }

  const handleEdit = (level: Level) => {
    setEditingLevel(level)
    setIsEditModalOpen(true)
  }

  const handleDelete = (id: string) => {
    handleDeleteLevel(id)
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Seviye Yönetimi</h1>
            <p className="text-gray-600">Platform seviyelerini yönetin ve takip edin</p>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3"
          >
            <Plus className="w-5 h-5 mr-2" />
            + Seviye Ekle
          </Button>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Seviye ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
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
        </div>

        {/* Levels Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLevels.map((level) => (
              <Card key={level.id} className="hover:shadow-lg transition-shadow duration-200 min-w-0 h-full flex flex-col">
                <CardHeader className="pb-3 overflow-hidden flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${level.gradient} flex-shrink-0`}>
                        <span className="text-white font-bold text-lg">{level.displayName.charAt(0)}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 truncate">{level.displayName}</h3>
                        <p className="text-sm text-gray-600 truncate">{level.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Badge variant="level" className={`bg-gradient-to-r ${level.gradient} text-white px-3 py-1 text-sm whitespace-nowrap`}>
                      {level.minPoints.toLocaleString()} - {level.maxPoints ? level.maxPoints.toLocaleString() : '∞'} Puan
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 overflow-hidden flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 break-words">{level.description}</p>
                  <div className="space-y-2 mb-4 flex-shrink-0">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Min Puan:</span>
                      <span className="font-medium text-gray-900">{level.minPoints.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Max Puan:</span>
                      <span className="font-medium text-gray-900">{level.maxPoints ? level.maxPoints.toLocaleString() : '∞'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Kullanıcı Sayısı:</span>
                      <span className="font-medium text-gray-900">{level.userCount.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 mt-auto flex-shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(level)}
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Görüntüle
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(level)}
                      className="w-full"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Düzenle
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteLevel(level.id)}
                      className="text-red-600 hover:text-red-700 hover:border-red-300 w-full"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Sil
                    </Button>
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seviye</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Görünen Ad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puan Aralığı</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı Sayısı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Renk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLevels.map((level) => (
                  <tr key={level.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${level.gradient} mr-3`}>
                            <span className="text-white font-bold">{level.displayName.charAt(0)}</span>
                          </div>
                          <div>
                        <div className="text-sm font-medium text-gray-900">{level.name}</div>
                            <div className="text-sm text-gray-500">{level.description}</div>
                        </div>
                        </div>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{level.displayName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {level.minPoints.toLocaleString()} - {level.maxPoints ? level.maxPoints.toLocaleString() : '∞'}
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{level.userCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`w-6 h-6 rounded ${level.gradient}`}></div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(level)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(level)}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteLevel(level.id)}
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
        {filteredLevels.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Seviye bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin</p>
        </div>
        )}

        {/* Add Level Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Yeni Seviye Ekle</h2>
              <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Seviye Adı (küçük harf)"
                  value={newLevel.name}
                    onChange={(e) => setNewLevel(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="snapper"
                    required
                  />
                  
                  <Input
                    label="Görünen Ad"
                    value={newLevel.displayName}
                    onChange={(e) => setNewLevel(prev => ({ ...prev, displayName: e.target.value }))}
                    placeholder="Snapper"
                    required
                  />
                  
                  <Input
                    label="Minimum Puan"
                    type="number"
                    value={newLevel.minPoints}
                    onChange={(e) => setNewLevel(prev => ({ ...prev, minPoints: Number(e.target.value) }))}
                    placeholder="0"
                    required
                  />
                  
                  <Input
                    label="Maksimum Puan"
                    type="number"
                    value={newLevel.maxPoints}
                    onChange={(e) => setNewLevel(prev => ({ ...prev, maxPoints: Number(e.target.value) }))}
                    placeholder="999"
                    required
                  />
                  
                  <Input
                    label="Renk (HEX)"
                    value={newLevel.color}
                    onChange={(e) => setNewLevel(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="#FCD34D"
                    required
                  />
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Renk Paleti</label>
                    <div className="grid grid-cols-4 gap-3">
                      {colorPalette.map((color) => (
                        <button
                          key={color.hex}
                          type="button"
                          onClick={() => setNewLevel(prev => ({ 
                            ...prev, 
                            color: color.hex, 
                            gradient: color.gradient 
                          }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            newLevel.color === color.hex 
                              ? 'border-blue-500 ring-2 ring-blue-200' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-full h-8 rounded bg-gradient-to-r ${color.gradient} mb-2`}></div>
                          <span className="text-xs text-gray-600">{color.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                    <textarea
                      value={newLevel.description}
                      onChange={(e) => setNewLevel(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Seviye açıklamasını girin"
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Avantajlar</label>
                    <div className="space-y-2">
                      {newLevel.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={benefit}
                            onChange={(e) => updateBenefit(index, e.target.value)}
                            placeholder={`Avantaj ${index + 1}`}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBenefit(index)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={addBenefit}
                        size="sm"
                      >
                        Avantaj Ekle
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gereksinimler</label>
                    <div className="space-y-2">
                      {newLevel.requirements.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Input
                            value={req}
                            onChange={(e) => updateRequirement(index, e.target.value)}
                            placeholder={`Gereksinim ${index + 1}`}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeRequirement(index)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={addRequirement}
                        size="sm"
                      >
                        Gereksinim Ekle
                      </Button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rozet URL</label>
                    <Input
                      value={newLevel.badgeUrl}
                      onChange={(e) => setNewLevel(prev => ({ ...prev, badgeUrl: e.target.value }))}
                      placeholder="https://example.com/badge.png"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newLevel.isActive}
                        onChange={(e) => setNewLevel(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Aktif Seviye</span>
                    </label>
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
                    onClick={handleAddLevel}
                    disabled={!newLevel.name || !newLevel.displayName || !newLevel.description}
                  >
                    Seviye Ekle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Edit Level Modal */}
      {isEditModalOpen && editingLevel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Seviye Düzenle</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Seviye Adı (küçük harf)"
                  value={editingLevel.name}
                  onChange={(e) => setEditingLevel(prev => prev ? { ...prev, name: e.target.value } : null)}
                  placeholder="snapper"
                  required
                />
                
                <Input
                  label="Görünen Ad"
                  value={editingLevel.displayName}
                  onChange={(e) => setEditingLevel(prev => prev ? { ...prev, displayName: e.target.value } : null)}
                  placeholder="Snapper"
                  required
                />
                
                <Input
                  label="Minimum Puan"
                  type="number"
                  value={editingLevel.minPoints}
                  onChange={(e) => setEditingLevel(prev => prev ? { ...prev, minPoints: Number(e.target.value) } : null)}
                  placeholder="0"
                  required
                />
                
                <Input
                  label="Maksimum Puan"
                  type="number"
                  value={editingLevel.maxPoints}
                  onChange={(e) => setEditingLevel(prev => prev ? { ...prev, maxPoints: Number(e.target.value) } : null)}
                  placeholder="999"
                  required
                />
                
                <Input
                  label="Renk (HEX)"
                  value={editingLevel.color}
                  onChange={(e) => setEditingLevel(prev => prev ? { ...prev, color: e.target.value } : null)}
                  placeholder="#FCD34D"
                  required
                />
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Renk Paleti</label>
                  <div className="grid grid-cols-4 gap-3">
                    {colorPalette.map((color) => (
                      <button
                        key={color.hex}
                        type="button"
                        onClick={() => setEditingLevel(prev => prev ? { ...prev, color: color.hex, gradient: color.gradient } : null)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          editingLevel.color === color.hex 
                            ? 'border-blue-500 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-8 rounded bg-gradient-to-r ${color.gradient} mb-2`}></div>
                        <span className="text-xs text-gray-600">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                  <textarea
                    value={editingLevel.description}
                    onChange={(e) => setEditingLevel(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Seviye açıklamasını girin"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rozet URL</label>
                  <Input
                    value={editingLevel.badgeUrl}
                    onChange={(e) => setEditingLevel(prev => prev ? { ...prev, badgeUrl: e.target.value } : null)}
                    placeholder="https://example.com/badge.png"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Avantajlar</label>
                  <div className="space-y-2">
                    {editingLevel.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={benefit}
                          onChange={(e) => updateEditingBenefit(index, e.target.value)}
                          placeholder={`Avantaj ${index + 1}`}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEditingBenefit(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addEditingBenefit}
                      size="sm"
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Avantaj Ekle
                    </Button>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gereksinimler</label>
                  <div className="space-y-2">
                    {editingLevel.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={requirement}
                          onChange={(e) => updateEditingRequirement(index, e.target.value)}
                          placeholder={`Gereksinim ${index + 1}`}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEditingRequirement(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addEditingRequirement}
                      size="sm"
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Gereksinim Ekle
                    </Button>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingLevel.isActive}
                      onChange={(e) => setEditingLevel(prev => prev ? { ...prev, isActive: e.target.checked } : null)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Aktif Seviye</span>
                  </label>
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
                  onClick={handleEditLevel}
                  disabled={!editingLevel.name || !editingLevel.displayName || !editingLevel.description || editingLevel.benefits.some(b => !b.trim()) || editingLevel.requirements.some(r => !r.trim())}
                >
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* View Level Modal */}
      {isViewModalOpen && viewingLevel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Seviye Detayları</h2>
              <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                  <X size={24} />
              </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center bg-gradient-to-r ${viewingLevel.gradient}`}>
                    <span className="text-white font-bold text-2xl">{viewingLevel.displayName.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{viewingLevel.displayName}</h3>
                    <p className="text-gray-600">{viewingLevel.name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Puan Aralığı</h4>
                    <p className="text-2xl font-bold text-gray-900">
                      {viewingLevel.minPoints.toLocaleString()} - {viewingLevel.maxPoints ? viewingLevel.maxPoints.toLocaleString() : '∞'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Kullanıcı Sayısı</h4>
                    <p className="text-2xl font-bold text-gray-900">{viewingLevel.userCount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Açıklama</h4>
                  <p className="text-gray-600">{viewingLevel.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Avantajlar</h4>
                  <ul className="space-y-1">
                    {viewingLevel.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Gereksinimler</h4>
                  <ul className="space-y-1">
                    {viewingLevel.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Durum:</span>
                    <Badge variant={viewingLevel.isActive ? "success" : "warning"}>
                      {viewingLevel.isActive ? 'Aktif' : 'Pasif'}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    Oluşturulma: {new Date(viewingLevel.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  Kapat
                </Button>
                <Button
                  onClick={() => {
                    setIsViewModalOpen(false)
                    handleEdit(viewingLevel)
                  }}
                  className="ml-3"
                >
                  Düzenle
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  )
}
