'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Building2, 
  Target, 
  Users, 
  ShoppingCart, 
  Trophy, 
  CreditCard, 
  Settings,
  Share2,
  Menu,
  X
} from 'lucide-react';

// ===================== TYPES =====================
export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export interface MissionCard {
  id: number;
  title: string;
  brand: string;
  category: string;
  budget: number;
  participants: number;
  status: string;
  isWeekly?: boolean;
  sponsored?: boolean;
}

export interface BrandRow {
  id: number;
  logo: string;
  email: string;
  balance: number;
  active: boolean;
  category: string;
}

// ===================== DEFAULT SIDEBAR =====================
// defaultSidebar değişkenini dosyanın en üstüne taşıdık ve virgülleri düzelttik
export const defaultSidebar: SidebarItem[] = [
  { label: 'Ana Sayfa', href: '/', icon: Home },
  { label: 'Marka Yönetimi', href: '/brands', icon: Building2 },
  { label: 'Görev Yönetimi', href: '/missions', icon: Target },
  { label: 'Kullanıcı Yönetimi', href: '/users', icon: Users },
  { label: 'Market Yönetimi', href: '/market', icon: ShoppingCart },
  { label: 'Level Ayarları', href: '/levels', icon: Trophy },
  { label: 'Paylaşım Yönetimi', href: '/shares', icon: Share2 },
  { label: 'Finans & Lisanslar', href: '/finance', icon: CreditCard },
  { label: 'Ayarlar', href: '/settings', icon: Settings }
];

// ===================== QAPPIO STYLES =====================
export const qappioStyles = `
/* Buttons */
.qbtn{height:40px;padding:0 14px;border-radius:12px;font-weight:700;border:1px solid transparent;background:#F3F4F6}
.qbtn--ghost{background:#F3F4F6;border-color:#E5E7EB}
.qbtn--primary{color:#fff;background:linear-gradient(90deg,#0BD3C8,#0E1D5A);box-shadow:0 10px 30px rgba(11,211,200,.25)}
.qbtn--soft{background:#EEF2FF;border-color:#E0E7FF}

/* Cards Grid */
.qgrid{display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(320px,1fr))}
.qcard{background:var(--q-surface);border:1px solid var(--q-line);border-radius:var(--q-radius);box-shadow:var(--q-shadow);padding:14px}
.qcard__head{display:flex;gap:8px;flex-wrap:wrap}
.qcard__title{margin:6px 0 6px;font-size:16px}
.qcard__meta{margin:2px 0;color:var(--q-sub)}
.qcard__foot{display:flex;justify-content:space-between;align-items:center;margin-top:8px}

/* Badges */
.qbadge{display:inline-flex;align-items:center;padding:4px 10px;border-radius:999px;font-weight:800;font-size:12px}
.qbadge--ok{background:#D1FAE5;color:#065F46}
.qbadge--off{background:#FEE2E2;color:#7F1D1D}
.qbadge--week{background:#FFE8B3;color:#8B5E00}
.qbadge--sponsor{background:#F3D1FF;color:#6B21A8}

/* Links */
.qlink{display:inline-flex;align-items:center;padding:6px 8px;border-radius:8px;color:#0E1D5A;background:#EEF2FF;text-decoration:none;border:1px solid #E0E7FF}
.qlink:hover{filter:brightness(.98)}
.qlink.qdanger{background:#FEF2F2;border-color:#FEE2E2;color:#991B1B}

/* Table */
.qtablewrap{overflow-x:auto}
.qtable{width:100%;min-width:900px;table-layout:fixed;border-collapse:separate;border-spacing:0}
.qtable th,.qtable td{padding:12px 10px;vertical-align:middle}
.qtable th{position:sticky;top:0;background:#fff;z-index:1;color:#4B5563;font-weight:700}
.t-right{text-align:right}.nowrap{white-space:nowrap}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.qlogo{width:40px;height:40px;border-radius:10px;object-fit:cover;border:1px solid #e5e7eb}
`;

