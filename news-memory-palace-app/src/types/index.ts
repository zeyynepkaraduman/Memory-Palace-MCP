// News API Types
export interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

// Memory Palace Types
export interface Position {
  x: number;
  y: number;
  z?: number;
}

export interface VisualCue {
  type: 'image' | 'icon' | 'color' | 'shape';
  value: string;
  description?: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  content: string;
  visualCue: VisualCue;
  position: Position;
  importance: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  reviewCount: number;
  lastReviewDate?: Date;
  accuracy?: number;
  createdAt?: Date;
}

export interface Room {
  id: string;
  title: string;
  description?: string;
  memoryItems: MemoryItem[];
  visualTheme: string;
  position: Position;
  name?: string;
  theme?: string;
}

export interface MemoryPalace {
  id: string;
  title: string;
  description?: string;
  category: string;
  theme: string;
  rooms: Room[];
  createdAt: Date;
  updatedAt?: Date;
  totalReviews?: number;
  averageAccuracy?: number;
}

// Navigation Types
export type RootStackParamList = {
  MainTabs: undefined;
  ArticleDetail: { article: NewsArticle };
  PalaceDetail: { palace: MemoryPalace };
  CreatePalace: { articles: NewsArticle[] };
};

export type MainTabParamList = {
  News: undefined;
  Search: undefined;
  Palaces: undefined;
  Profile: undefined;
};

// API Request Types
export interface NewsSearchParams {
  query?: string;
  language?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  page?: number;
  country?: string;
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
}

export interface NewsTopHeadlinesParams {
  country?: string;
  category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
  pageSize?: number;
  page?: number;
}

export interface CreateMemoryPalaceParams {
  articles: NewsArticle[];
  palaceTitle: string;
  category: string;
  theme?: string;
}

// UI Component Props
export interface NewsCardProps {
  article: NewsArticle;
  onPress: () => void;
  onCreatePalace?: () => void;
}

export interface PalaceCardProps {
  palace: MemoryPalace;
  onPress: () => void;
} 