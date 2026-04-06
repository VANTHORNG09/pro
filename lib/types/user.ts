// lib/types/user.ts

export type UserRole = "admin" | "teacher" | "student";

export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  status: UserStatus;
  createdAt: string;
  lastLogin?: string;
}