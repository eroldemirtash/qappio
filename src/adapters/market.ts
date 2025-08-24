import appClient, { PaginationParams, PaginatedResponse, handleApiError } from '@/data/clients/appClient'
import { MarketProduct, MarketOrder, WalletSummary, MarketFilters } from '@/types/dashboard'

// Get market products with pagination and filters
export const getMarketProducts = async (
  params: PaginationParams & MarketFilters = {}
): Promise<PaginatedResponse<MarketProduct>> => {
  try {
    const response = await appClient.get('/market/products', {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        q: params.q || undefined,
        category: params.category || undefined,
        brandId: params.brandId || undefined,
        priceFrom: params.priceFrom || undefined,
        priceTo: params.priceTo || undefined,
        inStock: params.inStock || undefined,
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
    console.error('Failed to fetch market products:', error)
    throw new Error(handleApiError(error))
  }
}

// Get market product by ID
export const getMarketProductById = async (id: string): Promise<MarketProduct> => {
  try {
    const response = await appClient.get(`/market/products/${id}`)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to fetch market product ${id}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get market orders with pagination and filters
export const getMarketOrders = async (
  params: PaginationParams & {
    status?: string
    userId?: string
    from?: string
    to?: string
  } = {}
): Promise<PaginatedResponse<MarketOrder>> => {
  try {
    const response = await appClient.get('/market/orders', {
      params: {
        page: params.page || 1,
        limit: params.limit || 20,
        q: params.q || undefined,
        status: params.status || undefined,
        userId: params.userId || undefined,
        from: params.from || undefined,
        to: params.to || undefined,
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
    console.error('Failed to fetch market orders:', error)
    throw new Error(handleApiError(error))
  }
}

// Get market order by ID
export const getMarketOrderById = async (id: string): Promise<MarketOrder> => {
  try {
    const response = await appClient.get(`/market/orders/${id}`)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to fetch market order ${id}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get wallet summary
export const getWalletSummary = async (params: {
  from?: string
  to?: string
  userId?: string
} = {}): Promise<WalletSummary> => {
  try {
    const response = await appClient.get('/wallet/summary', {
      params: {
        from: params.from || undefined,
        to: params.to || undefined,
        userId: params.userId || undefined,
      }
    })
    
    return response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch wallet summary:', error)
    throw new Error(handleApiError(error))
  }
}

// Get market categories
export const getMarketCategories = async (): Promise<string[]> => {
  try {
    const response = await appClient.get('/market/categories')
    return response.data.data || response.data || []
  } catch (error) {
    console.error('Failed to fetch market categories:', error)
    return [
      'Elektronik & Teknoloji',
      'Moda & Aksesuar',
      'Yiyecek & İçecek',
      'Hediye Çekleri',
      'Spor & Outdoor',
      'Kişisel Bakım & Kozmetik',
      'Ev & Yaşam',
      'Deneyim & Etkinlik',
      'Çocuk & Oyun',
      'Premium Özel',
      'Tatil & Seyahat'
    ]
  }
}

// Get market brands
export const getMarketBrands = async (): Promise<{ id: string; name: string; logo?: string }[]> => {
  try {
    const response = await appClient.get('/market/brands')
    return response.data.data || response.data || []
  } catch (error) {
    console.error('Failed to fetch market brands:', error)
    return []
  }
}

// Get market statistics
export const getMarketStats = async (): Promise<{
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  totalUsers: number
  topCategories: { name: string; count: number }[]
  topBrands: { name: string; revenue: number }[]
}> => {
  try {
    const response = await appClient.get('/market/stats')
    return response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch market stats:', error)
    throw new Error(handleApiError(error))
  }
}

// Get market product statistics
export const getMarketProductStats = async (productId: string): Promise<{
  totalSold: number
  totalRevenue: number
  averageRating: number
  totalReviews: number
  stockHistory: { date: string; stock: number }[]
  salesHistory: { date: string; sold: number }[]
}> => {
  try {
    const response = await appClient.get(`/market/products/${productId}/stats`)
    return response.data.data || response.data
  } catch (error) {
    console.error(`Failed to fetch market product stats ${productId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get market order statistics
export const getMarketOrderStats = async (params: {
  from?: string
  to?: string
  status?: string
} = {}): Promise<{
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  ordersByStatus: { status: string; count: number }[]
  revenueByDate: { date: string; revenue: number }[]
}> => {
  try {
    const response = await appClient.get('/market/orders/stats', {
      params: {
        from: params.from || undefined,
        to: params.to || undefined,
        status: params.status || undefined,
      }
    })
    
    return response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch market order stats:', error)
    throw new Error(handleApiError(error))
  }
}

// Search market products
export const searchMarketProducts = async (
  query: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<MarketProduct>> => {
  try {
    const response = await appClient.get('/market/products', {
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
    console.error('Failed to search market products:', error)
    throw new Error(handleApiError(error))
  }
}

// Get market products by category
export const getMarketProductsByCategory = async (
  category: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<MarketProduct>> => {
  try {
    const response = await appClient.get('/market/products', {
      params: {
        ...params,
        category
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
    console.error(`Failed to fetch market products by category ${category}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get market products by brand
export const getMarketProductsByBrand = async (
  brandId: string,
  params: PaginationParams = {}
): Promise<PaginatedResponse<MarketProduct>> => {
  try {
    const response = await appClient.get('/market/products', {
      params: {
        ...params,
        brandId
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
    console.error(`Failed to fetch market products by brand ${brandId}:`, error)
    throw new Error(handleApiError(error))
  }
}

// Get low stock products
export const getLowStockProducts = async (threshold: number = 20): Promise<MarketProduct[]> => {
  try {
    const response = await appClient.get('/market/products/low-stock', {
      params: {
        threshold
      }
    })
    
    return response.data.data || response.data || []
  } catch (error) {
    console.error('Failed to fetch low stock products:', error)
    throw new Error(handleApiError(error))
  }
}

// Get out of stock products
export const getOutOfStockProducts = async (): Promise<MarketProduct[]> => {
  try {
    const response = await appClient.get('/market/products/out-of-stock')
    return response.data.data || response.data || []
  } catch (error) {
    console.error('Failed to fetch out of stock products:', error)
    throw new Error(handleApiError(error))
  }
}
