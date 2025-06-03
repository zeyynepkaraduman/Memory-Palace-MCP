import React from 'react';
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

export const ProfileScreen: React.FC = () => {
  const userStats = {
    totalPalaces: 5,
    totalItems: 24,
    studyStreak: 7,
    averageScore: 85,
  };

  const handleSettingPress = (setting: string) => {
    Alert.alert('Ayar', `${setting} ayarı seçildi`);
  };

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çıkış Yap', onPress: () => Alert.alert('Başarılı!', 'Çıkış yapıldı!') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Kullanıcı Adı</Text>
            <Text style={styles.userEmail}>kullanici@example.com</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>İstatistikler</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.totalPalaces}</Text>
              <Text style={styles.statLabel}>Toplam Saray</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.totalItems}</Text>
              <Text style={styles.statLabel}>Öğrenilen Öğe</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.studyStreak}</Text>
              <Text style={styles.statLabel}>Günlük Seri</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{userStats.averageScore}%</Text>
              <Text style={styles.statLabel}>Ortalama Puan</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.settingsContainer}>
          <Text style={styles.sectionTitle}>Ayarlar</Text>
          
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleSettingPress('Bildirimler')}
          >
            <Text style={styles.settingIcon}>🔔</Text>
            <Text style={styles.settingText}>Bildirimler</Text>
            <Text style={styles.settingArrow}>{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleSettingPress('Hesap Bilgileri')}
          >
            <Text style={styles.settingIcon}>👤</Text>
            <Text style={styles.settingText}>Hesap Bilgileri</Text>
            <Text style={styles.settingArrow}>{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleSettingPress('Gizlilik')}
          >
            <Text style={styles.settingIcon}>🔒</Text>
            <Text style={styles.settingText}>Gizlilik</Text>
            <Text style={styles.settingArrow}>{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleSettingPress('Dil')}
          >
            <Text style={styles.settingIcon}>🌐</Text>
            <Text style={styles.settingText}>Dil</Text>
            <Text style={styles.settingArrow}>{'>'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => handleSettingPress('Hakkında')}
          >
            <Text style={styles.settingIcon}>ℹ️</Text>
            <Text style={styles.settingText}>Hakkında</Text>
            <Text style={styles.settingArrow}>{'>'}</Text>
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 24,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  statsContainer: {
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    margin: '1%',
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
    color: '#3B82F6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  settingsContainer: {
    marginBottom: 24,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  settingArrow: {
    fontSize: 16,
    color: '#9CA3AF',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 