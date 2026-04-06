// components/app-shell/app-header.tsx
"use client";

import * as React from "react";
import { Bell, Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import type { UserRole } from "@/lib/types/user";

interface AppHeaderProps {
  role: UserRole;
  onMenuClick?: () => void;
}

const roleMap: Record<UserRole, { label: string; variant: "info" | "success" | "warning" }> = {
  admin: { label: "Admin", variant: "info" },
  teacher: { label: "Teacher", variant: "success" },
  student: { label: "Student", variant: "warning" },
};

export function AppHeader({ role, onMenuClick }: AppHeaderProps) {
  const roleConfig = roleMap[role];

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onMenuClick}
            aria-label="Open sidebar"
          >
            <Menu className="size-5" />
          </Button>

          <div className="hidden md:block">
            <p className="text-sm text-muted-foreground">Welcome back</p>
            <h2 className="text-base font-semibold">AssignBridge Workspace</h2>
          </div>
        </div>

        <div className="hidden max-w-md flex-1 md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search classes, assignments..."
              className="h-10 w-full rounded-xl border border-border/60 bg-background pl-10 pr-4 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <StatusBadge label={roleConfig.label} variant={roleConfig.variant} />

          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="size-5" />
          </Button>

          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background px-3 py-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              AV
            </div>
            <div className="hidden text-left md:block">
              <p className="text-sm font-medium leading-none">Vanthorng</p>
              <p className="mt-1 text-xs text-muted-foreground">
                assignbridge@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}