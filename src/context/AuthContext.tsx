import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const TOKEN_KEY = 'gkeys_auth_token';
const USER_KEY = 'gkeys_user';
const TOKEN_EXPIRY_KEY = 'gkeys_token_expiry';

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Auto-refresh token before expiry
  useEffect(() => {
    if (!token) return;

    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (!expiryTime) return;

    const expiryDate = new Date(expiryTime);
    const now = new Date();
    const timeUntilExpiry = expiryDate.getTime() - now.getTime();

    // Refresh 5 minutes before expiry
    const refreshTime = timeUntilExpiry - 5 * 60 * 1000;

    if (refreshTime > 0) {
      const refreshTimer = setTimeout(() => {
        refreshToken();
      }, refreshTime);

      return () => clearTimeout(refreshTimer);
    } else {
      // Token expired, refresh immediately
      refreshToken();
    }
  }, [token]);

  async function checkAuth() {
    setIsLoading(true);
    try {
      const storedToken = localStorage.getItem(TOKEN_KEY);
      const storedUser = localStorage.getItem(USER_KEY);
      const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);

      if (storedToken && storedUser && expiryTime) {
        const expiryDate = new Date(expiryTime);
        const now = new Date();

        if (expiryDate > now) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          // Token expired, try to refresh
          await refreshToken();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      clearAuth();
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, _password: string) {
    setIsLoading(true);
    try {
      // Simulate API call
      // In production, replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };

      const mockToken = 'mock_jwt_token_' + Date.now();
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 24); // 24 hours from now

      // Store in state
      setUser(mockUser);
      setToken(mockToken);

      // Store in localStorage
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toISOString());
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function register(email: string, _password: string, name: string) {
    setIsLoading(true);
    try {
      // Simulate API call
      // In production, replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration
      const mockUser: User = {
        id: '1',
        email,
        name,
      };

      const mockToken = 'mock_jwt_token_' + Date.now();
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 24);

      // Store in state
      setUser(mockUser);
      setToken(mockToken);

      // Store in localStorage
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toISOString());
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    clearAuth();
  }

  async function refreshToken() {
    try {
      // Simulate API call to refresh token
      // In production, replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const newToken = 'mock_jwt_token_refreshed_' + Date.now();
      const expiryTime = new Date();
      expiryTime.setHours(expiryTime.getHours() + 24);

      setToken(newToken);
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toISOString());
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearAuth();
    }
  }

  function clearAuth() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  }

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    login,
    register,
    logout,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

