import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import api from '../lib/axios';

interface User {
  id: string;
  email: string;
  is_active: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresAt: number | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresAt: null,
      isAuthenticated: false,

      login: (accessToken: string, refreshToken: string) => {
        try {
          const decoded = jwtDecode<any>(accessToken);
          // Exp time from jwt is in seconds, convert to ms
          const expiresAt = decoded.exp * 1000;
          
          set({
            accessToken,
            refreshToken,
            accessTokenExpiresAt: expiresAt,
            isAuthenticated: true,
            user: {
              id: decoded.sub,
              email: decoded.sub,
              is_active: true,
            }
          });
        } catch (error) {
          console.error("Invalid token format", error);
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresAt: null,
          isAuthenticated: false,
        });
      },

      checkAuth: async () => {
        const { accessTokenExpiresAt, refreshToken, logout, login } = get();
        
        if (!refreshToken) {
          logout();
          return;
        }

        // Check if access token is expired or about to expire (within 1 min)
        if (accessTokenExpiresAt && Date.now() >= accessTokenExpiresAt - 60000) {
          try {
            const response = await api.post('/auth/refresh', {
              refresh_token: refreshToken
            });
            
            login(response.data.access_token, response.data.refresh_token);
          } catch (error) {
            console.error("Failed to refresh token", error);
            logout();
          }
        }
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
