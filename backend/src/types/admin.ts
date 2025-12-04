export interface AdminDashboardStats {
  totalUsers: number;
  transactionsToday: number;
  pendingOrders: number;
  totalRevenue: number;
}

export interface UserSearchFilters {
  query?: string;
  email?: string;
  name?: string;
}

export interface TransactionFilters {
  method?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  transactionHash?: string;
}

export interface UserDetailsResponse {
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

