'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Users, 
  Target, 
  Building2, 
  TrendingUp, 
  ShoppingCart, 
  Coins,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Chart.js kayıt
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function HomePage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0A0F2A] via-[#0E1D5A] to-[#0BD3C8] flex items-center justify-center">
        <div className="text-center q-glass-card rounded-3xl p-8 backdrop-blur-xl">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#0BD3C8] border-t-transparent mx-auto mb-6"></div>
          <p className="text-[#0A0F2A] text-lg font-medium">Yükleniyor...</p>
          <div className="mt-4 w-32 h-1 bg-gradient-to-r from-[#0BD3C8] to-[#59E1D9] rounded-full q-shimmer"></div>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const stats = [
    {
      title: 'Toplam Kullanıcı Sayısı',
      value: '12,543',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'from-[#0BD3C8] to-[#59E1D9]',
      bgColor: 'from-[#0BD3C8]/10 to-[#59E1D9]/10',
      textColor: 'text-[#0A0F2A]',
      changeColor: 'text-green-600',
      description: 'Geçen aya göre'
    },
    {
      title: 'Toplam Marka Sayısı',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: Building2,
      color: 'from-[#0E1D5A] to-[#0BD3C8]',
      bgColor: 'from-[#0E1D5A]/10 to-[#0BD3C8]/10',
      textColor: 'text-[#0A0F2A]',
      changeColor: 'text-green-600',
      description: 'Geçen aya göre'
    },
    {
      title: 'Aktif Görevler',
      value: '89',
      change: '+5%',
      changeType: 'positive',
      icon: Target,
      color: 'from-green-400 to-green-500',
      bgColor: 'from-green-400/10 to-green-500/10',
      textColor: 'text-[#0A0F2A]',
      changeColor: 'text-green-600',
      description: 'Geçen aya göre'
    },
    {
      title: 'Dağıtılan Toplam QP',
      value: '2.4M',
      change: '+18%',
      changeType: 'positive',
      icon: Coins,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-400/10 to-orange-500/10',
      textColor: 'text-[#0A0F2A]',
      changeColor: 'text-green-600',
      description: 'Geçen aya göre'
    },
    {
      title: 'Marketten Alınan Ürün',
      value: '3,247',
      change: '+15%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'from-orange-400 to-red-500',
      bgColor: 'from-orange-400/10 to-red-500/10',
      textColor: 'text-[#0A0F2A]',
      changeColor: 'text-green-600',
      description: 'Geçen aya göre'
    }
  ];

  // Haftalık aktif kullanıcı trendi verisi
  const weeklyData = {
    labels: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
    datasets: [
      {
        label: 'Aktif Kullanıcılar',
        data: [1250, 1380, 1420, 1350, 1580, 1720, 1890],
        borderColor: '#0BD3C8',
        backgroundColor: 'rgba(11, 211, 200, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#0BD3C8',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          font: {
            size: 12
          },
          color: '#4B5563'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          font: {
            size: 12
          },
          color: '#4B5563'
        }
      }
    },
    elements: {
      point: {
        hoverBackgroundColor: '#0BD3C8'
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#0A0F2A] flex items-center">
            <TrendingUp className="mr-3 text-[#0BD3C8]" size={32} />
            Ana Sayfa
          </h1>
          <p className="text-[#4B5563] mt-2 text-lg">Qappio platform genel durumu ve istatistikleri</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="q-glass-card rounded-3xl p-6 backdrop-blur-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-r ${stat.bgColor} p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 text-[#0A0F2A]`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.changeType === 'positive' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-bold ${stat.changeColor}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#4B5563] mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-[#0A0F2A] mb-2">{stat.value}</p>
                  <p className="text-xs text-[#4B5563]">{stat.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Active Users Chart */}
          <div className="q-glass-card rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#0A0F2A]">Haftalık Aktif Kullanıcı Trendi</h3>
                <p className="text-[#4B5563] mt-1">Son 7 günün verisi</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-[#0BD3C8] to-[#59E1D9] rounded-full"></div>
                <span className="text-sm text-[#4B5563]">Aktif Kullanıcılar</span>
              </div>
            </div>
            <div className="h-64">
              <Line data={weeklyData} options={chartOptions} />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="q-glass-card rounded-3xl p-6 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-[#0A0F2A] mb-6">Hızlı İstatistikler</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0BD3C8]/10 to-[#59E1D9]/10 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#0BD3C8] to-[#59E1D9] rounded-2xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-[#0A0F2A] font-bold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A0F2A]">Bugün Aktif</p>
                    <p className="text-xs text-[#4B5563]">Son 24 saat</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#0BD3C8]">1,890</p>
                  <p className="text-xs text-green-600 font-bold">+12%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-400/10 to-green-500/10 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white font-bold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A0F2A]">Tamamlanan Görev</p>
                    <p className="text-xs text-[#4B5563]">Bu hafta</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-500">234</p>
                  <p className="text-xs text-green-600 font-bold">+8%</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0E1D5A]/10 to-[#0BD3C8]/10 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#0E1D5A] to-[#0BD3C8] rounded-2xl flex items-center justify-center">
                    <Coins className="w-5 h-5 text-white font-bold" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0A0F2A]">Ortalama QP</p>
                    <p className="text-xs text-[#4B5563]">Kullanıcı başına</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#0E1D5A]">1,247</p>
                  <p className="text-xs text-green-600 font-bold">+15%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="q-glass-card rounded-3xl overflow-hidden backdrop-blur-xl">
          <div className="px-6 py-6 border-b border-white/20 bg-gradient-to-r from-[#0BD3C8]/10 to-[#59E1D9]/10">
            <h3 className="text-xl font-bold text-[#0A0F2A]">Son Aktiviteler</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-2xl transition-colors duration-200">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-[#0A0F2A]">Yeni kullanıcı kaydı: Ahmet Yılmaz</span>
                <span className="text-xs text-[#4B5563] ml-auto">2 saat önce</span>
              </div>
              <div className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-2xl transition-colors duration-200">
                <div className="w-2 h-2 bg-[#0BD3C8] rounded-full"></div>
                <span className="text-sm text-[#0A0F2A]">Yeni görev oluşturuldu: "Sosyal Medya Kampanyası"</span>
                <span className="text-xs text-[#4B5563] ml-auto">4 saat önce</span>
              </div>
              <div className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-2xl transition-colors duration-200">
                <div className="w-2 h-2 bg-[#0E1D5A] rounded-full"></div>
                <span className="text-sm text-[#0A0F2A]">Marka profili güncellendi: Nike Türkiye</span>
                <span className="text-xs text-[#4B5563] ml-auto">6 saat önce</span>
              </div>
              <div className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-2xl transition-colors duration-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-[#0A0F2A]">Ödeme alındı: Premium Lisans - ₺299</span>
                <span className="text-xs text-[#4B5563] ml-auto">8 saat önce</span>
              </div>
              <div className="flex items-center space-x-3 p-3 hover:bg-white/5 rounded-2xl transition-colors duration-200">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-[#0A0F2A]">Yeni seviye atlayan: Fatma Özkan (Viralist)</span>
                <span className="text-xs text-[#4B5563] ml-auto">12 saat önce</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="q-glass-card rounded-3xl overflow-hidden backdrop-blur-xl">
          <div className="px-6 py-6 border-b border-white/20 bg-gradient-to-r from-[#0E1D5A]/10 to-[#0BD3C8]/10">
            <h3 className="text-xl font-bold text-[#0A0F2A]">Hızlı İşlemler</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-6 border border-white/20 rounded-2xl hover:border-[#0BD3C8] hover:bg-[#0BD3C8]/10 transition-all duration-200 group backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#0BD3C8] to-[#59E1D9] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Users className="w-8 h-8 text-[#0A0F2A] font-bold" />
                  </div>
                  <p className="font-semibold text-[#0A0F2A] text-lg">Kullanıcı Ekle</p>
                  <p className="text-sm text-[#4B5563]">Yeni kullanıcı hesabı oluştur</p>
                </div>
              </button>
              <button className="p-6 border border-white/20 rounded-2xl hover:border-green-500 hover:bg-green-500/10 transition-all duration-200 group backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Target className="w-8 h-8 text-white font-bold" />
                  </div>
                  <p className="font-semibold text-[#0A0F2A] text-lg">Görev Oluştur</p>
                  <p className="text-sm text-[#4B5563]">Yeni görev tanımla</p>
                </div>
              </button>
              <button className="p-6 border border-white/20 rounded-2xl hover:border-[#0E1D5A] hover:bg-[#0E1D5A]/10 transition-all duration-200 group backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#0E1D5A] to-[#0BD3C8] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                    <Building2 className="w-8 h-8 text-white font-bold" />
                  </div>
                  <p className="font-semibold text-[#0A0F2A] text-lg">Marka Ekle</p>
                  <p className="text-sm text-[#4B5563]">Yeni marka profili oluştur</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
