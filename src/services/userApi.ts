import apiClient from './api';

export interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  createdAt: string;
}

export interface UserStats {
  totalGames: number;
  totalSaved: number;
  daysSinceRegistration: number;
  totalOrders: number;
  balance: number;
}

export interface UpdateProfileData {
  nickname?: string;
  firstName?: string;
  lastName?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get<{ success: boolean; data: UserProfile }>(
      '/api/users/profile'
    );
    return response.data;
  },

  updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
    const response = await apiClient.put<{ success: boolean; data: UserProfile }>(
      '/api/users/profile',
      data
    );
    return response.data;
  },

  changePassword: async (data: ChangePasswordData): Promise<void> => {
    await apiClient.put('/api/users/password', data);
  },

  getStats: async (): Promise<UserStats> => {
    const response = await apiClient.get<{ success: boolean; data: UserStats }>(
      '/api/users/stats'
    );
    return response.data;
  },
};

