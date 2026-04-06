// app/(dashboard)/student/classes/page.tsx
"use client"

import { useState } from "react"
import { Search, BookOpen, Users, Calendar, TrendingUp, ArrowRight } from "lucide-react"
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
import { PageHeader } from "@/components/shared/page-header"
import { PageShell } from "@/components/shared/page-shell"
import { StatCard } from "@/components/shared/stat-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { useClasses } from "@/lib/hooks/queries/useClasses"
import { ClassFilters } from "@/lib/types/classes"

export default function StudentClassesPage() {
  const [filters, setFilters] = useState<ClassFilters>({ status: 'active' })

  const { data: classes = [], isLoading } = useClasses(filters)

  const handleFilterChange = (key: keyof ClassFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value === 'all' ? undefined : value }))
  }

  const totalAssignments = classes.reduce((sum, c) => sum + c.assignmentCount, 0)
  const activeClasses = classes.filter(c => c.status === 'active').length

  return (
    <PageShell>
      <PageHeader
        title="My Classes"
        description="View your enrolled classes and track your progress"
      />

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Enrolled Classes"
          value={classes.length}
          subtitle={`${activeClasses} active`}
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatCard
          title="Total Assignments"
          value={totalAssignments}
          subtitle="Across all classes"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="Current Semester"
          value={classes[0]?.semester || 'N/A'}
          subtitle={classes[0]?.year?.toString() || ''}
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Total Teachers"
          value={new Set(classes.map(c => c.teacherId)).size}
          subtitle="Instructors"
          icon={<Users className="h-4 w-4" />}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search classes..."
            className="pl-9"
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
        <Select
          value={filters.status || 'all'}
          onValueChange={(value) => handleFilterChange('status', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Classes Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-muted rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/3"></div>
            </div>
          ))}
        </div>
      ) : classes.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No classes found</h3>
          <p className="text-muted-foreground">
            You are not enrolled in any classes yet
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {classes.map((classItem) => (
            <Link
              key={classItem.id}
              href={`/student/classes/${classItem.id}`}
              className="group"
            >
              <div className="glass-card p-6 h-full transition-all hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                      {classItem.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {classItem.code}
                    </Badge>
                  </div>
                  <StatusBadge status={classItem.status} />
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {classItem.description}
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Teacher</span>
                    <span className="font-medium">{classItem.teacherName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Students</span>
                    <span className="font-medium">{classItem.studentCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Assignments</span>
                    <span className="font-medium">{classItem.assignmentCount}</span>
                  </div>
                  {classItem.schedule && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Schedule</span>
                      <span className="font-medium text-xs">{classItem.schedule}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm" variant="outline">
                    View Details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  )
}
