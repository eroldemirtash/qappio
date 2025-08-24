import appClient, { handleApiError } from '@/data/clients/appClient'
import { DashboardStats, DashboardActivity, Activity } from '@/types/dashboard'

// Mock data for development
const mockDashboardStats: DashboardStats = {
  totalUsers: 12847,
  activeMissions: 89,
  totalBrands: 156,
  monthlyRevenue: 2400000,
  marketSales: 890000,
  totalQP: 45200000,
  missionCompletion: 94.2,
  activeLicenses: 89,
  changes: {
    totalUsers: 12.5,
    activeMissions: 8.2,
    totalBrands: 3.1,
    monthlyRevenue: 18.7,
    marketSales: 15.3,
    totalQP: 22.1,
    missionCompletion: 2.8,
    activeLicenses: 5.6
  }
}

const mockDashboardActivities: DashboardActivity = {
  recentMissions: [
    {
      id: '1',
      title: 'Sosyal Medya Kampanyası',
      brand: { 
        id: '1', 
        name: 'Nike Türkiye', 
        logo: 'https://picsum.photos/32/32?random=1',
        createdAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z'
      },
      reward: 250,
      status: 'active',
      createdAt: '2024-01-15T00:00:00Z',
      startAt: '2024-01-15T00:00:00Z',
      endAt: '2024-02-15T00:00:00Z',
      participants: 45,
      category: 'photo',
      isSponsored: true,
      sponsorBrand: 'Nike'
    },
    {
      id: '2',
      title: 'Ürün Fotoğrafı Çekimi',
      brand: { 
        id: '2', 
        name: 'Coca-Cola', 
        logo: 'https://picsum.photos/32/32?random=2',
        createdAt: '2024-01-20T00:00:00Z',
        updatedAt: '2024-01-20T00:00:00Z'
      },
      reward: 300,
      status: 'active',
      createdAt: '2024-01-20T00:00:00Z',
      startAt: '2024-01-20T00:00:00Z',
      endAt: '2024-02-20T00:00:00Z',
      participants: 23,
      category: 'video',
      isSponsored: false
    },
    {
      id: '3',
      title: 'Müşteri Anketi',
      brand: { 
        id: '3', 
        name: 'Samsung', 
        logo: 'https://picsum.photos/32/32?random=3',
        createdAt: '2024-02-01T00:00:00Z',
        updatedAt: '2024-02-01T00:00:00Z'
      },
      reward: 150,
      status: 'draft',
      createdAt: '2024-02-01T00:00:00Z',
      startAt: '2024-02-01T00:00:00Z',
      endAt: '2024-03-01T00:00:00Z',
      participants: 67,
      category: 'photo',
      isSponsored: true,
      sponsorBrand: 'Samsung'
    }
  ],
  recentActivities: [
    {
      id: '1',
      ts: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      type: 'task',
      userId: '1',
      userName: 'Admin',
      payload: { action: 'created', entity: 'mission', title: 'Sosyal Medya Kampanyası' }
    },
    {
      id: '2',
      ts: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      type: 'brand',
      userId: '1',
      userName: 'Admin',
      payload: { action: 'approved', entity: 'brand', name: 'Adidas' }
    },
    {
      id: '3',
      ts: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      type: 'user',
      userId: '2',
      userName: 'Ahmet Yılmaz',
      payload: { action: 'registered', entity: 'user' }
    }
  ],
  topPerformers: [
    { id: 'nike', name: 'Nike', tasks: 24, completion: 92, color: 'from-red-500 to-pink-500' },
    { id: 'adidas', name: 'Adidas', tasks: 18, completion: 88, color: 'from-blue-500 to-indigo-500' },
    { id: 'puma', name: 'Puma', tasks: 15, completion: 85, color: 'from-green-500 to-emerald-500' },
    { id: 'under-armour', name: 'Under Armour', tasks: 12, completion: 78, color: 'from-purple-500 to-violet-500' }
  ]
}

const mockRecentActivities: Activity[] = [
  {
    id: '1',
    ts: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: 'Yeni görev eklendi',
    userId: '1',
    userName: 'Admin',
    payload: { action: 'created', entity: 'mission', title: 'Sosyal Medya Kampanyası' }
  },
  {
    id: '2',
    ts: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    type: 'Marka onaylandı',
    userId: '1',
    userName: 'Admin',
    payload: { action: 'approved', entity: 'brand', name: 'Adidas' }
  },
  {
    id: '3',
    ts: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    type: 'Yeni kullanıcı kaydı',
    userId: '2',
    userName: 'Ahmet Yılmaz',
    payload: { action: 'registered', entity: 'user' }
  }
]

