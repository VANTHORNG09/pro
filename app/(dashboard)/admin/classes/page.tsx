// app/(dashboard)/admin/classes/page.tsx
"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, X, Search, Users, BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageShell } from "@/components/shared/page-shell";
import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { StatCard } from "@/components/shared/stat-card";

import {
  useClasses,
  useCreateClass,
  useUpdateClass,
  useDeleteClass,
} from "@/lib/hooks/queries/useClasses";
import { useClassStudents, useEnrollStudent, useRemoveStudent } from "@/lib/hooks/queries/useClasses";
import { useUsers } from "@/lib/hooks/queries/useUsers";
import type { Class, ClassStatus, CreateClassData } from "@/lib/types/classes";
import type { ApiUser } from "@/lib/api/users";

export default function AdminClassesPage() {
  const { data: classes = [], isLoading } = useClasses({});
  const createClass = useCreateClass();
  const deleteClass = useDeleteClass();

  // Dynamic update hook with ID state
  const [updateClassId, setUpdateClassId] = useState<number | undefined>(undefined);
  const updateClass = useUpdateClass(updateClassId);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClassStatus | "all">("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [managingClass, setManagingClass] = useState<Class | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    subject: "",
    teacherId: "",
    status: "active" as ClassStatus,
    schedule: "",
    room: "",
    semester: "",
    year: new Date().getFullYear(),
  });

  const [studentEmail, setStudentEmail] = useState("");

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      subject: "",
      teacherId: "",
      status: "active",
      schedule: "",
      room: "",
      semester: "",
      year: new Date().getFullYear(),
    });
    setEditingClass(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (cls: Class) => {
    setFormData({
      name: cls.name,
      code: cls.code,
      description: cls.description,
      subject: cls.subject,
      teacherId: cls.teacherId.toString(),
      status: cls.status,
      schedule: cls.schedule ?? "",
      room: cls.room ?? "",
      semester: cls.semester ?? "",
      year: cls.year ?? new Date().getFullYear(),
    });
    setEditingClass(cls);
    setIsModalOpen(true);
  };

  const openManageStudents = (cls: Class) => {
    setManagingClass(cls);
    setStudentEmail("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const closeManageStudents = () => {
    setManagingClass(null);
    setStudentEmail("");
  };

  const handleSaveClass = () => {
    if (!formData.name.trim() || !formData.code.trim()) {
      alert("Please fill in class name and code");
      return;
    }

    const payload: CreateClassData = {
      name: formData.name,
      code: formData.code,
      description: formData.description,
      subject: formData.subject,
      schedule: formData.schedule || undefined,
      room: formData.room || undefined,
      semester: formData.semester || undefined,
      year: formData.year || undefined,
    };

    if (editingClass) {
      setUpdateClassId(editingClass.id);
      updateClass.mutate(
        { ...payload, status: formData.status },
        { onSuccess: () => closeModal() }
      );
    } else {
      createClass.mutate(payload, { onSuccess: () => closeModal() });
    }
  };

  const handleDeleteClass = (id: number) => {
    if (confirm("Are you sure you want to delete this class?")) {
      deleteClass.mutate(id);
    }
  };

  const filteredClasses = classes.filter((c) => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.teacherName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalStudents = classes.reduce((sum, c) => sum + c.studentCount, 0);
  const activeClasses = classes.filter((c) => c.status === "active").length;

  return (
    <PageShell>
      <PageHeader
        title="Class Management"
        description="Manage all classes: create, assign teachers, add/remove students, and edit details."
        action={
          <Button onClick={openAddModal}>
            <Plus className="mr-2 h-4 w-4" />
            Add Class
          </Button>
        }
      />

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Classes" value={classes.length} subtitle="All classes" />
        <StatCard title="Active Classes" value={activeClasses} subtitle="Currently active" />
        <StatCard title="Total Students" value={totalStudents} subtitle="Across all classes" icon={<Users className="h-4 w-4" />} />
        <StatCard title="Total Assignments" value={classes.reduce((s, c) => s + c.assignmentCount, 0)} subtitle="Created assignments" icon={<BookOpen className="h-4 w-4" />} />
      </div>

      {/* Filters */}
      <SectionCard title="Filters">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by class name, code, or teacher..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <select
            className="rounded-xl border border-border bg-background px-4 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ClassStatus | "all")}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </SectionCard>

      {/* Class Table */}
      <SectionCard title="Classes">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left">
            <thead className="border-b border-border/60">
              <tr>
                <th className="px-4 py-3">Class</th>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Teacher</th>
                <th className="px-4 py-3">Students</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-sm text-muted-foreground">
                    Loading classes...
                  </td>
                </tr>
              ) : filteredClasses.length > 0 ? (
                filteredClasses.map((c) => (
                  <tr key={c.id} className="border-b border-border/20">
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-sm font-mono">{c.code}</td>
                    <td className="px-4 py-3 text-sm">{c.teacherName}</td>
                    <td className="px-4 py-3 text-sm">{c.studentCount}</td>
                    <td className="px-4 py-3 text-sm">{c.subject}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => openManageStudents(c)}
                          title="Manage students"
                        >
                          <Users className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => openEditModal(c)}
                          title="Edit class"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDeleteClass(c.id)}
                          title="Delete class"
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
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-muted-foreground"
                  >
                    No classes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Add / Edit Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-background p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {editingClass ? "Edit Class" : "Add Class"}
              </h2>
              <button onClick={closeModal}>
                <X className="h-5 w-5" />
              </button>
            </div>

            <TeacherSelector
              value={formData.teacherId}
              onChange={(val) => setFormData((prev) => ({ ...prev, teacherId: val }))}
            />

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="cls-name">Class Name</Label>
                <Input
                  id="cls-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cls-code">Class Code</Label>
                <Input
                  id="cls-code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, code: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cls-subject">Subject</Label>
                <Input
                  id="cls-subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, subject: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cls-room">Room</Label>
                <Input
                  id="cls-room"
                  value={formData.room}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, room: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cls-semester">Semester</Label>
                <Input
                  id="cls-semester"
                  value={formData.semester}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, semester: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cls-schedule">Schedule</Label>
                <Input
                  id="cls-schedule"
                  value={formData.schedule}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, schedule: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cls-year">Year</Label>
                <Input
                  id="cls-year"
                  type="number"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      year: parseInt(e.target.value) || new Date().getFullYear(),
                    }))
                  }
                />
              </div>

              {editingClass && (
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="cls-status">Status</Label>
                  <select
                    id="cls-status"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as ClassStatus,
                      }))
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              )}

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="cls-desc">Description</Label>
                <textarea
                  id="cls-desc"
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button onClick={handleSaveClass}>
                {editingClass ? "Update Class" : "Save Class"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Students Modal */}
      {managingClass && (
        <ManageStudentsModal
          classItem={managingClass}
          onClose={closeManageStudents}
        />
      )}
    </PageShell>
  );
}

