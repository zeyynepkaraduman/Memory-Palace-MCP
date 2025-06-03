import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NewsArticle } from '../types';

const { width } = Dimensions.get('window');

interface NewsCardProps {
  article: NewsArticle;
  onPress: () => void;
  onCreatePalace?: () => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onPress,
  onCreatePalace,
}) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Az önce';
    if (diffInHours < 24) return `${diffInHours} saat önce`;
    return `${Math.floor(diffInHours / 24)} gün önce`;
  };

  const getCategoryIcon = () => {
    const title = article.title.toLowerCase();
    if (title.includes('teknoloji') || title.includes('ai') || title.includes('yapay zeka')) return '🤖';
    if (title.includes('ekonomi') || title.includes('dolar') || title.includes('borsa')) return '💰';
    if (title.includes('spor') || title.includes('futbol')) return '⚽';
    if (title.includes('sağlık') || title.includes('hastane')) return '🏥';
    if (title.includes('politik') || title.includes('seçim')) return '🏛️';
    return '📰';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: article.urlToImage || 'https://via.placeholder.com/400x200/4A5568/FFFFFF?text=Haber'
            }}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageOverlay}
          />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryIcon}>{getCategoryIcon()}</Text>
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.source}>{article.source.name}</Text>
            <Text style={styles.time}>{formatTime(article.publishedAt)}</Text>
          </View>

          <Text style={styles.title} numberOfLines={3}>
            {article.title}
          </Text>

          {article.description && (
            <Text style={styles.description} numberOfLines={2}>
              {article.description}
            </Text>
          )}

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.readButton}
              onPress={onPress}
            >
              <Text style={styles.readButtonText}>Oku</Text>
            </TouchableOpacity>

            {onCreatePalace && (
              <TouchableOpacity
                style={styles.palaceButton}
                onPress={onCreatePalace}
              >
                <Text style={styles.palaceButtonText}>🧠 Hafıza Sarayı</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  readButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  readButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  palaceButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
  },
  palaceButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 