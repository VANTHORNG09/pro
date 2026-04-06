"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Search,
  Menu,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppTheme } from "@/components/providers/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type UserRole = "admin" | "teacher" | "student";

interface TopbarProps {
  role?: UserRole;
  userName?: string;
  userEmail?: string;
  userInitials?: string;
  notificationCount?: number;
  onMenuClick?: () => void;
  onSearch?: (value: string) => void;
  onNotificationsClick?: () => void;
  onLogout?: () => void;
}

export function Topbar({
  role = "student",
  userName = "AssignBridge User",
  userEmail = "user@assignbridge.com",
  userInitials = "AB",
  notificationCount = 3,
  onMenuClick,
  onSearch,
  onNotificationsClick,
  onLogout,
}: TopbarProps) {
  const { theme, toggleTheme } = useAppTheme();
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearch?.(value);
  };

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
      {/* Mobile Menu */}
      <Button
        variant="outline"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open sidebar menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Search (Desktop) */}
      <div className="hidden max-w-xl flex-1 md:flex">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9"
            placeholder="Search classes, assignments, users..."
          />
        </div>
      </div>

      {/* Search Icon (Mobile) */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </Button>

      {/* Right Actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          onClick={onNotificationsClick}
          aria-label="Open notifications"
        >
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-3 rounded-full border px-2 py-1.5 transition-colors hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Open user menu"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {userInitials}
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="mt-1 text-xs text-muted-foreground">{roleLabel}</p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64">
            {/* User Info */}
            <div className="px-2 py-2">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
              <p className="mt-1 text-xs font-medium text-primary">{roleLabel}</p>
            </div>

            <DropdownMenuSeparator />

            {/* Menu Links */}
            <DropdownMenuItem asChild>
              <Link
                href={`/${role}/dashboard`}
                className="flex cursor-pointer items-center"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href={`/${role}/profile`}
                className="flex cursor-pointer items-center"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href={`/${role}/settings`}
                className="flex cursor-pointer items-center"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={onLogout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}