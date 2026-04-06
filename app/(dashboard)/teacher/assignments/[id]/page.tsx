// app/(dashboard)/teacher/assignments/[id]/page.tsx
"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Edit, Trash2, Eye, Users, Calendar, FileText, Download } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PageShell } from "@/components/shared/page-shell"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { SectionCard } from "@/components/shared/section-card"
import { useAssignment, useDeleteAssignment, usePublishAssignment, useCloseAssignment } from "@/lib/hooks/queries/useAssignments"

export default function TeacherAssignmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const assignmentId = parseInt(params.id as string)

  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  const { data: assignment, isLoading } = useAssignment(assignmentId)
  const deleteAssignment = useDeleteAssignment()
  const publishAssignment = usePublishAssignment()
  const closeAssignment = useCloseAssignment()

  const handleDelete = () => {
    deleteAssignment.mutate(assignmentId, {
      onSuccess: () => {
        router.push('/teacher/assignments')
      },
    })
  }

  const handlePublish = () => {
    publishAssignment.mutate(assignmentId)
  }

  const handleClose = () => {
    if (confirm('Are you sure you want to close this assignment? Students will no longer be able to submit.')) {
      closeAssignment.mutate(assignmentId)
    }
  }

  if (isLoading) {
    return (
      <PageShell>
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-32 bg-muted rounded"></div>
            <div className="h-32 bg-muted rounded"></div>
          </div>
        </div>
      </PageShell>
    )
  }

  if (!assignment) {
    return (
      <PageShell>
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Assignment not found</h3>
          <Link href="/teacher/assignments">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Assignments
            </Button>
          </Link>
        </div>
      </PageShell>
    )
  }

  const isPastDue = new Date(assignment.dueDate) < new Date()
  const submissionRate = assignment.submissionCount 
    ? ((assignment.gradedCount || 0) / assignment.submissionCount) * 100 
    : 0

  return (
    <PageShell>
      {/* Header with Actions */}
      <div className="mb-6">
        <Link href="/teacher/assignments">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Assignments
          </Button>
        </Link>
        
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-start gap-3 mb-2">
              <h1 className="text-3xl font-bold">{assignment.title}</h1>
              <StatusBadge status={assignment.status} />
              {isPastDue && assignment.status === 'published' && (
                <Badge variant="destructive">Past Due</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary">{assignment.className}</Badge>
              <span>•</span>
              <span>{assignment.teacherName}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowPreview(true)}>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Link href={`/teacher/assignments/${assignment.id}/edit`}>
              <Button variant="outline">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
            {assignment.status === 'draft' && (
              <Button onClick={handlePublish} disabled={publishAssignment.isPending}>
                Publish
              </Button>
            )}
            {assignment.status === 'published' && (
              <Button variant="destructive" onClick={handleClose} disabled={closeAssignment.isPending}>
                Close Assignment
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Students"
          value={assignment.submissionCount || 0}
          subtitle="Enrolled in class"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Submissions"
          value={assignment.gradedCount || 0}
          subtitle={`${assignment.pendingCount || 0} pending`}
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Graded"
          value={assignment.gradedCount || 0}
          subtitle={`${submissionRate.toFixed(0)}% graded`}
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Due Date"
          value={new Date(assignment.dueDate).toLocaleDateString()}
          subtitle={new Date(assignment.dueDate).toLocaleTimeString()}
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>

      {/* Assignment Details */}
      <div className="space-y-6">
        {/* Description */}
        <SectionCard title="Description" description="Assignment overview">
          <p className="text-muted-foreground">{assignment.description}</p>
        </SectionCard>

        {/* Instructions */}
        <SectionCard title="Instructions" description="Detailed instructions for students">
          <div className="whitespace-pre-wrap text-muted-foreground">
            {assignment.instructions}
          </div>
        </SectionCard>

        {/* Assignment Settings */}
        <SectionCard title="Settings" description="Assignment configuration">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Maximum Points</p>
              <p className="text-2xl font-bold">{assignment.maxPoints}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Max File Size</p>
              <p className="text-2xl font-bold">{(assignment.maxFileSize / 1024 / 1024).toFixed(0)} MB</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground mb-1">Created</p>
              <p className="text-lg font-semibold">
                {new Date(assignment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {assignment.allowedFileTypes && assignment.allowedFileTypes.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Allowed File Types</p>
              <div className="flex flex-wrap gap-2">
                {assignment.allowedFileTypes.map(ext => (
                  <Badge key={ext} variant="outline" className="font-mono">
                    {ext}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </SectionCard>

        {/* Quick Actions */}
        <SectionCard title="Quick Actions" description="Manage this assignment">
          <div className="flex flex-wrap gap-3">
            <Link href={`/teacher/assignments/${assignment.id}/submissions`}>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                View Submissions
              </Button>
            </Link>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download All Submissions
            </Button>
            <Button
              variant="destructive"
              onClick={() => setShowDeleteDialog(true)}
              disabled={deleteAssignment.isPending}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Assignment
            </Button>
          </div>
        </SectionCard>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assignment Preview</DialogTitle>
            <DialogDescription>
              This is how students see the assignment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{assignment.title}</h2>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">{assignment.className}</Badge>
                <StatusBadge status={assignment.status} />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{assignment.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Instructions</h3>
              <div className="whitespace-pre-wrap text-muted-foreground">
                {assignment.instructions}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <div>
                <p className="text-sm font-medium">Due Date</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(assignment.dueDate).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">Maximum Points</p>
                <p className="text-2xl font-bold">{assignment.maxPoints}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">Max File Size</p>
                <p className="text-2xl font-bold">{(assignment.maxFileSize / 1024 / 1024).toFixed(0)} MB</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Assignment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this assignment? This action cannot be undone and will remove all associated submissions and grades.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
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
