'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Users, Plus, Search, Edit, Trash2, Eye, Mail, Phone, Calendar, MapPin, Crown, Star, X, Grid, List, UserPlus } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

interface SocialMedia {
  platform: string
  username: string
  url: string
  followers: number
}

interface UserShare {
  id: string
  missionId: string
  missionTitle: string
  brandName: string
  type: 'photo' | 'video'
  mediaUrl: string
  caption: string
  likes: number
  comments: number
  shareDate: string
  status: 'Onaylandı' | 'Beklemede' | 'Reddedildi'
}

interface UserMission {
  id: string
  missionTitle: string
  brandName: string
  status: 'Aktif' | 'Tamamlandı' | 'İptal Edildi'
  joinDate: string
  completionDate?: string
  earnings: number
  posts: number
}

interface FollowedProfile {
  id: string
  name: string
  type: 'user' | 'brand'
  avatar: string
  followDate: string
}

interface MarketPurchase {
  id: string
  productName: string
  productImage: string
  price: number
  purchaseDate: string
  status: 'Teslim Edildi' | 'Kargoda' | 'Hazırlanıyor'
}

interface FavoriteMission {
  id: string
  missionTitle: string
  brandName: string
  missionImage: string
  favoriteDate: string
}

interface User {
  id: string
  name: string
  username: string
  email: string
  phone: string
  avatar: string
  gender: 'Erkek' | 'Kadın' | 'Diğer'
  level: 'Snapper' | 'Seeker' | 'Crafter' | 'Viralist' | 'Qappian'
  status: 'Aktif' | 'Pasif' | 'Beklemede'
  joinDate: string
  lastActive: string
  totalMissions: number
  completedMissions: number
  qpPoints: number
  spendableQP: number
  location: string
  bio: string
  socialMedia: SocialMedia[]
  shares: UserShare[]
  missions: UserMission[]
  followedProfiles: FollowedProfile[]
  marketPurchases: MarketPurchase[]
  favoriteMissions: FavoriteMission[]
}

