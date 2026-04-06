import { Class, ClassFilters, CreateClassData, UpdateClassData, StudentInClass } from '@/lib/types/classes';

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

export const classesAPI = {
  // List all classes (with optional filters)
  getAll: async (filters?: ClassFilters): Promise<Class[]> => {
    const params = new URLSearchParams();
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.teacherId) params.append('teacherId', filters.teacherId.toString());
    if (filters?.semester) params.append('semester', filters.semester);

    const queryString = params.toString();
    return request<Class[]>(`/classes${queryString ? `?${queryString}` : ''}`);
  },

  // Get single class by ID
  getById: async (id: number): Promise<Class> => {
    return request<Class>(`/classes/${id}`);
  },

  // Create new class (teacher/admin only)
  create: async (data: CreateClassData): Promise<Class> => {
    return request<Class>('/classes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Update class (teacher/admin only)
  update: async (id: number, data: UpdateClassData): Promise<Class> => {
    return request<Class>(`/classes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  // Delete class (teacher/admin only)
  delete: async (id: number): Promise<void> => {
    return request<void>(`/classes/${id}`, {
      method: 'DELETE',
    });
  },

  // Get students enrolled in a class
  getStudents: async (classId: number): Promise<StudentInClass[]> => {
    return request<StudentInClass[]>(`/classes/${classId}/students`);
  },

  // Enroll student in a class
  enrollStudent: async (classId: number, studentId: number): Promise<StudentInClass> => {
    return request<StudentInClass>(`/classes/${classId}/students`, {
      method: 'POST',
      body: JSON.stringify({ studentId }),
    });
  },

  // Remove student from class
  removeStudent: async (classId: number, studentId: number): Promise<void> => {
    return request<void>(`/classes/${classId}/students/${studentId}`, {
      method: 'DELETE',
    });
  },

  // Get class statistics
  getStats: async (classId: number): Promise<{
    totalStudents: number;
    activeStudents: number;
    totalAssignments: number;
    publishedAssignments: number;
    averageGrade: number;
    submissionRate: number;
  }> => {
    return request<{
      totalStudents: number;
      activeStudents: number;
      totalAssignments: number;
      publishedAssignments: number;
      averageGrade: number;
      submissionRate: number;
    }>(`/classes/${classId}/stats`);
  },
};
