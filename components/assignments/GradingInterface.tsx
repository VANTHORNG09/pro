"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Submission } from "@/lib/types/assignment";
import { useGradeSubmission, useReturnSubmission, useAddComment } from "@/lib/hooks/queries/useSubmissions";
import { Loader2, Download, ExternalLink, MessageSquare, CheckCircle, ArrowLeft } from "lucide-react";

interface GradingInterfaceProps {
  submission: Submission;
  onUpdate?: () => void;
}

export function GradingInterface({ submission, onUpdate }: GradingInterfaceProps) {
  const [grade, setGrade] = useState<string>(submission.grade?.toString() || "");
  const [feedback, setFeedback] = useState(submission.feedback || "");
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  const gradeMutation = useGradeSubmission();
  const returnMutation = useReturnSubmission();
  const commentMutation = useAddComment();

  const handleGradeSubmission = (e: React.FormEvent) => {
    e.preventDefault();

    const numericGrade = parseFloat(grade);
    if (isNaN(numericGrade) || numericGrade < 0 || numericGrade > submission.maxPoints) {
      alert(`Grade must be between 0 and ${submission.maxPoints}`);
      return;
    }

    gradeMutation.mutate(
      {
        id: submission.id,
        payload: { grade: numericGrade, feedback },
      },
      {
        onSuccess: () => {
          onUpdate?.();
        },
      }
    );
  };

  const handleReturnToStudent = () => {
    if (!confirm("Return this submission to the student?")) return;

    returnMutation.mutate(submission.id, {
      onSuccess: () => {
        onUpdate?.();
      },
    });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    commentMutation.mutate(
      { submissionId: submission.id, content: comment },
      {
        onSuccess: () => {
          setComment("");
          onUpdate?.();
        },
      }
    );
  };

  const handleDownloadFile = (fileUrl: string, fileName: string) => {
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const isGraded = submission.status === "graded" || submission.status === "returned";

  return (
    <div className="space-y-6">
      {/* Student Info */}
      <div className="p-4 rounded-lg border bg-card/50">
        <h3 className="font-semibold text-lg">{submission.studentName}</h3>
        <p className="text-sm text-muted-foreground">{submission.studentEmail}</p>
        <div className="flex items-center gap-4 mt-3 text-sm">
          <div>
            <span className="text-muted-foreground">Status:</span>{" "}
            <span className="font-medium capitalize">{submission.status}</span>
          </div>
          {submission.submittedAt && (
            <div>
              <span className="text-muted-foreground">Submitted:</span>{" "}
              <span className="font-medium">{new Date(submission.submittedAt).toLocaleDateString()}</span>
            </div>
          )}
          {submission.isLate && (
            <div className="text-amber-600 font-medium">⚠ Late</div>
          )}
        </div>
      </div>

      {/* Submitted Files */}
      {submission.files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Submitted Files</h4>
          <div className="space-y-2">
            {submission.files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-card/30"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(file.fileSize)} • {new Date(file.uploadedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadFile(file.fileUrl, file.fileName)}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grading Form */}
      <form onSubmit={handleGradeSubmission} className="space-y-4 p-4 rounded-lg border bg-card/50">
        <h4 className="font-medium">Grade Submission</h4>

        {/* Grade Input */}
        <div className="space-y-2">
          <label htmlFor="grade" className="text-sm font-medium">
            Grade (0 - {submission.maxPoints})
          </label>
          <div className="flex items-center gap-3">
            <input
              id="grade"
              type="number"
              min="0"
              max={submission.maxPoints}
              step="0.01"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-32 px-3 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <span className="text-sm text-muted-foreground">/ {submission.maxPoints} points</span>
          </div>
        </div>

        {/* Feedback */}
        <div className="space-y-2">
          <label htmlFor="feedback" className="text-sm font-medium">
            Feedback (optional)
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Provide detailed feedback for the student..."
            rows={5}
            className="w-full px-3 py-2 rounded-lg border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={gradeMutation.isPending || !grade}
            className="flex-1"
          >
            {gradeMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                {isGraded ? "Update Grade" : "Save Grade"}
              </>
            )}
          </Button>

          {isGraded && (
            <Button
              type="button"
              variant="outline"
              onClick={handleReturnToStudent}
              disabled={returnMutation.isPending}
            >
              {returnMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Return to Student
                </>
              )}
            </Button>
          )}
        </div>
      </form>

      {/* Comments Section */}
      <div className="space-y-3">
        <Button
          variant="ghost"
          onClick={() => setShowComments(!showComments)}
          className="w-full"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          {showComments ? "Hide" : "Show"} Comments ({submission.comments.length})
        </Button>

        {showComments && (
          <div className="space-y-4">
            {/* Existing Comments */}
            {submission.comments.length > 0 && (
              <div className="space-y-3">
                {submission.comments.map((c) => (
                  <div key={c.id} className="p-3 rounded-lg border bg-card/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{c.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(c.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm">{c.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="w-full px-3 py-2 rounded-lg border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                type="submit"
                size="sm"
                disabled={commentMutation.isPending || !comment.trim()}
              >
                {commentMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Add Comment"
                )}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}