// ===================== SHELL COMPONENT =====================
interface QappioAdminShellProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function QappioAdminShell({ title, description, children }: QappioAdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-[#0A0F2A] to-[#0E1D5A] transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-center h-16 px-6 border-b border-white/20">
          <div className="bg-gradient-to-r from-[#0BD3C8] to-[#59E1D9] p-2 rounded-lg">
            <span className="text-lg font-bold text-[#0A0F2A]">Qappio</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {defaultSidebar.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-[#0BD3C8] to-[#59E1D9] text-[#0A0F2A]' 
                        : 'text-white hover:bg-white/10'
                      }
                    `}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon size={20} className="mr-3" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="mt-1 text-sm text-gray-600">{description}</p>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

// ===================== MISSION BOARD COMPONENT =====================
export function MissionsBoard({ cards }: { cards: MissionCard[] }) {
  return (
    <div className="qgrid">
      {cards.map((card) => (
        <div key={card.id} className="qcard">
          <div className="qcard__head">
            {card.isWeekly && <span className="qbadge qbadge--week">Haftanın Görevi</span>}
            {card.sponsored && <span className="qbadge qbadge--sponsor">Sponsorlu</span>}
            <span className={`qbadge ${card.status === 'Aktif' ? 'qbadge--ok' : 'qbadge--off'}`}>
              {card.status}
            </span>
          </div>
          <h3 className="qcard__title">{card.title}</h3>
          <p className="qcard__meta">{card.brand} • {card.category}</p>
          <div className="qcard__foot">
            <span>₺{card.budget.toLocaleString()}</span>
            <span>{card.participants} katılımcı</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ===================== BRANDS TABLE COMPONENT =====================
export function BrandsTable({ rows }: { rows: BrandRow[] }) {
  return (
    <div className="qtablewrap">
      <table className="qtable">
        <thead>
          <tr>
            <th>Logo</th>
            <th>E-posta</th>
            <th>Bakiye</th>
            <th>Durum</th>
            <th>Kategori</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <img src={row.logo} alt="Logo" className="qlogo" />
              </td>
              <td className="truncate">{row.email}</td>
              <td className="t-right">₺{row.balance.toLocaleString()}</td>
              <td>
                <span className={`qbadge ${row.active ? 'qbadge--ok' : 'qbadge--off'}`}>
                  {row.active ? 'Aktif' : 'Pasif'}
                </span>
              </td>
              <td>{row.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ===================== BASIT SMOKE TESTLER =====================
// Testler mevcut değildi; derleme hatalarını ve kritik varsayımları kontrol eden
// minimal testler ekledik. Testler otomatik fırlatmaz; konsola raporlar.
export function runShellSmokeTests() {
  const results: { name: string; ok: boolean; detail?: string }[] = [];
  
  try {
    results.push({ 
      name: "defaultSidebar array", 
      ok: Array.isArray(defaultSidebar) && defaultSidebar.length >= 1 
    });
    
    results.push({ 
      name: "defaultSidebar last item is 'Ayarlar'", 
      ok: defaultSidebar.at(-1)?.label === "Ayarlar" 
    });
    
    results.push({ 
      name: "qappioStyles not empty", 
      ok: typeof qappioStyles === "string" && qappioStyles.length > 100 
    });
    
    console.table(results);
  } catch (e: unknown) {
    results.push({ 
      name: "exception", 
      ok: false, 
      detail: String((e as Error)?.message || e) 
    });
    
    // Konsolda hatayı göster
    console.error("runShellSmokeTests error:", e);
  }
  
  return results;
}

// ===================== DEMO (Manuel doğrulama için) =====================
// Bu demo bileşenleri sayfada deneyip görsel olarak doğrulayabilirsiniz.
export function ShellDemo() {
  const demoCards: MissionCard[] = [
    { 
      id: 1, 
      title: "Şehir Silueti Fotoğrafı", 
      brand: "Nike", 
      category: "Fotoğraf", 
      budget: 15000, 
      participants: 86, 
      status: "Aktif", 
      isWeekly: true 
    },
    { 
      id: 2, 
      title: "Kampanya Afişi", 
      brand: "Adidas", 
      category: "Poster", 
      budget: 9000, 
      participants: 42, 
      status: "Beklemede", 
      sponsored: true 
    },
  ];
  
  const demoBrands: BrandRow[] = [
    { 
      id: 1, 
      logo: "https://i.pravatar.cc/80?img=12", 
      email: "brand@example.com", 
      balance: 123456, 
      active: true, 
      category: "Giyim" 
    },
    { 
      id: 2, 
      logo: "https://i.pravatar.cc/80?img=24", 
      email: "long-brand-name@example-very-long-domain.com", 
      balance: 98765, 
      active: false, 
      category: "Teknoloji" 
    },
  ];

  return (
    <QappioAdminShell title="Demo – Görev ve Markalar" description="Görsel doğrulama için örnek veri">
      <div style={{ display: "grid", gap: 24 }}>
        <section>
          <h2 style={{ margin: 0, fontSize: 18 }}>Görevler</h2>
          <MissionsBoard cards={demoCards} />
        </section>
        <section>
          <h2 style={{ margin: 0, fontSize: 18 }}>Markalar</h2>
          <BrandsTable rows={demoBrands} />
        </section>
      </div>
    </QappioAdminShell>
  );
}
