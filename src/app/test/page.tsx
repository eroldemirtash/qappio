export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F2A] via-[#0E1D5A] to-[#0BD3C8] flex items-center justify-center">
      <div className="q-glass-card rounded-3xl p-8 backdrop-blur-xl text-center">
        <h1 className="text-3xl font-bold text-[#0A0F2A] mb-4">Test Sayfası</h1>
        <p className="text-[#4B5563] text-lg">Routing çalışıyor! 🎉</p>
        <a 
          href="/" 
          className="inline-block mt-6 bg-gradient-to-r from-[#0BD3C8] to-[#59E1D9] text-[#0A0F2A] px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-200"
        >
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  );
}
