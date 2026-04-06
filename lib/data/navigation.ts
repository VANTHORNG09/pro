// lib/data/navigation.ts
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  LayoutDashboard,
  School,
  User,
  Users,
  BarChart3,
} from "lucide-react";

import type { UserRole } from "@/lib/types/user";

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

export const navigationByRole: Record<UserRole, NavigationItem[]> = {
  admin: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      title: "User Management",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "Class Management",
      href: "/admin/classes",
      icon: School,
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: BarChart3,
    },
  ],
  teacher: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      title: "My Classes",
      href: "/teacher/classes",
      icon: BookOpen,
    },
    {
      title: "Assignments",
      href: "/teacher/assignments",
      icon: FileText,
    },
    {
      title: "Submissions",
      href: "/teacher/submissions",
      icon: ClipboardCheck,
    },
  ],
  student: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    },
    {
      title: "My Classes",
      href: "/student/classes",
      icon: BookOpen,
    },
    {
      title: "Assignments",
      href: "/student/assignments",
      icon: FileText,
    },
    {
      title: "My Submissions",
      href: "/student/submissions",
      icon: ClipboardCheck,
    },
  ],
};