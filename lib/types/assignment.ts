// Core types for the assignment and submission system

export type AssignmentStatus = 'draft' | 'published' | 'closed';
export type SubmissionStatus = 'pending' | 'submitted' | 'graded' | 'returned' | 'late';
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  instructions: string;
  classId: number;
  className: string;
  teacherId: number;
  teacherName: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  status: AssignmentStatus;
  maxPoints: number;
  allowedFileTypes: string[];
  maxFileSize: number; // in bytes
  submissionCount?: number;
  gradedCount?: number;
  pendingCount?: number;
}

export interface SubmissionFile {
  id: number;
  submissionId: number;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  uploadedAt: string;
}

export interface Submission {
  id: number;
  assignmentId: number;
  assignmentName?: string;
  studentId: number;
  studentName: string;
  studentEmail: string;
  status: SubmissionStatus;
  submittedAt: string | null;
  gradedAt: string | null;
  grade: number | null;
  maxPoints: number;
  feedback: string | null;
  files: SubmissionFile[];
  comments: SubmissionComment[];
  isLate: boolean;
}

export interface SubmissionComment {
  id: number;
  submissionId: number;
  userId: number;
  userName: string;
  userRole: UserRole;
  content: string;
  createdAt: string;
}

export interface GradeSubmissionPayload {
  grade: number;
  feedback: string;
}

export interface SubmitAssignmentPayload {
  files: File[];
  comments?: string;
}

export interface AssignmentFilters {
  status?: AssignmentStatus | 'all';
  search?: string;
  classId?: number;
}

export interface SubmissionFilters {
  status?: SubmissionStatus | 'all';
  search?: string;
}
