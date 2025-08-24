'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Share2, Check, X, Heart, Search, Filter, Calendar, User, Image as ImageIcon, Eye, Edit, Save, Upload, Link, FileImage, Grid, List } from 'lucide-react';

interface Share {
  id: number;
  userName: string;
  taskName: string;
  content: string; // thumbnail URL
  likes: number;
  date: string;
  brand: string;
  deletionReason?: string;
}

export default function SharesPage() {
  const [shares, setShares] = useState<Share[]>([
    {
      id: 1,
      userName: 'ahmet_yilmaz',
      taskName: 'Nike Spor Ayakkabı Fotoğrafı',
      content: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
      likes: 45,
      date: '2024-01-21',
      brand: 'Nike'
    },
    {
      id: 2,
      userName: 'ayse_demir',
      taskName: 'Adidas T-Shirt Kampanyası',
      content: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&h=150&fit=crop',
      likes: 128,
      date: '2024-01-20',
      brand: 'Adidas'
    },
    {
      id: 3,
      userName: 'mehmet_kaya',
      taskName: 'Puma Spor Çanta',
      content: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=150&h=150&fit=crop',
      likes: 23,
      date: '2024-01-19',
      brand: 'Puma',
      deletionReason: 'İçerik kalitesi yetersiz'
    },
    {
      id: 4,
      userName: 'fatma_ozturk',
      taskName: 'Under Armour Şort',
      content: 'https://images.unsplash.com/photo-1506629905608-5e4b5c32c2c5?w=150&h=150&fit=crop',
      likes: 67,
      date: '2024-01-18',
      brand: 'Under Armour'
    },
    {
      id: 5,
      userName: 'ali_celik',
      taskName: 'Reebok Spor Ayakkabı',
      content: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=150&h=150&fit=crop',
      likes: 89,
      date: '2024-01-17',
      brand: 'Reebok'
    },
    {
      id: 6,
      userName: 'zeynep_arslan',
      taskName: 'New Balance Koşu Ayakkabısı',
      content: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=150&h=150&fit=crop',
      likes: 34,
      date: '2024-01-16',
      brand: 'New Balance'
    }
  ]);

  // Filter states
  const [brandFilter, setBrandFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  // Modal states
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isDeletionModalOpen, setIsDeletionModalOpen] = useState(false);
  const [deletingShare, setDeletingShare] = useState<Share | null>(null);
  const [deletionReason, setDeletionReason] = useState('');
  const [isLikesEditModalOpen, setIsLikesEditModalOpen] = useState(false);
  const [editingLikes, setEditingLikes] = useState<Share | null>(null);
  const [newLikesCount, setNewLikesCount] = useState(0);

  // Photo upload modal states
  const [isPhotoUploadModalOpen, setIsPhotoUploadModalOpen] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  // Available brands for filter
  const brands = ['Tümü', 'Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok', 'New Balance'];

  // Filter shares based on current filters
  const filteredShares = shares.filter(share => {
    const matchesBrand = !brandFilter || brandFilter === 'Tümü' || share.brand === brandFilter;
    const matchesDate = !startDateFilter || !endDateFilter || (
      new Date(share.date) >= new Date(startDateFilter) && new Date(share.date) <= new Date(endDateFilter)
    );
    const matchesUser = !userSearch || share.userName.toLowerCase().includes(userSearch.toLowerCase());
    
    return matchesBrand && matchesDate && matchesUser;
  });

  // Open deletion modal
  const openDeletionModal = (share: Share) => {
    setDeletingShare(share);
    setDeletionReason('');
    setIsDeletionModalOpen(true);
  };

  // Handle share deletion
  const handleDeleteShare = () => {
    if (deletingShare && deletionReason.trim()) {
      setShares(prev => prev.map(share => 
        share.id === deletingShare.id 
          ? { ...share, deletionReason: deletionReason.trim() }
          : share
      ));
      setIsDeletionModalOpen(false);
      setDeletingShare(null);
      setDeletionReason('');
    }
  };

  // Open likes edit modal
  const openLikesEditModal = (share: Share) => {
    setEditingLikes(share);
    setNewLikesCount(share.likes);
    setIsLikesEditModalOpen(true);
  };

  // Save likes count
  const saveLikesCount = () => {
    if (!editingLikes) return;

    setShares(shares.map(share => 
      share.id === editingLikes.id ? { ...share, likes: newLikesCount } : share
    ));

    setIsLikesEditModalOpen(false);
    setEditingLikes(null);
    setNewLikesCount(0);
  };

  // Open image modal
  const openImageModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  // Open photo upload modal
  const openPhotoUploadModal = () => {
    setIsPhotoUploadModalOpen(true);
    setUploadMethod('file');
    setSelectedFile(null);
    setImageUrl('');
    setPreviewUrl('');
  };

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle URL input
  const handleUrlInput = (url: string) => {
    setImageUrl(url);
    setPreviewUrl(url);
  };

  // Handle photo upload
  const handlePhotoUpload = () => {
    if (uploadMethod === 'file' && selectedFile) {
      // Handle file upload (in real app, upload to server)
      console.log('File uploaded:', selectedFile);
      // For demo, we'll just close the modal
      setIsPhotoUploadModalOpen(false);
    } else if (uploadMethod === 'url' && imageUrl.trim()) {
      // Handle URL upload
      console.log('URL uploaded:', imageUrl);
      // For demo, we'll just close the modal
      setIsPhotoUploadModalOpen(false);
    }
  };

  // Get brand color
  const getBrandColor = (brand: string) => {
    const colors = {
      'Nike': 'bg-blue-100 text-blue-800',
      'Adidas': 'bg-black text-white',
      'Puma': 'bg-red-100 text-red-800',
      'Under Armour': 'bg-gray-100 text-gray-800',
      'Reebok': 'bg-white text-black border border-gray-300',
      'New Balance': 'bg-green-100 text-green-800'
    };
    return colors[brand as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paylaşım Yönetimi</h1>
          <p className="text-gray-600">Kullanıcı paylaşımlarını yönetin, onaylayın ve reddedin</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Filtreler</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Brand Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Marka Seçimi
              </label>
              <select
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="">Tüm Markalar</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tarih Aralığı
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Başlangıç"
                />
                <input
                  type="date"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  placeholder="Bitiş"
                />
              </div>
            </div>

            {/* User Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kullanıcı Arama
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Kullanıcı adı ara..."
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(brandFilter || startDateFilter || endDateFilter || userSearch) && (
            <div className="mt-4">
              <button
                onClick={() => {
                  setBrandFilter('');
                  setStartDateFilter('');
                  setEndDateFilter('');
                  setUserSearch('');
                }}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center space-x-1"
              >
                <X size={16} />
                <span>Filtreleri Temizle</span>
              </button>
            </div>
          )}
        </div>

        {/* Shares Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
              <h3 className="text-lg font-medium text-gray-900">
                Paylaşımlar ({filteredShares.length})
              </h3>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-blue-600 shadow-sm'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <button
                onClick={openPhotoUploadModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Upload size={20} />
                <span>Fotoğraf Yükle</span>
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            {viewMode === 'list' ? (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kullanıcı Adı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Görev Adı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İçerik</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Beğeni Sayısı</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShares.map((share) => (
                  <tr key={share.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{share.userName}</div>
                          <div className="text-sm text-gray-500">{share.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={share.taskName}>
                        {share.taskName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => openImageModal(share.content)}
                        className="relative group"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors">
                          <img
                            src={share.content}
                            alt="Paylaşım içeriği"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTI4IDI4TDM2IDM2TDQ0IDI4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yOCA0NEgzNlYzNiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                            }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-gray-900">{share.likes}</span>
                          <button
                            onClick={() => openLikesEditModal(share)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(share.date).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => openDeletionModal(share)}
                          className="text-red-600 hover:text-red-900 flex items-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>Sil</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredShares.map((share) => (
                    <div key={share.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{share.userName}</div>
                            <div className="text-sm text-gray-500">{share.brand}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900 mb-2">{share.taskName}</h4>
                        <button
                          onClick={() => openImageModal(share.content)}
                          className="relative group w-full"
                        >
                          <div className="w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-500 transition-colors">
                            <img
                              src={share.content}
                              alt="Paylaşım içeriği"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTI4IDI4TDM2IDM2TDQ0IDI4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yOCA0NEgzNlYzNiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                              <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </div>
                          </div>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-900">{share.likes}</span>
                          <button
                            onClick={() => openLikesEditModal(share)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(share.date).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                      
                      {share.deletionReason && (
                        <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                          <div className="text-xs text-red-600 font-medium">Silme Nedeni:</div>
                          <div className="text-xs text-red-600">{share.deletionReason}</div>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() => openDeletionModal(share)}
                          className="w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center justify-center space-x-1"
                        >
                          <X className="w-4 h-4" />
                          <span>Sil</span>
                        </button>
                      </div>
                    </div>
                ))}
                </div>
              </div>
            )}
          </div>

          {filteredShares.length === 0 && (
            <div className="text-center py-12">
              <Share2 className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Paylaşım bulunamadı</h3>
              <p className="mt-1 text-sm text-gray-500">
                Seçilen filtrelere uygun paylaşım bulunmuyor.
              </p>
            </div>
          )}
        </div>

        {/* Image Modal */}
        {isImageModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative max-w-4xl max-h-full mx-4">
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X size={32} />
              </button>
              <img
                src={selectedImage}
                alt="Paylaşım içeriği"
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTI4IDI4TDM2IDM2TDQ0IDI4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yOCA0NEgzNlYzNiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                }}
              />
            </div>
          </div>
        )}

        {/* Photo Upload Modal */}
        {isPhotoUploadModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Fotoğraf Yükle</h3>
                <button 
                  onClick={() => setIsPhotoUploadModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Upload Method Selection */}
              <div className="mb-6">
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setUploadMethod('file')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                      uploadMethod === 'file' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <FileImage size={20} />
                    <span>Bilgisayardan Yükle</span>
                  </button>
                  <button
                    onClick={() => setUploadMethod('url')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                      uploadMethod === 'url' 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    <Link size={20} />
                    <span>URL Gir</span>
                  </button>
                </div>

                {/* File Upload Section */}
                {uploadMethod === 'file' && (
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium text-blue-600 hover:text-blue-500">
                            Fotoğraf seçmek için tıklayın
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF dosyaları desteklenir
                        </p>
                      </label>
                    </div>
                    {selectedFile && (
                      <div className="text-sm text-gray-600">
                        <strong>Seçilen dosya:</strong> {selectedFile.name}
                      </div>
                    )}
                  </div>
                )}

                {/* URL Input Section */}
                {uploadMethod === 'url' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fotoğraf URL'si
                      </label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => handleUrlInput(e.target.value)}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                  </div>
                )}

                {/* Preview Section */}
                {previewUrl && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Önizleme</h4>
                    <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                      <img
                        src={previewUrl}
                        alt="Önizleme"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMCAyMEg0NFY0NEgyMFYyMFoiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTI4IDI4TDM2IDM2TDQ0IDI4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yOCA0NEgzNlYzNiIgc3Ryb2tlPSIjOUNBM0FGIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={handlePhotoUpload}
                  disabled={!((uploadMethod === 'file' && selectedFile) || (uploadMethod === 'url' && imageUrl.trim()))}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Upload size={16} />
                  <span>Yükle</span>
                </button>
                <button
                  onClick={() => setIsPhotoUploadModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rejection Modal */}
        {isDeletionModalOpen && deletingShare && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Paylaşımı Sil</h3>
                <button 
                  onClick={() => setIsDeletionModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  <strong>{deletingShare.userName}</strong> kullanıcısının <strong>"{deletingShare.taskName}"</strong> görevi için paylaşımını silmek istiyorsunuz.
                </p>
                
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Silme Nedeni
                </label>
                <textarea
                  value={deletionReason}
                  onChange={(e) => setDeletionReason(e.target.value)}
                  placeholder="Silme nedenini yazın..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleDeleteShare}
                  disabled={!deletionReason.trim()}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  Sil
                </button>
                <button
                  onClick={() => setIsDeletionModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Likes Edit Modal */}
        {isLikesEditModalOpen && editingLikes && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Beğeni Sayısını Düzenle</h3>
                <button 
                  onClick={() => setIsLikesEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  <strong>{editingLikes.userName}</strong> kullanıcısının <strong>"{editingLikes.taskName}"</strong> görevi için beğeni sayısını düzenleyin.
                </p>
                
                <div className="flex items-center space-x-3">
                  <Heart className="w-6 h-6 text-red-500" />
                  <label className="block text-sm font-medium text-gray-700">
                    Beğeni Sayısı
                  </label>
                </div>
                <input
                  type="number"
                  value={newLikesCount}
                  onChange={(e) => setNewLikesCount(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-2 text-gray-900"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={saveLikesCount}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>Kaydet</span>
                </button>
                <button
                  onClick={() => setIsLikesEditModalOpen(false)}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  İptal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
