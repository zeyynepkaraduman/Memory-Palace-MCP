import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MemoryPalace } from '../types';

const { width } = Dimensions.get('window');

interface PalaceCardProps {
  palace: MemoryPalace;
  onPress: () => void;
}

export const PalaceCard: React.FC<PalaceCardProps> = ({ palace, onPress }) => {
  const getThemeGradient = (theme: string): [string, string] => {
    const gradients: Record<string, [string, string]> = {
      technology: ['#667eea', '#764ba2'],
      business: ['#f093fb', '#f5576c'],
      sports: ['#4facfe', '#00f2fe'],
      health: ['#43e97b', '#38f9d7'],
      news: ['#fa709a', '#fee140'],
      general: ['#a8edea', '#fed6e3'],
    };
    return gradients[theme] || gradients.general;
  };

  const getThemeIcon = (theme: string) => {
    const icons = {
      technology: '🤖',
      business: '💼',
      sports: '⚽',
      health: '🏥',
      news: '📰',
      general: '🏛️',
    };
    return icons[theme as keyof typeof icons] || '🏛️';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const totalItems = palace.rooms.reduce((total, room) => total + room.memoryItems.length, 0);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={getThemeGradient(palace.theme)}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.themeIcon}>{getThemeIcon(palace.theme)}</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.statsText}>
              {palace.rooms.length} Oda • {totalItems} Öğe
            </Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {palace.title}
          </Text>
          
          {palace.description && (
            <Text style={styles.description} numberOfLines={2}>
              {palace.description}
            </Text>
          )}

          <View style={styles.footer}>
            <Text style={styles.category}>
              {palace.category.charAt(0).toUpperCase() + palace.category.slice(1)}
            </Text>
            <Text style={styles.date}>
              {formatDate(palace.createdAt)}
            </Text>
          </View>
        </View>

        <View style={styles.roomPreview}>
          {palace.rooms.slice(0, 3).map((room, index) => (
            <View key={room.id} style={[styles.roomDot, { left: index * 12 }]}>
              <View style={styles.roomIndicator} />
            </View>
          ))}
          {palace.rooms.length > 3 && (
            <Text style={styles.moreRooms}>+{palace.rooms.length - 3}</Text>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    minHeight: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeIcon: {
    fontSize: 24,
  },
  stats: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 26,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  category: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  date: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  roomPreview: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roomDot: {
    position: 'absolute',
  },
  roomIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  moreRooms: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 40,
  },
}); 