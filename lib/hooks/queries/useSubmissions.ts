import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionsAPI } from '@/lib/api/submissions';
import { GradeSubmissionPayload, SubmissionFilters } from '@/lib/types/assignment';

// Query keys
export const submissionKeys = {
  all: ['submissions'] as const,
  lists: () => [...submissionKeys.all, 'list'] as const,
  list: (assignmentId: number, filters: SubmissionFilters) => [...submissionKeys.lists(), assignmentId, filters] as const,
  mySubmission: (assignmentId: number) => [...submissionKeys.all, 'mySubmission', assignmentId] as const,
  allMySubmissions: () => [...submissionKeys.all, 'allMySubmissions'] as const,
};

// Get all submissions for an assignment (teacher view)
export function useSubmissions(assignmentId: number, filters?: SubmissionFilters) {
  return useQuery({
    queryKey: submissionKeys.list(assignmentId, filters || {}),
    queryFn: () => submissionsAPI.getByAssignment(assignmentId, filters),
    enabled: !!assignmentId,
  });
}

// Get student's own submission for an assignment
export function useMySubmission(assignmentId: number) {
  return useQuery({
    queryKey: submissionKeys.mySubmission(assignmentId),
    queryFn: () => submissionsAPI.getMySubmission(assignmentId),
    enabled: !!assignmentId,
  });
}

// Get all student's submissions
export function useAllMySubmissions() {
  return useQuery({
    queryKey: submissionKeys.allMySubmissions(),
    queryFn: () => submissionsAPI.getAllMySubmissions(),
  });
}

// Submit assignment
export function useSubmitAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ assignmentId, formData }: { assignmentId: number; formData: FormData }) =>
      submissionsAPI.submitAssignment(assignmentId, formData),
    onSuccess: (_, { assignmentId }) => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.mySubmission(assignmentId) });
      queryClient.invalidateQueries({ queryKey: submissionKeys.allMySubmissions() });
    },
    onError: (error: Error) => {
      console.error('Failed to submit assignment:', error);
    },
  });
}

// Update submission
export function useUpdateSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ submissionId, formData }: { submissionId: number; formData: FormData }) =>
      submissionsAPI.updateSubmission(submissionId, formData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.mySubmission(data.assignmentId) });
      queryClient.invalidateQueries({ queryKey: submissionKeys.allMySubmissions() });
    },
    onError: (error: Error) => {
      console.error('Failed to update submission:', error);
    },
  });
}

// Delete file from submission
export function useDeleteSubmissionFile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ submissionId, fileId }: { submissionId: number; fileId: number }) =>
      submissionsAPI.deleteFile(submissionId, fileId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.mySubmission(data.assignmentId) });
      queryClient.invalidateQueries({ queryKey: submissionKeys.allMySubmissions() });
    },
    onError: (error: Error) => {
      console.error('Failed to delete file:', error);
    },
  });
}

// Grade submission
export function useGradeSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: GradeSubmissionPayload }) =>
      submissionsAPI.gradeSubmission(id, payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.list(data.assignmentId, {}) });
      queryClient.invalidateQueries({ queryKey: submissionKeys.allMySubmissions() });
    },
    onError: (error: Error) => {
      console.error('Failed to grade submission:', error);
    },
  });
}

// Return submission
export function useReturnSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => submissionsAPI.returnSubmission(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.list(data.assignmentId, {}) });
      queryClient.invalidateQueries({ queryKey: submissionKeys.allMySubmissions() });
    },
    onError: (error: Error) => {
      console.error('Failed to return submission:', error);
    },
  });
}

// Add comment
export function useAddComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ submissionId, content }: { submissionId: number; content: string }) =>
      submissionsAPI.addComment(submissionId, content),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: submissionKeys.mySubmission(data.submissionId) });
      queryClient.invalidateQueries({ queryKey: submissionKeys.allMySubmissions() });
    },
    onError: (error: Error) => {
      console.error('Failed to add comment:', error);
    },
  });
}

// Download all submissions
export function useDownloadSubmissions() {
  return useMutation({
    mutationFn: (assignmentId: number) => submissionsAPI.downloadAllSubmissions(assignmentId),
    onError: (error: Error) => {
      console.error('Failed to download submissions:', error);
    },
  });
}
