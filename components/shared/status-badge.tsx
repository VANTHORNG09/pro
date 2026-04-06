// components/shared/status-badge.tsx
import { cn } from "@/lib/utils"

type StatusType =
  | "active"
  | "inactive"
  | "pending"
  | "submitted"
  | "late"
  | "draft"
  | "published"
  | "reviewed"

type StatusVariant = "info" | "success" | "warning"

type StatusBadgeProps =
  | { status: StatusType | string; className?: string }
  | { label: string; variant: StatusVariant; className?: string }

export function StatusBadge(props: StatusBadgeProps) {
  if ("status" in props) {
    const normalized = props.status.toLowerCase()

    return (
      <span
        className={cn(
          "inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize",
          normalized === "active" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
          normalized === "inactive" && "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
          normalized === "pending" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
          normalized === "submitted" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
          normalized === "late" && "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
          normalized === "draft" && "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
          normalized === "published" && "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
          normalized === "reviewed" && "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
          props.className
        )}
      >
        {props.status}
      </span>
    )
  }

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        props.variant === "info" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
        props.variant === "success" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
        props.variant === "warning" && "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
        props.className
      )}
    >
      {props.label}
    </span>
  )
}
