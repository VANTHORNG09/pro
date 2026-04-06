// app/(dashboard)/student/assignments/page.tsx
"use client"

import { useState } from "react"
import { Search, Filter, BookOpen, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/shared/page-header"
import { PageShell } from "@/components/shared/page-shell"
import { StatCard } from "@/components/shared/stat-card"
import { AssignmentCard } from "@/components/assignments/AssignmentCard"
import { useAssignments } from "@/lib/hooks/queries/useAssignments"
import { AssignmentFilters, AssignmentStatus } from "@/lib/types/assignment"

export default function StudentAssignmentsPage() {
  const [filters, setFilters] = useState<AssignmentFilters>({ status: "all" })
  const [search, setSearch] = useState("")

  const { data: assignments = [], isLoading, error } = useAssignments({
    ...filters,
    search: search || undefined,
  })

  const handleStatusFilter = (status: AssignmentStatus | 'all') => {
    setFilters(prev => ({ ...prev, status: status === "all" ? undefined : status }))
  }

  // Calculate stats
  const pendingCount = assignments.filter(a => a.status === 'published').length
  const submittedCount = assignments.filter(a => a.status === 'closed').length
  const totalAssignments = assignments.length

  if (isLoading) {
    return (
      <PageShell>
        <PageHeader title="Assignments" description="View all your assignments." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-24 bg-muted rounded animate-pulse"></div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-card p-6 animate-pulse">
              <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell>
        <PageHeader title="Assignments" description="View all your assignments." />
        <div className="p-4 rounded-lg border border-red-500/50 bg-red-500/10">
          <p className="text-sm text-red-600">Failed to load assignments</p>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <PageHeader 
        title="Assignments" 
        description="View and manage all your assignments across classes" 
      />

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Assignments"
          value={totalAssignments}
          subtitle="All assignments"
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatCard
          title="Pending"
          value={pendingCount}
          subtitle="Not yet submitted"
          icon={<Clock className="h-4 w-4" />}
        />
        <StatCard
          title="Submitted"
          value={submittedCount}
          subtitle="Awaiting or graded"
          icon={<CheckCircle className="h-4 w-4" />}
        />
        <StatCard
          title="Overdue"
          value={assignments.filter(a => new Date(a.dueDate) < new Date() && a.status === 'published').length}
          subtitle="Past due date"
          icon={<AlertCircle className="h-4 w-4" />}
        />
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Button
            size="sm"
            variant={filters.status === undefined || filters.status === 'all' ? "default" : "outline"}
            onClick={() => handleStatusFilter("all")}
          >
            All ({totalAssignments})
          </Button>
          <Button
            size="sm"
            variant={filters.status === "published" ? "default" : "outline"}
            onClick={() => handleStatusFilter("published")}
          >
            Pending ({pendingCount})
          </Button>
          <Button
            size="sm"
            variant={filters.status === "closed" ? "default" : "outline"}
            onClick={() => handleStatusFilter("closed")}
          >
            Submitted ({submittedCount})
          </Button>
        </div>
      </div>

      {/* Assignments Grid */}
      {assignments && assignments.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {assignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              role="student"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No assignments found</h3>
          <p className="text-muted-foreground">
            {search || filters.status ? "Try adjusting your filters" : "No assignments have been created yet"}
          </p>
        </div>
      )}
    </PageShell>
  )
}
