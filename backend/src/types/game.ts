export interface GameFilters {
  search?: string;
  priceRange?: {
    min: number;
    max: number;
  };
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

export interface GameResponse {
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
  metacriticScore?: number;
  userRating?: number;
  ageRating?: string;
  multiplayer: boolean;
  activationService?: string;
  region?: string;
  publisher?: string;
  isBestSeller: boolean;
  isNew: boolean;
  isPreorder: boolean;
  platforms: string[];
  genres: string[];
  tags: string[];
  categories: string[];
}