const mockUsers: User[] = [
  {
    id: '1',
      name: 'Ahmet Yılmaz',
    username: '@ahmetyilmaz',
      email: 'ahmet@example.com',
    phone: '+90 555 123 4567',
    avatar: 'https://picsum.photos/150/150?random=31',
    gender: 'Erkek',
      level: 'Seeker',
      status: 'Aktif',
      joinDate: '2024-01-15',
    lastActive: '2024-01-22',
    totalMissions: 24,
    completedMissions: 22,
    qpPoints: 1250,
    spendableQP: 1000,
    location: 'İstanbul, Türkiye',
    bio: 'Yaratıcı içerik üreticisi ve fotoğrafçı',
    socialMedia: [
      { platform: 'Instagram', username: '@ahmetyilmaz', url: 'https://instagram.com/ahmetyilmaz', followers: 15420 },
      { platform: 'TikTok', username: '@ahmetyilmaz', url: 'https://tiktok.com/@ahmetyilmaz', followers: 8920 },
      { platform: 'Facebook', username: 'Ahmet Yılmaz', url: 'https://facebook.com/ahmetyilmaz', followers: 12340 }
    ],
    shares: [
      { id: '1', missionId: '1', missionTitle: 'Nike Kampanyası', brandName: 'Nike', type: 'photo', mediaUrl: 'https://picsum.photos/300/300?random=41', caption: 'Nike ile spor yaparken çektiğim fotoğraf! 🏃‍♂️', likes: 156, comments: 23, shareDate: '2024-01-20', status: 'Onaylandı' },
      { id: '2', missionId: '2', missionTitle: 'Adidas Kış Koleksiyonu', brandName: 'Adidas', type: 'video', mediaUrl: 'https://picsum.photos/300/300?random=42', caption: 'Adidas kış koleksiyonunu tanıtıyorum ❄️', likes: 89, comments: 12, shareDate: '2024-01-18', status: 'Onaylandı' }
    ],
    missions: [
      { id: '1', missionTitle: 'Nike Kampanyası', brandName: 'Nike', status: 'Tamamlandı', joinDate: '2024-01-15', completionDate: '2024-01-20', earnings: 250, posts: 3 },
      { id: '2', missionTitle: 'Adidas Kış Koleksiyonu', brandName: 'Adidas', status: 'Aktif', joinDate: '2024-01-10', earnings: 180, posts: 2 }
    ],
    followedProfiles: [
      { id: '1', name: 'Nike Türkiye', type: 'brand', avatar: 'https://picsum.photos/40/40?random=51', followDate: '2024-01-15' },
      { id: '2', name: 'Ayşe Demir', type: 'user', avatar: 'https://picsum.photos/40/40?random=52', followDate: '2024-01-16' }
    ],
    marketPurchases: [
      { id: '1', productName: 'Qappio Hoodie', productImage: 'https://picsum.photos/100/100?random=61', price: 150, purchaseDate: '2024-01-10', status: 'Teslim Edildi' },
      { id: '2', productName: 'Qappio T-Shirt', productImage: 'https://picsum.photos/100/100?random=62', price: 80, purchaseDate: '2024-01-05', status: 'Teslim Edildi' }
    ],
    favoriteMissions: [
      { id: '1', missionTitle: 'Coca-Cola Festival', brandName: 'Coca-Cola', missionImage: 'https://picsum.photos/100/100?random=71', favoriteDate: '2024-01-15' },
      { id: '2', missionTitle: 'Samsung Tech Review', brandName: 'Samsung', missionImage: 'https://picsum.photos/100/100?random=72', favoriteDate: '2024-01-12' }
    ]
  },
  {
    id: '2',
      name: 'Ayşe Demir',
    username: '@aysedemir',
      email: 'ayse@example.com',
    phone: '+90 555 987 6543',
    avatar: 'https://picsum.photos/150/150?random=32',
    gender: 'Kadın',
      level: 'Crafter',
      status: 'Aktif',
      joinDate: '2023-12-10',
    lastActive: '2024-01-21',
    totalMissions: 45,
    completedMissions: 42,
    qpPoints: 2800,
    spendableQP: 2500,
    location: 'Ankara, Türkiye',
    bio: 'Sosyal medya uzmanı ve influencer',
    socialMedia: [
      { platform: 'Instagram', username: '@aysedemir', url: 'https://instagram.com/aysedemir', followers: 45600 },
      { platform: 'TikTok', username: '@aysedemir', url: 'https://tiktok.com/@aysedemir', followers: 23400 },
      { platform: 'Facebook', username: 'Ayşe Demir', url: 'https://facebook.com/aysedemir', followers: 18900 }
    ],
    shares: [
      { id: '3', missionId: '3', missionTitle: 'Coca-Cola Festival', brandName: 'Coca-Cola', type: 'photo', mediaUrl: 'https://picsum.photos/300/300?random=43', caption: 'Coca-Cola festivalinde harika anlar! 🎉', likes: 234, comments: 45, shareDate: '2024-01-19', status: 'Onaylandı' }
    ],
    missions: [
      { id: '3', missionTitle: 'Coca-Cola Festival', brandName: 'Coca-Cola', status: 'Tamamlandı', joinDate: '2024-01-15', completionDate: '2024-01-19', earnings: 320, posts: 5 }
    ],
    followedProfiles: [
      { id: '3', name: 'Coca-Cola', type: 'brand', avatar: 'https://picsum.photos/40/40?random=53', followDate: '2023-12-15' }
    ],
    marketPurchases: [
      { id: '3', productName: 'Qappio Cap', productImage: 'https://picsum.photos/100/100?random=63', price: 60, purchaseDate: '2024-01-08', status: 'Teslim Edildi' }
    ],
    favoriteMissions: [
      { id: '3', missionTitle: 'Nike Kampanyası', brandName: 'Nike', missionImage: 'https://picsum.photos/100/100?random=73', favoriteDate: '2024-01-10' }
    ]
  },
  {
    id: '3',
      name: 'Mehmet Kaya',
    username: '@mehmetkaya',
      email: 'mehmet@example.com',
    phone: '+90 555 456 7890',
    avatar: 'https://picsum.photos/150/150?random=33',
    gender: 'Erkek',
    level: 'Viralist',
    status: 'Aktif',
      joinDate: '2023-11-20',
    lastActive: '2024-01-20',
    totalMissions: 67,
    completedMissions: 65,
    qpPoints: 4200,
    spendableQP: 3800,
    location: 'İzmir, Türkiye',
    bio: 'Video editör ve animasyon sanatçısı',
    socialMedia: [
      { platform: 'Facebook', username: 'Mehmet Kaya', url: 'https://facebook.com/mehmetkaya', followers: 67800 },
      { platform: 'Instagram', username: '@mehmetkaya', url: 'https://instagram.com/mehmetkaya', followers: 34500 }
    ],
    shares: [
      { id: '4', missionId: '4', missionTitle: 'Samsung Tech Review', brandName: 'Samsung', type: 'video', mediaUrl: 'https://picsum.photos/300/300?random=44', caption: 'Samsung Galaxy S24 incelemesi! 📱', likes: 567, comments: 89, shareDate: '2024-01-17', status: 'Onaylandı' }
    ],
    missions: [
      { id: '4', missionTitle: 'Samsung Tech Review', brandName: 'Samsung', status: 'Tamamlandı', joinDate: '2024-01-10', completionDate: '2024-01-17', earnings: 400, posts: 4 }
    ],
    followedProfiles: [
      { id: '4', name: 'Samsung', type: 'brand', avatar: 'https://picsum.photos/40/40?random=54', followDate: '2023-12-01' }
    ],
    marketPurchases: [
      { id: '4', productName: 'Qappio Mug', productImage: 'https://picsum.photos/100/100?random=64', price: 45, purchaseDate: '2024-01-12', status: 'Teslim Edildi' }
    ],
    favoriteMissions: [
      { id: '4', missionTitle: 'Adidas Kış Koleksiyonu', brandName: 'Adidas', missionImage: 'https://picsum.photos/100/100?random=74', favoriteDate: '2024-01-08' }
    ]
  },
  {
    id: '4',
      name: 'Fatma Özkan',
    username: '@fatmaozkan',
      email: 'fatma@example.com',
    phone: '+90 555 789 1234',
    avatar: 'https://picsum.photos/150/150?random=34',
    gender: 'Kadın',
      level: 'Qappian',
      status: 'Aktif',
    joinDate: '2023-10-05',
    lastActive: '2024-01-22',
    totalMissions: 89,
    completedMissions: 87,
    qpPoints: 5800,
    spendableQP: 5500,
    location: 'Bursa, Türkiye',
    bio: 'Profesyonel fotoğrafçı ve tasarımcı',
    socialMedia: [
      { platform: 'Instagram', username: '@fatmaozkan', url: 'https://instagram.com/fatmaozkan', followers: 89200 },
      { platform: 'Facebook', username: 'Fatma Özkan', url: 'https://facebook.com/fatmaozkan', followers: 12300 }
    ],
    shares: [
      { id: '5', missionId: '5', missionTitle: 'McDonald\'s Campaign', brandName: 'McDonald\'s', type: 'photo', mediaUrl: 'https://picsum.photos/300/300?random=45', caption: 'McDonald\'s ile keyifli anlar! 🍔', likes: 789, comments: 123, shareDate: '2024-01-21', status: 'Onaylandı' }
    ],
    missions: [
      { id: '5', missionTitle: 'McDonald\'s Campaign', brandName: 'McDonald\'s', status: 'Aktif', joinDate: '2024-01-15', earnings: 280, posts: 3 }
    ],
    followedProfiles: [
      { id: '5', name: 'McDonald\'s', type: 'brand', avatar: 'https://picsum.photos/40/40?random=55', followDate: '2023-11-15' }
    ],
    marketPurchases: [
      { id: '5', productName: 'Qappio Backpack', productImage: 'https://picsum.photos/100/100?random=65', price: 200, purchaseDate: '2024-01-15', status: 'Kargoda' }
    ],
    favoriteMissions: [
      { id: '5', missionTitle: 'Coca-Cola Festival', brandName: 'Coca-Cola', missionImage: 'https://picsum.photos/100/100?random=75', favoriteDate: '2024-01-14' }
    ]
  },
  {
    id: '5',
    name: 'Ali Çelik',
    username: '@alikelik',
    email: 'ali@example.com',
    phone: '+90 555 321 6547',
    avatar: 'https://picsum.photos/150/150?random=35',
    gender: 'Erkek',
    level: 'Snapper',
    status: 'Beklemede',
    joinDate: '2024-01-10',
    lastActive: '2024-01-18',
    totalMissions: 8,
    completedMissions: 6,
    qpPoints: 350,
    spendableQP: 300,
    location: 'Antalya, Türkiye',
    bio: 'Yeni başlayan içerik üreticisi',
    socialMedia: [
      { platform: 'Instagram', username: '@alikelik', url: 'https://instagram.com/alikelik', followers: 1200 }
    ],
    shares: [
      { id: '6', missionId: '6', missionTitle: 'Local Restaurant', brandName: 'Antalya Restoran', type: 'photo', mediaUrl: 'https://picsum.photos/300/300?random=46', caption: 'Yerel restoranda harika yemekler! 🍽️', likes: 45, comments: 8, shareDate: '2024-01-16', status: 'Beklemede' }
    ],
    missions: [
      { id: '6', missionTitle: 'Local Restaurant', brandName: 'Antalya Restoran', status: 'Aktif', joinDate: '2024-01-12', earnings: 80, posts: 1 }
    ],
    followedProfiles: [
      { id: '6', name: 'Antalya Restoran', type: 'brand', avatar: 'https://picsum.photos/40/40?random=56', followDate: '2024-01-12' }
    ],
    marketPurchases: [],
    favoriteMissions: [
      { id: '6', missionTitle: 'Nike Kampanyası', brandName: 'Nike', missionImage: 'https://picsum.photos/100/100?random=76', favoriteDate: '2024-01-10' }
    ]
  }
]

