"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText, Calendar, Award } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { PageShell } from "@/components/shared/page-shell";
import { SubmissionForm } from "@/components/assignments/SubmissionForm";
import { useAssignment } from "@/lib/hooks/queries/useAssignments";
import { useMySubmission } from "@/lib/hooks/queries/useSubmissions";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubmitAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const assignmentId = parseInt(params.id as string);

  const { data: assignment, isLoading: isLoadingAssignment } = useAssignment(assignmentId);
  const { data: submission, isLoading: isLoadingSubmission } = useMySubmission(assignmentId);

  const isLoading = isLoadingAssignment || isLoadingSubmission;

  if (isLoading) {
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
          <Button className="mt-4" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      {/* Back Button */}
      <Link href="/student/assignments">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assignments
        </Button>
      </Link>

      <PageHeader
        title={assignment.title}
        description="Submit your assignment"
      />

      {/* Assignment Details */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <div className="p-4 rounded-lg border bg-card/50">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Due Date</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(assignment.dueDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {new Date() > new Date(assignment.dueDate) && (
            <p className="text-xs text-red-600 mt-2 font-medium">⚠ Past Due</p>
          )}
        </div>

        <div className="p-4 rounded-lg border bg-card/50">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Max Points</h3>
          </div>
          <p className="text-2xl font-bold">{assignment.maxPoints}</p>
        </div>

        <div className="p-4 rounded-lg border bg-card/50">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Allowed Files</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {assignment.allowedFileTypes && assignment.allowedFileTypes.length > 0
              ? assignment.allowedFileTypes.join(", ")
              : "All file types"}
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="p-6 rounded-lg border bg-card/50 mb-6">
        <h2 className="font-semibold text-lg mb-3">Instructions</h2>
        <div className="prose prose-sm max-w-none">
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {assignment.instructions || assignment.description}
          </p>
        </div>
      </div>

      {/* Submission Form */}
      <div className="p-6 rounded-lg border bg-card/50">
        <h2 className="font-semibold text-lg mb-4">
          {submission?.status === "submitted" || submission?.status === "graded"
            ? "Your Submission"
            : "Submit Your Work"}
        </h2>
        <SubmissionForm
          assignment={assignment}
          existingSubmission={submission}
          onSuccess={() => {
            // Could show success message or redirect
          }}
        />
      </div>
    </PageShell>
  );
}
