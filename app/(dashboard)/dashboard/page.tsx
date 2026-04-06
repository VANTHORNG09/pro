// app/(dashboard)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  BookOpen,
  ClipboardList,
  Users,
  CheckCircle2,
  Clock3,
  TrendingUp,
  AlertCircle,
  GraduationCap,
  School,
} from "lucide-react";

import { useAuth, type Role } from "@/hooks/useAuth";
import { useClasses } from "@/lib/hooks/queries/useClasses";
import { useAssignments } from "@/lib/hooks/queries/useAssignments";
import { useAllMySubmissions } from "@/lib/hooks/queries/useSubmissions";
import { useUserStats, useUsers } from "@/lib/hooks/queries/useUsers";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/status-badge";

type UserRole = Role;

function getSummaryCards(role: UserRole, stats: { users?: any; classes?: any; assignments?: any; submissions?: any }) {
  if (role === "admin") {
    const userStats = stats.users;
    return [
      {
        title: "Total Users",
        value: userStats?.totalUsers?.toString() ?? "—",
        description: "Active students, teachers, and admins",
        icon: Users,
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/30",
      },
      {
        title: "Total Classes",
        value: userStats?.totalClasses?.toString() ?? "—",
        description: "All classes across departments",
        icon: BookOpen,
        color: "text-emerald-600",
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
      },
      {
        title: "Assignments",
        value: userStats?.totalAssignments?.toString() ?? "—",
        description: "Created and tracked assignments",
        icon: ClipboardList,
        color: "text-purple-600",
        bg: "bg-purple-100 dark:bg-purple-900/30",
      },
      {
        title: "Active Users",
        value: userStats?.activeUsers?.toString() ?? "—",
        description: "Currently active on the platform",
        icon: TrendingUp,
        color: "text-amber-600",
        bg: "bg-amber-100 dark:bg-amber-900/30",
      },
    ];
  }

  if (role === "teacher") {
    const classes = stats.classes ?? [];
    const assignments = stats.assignments ?? [];
    const pendingSubmissions = assignments.reduce(
      (sum: number, a: any) => sum + (a.pendingCount ?? 0),
      0
    );
    const gradedCount = assignments.reduce(
      (sum: number, a: any) => sum + (a.gradedCount ?? 0),
      0
    );

    return [
      {
        title: "My Classes",
        value: classes.length.toString(),
        description: "Classes assigned to you",
        icon: BookOpen,
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/30",
      },
      {
        title: "Assignments Created",
        value: assignments.length.toString(),
        description: "Total published assignments",
        icon: ClipboardList,
        color: "text-emerald-600",
        bg: "bg-emerald-100 dark:bg-emerald-900/30",
      },
      {
        title: "Pending Submissions",
        value: pendingSubmissions.toString(),
        description: "Waiting for review",
        icon: Clock3,
        color: "text-amber-600",
        bg: "bg-amber-100 dark:bg-amber-900/30",
      },
      {
        title: "Reviewed",
        value: gradedCount.toString(),
        description: "Completed feedback cycles",
        icon: CheckCircle2,
        color: "text-purple-600",
        bg: "bg-purple-100 dark:bg-purple-900/30",
      },
    ];
  }

  // student
  const classes = stats.classes ?? [];
  const submissions = stats.submissions ?? [];
  const gradedSubmissions = submissions.filter((s: any) => s.status === "graded").length;
  const pendingSubmissions = submissions.filter((s: any) => s.status === "pending" || s.status === "late").length;

  return [
    {
      title: "Enrolled Classes",
      value: classes.length.toString(),
      description: "Classes you are currently taking",
      icon: School,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Upcoming Assignments",
      value: pendingSubmissions.toString(),
      description: "Assignments still to complete",
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      title: "Submitted",
      value: gradedSubmissions.toString(),
      description: "Assignments already submitted",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    {
      title: "Average Grade",
      value: submissions.length > 0
        ? `${(submissions.reduce((sum: number, s: any) => sum + ((s.grade ?? 0) / (s.maxPoints ?? 1)) * 100, 0) / submissions.filter((s: any) => s.grade != null).length).toFixed(0)}%`
        : "—",
      description: "Your average score across graded assignments",
      icon: GraduationCap,
      color: "text-purple-600",
      bg: "bg-purple-100 dark:bg-purple-900/30",
    },
  ];
}

const roleGreeting: Record<UserRole, string> = {
  admin: "Here's your platform overview",
  teacher: "Here's your teaching overview",
  student: "Here's your learning overview",
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [currentRole, setCurrentRole] = useState<UserRole>("student");

  useEffect(() => {
    if (user?.role) {
      setCurrentRole(user.role);
    }
  }, [user]);

  // Fetch data based on role
  const { data: userStats, isLoading: loadingUserStats } = useUserStats();
  const { data: classes, isLoading: loadingClasses } = useClasses(
    currentRole === "teacher" ? {} : undefined
  );
  const { data: assignments, isLoading: loadingAssignments } = useAssignments(
    currentRole === "teacher" ? {} : undefined
  );
  // Always call hooks unconditionally (Rules of Hooks)
  const { data: allSubmissions, isLoading: loadingSubmissions } = useAllMySubmissions();

  const submissions = currentRole === "student" ? allSubmissions : undefined;
  const isLoading = loadingUserStats || loadingClasses || loadingAssignments || loadingSubmissions;

  const stats = {
    users: currentRole === "admin" ? userStats : undefined,
    classes: currentRole !== "admin" ? classes : undefined,
    assignments: currentRole === "teacher" ? assignments : undefined,
    submissions: currentRole === "student" ? submissions : undefined,
  };

  const summaryCards = getSummaryCards(currentRole, stats);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name ?? "User"}! {roleGreeting[currentRole]}.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="rounded-2xl border border-border/60 bg-background p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <h3 className="mt-2 text-2xl font-bold">
                    {isLoading ? (
                      <span className="inline-block h-8 w-16 animate-pulse rounded bg-muted" />
                    ) : (
                      card.value
                    )}
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">{card.description}</p>
                </div>
                <div className={cn("rounded-xl p-3", card.bg, card.color)}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {currentRole === "admin" && <AdminDashboardSection userStats={userStats} classes={classes} />}
      {currentRole === "teacher" && <TeacherDashboardSection classes={classes} assignments={assignments} />}
      {currentRole === "student" && <StudentDashboardSection assignments={assignments} submissions={submissions} />}
    </div>
  );
}

