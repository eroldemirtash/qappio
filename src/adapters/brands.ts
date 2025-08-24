import appClient, { PaginationParams, PaginatedResponse, handleApiError } from '@/data/clients/appClient'
import { Brand } from '@/types/dashboard'

// Get brands with pagination
export const getBrands = async (params: PaginationParams = {}): Promise<PaginatedResponse<Brand>> => {
  try {
    const response = await appClient.get('/brands', {
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
    console.error('Failed to fetch brands:', error)
    throw new Error(handleApiError(error))
  }
}

// Get brand by ID
export const getBrandById = async (id: string): Promise<Brand> => {
  try {
    const response = await appClient.get(`/brands/${id}`)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to fetch brand ${id}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get brand names for dropdowns
export const getBrandNames = async (): Promise<{ id: string; name: string }[]> => {
  try {
    const response = await appClient.get('/brands', {
      params: {
        limit: 1000, // Get all brands for dropdown
        fields: 'id,name'
      }
    })
    
    const brands = response.data.items || response.data.data || []
    return brands.map((brand: any) => ({
      id: brand.id,
      name: brand.name
    }))
  } catch (error) {
    console.error('Failed to fetch brand names:', error)
    throw new Error(handleApiError(error))
  }
}

// Get brand logo by brand name
export const getBrandLogo = async (brandName: string): Promise<string | undefined> => {
  try {
    const response = await appClient.get('/brands', {
      params: {
        q: brandName,
        limit: 1
      }
    })
    
    const brands = response.data.items || response.data.data || []
    if (brands.length > 0) {
      return brands[0].logo || brands[0].logoUrl
    }
    return undefined
  } catch (error) {
    console.error(`Failed to fetch brand logo for ${brandName}:`, error)
    return undefined
  }
}

// Search brands
export const searchBrands = async (query: string, limit: number = 10): Promise<Brand[]> => {
  try {
    const response = await appClient.get('/brands', {
      params: {
        q: query,
        limit
      }
    })
    
    return response.data.items || response.data.data || []
  } catch (error) {
    console.error('Failed to search brands:', error)
    throw new Error(handleApiError(error))
  }
}

// Get brands by category or filter
export const getBrandsByFilter = async (filters: {
  category?: string
  status?: string
  isActive?: boolean
} = {}): Promise<Brand[]> => {
  try {
    const response = await appClient.get('/brands', {
      params: {
        ...filters,
        limit: 1000
      }
    })
    
    return response.data.items || response.data.data || []
  } catch (error) {
    console.error('Failed to fetch brands by filter:', error)
    throw new Error(handleApiError(error))
  }
}

// Get brand statistics
export const getBrandStats = async (brandId: string): Promise<{
  totalMissions: number
  activeMissions: number
  totalParticipants: number
  totalPosts: number
  totalLikes: number
}> => {
  try {
    const response = await appClient.get(`/brands/${brandId}/stats`)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to fetch brand stats for ${brandId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get brand followers
export const getBrandFollowers = async (brandId: string, params: PaginationParams = {}): Promise<PaginatedResponse<{
  id: string
  userId: string
  userName: string
  userAvatar?: string
  followedAt: string
}>> => {
  try {
    const response = await appClient.get(`/brands/${brandId}/followers`, {
      params: {
        page: params.page || 1,
        limit: params.limit || 20
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
    console.error(`Failed to fetch brand followers for ${brandId}:`, error)
    throw new Error(handleApiError(error))
  }
}
