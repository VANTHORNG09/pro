"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, Search, Filter, Users, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { PageShell } from "@/components/shared/page-shell";
import { GradingInterface } from "@/components/assignments/GradingInterface";
import { useAssignment } from "@/lib/hooks/queries/useAssignments";
import { useSubmissions, useDownloadSubmissions } from "@/lib/hooks/queries/useSubmissions";
import { SubmissionFilters } from "@/lib/types/assignment";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function TeacherSubmissionsPage() {
  const params = useParams();
  const assignmentId = parseInt(params.id as string);

  const [filters, setFilters] = useState<SubmissionFilters>({ status: "all" });
  const [search, setSearch] = useState("");
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);

  const { data: assignment, isLoading: isLoadingAssignment } = useAssignment(assignmentId);
  const { data: submissions, isLoading: isLoadingSubmissions } = useSubmissions(assignmentId, {
    ...filters,
    search: search || undefined,
  });
  const downloadMutation = useDownloadSubmissions();

  const selectedSubmission = submissions?.find((s) => s.id === selectedSubmissionId);

  const handleDownloadAll = async () => {
    try {
      const blob = await downloadMutation.mutateAsync(assignmentId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `assignments-${assignmentId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to download submissions:", error);
      alert("Failed to download submissions");
    }
  };

  const handleStatusFilter = (status: string) => {
    setFilters((prev) => ({ ...prev, status: status === "all" ? "all" : status as SubmissionFilters['status'] }));
  };

  const submittedCount = submissions?.filter((s) => s.status !== "pending").length || 0;
  const gradedCount = submissions?.filter((s) => s.status === "graded" || s.status === "returned").length || 0;
  const pendingCount = submissions?.filter((s) => s.status === "pending").length || 0;

  if (isLoadingAssignment || isLoadingSubmissions) {
    return (
      <PageShell>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageShell>
    );
  }

  if (!assignment) {
    return (
      <PageShell>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Assignment not found</p>
          <Button className="mt-4" onClick={() => history.back()}>
            Go Back
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* Back Button */}
      <Link href="/teacher/assignments">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assignments
        </Button>
      </Link>

      <PageHeader
        title={`${assignment.title} - Submissions`}
        description={`Manage and grade student submissions`}
      />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <div className="p-4 rounded-lg border bg-card/50">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-medium">Total Submissions</h3>
          </div>
          <p className="text-2xl font-bold">{submittedCount}</p>
        </div>

        <div className="p-4 rounded-lg border bg-card/50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-medium">Graded</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">{gradedCount}</p>
        </div>

        <div className="p-4 rounded-lg border bg-card/50">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-amber-600" />
            <h3 className="text-sm font-medium">Pending</h3>
          </div>
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
        </div>

        <div className="p-4 rounded-lg border bg-card/50">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h3 className="text-sm font-medium">Late</h3>
          </div>
          <p className="text-2xl font-bold text-red-600">
            {submissions?.filter((s) => s.isLate).length || 0}
          </p>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Download All */}
        <Button
          variant="outline"
          onClick={handleDownloadAll}
          disabled={downloadMutation.isPending}
        >
          {downloadMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download All
            </>
          )}
        </Button>
      </div>

      {/* Status Filters */}
      <div className="flex items-center gap-2 mb-6">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Button
          size="sm"
          variant={filters.status === "all" ? "default" : "outline"}
          onClick={() => handleStatusFilter("all")}
        >
          All ({submittedCount})
        </Button>
        <Button
          size="sm"
          variant={filters.status === "submitted" ? "default" : "outline"}
          onClick={() => handleStatusFilter("submitted")}
        >
          Submitted ({submittedCount - gradedCount})
        </Button>
        <Button
          size="sm"
          variant={filters.status === "graded" ? "default" : "outline"}
          onClick={() => handleStatusFilter("graded")}
        >
          Graded ({gradedCount})
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Submissions List */}
        <div className="space-y-3">
          <h3 className="font-semibold">Student Submissions</h3>
          {submissions && submissions.length > 0 ? (
            <div className="space-y-2">
              {submissions.map((submission) => (
                <button
                  key={submission.id}
                  onClick={() => setSelectedSubmissionId(submission.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all hover:shadow-md ${
                    selectedSubmissionId === submission.id
                      ? "border-primary bg-primary/5"
                      : "bg-card/50 hover:bg-card/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{submission.studentName}</p>
                      <p className="text-xs text-muted-foreground">{submission.studentEmail}</p>
                      {submission.submittedAt && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {submission.grade !== null && (
                        <span className="text-sm font-bold">
                          {submission.grade}/{submission.maxPoints}
                        </span>
                      )}
                      <StatusBadge status={submission.status} isLate={submission.isLate} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p>No submissions found</p>
            </div>
          )}
        </div>

        {/* Grading Panel */}
        <div>
          <h3 className="font-semibold mb-3">Grading</h3>
          {selectedSubmission ? (
            <div className="p-4 rounded-lg border bg-card/50">
              <GradingInterface
                submission={selectedSubmission}
                onUpdate={() => {
                  // React Query will automatically refetch
                }}
              />
            </div>
          ) : (
            <div className="p-8 rounded-lg border bg-card/30 text-center">
              <p className="text-muted-foreground">
                Select a submission to start grading
              </p>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}

function StatusBadge({ status, isLate }: { status: string; isLate: boolean }) {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";

  const getStatusBadge = () => {
    switch (status) {
      case "submitted":
        return <span className={cn(baseClasses, "bg-blue-500/20 text-blue-700")}>Submitted</span>;
      case "graded":
        return <span className={cn(baseClasses, "bg-green-500/20 text-green-700")}>Graded</span>;
      case "returned":
        return <span className={cn(baseClasses, "bg-purple-500/20 text-purple-700")}>Returned</span>;
      case "late":
        return <span className={cn(baseClasses, "bg-amber-500/20 text-amber-700")}>Late</span>;
      default:
        return <span className={cn(baseClasses, "bg-gray-500/20 text-gray-700")}>{status}</span>;
    }
  };

  return (
    <div className="flex items-center gap-1">
      {isLate && <AlertCircle className="h-3 w-3 text-red-600" />}
      {getStatusBadge()}
    </div>
  );
}

// Simple cn utility if not imported
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
