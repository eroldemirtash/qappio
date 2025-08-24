# Qappio Admin UI Tasarım Sistemi

## 🎨 Tasarım Felsefesi

Modern + minimal + biraz eğlenceli. Qappio markasının profesyonel ama samimi karakterini yansıtan, kullanıcı dostu bir arayüz.

## 🌈 Renk Paleti

### Ana Renkler
- **Navy**: `#0A0F2A` - Ana arka plan, koyu vurgular
- **Indigo**: `#0E1D5A` - İkincil arka plan, sidebar
- **Teal**: `#0BD3C8` - Birincil aksiyon rengi, vurgular
- **Cyan**: `#59E1D9` - İkincil aksiyon rengi, hover durumları

### Gradient'ler
```css
/* Ana gradient */
background: linear-gradient(135deg, #0A0F2A 0%, #0E1D5A 45%, #0BD3C8 100%);

/* Teal gradient */
background: linear-gradient(to right, #0BD3C8, #59E1D9);

/* Indigo-Teal gradient */
background: linear-gradient(to right, #0E1D5A, #0BD3C8);
```

### Nötr Renkler
- **Koyu**: `#111827` - Ana metin
- **Orta**: `#4B5563` - İkincil metin
- **Açık**: `#E5E7EB` - Sınırlar

## 🎭 Cam/Metalik Efekt

### Glass Card
```css
.q-glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.15);
}
```

### Glass Effect
```css
.q-glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}
```

## 🔧 Bileşen Sistemi

### Button
```tsx
import Button from '@/components/ui/Button';

// Kullanım
<Button variant="primary" size="lg">
  Yeni Ekle
</Button>

// Variant'lar: primary, secondary, ghost, outline
// Size'lar: sm, md, lg
```

### Badge
```tsx
import Badge from '@/components/ui/Badge';

// Kullanım
<Badge variant="success">Aktif</Badge>
<Badge variant="danger">Pasif</Badge>
<Badge variant="info">Bilgi</Badge>
<Badge variant="level">Seviye</Badge>
```

### Input
```tsx
import Input from '@/components/ui/Input';

// Kullanım
<Input 
  label="E-posta" 
  placeholder="ornek@email.com"
  error="Geçerli bir e-posta girin"
/>
```

### Card
```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';

// Kullanım
<Card>
  <CardHeader>
    <h3>Başlık</h3>
  </CardHeader>
  <CardContent>
    <p>İçerik</p>
  </CardContent>
  <CardFooter>
    <Button>Eylem</Button>
  </CardFooter>
</Card>
```

## 📱 Layout Sistemi

### Container
```css
.content-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

### Grid Sistemi
```tsx
// Toolbar
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>Filtre 1</div>
  <div>Filtre 2</div>
  <div className="justify-self-end">
    <Button>Yeni Ekle</Button>
  </div>
</div>

// Modal Grid
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <Input label="Alan 1" />
  <Input label="Alan 2" />
  <div className="md:col-span-2">
    <Input label="Geniş Alan" />
  </div>
</div>
```

## 🎨 Tipografi

### Font Ailesi
```css
font-family: ui-sans-serif, Inter, system-ui, -apple-system, "Segoe UI", Roboto;
```

### Başlık Hiyerarşisi
- **H1**: `text-3xl font-bold` - Sayfa başlıkları
- **H2**: `text-xl font-bold` - Bölüm başlıkları  
- **H3**: `text-lg font-semibold` - Alt bölüm başlıkları
- **Body**: `text-sm` - Normal metin
- **Caption**: `text-xs` - Küçük açıklamalar

## 🔄 Animasyonlar

### Hover Efektleri
```css
/* Scale */
hover:scale-105

/* Shadow */
hover:shadow-lg

