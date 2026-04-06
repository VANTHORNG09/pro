// Types for classes, students enrollment, and class-related entities

export type ClassStatus = 'active' | 'inactive' | 'archived';
export type UserRole = 'admin' | 'teacher' | 'student';

export interface Class {
  id: number;
  name: string;
  code: string;
  description: string;
  teacherId: number;
  teacherName: string;
  subject: string;
  status: ClassStatus;
  studentCount: number;
  assignmentCount: number;
  createdAt: string;
  updatedAt: string;
  schedule?: string;
  room?: string;
  semester?: string;
  year?: number;
}

export interface StudentInClass {
  id: number;
  studentId: number;
  studentName: string;
  studentEmail: string;
  avatar?: string;
  enrolledAt: string;
  status: 'active' | 'dropped' | 'completed';
  grade?: number;
  submissionCount: number;
  gradedCount: number;
  pendingCount: number;
}

export interface ClassFilters {
  status?: ClassStatus | 'all';
  search?: string;
  teacherId?: number;
  semester?: string;
}

export interface CreateClassData {
  name: string;
  code: string;
  description: string;
  subject: string;
  schedule?: string;
  room?: string;
  semester?: string;
  year?: number;
}

export interface UpdateClassData extends Partial<CreateClassData> {
  status?: ClassStatus;
}
