'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Settings, User, Shield, Palette, Bell, Globe, Database, Key, Save, X, Plus, Trash2, Edit } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { Card, CardContent, CardHeader } from '@/components/ui/Card'

interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  phone: string
  department: string
  lastLogin: string
  isActive: boolean
}

interface NotificationSetting {
  id: string
  type: string
  title: string
  description: string
  email: boolean
  push: boolean
  sms: boolean
  isActive: boolean
}

interface ThemeSetting {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  isDark: boolean
  isActive: boolean
}

const mockUserProfile: UserProfile = {
  id: '1',
  name: 'Admin User',
      email: 'admin@qappio.com',
      role: 'Super Admin',
  avatar: 'https://i.pravatar.cc/150?img=1',
  phone: '+90 555 123 4567',
  department: 'IT',
  lastLogin: '2024-01-22T10:30:00Z',
  isActive: true
}

const mockNotificationSettings: NotificationSetting[] = [
  {
    id: '1',
    type: 'mission',
    title: 'Görev Bildirimleri',
    description: 'Yeni görevler ve görev güncellemeleri hakkında bildirim al',
    email: true,
    push: true,
    sms: false,
    isActive: true
  },
  {
    id: '2',
    type: 'user',
    title: 'Kullanıcı Bildirimleri',
    description: 'Kullanıcı kayıtları ve aktiviteleri hakkında bildirim al',
    email: true,
    push: false,
    sms: false,
    isActive: true
  },
  {
    id: '3',
    type: 'finance',
    title: 'Finansal Bildirimler',
    description: 'Ödeme ve gelir bildirimleri hakkında bilgi al',
    email: true,
    push: true,
    sms: true,
    isActive: false
  },
  {
    id: '4',
    type: 'system',
    title: 'Sistem Bildirimleri',
    description: 'Sistem güncellemeleri ve bakım bildirimleri',
    email: true,
    push: false,
    sms: false,
    isActive: true
  }
]

const mockThemeSettings: ThemeSetting[] = [
  {
    id: '1',
    name: 'Qappio Default',
    primaryColor: '#0A192F',
    secondaryColor: '#1E3A8A',
    accentColor: '#38BDF8',
    isDark: true,
    isActive: true
  },
  {
    id: '2',
    name: 'Light Mode',
    primaryColor: '#FFFFFF',
    secondaryColor: '#F3F4F6',
    accentColor: '#3B82F6',
    isDark: false,
    isActive: false
  },
  {
    id: '3',
    name: 'Ocean Blue',
    primaryColor: '#1E40AF',
    secondaryColor: '#3B82F6',
    accentColor: '#06B6D4',
    isDark: true,
    isActive: false
  }
]

