'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Target, Plus, Search, Edit, Trash2, Eye, Calendar, Users, Star, Award, Building2, X, Grid, List, Play, Pause, CheckCircle, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { useBrands } from '@/contexts/BrandsContext';

interface Mission {
  _id: string;
  title: string;
  brand: string;
  brandLogo?: string;
  sponsorBrand?: string;
  status: 'Aktif' | 'Pasif' | 'Tamamlandı' | 'Beklemede' | 'Süresi Doldu';
  budget: number;
  participants: number;
  startDate: string;
  endDate: string;
  publishedAt?: string;
  category: string;
  description: string;
  imageUrl?: string;
  isWeekly: boolean;
  isSponsored: boolean;
  missionPoints: number;
  maxPosts: number;
  requirements?: string[];
  tags?: string[];
  totalLikes: number;
  topParticipants: TopParticipant[];
}

interface TopParticipant {
  id: string;
  name: string;
  avatar: string;
  likes: number;
  posts: number;
  level: string;
}

export default function MissionsPage() {
  const { getBrandNames, getBrandLogo } = useBrands();
  const mockBrands = getBrandNames();
  
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [selectedUser, setSelectedUser] = useState<TopParticipant | null>(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingMission, setDeletingMission] = useState<Mission | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [newMission, setNewMission] = useState({
    title: '',
    brand: '',
    sponsorBrand: '',
    status: 'Aktif' as const,
    budget: 0,
    startDate: '',
    endDate: '',
    category: '',
    description: '',
    imageUrl: '',
    isWeekly: false,
    isSponsored: false,
    missionPoints: 0,
    maxPosts: 1,
    requirements: [] as string[],
    tags: [] as string[]
  });

  // Mock data
  const mockMissions: Mission[] = [
    {
      _id: '1',
      title: 'Sosyal Medya Kampanyası',
      brand: 'Nike Türkiye',
      brandLogo: 'https://picsum.photos/60/60?random=1',
      status: 'Aktif',
      budget: 5000,
      participants: 45,
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      publishedAt: '2024-01-15T00:00:00Z',
      category: 'Fotoğraf',
      description: 'Nike ürünlerini sosyal medyada tanıtma kampanyası.',
      imageUrl: 'https://picsum.photos/300/200?random=1',
      isWeekly: true,
      isSponsored: false,
      missionPoints: 250,
      maxPosts: 5,
      requirements: ['Instagram hesabı', 'Minimum 1000 takipçi'],
      tags: ['spor', 'giyim', 'kampanya'],
      totalLikes: 2847,
      topParticipants: [
        { id: '1', name: 'Ahmet Yılmaz', avatar: 'https://picsum.photos/40/40?random=11', likes: 156, posts: 3, level: 'Qappian' },
        { id: '2', name: 'Ayşe Demir', avatar: 'https://picsum.photos/40/40?random=12', likes: 142, posts: 2, level: 'Viralist' },
        { id: '3', name: 'Mehmet Kaya', avatar: 'https://picsum.photos/40/40?random=13', likes: 98, posts: 2, level: 'Crafter' },
        { id: '4', name: 'Elif Öz', avatar: 'https://picsum.photos/40/40?random=14', likes: 87, posts: 1, level: 'Seeker' },
        { id: '5', name: 'Can Demir', avatar: 'https://picsum.photos/40/40?random=15', likes: 76, posts: 1, level: 'Snapper' }
      ]
    },
    {
      _id: '2',
      title: 'Kış Koleksiyonu Tanıtımı',
      brand: 'Adidas',
      brandLogo: 'https://picsum.photos/60/60?random=2',
      status: 'Beklemede',
      budget: 3500,
      participants: 23,
      startDate: '2024-02-01',
      endDate: '2024-02-28',
      publishedAt: undefined,
      category: 'Video',
      description: 'Adidas kış koleksiyonunu tanıtan video içerikleri.',
      imageUrl: 'https://picsum.photos/300/200?random=2',
      isWeekly: false,
      isSponsored: true,
      sponsorBrand: 'Sport Zone',
      missionPoints: 180,
      maxPosts: 3,
      requirements: ['TikTok hesabı', 'Minimum 500 takipçi'],
      tags: ['moda', 'kış', 'video'],
      totalLikes: 1456,
      topParticipants: [
        { id: '3', name: 'Mehmet Kaya', avatar: 'https://picsum.photos/40/40?random=13', likes: 89, posts: 2, level: 'Crafter' },
        { id: '4', name: 'Elif Öz', avatar: 'https://picsum.photos/40/40?random=14', likes: 76, posts: 1, level: 'Seeker' },
        { id: '5', name: 'Zeynep Kara', avatar: 'https://picsum.photos/40/40?random=16', likes: 65, posts: 1, level: 'Snapper' }
      ]
    },
    {
      _id: '3',
      title: 'Yaz Festivali Fotoğrafları',
      brand: 'Coca-Cola',
      brandLogo: 'https://picsum.photos/60/60?random=3',
            status: 'Aktif',
      budget: 7500,
      participants: 67,
      startDate: '2024-01-20',
      endDate: '2024-03-20',
      publishedAt: '2024-01-20T00:00:00Z',
            category: 'Fotoğraf',
      description: 'Yaz festivalinde Coca-Cola ürünlerini kullanan fotoğraflar.',
      imageUrl: 'https://picsum.photos/300/200?random=3',
            isWeekly: false,
            isSponsored: false,
      missionPoints: 300,
      maxPosts: 7,
      requirements: ['Instagram hesabı', 'Minimum 500 takipçi'],
      tags: ['yaz', 'festival', 'içecek'],
      totalLikes: 3892,
      topParticipants: [
        { id: '6', name: 'Selin Yıldız', avatar: 'https://picsum.photos/40/40?random=17', likes: 234, posts: 5, level: 'Qappian' },
        { id: '7', name: 'Burak Özkan', avatar: 'https://picsum.photos/40/40?random=18', likes: 198, posts: 4, level: 'Viralist' },
        { id: '8', name: 'Deniz Arslan', avatar: 'https://picsum.photos/40/40?random=19', likes: 167, posts: 3, level: 'Crafter' },
        { id: '9', name: 'Merve Koç', avatar: 'https://picsum.photos/40/40?random=20', likes: 145, posts: 3, level: 'Seeker' },
        { id: '10', name: 'Emre Şahin', avatar: 'https://picsum.photos/40/40?random=21', likes: 123, posts: 2, level: 'Snapper' }
      ]
    }
  ];

  // Mock categories
  const mockCategories = ['Fotoğraf', 'Video'];

  // Initialize missions with mock data
  useEffect(() => {
    setMissions(mockMissions);
  }, []);

  // Auto-publish missions and update statuses
  useEffect(() => {
    const interval = setInterval(() => {
      setMissions(prev => prev.map(mission => {
        const now = new Date();
        const startDate = new Date(mission.startDate);
        const endDate = new Date(mission.endDate);

        // Auto-publish missions when start date is reached
        if (mission.status === 'Beklemede' && startDate <= now) {
          return { ...mission, status: 'Aktif', publishedAt: new Date().toISOString() };
        }

        // Mark missions as expired when end date is passed
        if (mission.status === 'Aktif' && endDate < now) {
          return { ...mission, status: 'Süresi Doldu' };
        }

        return mission;
      }));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const mockStatuses = ['Aktif', 'Beklemede', 'Pasif', 'Tamamlandı', 'Süresi Doldu'];

  // Utility functions
  const getMissionStatus = (mission: Mission): string => {
    const now = new Date();
    const endDate = new Date(mission.endDate);

    if (mission.status === 'Tamamlandı') return 'Tamamlandı';
    if (endDate < now) return 'Süresi Doldu';
    if (mission.status === 'Aktif') return 'Aktif';
    return 'Beklemede';
  };

  const getTimeRemaining = (endDate: string): string => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Süre doldu';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days} gün ${hours} saat`;
    if (hours > 0) return `${hours} saat ${minutes} dakika`;
    return `${minutes} dakika`;
  };

  const handlePublishMission = (missionId: string) => {
    setMissions(prev => prev.map(mission => 
      mission._id === missionId 
        ? { ...mission, status: 'Aktif', publishedAt: new Date().toISOString() }
        : mission
    ));
  };

  const handlePauseMission = (missionId: string) => {
    setMissions(prev => prev.map(mission => 
      mission._id === missionId 
        ? { ...mission, status: 'Beklemede' }
        : mission
    ));
  };

  const handleDeleteMission = (missionId: string) => {
    setMissions(prev => prev.filter(mission => mission._id !== missionId));
    setIsDeleteModalOpen(false);
    setDeletingMission(null);
  };

  const filteredMissions = missions.filter(mission => {
    const matchesSearch = mission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mission.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || mission.status === statusFilter;
    const matchesCategory = !categoryFilter || mission.category === categoryFilter;
    const matchesBrand = !brandFilter || mission.brand === brandFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesBrand;
  });

  // Sıralama fonksiyonu
  const sortedMissions = [...filteredMissions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      case 'oldest':
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      case 'highest-points':
        return b.missionPoints - a.missionPoints;
      case 'most-participants':
        return b.participants - a.participants;
      case 'most-likes':
        return b.totalLikes - a.totalLikes;
      case 'ending-soon':
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      case 'highest-budget':
        return b.budget - a.budget;
      case 'lowest-budget':
        return a.budget - b.budget;
      default:
        return 0;
    }
  });

  if (loading) {
  return (
    <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
        {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Görev Yönetimi</h1>
        <p className="text-gray-600">Tüm görevleri görüntüleyin, düzenleyin ve yeni görevler ekleyin</p>
          </div>

      {/* Filters and Add Button */}
      <div className="mb-6 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Input
            placeholder="Görev ara..."
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
            {mockStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">🔄 Sıralama Seçin</option>
            <option value="newest">📅 En Yeni</option>
            <option value="oldest">📅 En Eski</option>
            <option value="highest-points">⭐ En Yüksek Puan</option>
            <option value="most-participants">👥 En Fazla Katılımcı</option>
            <option value="most-likes">❤️ En Fazla Beğeni</option>
            <option value="ending-soon">⏰ Yakında Bitecek</option>
            <option value="highest-budget">💰 En Yüksek Bütçe</option>
            <option value="lowest-budget">💰 En Düşük Bütçe</option>
          </select>
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Tüm Markalar</option>
            {mockBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
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
          <Button
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus size={18} />}
            className="w-full lg:w-auto"
          >
            Yeni Görev Ekle
          </Button>
        </div>
      </div>

              {/* Sıralama Bilgisi */}
        {sortBy && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-blue-600">📊</span>
                <span className="text-sm font-medium text-blue-800">
                  {sortBy === 'newest' && 'En Yeni Görevler'}
                  {sortBy === 'oldest' && 'En Eski Görevler'}
                  {sortBy === 'highest-points' && 'En Yüksek Puanlı Görevler'}
                  {sortBy === 'most-participants' && 'En Fazla Katılımcılı Görevler'}
                  {sortBy === 'most-likes' && 'En Fazla Beğeni Alan Görevler'}
                  {sortBy === 'ending-soon' && 'Yakında Bitecek Görevler'}
                  {sortBy === 'highest-budget' && 'En Yüksek Bütçeli Görevler'}
                  {sortBy === 'lowest-budget' && 'En Düşük Bütçeli Görevler'}
                </span>
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

        {/* Missions Display */}
        {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMissions.map((mission) => (
            <Card key={mission._id} className="qappio-card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {(mission.brandLogo || getBrandLogo(mission.brand)) ? (
                        <img 
                          src={mission.brandLogo || getBrandLogo(mission.brand) || ''} 
                          alt={mission.brand}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm font-bold">{mission.brand.charAt(0)}</span>
            </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900 line-clamp-2">{mission.title}</h3>
                        <p className="text-sm text-gray-600">{mission.brand}</p>
          </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={getMissionStatus(mission) === 'Aktif' ? 'success' : getMissionStatus(mission) === 'Beklemede' ? 'warning' : getMissionStatus(mission) === 'Süresi Doldu' ? 'danger' : 'default'}
                    >
                      {getMissionStatus(mission)}
                    </Badge>
                    {mission.isWeekly && (
                      <Badge variant="info" size="sm">Haftalık</Badge>
                    )}
                    {mission.isSponsored && (
                      <Badge variant="level" size="sm">Sponsorlu</Badge>
                    )}
                </div>
              </div>
                
                {/* Sponsor Marka Bilgisi */}
                {mission.isSponsored && mission.sponsorBrand && (
                  <div className="mb-3 p-2 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">S</span>
              </div>
                      <span className="text-xs text-purple-700 font-medium">Sponsor: {mission.sponsorBrand}</span>
            </div>
          </div>
        )}
              </CardHeader>
              
              <CardContent>
                {mission.imageUrl && (
                  <div className="mb-4">
                    <img 
                      src={mission.imageUrl} 
                      alt={mission.title}
                      className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                )}
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{mission.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-gray-500">Bütçe</p>
                    <p className="font-semibold text-gray-900">₺{mission.budget.toLocaleString()}</p>
              </div>
                  <div>
                    <p className="text-gray-500">QP Puanı</p>
                    <p className="font-semibold text-blue-600">{mission.missionPoints}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Maks. Post</p>
                    <p className="font-semibold text-gray-900">{mission.maxPosts}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Kategori</p>
                    <p className="font-semibold text-gray-900">{mission.category}</p>
                  </div>
                </div>
                
                {/* Katılım ve Beğeni Bilgileri */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-gray-600 text-xs">Katılımcı</p>
                        <p className="font-semibold text-green-700">{mission.participants}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-pink-600" />
                      <div>
                        <p className="text-gray-600 text-xs">Toplam Beğeni</p>
                        <p className="font-semibold text-pink-700">{mission.totalLikes.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* En Çok Beğeni Alan Kullanıcılar */}
                {mission.topParticipants.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2 font-medium">🏆 En Çok Beğeni Alan 5 Kullanıcı</p>
                    <div className="space-y-2">
                      {mission.topParticipants.slice(0, 5).map((participant, index) => (
                        <div key={participant.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              {index === 0 && <span className="text-yellow-500 text-sm">🥇</span>}
                              {index === 1 && <span className="text-gray-400 text-sm">🥈</span>}
                              {index === 2 && <span className="text-orange-600 text-sm">🥉</span>}
                              {index > 2 && <span className="text-gray-400 text-xs">#{index + 1}</span>}
                            </div>
                            <img
                              src={participant.avatar}
                              alt={participant.name}
                              className="w-6 h-6 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
                              onClick={() => {
                                setSelectedUser(participant);
                                setIsUserModalOpen(true);
                              }}
                            />
                            <div>
                              <p className="text-xs font-medium text-gray-900">{participant.name}</p>
                              <p className="text-xs text-gray-500">{participant.level}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-semibold text-pink-600">{participant.likes} ❤️</p>
                            <p className="text-xs text-gray-500">{participant.posts} post</p>
                          </div>
                        </div>
                      ))}
            </div>
          </div>
        )}

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {new Date(mission.startDate).toLocaleDateString('tr-TR')} - {new Date(mission.endDate).toLocaleDateString('tr-TR')}
                    </span>
            </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">
                      Kalan: {getTimeRemaining(mission.endDate)}
                    </span>
                  </div>
                </div>

                {/* Yayınla/Duraklat Butonları */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getMissionStatus(mission) === 'Beklemede' && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handlePublishMission(mission._id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Yayınla
                      </Button>
                    )}
                    {getMissionStatus(mission) === 'Aktif' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handlePauseMission(mission._id)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Duraklat
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingMission(mission);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDeletingMission(mission);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 size={16} />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Görev</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marka</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sponsor Marka</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QP Puanı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maks. Post</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Katılımcı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Toplam Beğeni</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kalan Süre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Son Tarih</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedMissions.map((mission) => (
                    <tr key={mission._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                        {mission.imageUrl && (
                          <img
                            src={mission.imageUrl}
                            alt="Mission"
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{mission.title}</div>
                          <div className="text-sm text-gray-500 line-clamp-1">{mission.brand}</div>
                            </div>
                          </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {(mission.brandLogo || getBrandLogo(mission.brand)) ? (
                          <img 
                            src={mission.brandLogo || getBrandLogo(mission.brand) || ''} 
                            alt={mission.brand}
                            className="w-6 h-6 rounded-lg object-cover mr-2"
                          />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <span className="text-xs font-medium text-blue-600">{mission.brand.charAt(0)}</span>
                          </div>
                        )}
                        <span className="text-sm text-gray-900">{mission.brand}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      {mission.isSponsored && mission.sponsorBrand ? (
                        <div className="flex items-center">
                          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                            <span className="text-xs font-medium text-purple-600">S</span>
                        </div>
                          <span className="text-sm text-gray-900">{mission.sponsorBrand}</span>
                          </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="default" className="capitalize">{mission.category}</Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-blue-600">{mission.missionPoints}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{mission.maxPosts}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-green-700">{mission.participants}</span>
                        </div>
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-pink-600" />
                        <span className="font-semibold text-pink-700">{mission.totalLikes.toLocaleString()}</span>
                        </div>
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getMissionStatus(mission) === 'Aktif' ? 'success' : getMissionStatus(mission) === 'Beklemede' ? 'warning' : getMissionStatus(mission) === 'Süresi Doldu' ? 'danger' : 'default'}>
                        {getMissionStatus(mission)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getTimeRemaining(mission.endDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(mission.endDate).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingMission(mission);
                            setIsEditModalOpen(true);
                          }}
                          className="text-gray-600 hover:text-gray-700"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeletingMission(mission);
                            setIsDeleteModalOpen(true);
                          }}
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

        {/* Add Mission Modal */}
        {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Yeni Görev Ekle</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Görev Başlığı"
                    value={newMission.title}
                  onChange={(e) => setNewMission(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Görev başlığını girin"
                  required
                />
                
                <div className="relative">
                  <Input
                    label="Marka Seçin"
                    value={newMission.brand}
                    onChange={(e) => setNewMission(prev => ({ ...prev, brand: e.target.value }))}
                    placeholder="Marka adını yazın veya seçin"
                    required
                  />
                  {newMission.brand && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {mockBrands
                        .filter(brand => brand.toLowerCase().includes(newMission.brand.toLowerCase()))
                        .map(brand => (
                          <div
                            key={brand}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => setNewMission(prev => ({ ...prev, brand }))}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{brand.charAt(0)}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">{brand}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                
                <Input
                  label="Bütçe (₺)"
                    type="number"
                    value={newMission.budget}
                  onChange={(e) => setNewMission(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    placeholder="0"
                  required
                  />
                
                  <select
                    value={newMission.category}
                  onChange={(e) => setNewMission(prev => ({ ...prev, category: e.target.value }))}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  >
                  <option value="">Kategori Seçin</option>
                  {mockCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                
                <Input
                  label="Başlangıç Tarihi"
                    type="date"
                    value={newMission.startDate}
                  onChange={(e) => setNewMission(prev => ({ ...prev, startDate: e.target.value }))}
                  required
                  />
                
                <Input
                  label="Bitiş Tarihi"
                    type="date"
                    value={newMission.endDate}
                  onChange={(e) => setNewMission(prev => ({ ...prev, endDate: e.target.value }))}
                  required
                />
                
                <Input
                  label="QP Puanı (Görev Puanı)"
                  type="number"
                  value={newMission.missionPoints}
                  onChange={(e) => setNewMission(prev => ({ ...prev, missionPoints: Number(e.target.value) }))}
                  placeholder="0"
                  required
                />
                
                <Input
                  label="Maksimum Post Sayısı"
                  type="number"
                  value={newMission.maxPosts}
                  onChange={(e) => setNewMission(prev => ({ ...prev, maxPosts: Number(e.target.value) }))}
                  placeholder="1"
                  min="1"
                  required
                />
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                        <input
                    type="checkbox"
                    checked={newMission.isWeekly}
                      onChange={(e) => setNewMission(prev => ({ ...prev, isWeekly: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                    <span className="text-sm text-gray-700">Haftanın Görevi</span>
                </label>
                  <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newMission.isSponsored}
                      onChange={(e) => setNewMission(prev => ({ ...prev, isSponsored: e.target.checked }))}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                    <span className="text-sm text-gray-700">Sponsorlu</span>
                </label>
                      </div>
                      
                {/* Sponsor Marka Seçimi - Sadece sponsorlu işaretlendiğinde görünür */}
              {newMission.isSponsored && (
                  <div className="relative">
                    <Input
                      label="Sponsor Marka Seçin"
                      value={newMission.sponsorBrand}
                      onChange={(e) => setNewMission(prev => ({ ...prev, sponsorBrand: e.target.value }))}
                      placeholder="Sponsor marka adını yazın veya seçin"
                    />
                    {newMission.sponsorBrand && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {mockBrands
                          .filter(brand => brand.toLowerCase().includes(newMission.sponsorBrand.toLowerCase()))
                          .map(brand => (
                            <div
                              key={brand}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => setNewMission(prev => ({ ...prev, sponsorBrand: brand }))}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                  <span className="text-white text-sm font-bold">{brand.charAt(0)}</span>
                          </div>
                                <span className="text-sm font-medium text-gray-900">{brand}</span>
                        </div>
                      </div>
                          ))}
                    </div>
                    )}
                  </div>
                )}
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Görev Detayı</label>
                <textarea
                    value={newMission.description}
                    onChange={(e) => setNewMission(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Görev detayını girin"
                  required
                />
              </div>
              
                {/* Görsel Yükleme Alanı */}
                <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Görev Görseli</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    {newMission.imageUrl ? (
                      <div className="space-y-4">
                        <img
                          src={newMission.imageUrl}
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded-lg mx-auto"
                        />
                        <Button
                          variant="secondary"
                          onClick={() => setNewMission(prev => ({ ...prev, imageUrl: '' }))}
                        >
                          Görseli Kaldır
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                  <div>
                          <p className="text-sm text-gray-600">
                            Görsel yüklemek için tıklayın veya sürükleyin
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF (max. 5MB)
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            // PC'den görsel seçme
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                  setNewMission(prev => ({ 
                                    ...prev, 
                                    imageUrl: e.target?.result as string 
                                  }));
                              };
                              reader.readAsDataURL(file);
                            }
                            };
                            input.click();
                          }}
                        >
                          PC'den Görsel Seç
                        </Button>
                    </div>
                  )}
                </div>
              </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    // Add mission logic here
                    const mission: Mission = {
                      _id: Date.now().toString(),
                      ...newMission,
                      participants: 0,
                      totalLikes: 0,
                      topParticipants: [],
                      requirements: [],
                      tags: []
                    };
                    setMissions(prev => [mission, ...prev]);
                    setIsModalOpen(false);
                    // Reset form
                    setNewMission({
                      title: '',
                      brand: '',
                      sponsorBrand: '',
                      status: 'Aktif',
                      budget: 0,
                      startDate: '',
                      endDate: '',
                      category: '',
                      description: '',
                      imageUrl: '',
                      isWeekly: false,
                      isSponsored: false,
                      missionPoints: 0,
                      maxPosts: 1,
                      requirements: [],
                      tags: []
                    });
                  }}
                >
                  Görev Ekle
                </Button>
                          </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Mission Modal */}
        {isEditModalOpen && editingMission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Görevi Düzenle</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Görev Başlığı"
                    value={editingMission.title}
                  onChange={(e) => setEditingMission(prev => prev ? { ...prev, title: e.target.value } : null)}
                  placeholder="Görev başlığını girin"
                  required
                />
                
                <div className="relative">
                  <Input
                    label="Marka Seçin"
                    value={editingMission.brand}
                    onChange={(e) => setEditingMission(prev => prev ? { ...prev, brand: e.target.value } : null)}
                    placeholder="Marka adını yazın veya seçin"
                    required
                  />
                  {editingMission.brand && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                      {mockBrands
                        .filter(brand => brand.toLowerCase().includes(editingMission.brand.toLowerCase()))
                        .map(brand => (
                          <div
                            key={brand}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                            onClick={() => setEditingMission(prev => prev ? { ...prev, brand } : null)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{brand.charAt(0)}</span>
                              </div>
                              <span className="text-sm font-medium text-gray-900">{brand}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
                
                <Input
                  label="Bütçe (₺)"
                    type="number"
                    value={editingMission.budget}
                  onChange={(e) => setEditingMission(prev => prev ? { ...prev, budget: Number(e.target.value) } : null)}
                  placeholder="0"
                  required
                  />
                
                  <select
                    value={editingMission.category}
                  onChange={(e) => setEditingMission(prev => prev ? { ...prev, category: e.target.value } : null)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  >
                  <option value="">Kategori Seçin</option>
                  {mockCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                
                <Input
                  label="Başlangıç Tarihi"
                    type="date"
                    value={editingMission.startDate}
                  onChange={(e) => setEditingMission(prev => prev ? { ...prev, startDate: e.target.value } : null)}
                  required
                  />
                
                <Input
                  label="Bitiş Tarihi"
                    type="date"
                    value={editingMission.endDate}
                  onChange={(e) => setEditingMission(prev => prev ? { ...prev, endDate: e.target.value } : null)}
                  required
                />
                
                <Input
                  label="QP Puanı (Görev Puanı)"
                  type="number"
                  value={editingMission.missionPoints}
                  onChange={(e) => setEditingMission(prev => prev ? { ...prev, missionPoints: Number(e.target.value) } : null)}
                  placeholder="0"
                  required
                />
                
                <Input
                  label="Maksimum Post Sayısı"
                  type="number"
                  value={editingMission.maxPosts}
                  onChange={(e) => setEditingMission(prev => prev ? { ...prev, maxPosts: Number(e.target.value) } : null)}
                  placeholder="1"
                  min="1"
                  required
                />
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingMission.isWeekly}
                      onChange={(e) => setEditingMission(prev => prev ? { ...prev, isWeekly: e.target.checked } : null)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Haftanın Görevi</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={editingMission.isSponsored}
                      onChange={(e) => setEditingMission(prev => prev ? { ...prev, isSponsored: e.target.checked } : null)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Sponsorlu</span>
                  </label>
                </div>
                
                {/* Sponsor Marka Seçimi - Sadece sponsorlu işaretlendiğinde görünür */}
                {editingMission.isSponsored && (
                  <div className="relative">
                    <Input
                      label="Sponsor Marka Seçin"
                      value={editingMission.sponsorBrand || ''}
                      onChange={(e) => setEditingMission(prev => prev ? { ...prev, sponsorBrand: e.target.value } : null)}
                      placeholder="Sponsor marka adını yazın veya seçin"
                    />
                    {editingMission.sponsorBrand && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {mockBrands
                          .filter(brand => brand.toLowerCase().includes(editingMission.sponsorBrand?.toLowerCase() || ''))
                          .map(brand => (
                            <div
                              key={brand}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                              onClick={() => setEditingMission(prev => prev ? { ...prev, sponsorBrand: brand } : null)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                                  <span className="text-white text-sm font-bold">{brand.charAt(0)}</span>
              </div>
                                <span className="text-sm font-medium text-gray-900">{brand}</span>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Görev Detayı</label>
                <textarea
                  value={editingMission.description}
                    onChange={(e) => setEditingMission(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Görev detayını girin"
                  required
                />
              </div>
              
                {/* Görsel Düzenleme Alanı */}
                <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Görev Görseli</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    {editingMission.imageUrl ? (
                      <div className="space-y-4">
                        <img 
                          src={editingMission.imageUrl} 
                          alt="Preview" 
                          className="w-full h-32 object-cover rounded-lg mx-auto"
                        />
                        <Button
                          variant="secondary"
                          onClick={() => setEditingMission(prev => prev ? { ...prev, imageUrl: '' } : null)}
                        >
                          Görseli Kaldır
                        </Button>
                  </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                  <div>
                          <p className="text-sm text-gray-600">
                            Görsel yüklemek için tıklayın veya sürükleyin
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF (max. 5MB)
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => {
                            // PC'den görsel seçme
                            const input = document.createElement('input');
                            input.type = 'file';
                            input.accept = 'image/*';
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                  setEditingMission(prev => prev ? { 
                                    ...prev, 
                                    imageUrl: e.target?.result as string 
                                  } : null);
                              };
                              reader.readAsDataURL(file);
                            }
                            };
                            input.click();
                          }}
                        >
                          PC'den Görsel Seç
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                      </div>
                      
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  İptal
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    // Update mission logic here
                    if (editingMission) {
                      setMissions(prev => prev.map(mission => 
                        mission._id === editingMission._id ? editingMission : mission
                      ));
                      setIsEditModalOpen(false);
                      setEditingMission(null);
                    }
                  }}
                >
                  Değişiklikleri Kaydet
                </Button>
                          </div>
                        </div>
                      </div>
                    </div>
      )}

      {/* Delete Mission Modal */}
      {isDeleteModalOpen && deletingMission && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Görevi Sil</h2>
                <p className="text-gray-600">
                  <strong>"{deletingMission.title}"</strong> görevini silmek istediğinizden emin misiniz?
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Bu işlem geri alınamaz ve görevle ilgili tüm veriler kalıcı olarak silinecektir.
                </p>
                  </div>
                  
              <div className="flex justify-end space-x-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsDeleteModalOpen(false);
                    setDeletingMission(null);
                  }}
                >
                  İptal
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteMission(deletingMission._id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Görevi Sil
                </Button>
                      </div>
                    </div>
                </div>
              </div>
      )}

      {/* User Detail Modal */}
      {isUserModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Kullanıcı Profili</h2>
                        <button
                  onClick={() => setIsUserModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                  <X size={24} />
                        </button>
                      </div>

              <div className="text-center mb-6">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedUser.name}</h3>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                  {selectedUser.level}
                    </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">❤️</span>
                      <div>
                        <p className="text-sm text-gray-600">Toplam Beğeni</p>
                        <p className="text-xl font-bold text-pink-700">{selectedUser.likes.toLocaleString()}</p>
                </div>
                    </div>
                </div>
              </div>
              
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">📝</span>
                      <div>
                        <p className="text-sm text-gray-600">Toplam Post</p>
                        <p className="text-xl font-bold text-green-700">{selectedUser.posts}</p>
                      </div>
                    </div>
                  </div>
              </div>
              
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">🏆</span>
                      <div>
                        <p className="text-sm text-gray-600">Seviye</p>
                        <p className="text-xl font-bold text-purple-700">{selectedUser.level}</p>
                </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsUserModalOpen(false)}
                    className="w-full"
                  >
                    Kapat
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      // Navigate to user profile page
                      window.open(`/users?userId=${selectedUser.id}`, '_blank');
                    }}
                    className="w-full"
                  >
                    Profili Görüntüle
                  </Button>
              </div>
            </div>
          </div>
      </div>
        </div>
      )}
    </DashboardLayout>
  );
}
