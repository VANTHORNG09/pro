"use client";

import React from "react";
import Link from "next/link";
import { Assignment } from "@/lib/types/assignment";
import { Calendar, Clock, FileText, Users, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssignmentCardProps {
  assignment: Assignment;
  role: "student" | "teacher";
  className?: string;
}

export function AssignmentCard({ assignment, role, className }: AssignmentCardProps) {
  const isPastDue = new Date() > new Date(assignment.dueDate);
  const daysUntilDue = Math.ceil(
    (new Date(assignment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getStatusColor = () => {
    if (assignment.status === "published") return "text-green-600";
    if (assignment.status === "closed") return "text-red-600";
    return "text-yellow-600";
  };

  const getStatusBadge = () => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    
    switch (assignment.status) {
      case "published":
        return <span className={cn(baseClasses, "bg-green-500/20 text-green-700")}>Active</span>;
      case "closed":
        return <span className={cn(baseClasses, "bg-red-500/20 text-red-700")}>Closed</span>;
      case "draft":
        return <span className={cn(baseClasses, "bg-yellow-500/20 text-yellow-700")}>Draft</span>;
      default:
        return <span className={cn(baseClasses, "bg-gray-500/20 text-gray-700")}>{assignment.status}</span>;
    }
  };

  const getDueDateBadge = () => {
    const baseClasses = "flex items-center gap-1 text-xs font-medium";
    
    if (isPastDue) {
      return (
        <span className={cn(baseClasses, "text-red-600")}>
          <AlertCircle className="h-3 w-3" />
          Past Due
        </span>
      );
    } else if (daysUntilDue <= 3) {
      return (
        <span className={cn(baseClasses, "text-amber-600")}>
          <Clock className="h-3 w-3" />
          {daysUntilDue} {daysUntilDue === 1 ? "day" : "days"} left
        </span>
      );
    } else {
      return (
        <span className={cn(baseClasses, "text-green-600")}>
          <Calendar className="h-3 w-3" />
          {daysUntilDue} days left
        </span>
      );
    }
  };

  return (
    <Link
      href={
        role === "student"
          ? `/student/assignments/${assignment.id}`
          : `/teacher/assignments/${assignment.id}/submissions`
      }
      className={cn(
        "block p-5 rounded-lg border bg-card/50 hover:bg-card/80 transition-all hover:shadow-md group",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">
            {assignment.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{assignment.className}</p>
        </div>
        {getStatusBadge()}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {assignment.description}
      </p>

      {/* Meta Info */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
          </div>
          {getDueDateBadge()}
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>Max Points: {assignment.maxPoints}</span>
          </div>
          {role === "teacher" && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>
                {assignment.submissionCount || 0}/{assignment.gradedCount || 0}
              </span>
            </div>
          )}
        </div>

        {/* Progress for teachers */}
        {role === "teacher" && assignment.submissionCount !== undefined && (
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>
                <CheckCircle className="h-3 w-3 inline mr-1" />
                {assignment.gradedCount || 0} graded
              </span>
              <span>{assignment.pendingCount || 0} pending</span>
            </div>
            <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{
                  width: `${
                    assignment.submissionCount > 0
                      ? ((assignment.gradedCount || 0) / assignment.submissionCount) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
