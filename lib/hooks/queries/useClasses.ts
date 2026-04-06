import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classesAPI } from '@/lib/api/classes';
import { Class, ClassFilters, CreateClassData, UpdateClassData, StudentInClass } from '@/lib/types/classes';

// Query keys
export const classKeys = {
  all: ['classes'] as const,
  lists: () => [...classKeys.all, 'list'] as const,
  list: (filters: ClassFilters) => [...classKeys.lists(), filters] as const,
  details: () => [...classKeys.all, 'detail'] as const,
  detail: (id: number) => [...classKeys.details(), id] as const,
  students: (classId: number) => [...classKeys.detail(classId), 'students'] as const,
  stats: (classId: number) => [...classKeys.detail(classId), 'stats'] as const,
};

// Get all classes
export function useClasses(filters?: ClassFilters) {
  return useQuery({
    queryKey: classKeys.list(filters || {}),
    queryFn: () => classesAPI.getAll(filters),
  });
}

// Get single class
export function useClass(id: number) {
  return useQuery({
    queryKey: classKeys.detail(id),
    queryFn: () => classesAPI.getById(id),
    enabled: !!id,
  });
}

// Get students in a class
export function useClassStudents(classId: number) {
  return useQuery<StudentInClass[]>({
    queryKey: classKeys.students(classId),
    queryFn: () => classesAPI.getStudents(classId),
    enabled: !!classId,
  });
}

// Get class statistics
export function useClassStats(classId: number) {
  return useQuery({
    queryKey: classKeys.stats(classId),
    queryFn: () => classesAPI.getStats(classId),
    enabled: !!classId,
  });
}

// Create class
export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClassData) => classesAPI.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: classKeys.all });
    },
    onError: (error: Error) => {
      console.error('Failed to create class:', error);
    },
  });
}

// Update class
export function useUpdateClass(id: number | undefined) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateClassData) => {
      if (!id) throw new Error('Class ID is required');
      return classesAPI.update(id, data);
    },
    onSuccess: () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: classKeys.detail(id) });
      }
      queryClient.invalidateQueries({ queryKey: classKeys.all });
    },
    onError: (error: Error) => {
      console.error('Failed to update class:', error);
    },
  });
}

// Delete class
export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => classesAPI.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: classKeys.all });
      queryClient.removeQueries({ queryKey: classKeys.detail(id) });
    },
    onError: (error: Error) => {
      console.error('Failed to delete class:', error);
    },
  });
}

// Enroll student
export function useEnrollStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, studentId }: { classId: number; studentId: number }) =>
      classesAPI.enrollStudent(classId, studentId),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: classKeys.students(classId) });
      queryClient.invalidateQueries({ queryKey: classKeys.detail(classId) });
    },
    onError: (error: Error) => {
      console.error('Failed to enroll student:', error);
    },
  });
}

// Remove student
export function useRemoveStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ classId, studentId }: { classId: number; studentId: number }) =>
      classesAPI.removeStudent(classId, studentId),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: classKeys.students(classId) });
      queryClient.invalidateQueries({ queryKey: classKeys.detail(classId) });
    },
    onError: (error: Error) => {
      console.error('Failed to remove student:', error);
    },
  });
}
