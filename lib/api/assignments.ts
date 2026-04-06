import { Assignment, AssignmentFilters } from '@/lib/types/assignment';

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

export const assignmentsAPI = {
  // List all assignments (with optional filters)
  getAll: async (filters?: AssignmentFilters): Promise<Assignment[]> => {
    const params = new URLSearchParams();
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.classId) params.append('classId', filters.classId.toString());

    const queryString = params.toString();
    return request<Assignment[]>(`/assignments${queryString ? `?${queryString}` : ''}`);
  },

  // Get single assignment by ID
  getById: async (id: number): Promise<Assignment> => {
    return request<Assignment>(`/assignments/${id}`);
  },

  // Create new assignment (teacher only)
  create: async (data: Partial<Assignment>): Promise<Assignment> => {
    return request<Assignment>('/assignments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update assignment (teacher only)
  update: async (id: number, data: Partial<Assignment>): Promise<Assignment> => {
    return request<Assignment>(`/assignments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete assignment (teacher only)
  delete: async (id: number): Promise<void> => {
    return request<void>(`/assignments/${id}`, {
      method: 'DELETE',
    });
  },

  // Publish assignment (teacher only)
  publish: async (id: number): Promise<Assignment> => {
    return request<Assignment>(`/assignments/${id}/publish`, {
      method: 'POST',
    });
  },

  // Close assignment (teacher only)
  close: async (id: number): Promise<Assignment> => {
    return request<Assignment>(`/assignments/${id}/close`, {
      method: 'POST',
    });
  },
};
