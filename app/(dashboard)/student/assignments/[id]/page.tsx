// app/(dashboard)/student/assignments/[id]/page.tsx
"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Calendar, FileText, Upload, Download, Clock, AlertTriangle, CheckCircle, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { PageShell } from "@/components/shared/page-shell"
import { SectionCard } from "@/components/shared/section-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { StatCard } from "@/components/shared/stat-card"
import { useAssignment } from "@/lib/hooks/queries/useAssignments"
import { useMySubmission, useSubmitAssignment } from "@/lib/hooks/queries/useSubmissions"

export default function StudentAssignmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const assignmentId = parseInt(params.id as string)

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [comments, setComments] = useState('')

  const { data: assignment, isLoading: isLoadingAssignment } = useAssignment(assignmentId)
  const { data: mySubmission } = useMySubmission(assignmentId)
  const submitMutation = useSubmitAssignment()

  const isPastDue = assignment ? new Date(assignment.dueDate) < new Date() : false
  const canSubmit = assignment && assignment.status === 'published' && (!mySubmission || mySubmission.status === 'pending')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedFiles(prev => [...prev, ...filesArray])
    }
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedFiles.length === 0) {
      alert('Please select at least one file to submit')
      return
    }

    const formData = new FormData()
    selectedFiles.forEach(file => {
      formData.append('files', file)
    })
    if (comments) {
      formData.append('comments', comments)
    }

    submitMutation.mutate(
      { assignmentId, formData },
      {
        onSuccess: () => {
          alert('Assignment submitted successfully!')
          router.refresh()
        },
        onError: (error) => {
          alert('Failed to submit assignment. Please try again.')
          console.error('Submission error:', error)
        },
      }
    )
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  if (isLoadingAssignment) {
    return (
      <PageShell>
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-muted rounded w-1/3"></div>
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
          <Link href="/student/assignments">
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
      {/* Header */}
      <div className="mb-6">
        <Link href="/student/assignments">
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
              {mySubmission && <StatusBadge status={mySubmission.status} />}
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
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <StatCard
          title="Due Date"
          value={new Date(assignment.dueDate).toLocaleDateString()}
          subtitle={new Date(assignment.dueDate).toLocaleTimeString()}
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Maximum Points"
          value={assignment.maxPoints}
          subtitle="Available points"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Max File Size"
          value={`${(assignment.maxFileSize / 1024 / 1024).toFixed(0)} MB`}
          subtitle="Per file"
          icon={<Upload className="h-4 w-4" />}
        />
      </div>

      {/* Warnings */}
      {isPastDue && assignment.status === 'published' && (
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/50 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-600">Assignment is Past Due</p>
              <p className="text-sm text-muted-foreground">
                You may still be able to submit, but it will be marked as late.
              </p>
            </div>
          </div>
        </div>
      )}

      {mySubmission?.isLate && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/50 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-600">Late Submission</p>
              <p className="text-sm text-muted-foreground">
                This submission was submitted after the due date.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Description */}
        <SectionCard title="Description" description="Assignment overview">
          <p className="text-muted-foreground">{assignment.description}</p>
        </SectionCard>

        {/* Instructions */}
        <SectionCard title="Instructions" description="Detailed requirements">
          <div className="whitespace-pre-wrap text-muted-foreground">
            {assignment.instructions}
          </div>
        </SectionCard>

        {/* Allowed File Types */}
        {assignment.allowedFileTypes && assignment.allowedFileTypes.length > 0 && (
          <SectionCard title="Submission Guidelines" description="File requirements">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Allowed file types:
              </p>
              <div className="flex flex-wrap gap-2">
                {assignment.allowedFileTypes.map(ext => (
                  <Badge key={ext} variant="outline" className="font-mono">
                    {ext}
                  </Badge>
                ))}
              </div>
            </div>
          </SectionCard>
        )}

        {/* Submission Status */}
        {mySubmission && (
          <SectionCard 
            title="Your Submission" 
            description="Submission status and details"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {mySubmission.status === 'graded' ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : mySubmission.status === 'submitted' ? (
                  <Clock className="h-6 w-6 text-blue-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-amber-600" />
                )}
                <div>
                  <p className="font-semibold">
                    Status: <StatusBadge status={mySubmission.status} />
                  </p>
                  {mySubmission.submittedAt && (
                    <p className="text-sm text-muted-foreground">
                      Submitted: {new Date(mySubmission.submittedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {mySubmission.grade !== null && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Your Grade</p>
                  <p className="text-3xl font-bold">
                    {mySubmission.grade}/{mySubmission.maxPoints}
                  </p>
                  {mySubmission.gradedAt && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Graded on: {new Date(mySubmission.gradedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}

              {mySubmission.feedback && (
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-start gap-2 mb-2">
                    <MessageSquare className="h-4 w-4 mt-0.5" />
                    <p className="font-semibold">Teacher Feedback</p>
                  </div>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {mySubmission.feedback}
                  </p>
                </div>
              )}

              {mySubmission.files && mySubmission.files.length > 0 && (
                <div>
                  <p className="font-semibold mb-2">Submitted Files</p>
                  <div className="space-y-2">
                    {mySubmission.files.map(file => (
                      <div key={file.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <div>
                            <p className="font-medium text-sm">{file.fileName}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.fileSize)}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SectionCard>
        )}

        {/* Submission Form */}
        {canSubmit && (
          <SectionCard 
            title="Submit Your Work" 
            description="Upload your assignment files"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* File Upload Area */}
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop your files here, or click to select
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Max file size: {(assignment.maxFileSize / 1024 / 1024).toFixed(0)} MB
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                  accept={assignment.allowedFileTypes?.join(',')}
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Select Files
                </Button>
              </div>

              {/* Selected Files */}
              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="font-semibold">Selected Files ({selectedFiles.length})</p>
                  <div className="space-y-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comments */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Comments (Optional)</label>
                <Textarea
                  placeholder="Add any comments for your teacher..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                disabled={submitMutation.isPending || selectedFiles.length === 0}
                className="w-full"
              >
                {submitMutation.isPending ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Assignment
                  </>
                )}
              </Button>
            </form>
          </SectionCard>
        )}

        {/* Cannot Submit Messages */}
        {!canSubmit && !mySubmission && assignment.status === 'draft' && (
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-muted-foreground">
              This assignment is still in draft mode and not yet available for submission.
            </p>
          </div>
        )}

        {!canSubmit && !mySubmission && assignment.status === 'closed' && (
          <div className="p-4 rounded-lg bg-muted/50 text-center">
            <p className="text-muted-foreground">
              This assignment is closed and no longer accepting submissions.
            </p>
          </div>
        )}
      </div>
    </PageShell>
  )
}
