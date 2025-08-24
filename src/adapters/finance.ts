export interface FinanceAnalyticsParams {
  from: Date
  to: Date
  granularity: 'daily' | 'weekly' | 'monthly'
  currency: 'TRY' | 'USD' | 'EUR'
  includeVAT: boolean
}

export interface KPIData {
  totalRevenue: number
  arpu: number
  conversionRate: number
  activeSubs: number
  churnRate: number
  deltas: {
    totalRevenue: number
    arpu: number
    conversionRate: number
    activeSubs: number
    churnRate: number
  }
}

export interface RevenueTrendPoint {
  date: string
  total: number
  net: number
}

export interface PlanStackedPoint {
  date: string
  freemium: number
  premium: number
  platinum: number
}

export interface ExpensePieItem {
  label: string
  value: number
  color: string
}

export interface CashVsInvoicePoint {
  date: string
  cashIn: number
  invoiced: number
}

export interface FunnelStage {
  stage: string
  count: number
  conversion: number
}

export interface Transaction {
  id: string
  date: string
  user: string
  plan: string
  amount: number
  method: string
  status: 'completed' | 'pending' | 'failed' | 'refunded'
}

export interface PlanPerformance {
  plan: string
  count: number
  netRevenue: number
  arpu: number
  churn: number
}

export interface FinanceAnalyticsData {
  kpis: KPIData
  series: {
    revenueTrend: RevenueTrendPoint[]
    planStacked: PlanStackedPoint[]
    expensesPie: ExpensePieItem[]
    cashVsInvoice: CashVsInvoicePoint[]
    funnel: FunnelStage[]
  }
  tables: {
    transactions: Transaction[]
    planPerformance: PlanPerformance[]
  }
}

// Mock data generators
const generateDateRange = (from: Date, to: Date, granularity: 'daily' | 'weekly' | 'monthly'): string[] => {
  const dates: string[] = []
  const current = new Date(from)
  
  while (current <= to) {
    dates.push(current.toISOString().split('T')[0])
    
    switch (granularity) {
      case 'daily':
        current.setDate(current.getDate() + 1)
        break
      case 'weekly':
        current.setDate(current.getDate() + 7)
        break
      case 'monthly':
        current.setMonth(current.getMonth() + 1)
        break
    }
  }
  
  return dates
}

const generateMockRevenueTrend = (dates: string[]): RevenueTrendPoint[] => {
  return dates.map((date, index) => {
    const baseRevenue = 50000 + Math.sin(index * 0.3) * 20000 + Math.random() * 10000
    const vatRate = 0.18
    return {
      date,
      total: baseRevenue,
      net: baseRevenue / (1 + vatRate)
    }
  })
}

const generateMockPlanStacked = (dates: string[]): PlanStackedPoint[] => {
  return dates.map((date, index) => ({
    date,
    freemium: 10000 + Math.random() * 5000,
    premium: 25000 + Math.random() * 10000,
    platinum: 15000 + Math.random() * 8000
  }))
}

const generateMockExpensesPie = (): ExpensePieItem[] => [
  { label: 'Ödül & Kupon', value: 45, color: '#0BD3C8' },
  { label: 'Komisyon', value: 25, color: '#59E1D9' },
  { label: 'İşlem Ücreti', value: 20, color: '#0E1D5A' },
  { label: 'Diğer', value: 10, color: '#0A192F' }
]

const generateMockCashVsInvoice = (dates: string[]): CashVsInvoicePoint[] => {
  return dates.map((date, index) => {
    const baseAmount = 60000 + Math.sin(index * 0.2) * 15000 + Math.random() * 8000
    return {
      date,
      cashIn: baseAmount * 0.85,
      invoiced: baseAmount
    }
  })
}

const generateMockFunnel = (): FunnelStage[] => [
  { stage: 'Ziyaret', count: 10000, conversion: 100 },
  { stage: 'Kayıt', count: 2500, conversion: 25 },
  { stage: 'Aktif', count: 1500, conversion: 15 },
  { stage: 'Ücretli', count: 750, conversion: 7.5 },
  { stage: 'Yenileyen', count: 600, conversion: 6 }
]

const generateMockTransactions = (count: number): Transaction[] => {
  const methods = ['Kredi Kartı', 'Banka Kartı', 'PayPal', 'Havale']
  const plans = ['Freemium', 'Premium', 'Platinum']
  const statuses: Array<'completed' | 'pending' | 'failed' | 'refunded'> = ['completed', 'pending', 'failed', 'refunded']
  
  return Array.from({ length: count }, (_, i) => ({
    id: `TXN-${String(i + 1).padStart(6, '0')}`,
    date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    user: `Kullanıcı ${i + 1}`,
    plan: plans[Math.floor(Math.random() * plans.length)],
    amount: Math.floor(Math.random() * 1000) + 50,
    method: methods[Math.floor(Math.random() * methods.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)]
  }))
}

const generateMockPlanPerformance = (): PlanPerformance[] => [
  {
    plan: 'Freemium',
    count: 5000,
    netRevenue: 0,
    arpu: 0,
    churn: 0.05
  },
  {
    plan: 'Premium',
    count: 2500,
    netRevenue: 247500,
    arpu: 99,
    churn: 0.08
  },
  {
    plan: 'Platinum',
    count: 800,
    netRevenue: 239200,
    arpu: 299,
    churn: 0.03
  }
]

export const getFinanceAnalytics = async (params: FinanceAnalyticsParams): Promise<FinanceAnalyticsData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const dates = generateDateRange(params.from, params.to, params.granularity)
  
  // Base KPI values
  const baseRevenue = 500000
  const baseARPU = 150
  const baseConversion = 0.075
  const baseActiveSubs = 8300
  const baseChurn = 0.06
  
  // Generate deltas based on date range
  const daysDiff = Math.ceil((params.to.getTime() - params.from.getTime()) / (1000 * 60 * 60 * 24))
  const trendFactor = Math.sin(daysDiff * 0.01) * 0.2 + 1
  
  const kpis: KPIData = {
    totalRevenue: baseRevenue * trendFactor,
    arpu: baseARPU * trendFactor,
    conversionRate: baseConversion * trendFactor,
    activeSubs: baseActiveSubs * trendFactor,
    churnRate: baseChurn * (2 - trendFactor),
    deltas: {
      totalRevenue: (trendFactor - 1) * 100,
      arpu: (trendFactor - 1) * 100,
      conversionRate: (trendFactor - 1) * 100,
      activeSubs: (trendFactor - 1) * 100,
      churnRate: (1 - trendFactor) * 100
    }
  }
  
  return {
    kpis,
    series: {
      revenueTrend: generateMockRevenueTrend(dates),
      planStacked: generateMockPlanStacked(dates),
      expensesPie: generateMockExpensesPie(),
      cashVsInvoice: generateMockCashVsInvoice(dates),
      funnel: generateMockFunnel()
    },
    tables: {
      transactions: generateMockTransactions(100),
      planPerformance: generateMockPlanPerformance()
    }
  }
}

// Export functions
export const exportToCSV = (data: any[], filename: string) => {
  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => `"${row[header]}"`).join(','))
  ].join('\n')
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  
  console.info(`CSV exported: ${filename}`)
}

export const exportToPNG = (chartRef: any, filename: string) => {
  if (chartRef && chartRef.current) {
    // This would require html2canvas or similar library
    console.info(`PNG export requested for: ${filename}`)
  }
}

// Utility functions
export const formatCurrency = (amount: number, currency: string = 'TRY'): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`
}
