import apiClient from './api';

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
  active: boolean;
  createdAt: string;
}

export interface FAQFilters {
  category?: string;
  search?: string;
  active?: boolean;
}

export interface FAQCategory {
  name: string;
  slug: string;
  count: number;
}

export const faqApi = {
  getFAQs: async (filters?: FAQFilters): Promise<FAQItem[]> => {
    try {
      const params: Record<string, string> = {};
      if (filters?.category) {
        params.category = filters.category;
      }
      if (filters?.search) {
        params.search = filters.search;
      }
      if (filters?.active !== undefined) {
        params.active = filters.active.toString();
      }

      const response = await apiClient.get<{
        success: boolean;
        data: FAQItem[];
      }>('/api/faq', { params });

      return response.data;
    } catch (error) {
      console.error('Failed to load FAQs:', error);
      return [];
    }
  },

  getCategories: async (): Promise<FAQCategory[]> => {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: FAQCategory[];
      }>('/api/faq/categories');

      return response.data;
    } catch (error) {
      console.error('Failed to load FAQ categories:', error);
      return [];
    }
  },
};
