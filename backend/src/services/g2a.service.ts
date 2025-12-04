import axios from 'axios';
import { AppError } from '../middleware/errorHandler';

const G2A_API_KEY = process.env.G2A_API_KEY || '';
const G2A_API_SECRET = process.env.G2A_API_SECRET || '';
const G2A_API_URL = process.env.G2A_API_URL || 'https://www.g2a.com/integration-api';

const MARKUP_PERCENTAGE = 2; // 2% markup on G2A prices

export interface G2AProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  stock: number;
  platform: string[];
  region: string;
  activationService: string;
  description: string;
  images: string[];
}

export interface G2AKeyResponse {
  key: string;
  productId: string;
  orderId: string;
  purchaseDate: string;
}

// Helper to apply 2% markup to price
export const applyMarkup = (price: number): number => {
  return Number((price * (1 + MARKUP_PERCENTAGE / 100)).toFixed(2));
};

export const syncG2ACatalog = async (): Promise<void> => {
  // TODO: Implement G2A catalog sync
  // This should:
  // 1. Fetch product list from G2A API with pagination
  // 2. Map G2A fields to local Game schema
  // 3. Extract platforms, genres, publishers from G2A tags
  // 4. Set price with 2% markup
  // 5. Store g2aProductId, stock status, last sync timestamp
  // 6. Handle: New products (insert), existing products (update), removed products (mark unavailable)

  console.log('G2A catalog sync - to be implemented');
};

export const purchaseGameKey = async (productId: string): Promise<G2AKeyResponse> => {
  // TODO: Replace with real G2A API call
  // This should:
  // 1. POST G2A purchase request with product ID
  // 2. Receive activation key
  // 3. Return key response

  // Mock implementation for now
  const mockKey = generateMockKey();
  
  return {
    key: mockKey,
    productId,
    orderId: `g2a-${Date.now()}`,
    purchaseDate: new Date().toISOString(),
  };
};

export const validateGameStock = async (productId: string): Promise<boolean> => {
  // TODO: Replace with real G2A API call
  // This should:
  // 1. GET G2A stock status for product
  // 2. Return boolean indicating stock availability

  // Mock implementation
  return Math.random() > 0.1; // 90% in stock
};

export const getG2AProductInfo = async (productId: string): Promise<G2AProduct> => {
  // TODO: Replace with real G2A API call
  // This should:
  // 1. GET G2A product details by ID
  // 2. Return G2A product object

  // Mock implementation
  return {
    id: productId,
    name: 'Mock G2A Product',
    price: 29.99,
    currency: 'EUR',
    stock: Math.floor(Math.random() * 100),
    platform: ['PC'],
    region: 'Global',
    activationService: 'Steam',
    description: 'Mock product description from G2A',
    images: ['https://picsum.photos/400/600'],
  };
};

// Helper to generate mock keys for testing
function generateMockKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const segments = [];
  for (let i = 0; i < 5; i++) {
    let segment = '';
    for (let j = 0; j < 5; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  return segments.join('-');
}

