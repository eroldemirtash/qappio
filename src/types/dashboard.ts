// Base types
export interface Brand {
  id: string
  name: string
  logo: string
  logoUrl?: string
  description?: string
  website?: string
  socialMedia?: {
    instagram?: string
    twitter?: string
    facebook?: string
  }
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  email: string
  handle: string
  displayName?: string
  avatarUrl?: string
  bio?: string
  role: 'admin' | 'moderator' | 'viewer'
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
  updatedAt: string
}

export interface LevelInfo {
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
}

export interface MissionListItem {
  id: string
  title: string
  brand: Brand
  reward: number
  status: 'active' | 'draft' | 'done' | 'expired'
  createdAt: string
  startAt: string
  endAt: string
  participants: number
  category: 'photo' | 'video'
  isSponsored: boolean
  sponsorBrand?: string
}

export interface MissionDetail extends MissionListItem {
  description: string
  media: string[]
  stats: {
    likes: number
    comments: number
    shares: number
  }
  period: {
    start: string
    end: string
  }
  requirements?: string[]
  instructions?: string[]
}

export interface Activity {
  id: string
  ts: string
  type: string
  userId: string
  userName: string
  userAvatar?: string
  payload: Record<string, any>
  entityType?: 'mission' | 'post' | 'market' | 'user'
  entityId?: string
}

export interface Post {
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
  missionId?: string
  missionTitle?: string
  brandId?: string
  brandName?: string
}

export interface Message {
  id: string
  from: string
  to: string
  fromName: string
  toName: string
  body: string
  ts: string
  isRead: boolean
  conversationId: string
}

export interface FollowEdge {
  id: string
  follower: string
  followerName: string
  followerAvatar?: string
  followee: string
  followeeName: string
  followeeAvatar?: string
  ts: string
}

export interface Favorite {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  entityType: 'post' | 'product' | 'mission'
  entityId: string
  entityTitle: string
  entityImage?: string
  ts: string
}

export interface MarketProduct {
  id: string
  name: string
  thumbnail: string
  category: string
  price: number
  currency: 'TRY' | 'USD' | 'EUR'
  stock: number
  description?: string
  brandId?: string
  brandName?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface MarketOrder {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  productId: string
  productName: string
  productImage?: string
  amount: number
  currency: 'TRY' | 'USD' | 'EUR'
  status: 'paid' | 'pending' | 'failed' | 'refunded'
  createdAt: string
  updatedAt: string
}

export interface WalletSummary {
  balance: number
  currency: 'TRY' | 'USD' | 'EUR'
  expenses: {
    rewards: number
    coupons: number
    commissions: number
    fees: number
  }
  inflow: {
    topups: number
    refunds: number
  }
  period: {
    from: string
    to: string
  }
}

// Admin specific types
export interface AdminCreateUserRequest {
  email: string
  phone?: string
  password?: string
  name?: string
  handle?: string
  role?: 'viewer' | 'moderator' | 'admin'
}

export interface AdminCreateUserResponse {
  id: string
  email: string
  handle: string
  role: string
  createdAt: string
}

export interface AdminUpdateUserProfileRequest {
  displayName?: string
  avatarUrl?: string
  bio?: string
  phone?: string
}

// Dashboard specific types
export interface DashboardStats {
  totalUsers: number
  activeMissions: number
  totalBrands: number
  monthlyRevenue: number
  marketSales: number
  totalQP: number
  missionCompletion: number
  activeLicenses: number
  changes: {
    totalUsers: number
    activeMissions: number
    totalBrands: number
    monthlyRevenue: number
    marketSales: number
    totalQP: number
    missionCompletion: number
    activeLicenses: number
  }
}

export interface DashboardActivity {
  recentMissions: MissionListItem[]
  recentActivities: Activity[]
  topPerformers: {
    id: string
    name: string
    tasks: number
    completion: number
    color: string
  }[]
}

// Filter and search types
export interface MissionFilters {
  status?: string
  brandId?: string
  category?: string
  isSponsored?: boolean
  dateFrom?: string
  dateTo?: string
}

export interface UserFilters {
  role?: string
  status?: string
  level?: string
  dateFrom?: string
  dateTo?: string
}

export interface MarketFilters {
  category?: string
  brandId?: string
  priceFrom?: number
  priceTo?: number
  inStock?: boolean
}

// API Response types
export interface ApiListResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface ApiErrorResponse {
  success: false
  error: string
  message: string
  statusCode: number
}

export interface ApiSuccessResponse<T> {
  success: true
  data: T
  message?: string
}
