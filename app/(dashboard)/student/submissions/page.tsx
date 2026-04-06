// app/(dashboard)/student/submissions/page.tsx
"use client"

import { useState } from "react"
import { Search, FileText, CheckCircle, Clock, AlertCircle, TrendingUp, MessageSquare, Download } from "lucide-react"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageHeader } from "@/components/shared/page-header"
import { PageShell } from "@/components/shared/page-shell"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { SectionCard } from "@/components/shared/section-card"
import { useAllMySubmissions } from "@/lib/hooks/queries/useSubmissions"
import { SubmissionStatus, SubmissionFilters } from "@/lib/types/assignment"

export default function StudentSubmissionsPage() {
  const [filters, setFilters] = useState<SubmissionFilters>({ status: 'all' })
  const [search, setSearch] = useState('')

  const { data: submissions = [], isLoading } = useAllMySubmissions()

  const filteredSubmissions = submissions.filter(submission => {
    const matchesStatus = filters.status === 'all' || submission.status === filters.status
    const matchesSearch = (submission.assignmentName || `Assignment #${submission.assignmentId}`).toLowerCase().includes(search.toLowerCase()) ||
                         submission.studentName?.toLowerCase().includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Calculate stats
  const totalSubmissions = submissions.length
  const gradedCount = submissions.filter(s => s.status === 'graded' || s.status === 'returned').length
  const pendingCount = submissions.filter(s => s.status === 'pending' || s.status === 'submitted').length
  const lateCount = submissions.filter(s => s.isLate).length
  const averageGrade = gradedCount > 0
    ? submissions
        .filter(s => s.grade !== null)
        .reduce((sum, s) => sum + ((s.grade || 0) / s.maxPoints) * 100, 0) / gradedCount
    : 0

  const handleStatusFilter = (status: SubmissionStatus | 'all') => {
    setFilters(prev => ({ ...prev, status: status === 'all' ? undefined : status }))
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <PageShell>
      <PageHeader
        title="My Submissions"
        description="Track your submission history, view grades, and read teacher feedback"
      />

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Submissions"
          value={totalSubmissions}
          subtitle="All time"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Graded"
          value={gradedCount}
          subtitle={averageGrade > 0 ? `${averageGrade.toFixed(1)}% average` : 'No grades yet'}
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          subtitle="Awaiting review"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Late Submissions"
          value={lateCount}
          subtitle="Past due date"
          icon={<AlertCircle className="h-4 w-4" />}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) => handleStatusFilter(value as SubmissionStatus | 'all')}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="graded">Graded</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="late">Late</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Submissions List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : filteredSubmissions.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No submissions found</h3>
          <p className="text-muted-foreground mb-4">
            {search || filters.status ? "Try adjusting your filters" : "You haven't submitted any assignments yet"}
          </p>
          <Link href="/student/assignments">
            <Button>
              <TrendingUp className="mr-2 h-4 w-4" />
              View Assignments
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((submission) => (
            <SectionCard
              key={submission.id}
              title={submission.assignmentName || `Assignment #${submission.assignmentId}`}
              description={`Submitted ${submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : 'N/A'}`}
            >
              <div className="space-y-4">
                {/* Status and Grade */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <StatusBadge status={submission.status} />
                    {submission.isLate && (
                      <Badge variant="destructive">Late</Badge>
                    )}
                  </div>
                  
                  {submission.grade !== null && (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Grade</p>
                      <p className="text-2xl font-bold">
                        {submission.grade}/{submission.maxPoints}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {((submission.grade / submission.maxPoints) * 100).toFixed(1)}%
                      </p>
                    </div>
                  )}
                </div>

                {/* Feedback */}
                {submission.feedback && (
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-start gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 mt-0.5" />
                      <p className="font-semibold">Teacher Feedback</p>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {submission.feedback}
                    </p>
                  </div>
                )}

                {/* Submitted Files */}
                {submission.files && submission.files.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-2">Submitted Files</p>
                    <div className="flex flex-wrap gap-2">
                      {submission.files.map(file => (
                        <div
                          key={file.id}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 text-sm"
                        >
                          <FileText className="h-4 w-4" />
                          <div>
                            <p className="font-medium">{file.fileName}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.fileSize)}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="ml-2">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Graded Date */}
                {submission.gradedAt && (
                  <p className="text-xs text-muted-foreground">
                    Graded on: {new Date(submission.gradedAt).toLocaleDateString()}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link href={`/student/assignments/${submission.assignmentId}`}>
                    <Button variant="outline" size="sm">
                      View Assignment
                    </Button>
                  </Link>
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}

      {/* Summary Table View Option */}
      {!isLoading && filteredSubmissions.length > 0 && (
        <SectionCard
          title="Summary View"
          description="Quick overview of all your submissions"
        >
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell className="font-medium">
                      {submission.assignmentName || `Assignment #${submission.assignmentId}`}
                    </TableCell>
                    <TableCell>
                      {submission.submittedAt
                        ? new Date(submission.submittedAt).toLocaleDateString()
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={submission.status} />
                    </TableCell>
                    <TableCell>
                      {submission.grade !== null ? (
                        <span className="font-semibold">
                          {submission.grade}/{submission.maxPoints}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {submission.isLate ? (
                        <Badge variant="destructive">Yes</Badge>
                      ) : (
                        <span className="text-muted-foreground">No</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Link href={`/student/assignments/${submission.assignmentId}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </SectionCard>
      )}
    </PageShell>
  )
}
