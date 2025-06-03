import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const mockSearchResults = [
    {
      id: '1',
      title: 'Arama sonucu 1',
      description: 'Bu bir örnek arama sonucudur...',
      source: 'Test Kaynak',
    },
    {
      id: '2',
      title: 'Arama sonucu 2',
      description: 'Bu başka bir örnek arama sonucudur...',
      source: 'Test Kaynak 2',
    },
  ];

  const recentSearches = ['react native', 'expo', 'hafıza sarayı', 'teknoloji'];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchResults(mockSearchResults);
      Alert.alert('Arama', `"${searchQuery}" için arama yapıldı`);
    }
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
    setSearchResults(mockSearchResults);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔍 Haber Ara</Text>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Haber ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Ara</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Recent Searches */}
        {searchResults.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Son Aramalar</Text>
            <View style={styles.recentSearches}>
              {recentSearches.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentSearchItem}
                  onPress={() => handleRecentSearch(search)}
                >
                  <Text style={styles.recentSearchText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Arama Sonuçları</Text>
            {searchResults.map((result) => (
              <View key={result.id} style={styles.resultCard}>
                <Text style={styles.resultTitle}>{result.title}</Text>
                <Text style={styles.resultDescription}>{result.description}</Text>
                <Text style={styles.resultSource}>{result.source}</Text>
              </View>
            ))}
          </View>
        )}
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
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    backgroundColor: '#F9FAFB',
  },
  searchButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 16,
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
  recentSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  recentSearchItem: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  recentSearchText: {
    color: '#374151',
    fontSize: 14,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  resultSource: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
  },
}); 