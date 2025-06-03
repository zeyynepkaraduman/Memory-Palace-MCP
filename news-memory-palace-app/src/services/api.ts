import axios from 'axios';
import { NewsResponse, NewsSearchParams, MemoryPalace, CreateMemoryPalaceParams, NewsTopHeadlinesParams } from '../types';

// Mastra API Base URL - Bu production'da gerçek URL olacak
const MASTRA_API_BASE_URL = 'http://localhost:3000/api'; // Local development için

class MastraApiService {
  private apiClient;

  constructor() {
    this.apiClient = axios.create({
      baseURL: MASTRA_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Request interceptor
    this.apiClient.interceptors.request.use(
      (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.apiClient.interceptors.response.use(
      (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
      },
      (error) => {
        console.error('API Response Error:', error.response?.status, error.message);
        return Promise.reject(error);
      }
    );
  }

  // News Headlines Agent
  async getTopHeadlines(params: NewsTopHeadlinesParams = {}): Promise<NewsResponse> {
    try {
      const response = await this.apiClient.post('/agents/news-headlines/run', {
        message: 'Güncel manşet haberlerini getir',
        context: {
          country: params.country || 'tr',
          category: params.category,
          pageSize: params.pageSize || 20,
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching headlines:', error);
      throw this.handleApiError(error);
    }
  }

  // News Search Agent
  async searchNews(params: NewsSearchParams): Promise<NewsResponse> {
    try {
      const response = await this.apiClient.post('/agents/news-search/run', {
        message: `"${params.query}" konusunda haber ara`,
        context: {
          query: params.query,
          language: params.language || 'tr',
          sortBy: params.sortBy || 'publishedAt',
          pageSize: params.pageSize || 20,
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error searching news:', error);
      throw this.handleApiError(error);
    }
  }

  // News Memory Palace Agent
  async createNewsMemoryPalace(params: CreateMemoryPalaceParams): Promise<MemoryPalace> {
    try {
      const response = await this.apiClient.post('/agents/news-memory-palace/run', {
        message: 'Bu haberlerden bir hafıza sarayı oluştur',
        context: {
          articles: params.articles,
          palaceTitle: params.palaceTitle,
          category: params.category,
        }
      });

      return response.data.palace;
    } catch (error) {
      console.error('Error creating memory palace:', error);
      throw this.handleApiError(error);
    }
  }

  // Memory Palace Operations
  async getMemoryPalaces(): Promise<MemoryPalace[]> {
    try {
      const response = await this.apiClient.post('/agents/memory-palace/run', {
        message: 'Tüm hafıza saraylarını listele',
        context: {}
      });

      return response.data.palaces || [];
    } catch (error) {
      console.error('Error fetching memory palaces:', error);
      throw this.handleApiError(error);
    }
  }

  async getMemoryPalaceDetails(palaceId: string): Promise<MemoryPalace> {
    try {
      const response = await this.apiClient.post('/agents/memory-palace/run', {
        message: 'Hafıza sarayının detaylarını getir',
        context: {
          palaceId: palaceId
        }
      });

      return response.data.palace;
    } catch (error) {
      console.error('Error fetching palace details:', error);
      throw this.handleApiError(error);
    }
  }

  // Health check for Mastra service
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.apiClient.get('/health');
      return response.status === 200;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  private handleApiError(error: any): Error {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.data?.error || 'API request failed';
      return new Error(`API Error (${error.response.status}): ${message}`);
    } else if (error.request) {
      // Request was made but no response received
      return new Error('Network Error: No response from server. Please check your connection.');
    } else {
      // Something else happened
      return new Error(`Request Error: ${error.message}`);
    }
  }
}

export const mastraApi = new MastraApiService();

// Mock data for development/testing
export const mockNewsData: NewsResponse = {
  status: 'ok',
  totalResults: 5,
  articles: [
    {
      source: { id: 'bbc-news', name: 'BBC News' },
      author: 'BBC Technology',
      title: 'Yapay Zeka Teknolojisinde Yeni Gelişmeler',
      description: 'Yapay zeka alanında yaşanan son gelişmeler ve bu teknolojinin geleceği üzerine...',
      url: 'https://bbc.com/news/technology-ai-developments',
      urlToImage: 'https://via.placeholder.com/400x200/4A5568/FFFFFF?text=AI+News',
      publishedAt: new Date().toISOString(),
      content: 'Yapay zeka teknolojisinde yaşanan gelişmeler...'
    },
    {
      source: { id: 'techcrunch', name: 'TechCrunch' },
      author: 'Sarah Johnson',
      title: 'Blockchain Teknolojisi Bankacılığı Değiştiriyor',
      description: 'Blockchain teknolojisinin bankacılık sektöründe yarattığı dönüşüm...',
      url: 'https://techcrunch.com/blockchain-banking',
      urlToImage: 'https://via.placeholder.com/400x200/2D3748/FFFFFF?text=Blockchain',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      content: 'Blockchain teknolojisi bankacılık sektöründe...'
    },
    {
      source: { id: 'verge', name: 'The Verge' },
      author: 'Tech Reporter',
      title: 'Elektrikli Araç Pazarında Rekor Büyüme',
      description: 'Elektrikli araç satışlarında görülen büyüme oranları ve gelecek öngörüleri...',
      url: 'https://theverge.com/electric-vehicles-growth',
      urlToImage: 'https://via.placeholder.com/400x200/319795/FFFFFF?text=Electric+Cars',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      content: 'Elektrikli araç pazarında yaşanan gelişmeler...'
    }
  ]
};

export const mockMemoryPalace: MemoryPalace = {
  id: 'palace-1',
  title: 'Teknoloji Haberleri Sarayı',
  description: 'Güncel teknoloji haberlerinden oluşturulan hafıza sarayı',
  theme: 'technology',
  category: 'technology',
  createdAt: new Date(),
  rooms: [
    {
      id: 'room-1',
      name: 'AI Odası',
      title: 'AI Odası',
      description: 'Yapay zeka haberlerinin bulunduğu oda',
      position: { x: 0, y: 0, z: 0 },
      visualTheme: 'technology',
      memoryItems: [
        {
          id: 'item-1',
          title: 'Yapay Zeka Gelişmeleri',
          content: 'ChatGPT ve diğer AI modellerinde yaşanan gelişmeler...',
          visualCue: {
            type: 'icon',
            value: '🤖',
            description: 'Parlayan robot'
          },
          position: { x: 0, y: 0 },
          importance: 'high',
          tags: ['ai', 'technology'],
          reviewCount: 0,
          createdAt: new Date()
        }
      ]
    }
  ]
}; 