// app/(dashboard)/teacher/classes/[id]/page.tsx
"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Plus, Users, BookOpen, TrendingUp, Mail, UserMinus, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { PageHeader } from "@/components/shared/page-header"
import { PageShell } from "@/components/shared/page-shell"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { SectionCard } from "@/components/shared/section-card"
import { useClass, useClassStudents, useClassStats, useEnrollStudent, useRemoveStudent } from "@/lib/hooks/queries/useClasses"
import { useAssignments } from "@/lib/hooks/queries/useAssignments"
import { AssignmentFilters } from "@/lib/types/assignment"

export default function TeacherClassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const classId = parseInt(params.id as string)

  const [studentSearch, setStudentSearch] = useState('')
  const [assignmentSearch, setAssignmentSearch] = useState('')
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false)
  const [enrollStudentId, setEnrollStudentId] = useState('')

  const { data: classData, isLoading: classLoading } = useClass(classId)
  const { data: students = [], isLoading: studentsLoading } = useClassStudents(classId)
  const { data: stats } = useClassStats(classId)
  const { data: assignments = [], isLoading: assignmentsLoading } = useAssignments({ classId } as AssignmentFilters)
  const enrollStudent = useEnrollStudent()
  const removeStudent = useRemoveStudent()

  const filteredStudents = students.filter(s =>
    s.studentName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.studentEmail.toLowerCase().includes(studentSearch.toLowerCase())
  )

  const filteredAssignments = assignments.filter(a =>
    a.title.toLowerCase().includes(assignmentSearch.toLowerCase())
  )

  const handleEnrollStudent = (e: React.FormEvent) => {
    e.preventDefault()
    enrollStudent.mutate(
      { classId, studentId: parseInt(enrollStudentId) },
      {
        onSuccess: () => {
          setIsEnrollDialogOpen(false)
          setEnrollStudentId('')
        },
      }
    )
  }

  const handleRemoveStudent = (studentId: number) => {
    if (confirm('Are you sure you want to remove this student from the class?')) {
      removeStudent.mutate({ classId, studentId })
    }
  }

  if (classLoading) {
    return (
      <PageShell>
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-muted rounded w-1/3"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </PageShell>
    )
  }

  if (!classData) {
    return (
      <PageShell>
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Class not found</h3>
          <Link href="/teacher/classes">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Classes
            </Button>
          </Link>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <PageHeader
        title={classData.name}
        description={`${classData.code} • ${classData.subject} • ${classData.teacherName}`}
        action={
          <div className="flex gap-2">
            <Link href={`/teacher/assignments/new?classId=${classId}`}>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Assignment
              </Button>
            </Link>
          </div>
        }
      />

      {/* Class Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats ? (
          <>
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              subtitle={`${stats.activeStudents} active`}
              icon={<Users className="h-4 w-4" />}
            />
            <StatCard
              title="Total Assignments"
              value={stats.totalAssignments}
              subtitle={`${stats.publishedAssignments} published`}
              icon={<BookOpen className="h-4 w-4" />}
            />
            <StatCard
              title="Average Grade"
              value={`${stats.averageGrade}%`}
              subtitle="Class average"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <StatCard
              title="Submission Rate"
              value={`${stats.submissionRate}%`}
              subtitle="Overall completion"
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Students"
              value={classData.studentCount}
              subtitle="Enrolled"
              icon={<Users className="h-4 w-4" />}
            />
            <StatCard
              title="Assignments"
              value={classData.assignmentCount}
              subtitle="Created"
              icon={<BookOpen className="h-4 w-4" />}
            />
            <StatCard
              title="Schedule"
              value={classData.schedule || 'TBD'}
              subtitle={classData.room || ''}
              icon={<BookOpen className="h-4 w-4" />}
            />
            <StatCard
              title="Semester"
              value={classData.semester || 'N/A'}
              subtitle={classData.year?.toString() || ''}
              icon={<BookOpen className="h-4 w-4" />}
            />
          </>
        )}
      </div>

      {/* Tabs */}
      <div className="space-y-6">
        {/* Students Section */}
        <SectionCard
          title="Enrolled Students"
          description={`Manage students enrolled in this class (${filteredStudents.length} students)`}
          action={
            <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Enroll Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={handleEnrollStudent}>
                  <DialogHeader>
                    <DialogTitle>Enroll Student</DialogTitle>
                    <DialogDescription>
                      Enter the student ID to enroll them in this class.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        type="number"
                        placeholder="101"
                        value={enrollStudentId}
                        onChange={(e) => setEnrollStudentId(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" disabled={enrollStudent.isPending}>
                      {enrollStudent.isPending ? 'Enrolling...' : 'Enroll Student'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          }
        >
          <div className="mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-9"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
              />
            </div>
          </div>

          {studentsLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-12 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="mx-auto h-8 w-8 mb-2" />
              <p>No students found</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead>Graded</TableHead>
                    <TableHead>Pending</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                            {student.studentName.charAt(0)}
                          </div>
                          {student.studentName}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {student.studentEmail}
                        </div>
                      </TableCell>
                      <TableCell>{student.submissionCount}</TableCell>
                      <TableCell>{student.gradedCount}</TableCell>
                      <TableCell>
                        <Badge variant={student.pendingCount > 0 ? "default" : "secondary"}>
                          {student.pendingCount}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {student.grade !== undefined && student.grade !== null ? (
                          <span className="font-semibold">{student.grade}%</span>
                        ) : (
                          <span className="text-muted-foreground">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={student.status} />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveStudent(student.studentId)}
                          disabled={removeStudent.isPending || student.status === 'dropped'}
                        >
                          <UserMinus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </SectionCard>

        {/* Assignments Section */}
        <SectionCard
          title="Class Assignments"
          description={`All assignments for this class (${filteredAssignments.length} assignments)`}
          action={
            <Link href={`/teacher/assignments/new?classId=${classId}`}>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Assignment
              </Button>
            </Link>
          }
        >
          <div className="mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                className="pl-9"
                value={assignmentSearch}
                onChange={(e) => setAssignmentSearch(e.target.value)}
              />
            </div>
          </div>

          {assignmentsLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          ) : filteredAssignments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BookOpen className="mx-auto h-8 w-8 mb-2" />
              <p>No assignments found</p>
              <Link href={`/teacher/assignments/new?classId=${classId}`}>
                <Button variant="link" className="mt-2">
                  Create your first assignment
                </Button>
              </Link>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submissions</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.map((assignment) => (
                    <TableRow key={assignment.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/teacher/assignments/${assignment.id}`}
                          className="hover:text-primary transition-colors"
                        >
                          {assignment.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(assignment.dueDate).toLocaleTimeString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={assignment.status} />
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {assignment.gradedCount || 0}/{assignment.submissionCount || 0} graded
                        </div>
                        {assignment.pendingCount && assignment.pendingCount > 0 && (
                          <Badge variant="default" className="text-xs">
                            {assignment.pendingCount} pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/teacher/assignments/${assignment.id}`)}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </SectionCard>
      </div>
    </PageShell>
  )
}
