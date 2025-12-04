import apiClient from './api';

export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  currency: string;
  image: string;
  images: string[];
  inStock: boolean;
  releaseDate: string;
  platforms: string[];
  genres: string[];
  tags: string[];
  isBestSeller: boolean;
  isNew: boolean;
  isPreorder: boolean;
}

export interface GameFilters {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  pricePreset?: 'under-10' | '10-25' | '25-50' | '50-100' | 'over-100';
  inStockOnly?: boolean;
  platforms?: string[];
  activationServices?: string[];
  regions?: string[];
  multiplayer?: boolean;
  publishers?: string[];
  genres?: string[];
  sort?: 'popular' | 'newest' | 'price-asc' | 'price-desc';
  page?: number;
  pageSize?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const gamesApi = {
  getGames: async (filters?: GameFilters): Promise<PaginatedResponse<Game>> => {
    const response = await apiClient.get<{ success: boolean; data: PaginatedResponse<Game> }>(
      '/api/games',
      {
        params: filters as Record<string, string>,
      }
    );
    return response.data;
  },

  getGameById: async (id: string): Promise<Game> => {
    const response = await apiClient.get<{ success: boolean; data: Game }>(`/api/games/${id}`);
    return response.data;
  },

  getGameBySlug: async (slug: string): Promise<Game> => {
    const response = await apiClient.get<{ success: boolean; data: Game }>(
      `/api/games/slug/${slug}`
    );
    return response.data;
  },

  getBestSellers: async (genre?: string): Promise<Game[]> => {
    const response = await apiClient.get<{ success: boolean; data: Game[] }>(
      '/api/games/best-sellers',
      {
        params: genre ? { genre } : undefined,
      }
    );
    return response.data;
  },

  getNewInCatalog: async (): Promise<Game[]> => {
    const response = await apiClient.get<{ success: boolean; data: Game[] }>(
      '/api/games/new-in-catalog'
    );
    return response.data;
  },

  getPreorders: async (): Promise<Game[]> => {
    const response = await apiClient.get<{ success: boolean; data: Game[] }>(
      '/api/games/preorders'
    );
    return response.data;
  },

  getNewGames: async (): Promise<Game[]> => {
    const response = await apiClient.get<{ success: boolean; data: Game[] }>('/api/games/new');
    return response.data;
  },

  getGamesByGenre: async (genre: string): Promise<Game[]> => {
    const response = await apiClient.get<{ success: boolean; data: Game[] }>(
      `/api/games/by-genre/${genre}`
    );
    return response.data;
  },

  getRandomGames: async (count: number = 10): Promise<Game[]> => {
    const response = await apiClient.get<{ success: boolean; data: Game[] }>(
      '/api/games/random',
      {
        params: { count: count.toString() },
      }
    );
    return response.data;
  },

  getSimilarGames: async (gameId: string, count: number = 10): Promise<Game[]> => {
    const response = await apiClient.get<{ success: boolean; data: Game[] }>(
      `/api/games/${gameId}/similar`,
      {
        params: { count: count.toString() },
      }
    );
    return response.data;
  },

  searchGames: async (query: string): Promise<Game[]> => {
    const response = await apiClient.get<{ success: boolean; data: Game[] }>(
      '/api/games/search',
      {
        params: { q: query },
      }
    );
    return response.data;
  },
};

