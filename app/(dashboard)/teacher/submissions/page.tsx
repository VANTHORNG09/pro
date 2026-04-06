"use client"

import { useState } from "react"
import { CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/shared/page-header"
import { PageShell } from "@/components/shared/page-shell"
import { SectionCard } from "@/components/shared/section-card"
import { StatusBadge } from "@/components/shared/status-badge"

interface Submission {
  id: number
  student: string
  assignment: string
  status: string
  grade?: string
}

export default function TeacherSubmissionsPage() {
  const [submissions] = useState<Submission[]>([
    { id: 1, student: "Sokha", assignment: "Database Design", status: "Submitted", grade: "A" },
    { id: 2, student: "Rithy", assignment: "UI Prototype", status: "Pending" },
    { id: 3, student: "Dara", assignment: "OOP Exercise", status: "Submitted", grade: "B+" },
  ])

  return (
    <PageShell>
      <PageHeader
        title="Submissions"
        description="Review and grade student submissions."
      />

      <SectionCard title="Submission List">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left">
            <thead className="border-b border-border/60">
              <tr>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Assignment</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Grade</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map(s => (
                <tr key={s.id} className="border-b border-border/20">
                  <td className="px-4 py-2">{s.student}</td>
                  <td className="px-4 py-2">{s.assignment}</td>
                  <td className="px-4 py-2"><StatusBadge status={s.status} /></td>
                  <td className="px-4 py-2">{s.grade ?? "-"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    {s.status === "Pending" ? (
                      <>
                        <Button size="icon" variant="default"><CheckCircle className="h-4 w-4" /></Button>
                        <Button size="icon" variant="destructive"><XCircle className="h-4 w-4" /></Button>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Graded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageShell>
  )
}