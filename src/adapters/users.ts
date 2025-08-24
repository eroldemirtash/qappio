import appClient, { PaginationParams, PaginatedResponse, handleApiError } from '@/data/clients/appClient'
import { 
  User, 
  AdminCreateUserRequest, 
  AdminCreateUserResponse, 
  AdminUpdateUserProfileRequest,
  UserFilters 
} from '@/types/dashboard'

// Get users with pagination and filters
export const getUsers = async (
  params: PaginationParams & UserFilters = {}
): Promise<PaginatedResponse<User>> => {
  try {
    const response = await appClient.get('/users', {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        q: params.q || undefined,
        role: params.role || undefined,
        status: params.status || undefined,
        level: params.level || undefined,
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
    console.error('Failed to fetch users:', error)
    throw new Error(handleApiError(error))
  }
}

// Get user by ID
export const getUserById = async (id: string): Promise<User> => {
  try {
    const response = await appClient.get(`/users/${id}`)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to fetch user ${id}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get current user profile
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await appClient.get('/users/me')
    return response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch current user:', error)
    throw new Error(handleApiError(error))
  }
}

// Search users
export const searchUsers = async (
  query: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<User>> => {
  try {
    const response = await appClient.get('/users', {
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
    console.error('Failed to search users:', error)
    throw new Error(handleApiError(error))
  }
}

// Get users by role
export const getUsersByRole = async (
  role: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<User>> => {
  try {
    const response = await appClient.get('/users', {
      params: {
        ...params,
        role
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
    console.error(`Failed to fetch users by role ${role}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get users by status
export const getUsersByStatus = async (
  status: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<User>> => {
  try {
    const response = await appClient.get('/users', {
      params: {
        ...params,
        status
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
    console.error(`Failed to fetch users by status ${status}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Admin: Create new user
export const adminCreateUser = async (userData: AdminCreateUserRequest): Promise<AdminCreateUserResponse> => {
  try {
    const response = await appClient.post('/admin/users', userData)
    return response.data.data || response.data
  } catch (error) {
    console.error('Failed to create user:', error)
    throw new Error(handleApiError(error))
  }
}

// Admin: Update user profile
export const adminUpdateUserProfile = async (
  userId: string,
  profileData: AdminUpdateUserProfileRequest
): Promise<User> => {
  try {
    const response = await appClient.post(`/admin/users/${userId}/profile`, profileData)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to update user profile ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Admin: Update user role
export const adminUpdateUserRole = async (
  userId: string,
  role: 'viewer' | 'moderator' | 'admin'
): Promise<User> => {
  try {
    const response = await appClient.patch(`/admin/users/${userId}/role`, { role })
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to update user role ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Admin: Update user status
export const adminUpdateUserStatus = async (
  userId: string,
  status: 'active' | 'inactive' | 'suspended'
): Promise<User> => {
  try {
    const response = await appClient.patch(`/admin/users/${userId}/status`, { status })
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to update user status ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get user statistics
export const getUserStats = async (userId: string): Promise<{
  totalMissions: number
  completedMissions: number
  totalPosts: number
  totalLikes: number
  totalFollowers: number
  totalFollowing: number
  level: {
    name: string
    color: string
    points: number
  }
}> => {
  try {
    const response = await appClient.get(`/users/${userId}/stats`)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to fetch user stats ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get user level information
export const getUserLevel = async (userId: string): Promise<{
  current: {
    name: string
    color: string
    points: number
  }
  next?: {
    name: string
    needed: number
  }
  badges: string[]
}> => {
  try {
    const response = await appClient.get(`/users/${userId}/level`)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to fetch user level ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get user activities
export const getUserActivities = async (
  userId: string,
  params: PaginationParams & { since?: string } = {}
): Promise<PaginatedResponse<{
  id: string
  type: string
  payload: Record<string, any>
  ts: string
}>> => {
  try {
    const response = await appClient.get(`/users/${userId}/activities`, {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        since: params.since || undefined,
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
    console.error(`Failed to fetch user activities ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get user posts
export const getUserPosts = async (
  userId: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<{
  id: string
  media: string[]
  caption: string
  stats: {
    likes: number
    comments: number
    shares: number
  }
  createdAt: string
  missionId?: string
  missionTitle?: string
}>> => {
  try {
    const response = await appClient.get(`/users/${userId}/posts`, {
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
    console.error(`Failed to fetch user posts ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get user followers
export const getUserFollowers = async (
  userId: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<{
  id: string
  followerId: string
  followerName: string
  followerAvatar?: string
  followedAt: string
}>> => {
  try {
    const response = await appClient.get(`/users/${userId}/followers`, {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
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
    console.error(`Failed to fetch user followers ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get user following
export const getUserFollowing = async (
  userId: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<{
  id: string
  followeeId: string
  followeeName: string
  followeeAvatar?: string
  followedAt: string
}>> => {
  try {
    const response = await appClient.get(`/users/${userId}/following`, {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
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
    console.error(`Failed to fetch user following ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get user favorites
export const getUserFavorites = async (
  userId: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<{
  id: string
  entityType: 'post' | 'product' | 'mission'
  entityId: string
  entityTitle: string
  entityImage?: string
  ts: string
}>> => {
  try {
    const response = await appClient.get(`/users/${userId}/favorites`, {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
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
    console.error(`Failed to fetch user favorites ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get user market orders
export const getUserMarketOrders = async (
  userId: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<{
  id: string
  productId: string
  productName: string
  productImage?: string
  amount: number
  currency: string
  status: string
  createdAt: string
}>> => {
  try {
    const response = await appClient.get(`/users/${userId}/market-orders`, {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
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
    console.error(`Failed to fetch user market orders ${userId}:`, error)
    throw new Error(handleApiError(error))
  }
}
