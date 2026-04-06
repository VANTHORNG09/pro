// components/layout/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Users,
  BookOpen,
  ClipboardList,
  FileText,
  CheckCircle2,
  School,
  GraduationCap,
  Shield,
  ChevronLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";

type UserRole = "admin" | "teacher" | "student";

interface SidebarProps {
  role?: UserRole;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const roleConfig: Record<UserRole, { label: string; icon: React.ElementType }> = {
  admin: {
    label: "Administrator",
    icon: Shield,
  },
  teacher: {
    label: "Teacher",
    icon: GraduationCap,
  },
  student: {
    label: "Student",
    icon: School,
  },
};

const adminNav: NavItem[] = [
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Class Management",
    href: "/admin/classes",
    icon: BookOpen,
  },
];

const teacherNav: NavItem[] = [
  {
    title: "My Classes",
    href: "/teacher/classes",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    href: "/teacher/assignments",
    icon: ClipboardList,
  },
  {
    title: "Submission Review",
    href: "/teacher/submissions",
    icon: CheckCircle2,
  },
];

const studentNav: NavItem[] = [
  {
    title: "My Classes",
    href: "/student/classes",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    href: "/student/assignments",
    icon: ClipboardList,
  },
  {
    title: "My Submissions",
    href: "/student/submissions",
    icon: FileText,
  },
];

export function Sidebar({
  role = "student",
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const isCollapsed = collapsed;

  const roleNav =
    role === "admin" ? adminNav : role === "teacher" ? teacherNav : studentNav;

  const dashboardNav: NavItem = {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  };

  const generalNav: NavItem[] = [
    dashboardNav,
    {
      title: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  const currentRole = roleConfig[role];
  const RoleIcon = currentRole.icon;

  return (
    <aside
      className={cn(
        "relative hidden shrink-0 border-r bg-background lg:flex lg:flex-col",
        "transition-[width] duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      {onToggleCollapse ? (
        <button
          type="button"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "absolute z-20 flex h-8 w-8 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm",
            "transition-[transform,background-color,color,box-shadow] duration-300",
            "hover:bg-muted hover:text-foreground hover:shadow-md",
            "top-[32px] -right-[16px]"
          )}
        >
          <ChevronLeft
            className="h-4 w-4 transition-transform duration-300"
            style={{ transform: isCollapsed ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
      ) : null}
      <div className="flex h-full flex-col overflow-hidden">
        <div
          className={cn(
            "border-b py-5 transition-[padding] duration-300",
            isCollapsed ? "px-4" : "px-6"
          )}
        >
          <Link
            href="/dashboard"
            className={cn("flex items-center", isCollapsed ? "justify-center" : "gap-3")}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div
              className={cn(
                "whitespace-nowrap transition-[opacity,transform,max-width] duration-300",
                isCollapsed
                  ? "max-w-0 -translate-x-2 overflow-hidden opacity-0"
                  : "max-w-[200px] translate-x-0 opacity-100"
              )}
            >
              <p className="text-lg font-bold tracking-tight">AssignBridge</p>
              <p className="text-xs text-muted-foreground">
                Smart Assignment Platform
              </p>
            </div>
          </Link>
        </div>

        <div
          className={cn(
            "border-b py-4 transition-[padding] duration-300",
            isCollapsed ? "px-4" : "px-6"
          )}
        >
          
        </div>

        <nav
          className={cn(
            "flex-1 space-y-6 overflow-y-auto py-6",
            "transition-[padding] duration-300",
            isCollapsed ? "px-3" : "px-4"
          )}
        >
          <div className="space-y-2">
            <p
              className={cn(
                "px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                "whitespace-nowrap transition-[opacity,transform,max-width] duration-300",
                isCollapsed
                  ? "max-w-[72px] translate-x-0 opacity-70 text-[10px] tracking-[0.2em] text-center px-0"
                  : "max-w-[220px] translate-x-0 opacity-100"
              )}
            >
              General
            </p>
            {generalNav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.title}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-colors",
                    isCollapsed
                      ? "mx-auto h-10 w-10 justify-center px-0 py-0"
                      : "gap-3 px-3 py-2.5",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("shrink-0", isCollapsed ? "h-5 w-5" : "h-4 w-4")} />
                  <span
                    className={cn(
                      "whitespace-nowrap transition-[opacity,transform,max-width] duration-300",
                      isCollapsed
                        ? "max-w-0 -translate-x-2 overflow-hidden opacity-0"
                        : "max-w-[180px] translate-x-0 opacity-100"
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-2">
            <p
              className={cn(
                "px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                "whitespace-nowrap transition-[opacity,transform,max-width] duration-300",
                isCollapsed
                  ? "max-w-[72px] translate-x-0 opacity-70 text-[10px] tracking-[0.2em] text-center px-0"
                  : "max-w-[220px] translate-x-0 opacity-100"
              )}
            >
              {role === "admin"
                ? "Administration"
                : role === "teacher"
                ? "Teaching"
                : "Student Workspace"}
            </p>

            {roleNav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.title}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center rounded-lg text-sm font-medium transition-colors",
                    isCollapsed
                      ? "mx-auto h-10 w-10 justify-center px-0 py-0"
                      : "gap-3 px-3 py-2.5",
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className={cn("shrink-0", isCollapsed ? "h-5 w-5" : "h-4 w-4")} />
                  <span
                    className={cn(
                      "whitespace-nowrap transition-[opacity,transform,max-width] duration-300",
                      isCollapsed
                        ? "max-w-0 -translate-x-2 overflow-hidden opacity-0"
                        : "max-w-[180px] translate-x-0 opacity-100"
                    )}
                  >
                    {item.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