const mockTopPerformers = [
  { id: 'nike', name: 'Nike', tasks: 24, completion: 92, color: 'from-red-500 to-pink-500' },
  { id: 'adidas', name: 'Adidas', tasks: 18, completion: 88, color: 'from-blue-500 to-indigo-500' },
  { id: 'puma', name: 'Puma', tasks: 15, completion: 85, color: 'from-green-500 to-emerald-500' },
  { id: 'under-armour', name: 'Under Armour', tasks: 12, completion: 78, color: 'from-purple-500 to-violet-500' }
]

// Get dashboard statistics
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const response = await appClient.get('/dashboard/stats')
    return response.data.data || response.data
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return mockDashboardStats
  }
}

// Get dashboard activities
export const getDashboardActivities = async (): Promise<DashboardActivity> => {
  try {
    const response = await appClient.get('/dashboard/activities')
    return response.data.data || response.data
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return mockDashboardActivities
  }
}

// Get recent activities
export const getRecentActivities = async (limit: number = 10): Promise<Activity[]> => {
  try {
    const response = await appClient.get('/activity', {
      params: {
        limit,
        since: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // Last 24 hours
      }
    })
    
    return response.data.items || response.data.data || []
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return mockRecentActivities.slice(0, limit)
  }
}

// Get activities by user
export const getActivitiesByUser = async (
  userId: string,
  params: {
    since?: string
    limit?: number
    type?: string
  } = {}
): Promise<Activity[]> => {
  try {
    const response = await appClient.get(`/activity`, {
      params: {
        userId,
        since: params.since || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // Last 7 days
        limit: params.limit || 50,
        type: params.type || undefined,
      }
    })
    
    return response.data.items || response.data.data || []
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return mockRecentActivities.filter(activity => activity.userId === userId).slice(0, params.limit || 50)
  }
}

// Get activities by type
export const getActivitiesByType = async (
  type: string,
  params: {
    since?: string
    limit?: number
    userId?: string
  } = {}
): Promise<Activity[]> => {
  try {
    const response = await appClient.get(`/activity`, {
      params: {
        type,
        since: params.since || new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Last 24 hours
        limit: params.limit || 50,
        userId: params.userId || undefined,
      }
    })
    
    return response.data.items || response.data.data || []
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return mockRecentActivities.filter(activity => activity.type === type).slice(0, params.limit || 50)
  }
}

// Get platform overview
export const getPlatformOverview = async (): Promise<{
  totalUsers: number
  activeUsers: number
  totalMissions: number
  activeMissions: number
  totalBrands: number
  totalPosts: number
  totalRevenue: number
  growthRate: number
}> => {
  try {
    const response = await appClient.get('/dashboard/overview')
    return response.data.data || response.data
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return {
      totalUsers: 12847,
      activeUsers: 8923,
      totalMissions: 156,
      activeMissions: 89,
      totalBrands: 156,
      totalPosts: 45678,
      totalRevenue: 2400000,
      growthRate: 18.7
    }
  }
}

// Get performance metrics
export const getPerformanceMetrics = async (params: {
  from?: string
  to?: string
  granularity?: 'daily' | 'weekly' | 'monthly'
} = {}): Promise<{
  userGrowth: { date: string; count: number }[]
  missionCompletion: { date: string; rate: number }[]
  revenue: { date: string; amount: number }[]
  engagement: { date: string; posts: number; likes: number; comments: number }[]
}> => {
  try {
    const response = await appClient.get('/dashboard/performance', {
      params: {
        from: params.from || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // Last 30 days
        to: params.to || new Date().toISOString(),
        granularity: params.granularity || 'daily',
      }
    })
    
    return response.data.data || response.data
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    const mockData = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000)
      mockData.push({
        date: date.toISOString(),
        count: Math.floor(Math.random() * 100) + 50,
        rate: Math.random() * 20 + 80,
        amount: Math.floor(Math.random() * 100000) + 50000,
        posts: Math.floor(Math.random() * 100) + 20,
        likes: Math.floor(Math.random() * 1000) + 200,
        comments: Math.floor(Math.random() * 100) + 10
      })
    }
    
    return {
      userGrowth: mockData.map(d => ({ date: d.date, count: d.count })),
      missionCompletion: mockData.map(d => ({ date: d.date, rate: d.rate })),
      revenue: mockData.map(d => ({ date: d.date, amount: d.amount })),
      engagement: mockData.map(d => ({ date: d.date, posts: d.posts, likes: d.likes, comments: d.comments }))
    }
  }
}

