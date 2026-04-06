import type { LucideIcon } from "lucide-react";

export type PainPoint = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type UpcomingAssignment = {
  title: string;
  course: string;
  due: string;
  status: string;
};

export type ClassProgressItem = {
  label: string;
  value: string;
};

export type QuickStatItem = {
  icon: LucideIcon;
  label: string;
  value: string;
};