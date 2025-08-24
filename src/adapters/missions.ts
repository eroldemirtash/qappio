import appClient, { PaginationParams, PaginatedResponse, handleApiError } from '@/data/clients/appClient'
import { MissionListItem, MissionDetail, MissionFilters } from '@/types/dashboard'

// Get missions with pagination and filters
export const getMissions = async (
  params: PaginationParams & MissionFilters = {}
): Promise<PaginatedResponse<MissionListItem>> => {
  try {
    const response = await appClient.get('/missions', {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        q: params.q || undefined,
        status: params.status || undefined,
        brandId: params.brandId || undefined,
        category: params.category || undefined,
        isSponsored: params.isSponsored || undefined,
        dateFrom: params.dateFrom || undefined,
        dateTo: params.dateTo || undefined,
      }
    })
    
    return {
      items: response.data.items || response.data.data || [],
      total: response.data.total || 0,
      page: response.data.page || 1,
      limit: response.data.limit || 20,
      hasMore: response.data.hasMore || false
    }
  } catch (error) {
    console.error('Failed to fetch missions:', error)
    throw new Error(handleApiError(error))
  }
}

// Get mission by ID with full details
export const getMissionById = async (id: string): Promise<MissionDetail> => {
  try {
    const response = await appClient.get(`/missions/${id}`)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to fetch mission ${id}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get recent missions for dashboard
export const getRecentMissions = async (limit: number = 5): Promise<MissionListItem[]> => {
  try {
    const response = await appClient.get('/missions', {
      params: {
        limit,
        sort: 'createdAt',
        order: 'desc'
      }
    })
    
    return response.data.items || response.data.data || []
  } catch (error) {
    console.error('Failed to fetch recent missions:', error)
    throw new Error(handleApiError(error))
  }
}

// Get active missions
export const getActiveMissions = async (params: PaginationParams = {}): Promise<PaginatedResponse<MissionListItem>> => {
  try {
    const response = await appClient.get('/missions', {
      params: {
        ...params,
        status: 'active'
      }
    })
    
    return {
      items: response.data.items || response.data.data || [],
      total: response.data.total || 0,
      page: response.data.page || 1,
      limit: response.data.limit || 20,
      hasMore: response.data.hasMore || false
    }
  } catch (error) {
    console.error('Failed to fetch active missions:', error)
    throw new Error(handleApiError(error))
  }
}

// Get missions by brand
export const getMissionsByBrand = async (
  brandId: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<MissionListItem>> => {
  try {
    const response = await appClient.get(`/brands/${brandId}/missions`, {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        q: params.q || undefined,
      }
    })
    
    return {
      items: response.data.items || response.data.data || [],
      total: response.data.total || 0,
      page: response.data.page || 1,
      limit: response.data.limit || 20,
      hasMore: response.data.hasMore || false
    }
  } catch (error) {
    console.error(`Failed to fetch missions for brand ${brandId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get mission participants
export const getMissionParticipants = async (
  missionId: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<{
  id: string
  userId: string
  userName: string
  userAvatar?: string
  joinedAt: string
  postsCount: number
  totalLikes: number
}>> => {
  try {
    const response = await appClient.get(`/missions/${missionId}/participants`, {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        q: params.q || undefined,
      }
    })
    
    return {
      items: response.data.items || response.data.data || [],
      total: response.data.total || 0,
      page: response.data.page || 1,
      limit: response.data.limit || 20,
      hasMore: response.data.hasMore || false
    }
  } catch (error) {
    console.error(`Failed to fetch participants for mission ${missionId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get mission statistics
export const getMissionStats = async (missionId: string): Promise<{
  totalParticipants: number
  totalPosts: number
  totalLikes: number
  totalComments: number
  totalShares: number
  completionRate: number
}> => {
  try {
    const response = await appClient.get(`/missions/${missionId}/stats`)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to fetch stats for mission ${missionId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get mission posts
export const getMissionPosts = async (
  missionId: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<{
  id: string
  userId: string
  userName: string
  userAvatar?: string
  media: string[]
  caption: string
  stats: {
    likes: number
    comments: number
    shares: number
  }
  createdAt: string
}>> => {
  try {
    const response = await appClient.get(`/missions/${missionId}/posts`, {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        q: params.q || undefined,
      }
    })
    
    return {
      items: response.data.items || response.data.data || [],
      total: response.data.total || 0,
      page: response.data.page || 1,
      limit: response.data.limit || 20,
      hasMore: response.data.hasMore || false
    }
  } catch (error) {
    console.error(`Failed to fetch posts for mission ${missionId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Search missions
export const searchMissions = async (
  query: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<MissionListItem>> => {
  try {
    const response = await appClient.get('/missions', {
      params: {
        ...params,
        q: query
      }
    })
    
    return {
      items: response.data.items || response.data.data || [],
      total: response.data.total || 0,
      page: response.data.page || 1,
      limit: response.data.limit || 20,
      hasMore: response.data.hasMore || false
    }
  } catch (error) {
    console.error('Failed to search missions:', error)
    throw new Error(handleApiError(error))
  }
}

// Get mission categories
export const getMissionCategories = async (): Promise<string[]> => {
  try {
    const response = await appClient.get('/missions/categories')
    return response.data.data || response.data || []
  } catch (error) {
    console.error('Failed to fetch mission categories:', error)
    return ['photo', 'video'] // Fallback to default categories
  }
}

// Get mission statuses
export const getMissionStatuses = async (): Promise<string[]> => {
  try {
    const response = await appClient.get('/missions/statuses')
    return response.data.data || response.data || []
  } catch (error) {
    console.error('Failed to fetch mission statuses:', error)
    return ['active', 'draft', 'done', 'expired'] // Fallback to default statuses
  }
}
