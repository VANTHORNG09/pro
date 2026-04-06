import { Submission, GradeSubmissionPayload, SubmissionFilters, SubmissionComment } from '@/lib/types/assignment';

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

export const submissionsAPI = {
  // Get all submissions for an assignment (teacher view)
  getByAssignment: async (assignmentId: number, filters?: SubmissionFilters): Promise<Submission[]> => {
    const params = new URLSearchParams();
    if (filters?.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters?.search) params.append('search', filters.search);

    const queryString = params.toString();
    return request<Submission[]>(`/assignments/${assignmentId}/submissions${queryString ? `?${queryString}` : ''}`);
  },

  // Get student's own submission for an assignment
  getMySubmission: async (assignmentId: number): Promise<Submission> => {
    return request<Submission>(`/assignments/${assignmentId}/submissions/me`);
  },

  // Get all student's submissions (student view)
  getAllMySubmissions: async (): Promise<Submission[]> => {
    return request<Submission[]>('/submissions/me');
  },

  // Submit assignment (student)
  submitAssignment: async (assignmentId: number, formData: FormData): Promise<Submission> => {
    const token = getToken();
    
    const response = await fetch(`${API_BASE_URL}/assignments/${assignmentId}/submissions`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API request failed: ${response.status}`);
    }

    return data;
  },

  // Update submission (student)
  updateSubmission: async (id: number, formData: FormData): Promise<Submission> => {
    const token = getToken();
    
    const response = await fetch(`${API_BASE_URL}/submissions/${id}`, {
      method: 'PUT',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `API request failed: ${response.status}`);
    }

    return data;
  },

  // Delete file from submission
  deleteFile: async (submissionId: number, fileId: number): Promise<Submission> => {
    return request<Submission>(`/submissions/${submissionId}/files/${fileId}`, {
      method: 'DELETE',
    });
  },

  // Grade submission (teacher)
  gradeSubmission: async (id: number, payload: GradeSubmissionPayload): Promise<Submission> => {
    return request<Submission>(`/submissions/${id}/grade`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // Return submission to student (teacher)
  returnSubmission: async (id: number): Promise<Submission> => {
    return request<Submission>(`/submissions/${id}/return`, {
      method: 'POST',
    });
  },

  // Add comment to submission
  addComment: async (submissionId: number, content: string): Promise<SubmissionComment> => {
    return request<SubmissionComment>(`/submissions/${submissionId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  },

  // Download all submissions as ZIP (teacher)
  downloadAllSubmissions: async (assignmentId: number): Promise<Blob> => {
    const token = getToken();
    
    const response = await fetch(`${API_BASE_URL}/assignments/${assignmentId}/submissions/download`, {
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || `API request failed: ${response.status}`);
    }

    return await response.blob();
  },
};
