import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  SafeAreaView,
  Image,
  Modal,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('news');
  const [searchText, setSearchText] = useState('');
  const [friendName, setFriendName] = useState('');
  const [friendCode, setFriendCode] = useState('');
  const [kingdomLevel, setKingdomLevel] = useState(1);
  const [kingdomPoints, setKingdomPoints] = useState(120);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);

  // Arkadaşlar listesi
  const [friends, setFriends] = useState([
    { id: 1, name: 'Ahmet Yılmaz', level: 5, lastSeen: '2 saat önce', isOnline: true },
    { id: 2, name: 'Ayşe Kaya', level: 3, lastSeen: '1 gün önce', isOnline: false },
    { id: 3, name: 'Mehmet Demir', level: 7, lastSeen: 'Şimdi', isOnline: true },
  ]);

  // Saray/Krallık bilgileri
  const [palaces, setPalaces] = useState([
    { 
      id: 1, 
      name: 'Teknoloji Sarayı', 
      items: 5, 
      level: 2,
      image: '🏰',
      newsCategory: 'Teknoloji',
      points: 45
    },
    { 
      id: 2, 
      name: 'Spor Kalesi', 
      items: 4, 
      level: 3,
      image: '🏟️',
      newsCategory: 'Spor',
      points: 60
    },
    { 
      id: 3, 
      name: 'Bilim Kulesi', 
      items: 3, 
      level: 1,
      image: '🗼',
      newsCategory: 'Bilim',
      points: 15
    }
  ]);

  const newsData = [
    {
      id: 1,
      title: 'Milli Takım ABD ve Meksika ile Karşılaşacak',
      summary: 'Milliler, 2026 FIFA Dünya Kupası Elemeleri öncesinde hazırlık maçları yapacak. 7 Haziran\'da ABD, 11 Haziran\'da Meksika ile...',
      category: 'Spor'
    },
    {
      id: 2,
      title: 'ChatGPT-5 Geliştirme Süreci Başladı',
      summary: 'OpenAI, yeni nesil yapay zeka modeli için çalışmalara başladığını duyurdu. Gelişmiş reasoning yetenekleri bekleniyor...',
      category: 'Teknoloji'
    },
    {
      id: 3,
      title: 'Apple Vision Pro Türkiye\'ye Geliyor',
      summary: 'Apple\'ın karma gerçeklik gözlüğü Vision Pro, 2024 sonunda Türkiye pazarına sunulacak. Fiyat 100.000 TL civarında...',
      category: 'Teknoloji'
    },
    {
      id: 4,
      title: 'İstanbul\'da Yeni Metro Hattı Açıldı',
      summary: 'Mecidiyeköy-Mahmutbey metro hattı hizmete girdi. Günlük 500 bin yolcu kapasitesiyle trafik yoğunluğu azalacak...',
      category: 'Şehir'
    },
    {
      id: 5,
      title: 'Türkiye Uzay Programı Yeni Hedefler',
      summary: 'Ay misyonu için hazırlıklar sürüyor. 2026\'da Türkiye\'nin ilk astronotu uzaya gönderilecek...',
      category: 'Bilim'
    },
    {
      id: 6,
      title: 'Netflix Türk Yapımlarına Yatırım Artırıyor',
      summary: 'Streaming platformu, 2024\'te Türk içeriklerine 500 milyon dolar yatırım yapacağını açıkladı...',
      category: 'Medya'
    },
    {
      id: 7,
      title: 'Galatasaray Champions League\'de',
      summary: 'Sarı-kırmızılılar, Avrupa kupalarında Türk futbolunu temsil etmeye devam ediyor. Yeni transferler bekleniyor...',
      category: 'Spor'
    },
    {
      id: 8,
      title: 'Elektrikli Araç Satışları Yükselişte',
      summary: 'Türkiye\'de elektrikli araç satışları 2024\'te %150 artış gösterdi. TOGG\'un etkisi büyük...',
      category: 'Otomotiv'
    },
    {
      id: 9,
      title: 'Yapay Zeka ile Eğitim Devrimi',
      summary: 'Üniversiteler AI destekli öğretim sistemlerine geçiyor. Kişiselleştirilmiş eğitim modelleri test ediliyor...',
      category: 'Eğitim'
    },
    {
      id: 10,
      title: '2026 Dünya Kupası Hazırlıkları',
      summary: 'Türkiye Milli Takımı, Connecticut\'ta ABD ile TSİ 22.40\'da karşılaşacak. Ardından Chapel Hill\'de Meksika maçı...',
      category: 'Spor'
    }
  ];

  const handleNewsPress = (news: any) => {
    if (news.id === 1 || news.id === 10) {
      // Milli takım maç tarihleri için detaylı cevap
      Alert.alert(
        '🇹🇷 Milli Takım Maç Programı',
        'Milliler, 2026 FIFA Dünya Kupası Elemeleri öncesinde:\n\n📅 7 Haziran Cumartesi - ABD maçı\n🏟️ Connecticut, East Hartford\n⏰ TSİ 22.40\n\n📅 11 Haziran Çarşamba - Meksika maçı\n🏟️ North Carolina, Chapel Hill\n\n🎯 2026 Dünya Kupası hazırlık maçları'
      );
    } else {
      Alert.alert('📰 Haber Detayı', news.title);
    }
  };

  const handleMemoryPalace = (news: any) => {
    // Kategori bazında saray puanları ve seviye artışı
    const categoryPoints = {
      'Teknoloji': 15,
      'Spor': 20,
      'Bilim': 25,
      'Medya': 10,
      'Şehir': 12,
      'Otomotiv': 18,
      'Eğitim': 22
    };

    const points = categoryPoints[news.category as keyof typeof categoryPoints] || 10;
    setKingdomPoints(prev => prev + points);

    // Seviye artışı kontrolü
    const newLevel = Math.floor((kingdomPoints + points) / 100) + 1;
    if (newLevel > kingdomLevel) {
      setKingdomLevel(newLevel);
      Alert.alert('🎉 Seviye Atladınız!', `Krallığınız ${newLevel}. seviyeye ulaştı!`);
    }

    // İlgili sarayı güncelle
    setPalaces(prev => prev.map(palace => {
      if (palace.newsCategory === news.category) {
        return {
          ...palace,
          items: palace.items + 1,
          points: palace.points + points,
          level: Math.floor((palace.points + points) / 50) + 1
        };
      }
      return palace;
    }));

    Alert.alert(
      '🏰 Saray Genişletildi!',
      `"${news.title}" hafıza sarayınıza eklendi!\n+${points} puan kazandınız!`,
      [
        { text: 'Harika!', style: 'default' }
      ]
    );
  };

  const handleAddFriend = () => {
    if (friendName.trim() && friendCode.trim()) {
      const newFriend = {
        id: friends.length + 1,
        name: friendName.trim(),
        level: Math.floor(Math.random() * 10) + 1,
        lastSeen: 'Şimdi',
        isOnline: true,
        code: friendCode.trim()
      };
      setFriends(prev => [...prev, newFriend]);
      setFriendName('');
      setFriendCode('');
      setShowAddFriendModal(false);
      Alert.alert('✅ Başarılı!', `${newFriend.name} arkadaş listenize eklendi!`);
    } else {
      Alert.alert('❌ Hata', 'Lütfen isim ve arkadaş kodunu girin!');
    }
  };

  const renderNews = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.title}>📰 Güncel Haberler</Text>
      {newsData.map((news) => (
        <View key={news.id} style={styles.card}>
          <TouchableOpacity onPress={() => handleNewsPress(news)}>
            <Text style={styles.newsTitle}>{news.title}</Text>
            <Text style={styles.newsSummary}>{news.summary}</Text>
            <Text style={styles.newsCategory}>{news.category}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleMemoryPalace(news)}
          >
            <Text style={styles.buttonText}>👑 Krallığa Ekle</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );

  const renderSearch = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.title}>🔍 Haber Ara</Text>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.textInput}
          placeholder="Milli takım ne zaman maç yapacak?"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={() => {
            if (searchText.toLowerCase().includes('milli takım') || searchText.toLowerCase().includes('maç')) {
              Alert.alert(
                '🇹🇷 Milli Takım Maç Programı',
                'Milliler, 2026 FIFA Dünya Kupası Elemeleri öncesinde:\n\n📅 7 Haziran Cumartesi - ABD maçı\n🏟️ Connecticut, East Hartford\n⏰ TSİ 22.40\n\n📅 11 Haziran Çarşamba - Meksika maçı\n🏟️ North Carolina, Chapel Hill\n\n🎯 2026 Dünya Kupası hazırlık maçları'
              );
            } else {
              Alert.alert('Arama', `"${searchText}" için arama yapıldı`);
            }
          }}
        >
          <Text style={styles.buttonText}>Ara</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Son Aramalar</Text>
      {['milli takım maçları', 'chatgpt-5', 'apple vision pro', 'togg', 'türkiye uzay', 'netflix'].map((term, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.searchItem}
          onPress={() => setSearchText(term)}
        >
          <Text>{term}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderPalaces = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.title}>🏰 Hafıza Saraylarım</Text>
      
      <View style={styles.kingdomOverview}>
        <Text style={styles.kingdomTitle}>👑 Krallık Durumu</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{kingdomLevel}</Text>
            <Text style={styles.statLabel}>Seviye</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{palaces.reduce((sum, p) => sum + p.items, 0)}</Text>
            <Text style={styles.statLabel}>Toplam Öğe</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{kingdomPoints}</Text>
            <Text style={styles.statLabel}>Puan</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subtitle}>Saraylarım ({palaces.length})</Text>
      {palaces.map((palace, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.palaceCard}
          onPress={() => Alert.alert(
            `${palace.image} ${palace.name}`, 
            `Seviye: ${palace.level}\nÖğe Sayısı: ${palace.items}\nPuan: ${palace.points}\nKategori: ${palace.newsCategory}\n\nBu saray ${palace.newsCategory} haberleri ile büyüyor!`
          )}
        >
          <View style={styles.palaceHeader}>
            <Text style={styles.palaceIcon}>{palace.image}</Text>
            <View style={styles.palaceInfo}>
              <Text style={styles.palaceTitle}>{palace.name}</Text>
              <Text style={styles.palaceCategory}>{palace.newsCategory}</Text>
            </View>
            <View style={styles.palaceLevel}>
              <Text style={styles.levelText}>Lv.{palace.level}</Text>
            </View>
          </View>
          <View style={styles.palaceStats}>
            <View style={styles.palaceStatItem}>
              <Text style={styles.palaceStatValue}>{palace.items}</Text>
              <Text style={styles.palaceStatLabel}>Öğe</Text>
            </View>
            <View style={styles.palaceStatItem}>
              <Text style={styles.palaceStatValue}>{palace.points}</Text>
              <Text style={styles.palaceStatLabel}>Puan</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${Math.min(100, (palace.points % 50) * 2)}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            Sonraki seviyeye: {50 - (palace.points % 50)} puan
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity 
        style={styles.newPalaceButton}
        onPress={() => Alert.alert(
          '🏗️ Yeni Saray', 
          'Yeni saray inşa etmek için daha fazla haber okuyun!\n\nFarklı kategorilerde haberler okuyarak yeni saraylar açabilirsiniz.'
        )}
      >
        <Text style={styles.buttonText}>+ Yeni Saray İnşa Et</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderProfile = () => (
    <ScrollView style={styles.content}>
      <Text style={styles.title}>👤 Profil</Text>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.userName}>Kullanıcı</Text>
      </View>
      <View style={styles.statsGrid}>
        {[
          { label: 'Saraylar', value: '3' },
          { label: 'Öğeler', value: '12' },
          { label: 'Puan', value: '85%' },
          { label: 'Gün', value: '7' }
        ].map((stat, index) => (
          <View key={index} style={styles.statBox}>
            <Text style={styles.statNumber}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => Alert.alert('Çıkış', 'Çıkış yapıldı!')}
      >
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderFriends = () => (
    <ScrollView style={styles.content}>
      <View style={styles.friendsHeader}>
        <Text style={styles.title}>👥 Arkadaşlarım</Text>
        <TouchableOpacity 
          style={styles.addFriendButton}
          onPress={() => setShowAddFriendModal(true)}
        >
          <Text style={styles.buttonText}>+ Arkadaş Ekle</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.kingdomInfo}>
        <Text style={styles.kingdomTitle}>🏛️ Krallığım</Text>
        <View style={styles.kingdomStats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{kingdomLevel}</Text>
            <Text style={styles.statLabel}>Seviye</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{kingdomPoints}</Text>
            <Text style={styles.statLabel}>Puan</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{palaces.length}</Text>
            <Text style={styles.statLabel}>Saray</Text>
          </View>
        </View>
      </View>

      <Text style={styles.subtitle}>Arkadaş Listesi ({friends.length})</Text>
      {friends.map((friend) => (
        <View key={friend.id} style={styles.friendCard}>
          <View style={styles.friendInfo}>
            <View style={styles.friendAvatar}>
              <Text style={styles.avatarText}>👤</Text>
              {friend.isOnline && <View style={styles.onlineIndicator} />}
            </View>
            <View style={styles.friendDetails}>
              <Text style={styles.friendName}>{friend.name}</Text>
              <Text style={styles.friendLevel}>Seviye {friend.level}</Text>
              <Text style={styles.friendLastSeen}>{friend.lastSeen}</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.visitButton}
            onPress={() => Alert.alert('🏰 Saray Ziyareti', `${friend.name}'in sarayını ziyaret ediyorsunuz!`)}
          >
            <Text style={styles.visitButtonText}>Ziyaret Et</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Arkadaş Ekleme Modal */}
      <Modal
        visible={showAddFriendModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAddFriendModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>👥 Yeni Arkadaş Ekle</Text>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Arkadaşın İsmi"
              value={friendName}
              onChangeText={setFriendName}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Arkadaş Kodu (örn: KRL123)"
              value={friendCode}
              onChangeText={setFriendCode}
              autoCapitalize="characters"
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={() => setShowAddFriendModal(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalAddButton}
                onPress={handleAddFriend}
              >
                <Text style={styles.buttonText}>Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );

  const renderContent = () => {
    switch (currentScreen) {
      case 'news': return renderNews();
      case 'search': return renderSearch();
      case 'palaces': return renderPalaces();
      case 'profile': return renderProfile();
      case 'friends': return renderFriends();
      default: return renderNews();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Content */}
      <View style={styles.main}>
        {renderContent()}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.tabBar}>
        {[
          { id: 'news', label: 'Haberler', icon: '📰' },
          { id: 'search', label: 'Ara', icon: '🔍' },
          { id: 'palaces', label: 'Saraylar', icon: '🏰' },
          { id: 'profile', label: 'Profil', icon: '👤' },
          { id: 'friends', label: 'Arkadaşlar', icon: '👥' }
        ].map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, currentScreen === tab.id && styles.activeTab]}
            onPress={() => setCurrentScreen(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text style={[styles.tabLabel, currentScreen === tab.id && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  main: {
    flex: 1,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
    color: '#666',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  newsSummary: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  newsCategory: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  searchBox: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    backgroundColor: 'white',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  searchItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 24,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeTab: {
    // Active styling handled by text color
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
  },
  activeTabLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
  friendsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addFriendButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  kingdomInfo: {
    marginBottom: 20,
  },
  kingdomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  kingdomStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  friendCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  onlineIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#34C759',
    borderWidth: 2,
    borderColor: 'white',
  },
  friendDetails: {
    flex: 1,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  friendLevel: {
    fontSize: 14,
    color: '#666',
  },
  friendLastSeen: {
    fontSize: 12,
    color: '#666',
  },
  visitButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  visitButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  modalAddButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  kingdomOverview: {
    marginBottom: 20,
  },
  palaceCard: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  palaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  palaceIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  palaceInfo: {
    flex: 1,
  },
  palaceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  palaceCategory: {
    fontSize: 12,
    color: '#666',
  },
  palaceLevel: {
    backgroundColor: '#007AFF',
    padding: 5,
    borderRadius: 5,
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
  },
  palaceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  palaceStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  palaceStatValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  palaceStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  progressFill: {
    backgroundColor: '#007AFF',
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  newPalaceButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