// ─── Admin Dashboard Section ───────────────────────────────────────
function AdminDashboardSection({ userStats, classes }: { userStats?: any; classes?: any[] }) {
  const recentClasses = classes?.slice(-3).reverse() ?? [];

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest users who joined the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userStats?.totalUsers ? (
              <div className="space-y-3">
                <div className="rounded-lg border p-3">
                  <p className="text-sm font-medium">Platform Stats</p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                    <div><span className="text-muted-foreground">Total:</span> {userStats.totalUsers}</div>
                    <div><span className="text-muted-foreground">Active:</span> {userStats.activeUsers}</div>
                    <div><span className="text-muted-foreground">Teachers:</span> {userStats.teachersCount}</div>
                    <div><span className="text-muted-foreground">Students:</span> {userStats.studentsCount}</div>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState message="No user stats available." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Classes</CardTitle>
            <CardDescription>Latest classes created.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentClasses.length > 0 ? (
              recentClasses.map((c) => (
                <div key={c.id} className="rounded-lg border p-3">
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.code} · {c.teacherName}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <StatusBadge status={c.status} />
                    <span className="text-xs text-muted-foreground">{c.studentCount} students</span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState message="No classes found." />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Platform Activity</CardTitle>
            <CardDescription>Key metrics at a glance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "User Growth", value: `${userStats?.totalUsers ?? 0} users` },
              { label: "Class Engagement", value: `${classes?.length ?? 0} classes` },
              { label: "Assignment Count", value: "Tracking via assignment stats" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-3/5 rounded-full bg-primary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Important notices from the platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "System maintenance scheduled this weekend.",
              "Teachers can now upload optional assignment attachments.",
              "Students: reminder to complete pending submissions before deadline.",
            ].map((item, index) => (
              <div key={index} className="rounded-lg border p-3 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

// ─── Teacher Dashboard Section ───────────────────────────────────────
function TeacherDashboardSection({ classes, assignments }: { classes?: any[]; assignments?: any[] }) {
  const upcomingDeadlines = assignments
    ?.filter((a) => a.status === "published")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4) ?? [];

  const recentActivity = [
    "New assignment 'Database Normalization' was published.",
    "3 students submitted 'UI Prototype Review'.",
    "Class CS202 has been updated with new schedule details.",
    "Feedback added for 'Network Design Proposal'.",
  ];

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your classes and assignments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary" />
                  <p className="text-sm text-muted-foreground">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Keep track of important due dates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDeadlines.length > 0 ? (
              upcomingDeadlines.map((a) => (
                <div key={a.id} className="rounded-lg border p-3">
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(a.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <StatusBadge status={a.status} />
                </div>
              ))
            ) : (
              <EmptyState message="No upcoming deadlines." />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>Classes you are teaching.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {classes && classes.length > 0 ? (
              classes.slice(0, 4).map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.code} · {c.studentCount} students</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))
            ) : (
              <EmptyState message="No classes assigned yet." />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Snapshot</CardTitle>
            <CardDescription>Quick stats for productivity and completion.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Assignments Completed", value: "82%" },
              { label: "On-Time Submission Rate", value: "91%" },
              { label: "Average Review Turnaround", value: "2.1 days" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-4/5 rounded-full bg-primary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

// ─── Student Dashboard Section ───────────────────────────────────────
function StudentDashboardSection({ assignments, submissions }: { assignments?: any[]; submissions?: any[] }) {
  const upcomingAssignments = assignments
    ?.filter((a) => a.status === "published")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4) ?? [];

  const recentSubmissions = submissions?.slice(-4).reverse() ?? [];

  return (
    <>
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
              <CardDescription>Your latest assignment submissions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentSubmissions.length > 0 ? (
                recentSubmissions.map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <p className="font-medium text-sm">{s.assignmentName ?? "Assignment"}</p>
                      <p className="text-xs text-muted-foreground">
                        {s.submittedAt
                          ? `Submitted ${new Date(s.submittedAt).toLocaleDateString()}`
                          : "Not yet submitted"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {s.grade != null && (
                        <span className="text-sm font-semibold">{s.grade}/{s.maxPoints}</span>
                      )}
                      <StatusBadge status={s.status} />
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState message="No submissions yet." />
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>Keep track of important due dates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAssignments.length > 0 ? (
              upcomingAssignments.map((a) => (
                <div key={a.id} className="rounded-lg border p-3">
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(a.dueDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <StatusBadge status={a.status} />
                </div>
              ))
            ) : (
              <EmptyState message="No upcoming assignments." />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Snapshot</CardTitle>
            <CardDescription>Quick stats for your productivity and completion.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Assignments Completed", value: "82%" },
              { label: "On-Time Submission Rate", value: "91%" },
              { label: "Average Grade", value: "87%" },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 w-4/5 rounded-full bg-primary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>Important notices from your classes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "System maintenance scheduled this weekend.",
              "Teachers can now upload optional assignment attachments.",
              "Students: reminder to complete pending submissions before deadline.",
            ].map((item, index) => (
              <div key={index} className="rounded-lg border p-3 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
      <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
