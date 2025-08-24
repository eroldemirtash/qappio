'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { 
  Users, 
  Target, 
  Building2, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Filter,
  Clock,
  Play,
  Pause,
  CheckCircle,
  Star,
  DollarSign,
  ShoppingBag,
  Package,
  Award,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  RefreshCw,
  Plus,
  Settings,
  Bell,
  AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useDashboardData } from '@/hooks/useDashboard'
import { useQueryClient } from '@tanstack/react-query'

// Qappio color palette
const QAPPIO_COLORS = {
  navy: '#0A192F',
  indigo: '#0E1D5A',
  teal: '#0BD3C8',
  cyan: '#59E1D9',
  white: '#FFFFFF'
}

const GRADIENT_COLORS = {
  primary: `linear-gradient(135deg, ${QAPPIO_COLORS.navy} 0%, ${QAPPIO_COLORS.indigo} 50%, ${QAPPIO_COLORS.teal} 100%)`,
  secondary: `linear-gradient(135deg, ${QAPPIO_COLORS.indigo} 0%, ${QAPPIO_COLORS.teal} 100%)`,
  success: `linear-gradient(135deg, #10B981 0%, #059669 100%)`,
  warning: `linear-gradient(135deg, #F59E0B 0%, #D97706 100%)`,
  danger: `linear-gradient(135deg, #EF4444 0%, #DC2626 100%)`
}

// Quick actions
const quickActions = [
  { 
    title: 'Görev Ekle', 
    icon: Target, 
    href: '/missions', 
    color: 'from-green-500 to-green-600',
    description: 'Yeni görev oluştur'
  },
  { 
    title: 'Marka Ekle', 
      icon: Building2,
    href: '/brands', 
    color: 'from-blue-500 to-blue-600',
    description: 'Yeni marka ekle'
  },
  { 
    title: 'Kullanıcı Ekle', 
    icon: Users, 
    href: '/users', 
    color: 'from-purple-500 to-purple-600',
    description: 'Yeni kullanıcı ekle'
  },
  { 
    title: 'Ürün Ekle', 
    icon: Package, 
    href: '/market', 
    color: 'from-orange-500 to-orange-600',
    description: 'Market ürünü ekle'
  },
  { 
    title: 'Finans Analizi', 
    icon: BarChart3, 
    href: '/finance/analytics', 
    color: 'from-cyan-500 to-cyan-600',
    description: 'Detaylı finans raporu'
  },
  { 
    title: 'Rapor İndir', 
    icon: Download, 
    href: '/reports', 
    color: 'from-rose-500 to-rose-600',
    description: 'Genel rapor indir'
  }
]

// Utility functions
const getMissionStatus = (mission: any): string => {
  const now = new Date()
  const endDate = new Date(mission.endDate)
  
  if (mission.status === 'Tamamlandı') return 'Tamamlandı'
  if (endDate < now) return 'Süresi Doldu'
  if (mission.publishedAt) return 'Aktif'
  return 'Beklemede'
}