// ─── Teacher Selector Sub-Component ───────────────────────────────────
function TeacherSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const { data: users = [], isLoading } = useUsers({ role: "teacher" });

  return (
    <div className="space-y-2">
      <Label htmlFor="cls-teacher">Assign Teacher</Label>
      <select
        id="cls-teacher"
        className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Select a teacher...</option>
        {isLoading ? (
          <option disabled>Loading teachers...</option>
        ) : (
          users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.fullName} ({u.email})
            </option>
          ))
        )}
      </select>
    </div>
  );
}

// ─── Manage Students Modal ────────────────────────────────────────────
function ManageStudentsModal({
  classItem,
  onClose,
}: {
  classItem: Class;
  onClose: () => void;
}) {
  const { data: students = [], isLoading } = useClassStudents(classItem.id);
  const enrollStudent = useEnrollStudent();
  const removeStudent = useRemoveStudent();
  const { data: allUsers = [] } = useUsers({ role: "student" });

  const [studentEmail, setStudentEmail] = useState("");
  const [searchStudent, setSearchStudent] = useState("");

  const handleEnroll = () => {
    const student = allUsers.find((u) => u.email === studentEmail.trim());
    if (!student) {
      alert("Student not found with that email.");
      return;
    }
    enrollStudent.mutate(
      { classId: classItem.id, studentId: parseInt(student.id) },
      { onSuccess: () => setStudentEmail("") }
    );
  };

  const handleRemove = (studentId: number) => {
    removeStudent.mutate({ classId: classItem.id, studentId });
  };

  const filteredStudents = students.filter((s) => {
    if (!searchStudent) return true;
    const q = searchStudent.toLowerCase();
    return (
      s.studentName.toLowerCase().includes(q) ||
      s.studentEmail.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-background p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Manage Students</h2>
            <p className="text-sm text-muted-foreground">{classItem.name} ({classItem.code})</p>
          </div>
          <button onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Enroll Student */}
        <SectionCard title="Enroll Student">
          <div className="flex gap-2">
            <select
              className="flex-1 rounded-xl border border-border bg-background px-4 py-2 text-sm"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
            >
              <option value="">Select a student...</option>
              {allUsers
                .filter(
                  (u) =>
                    !students.some((s) => s.studentEmail === u.email)
                )
                .map((u) => (
                  <option key={u.id} value={u.email}>
                    {u.fullName} ({u.email})
                  </option>
                ))}
            </select>
            <Button onClick={handleEnroll} disabled={!studentEmail}>
              Enroll
            </Button>
          </div>
        </SectionCard>

        {/* Student List */}
        <SectionCard
          title="Enrolled Students"
          action={
            <Input
              placeholder="Search..."
              className="w-48"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
            />
          }
        >
          {isLoading ? (
            <p className="py-4 text-center text-sm text-muted-foreground">Loading students...</p>
          ) : filteredStudents.length > 0 ? (
            <div className="space-y-2">
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                      {s.studentName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{s.studentName}</p>
                      <p className="text-xs text-muted-foreground">{s.studentEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={s.status} />
                    {s.grade != null && (
                      <span className="text-xs font-medium">Grade: {s.grade}</span>
                    )}
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleRemove(s.studentId)}
                      title="Remove student"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No students enrolled yet.
            </p>
          )}
        </SectionCard>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