/* Background */
hover:bg-white/10
```

### Transition'lar
```css
transition-all duration-200
transition-transform duration-300
```

### Shimmer Efekti
```css
.q-shimmer {
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  background-size: 200px 100%;
  animation: shimmer 2s infinite;
}
```

## 📊 Tablo Tasarımı

### Sticky Header
```css
.table-container thead {
  position: sticky;
  top: 0;
  z-index: 10;
}
```

### Hover Efektleri
```css
tbody tr:hover {
  background: rgba(255, 255, 255, 0.05);
  transition: background-color 0.2s;
}
```

### Responsive Tablo
```css
.table-container {
  overflow-x: auto;
  min-width: 800px;
}
```

## 🎯 Modal Tasarımı

### Boyut ve Grid
```tsx
<div className="max-w-3xl w-[min(92vw,900px)]">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Form alanları */}
  </div>
</div>
```

### Backdrop
```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm">
  {/* Modal içeriği */}
</div>
```

## 📱 Responsive Tasarım

### Breakpoint'ler
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### Mobile-First Yaklaşım
```tsx
// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Spacing
<div className="space-y-4 md:space-y-6 lg:space-y-8">

// Padding
<div className="p-4 md:p-6 lg:p-8">
```

## 🚀 Kullanım Örnekleri

### Sayfa Başlığı
```tsx
<div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
  <div>
    <h1 className="text-3xl font-bold text-[#0A0F2A] flex items-center">
      <Icon className="mr-3 text-[#0BD3C8]" size={32} />
      Sayfa Başlığı
    </h1>
    <p className="text-[#4B5563] mt-2 text-lg">Açıklama metni</p>
  </div>
  <Button variant="primary" size="lg">
    <Plus className="mr-2" />
    Yeni Ekle
  </Button>
</div>
```

### Filtre Bar
```tsx
<Card>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <Input placeholder="Ara..." />
    <Select>
      <option>Kategori</option>
    </Select>
    <Select>
      <option>Durum</option>
    </Select>
  </div>
</Card>
```

### Veri Tablosu
```tsx
<Card>
  <CardHeader>
    <h3 className="text-xl font-bold text-[#0A0F2A]">Veri Listesi</h3>
    <p className="text-[#4B5563] mt-1">Toplam {count} kayıt</p>
  </CardHeader>
  <div className="overflow-x-auto table-container">
    <table className="w-full">
      {/* Tablo içeriği */}
    </table>
  </div>
</Card>
```

## 🎨 CSS Sınıfları

### Utility Sınıfları
```css
/* Qappio Glass */
.q-glass
.q-glass-card

/* Animasyonlar */
.q-shimmer

/* Renkler */
.text-[#0A0F2A]  /* Ana metin */
.text-[#4B5563]  /* İkincil metin */
.text-[#0BD3C8]  /* Teal */
.text-[#59E1D9]  /* Cyan */

/* Gradient'ler */
.bg-gradient-to-r.from-[#0BD3C8].to-[#59E1D9]
.bg-gradient-to-br.from-[#0A0F2A].via-[#0E1D5A].to-[#0BD3C8]
```

## 🔧 Geliştirme Notları

### Yeni Bileşen Ekleme
1. `src/components/ui/` klasörüne component dosyası ekle
2. Qappio tasarım sistemine uygun stil uygula
3. TypeScript interface'lerini tanımla
4. Storybook veya test ekle

### Stil Güncelleme
1. CSS değişkenlerini `globals.css`'de güncelle
2. Component'lerde tutarlılığı koru
3. Responsive tasarımı test et
4. Accessibility standartlarını kontrol et

### Performans
- `backdrop-filter` kullanımını optimize et
- CSS-in-JS yerine CSS sınıflarını tercih et
- Lazy loading ve code splitting uygula

---

Bu tasarım sistemi, Qappio Admin UI'ın tutarlı, modern ve kullanıcı dostu olmasını sağlar. Tüm bileşenler ve sayfalar bu rehbere uygun olarak tasarlanmalıdır.
