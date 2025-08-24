import { useQuery } from '@tanstack/react-query'
import { 
  getDashboardStats, 
  getDashboardActivities, 
  getRecentActivities,
  getTopPerformers,
  getPlatformOverview,
  getPerformanceMetrics,
  getSystemHealth,
  getRealTimeMetrics
} from '@/adapters/dashboard'

// Dashboard stats hook
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: getDashboardStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  })
}

// Dashboard activities hook
export const useDashboardActivities = () => {
  return useQuery({
    queryKey: ['dashboard', 'activities'],
    queryFn: getDashboardActivities,
    staleTime: 1 * 60 * 1000, // 1 minute
    refetchInterval: 2 * 60 * 1000, // 2 minutes
  })
}

// Recent activities hook
export const useRecentActivities = (limit: number = 10) => {
  return useQuery({
    queryKey: ['dashboard', 'recent-activities', limit],
    queryFn: () => getRecentActivities(limit),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
  })
}

// Top performers hook
export const useTopPerformers = (period: 'week' | 'month' | 'quarter' = 'month', limit: number = 10) => {
  return useQuery({
    queryKey: ['dashboard', 'top-performers', period, limit],
    queryFn: () => getTopPerformers({ period, limit }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 15 * 60 * 1000, // 15 minutes
  })
}

// Platform overview hook
export const usePlatformOverview = () => {
  return useQuery({
    queryKey: ['dashboard', 'platform-overview'],
    queryFn: getPlatformOverview,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // 5 minutes
  })
}

// Performance metrics hook
export const usePerformanceMetrics = (params: {
  from?: string
  to?: string
  granularity?: 'daily' | 'weekly' | 'monthly'
} = {}) => {
  return useQuery({
    queryKey: ['dashboard', 'performance-metrics', params],
    queryFn: () => getPerformanceMetrics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 15 * 60 * 1000, // 15 minutes
  })
}

// System health hook
export const useSystemHealth = () => {
  return useQuery({
    queryKey: ['dashboard', 'system-health'],
    queryFn: getSystemHealth,
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // 1 minute
  })
}

// Real-time metrics hook
export const useRealTimeMetrics = () => {
  return useQuery({
    queryKey: ['dashboard', 'real-time-metrics'],
    queryFn: getRealTimeMetrics,
    staleTime: 10 * 1000, // 10 seconds
    refetchInterval: 30 * 1000, // 30 seconds
  })
}

// Combined dashboard data hook
export const useDashboardData = () => {
  const stats = useDashboardStats()
  const activities = useDashboardActivities()
  const recentActivities = useRecentActivities(5)
  const topPerformers = useTopPerformers('month', 4)
  const platformOverview = usePlatformOverview()
  const systemHealth = useSystemHealth()
  const realTimeMetrics = useRealTimeMetrics()

  return {
    stats: stats.data,
    activities: activities.data,
    recentActivities: recentActivities.data,
    topPerformers: topPerformers.data,
    platformOverview: platformOverview.data,
    systemHealth: systemHealth.data,
    realTimeMetrics: realTimeMetrics.data,
    isLoading: stats.isLoading || activities.isLoading || recentActivities.isLoading || topPerformers.isLoading || platformOverview.isLoading || systemHealth.isLoading || realTimeMetrics.isLoading,
    isError: stats.isError || activities.isError || recentActivities.isError || topPerformers.isError || platformOverview.isError || systemHealth.isError || realTimeMetrics.isError,
    error: stats.error || activities.error || recentActivities.error || topPerformers.error || platformOverview.error || systemHealth.error || realTimeMetrics.error,
  }
}
