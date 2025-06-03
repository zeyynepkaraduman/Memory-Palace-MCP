# 📱 News Memory Palace Mobile App - Demo Rehberi

## 🚀 Hızlı Başlangıç

### 1. Uygulamayı Başlat
```bash
cd news-memory-palace-app
npm start
```

### 2. Platform Seçimi
- **i** - iOS Simulator
- **a** - Android Emulator  
- **w** - Web Browser
- **r** - Reload/Restart

## 📱 Ana Özellikler Demo

### 🗞️ Haberler Sekmesi
1. **Kategori Filtreleme**:
   - Genel, Teknoloji, Ekonomi, Spor, Sağlık, Bilim kategorileri
   - Her kategori için özel icon ve tema

2. **Haber Kartları**:
   - Görsel resim ve kategori badge
   - Kaynak, zaman bilgisi
   - "Oku" ve "🧠 Hafıza Sarayı" butonları

3. **Pull-to-Refresh**:
   - Aşağı çekme ile yenile
   - API sağlıklı değilse mock veriler

### 🔍 Arama Sekmesi
1. **Arama Kutusu**:
   - Placeholder: "Haber ara (örn: yapay zeka, ekonomi...)"
   - Gerçek zamanlı arama

2. **Son Aramalar**:
   - Önceden tanımlı etiketler
   - Tıklayarak hızlı arama

3. **Arama Sonuçları**:
   - Filtrelenmiş haber listesi
   - Her haber için hafıza sarayı oluşturma

### 🏰 Saraylar Sekmesi
1. **Saray Kartları**:
   - Tema bazlı gradient renkler
   - Oda sayısı ve hafıza öğesi istatistikleri
   - Oluşturulma tarihi

2. **Boş Durum**:
   - "Henüz Hafıza Sarayı Yok" mesajı
   - Yeni saray oluşturma yönlendirmesi

3. **FAB (Floating Action Button)**:
   - Sağ alt köşede (+) butonu
   - Yeni saray oluşturma

### 👤 Profil Sekmesi
1. **Kullanıcı Bilgileri**:
   - Avatar ve kullanıcı adı
   - "Hafıza Ustası" seviye

2. **İstatistikler**:
   - 4'lü grid layout
   - Saraylar, Odalar, Hafıza Öğeleri, Gün Serisi

3. **Performans Kartı**:
   - Tamamlanan incelemeler
   - Ortalama doğruluk yüzdesi

4. **Ayarlar Menüsü**:
   - 6 farklı seçenek
   - Her biri için alert dialog

## 🎨 UI/UX Özellikleri

### Renk Sistemi
- **Primary**: #3B82F6 (Blue)
- **Secondary**: #8B5CF6 (Purple)
- **Background**: #F9FAFB (Light Gray)
- **Cards**: #FFFFFF (White)

### Tema Gradientleri
- **Technology**: Blue to Purple
- **Business**: Pink to Red
- **Sports**: Blue to Cyan
- **Health**: Green to Teal
- **News**: Pink to Yellow

### Tipografi
- **Headers**: 24px Bold
- **Titles**: 18-20px Bold
- **Body**: 14-16px Regular
- **Captions**: 12px Medium

## 🔧 API Entegrasyonu

### Mock Veri Sistemi
```typescript
// Otomatik fallback mekanizması
const isApiHealthy = await mastraApi.healthCheck();
if (!isApiHealthy) {
  // Mock verileri kullan
}
```

### Mastra Agent Çağrıları
```typescript
// Headlines
await mastraApi.getTopHeadlines({
  country: 'tr',
  category: 'technology'
});

// Search  
await mastraApi.searchNews({
  query: 'yapay zeka',
  language: 'tr'
});

// Memory Palace
await mastraApi.createNewsMemoryPalace({
  articles: selectedArticles,
  palaceTitle: 'AI Sarayı'
});
```

## 🧪 Test Senaryoları

### 1. Haber Okuma İş Akışı
1. Haberler sekmesini aç
2. Kategori seç (Teknoloji)
3. Haber kartına tıkla → "Haber Detayı" alert
4. "Hafıza Sarayı" butonuna tıkla → Oluşturma dialoga

### 2. Arama İş Akışı
1. Arama sekmesini aç
2. "Yapay Zeka" etiketine tıkla
3. Arama sonuçlarını gözlemle
4. Sonuçlardan hafıza sarayı oluştur

### 3. Saray Yönetimi
1. Saraylar sekmesini aç
2. Mevcut sarayları görüntüle
3. Saray kartına tıkla → Detay bilgileri
4. FAB butonuna tıkla → Yeni saray yönlendirmesi

### 4. Profil İnceleme
1. Profil sekmesini aç
2. İstatistikleri incele
3. Performans kartını görüntüle
4. Ayarlar menüsünden seçenekleri test et

## 🐛 Bilinen Sınırlamalar

### Backend Bağımlılıkları
- Mastra servisi çalışmıyor → Mock veriler aktif
- Network hatası → Graceful fallback
- API rate limits → Hata mesajları

### Platform Farkları
- iOS: Native navigation animasyonları
- Android: Material Design uyumluluğu
- Web: Responsive layout optimizasyonları

## 📱 Cihaz Testleri

### iPhone Simülatörü
```bash
npm start
# Açılan QR kod menüsünde 'i' tuşuna bas
```

### Android Emülatörü  
```bash
npm start
# Açılan QR kod menüsünde 'a' tuşuna bas
```

### Web Tarayıcısı
```bash
npm start
# Açılan QR kod menüsünde 'w' tuşuna bas
```

## 🔄 Development Workflow

### Hot Reload
- Dosya değişikliklerinde otomatik reload
- State preservation
- Error overlay

### Debug Menüsü
- Shake gesture (fiziksel cihaz)
- Cmd+D (iOS Simulator)
- Ctrl+M (Android Emulator)

### Network Inspection
- React Native Debugger
- Flipper integration
- Console logging

## 🎯 Demo Sonuçları

### Başarılı Senaryo
✅ Uygulama başlatılır
✅ 4 sekme arası geçiş çalışır
✅ Haber kartları görüntülenir
✅ Arama fonksiyonu çalışır
✅ Hafıza sarayı oluşturma simüle edilir
✅ Profil istatistikleri görüntülenir

### Backend Entegrasyonu
🔄 Mastra API çalışıyorsa gerçek veriler
🔄 API kapalıysa mock veriler
🔄 Hata durumlarında graceful handling

Bu demo rehberi ile News Memory Palace mobil uygulamasının tüm özelliklerini test edebilir ve Mastra API entegrasyonunu görebilirsiniz. 