// app/(dashboard)/teacher/assignments/page.tsx
"use client"

import { useState } from "react"
import { Plus, Search, Filter, Trash2, Eye, Edit2, Users, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PageHeader } from "@/components/shared/page-header"
import { PageShell } from "@/components/shared/page-shell"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { useAssignments, useDeleteAssignment } from "@/lib/hooks/queries/useAssignments"
import { AssignmentFilters, AssignmentStatus } from "@/lib/types/assignment"

export default function TeacherAssignmentsPage() {
  const [filters, setFilters] = useState<AssignmentFilters>({ status: 'all' })
  const [deleteDialogId, setDeleteDialogId] = useState<number | null>(null)

  const { data: assignments = [], isLoading } = useAssignments(filters)
  const deleteAssignment = useDeleteAssignment()

  const handleFilterChange = (key: keyof AssignmentFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value === 'all' ? undefined : value }))
  }

  const handleDelete = (id: number) => {
    deleteAssignment.mutate(id, {
      onSuccess: () => {
        setDeleteDialogId(null)
      },
    })
  }

  const totalSubmissions = assignments.reduce((sum, a) => sum + (a.submissionCount || 0), 0)
  const totalGraded = assignments.reduce((sum, a) => sum + (a.gradedCount || 0), 0)
  const totalPending = assignments.reduce((sum, a) => sum + (a.pendingCount || 0), 0)
  const publishedCount = assignments.filter(a => a.status === 'published').length
  const draftCount = assignments.filter(a => a.status === 'draft').length

  return (
    <PageShell>
      <PageHeader
        title="Assignments"
        description="Create, manage, and track assignments for all your classes"
        action={
          <Link href="/teacher/assignments/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </Link>
        }
      />

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Assignments"
          value={assignments.length}
          subtitle={`${publishedCount} published, ${draftCount} drafts`}
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Total Submissions"
          value={totalSubmissions}
          subtitle="From all assignments"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Graded"
          value={totalGraded}
          subtitle="Completed reviews"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatCard
          title="Pending Review"
          value={totalPending}
          subtitle="Awaiting grading"
          icon={<Clock className="h-4 w-4" />}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            className="pl-9"
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) => handleFilterChange('status', value as AssignmentStatus | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Assignments List */}
      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : assignments.length === 0 ? (
        <div className="text-center py-12">
          <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No assignments found</h3>
          <p className="text-muted-foreground mb-4">
            Create your first assignment to get started
          </p>
          <Link href="/teacher/assignments/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Assignment
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {assignments.map((assignment) => {
            const isPastDue = new Date(assignment.dueDate) < new Date()
            
            return (
              <div
                key={assignment.id}
                className="glass-card p-6 transition-all hover:shadow-lg"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">
                          {assignment.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <Badge variant="secondary">{assignment.className}</Badge>
                          <StatusBadge status={assignment.status} />
                          {isPastDue && assignment.status === 'published' && (
                            <Badge variant="destructive">Past Due</Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {assignment.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                      </div>
                      {assignment.submissionCount !== undefined && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>
                            {assignment.gradedCount || 0}/{assignment.submissionCount} graded
                          </span>
                        </div>
                      )}
                      {assignment.pendingCount && assignment.pendingCount > 0 && (
                        <Badge variant="default">
                          {assignment.pendingCount} pending
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/teacher/assignments/${assignment.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-4 w-4" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/teacher/assignments/${assignment.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit2 className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeleteDialogId(assignment.id)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteDialogId} onOpenChange={(open) => !open && setDeleteDialogId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Assignment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assignment? This action cannot be undone and will remove all associated submissions.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteDialogId && handleDelete(deleteDialogId)}
              disabled={deleteAssignment.isPending}
            >
              {deleteAssignment.isPending ? 'Deleting...' : 'Delete Assignment'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