export default function SettingsPage() {
  const [userProfile, setUserProfile] = useState<UserProfile>(mockUserProfile)
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>(mockNotificationSettings)
  const [themeSettings, setThemeSettings] = useState<ThemeSetting[]>(mockThemeSettings)
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isAddingTheme, setIsAddingTheme] = useState(false)
  const [editingTheme, setEditingTheme] = useState<ThemeSetting | null>(null)
  
  const [newTheme, setNewTheme] = useState<Omit<ThemeSetting, 'id' | 'isActive'>>({
    name: '',
    primaryColor: '#000000',
    secondaryColor: '#000000',
    accentColor: '#000000',
    isDark: false
  })

  const handleSaveProfile = () => {
    // Burada API çağrısı yapılabilir
    setIsEditingProfile(false)
  }

  const handleSaveNotifications = () => {
    // Burada API çağrısı yapılabilir
    console.log('Notification settings saved:', notificationSettings)
  }

  const handleThemeChange = (themeId: string) => {
    setThemeSettings(prev => prev.map(theme => ({
      ...theme,
      isActive: theme.id === themeId
    })))
  }

  const handleAddTheme = () => {
    if (newTheme.name && newTheme.primaryColor) {
      const theme: ThemeSetting = {
        id: Date.now().toString(),
        ...newTheme,
        isActive: false
      }
      
      setThemeSettings(prev => [...prev, theme])
      setNewTheme({
        name: '',
        primaryColor: '#000000',
        secondaryColor: '#000000',
        accentColor: '#000000',
        isDark: false
      })
      setIsAddingTheme(false)
    }
  }

  const handleEditTheme = () => {
    if (editingTheme && editingTheme.name) {
      setThemeSettings(prev => prev.map(theme => 
        theme.id === editingTheme.id ? editingTheme : theme
      ))
      setEditingTheme(null)
    }
  }

  const handleDeleteTheme = (themeId: string) => {
    if (confirm('Bu temayı silmek istediğinizden emin misiniz?')) {
      setThemeSettings(prev => prev.filter(theme => theme.id !== themeId))
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profil Ayarları', icon: User },
    { id: 'notifications', label: 'Bildirim Ayarları', icon: Bell },
    { id: 'themes', label: 'Tema Ayarları', icon: Palette },
    { id: 'security', label: 'Güvenlik', icon: Shield },
    { id: 'system', label: 'Sistem', icon: Settings }
  ]

  return (
    <DashboardLayout>
        {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ayarlar</h1>
        <p className="text-gray-600">Platform ayarlarını yönetin ve özelleştirin</p>
        </div>

        {/* Settings Tabs */}
      <div className="mb-8">
          <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
              <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                  <Icon size={18} />
                  <span>{tab.label}</span>
              </button>
              )
            })}
            </nav>
        </div>
          </div>

      {/* Profile Settings */}
      {activeTab === 'profile' && (
              <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Profil Bilgileri</h2>
              <p className="text-gray-600">Kişisel bilgilerinizi güncelleyin</p>
            </CardHeader>
            <CardContent>
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <img 
                    src={userProfile.avatar} 
                    alt={userProfile.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  {isEditingProfile ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Ad Soyad"
                          value={userProfile.name}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                        <Input
                          label="E-posta"
                          value={userProfile.email}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                          type="email"
                          required
                        />
                        <Input
                          label="Telefon"
                          value={userProfile.phone}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                        <Input
                          label="Departman"
                          value={userProfile.department}
                          onChange={(e) => setUserProfile(prev => ({ ...prev, department: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button onClick={handleSaveProfile}>
                          <Save size={18} className="mr-2" />
                          Kaydet
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => setIsEditingProfile(false)}
                        >
                          İptal
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                          <p className="text-sm text-gray-500">Ad Soyad</p>
                          <p className="font-semibold text-gray-900">{userProfile.name}</p>
                        </div>
                    <div>
                          <p className="text-sm text-gray-500">E-posta</p>
                          <p className="font-semibold text-gray-900">{userProfile.email}</p>
                    </div>
                    <div>
                          <p className="text-sm text-gray-500">Telefon</p>
                          <p className="font-semibold text-gray-900">{userProfile.phone}</p>
                    </div>
                    <div>
                          <p className="text-sm text-gray-500">Departman</p>
                          <p className="font-semibold text-gray-900">{userProfile.department}</p>
                    </div>
                    <div>
                          <p className="text-sm text-gray-500">Rol</p>
                          <Badge variant="level">{userProfile.role}</Badge>
                    </div>
                        <div>
                          <p className="text-sm text-gray-500">Son Giriş</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(userProfile.lastLogin).toLocaleDateString('tr-TR')}
                          </p>
                  </div>
                      </div>
                      <Button
                        onClick={() => setIsEditingProfile(true)}
                        variant="outline"
                      >
                        <Edit size={18} className="mr-2" />
                        Düzenle
                      </Button>
                    </>
                  )}
                  </div>
                </div>
            </CardContent>
          </Card>
              </div>
            )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
              <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Bildirim Ayarları</h2>
                  <p className="text-gray-600">Hangi bildirimleri almak istediğinizi seçin</p>
                </div>
                <Button onClick={handleSaveNotifications}>
                  <Save size={18} className="mr-2" />
                  Kaydet
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                    <div>
                        <h3 className="font-semibold text-gray-900">{setting.title}</h3>
                        <p className="text-sm text-gray-600">{setting.description}</p>
                      </div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={setting.isActive}
                          onChange={(e) => {
                            setNotificationSettings(prev => prev.map(s => 
                              s.id === setting.id ? { ...s, isActive: e.target.checked } : s
                            ))
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">Aktif</span>
                      </label>
                      </div>
                    
                    {setting.isActive && (
                      <div className="grid grid-cols-3 gap-4">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={setting.email}
                            onChange={(e) => {
                              setNotificationSettings(prev => prev.map(s => 
                                s.id === setting.id ? { ...s, email: e.target.checked } : s
                              ))
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">E-posta</span>
                      </label>
                        <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={setting.push}
                            onChange={(e) => {
                              setNotificationSettings(prev => prev.map(s => 
                                s.id === setting.id ? { ...s, push: e.target.checked } : s
                              ))
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">Push</span>
                      </label>
                        <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={setting.sms}
                            onChange={(e) => {
                              setNotificationSettings(prev => prev.map(s => 
                                s.id === setting.id ? { ...s, sms: e.target.checked } : s
                              ))
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">SMS</span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
                </div>
            </CardContent>
          </Card>
              </div>
            )}

      {/* Theme Settings */}
      {activeTab === 'themes' && (
              <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Tema Ayarları</h2>
                  <p className="text-gray-600">Platform görünümünü özelleştirin</p>
                </div>
                <Button
                  onClick={() => setIsAddingTheme(true)}
                  leftIcon={<Plus size={18} />}
                >
                  Yeni Tema
                </Button>
                </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themeSettings.map((theme) => (
                  <Card key={theme.id} className="qappio-card-hover">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{theme.name}</h3>
                        <div className="flex items-center space-x-2">
                          {theme.isActive && (
                            <Badge variant="success">Aktif</Badge>
                          )}
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingTheme(theme)}
                              >
                                <Edit size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTheme(theme.id)}
                              >
                                <Trash2 size={16} />
                            </Button>
                            </div>
                        </div>
                </div>

                      <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: theme.primaryColor }}
                          />
                          <span className="text-xs text-gray-600">Primary</span>
                    </div>
                    <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: theme.secondaryColor }}
                          />
                          <span className="text-xs text-gray-600">Secondary</span>
                    </div>
                    <div className="flex items-center space-x-2">
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: theme.accentColor }}
                          />
                          <span className="text-xs text-gray-600">Accent</span>
                    </div>
                  </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {theme.isDark ? 'Koyu Tema' : 'Açık Tema'}
                        </span>
                        {!theme.isActive && (
                          <Button
                            size="sm"
                            onClick={() => handleThemeChange(theme.id)}
                          >
                            Aktif Et
                          </Button>
                        )}
                </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
              </div>
            )}

      {/* Security Settings */}
      {activeTab === 'security' && (
              <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Güvenlik Ayarları</h2>
              <p className="text-gray-600">Hesap güvenliğinizi artırın</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">İki Faktörlü Doğrulama</h3>
                    <p className="text-sm text-gray-600">Hesabınızı ekstra güvenlik katmanı ile koruyun</p>
                  </div>
                  <Button variant="outline">Etkinleştir</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Şifre Değiştir</h3>
                    <p className="text-sm text-gray-600">Güçlü bir şifre ile hesabınızı koruyun</p>
                </div>
                  <Button variant="outline">Değiştir</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Oturum Geçmişi</h3>
                    <p className="text-sm text-gray-600">Aktif oturumları görüntüleyin ve yönetin</p>
                  </div>
                  <Button variant="outline">Görüntüle</Button>
                </div>
              </div>
            </CardContent>
          </Card>
              </div>
            )}

      {/* System Settings */}
      {activeTab === 'system' && (
              <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-900">Sistem Ayarları</h2>
              <p className="text-gray-600">Platform sistem ayarlarını yapılandırın</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Dil Ayarları</h3>
                    <p className="text-sm text-gray-600">Platform dilini değiştirin</p>
                  </div>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg">
                    <option value="tr">Türkçe</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Zaman Dilimi</h3>
                    <p className="text-sm text-gray-600">Sistem zaman dilimini ayarlayın</p>
                            </div>
                  <select className="px-4 py-2 border border-gray-200 rounded-lg">
                    <option value="Europe/Istanbul">İstanbul (UTC+3)</option>
                    <option value="Europe/London">Londra (UTC+0)</option>
                    <option value="America/New_York">New York (UTC-5)</option>
                  </select>
                            </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">Veri Yedekleme</h3>
                    <p className="text-sm text-gray-600">Sistem verilerini yedekleyin</p>
                </div>
                  <Button variant="outline">Yedekle</Button>
              </div>
          </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Theme Modal */}
      {isAddingTheme && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Yeni Tema Ekle</h2>
                <button 
                  onClick={() => setIsAddingTheme(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Tema Adı"
                  value={newTheme.name}
                  onChange={(e) => setNewTheme(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Özel Tema"
                  required
                />
                
                <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary</label>
                  <input
                      type="color"
                      value={newTheme.primaryColor}
                      onChange={(e) => setNewTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary</label>
                  <input
                      type="color"
                      value={newTheme.secondaryColor}
                      onChange={(e) => setNewTheme(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accent</label>
                  <input
                      type="color"
                      value={newTheme.accentColor}
                      onChange={(e) => setNewTheme(prev => ({ ...prev, accentColor: e.target.value }))}
                      className="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newTheme.isDark}
                    onChange={(e) => setNewTheme(prev => ({ ...prev, isDark: e.target.checked }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Koyu Tema</span>
                  </label>
              </div>

              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => setIsAddingTheme(false)}
                >
                  İptal
                </Button>
                <Button
                  onClick={handleAddTheme}
                  disabled={!newTheme.name}
                >
                  Tema Ekle
                </Button>
              </div>
              </div>
            </div>
          </div>
        )}

      {/* Edit Theme Modal */}
      {editingTheme && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Tema Düzenle</h2>
                <button 
                  onClick={() => setEditingTheme(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <Input
                  label="Tema Adı"
                  value={editingTheme.name}
                  onChange={(e) => setEditingTheme(prev => prev ? { ...prev, name: e.target.value } : null)}
                  placeholder="Özel Tema"
                  required
                />
                
                <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary</label>
                  <input
                      type="color"
                      value={editingTheme.primaryColor}
                      onChange={(e) => setEditingTheme(prev => prev ? { ...prev, primaryColor: e.target.value } : null)}
                      className="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary</label>
                  <input
                      type="color"
                      value={editingTheme.secondaryColor}
                      onChange={(e) => setEditingTheme(prev => prev ? { ...prev, secondaryColor: e.target.value } : null)}
                      className="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accent</label>
                    <input
                      type="color"
                      value={editingTheme.accentColor}
                      onChange={(e) => setEditingTheme(prev => prev ? { ...prev, accentColor: e.target.value } : null)}
                      className="w-full h-10 border border-gray-200 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingTheme.isDark}
                    onChange={(e) => setEditingTheme(prev => prev ? { ...prev, isDark: e.target.checked } : null)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">Koyu Tema</span>
                  </label>
                </div>

              <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => setEditingTheme(null)}
                >
                  İptal
                </Button>
                <Button
                  onClick={handleEditTheme}
                  disabled={!editingTheme.name}
                >
                  Değişiklikleri Kaydet
                </Button>
              </div>
            </div>
          </div>
      </div>
      )}
    </DashboardLayout>
  )
}
