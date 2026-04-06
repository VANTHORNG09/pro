// components/app-shell/app-sidebar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { navigationByRole } from "@/lib/data/navigation";
import type { UserRole } from "@/lib/types/user";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  role: UserRole;
  open: boolean;
  onClose: () => void;
}

export function AppSidebar({ role, open, onClose }: AppSidebarProps) {
  const pathname = usePathname();
  const navigation = navigationByRole[role];

  return (
    <>
      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 border-r border-border/60 bg-background/95 p-4 backdrop-blur-xl transition-transform duration-300 md:static md:z-auto md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="mb-6 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold">
                AB
              </div>
              <div>
                <p className="text-sm font-semibold">AssignBridge</p>
                <p className="text-xs text-muted-foreground">Academic Workspace</p>
              </div>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X className="size-5" />
            </Button>
          </div>

          <nav className="flex-1 space-y-2">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-6 rounded-2xl border border-border/60 bg-muted/40 p-4">
            <p className="text-sm font-semibold">AssignBridge Pro UI</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Role-based academic dashboard interface ready for backend integration.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}