// lib/api/users.ts
import type { UserRole, UserStatus } from '@/lib/types/user';

export interface ApiUser {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string;
  avatar?: string;
}

export interface CreateUserPayload {
  fullName: string;
  email: string;
  role: UserRole;
  password?: string;
}

export interface UpdateUserPayload {
  fullName?: string;
  email?: string;
  role?: UserRole;
  status?: UserStatus;
}

export interface UserFilters {
  role?: UserRole | 'all';
  status?: UserStatus | 'all';
  search?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

function getToken(): string | null {
  return localStorage.getItem('auth_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `API request failed: ${response.status}`);
  }

  return data;
}

export const usersAPI = {
  // List all users
  getAll: async (filters?: UserFilters): Promise<ApiUser[]> => {
    const params = new URLSearchParams();
    if (filters?.role && filters.role !== 'all') params.append('role', filters.role);
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);

    const queryString = params.toString();
    return request<ApiUser[]>(`/users${queryString ? `?${queryString}` : ''}`);
  },

  // Get single user
  getById: async (id: string): Promise<ApiUser> => {
    return request<ApiUser>(`/users/${id}`);
  },

  // Create user
  create: async (data: CreateUserPayload): Promise<ApiUser> => {
    return request<ApiUser>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update user
  update: async (id: string, data: UpdateUserPayload): Promise<ApiUser> => {
    return request<ApiUser>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete user
  delete: async (id: string): Promise<void> => {
    return request<void>(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  // Activate user
  activate: async (id: string): Promise<ApiUser> => {
    return request<ApiUser>(`/users/${id}/activate`, {
      method: 'POST',
    });
  },

  // Deactivate user
  deactivate: async (id: string): Promise<ApiUser> => {
    return request<ApiUser>(`/users/${id}/deactivate`, {
      method: 'POST',
    });
  },

  // Get dashboard stats
  getStats: async (): Promise<{
    totalUsers: number;
    activeUsers: number;
    totalClasses: number;
    totalAssignments: number;
    teachersCount: number;
    studentsCount: number;
    adminsCount: number;
  }> => {
    return request<{
      totalUsers: number;
      activeUsers: number;
      totalClasses: number;
      totalAssignments: number;
      teachersCount: number;
      studentsCount: number;
      adminsCount: number;
    }>('/users/stats');
  },
};
