'use client'

import { useState, useEffect, useRef } from 'react'
import { format, subDays, startOfDay, endOfDay } from 'date-fns'
import { tr } from 'date-fns/locale'
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, FunnelChart, Funnel
} from 'recharts'
import { 
  Calendar, Download, FileText, TrendingUp, Users, DollarSign, 
  RefreshCw, Info, ChevronDown, Search, Filter
} from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'
import { 
  getFinanceAnalytics, 
  exportToCSV, 
  formatCurrency, 
  formatPercentage,
  type FinanceAnalyticsData,
  type FinanceAnalyticsParams
} from '@/adapters/finance'

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
  secondary: `linear-gradient(135deg, ${QAPPIO_COLORS.indigo} 0%, ${QAPPIO_COLORS.teal} 100%)`
}

export default function FinanceAnalyticsPage() {
  const [data, setData] = useState<FinanceAnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState<FinanceAnalyticsParams>({
    from: subDays(new Date(), 90),
    to: new Date(),
    granularity: 'monthly',
    currency: 'TRY',
    includeVAT: true
  })

  const chartRefs = {
    revenueTrend: useRef(null),
    planStacked: useRef(null),
    expensesPie: useRef(null),
    cashVsInvoice: useRef(null),
    funnel: useRef(null)
  }

  useEffect(() => {
    loadData()
  }, [params])

  const loadData = async () => {
    setLoading(true)
    try {
      const analyticsData = await getFinanceAnalytics(params)
      setData(analyticsData)
    } catch (error) {
      console.error('Failed to load analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportCSV = (type: 'transactions' | 'planPerformance') => {
    if (!data) return
    
    const exportData = type === 'transactions' ? data.tables.transactions : data.tables.planPerformance
    const filename = `qappio_${type}_${format(new Date(), 'yyyy-MM-dd')}.csv`
    exportToCSV(exportData, filename)
  }

  const handleExportPNG = (chartType: keyof typeof chartRefs) => {
    const filename = `qappio_${chartType}_${format(new Date(), 'yyyy-MM-dd')}.png`
    // This would require html2canvas or similar library
    console.info(`PNG export requested for: ${filename}`)
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!data) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <RefreshCw className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Veri yüklenemedi</h3>
            <p className="text-gray-600 mb-4">Finans analiz verileri yüklenirken bir hata oluştu.</p>
            <Button onClick={loadData}>Tekrar Dene</Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Finans Analizi</h1>
            <p className="text-gray-600 mt-1">Detaylı finansal performans ve trend analizi</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={loadData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Yenile
            </Button>
            <Button 
              onClick={() => handleExportCSV('transactions')}
              style={{ background: GRADIENT_COLORS.primary }}
              className="text-white border-0"
            >
              <Download className="w-4 h-4 mr-2" />
              CSV İndir
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Tarih Aralığı:</span>
                <input
                  type="date"
                  value={format(params.from, 'yyyy-MM-dd')}
                  onChange={(e) => setParams(prev => ({ ...prev, from: new Date(e.target.value) }))}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="date"
                  value={format(params.to, 'yyyy-MM-dd')}
                  onChange={(e) => setParams(prev => ({ ...prev, to: new Date(e.target.value) }))}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Granularite:</span>
                <select
                  value={params.granularity}
                  onChange={(e) => setParams(prev => ({ ...prev, granularity: e.target.value as any }))}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="daily">Günlük</option>
                  <option value="weekly">Haftalık</option>
                  <option value="monthly">Aylık</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">Para Birimi:</span>
                <select
                  value={params.currency}
                  onChange={(e) => setParams(prev => ({ ...prev, currency: e.target.value as any }))}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="includeVAT"
                  checked={params.includeVAT}
                  onChange={(e) => setParams(prev => ({ ...prev, includeVAT: e.target.checked }))}
                  className="w-4 h-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="includeVAT" className="text-sm text-gray-700">KDV Dahil</label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className={data.kpis.deltas.totalRevenue >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatPercentage(data.kpis.deltas.totalRevenue)}
                  </span>
                  <TrendingUp className={`w-4 h-4 ${data.kpis.deltas.totalRevenue >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(data.kpis.totalRevenue, params.currency)}
              </h3>
              <p className="text-sm text-gray-600">Toplam Gelir</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className={data.kpis.deltas.arpu >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatPercentage(data.kpis.deltas.arpu)}
                  </span>
                  <TrendingUp className={`w-4 h-4 ${data.kpis.deltas.arpu >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(data.kpis.arpu, params.currency)}
              </h3>
              <p className="text-sm text-gray-600">ARPU</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className={data.kpis.deltas.conversionRate >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatPercentage(data.kpis.deltas.conversionRate)}
                  </span>
                  <TrendingUp className={`w-4 h-4 ${data.kpis.deltas.conversionRate >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {(data.kpis.conversionRate * 100).toFixed(1)}%
              </h3>
              <p className="text-sm text-gray-600">Dönüşüm Oranı</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className={data.kpis.deltas.activeSubs >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {formatPercentage(data.kpis.deltas.activeSubs)}
                  </span>
                  <TrendingUp className={`w-4 h-4 ${data.kpis.deltas.activeSubs >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {data.kpis.activeSubs.toLocaleString()}
              </h3>
              <p className="text-sm text-gray-600">Aktif Abone</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Gelir Trendi</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportPNG('revenueTrend')}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data.series.revenueTrend} ref={chartRefs.revenueTrend}>
                  <defs>
                    <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={QAPPIO_COLORS.teal} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={QAPPIO_COLORS.teal} stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="netGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={QAPPIO_COLORS.indigo} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={QAPPIO_COLORS.indigo} stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => format(new Date(value), 'MMM dd', { locale: tr })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value, params.currency), '']}
                    labelFormatter={(label) => format(new Date(label), 'dd MMMM yyyy', { locale: tr })}
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke={QAPPIO_COLORS.teal} 
                    fill="url(#totalGradient)"
                    name="Toplam Gelir"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="net" 
                    stroke={QAPPIO_COLORS.indigo} 
                    fill="url(#netGradient)"
                    name="Net Gelir"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Plan Distribution */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Plan Dağılımı</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportPNG('planStacked')}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.series.planStacked} ref={chartRefs.planStacked}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => format(new Date(value), 'MMM dd', { locale: tr })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value, params.currency), '']}
                    labelFormatter={(label) => format(new Date(label), 'dd MMMM yyyy', { locale: tr })}
                  />
                  <Legend />
                  <Bar dataKey="freemium" stackId="a" fill={QAPPIO_COLORS.navy} name="Freemium" />
                  <Bar dataKey="premium" stackId="a" fill={QAPPIO_COLORS.indigo} name="Premium" />
                  <Bar dataKey="platinum" stackId="a" fill={QAPPIO_COLORS.teal} name="Platinum" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Expenses Pie */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Harcama Dağılımı</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportPNG('expensesPie')}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart ref={chartRefs.expensesPie}>
                  <Pie
                    data={data.series.expensesPie}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.series.expensesPie.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Cash vs Invoice */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Tahsilat vs Fatura</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportPNG('cashVsInvoice')}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={data.series.cashVsInvoice} ref={chartRefs.cashVsInvoice}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => format(new Date(value), 'MMM dd', { locale: tr })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip 
                    formatter={(value: number) => [formatCurrency(value, params.currency), '']}
                    labelFormatter={(label) => format(new Date(label), 'dd MMMM yyyy', { locale: tr })}
                  />
                  <Legend />
                  <Bar dataKey="cashIn" fill={QAPPIO_COLORS.teal} name="Tahsilat" />
                  <Line 
                    type="monotone" 
                    dataKey="invoiced" 
                    stroke={QAPPIO_COLORS.indigo} 
                    strokeWidth={2}
                    name="Fatura"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Funnel Chart */}
        <Card className="border border-gray-200 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Dönüşüm Hunisi</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleExportPNG('funnel')}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <FunnelChart ref={chartRefs.funnel}>
                <Tooltip />
                <Funnel
                  dataKey="count"
                  data={data.series.funnel}
                  isAnimationActive
                  fill={QAPPIO_COLORS.teal}
                />
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Transactions Table */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Son 30 Gün İşlemler</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportCSV('transactions')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Tarih</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Kullanıcı</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Plan</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Tutar</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Durum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.tables.transactions.slice(0, 10).map((transaction) => (
                      <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {format(new Date(transaction.date), 'dd MMM', { locale: tr })}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">{transaction.user}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{transaction.plan}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {formatCurrency(transaction.amount, params.currency)}
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            variant={
                              transaction.status === 'completed' ? 'success' :
                              transaction.status === 'pending' ? 'warning' :
                              transaction.status === 'failed' ? 'danger' : 'info'
                            }
                          >
                            {transaction.status === 'completed' ? 'Tamamlandı' :
                             transaction.status === 'pending' ? 'Beklemede' :
                             transaction.status === 'failed' ? 'Başarısız' : 'İade'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Plan Performance Table */}
          <Card className="border border-gray-200 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Plan Performansı</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleExportCSV('planPerformance')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Plan</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Adet</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Net Gelir</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">ARPU</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Churn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.tables.planPerformance.map((plan) => (
                      <tr key={plan.plan} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{plan.plan}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{plan.count.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {formatCurrency(plan.netRevenue, params.currency)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {formatCurrency(plan.arpu, params.currency)}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {(plan.churn * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
