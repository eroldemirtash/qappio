'use client';

export default function TestSimplePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Test Sayfası Çalışıyor! ✅
        </h1>
        <p className="text-gray-600 mb-8">
          Bu sayfa açılıyorsa, temel routing çalışıyor demektir.
        </p>
        <div className="space-y-4">
          <a 
            href="/"
            className="block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Ana Sayfaya Dön
          </a>
          <a 
            href="/shell-demo"
            className="block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Shell Demo'yu Dene
          </a>
        </div>
      </div>
    </div>
  );
}
