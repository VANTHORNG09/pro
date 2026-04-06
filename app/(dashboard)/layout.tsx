// app/(dashboard)/layout.tsx
"use client";

import * as React from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const currentRole = user?.role ?? "student";
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const handleToggleSidebar = React.useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        <Sidebar
          role={currentRole}
          collapsed={sidebarCollapsed}
          onToggleCollapse={handleToggleSidebar}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar role={currentRole} />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