const getTimeRemaining = (endDate: string): string => {
  const now = new Date()
  const end = new Date(endDate)
  const diff = end.getTime() - now.getTime()
  
  if (diff <= 0) return 'Süre doldu'
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (days > 0) return `${days} gün ${hours} saat`
  if (hours > 0) return `${hours} saat ${minutes} dakika`
  return `${minutes} dakika`
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Aktif':
      return <Play className="w-4 h-4 text-green-500" />
    case 'Beklemede':
      return <Pause className="w-4 h-4 text-yellow-500" />
    case 'Süresi Doldu':
      return <Clock className="w-4 h-4 text-red-500" />
    case 'Tamamlandı':
      return <CheckCircle className="w-4 h-4 text-blue-500" />
    default:
      return <Pause className="w-4 h-4 text-gray-500" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Aktif':
      return 'bg-green-100 text-green-800 border-green-200'
    case 'Beklemede':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'Süresi Doldu':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'Tamamlandı':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'photo':
      return 'bg-blue-100 text-blue-800 border-blue-200'
    case 'video':
      return 'bg-purple-100 text-purple-800 border-purple-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const queryClient = useQueryClient()
  
  // Fetch dashboard data from backend
  const { 
    stats, 
    activities, 
    recentActivities, 
    topPerformers, 
    platformOverview,
    systemHealth,
    realTimeMetrics,
    isLoading, 
    isError, 
    error 
  } = useDashboardData()
  
  // Mission management functions
  const handlePublishMission = (missionId: string) => {
    console.log('Mission published:', missionId)
  }

  const handlePauseMission = (missionId: string) => {
    console.log('Mission paused:', missionId)
  }

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['dashboard'] })
  }

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Error state
  if (isError) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="text-red-400 mb-4">
              <AlertCircle className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Veri yüklenemedi</h3>
            <p className="text-gray-600 mb-4">
              {error?.message || 'Dashboard verileri yüklenirken bir hata oluştu.'}
            </p>
            <Button onClick={handleRefresh}>Tekrar Dene</Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Extract data from backend response
  const dashboardStats = stats
  const dashboardActivities = activities
  const recentMissions = dashboardActivities?.recentMissions || []
  const recentActivitiesList = recentActivities || []
  const topPerformersList = topPerformers || []
  const platformOverviewData = platformOverview
  const systemHealthData = systemHealth
  const realTimeData = realTimeMetrics

  return (
    <DashboardLayout>
        {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Qappio platform genel durumu ve istatistikleri</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Yenile
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.href = '/finance/analytics'}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Finans Analizi
            </Button>
          </div>
        </div>
                  </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats && [
          {
            title: 'Toplam Kullanıcı',
            value: dashboardStats.totalUsers?.toLocaleString() || '0',
            change: dashboardStats.changes?.totalUsers ? `${dashboardStats.changes.totalUsers > 0 ? '+' : ''}${dashboardStats.changes.totalUsers}%` : '0%',
            changeType: dashboardStats.changes?.totalUsers > 0 ? 'increase' : 'decrease',
            icon: Users,
            color: 'from-blue-500 to-blue-600',
            description: 'Aktif platform kullanıcıları'
          },
          {
            title: 'Aktif Görevler',
            value: dashboardStats.activeMissions?.toString() || '0',
            change: dashboardStats.changes?.activeMissions ? `${dashboardStats.changes.activeMissions > 0 ? '+' : ''}${dashboardStats.changes.activeMissions}%` : '0%',
            changeType: dashboardStats.changes?.activeMissions > 0 ? 'increase' : 'decrease',
            icon: Target,
            color: 'from-green-500 to-green-600',
            description: 'Şu anda yayında olan görevler'
          },
          {
            title: 'Marka Sayısı',
            value: dashboardStats.totalBrands?.toString() || '0',
            change: dashboardStats.changes?.totalBrands ? `${dashboardStats.changes.totalBrands > 0 ? '+' : ''}${dashboardStats.changes.totalBrands}%` : '0%',
            changeType: dashboardStats.changes?.totalBrands > 0 ? 'increase' : 'decrease',
            icon: Building2,
            color: 'from-purple-500 to-purple-600',
            description: 'Platformda bulunan markalar'
          },
          {
            title: 'Aylık Gelir',
            value: `₺${(dashboardStats.monthlyRevenue / 1000000).toFixed(1)}M`,
            change: dashboardStats.changes?.monthlyRevenue ? `${dashboardStats.changes.monthlyRevenue > 0 ? '+' : ''}${dashboardStats.changes.monthlyRevenue}%` : '0%',
            changeType: dashboardStats.changes?.monthlyRevenue > 0 ? 'increase' : 'decrease',
            icon: TrendingUp,
            color: 'from-orange-500 to-orange-600',
            description: 'Bu ay elde edilen gelir'
          }
        ].map((stat, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight size={16} className="text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight size={16} className="text-red-500 mr-1" />
                    )}
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardStats && [
          {
            title: 'Market Satışları',
            value: `₺${(dashboardStats.marketSales / 1000).toFixed(0)}K`,
            change: '+15.3%',
            changeType: 'increase',
            icon: ShoppingBag,
            color: 'from-emerald-500 to-emerald-600',
            description: 'Market ürün satışları'
          },
          {
            title: 'Toplam QP',
            value: `${(dashboardStats.totalQP / 1000000).toFixed(1)}M`,
            change: '+22.1%',
            changeType: 'increase',
            icon: Award,
            color: 'from-cyan-500 to-cyan-600',
            description: 'Dağıtılan toplam QP'
          },
          {
            title: 'Görev Tamamlama',
            value: `${dashboardStats.missionCompletion}%`,
            change: '+2.8%',
            changeType: 'increase',
            icon: CheckCircle,
            color: 'from-violet-500 to-violet-600',
            description: 'Görev tamamlama oranı'
          },
          {
            title: 'Aktif Lisanslar',
            value: dashboardStats.activeLicenses?.toString() || '0',
            change: '+5.6%',
            changeType: 'increase',
            icon: Package,
            color: 'from-rose-500 to-rose-600',
            description: 'Aktif lisans planları'
          }
        ].map((stat, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    {stat.changeType === 'increase' ? (
                      <ArrowUpRight size={14} className="text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-500 mr-1" />
                    )}
                    <span className={`text-xs font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon size={20} className="text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Son Aktiviteler</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Tümünü Gör
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivitiesList.length > 0 ? recentActivitiesList.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-blue-500" />
              </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                      <p className="text-sm text-gray-600">{JSON.stringify(activity.payload)}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.ts).toLocaleString('tr-TR')}
                      </p>
          </div>
                  </div>
                )) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Henüz aktivite bulunmuyor</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <h2 className="text-xl font-semibold text-gray-900">Hızlı İşlemler</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <action.icon size={20} className="text-white" />
                </div>
                    <div className="flex-1">
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 block">
                        {action.title}
                      </span>
                      <span className="text-xs text-gray-500">{action.description}</span>
                    </div>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>
                </div>
              </div>

      {/* Recent Missions Section */}
      {recentMissions.length > 0 && (
        <Card className="border border-gray-200 shadow-sm mb-8">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Son Görevler</h2>
              <a href="/missions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Tümünü Gör
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {recentMissions.slice(0, 4).map((mission) => {
                const status = getMissionStatus(mission)
                const timeRemaining = getTimeRemaining(mission.endAt)
                return (
                  <div key={mission.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-200 bg-white">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          {mission.brand?.logo ? (
                            <img 
                              src={mission.brand.logo} 
                              alt={mission.brand.name}
                              className="w-8 h-8 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm font-bold">{mission.brand?.name?.charAt(0) || 'M'}</span>
                  </div>
                          )}
                  <div>
                            <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">{mission.title}</h3>
                            <p className="text-xs text-gray-600">{mission.brand?.name || 'Bilinmeyen Marka'}</p>
                          </div>
                  </div>
                </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(status)}
                        <Badge className={getStatusColor(status)}>
                          {status}
                        </Badge>
                </div>
              </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Kategori:</span>
                        <Badge className={getCategoryColor(mission.category)}>
                          {mission.category === 'photo' ? 'Fotoğraf' : 'Video'}
                        </Badge>
                      </div>
                      {mission.isSponsored && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Sponsor:</span>
                          <span className="text-purple-600 font-medium">{mission.sponsorBrand}</span>
                        </div>
                      )}
                  </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-gradient-to-r from-green-50 to-green-100 p-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-green-600" />
                  <div>
                            <p className="text-gray-600 text-xs">Katılımcı</p>
                            <p className="font-semibold text-green-700 text-sm">{mission.participants || 0}</p>
                          </div>
                  </div>
                </div>
                      <div className="bg-gradient-to-r from-pink-50 to-pink-100 p-2 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <Star className="w-4 h-4 text-pink-600" />
                          <div>
                            <p className="text-gray-600 text-xs">Ödül</p>
                            <p className="font-semibold text-pink-700 text-sm">{mission.reward} QP</p>
                </div>
              </div>
            </div>
          </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <span>Kalan: {timeRemaining}</span>
                      <span>{new Date(mission.endAt).toLocaleDateString('tr-TR')}</span>
        </div>

                    <div className="flex space-x-2">
                      {status === 'Beklemede' && (
                        <Button 
                          onClick={() => handlePublishMission(mission.id)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Yayınla
                        </Button>
                      )}
                      {status === 'Aktif' && (
                        <Button 
                          onClick={() => handlePauseMission(mission.id)}
                          className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:from-yellow-600 hover:to-yellow-700 transition-all"
                        >
                          <Pause className="w-4 h-4 mr-1" />
                          Duraklat
                        </Button>
                      )}
                      <Button 
                        onClick={() => window.location.href = '/missions'}
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium py-2 px-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Detay
                      </Button>
          </div>
              </div>
                )
              })}
              </div>
          </CardContent>
        </Card>
      )}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Activity Chart */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Haftalık Aktivite</h2>
              <div className="flex items-center space-x-2">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="week">Bu Hafta</option>
                  <option value="month">Bu Ay</option>
                  <option value="quarter">Bu Çeyrek</option>
                </select>
              </div>
              </div>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Activity size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 text-sm">Grafik burada görünecek</p>
                <p className="text-xs text-gray-400 mt-1">Recharts ile entegre edilecek</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <h2 className="text-xl font-semibold text-gray-900">En İyi Performans</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformersList.length > 0 ? topPerformersList.map((brand) => (
                <div key={brand.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 bg-gradient-to-r ${brand.color} rounded-lg flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{brand.name.charAt(0)}</span>
          </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{brand.name}</p>
                      <p className="text-xs text-gray-500">{brand.tasks} görev</p>
          </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{brand.completion}%</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${brand.color} rounded-full`}
                        style={{ width: `${brand.completion}%` }}
                      />
                </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <Star className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Henüz performans verisi bulunmuyor</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
    </div>
    </DashboardLayout>
  )
}
