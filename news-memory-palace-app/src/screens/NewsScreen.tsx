import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const NewsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('general');

  const mockNews = [
    {
      id: '1',
      title: 'React Native ve Expo ile Mobil Uygulama Geliştirme',
      description: 'Modern mobil uygulama geliştirme teknikleri...',
      source: 'Tech News',
      publishedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Hafıza Sarayı Tekniği ile Öğrenme',
      description: 'Antik hafıza teknikleri modern eğitimde...',
      source: 'Eğitim Haber',
      publishedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Yapay Zeka ve Gelecek',
      description: 'AI teknolojilerinin günlük hayata etkileri...',
      source: 'Teknoloji',
      publishedAt: new Date().toISOString(),
    },
  ];

  const categories = [
    { key: 'general', label: 'Genel', icon: '📰' },
    { key: 'technology', label: 'Teknoloji', icon: '🤖' },
    { key: 'business', label: 'Ekonomi', icon: '💼' },
    { key: 'sports', label: 'Spor', icon: '⚽' },
  ];

  const handleNewsPress = (news: any) => {
    Alert.alert('Haber Detayı', news.title);
  };

  const handleCreatePalace = (news: any) => {
    Alert.alert(
      'Hafıza Sarayı',
      `"${news.title}" için hafıza sarayı oluşturulsun mu?`,
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Oluştur', onPress: () => Alert.alert('Başarılı!', 'Hafıza sarayı oluşturuldu!') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📰 Güncel Haberler</Text>
        <Text style={styles.headerSubtitle}>
          {mockNews.length} haber • {new Date().toLocaleDateString('tr-TR')}
        </Text>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryTab,
              selectedCategory === category.key && styles.selectedCategoryTab,
            ]}
            onPress={() => setSelectedCategory(category.key)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.categoryLabel,
                selectedCategory === category.key && styles.selectedCategoryLabel,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* News List */}
      <ScrollView style={styles.newsContainer}>
        {mockNews.map((news) => (
          <View key={news.id} style={styles.newsCard}>
            <TouchableOpacity
              style={styles.newsContent}
              onPress={() => handleNewsPress(news)}
            >
              <Text style={styles.newsTitle}>{news.title}</Text>
              <Text style={styles.newsDescription}>{news.description}</Text>
              <View style={styles.newsFooter}>
                <Text style={styles.newsSource}>{news.source}</Text>
                <Text style={styles.newsDate}>
                  {new Date(news.publishedAt).toLocaleDateString('tr-TR')}
                </Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.palaceButton}
              onPress={() => handleCreatePalace(news)}
            >
              <Text style={styles.palaceButtonText}>🏰 Saray Oluştur</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  categoryTabs: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  selectedCategoryTab: {
    backgroundColor: '#3B82F6',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  selectedCategoryLabel: {
    color: '#FFFFFF',
  },
  newsContainer: {
    flex: 1,
    padding: 16,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  newsContent: {
    marginBottom: 12,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  newsDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3B82F6',
  },
  newsDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  palaceButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  palaceButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
}); 