// app/(dashboard)/admin/users/page.tsx
"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, X, Search, Power, ShieldOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell } from "@/components/shared/page-shell";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { StatCard } from "@/components/shared/stat-card";

import { useUsers, useCreateUser, useUpdateUser, useDeleteUser, useActivateUser, useDeactivateUser } from "@/lib/hooks/queries/useUsers";
import type { ApiUser } from "@/lib/api/users";
import type { UserRole, UserStatus } from "@/lib/types/user";

export default function AdminUsersPage() {
  const { data: users = [], isLoading } = useUsers({});
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();
  const activateUserFn = useActivateUser();
  const deactivateUserFn = useDeactivateUser();

  // We need the update hook with a dynamic ID. Use a ref pattern.
  const [updateUserId, setUpdateUserId] = useState<string | undefined>(undefined);
  const updateUser = useUpdateUser(updateUserId);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ApiUser | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "student" as UserRole,
    status: "active" as UserStatus,
    password: "",
  });

  const resetForm = () => {
    setFormData({ fullName: "", email: "", role: "student", status: "active", password: "" });
    setEditingUser(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (user: ApiUser) => {
    setFormData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      status: user.status,
      password: "",
    });
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSaveUser = () => {
    if (!formData.fullName.trim() || !formData.email.trim()) {
      alert("Please fill in name and email");
      return;
    }

    if (editingUser) {
      setUpdateUserId(editingUser.id);
      updateUser.mutate(
        {
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role,
          status: formData.status,
        },
        { onSuccess: () => closeModal() }
      );
    } else {
      if (!formData.password.trim()) {
        alert("Password is required for new users");
        return;
      }
      createUser.mutate(
        {
          fullName: formData.fullName,
          email: formData.email,
          role: formData.role,
          password: formData.password,
        },
        { onSuccess: () => closeModal() }
      );
    }
  };

  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser.mutate(id);
    }
  };

  const handleToggleStatus = (user: ApiUser) => {
    if (user.status === "active") {
      deactivateUserFn.mutate(user.id);
    } else {
      activateUserFn.mutate(user.id);
    }
  };

  const filteredUsers = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (statusFilter !== "all" && u.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    admins: users.filter((u) => u.role === "admin").length,
    teachers: users.filter((u) => u.role === "teacher").length,
    students: users.filter((u) => u.role === "student").length,
  };

  return (
    <PageShell>
      <PageHeader
        title="User Management"
        description="Manage all users in the system: create, edit, activate, deactivate, and delete."
        action={
          <Button onClick={openAddModal}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        }
      />

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Users" value={stats.total} subtitle="Across all roles" />
        <StatCard title="Active Users" value={stats.active} subtitle="Currently active" />
        <StatCard title="Teachers" value={stats.teachers} subtitle="Teaching staff" />
        <StatCard title="Students" value={stats.students} subtitle="Enrolled students" />
      </div>

      {/* Filters */}
      <SectionCard title="Filters">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <select
            className="rounded-xl border border-border bg-background px-4 py-2 text-sm"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
          <select
            className="rounded-xl border border-border bg-background px-4 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as UserStatus | "all")}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </SectionCard>

      {/* User Table */}
      <SectionCard title="Users">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left">
            <thead className="border-b border-border/60">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Last Login</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        {user.fullName}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        variant={user.role === "admin" ? "info" : user.role === "teacher" ? "success" : "warning"}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : "Never"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => openEditModal(user)}
                          title="Edit user"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant={user.status === "active" ? "outline" : "default"}
                          onClick={() => handleToggleStatus(user)}
                          title={user.status === "active" ? "Deactivate" : "Activate"}
                        >
                          {user.status === "active" ? (
                            <ShieldOff className="h-4 w-4" />
                          ) : (
                            <Power className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete user"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-background p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingUser ? "Edit User" : "Add User"}
              </h2>
              <button onClick={closeModal}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="modal-fullName">Full Name</Label>
                <Input
                  id="modal-fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="modal-email">Email</Label>
                <Input
                  id="modal-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>

              {!editingUser && (
                <div>
                  <Label htmlFor="modal-password">Password</Label>
                  <Input
                    id="modal-password"
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, password: e.target.value }))
                    }
                  />
                </div>
              )}

              <div>
                <Label htmlFor="modal-role">Role</Label>
                <select
                  id="modal-role"
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      role: e.target.value as UserRole,
                    }))
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>

              {editingUser && (
                <div>
                  <Label htmlFor="modal-status">Status</Label>
                  <select
                    id="modal-status"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as UserStatus,
                      }))
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={closeModal}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveUser}
                  disabled={createUser.isPending}
                >
                  {createUser.isPending
                    ? "Saving..."
                    : editingUser
                      ? "Update User"
                      : "Save User"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