const levelColors = {
  Snapper: 'from-yellow-400 to-yellow-600', // Metalik sarı
  Seeker: 'from-orange-400 to-orange-600', // Metalik turuncu
  Crafter: 'from-green-400 to-green-600', // Metalik yeşil
  Viralist: 'from-red-400 to-red-600', // Metalik kırmızı
  Qappian: 'from-blue-600 to-indigo-800' // Metalik lacivert
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'social' | 'shares' | 'missions' | 'following' | 'market' | 'favorites'>('overview')
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [sortBy, setSortBy] = useState<string>('')
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: '',
    username: '',
    email: '',
    phone: '',
    gender: 'Erkek',
    level: 'Snapper',
    status: 'Beklemede',
    location: '',
    bio: '',
    avatar: '',
    qpPoints: 0,
    spendableQP: 0,
    socialMedia: [],
    shares: [],
    missions: [],
    followedProfiles: [],
    marketPurchases: [],
    favoriteMissions: []
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = !levelFilter || user.level === levelFilter
    const matchesStatus = !statusFilter || user.status === statusFilter
    
    return matchesSearch && matchesLevel && matchesStatus
  })

  const sortedUsers = sortBy ? [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      case 'oldest':
        return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()
      case 'most-active':
        return new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
      case 'least-active':
        return new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime()
      case 'highest-qp':
        return b.qpPoints - a.qpPoints
      case 'lowest-qp':
        return a.qpPoints - b.qpPoints
      case 'most-missions':
        return b.totalMissions - a.totalMissions
      case 'least-missions':
        return a.totalMissions - b.totalMissions
      case 'highest-completion':
        const aCompletion = a.totalMissions > 0 ? (a.completedMissions / a.totalMissions) * 100 : 0
        const bCompletion = b.totalMissions > 0 ? (b.completedMissions / b.totalMissions) * 100 : 0
        return bCompletion - aCompletion
      case 'alphabetical':
        return a.name.localeCompare(b.name, 'tr-TR')
      case 'level-high':
        const levelOrder = { 'Qappian': 5, 'Viralist': 4, 'Crafter': 3, 'Seeker': 2, 'Snapper': 1 }
        return levelOrder[b.level] - levelOrder[a.level]
      case 'level-low':
        const levelOrderLow = { 'Qappian': 5, 'Viralist': 4, 'Crafter': 3, 'Seeker': 2, 'Snapper': 1 }
        return levelOrderLow[a.level] - levelOrderLow[b.level]
      default:
        return 0
    }
  }) : filteredUsers

  const handleDeleteUser = (id: string) => {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      setUsers(prev => prev.filter(u => u.id !== id))
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Qappian':
        return <Crown size={16} />
      case 'Viralist':
        return <Star size={16} />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Aktif':
        return 'success'
      case 'Pasif':
        return 'danger'
      case 'Beklemede':
        return 'warning'
      default:
        return 'info'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Aktif':
        return 'Aktif'
      case 'Pasif':
        return 'Pasif'
      case 'Beklemede':
        return 'Beklemede'
      default:
        return status
    }
  }

  const getLevelFromQP = (qpPoints: number): 'Snapper' | 'Seeker' | 'Crafter' | 'Viralist' | 'Qappian' => {
    if (qpPoints >= 10000) return 'Qappian'
    if (qpPoints >= 5000) return 'Viralist'
    if (qpPoints >= 2000) return 'Crafter'
    if (qpPoints >= 500) return 'Seeker'
    return 'Snapper'
  }

  const getSortDisplayName = (sortValue: string) => {
    const sortOptions: { [key: string]: string } = {
      'newest': '📅 En Son Eklenen',
      'oldest': '📅 İlk Eklenen',
      'most-active': '🟢 En Aktif',
      'least-active': '⚪ En Az Aktif',
      'highest-qp': '⭐ En Yüksek QP',
      'lowest-qp': '⭐ En Düşük QP',
      'most-missions': '🎯 En Çok Görev',
      'least-missions': '🎯 En Az Görev',
      'highest-completion': '✅ En Yüksek Başarı',
      'alphabetical': '🔤 Alfabetik',
      'level-high': '👑 Yüksek Level',
      'level-low': '🆕 Düşük Level'
    }
    return sortOptions[sortValue] || sortValue
  }

  // URL'de userId parametresi varsa otomatik olarak modal'ı aç
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const userId = urlParams.get('userId')
    const tab = urlParams.get('tab')
    
    if (userId) {
      const user = users.find(u => u.id === userId)
      if (user) {
        setSelectedUser(user)
        if (tab && ['overview', 'social', 'shares', 'missions', 'following', 'market', 'favorites'].includes(tab)) {
          setActiveTab(tab as any)
        } else {
          setActiveTab('overview')
        }
        setIsDetailModalOpen(true)
      }
    }
  }, [users])

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setActiveTab('overview')
    setIsDetailModalOpen(true)
    // URL'de userId parametresi ekle
    window.history.pushState({}, '', `/users?userId=${user.id}&tab=overview`)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as any)
    // URL'de tab parametresi ekle
    const url = new URL(window.location.href)
    url.searchParams.set('tab', tab)
    window.history.pushState({}, '', url.toString())
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    setNewUser({
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      level: user.level,
      status: user.status,
      location: user.location,
      bio: user.bio,
      avatar: user.avatar,
      qpPoints: user.qpPoints,
      spendableQP: user.spendableQP,
      socialMedia: user.socialMedia,
      shares: user.shares,
      missions: user.missions,
      followedProfiles: user.followedProfiles,
      marketPurchases: user.marketPurchases,
      favoriteMissions: user.favoriteMissions
    })
    setIsEditUserModalOpen(true)
  }

  const handleAddUser = () => {
    setNewUser({
      name: '',
      username: '',
      email: '',
      phone: '',
      gender: 'Erkek',
      level: 'Snapper',
      status: 'Beklemede',
      location: '',
      bio: '',
      avatar: '',
      qpPoints: 0,
      spendableQP: 0,
      socialMedia: [],
      shares: [],
      missions: [],
      followedProfiles: [],
      marketPurchases: [],
      favoriteMissions: []
    })
    setIsAddUserModalOpen(true)
  }

  const handleSaveUser = () => {
    if (editingUser) {
      // Kullanıcı düzenleme
      const updatedUser = { 
        ...editingUser, 
        ...newUser,
        level: getLevelFromQP(newUser.qpPoints || editingUser.qpPoints)
      }
      setUsers(prev => prev.map(u => u.id === editingUser.id ? updatedUser : u))
      setIsEditUserModalOpen(false)
      setEditingUser(null)
    } else {
      // Yeni kullanıcı ekleme
      const newUserWithId: User = {
        ...newUser as User,
        id: Date.now().toString(),
        avatar: newUser.avatar || `https://picsum.photos/150/150?random=${Date.now()}`,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        totalMissions: 0,
        completedMissions: 0,
        qpPoints: newUser.qpPoints || 0
      }
      setUsers(prev => [...prev, newUserWithId])
      setIsAddUserModalOpen(false)
    }
    setNewUser({
      name: '',
      username: '',
      email: '',
      phone: '',
      gender: 'Erkek',
      level: 'Snapper',
      status: 'Beklemede',
      location: '',
      bio: '',
      avatar: '',
      qpPoints: 0,
      spendableQP: 0,
      socialMedia: [],
      shares: [],
      missions: [],
      followedProfiles: [],
      marketPurchases: [],
      favoriteMissions: []
    })
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
            <p className="text-gray-600">Platform kullanıcılarını yönetin ve takip edin</p>
          </div>
          <Button
            onClick={handleAddUser}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            <Plus className="w-4 h-4 mr-2" />
            Profil Ekle
          </Button>
        </div>

        {/* Filters and View Toggle */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                  placeholder="Kullanıcı ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                />
            </div>
            <select 
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tüm Seviyeler</option>
              <option value="Snapper">Snapper</option>
              <option value="Seeker">Seeker</option>
              <option value="Crafter">Crafter</option>
              <option value="Viralist">Viralist</option>
              <option value="Qappian">Qappian</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Tüm Durumlar</option>
              <option value="Aktif">Aktif</option>
              <option value="Pasif">Pasif</option>
              <option value="Beklemede">Beklemede</option>
            </select>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sıralama Seçin</option>
              <option value="newest">📅 En Son Eklenen</option>
              <option value="oldest">📅 İlk Eklenen</option>
              <option value="most-active">🟢 En Aktif</option>
              <option value="least-active">⚪ En Az Aktif</option>
              <option value="highest-qp">⭐ En Yüksek QP</option>
              <option value="lowest-qp">⭐ En Düşük QP</option>
              <option value="most-missions">🎯 En Çok Görev</option>
              <option value="least-missions">🎯 En Az Görev</option>
              <option value="highest-completion">✅ En Yüksek Başarı</option>
              <option value="alphabetical">🔤 Alfabetik</option>
              <option value="level-high">👑 Yüksek Level</option>
              <option value="level-low">🆕 Düşük Level</option>
            </select>
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

        {/* Users Display */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">{user.username}</p>
          </div>
                    </div>
                    <Badge variant={getStatusVariant(user.status)}>
                      {getStatusText(user.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 mb-4">
                                          <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Seviye:</span>
                        <Badge 
                          className={`capitalize bg-gradient-to-r ${levelColors[user.level]} text-white`}
                        >
                          {user.level}
                        </Badge>
                      </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Toplam Görev:</span>
                      <span className="font-medium text-gray-900">{user.totalMissions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Tamamlanan:</span>
                      <span className="font-medium text-gray-900">{user.completedMissions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Toplam QP (Collected):</span>
                      <span className="font-medium text-blue-600">{user.qpPoints.toLocaleString()} QP</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Harcayabilir QP:</span>
                      <span className="font-medium text-green-600">{user.spendableQP.toLocaleString()} QP</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewUser(user)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Detay
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditUser(user)}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Düzenle
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
                      className="flex-1"
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-posta</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seviye</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam QP (Collected)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harcayabilir QP</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                  {sortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.username}</div>
                        </div>
                      </div>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          className={`capitalize bg-gradient-to-r ${levelColors[user.level]} text-white`}
                        >
                        {user.level}
                        </Badge>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.qpPoints.toLocaleString()} QP</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.spendableQP.toLocaleString()} QP</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={getStatusVariant(user.status)}>
                          {getStatusText(user.status)}
                        </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewUser(user)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditUser(user)}
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
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
        {sortedUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
              </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Kullanıcı bulunamadı</h3>
            <p className="text-gray-500">Arama kriterlerinizi değiştirmeyi deneyin</p>
          </div>
        )}

        {/* User Detail Modal */}
        {isDetailModalOpen && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Kullanıcı Detayları</h2>
              <button 
                    onClick={() => {
                      setIsDetailModalOpen(false)
                      setActiveTab('overview')
                      // URL'den userId parametresini kaldır
                      window.history.pushState({}, '', '/users')
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={24} />
              </button>
            </div>

                {/* User Header */}
                                  <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
                    <img 
                      src={selectedUser.avatar} 
                      alt={selectedUser.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                      <p className="text-gray-600">{selectedUser.username}</p>
                      <p className="text-gray-600">{selectedUser.email}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge 
                          className={`bg-gradient-to-r ${levelColors[selectedUser.level]} text-white`}
                        >
                          {getLevelIcon(selectedUser.level)}
                          <span className="ml-1">{selectedUser.level}</span>
                        </Badge>
                        <Badge 
                          variant={selectedUser.status === 'Aktif' ? 'success' : selectedUser.status === 'Beklemede' ? 'warning' : 'danger'}
                        >
                          {selectedUser.status}
                        </Badge>
                        <Badge variant="info">
                          {selectedUser.gender}
                        </Badge>
          </div>
                        </div>
                        </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <nav className="flex space-x-8 overflow-x-auto">
                        <button 
                      onClick={() => handleTabChange('overview')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'overview'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      📊 Genel Bakış
                        </button>
                        <button 
                      onClick={() => handleTabChange('social')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'social'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      📱 Sosyal Medya
                        </button>
                    <button
                      onClick={() => handleTabChange('shares')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'shares'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      📸 Paylaşımlar
                    </button>
                    <button
                      onClick={() => handleTabChange('missions')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'missions'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      🎯 Görevler
                    </button>
                    <button
                      onClick={() => handleTabChange('following')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'following'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      👥 Takip Edilenler
                    </button>
                    <button
                      onClick={() => handleTabChange('market')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'market'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      🛍️ Market Alışverişleri
                    </button>
                    <button
                      onClick={() => handleTabChange('favorites')}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'favorites'
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      ❤️ Favori Görevler
                    </button>
                  </nav>
                      </div>

                {/* Tab Content */}
                <div className="min-h-[400px]">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Contact Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Mail size={20} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">E-posta</p>
                            <p className="font-medium">{selectedUser.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone size={20} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Telefon</p>
                            <p className="font-medium">{selectedUser.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin size={20} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Konum</p>
                            <p className="font-medium">{selectedUser.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Calendar size={20} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Katılım Tarihi</p>
                            <p className="font-medium">{new Date(selectedUser.joinDate).toLocaleDateString('tr-TR')}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Users size={20} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Kullanıcı Adı</p>
                            <p className="font-medium">{selectedUser.username}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <UserPlus size={20} className="text-gray-400" />
                          <div>
                            <p className="text-sm text-gray-500">Cinsiyet</p>
                            <p className="font-medium">{selectedUser.gender}</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bio */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Hakkında</h4>
                        <p className="text-gray-600">{selectedUser.bio}</p>
                      </div>
                      
                      {/* Statistics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                          <p className="text-2xl font-bold text-gray-900">{selectedUser.totalMissions}</p>
                          <p className="text-sm text-gray-500">Toplam Görev</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                          <p className="text-2xl font-bold text-gray-900">{selectedUser.completedMissions}</p>
                          <p className="text-sm text-gray-500">Tamamlanan</p>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                          <p className="text-2xl font-bold text-blue-900">{selectedUser.qpPoints.toLocaleString()} QP</p>
                          <p className="text-sm text-blue-600">Toplam QP (Collected)</p>
                          <p className="text-xs text-blue-500 mt-1">Level göstergesi</p>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                          <p className="text-2xl font-bold text-green-900">{selectedUser.spendableQP.toLocaleString()} QP</p>
                          <p className="text-sm text-green-600">Harcayabilir QP</p>
                          <p className="text-xs text-green-500 mt-1">Market bakiyesi</p>
                        </div>
                      </div>
                      
                      {/* QP Explanation */}
                      <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">QP Sistemi Açıklaması</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div className="flex items-start space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-blue-900">Toplam QP (Collected QP)</p>
                              <p className="text-blue-700">Kullanıcının bugüne kadar kazandığı toplam puan. Bu değer hiç azalmaz, sadece artar ve seviye belirlemede kullanılır.</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <p className="font-medium text-green-900">Harcayabilir QP (Spendable QP)</p>
                              <p className="text-green-700">Kullanıcının markette harcayabileceği mevcut bakiye. Ürün alındığında bu değer düşer.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Last Active */}
                      <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm text-gray-500">Son Aktif</p>
                        <p className="font-semibold text-blue-900">
                          {new Date(selectedUser.lastActive).toLocaleDateString('tr-TR')} - {new Date(selectedUser.lastActive).toLocaleTimeString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Social Media Tab */}
                  {activeTab === 'social' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Sosyal Medya Hesapları</h3>
                      {selectedUser.socialMedia.length > 0 ? (
                        selectedUser.socialMedia.map((social, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                social.platform === 'Instagram' ? 'bg-gradient-to-r from-pink-500 to-purple-600' :
                                social.platform === 'TikTok' ? 'bg-gradient-to-r from-pink-500 to-blue-500' :
                                social.platform === 'Facebook' ? 'bg-gradient-to-r from-blue-600 to-blue-800' :
                                social.platform === 'Twitter' ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                                'bg-gradient-to-r from-gray-500 to-gray-600'
                              }`}>
                                <span className="text-white text-sm font-bold">{social.platform.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{social.platform}</p>
                                <p className="text-sm text-gray-600">{social.username}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Takipçi</p>
                              <p className="font-semibold text-gray-900">{social.followers.toLocaleString()}</p>
                            </div>
                            <a
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Görüntüle
                            </a>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📱</span>
                          </div>
                          <p className="text-lg font-medium mb-2">Henüz sosyal medya hesabı yok</p>
                          <p className="text-sm">Bu kullanıcı henüz sosyal medya hesaplarını eklememiş</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Shares Tab */}
                  {activeTab === 'shares' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Görev Paylaşımları</h3>
                      {selectedUser.shares.length > 0 ? (
                        selectedUser.shares.map((share) => (
                          <div key={share.id} className="border border-gray-200 rounded-xl p-4">
                            <div className="flex items-start space-x-4">
                              <img
                                src={share.mediaUrl}
                                alt={share.caption}
                                className="w-24 h-24 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-gray-900">{share.missionTitle}</h4>
                                  <Badge variant={share.status === 'Onaylandı' ? 'success' : share.status === 'Beklemede' ? 'warning' : 'danger'}>
                                    {share.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{share.caption}</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <span>📅 {new Date(share.shareDate).toLocaleDateString('tr-TR')}</span>
                                  <span>❤️ {share.likes}</span>
                                  <span>💬 {share.comments}</span>
                                  <span>🏷️ {share.brandName}</span>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    share.type === 'photo' 
                                      ? 'bg-blue-100 text-blue-800' 
                                      : 'bg-purple-100 text-purple-800'
                                  }`}>
                                    {share.type === 'photo' ? '📸 Fotoğraf' : '🎥 Video'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📸</span>
                          </div>
                          <p className="text-lg font-medium mb-2">Henüz paylaşım yok</p>
                          <p className="text-sm">Bu kullanıcı henüz hiç görev paylaşımı yapmamış</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Missions Tab */}
                  {activeTab === 'missions' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Katıldığı Görevler</h3>
                      {selectedUser.missions.map((mission) => (
                        <div key={mission.id} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">{mission.missionTitle}</h4>
                              <p className="text-sm text-gray-600">{mission.brandName}</p>
                            </div>
                            <div className="text-right">
                              <Badge variant={mission.status === 'Tamamlandı' ? 'success' : mission.status === 'Aktif' ? 'warning' : 'danger'}>
                                {mission.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm">
                            <div>
                              <p className="text-gray-500">Katılım Tarihi</p>
                              <p className="font-medium">{new Date(mission.joinDate).toLocaleDateString('tr-TR')}</p>
                            </div>
                            {mission.completionDate && (
                              <div>
                                <p className="text-gray-500">Tamamlanma</p>
                                <p className="font-medium">{new Date(mission.completionDate).toLocaleDateString('tr-TR')}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-gray-500">Kazanç</p>
                              <p className="font-medium text-green-600">₺{mission.earnings}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Post Sayısı</p>
                              <p className="font-medium">{mission.posts}</p>
                            </div>
                          </div>
                        </div>
                      ))}
          </div>
                  )}

                  {/* Following Tab */}
                  {activeTab === 'following' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Takip Edilen Profiller</h3>
                      {selectedUser.followedProfiles.length > 0 ? (
                        selectedUser.followedProfiles.map((profile) => (
                          <div key={profile.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <img
                                src={profile.avatar}
                                alt={profile.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{profile.name}</p>
                                <Badge variant="info" className="capitalize">
                                  {profile.type === 'user' ? '👤 Kullanıcı' : '🏢 Marka'}
                                </Badge>
                                <p className="text-xs text-gray-500 mt-1">
                                  {profile.type === 'user' ? 'Kişisel profil' : 'Kurumsal profil'}
                                </p>
        </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Takip Tarihi</p>
                              <p className="font-medium">{new Date(profile.followDate).toLocaleDateString('tr-TR')}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">👥</span>
                          </div>
                          <p className="text-lg font-medium mb-2">Henüz takip edilen profil yok</p>
                          <p className="text-sm">Bu kullanıcı henüz hiç profili takip etmemiş</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Market Tab */}
                  {activeTab === 'market' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Alışverişleri</h3>
                      {selectedUser.marketPurchases.length > 0 ? (
                        selectedUser.marketPurchases.map((purchase) => (
                          <div key={purchase.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <img
                                src={purchase.productImage}
                                alt={purchase.productName}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-900">{purchase.productName}</h4>
                                <p className="text-sm text-gray-600">₺{purchase.price}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={purchase.status === 'Teslim Edildi' ? 'success' : purchase.status === 'Kargoda' ? 'warning' : 'info'}>
                                {purchase.status}
                              </Badge>
                              <p className="text-sm text-gray-500 mt-1">
                                {new Date(purchase.purchaseDate).toLocaleDateString('tr-TR')}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🛍️</span>
                          </div>
                          <p className="text-lg font-medium mb-2">Henüz market alışverişi yapılmamış</p>
                          <p className="text-sm">Bu kullanıcı henüz marketten ürün satın almamış</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Favorites Tab */}
                  {activeTab === 'favorites' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Favori Görevler</h3>
                      {selectedUser.favoriteMissions.length > 0 ? (
                        selectedUser.favoriteMissions.map((favorite) => (
                          <div key={favorite.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <img
                                src={favorite.missionImage}
                                alt={favorite.missionTitle}
                                className="w-16 h-16 rounded-lg object-cover"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-900">{favorite.missionTitle}</h4>
                                <p className="text-sm text-gray-600">{favorite.brandName}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Favori Tarihi</p>
                              <p className="font-medium">{new Date(favorite.favoriteDate).toLocaleDateString('tr-TR')}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">❤️</span>
                          </div>
                          <p className="text-lg font-medium mb-2">Henüz favori görev yok</p>
                          <p className="text-sm">Bu kullanıcı henüz hiç görevi favorilere eklememiş</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-end mt-6 pt-6 border-t border-gray-200">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsDetailModalOpen(false)
                      setActiveTab('overview')
                      // URL'den userId parametresini kaldır
                      window.history.pushState({}, '', '/users')
                    }}
                  >
                    Kapat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add User Modal */}
        {isAddUserModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Yeni Profil Ekle</h2>
                <button 
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                  {/* Profil Resmi */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profil Resmi</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                        {newUser.avatar ? (
                          <img src={newUser.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                        ) : (
                          <span className="text-gray-400 text-2xl">👤</span>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={newUser.avatar || ''}
                          onChange={(e) => setNewUser(prev => ({ ...prev, avatar: e.target.value }))}
                          placeholder="Profil resmi URL'si girin"
                        />
                        <div className="flex items-center space-x-2">
                  <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onload = (e) => {
                                  setNewUser(prev => ({ ...prev, avatar: e.target?.result as string }))
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                            className="hidden"
                            id="avatar-upload"
                          />
                          <label
                            htmlFor="avatar-upload"
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer text-sm transition-colors"
                          >
                            PC'den Yükle
                          </label>
                          <span className="text-xs text-gray-500">veya URL yapıştırın</span>
                        </div>
                      </div>
                    </div>
                </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                      <Input
                        value={newUser.name}
                        onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ad Soyad girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Adı</label>
                      <Input
                        value={newUser.username}
                        onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="@kullaniciadi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                      <Input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="E-posta girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                      <Input
                        value={newUser.phone}
                        onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Telefon girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cinsiyet</label>
                  <select
                        value={newUser.gender}
                        onChange={(e) => setNewUser(prev => ({ ...prev, gender: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                        <option value="Erkek">Erkek</option>
                        <option value="Kadın">Kadın</option>
                        <option value="Diğer">Diğer</option>
                  </select>
                </div>
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Seviye</label>
                      <select
                        value={newUser.level}
                        onChange={(e) => setNewUser(prev => ({ ...prev, level: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Snapper">Snapper</option>
                        <option value="Seeker">Seeker</option>
                        <option value="Crafter">Crafter</option>
                        <option value="Viralist">Viralist</option>
                        <option value="Qappian">Qappian</option>
                      </select>
                </div>
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                  <select
                        value={newUser.status}
                        onChange={(e) => setNewUser(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Pasif">Pasif</option>
                        <option value="Beklemede">Beklemede</option>
                  </select>
                </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Konum</label>
                      <Input
                        value={newUser.location}
                        onChange={(e) => setNewUser(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Konum girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Toplam QP (Collected)</label>
                      <Input
                        type="number"
                        value={newUser.qpPoints || ''}
                        onChange={(e) => setNewUser(prev => ({ ...prev, qpPoints: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Kullanıcının bugüne kadar kazandığı toplam puan (level belirlemede kullanılır)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Harcayabilir QP</label>
                      <Input
                        type="number"
                        value={newUser.spendableQP || ''}
                        onChange={(e) => setNewUser(prev => ({ ...prev, spendableQP: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Kullanıcının markette harcayabileceği mevcut bakiye</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hakkında</label>
                    <textarea
                      value={newUser.bio}
                      onChange={(e) => setNewUser(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Kullanıcı hakkında kısa bilgi girin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
              </div>

                  {/* Sosyal Medya Adresleri */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sosyal Medya Adresleri</label>
                    <div className="space-y-3">
                      {['Instagram', 'Twitter', 'TikTok', 'Facebook'].map((platform) => (
                        <div key={platform} className="flex items-center space-x-3">
                          <div className="w-24 text-sm text-gray-600">{platform}</div>
                          <Input
                            value={newUser.socialMedia?.find(sm => sm.platform === platform)?.url || ''}
                            onChange={(e) => {
                              const url = e.target.value
                              const currentSocialMedia = newUser.socialMedia || []
                              if (url) {
                                const updated = currentSocialMedia.filter(sm => sm.platform !== platform)
                                updated.push({ platform, username: `@${platform.toLowerCase()}`, url, followers: 0 })
                                setNewUser(prev => ({ ...prev, socialMedia: updated }))
                              } else {
                                const updated = currentSocialMedia.filter(sm => sm.platform !== platform)
                                setNewUser(prev => ({ ...prev, socialMedia: updated }))
                              }
                            }}
                            placeholder={`${platform} URL'si`}
                            className="flex-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-6 pt-6 border-t border-gray-200 gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => setIsAddUserModalOpen(false)}
                >
                  İptal
                  </Button>
                  <Button
                    onClick={handleSaveUser}
                    disabled={!newUser.name || !newUser.email || !newUser.username || newUser.qpPoints === undefined}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                  >
                    Profil Ekle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit User Modal */}
        {isEditUserModalOpen && editingUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Profil Düzenle</h2>
                <button 
                    onClick={() => {
                      setIsEditUserModalOpen(false)
                      setEditingUser(null)
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                  {/* Profil Resmi */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profil Resmi</label>
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                        {newUser.avatar ? (
                          <img src={newUser.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover" />
                        ) : (
                          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-gray-400 text-2xl">👤</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <Input
                          value={newUser.avatar || ''}
                          onChange={(e) => setNewUser(prev => ({ ...prev, avatar: e.target.value }))}
                          placeholder="Profil resmi URL'si girin"
                        />
                        <div className="flex items-center space-x-2">
                  <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onload = (e) => {
                                  setNewUser(prev => ({ ...prev, avatar: e.target?.result as string }))
                                }
                                reader.readAsDataURL(file)
                              }
                            }}
                            className="hidden"
                            id="avatar-upload-edit"
                          />
                          <label
                            htmlFor="avatar-upload-edit"
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer text-sm transition-colors"
                          >
                            PC'den Yükle
                          </label>
                          <span className="text-xs text-gray-500">veya URL yapıştırın</span>
                        </div>
                      </div>
                    </div>
                </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Ad Soyad</label>
                      <Input
                        value={newUser.name}
                        onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ad Soyad girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Kullanıcı Adı</label>
                      <Input
                        value={newUser.username}
                        onChange={(e) => setNewUser(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="@kullaniciadi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                      <Input
                        type="email"
                        value={newUser.email}
                        onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="E-posta girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                      <Input
                        value={newUser.phone}
                        onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Telefon girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cinsiyet</label>
                  <select
                        value={newUser.gender}
                        onChange={(e) => setNewUser(prev => ({ ...prev, gender: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                        <option value="Erkek">Erkek</option>
                        <option value="Kadın">Kadın</option>
                        <option value="Diğer">Diğer</option>
                  </select>
                </div>
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Seviye</label>
                      <select
                        value={newUser.level}
                        onChange={(e) => setNewUser(prev => ({ ...prev, level: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Snapper">Snapper</option>
                        <option value="Seeker">Seeker</option>
                        <option value="Crafter">Crafter</option>
                        <option value="Viralist">Viralist</option>
                        <option value="Qappian">Qappian</option>
                      </select>
                </div>
                <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Durum</label>
                  <select
                        value={newUser.status}
                        onChange={(e) => setNewUser(prev => ({ ...prev, status: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Pasif">Pasif</option>
                        <option value="Beklemede">Beklemede</option>
                  </select>
                </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Konum</label>
                      <Input
                        value={newUser.location}
                        onChange={(e) => setNewUser(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Konum girin"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Toplam QP (Collected)</label>
                      <Input
                        type="number"
                        value={newUser.qpPoints || ''}
                        onChange={(e) => setNewUser(prev => ({ ...prev, qpPoints: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Kullanıcının bugüne kadar kazandığı toplam puan (level belirlemede kullanılır)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Harcayabilir QP</label>
                      <Input
                        type="number"
                        value={newUser.spendableQP || ''}
                        onChange={(e) => setNewUser(prev => ({ ...prev, spendableQP: parseInt(e.target.value) || 0 }))}
                        placeholder="0"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Kullanıcının markette harcayabileceği mevcut bakiye</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hakkında</label>
                    <textarea
                      value={newUser.bio}
                      onChange={(e) => setNewUser(prev => ({ ...prev, bio: e.target.value }))}
                      placeholder="Kullanıcı hakkında kısa bilgi girin"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                    />
              </div>

                  {/* Sosyal Medya Adresleri */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sosyal Medya Adresleri</label>
                    <div className="space-y-3">
                      {['Instagram', 'Twitter', 'TikTok', 'Facebook'].map((platform) => (
                        <div key={platform} className="flex items-center space-x-3">
                          <div className="w-24 text-sm text-gray-600">{platform}</div>
                          <Input
                            value={newUser.socialMedia?.find(sm => sm.platform === platform)?.url || ''}
                            onChange={(e) => {
                              const url = e.target.value
                              const currentSocialMedia = newUser.socialMedia || []
                              if (url) {
                                const updated = currentSocialMedia.filter(sm => sm.platform !== platform)
                                updated.push({ platform: platform as any, username: `@${platform.toLowerCase()}`, url, followers: 0 })
                                setNewUser(prev => ({ ...prev, socialMedia: updated }))
                              } else {
                                const updated = currentSocialMedia.filter(sm => sm.platform !== platform)
                                setNewUser(prev => ({ ...prev, socialMedia: updated }))
                              }
                            }}
                            placeholder={`${platform} URL'si`}
                            className="flex-1"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end mt-6 pt-6 border-t border-gray-200 gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsEditUserModalOpen(false)
                      setEditingUser(null)
                    }}
                >
                  İptal
                  </Button>
                  <Button
                    onClick={handleSaveUser}
                    disabled={!newUser.name || !newUser.email || !newUser.username || newUser.qpPoints === undefined}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  >
                    Değişiklikleri Kaydet
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
