// app/(dashboard)/teacher/assignments/[id]/edit/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, FileText, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
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
import { SectionCard } from "@/components/shared/section-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { useAssignment, useUpdateAssignment } from "@/lib/hooks/queries/useAssignments"
import { AssignmentStatus } from "@/lib/types/assignment"

const ALLOWED_FILE_TYPES = [
  '.pdf', '.doc', '.docx', '.txt',
  '.jpg', '.jpeg', '.png', '.gif',
  '.zip', '.rar',
  '.py', '.js', '.ts', '.jsx', '.tsx', '.java', '.cpp', '.html', '.css'
]

export default function EditAssignmentPage() {
  const params = useParams()
  const router = useRouter()
  const assignmentId = parseInt(params.id as string)

  const { data: assignment, isLoading: isLoadingAssignment } = useAssignment(assignmentId)
  const updateAssignment = useUpdateAssignment(assignmentId)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructions: '',
    dueDate: '',
    dueTime: '23:59',
    maxPoints: 100,
    allowedFileTypes: ALLOWED_FILE_TYPES,
    maxFileSize: 10,
    status: 'draft' as AssignmentStatus,
  })

  const [showPreview, setShowPreview] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (assignment) {
      const dueDate = new Date(assignment.dueDate)
      setFormData({
        title: assignment.title,
        description: assignment.description,
        instructions: assignment.instructions,
        dueDate: dueDate.toISOString().split('T')[0],
        dueTime: dueDate.toTimeString().slice(0, 5),
        maxPoints: assignment.maxPoints,
        allowedFileTypes: assignment.allowedFileTypes,
        maxFileSize: assignment.maxFileSize / 1024 / 1024,
        status: assignment.status,
      })
    }
  }, [assignment])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.instructions.trim()) {
      newErrors.instructions = 'Instructions are required'
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required'
    } else {
      const dueDateTime = new Date(`${formData.dueDate}T${formData.dueTime}`)
      if (dueDateTime <= new Date()) {
        newErrors.dueDate = 'Due date must be in the future'
      }
    }

    if (formData.maxPoints < 0) {
      newErrors.maxPoints = 'Max points must be 0 or greater'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent, saveAsDraft: boolean = false) => {
    e.preventDefault()

    if (!saveAsDraft && !validateForm()) {
      return
    }

    const dueDateTime = new Date(`${formData.dueDate}T${formData.dueTime}`)

    const updateData = {
      title: formData.title,
      description: formData.description,
      instructions: formData.instructions,
      dueDate: dueDateTime.toISOString(),
      maxPoints: formData.maxPoints,
      allowedFileTypes: formData.allowedFileTypes,
      maxFileSize: formData.maxFileSize * 1024 * 1024,
      status: saveAsDraft ? 'draft' : formData.status,
    }

    updateAssignment.mutate(updateData, {
      onSuccess: () => {
        router.push(`/teacher/assignments/${assignmentId}`)
      },
    })
  }

  const toggleFileType = (ext: string) => {
    setFormData(prev => ({
      ...prev,
      allowedFileTypes: prev.allowedFileTypes.includes(ext)
        ? prev.allowedFileTypes.filter(t => t !== ext)
        : [...prev.allowedFileTypes, ext]
    }))
  }

  if (isLoadingAssignment) {
    return (
      <PageShell>
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-muted rounded w-1/3"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
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

  return (
    <PageShell>
      <PageHeader
        title="Edit Assignment"
        description={`Editing: ${assignment.title}`}
        action={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(true)}
              disabled={!formData.title}
            >
              <Info className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Link href={`/teacher/assignments/${assignmentId}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </Link>
          </div>
        }
      />

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
        {/* Basic Information */}
        <SectionCard
          title="Basic Information"
          description="Assignment title and description"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Assignment Title *</Label>
              <Input
                id="title"
                placeholder="Assignment 1: Database Design"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the assignment..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
        </SectionCard>

        {/* Instructions */}
        <SectionCard
          title="Detailed Instructions"
          description="Comprehensive instructions for students"
        >
          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions *</Label>
            <Textarea
              id="instructions"
              placeholder="Detailed assignment instructions, requirements, and grading criteria..."
              value={formData.instructions}
              onChange={(e) => setFormData(prev => ({ ...prev, instructions: e.target.value }))}
              rows={10}
              className={errors.instructions ? 'border-red-500' : ''}
            />
            {errors.instructions && (
              <p className="text-sm text-red-500">{errors.instructions}</p>
            )}
          </div>
        </SectionCard>

        {/* Due Date & Time */}
        <SectionCard
          title="Due Date & Time"
          description="When is this assignment due?"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className={errors.dueDate ? 'border-red-500' : ''}
              />
              {errors.dueDate && (
                <p className="text-sm text-red-500">{errors.dueDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueTime">Due Time</Label>
              <Input
                id="dueTime"
                type="time"
                value={formData.dueTime}
                onChange={(e) => setFormData(prev => ({ ...prev, dueTime: e.target.value }))}
              />
            </div>
          </div>
          {formData.dueDate && (
            <div className="mt-4 p-3 rounded-lg bg-muted/50 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Due: {new Date(`${formData.dueDate}T${formData.dueTime}`).toLocaleString()}
              </span>
            </div>
          )}
        </SectionCard>

        {/* Grading */}
        <SectionCard
          title="Grading Settings"
          description="Configure point values and grading criteria"
        >
          <div className="space-y-2">
            <Label htmlFor="maxPoints">Maximum Points</Label>
            <Input
              id="maxPoints"
              type="number"
              min="0"
              value={formData.maxPoints}
              onChange={(e) => setFormData(prev => ({ ...prev, maxPoints: parseInt(e.target.value) || 0 }))}
              className={errors.maxPoints ? 'border-red-500' : ''}
            />
            {errors.maxPoints && (
              <p className="text-sm text-red-500">{errors.maxPoints}</p>
            )}
          </div>
        </SectionCard>

        {/* File Upload Settings */}
        <SectionCard
          title="File Upload Settings"
          description="Configure what file types students can upload"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Maximum File Size (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                min="1"
                max="100"
                value={formData.maxFileSize}
                onChange={(e) => setFormData(prev => ({ ...prev, maxFileSize: parseInt(e.target.value) || 10 }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Allowed File Types</Label>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {ALLOWED_FILE_TYPES.map((ext) => (
                  <button
                    key={ext}
                    type="button"
                    onClick={() => toggleFileType(ext)}
                    className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                      formData.allowedFileTypes.includes(ext)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {ext}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Status & Actions */}
        <SectionCard
          title="Publishing Options"
          description="Current status: <StatusBadge status={assignment.status} />"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, true)}
              disabled={updateAssignment.isPending}
            >
              <FileText className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={updateAssignment.isPending}
            >
              {updateAssignment.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </SectionCard>
      </form>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Assignment Preview</DialogTitle>
            <DialogDescription>
              This is how students will see the assignment
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">{formData.title || 'Untitled Assignment'}</h2>
              <div className="flex gap-2 mb-4">
                <Badge variant="secondary">{assignment.className}</Badge>
                <StatusBadge status={formData.status} />
              </div>
            </div>

            {formData.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{formData.description}</p>
              </div>
            )}

            {formData.instructions && (
              <div>
                <h3 className="font-semibold mb-2">Instructions</h3>
                <div className="whitespace-pre-wrap text-muted-foreground">
                  {formData.instructions}
                </div>
              </div>
            )}

            {formData.dueDate && (
              <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(`${formData.dueDate}T${formData.dueTime}`).toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">Maximum Points</p>
                <p className="text-2xl font-bold">{formData.maxPoints}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-sm font-medium">Max File Size</p>
                <p className="text-2xl font-bold">{formData.maxFileSize} MB</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowPreview(false)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageShell>
  )
}
