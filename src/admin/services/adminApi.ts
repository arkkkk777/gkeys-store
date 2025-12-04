import apiClient from '../../services/api';

export interface DashboardStats {
  totalUsers: number;
  newUsersToday: number;
  totalGames: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  transactionsToday: number;
  totalRevenue: number;
  revenueToday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
  topSellingGames: {
    id: string;
    title: string;
    slug: string;
    salesCount: number;
    revenue: number;
  }[];
  recentOrders: {
    id: string;
    userEmail: string;
    total: number;
    status: string;
    createdAt: string;
  }[];
  recentTransactions: {
    id: string;
    userEmail: string;
    amount: number;
    type: string;
    status: string;
    createdAt: string;
  }[];
  salesByDay: {
    date: string;
    count: number;
    revenue: number;
  }[];
}

export interface UserSearchResult {
  users: {
    id: string;
    email: string;
    nickname: string;
    firstName?: string;
    lastName?: string;
    balance: number;
    role: string;
    createdAt: string;
    ordersCount: number;
  }[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UserDetails {
  id: string;
  email: string;
  nickname: string;
  firstName?: string;
  lastName?: string;
  balance: number;
  role: string;
  createdAt: string;
  orders: {
    id: string;
    status: string;
    total: number;
    createdAt: string;
  }[];
  transactions: {
    id: string;
    type: string;
    amount: number;
    status: string;
    createdAt: string;
  }[];
}

export interface TransactionResult {
  transactions: {
    id: string;
    userId: string;
    user: {
      id: string;
      email: string;
      nickname: string;
    };
    orderId?: string;
    order?: {
      id: string;
      status: string;
    };
    type: string;
    amount: number;
    currency: string;
    method?: string;
    status: string;
    description?: string;
    transactionHash?: string;
    createdAt: string;
  }[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GameItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  platform: string;
  genre: string;
  inStock: boolean;
  isPreorder: boolean;
  imageUrl: string;
  salesCount: number;
  createdAt: string;
}

export interface GamesResult {
  games: GameItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  published: boolean;
  author: string;
  createdAt: string;
}

export interface BlogPostsResult {
  posts: BlogPostItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface OrderItem {
  id: string;
  userEmail: string;
  userNickname: string;
  total: number;
  status: string;
  itemsCount: number;
  items: {
    gameTitle: string;
    price: number;
    key?: string;
  }[];
  createdAt: string;
}

export interface OrdersResult {
  orders: OrderItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GameCreateInput {
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  platform: string;
  genre: string;
  tags: string[];
  publisher?: string;
  developer?: string;
  releaseDate?: string;
  isPreorder?: boolean;
  inStock?: boolean;
}

export interface BlogPostCreateInput {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  published?: boolean;
}

export const adminApi = {
  // Dashboard
  getDashboard: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<{ success: boolean; data: DashboardStats }>(
      '/api/admin/dashboard'
    );
    return response.data;
  },

  // Users
  searchUsers: async (filters?: {
    query?: string;
    email?: string;
    name?: string;
    page?: number;
    pageSize?: number;
  }): Promise<UserSearchResult> => {
    const params: Record<string, string> = {};
    if (filters?.query) params.query = filters.query;
    if (filters?.email) params.email = filters.email;
    if (filters?.name) params.name = filters.name;
    if (filters?.page) params.page = filters.page.toString();
    if (filters?.pageSize) params.pageSize = filters.pageSize.toString();

    const response = await apiClient.get<{ success: boolean; data: UserSearchResult }>(
      '/api/admin/users',
      { params }
    );
    return response.data;
  },

  getUserDetails: async (id: string): Promise<UserDetails> => {
    const response = await apiClient.get<{ success: boolean; data: UserDetails }>(
      `/api/admin/users/${id}`
    );
    return response.data;
  },

  exportUserReport: async (id: string): Promise<Blob> => {
    const response = await apiClient.get<Blob>(`/api/admin/users/${id}/export`, {
      responseType: 'blob',
    });
    return response;
  },

  // Transactions
  getTransactions: async (filters?: {
    method?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    transactionHash?: string;
    page?: number;
    pageSize?: number;
  }): Promise<TransactionResult> => {
    const params: Record<string, string> = {};
    if (filters?.method) params.method = filters.method;
    if (filters?.status) params.status = filters.status;
    if (filters?.startDate) params.startDate = filters.startDate;
    if (filters?.endDate) params.endDate = filters.endDate;
    if (filters?.transactionHash) params.transactionHash = filters.transactionHash;
    if (filters?.page) params.page = filters.page.toString();
    if (filters?.pageSize) params.pageSize = filters.pageSize.toString();

    const response = await apiClient.get<{ success: boolean; data: TransactionResult }>(
      '/api/admin/transactions',
      { params }
    );
    return response.data;
  },

  // Games CRUD
  getGames: async (page = 1, pageSize = 20): Promise<GamesResult> => {
    const response = await apiClient.get<{ success: boolean; data: GamesResult }>(
      '/api/admin/games',
      { params: { page: page.toString(), pageSize: pageSize.toString() } }
    );
    return response.data;
  },

  createGame: async (data: GameCreateInput): Promise<{ id: string; title: string }> => {
    const response = await apiClient.post<{ success: boolean; data: { id: string; title: string } }>(
      '/api/admin/games',
      data
    );
    return response.data;
  },

  updateGame: async (id: string, data: Partial<GameCreateInput>): Promise<{ id: string; title: string }> => {
    const response = await apiClient.put<{ success: boolean; data: { id: string; title: string } }>(
      `/api/admin/games/${id}`,
      data
    );
    return response.data;
  },

  deleteGame: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/games/${id}`);
  },

  // Blog Posts CRUD
  getBlogPosts: async (page = 1, pageSize = 20): Promise<BlogPostsResult> => {
    const response = await apiClient.get<{ success: boolean; data: BlogPostsResult }>(
      '/api/admin/blog',
      { params: { page: page.toString(), pageSize: pageSize.toString() } }
    );
    return response.data;
  },

  createBlogPost: async (data: BlogPostCreateInput): Promise<{ id: string; title: string }> => {
    const response = await apiClient.post<{ success: boolean; data: { id: string; title: string } }>(
      '/api/admin/blog',
      data
    );
    return response.data;
  },

  updateBlogPost: async (id: string, data: Partial<BlogPostCreateInput>): Promise<{ id: string; title: string }> => {
    const response = await apiClient.put<{ success: boolean; data: { id: string; title: string } }>(
      `/api/admin/blog/${id}`,
      data
    );
    return response.data;
  },

  deleteBlogPost: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/admin/blog/${id}`);
  },

  // Orders
  getOrders: async (page = 1, pageSize = 20, status?: string): Promise<OrdersResult> => {
    const params: Record<string, string> = {
      page: page.toString(),
      pageSize: pageSize.toString(),
    };
    if (status) params.status = status;

    const response = await apiClient.get<{ success: boolean; data: OrdersResult }>(
      '/api/admin/orders',
      { params }
    );
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string): Promise<{ id: string; status: string }> => {
    const response = await apiClient.put<{ success: boolean; data: { id: string; status: string } }>(
      `/api/admin/orders/${id}/status`,
      { status }
    );
    return response.data;
  },

  // G2A Sync
  syncG2A: async (): Promise<{ message: string }> => {
    const response = await apiClient.post<{ success: boolean; message: string }>(
      '/api/admin/g2a/sync'
    );
    return { message: response.message || 'Sync started' };
  },
};