// Get top performers
export const getTopPerformers = async (params: {
  period?: 'week' | 'month' | 'quarter'
  limit?: number
} = {}): Promise<{
  id: string
  name: string
  tasks: number
  completion: number
  color: string
  revenue?: number
  followers?: number
}[]> => {
  try {
    const response = await appClient.get('/dashboard/top-performers', {
      params: {
        period: params.period || 'month',
        limit: params.limit || 10,
      }
    })
    
    return response.data.data || response.data || []
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return mockTopPerformers.slice(0, params.limit || 10)
  }
}

// Get system health
export const getSystemHealth = async (): Promise<{
  status: 'healthy' | 'warning' | 'critical'
  uptime: number
  responseTime: number
  errorRate: number
  activeConnections: number
  lastIncident?: {
    timestamp: string
    description: string
    severity: 'low' | 'medium' | 'high' | 'critical'
  }
}> => {
  try {
    const response = await appClient.get('/dashboard/health')
    return response.data.data || response.data
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return {
      status: 'healthy',
      uptime: 99.9,
      responseTime: 150,
      errorRate: 0.1,
      activeConnections: 1250
    }
  }
}

// Get real-time metrics
export const getRealTimeMetrics = async (): Promise<{
  activeUsers: number
  activeMissions: number
  postsLastHour: number
  revenueToday: number
  systemLoad: number
}> => {
  try {
    const response = await appClient.get('/dashboard/realtime')
    return response.data.data || response.data
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return {
      activeUsers: 8923,
      activeMissions: 89,
      postsLastHour: 156,
      revenueToday: 125000,
      systemLoad: 45.2
    }
  }
}

// Get notification summary
export const getNotificationSummary = async (): Promise<{
  unread: number
  total: number
  byType: { type: string; count: number }[]
  recent: {
    id: string
    type: string
    title: string
    message: string
    timestamp: string
    isRead: boolean
  }[]
}> => {
  try {
    const response = await appClient.get('/dashboard/notifications')
    return response.data.data || response.data
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return {
      unread: 5,
      total: 23,
      byType: [
        { type: 'mission', count: 8 },
        { type: 'user', count: 6 },
        { type: 'brand', count: 4 },
        { type: 'system', count: 5 }
      ],
      recent: [
        {
          id: '1',
          type: 'mission',
          title: 'Yeni görev eklendi',
          message: 'Sosyal Medya Kampanyası görevi eklendi',
          timestamp: new Date().toISOString(),
          isRead: false
        }
      ]
    }
  }
}

// Get quick insights
export const getQuickInsights = async (): Promise<{
  title: string
  description: string
  type: 'info' | 'warning' | 'success' | 'error'
  action?: {
    label: string
    url: string
  }
}[]> => {
  try {
    const response = await appClient.get('/dashboard/insights')
    return response.data.data || response.data || []
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return mock data when backend is not available
    return [
      {
        title: 'Yüksek Performans',
        description: 'Bu ay görev tamamlama oranı %94.2 ile hedefin üzerinde',
        type: 'success',
        action: {
          label: 'Detayları Gör',
          url: '/missions'
        }
      },
      {
        title: 'Yeni Kullanıcılar',
        description: 'Son 7 günde 156 yeni kullanıcı kaydı yapıldı',
        type: 'info',
        action: {
          label: 'Kullanıcıları Gör',
          url: '/users'
        }
      }
    ]
  }
}

// Get dashboard configuration
export const getDashboardConfig = async (): Promise<{
  refreshInterval: number
  enabledModules: string[]
  defaultPeriod: string
  currency: string
  timezone: string
}> => {
  try {
    const response = await appClient.get('/dashboard/config')
    return response.data.data || response.data
  } catch (error) {
    console.warn('Backend connection failed, using mock data:', error)
    // Return default configuration
    return {
      refreshInterval: 30000, // 30 seconds
      enabledModules: ['stats', 'activities', 'missions', 'market'],
      defaultPeriod: '7d',
      currency: 'TRY',
      timezone: 'Europe/Istanbul'
    }
  }
}
