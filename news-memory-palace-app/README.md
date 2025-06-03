# 📱 News Memory Palace Mobile App

Mastra News API entegrasyonu ile haberleri hafıza sarayları haline dönüştüren React Native mobil uygulaması.

## 🌟 Özellikler

### 📰 Haber Özellikleri
- **Güncel Haberler**: Türkiye ve dünya haberlerini anlık takip
- **Kategori Filtreleme**: Teknoloji, ekonomi, spor, sağlık kategorileri
- **Gelişmiş Arama**: Anahtar kelime bazlı detaylı haber araması
- **Görsel Haber Kartları**: Modern ve kullanıcı dostu arayüz

### 🧠 Hafıza Sarayı Özellikleri
- **Otomatik Saray Oluşturma**: Haberlerden hafıza sarayları oluşturma
- **Görsel İpuçları**: Her haber için otomatik görsel metafor önerisi
- **Tema Sistemi**: Kategori bazlı renk ve tema düzenlemesi
- **İstatistik Takibi**: Öğrenme performansı analizi

### 📱 Mobil Özellikler
- **4 Ana Sekme**: Haberler, Arama, Saraylar, Profil
- **Pull-to-Refresh**: Anlık veri güncellemesi
- **Offline Desteği**: Mock verilerle çalışma
- **Duyarlı Tasarım**: Tüm ekran boyutlarına uygun

## 🏗️ Teknik Mimari

```
src/
├── components/         # Yeniden kullanılabilir bileşenler
│   ├── NewsCard.tsx   # Haber kartı bileşeni
│   └── PalaceCard.tsx # Hafıza sarayı kartı
├── screens/           # Ana ekranlar
│   ├── NewsScreen.tsx     # Güncel haberler
│   ├── SearchScreen.tsx   # Haber arama
│   ├── PalacesScreen.tsx  # Hafıza sarayları
│   └── ProfileScreen.tsx  # Kullanıcı profili
├── services/          # API entegrasyonu
│   └── api.ts        # Mastra API servisi
└── types/            # TypeScript type tanımları
    └── index.ts
```

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- Expo CLI
- iOS Simulator veya Android Emulator
- Mastra News API backend servisi

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Expo Development Build
```bash
# iOS için
npm run ios

# Android için
npm run android

# Web için
npm run web
```

### 3. Backend Bağlantısı
```typescript
// src/services/api.ts dosyasında API URL'ini güncelleyin
const MASTRA_API_BASE_URL = 'YOUR_BACKEND_URL';
```

## 📱 Ekran Görüntüleri

### Ana Ekranlar
- **📰 Haberler**: Kategori tabları ile filtrelenmiş güncel haberler
- **🔍 Arama**: Gelişmiş arama ve son aramalar
- **🏰 Saraylar**: Oluşturulan hafıza sarayları listesi
- **👤 Profil**: İstatistikler ve kullanıcı ayarları

### Özellik Detayları
- **Haber Kartları**: Görsel, kaynak, zaman bilgisi, hafıza sarayı oluşturma butonu
- **Saray Kartları**: Tema gradientleri, oda sayısı, görsel istatistikler
- **Arama Arayüzü**: Anlık arama, öneriler, sonuç filtreleme

## 🔧 Yapılandırma

### API Bağlantısı
```typescript
// Mock veriler otomatik aktif
// Gerçek API için backend servisi çalıştırın
const isApiHealthy = await mastraApi.healthCheck();
```

### Tema Özelleştirme
```typescript
// PalaceCard.tsx içinde tema renklerini değiştirin
const gradients = {
  technology: ['#667eea', '#764ba2'],
  business: ['#f093fb', '#f5576c'],
  // ... diğer temalar
};
```

## 📊 API Entegrasyonu

### Mastra Agent'ları
```typescript
// News Headlines Agent
const headlines = await mastraApi.getTopHeadlines({
  country: 'tr',
  category: 'technology',
  pageSize: 20
});

// News Search Agent
const searchResults = await mastraApi.searchNews({
  query: 'yapay zeka',
  language: 'tr',
  sortBy: 'relevancy'
});

// News Memory Palace Agent
const palace = await mastraApi.createNewsMemoryPalace({
  articles: selectedArticles,
  palaceTitle: 'Teknoloji Haberleri Sarayı',
  category: 'technology'
});
```

### Hata Yönetimi
- **Network Errors**: Otomatik mock veri kullanımı
- **API Errors**: Kullanıcı dostu hata mesajları
- **Loading States**: Progress göstergeleri

## 🎨 UI/UX Özellikleri

### Design System
- **Renkler**: Tailwind CSS renk paleti
- **Typography**: Hierarchy ile okunabilirlik
- **Shadows**: Depth ve elevation
- **Gradients**: Kategori bazlı tema sistemi

### Animasyonlar
- **Pull-to-refresh**: Native animasyonlar
- **Touch feedback**: ActiveOpacity kullanımı
- **Loading states**: Activity indicators

### Accessibility
- **Screen readers**: Semantic HTML
- **Touch targets**: Minimum 44pt
- **Color contrast**: WCAG uyumlu

## 🔄 State Management

### Local State
- React Hooks (useState, useEffect)
- Component bazlı state yönetimi

### Async Operations
- Promise bazlı API çağrıları
- Error boundaries
- Loading states

## 📈 Performans

### Optimizasyonlar
- **FlatList**: Büyük listeler için virtualization
- **Image caching**: Expo image loading
- **Memory management**: Component cleanup

### Bundle Size
- Tree shaking ile minimal bundle
- Conditional imports
- Platform specific code

## 🧪 Testing

```bash
# Type checking
npx tsc --noEmit

# Lint checking
npx expo lint

# Manual testing
# Expo Go app ile test
```

## 📱 Platform Desteği

- **iOS**: 12.0+
- **Android**: API 21+ (Android 5.0)
- **Web**: Modern browsers

## 🚀 Deployment

### Expo Application Services (EAS)
```bash
# Build için
eas build --platform all

# Submit için
eas submit --platform all
```

### Environment Variables
```env
EXPO_PUBLIC_API_URL=your_backend_url
EXPO_PUBLIC_NEWS_API_KEY=your_news_api_key
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

MIT License - detaylar için LICENSE dosyasına bakın.

## 🙏 Teşekkürler

- **Mastra**: AI agent framework
- **News API**: Haber verisi sağlayıcısı
- **Expo**: React Native development platform
- **React Navigation**: Navigation library

---

📧 **İletişim**: Sorularınız için issue açabilirsiniz
🌟 **Star**: Projeyi beğendiyseniz star vermeyi unutmayın! 