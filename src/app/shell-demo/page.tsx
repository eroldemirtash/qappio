'use client';

import { useEffect } from 'react';
import { ShellDemo, runShellSmokeTests } from '@/components/ui/Shell';

export default function ShellDemoPage() {
  useEffect(() => {
    // Sayfa yüklendiğinde smoke testleri çalıştır
    console.log('🔍 Shell Smoke Tests başlatılıyor...');
    const results = runShellSmokeTests();
    
    // Test sonuçlarını konsola yazdır
    console.log('📊 Shell Smoke Test Sonuçları:', results);
    
    // defaultSidebar'ın son elemanını kontrol et
    console.log('✅ defaultSidebar son eleman:', results.find(r => r.name.includes('Ayarlar')));
  }, []);

  return <ShellDemo />;
}
