import Link from 'next/link';

export default function TestLinkPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F2A] via-[#0E1D5A] to-[#0BD3C8] flex items-center justify-center">
      <div className="q-glass-card rounded-3xl p-8 backdrop-blur-xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-[#0A0F2A] mb-6">Link Test Sayfası</h1>
        <p className="text-[#4B5563] text-lg mb-8">Bu sayfa açıldıysa routing çalışıyor! 🎉</p>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="block w-full bg-gradient-to-r from-[#0BD3C8] to-[#59E1D9] text-[#0A0F2A] px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200"
          >
            Ana Sayfaya Dön
          </Link>
          
          <Link 
            href="/brands"
            className="block w-full bg-white/20 text-[#0A0F2A] px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
          >
            Marka Yönetimi
          </Link>
          
          <Link 
            href="/missions"
            className="block w-full bg-white/20 text-[#0A0F2A] px-6 py-3 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
          >
            Görev Yönetimi
          </Link>
        </div>
        
        <div className="mt-8 p-4 bg-white/10 rounded-2xl">
          <p className="text-sm text-[#0A0F2A] font-medium">Test Sonucu:</p>
          <p className="text-xs text-[#4B5563] mt-1">
            Eğer bu sayfayı görebiliyorsanız, Next.js routing çalışıyor demektir.
          </p>
        </div>
      </div>
    </div>
  );
}
