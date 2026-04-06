// app/(dashboard)/teacher/classes/page.tsx
"use client"

import { useState } from "react"
import { Plus, Search, Users, BookOpen, Calendar, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Textarea } from "@/components/ui/textarea"
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
import { useClasses, useCreateClass } from "@/lib/hooks/queries/useClasses"
import { ClassFilters, CreateClassData } from "@/lib/types/classes"

export default function TeacherClassesPage() {
  const [filters, setFilters] = useState<ClassFilters>({ status: 'all' })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState<CreateClassData>({
    name: '',
    code: '',
    description: '',
    subject: '',
    schedule: '',
    room: '',
    semester: 'Spring',
    year: 2026,
  })

  const { data: classes = [], isLoading } = useClasses(filters)
  const createClass = useCreateClass()

  const handleFilterChange = (key: keyof ClassFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value === 'all' ? undefined : value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createClass.mutate(formData, {
      onSuccess: () => {
        setIsAddDialogOpen(false)
        setFormData({
          name: '',
          code: '',
          description: '',
          subject: '',
          schedule: '',
          room: '',
          semester: 'Spring',
          year: 2026,
        })
      },
    })
  }

  const totalStudents = classes.reduce((sum, c) => sum + c.studentCount, 0)
  const totalAssignments = classes.reduce((sum, c) => sum + c.assignmentCount, 0)
  const activeClasses = classes.filter(c => c.status === 'active').length

  return (
    <PageShell>
      <PageHeader
        title="My Classes"
        description="Manage your classes, track student progress, and organize your teaching schedule."
        action={
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>Create New Class</DialogTitle>
                  <DialogDescription>
                    Fill in the details to create a new class for your students.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Class Name</Label>
                      <Input
                        id="name"
                        placeholder="Web Development A"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="code">Class Code</Label>
                      <Input
                        id="code"
                        placeholder="CS301"
                        value={formData.code}
                        onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Computer Science"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter class description..."
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="room">Room</Label>
                      <Input
                        id="room"
                        placeholder="Room 204"
                        value={formData.room}
                        onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="schedule">Schedule</Label>
                      <Input
                        id="schedule"
                        placeholder="Mon/Wed 10:00 AM"
                        value={formData.schedule}
                        onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select
                        value={formData.semester}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, semester: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Spring">Spring</SelectItem>
                          <SelectItem value="Summer">Summer</SelectItem>
                          <SelectItem value="Fall">Fall</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createClass.isPending}>
                    {createClass.isPending ? 'Creating...' : 'Create Class'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Classes"
          value={classes.length}
          subtitle={`${activeClasses} active`}
          icon={<BookOpen className="h-4 w-4" />}
        />
        <StatCard
          title="Total Students"
          value={totalStudents}
          subtitle="Across all classes"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Total Assignments"
          value={totalAssignments}
          subtitle="Created for all classes"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <StatCard
          title="Current Semester"
          value={formData.semester || 'N/A'}
          subtitle={formData.year?.toString() || ''}
          icon={<Calendar className="h-4 w-4" />}
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
          <p className="text-muted-foreground mb-4">
            Get started by creating your first class
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Class
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {classes.map((classItem) => (
            <Link
              key={classItem.id}
              href={`/teacher/classes/${classItem.id}`}
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageShell>
  )
}
