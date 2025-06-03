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

export const PalacesScreen: React.FC = () => {
  const [palaces] = useState([
    {
      id: '1',
      title: 'Teknoloji Haberleri Sarayı',
      category: 'Teknoloji',
      itemCount: 5,
      createdAt: new Date().toISOString(),
      color: '#3B82F6',
    },
    {
      id: '2',
      title: 'Ekonomi Haberleri Sarayı',
      category: 'Ekonomi',
      itemCount: 3,
      createdAt: new Date().toISOString(),
      color: '#10B981',
    },
    {
      id: '3',
      title: 'Spor Haberleri Sarayı',
      category: 'Spor',
      itemCount: 7,
      createdAt: new Date().toISOString(),
      color: '#F59E0B',
    },
  ]);

  const handlePalacePress = (palace: any) => {
    Alert.alert(
      'Saray Detayı',
      `"${palace.title}" sarayında ${palace.itemCount} öğe var.`
    );
  };

  const handleCreatePalace = () => {
    Alert.alert(
      'Yeni Saray',
      'Yeni bir hafıza sarayı oluşturmak istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Oluştur', onPress: () => Alert.alert('Başarılı!', 'Yeni saray oluşturuldu!') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏰 Hafıza Saraylarım</Text>
        <Text style={styles.headerSubtitle}>
          {palaces.length} saray
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{palaces.length}</Text>
            <Text style={styles.statLabel}>Toplam Saray</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {palaces.reduce((total, palace) => total + palace.itemCount, 0)}
            </Text>
            <Text style={styles.statLabel}>Toplam Öğe</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {Math.round(palaces.reduce((total, palace) => total + palace.itemCount, 0) / palaces.length)}
            </Text>
            <Text style={styles.statLabel}>Ortalama</Text>
          </View>
        </View>

        {/* Palace List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saraylarım</Text>
          {palaces.map((palace) => (
            <TouchableOpacity
              key={palace.id}
              style={styles.palaceCard}
              onPress={() => handlePalacePress(palace)}
            >
              <View style={styles.palaceHeader}>
                <View style={[styles.palaceColor, { backgroundColor: palace.color }]} />
                <View style={styles.palaceInfo}>
                  <Text style={styles.palaceTitle}>{palace.title}</Text>
                  <Text style={styles.palaceCategory}>{palace.category}</Text>
                </View>
              </View>
              
              <View style={styles.palaceStats}>
                <View style={styles.palaceStat}>
                  <Text style={styles.palaceStatNumber}>{palace.itemCount}</Text>
                  <Text style={styles.palaceStatLabel}>Öğe</Text>
                </View>
                <View style={styles.palaceStat}>
                  <Text style={styles.palaceStatDate}>
                    {new Date(palace.createdAt).toLocaleDateString('tr-TR')}
                  </Text>
                  <Text style={styles.palaceStatLabel}>Oluşturulma</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Create New Palace Button */}
        <TouchableOpacity style={styles.createButton} onPress={handleCreatePalace}>
          <Text style={styles.createButtonText}>+ Yeni Saray Oluştur</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  palaceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  palaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  palaceColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  palaceInfo: {
    flex: 1,
  },
  palaceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  palaceCategory: {
    fontSize: 14,
    color: '#6B7280',
  },
  palaceStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  palaceStat: {
    alignItems: 'center',
  },
  palaceStatNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  palaceStatDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3B82F6',
  },
  palaceStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  createButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 12,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 