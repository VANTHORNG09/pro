"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUpload } from "./FileUpload";
import { Assignment, Submission } from "@/lib/types/assignment";
import { useSubmitAssignment } from "@/lib/hooks/queries/useSubmissions";
import { Loader2, AlertTriangle } from "lucide-react";

interface SubmissionFormProps {
  assignment: Assignment;
  existingSubmission?: Submission;
  onSuccess?: () => void;
}

export function SubmissionForm({ assignment, existingSubmission, onSuccess }: SubmissionFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [comments, setComments] = useState("");

  const submitMutation = useSubmitAssignment();

  const isLate = new Date() > new Date(assignment.dueDate);
  const isSubmitted = existingSubmission?.status === "submitted" || existingSubmission?.status === "graded";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      alert("Please upload at least one file");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    if (comments) {
      formData.append("comments", comments);
    }

    submitMutation.mutate(
      { assignmentId: assignment.id, formData },
      {
        onSuccess: () => {
          setFiles([]);
          setComments("");
          onSuccess?.();
        },
      }
    );
  };

  if (isSubmitted && existingSubmission) {
    return (
      <div className="space-y-4">
        <div className="p-4 rounded-lg border bg-primary/10">
          <p className="text-sm font-medium">✓ Assignment Submitted</p>
          <p className="text-xs text-muted-foreground mt-1">
            Submitted on {new Date(existingSubmission.submittedAt!).toLocaleDateString()}
          </p>
          {existingSubmission.grade !== null && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-semibold">
                Grade: {existingSubmission.grade}/{existingSubmission.maxPoints}
              </p>
              {existingSubmission.feedback && (
                <div className="text-sm">
                  <p className="font-medium">Teacher Feedback:</p>
                  <p className="text-muted-foreground mt-1">{existingSubmission.feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {existingSubmission.files.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Submitted Files:</p>
            {existingSubmission.files.map((file) => (
              <div key={file.id} className="p-3 rounded-lg border bg-card/50">
                <p className="text-sm font-medium">{file.fileName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.fileSize)} • Uploaded {new Date(file.uploadedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {isLate && (
        <div className="flex items-start gap-3 p-4 rounded-lg border border-amber-500/50 bg-amber-500/10">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-500">Late Submission</p>
            <p className="text-xs text-muted-foreground mt-1">
              The due date ({new Date(assignment.dueDate).toLocaleDateString()}) has passed. This will be marked as late.
            </p>
          </div>
        </div>
      )}

      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Files *</label>
        <FileUpload
          files={files}
          onChange={setFiles}
          maxFiles={5}
          maxSize={assignment.maxFileSize}
          allowedTypes={assignment.allowedFileTypes}
          disabled={submitMutation.isPending}
        />
      </div>

      {/* Comments */}
      <div className="space-y-2">
        <label htmlFor="comments" className="text-sm font-medium">
          Comments (optional)
        </label>
        <textarea
          id="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Add any comments for your instructor..."
          rows={4}
          className="w-full px-3 py-2 rounded-lg border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={submitMutation.isPending}
        />
      </div>

      {/* Submit Button */}
      <Button type="submit" disabled={submitMutation.isPending || files.length === 0} className="w-full">
        {submitMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : isLate ? (
          "Submit (Late)"
        ) : (
          "Submit Assignment"
        )}
      </Button>
    </form>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
