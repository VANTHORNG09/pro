// app/(dashboard)/student/classes/[id]/page.tsx
"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Users, BookOpen, Calendar, Mail, Search } from "lucide-react"
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
import { PageHeader } from "@/components/shared/page-header"
import { PageShell } from "@/components/shared/page-shell"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { SectionCard } from "@/components/shared/section-card"
import { useClass, useClassStudents } from "@/lib/hooks/queries/useClasses"
import { useAssignments } from "@/lib/hooks/queries/useAssignments"
import { AssignmentFilters } from "@/lib/types/assignment"

export default function StudentClassDetailPage() {
  const params = useParams()
  const classId = parseInt(params.id as string)

  const [studentSearch, setStudentSearch] = useState('')
  const [assignmentSearch, setAssignmentSearch] = useState('')

  const { data: classData, isLoading: classLoading } = useClass(classId)
  const { data: students = [], isLoading: studentsLoading } = useClassStudents(classId)
  const { data: assignments = [], isLoading: assignmentsLoading } = useAssignments({ classId, status: 'published' } as AssignmentFilters)

  const filteredStudents = students.filter(s =>
    s.studentName.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.studentEmail.toLowerCase().includes(studentSearch.toLowerCase())
  )

  const filteredAssignments = assignments.filter(a =>
    a.title.toLowerCase().includes(assignmentSearch.toLowerCase())
  )

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
          <Link href="/student/classes">
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
          <Link href="/student/classes">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Classes
            </Button>
          </Link>
        }
      />

      {/* Class Info Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Students"
          value={classData.studentCount}
          subtitle="Enrolled"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Assignments"
          value={classData.assignmentCount}
          subtitle="Published"
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatCard
          title="Schedule"
          value={classData.schedule || 'TBD'}
          subtitle={classData.room || ''}
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Semester"
          value={classData.semester || 'N/A'}
          subtitle={classData.year?.toString() || ''}
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>

      {/* Description */}
      <SectionCard title="About This Class" description="Class description and details">
        <p className="text-muted-foreground">{classData.description}</p>
        {classData.subject && (
          <div className="mt-4">
            <Badge variant="secondary">{classData.subject}</Badge>
          </div>
        )}
      </SectionCard>

      {/* Tabs */}
      <div className="space-y-6 mt-6">
        {/* Assignments Section */}
        <SectionCard
          title="Class Assignments"
          description={`All published assignments for this class (${filteredAssignments.length} assignments)`}
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
              <p>No assignments published yet</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Max Points</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.map((assignment) => {
                    const isPastDue = new Date(assignment.dueDate) < new Date()
                    return (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/student/assignments/${assignment.id}`}
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
                          {isPastDue && (
                            <Badge variant="destructive" className="ml-2 text-xs">
                              Past Due
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold">{assignment.maxPoints}</span>
                        </TableCell>
                        <TableCell>
                          <Link href={`/student/assignments/${assignment.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </SectionCard>

        {/* Classmates Section */}
        <SectionCard
          title="Classmates"
          description={`Students enrolled in this class (${filteredStudents.length} students)`}
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
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.filter(s => s.status === 'active').map((student) => (
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
                      <TableCell>
                        <StatusBadge status={student.status} />
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
