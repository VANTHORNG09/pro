import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { assignmentsAPI } from '@/lib/api/assignments';
import { Assignment, AssignmentFilters } from '@/lib/types/assignment';

// Query keys
export const assignmentKeys = {
  all: ['assignments'] as const,
  lists: () => [...assignmentKeys.all, 'list'] as const,
  list: (filters: AssignmentFilters) => [...assignmentKeys.lists(), filters] as const,
  details: () => [...assignmentKeys.all, 'detail'] as const,
  detail: (id: number) => [...assignmentKeys.details(), id] as const,
};

// Get all assignments
export function useAssignments(filters?: AssignmentFilters) {
  return useQuery({
    queryKey: assignmentKeys.list(filters || {}),
    queryFn: () => assignmentsAPI.getAll(filters),
  });
}

// Get single assignment
export function useAssignment(id: number) {
  return useQuery({
    queryKey: assignmentKeys.detail(id),
    queryFn: () => assignmentsAPI.getById(id),
    enabled: !!id,
  });
}

// Create assignment
export function useCreateAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Assignment>) => assignmentsAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentKeys.all });
    },
    onError: (error: Error) => {
      console.error('Failed to create assignment:', error);
    },
  });
}

// Update assignment
export function useUpdateAssignment(id: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<Assignment>) => assignmentsAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: assignmentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: assignmentKeys.all });
    },
    onError: (error: Error) => {
      console.error('Failed to update assignment:', error);
    },
  });
}

// Delete assignment
export function useDeleteAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => assignmentsAPI.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: assignmentKeys.all });
      queryClient.removeQueries({ queryKey: assignmentKeys.detail(id) });
    },
    onError: (error: Error) => {
      console.error('Failed to delete assignment:', error);
    },
  });
}

// Publish assignment
export function usePublishAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => assignmentsAPI.publish(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: assignmentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: assignmentKeys.all });
    },
    onError: (error: Error) => {
      console.error('Failed to publish assignment:', error);
    },
  });
}

// Close assignment
export function useCloseAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => assignmentsAPI.close(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: assignmentKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: assignmentKeys.all });
    },
    onError: (error: Error) => {
      console.error('Failed to close assignment:', error);
    },
  });
}
