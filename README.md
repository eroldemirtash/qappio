# Qappio Admin Dashboard

Modern ve kullanıcı dostu bir web admin dashboard projesi. Next.js 14, TypeScript ve Tailwind CSS kullanılarak geliştirilmiştir.

## 🚀 Özellikler

- **Modern Tasarım**: Tailwind CSS ile sade ve şık arayüz
- **Responsive Layout**: Mobil ve masaüstü uyumlu tasarım
- **TypeScript**: Tip güvenliği ve geliştirici deneyimi
- **Component-Based**: Yeniden kullanılabilir bileşenler
- **Icon Integration**: Lucide React ikonları
- **Navigation**: Kolay kullanımlı sidebar ve header

## 🏗️ Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Ana sayfa
│   ├── brands/            # Marka yönetimi
│   ├── missions/          # Görev yönetimi
│   ├── users/             # Kullanıcı yönetimi
│   ├── market/            # Market yönetimi
│   ├── levels/            # Level ayarları
│   ├── finance/           # Finans & lisanslar
│   └── settings/          # Genel ayarlar
├── components/             # React bileşenleri
│   └── layout/            # Layout bileşenleri
│       ├── Sidebar.tsx    # Sol menü
│       ├── Header.tsx     # Üst bar
│       └── DashboardLayout.tsx # Ana layout
└── globals.css            # Tailwind CSS stilleri
```

## 📱 Sayfalar

### 1. Ana Sayfa
- Platform genel durumu
- İstatistik kartları
- Son aktiviteler
- Hızlı işlemler

### 2. Marka Yönetimi
- Marka listesi
- Arama ve filtreleme
- Marka ekleme/düzenleme
- Durum yönetimi

### 3. Görev Yönetimi
- Görev listesi
- Kategori bazlı filtreleme
- Görev durumu takibi
- Katılımcı istatistikleri

### 4. Kullanıcı Yönetimi
- Kullanıcı listesi
- Seviye bazlı filtreleme
- Kullanıcı detayları
- Performans metrikleri

### 5. Market Yönetimi
- Ürün listesi
- Satış istatistikleri
- Stok yönetimi
- Gelir takibi

### 6. Level Ayarları
- Seviye sistemi yönetimi
- Puan aralıkları
- Renk yapılandırması
- Ayrıcalık tanımları

### 7. Finans & Lisanslar
- Gelir istatistikleri
- Lisans yönetimi
- İşlem geçmişi
- Raporlama

### 8. Ayarlar
- Platform ayarları
- Kullanıcı yapılandırması
- Güvenlik ayarları
- Bildirim yönetimi

## 🛠️ Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Build Tool**: Vite (Next.js ile)

## 🚀 Kurulum

1. **Projeyi klonlayın**
   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

4. **Tarayıcıda açın**
   ```
   http://localhost:3000
   ```

## 📦 Kullanılabilir Komutlar

- `npm run dev` - Geliştirme sunucusunu başlatır
- `npm run build` - Production build oluşturur
- `npm run start` - Production sunucusunu başlatır
- `npm run lint` - ESLint ile kod kontrolü yapar

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Danger**: Red (#EF4444)
- **Info**: Purple (#8B5CF6)

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Sizes**: Tailwind CSS scale

### Spacing
- **Grid**: 6px base unit
- **Components**: 24px standard spacing
- **Sections**: 48px section spacing

## 📱 Responsive Tasarım

- **Mobile First**: Mobil öncelikli tasarım
- **Breakpoints**: Tailwind CSS standart breakpoint'leri
- **Sidebar**: Mobilde overlay, masaüstünde fixed
- **Tables**: Mobilde scroll, masaüstünde full width

## 🔧 Özelleştirme

### Tema Değişiklikleri
`tailwind.config.js` dosyasında renk ve font ayarlarını değiştirebilirsiniz.

### Bileşen Ekleme
`src/components/` dizininde yeni bileşenler oluşturabilirsiniz.

### Sayfa Ekleme
`src/app/` dizininde yeni sayfa dizinleri oluşturabilirsiniz.

## 📈 Performans

- **Code Splitting**: Otomatik sayfa bazlı kod bölme
- **Image Optimization**: Next.js Image bileşeni
- **Bundle Analysis**: Build sonrası analiz
- **Lazy Loading**: Dinamik import desteği

## 🔒 Güvenlik

- **Type Safety**: TypeScript ile tip güvenliği
- **Input Validation**: Form validasyonu
- **XSS Protection**: React'in built-in koruması
- **CSRF Protection**: Next.js güvenlik özellikleri

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Proje**: Qappio Admin Dashboard
- **Geliştirici**: [Your Name]
- **E-posta**: [your.email@example.com]

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Vercel](https://vercel.com/) - Deployment platform
