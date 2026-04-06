import {
  AlertCircle,
  Clock3,
  MessageSquareWarning,
  BarChart3,
  BellRing,
  BookOpenCheck,
  ChartNoAxesCombined,
  FileCheck2,
  MessageSquareText,
  Users,
  GraduationCap,
  Layers3,
  CheckCircle2,
  ShieldCheck,
  CalendarCheck2,
  Workflow,
  School,
  ClipboardList,
} from "lucide-react";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import type {
  PainPoint,
  StatItem,
  UpcomingAssignment,
  ClassProgressItem,
  QuickStatItem,
} from "../types/landing-page";

export const painPoints: PainPoint[] = [
  {
    icon: Clock3,
    title: "Missed Deadlines",
    description:
      "Students often forget assignment due dates when tasks are spread across different classes and platforms.",
  },
  {
    icon: MessageSquareWarning,
    title: "Scattered Communication",
    description:
      "Important updates, teacher feedback, and class announcements are often difficult to track in one place.",
  },
  {
    icon: BarChart3,
    title: "Lack of Progress Visibility",
    description:
      "Students and teachers struggle to clearly monitor submission status, class performance, and ongoing progress.",
  },
  {
    icon: AlertCircle,
    title: "Manual Academic Management",
    description:
      "Handling assignments, classes, reminders, and reports manually wastes time and increases confusion.",
  },
];

export const stats: StatItem[] = [
  { value: "1", label: "Centralized platform" },
  { value: "3", label: "User roles" },
  { value: "24/7", label: "Access to class workflow" },
];

export const chips: string[] = [
  "No more context switching",
  "Real-time updates",
  "Deadline clarity",
];

export const features = [
  {
    icon: BookOpenCheck,
    title: "Assignment Tracking",
    description:
      "Keep every task organized by class, due date, and submission status so students always know what needs attention first.",
  },
  {
    icon: BellRing,
    title: "Deadline Reminders",
    description:
      "Reduce missed work with clear due-date visibility and timely reminders for upcoming assignments and class activities.",
  },
  {
    icon: Users,
    title: "Class-Based Organization",
    description:
      "Group assignments, updates, and learning activities by class to avoid confusion and make navigation easier for everyone.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Progress Dashboard",
    description:
      "Give students and teachers a simple way to monitor completion, performance, and academic progress in one place.",
  },
  {
    icon: FileCheck2,
    title: "Submission Management",
    description:
      "Support assignment submission workflows with better structure, clearer status tracking, and easier follow-up on pending work.",
  },
  {
    icon: MessageSquareText,
    title: "Announcements & Feedback",
    description:
      "Keep communication centralized through class announcements, updates, and teacher feedback without relying on scattered tools.",
  },
];

export const howItWorksSteps = [
  {
    number: "01",
    title: "Join Your Class Workspace",
    description:
      "Students and teachers enter a shared class space where assignments, updates, and learning activities stay organized in one place.",
  },
  {
    number: "02",
    title: "Track Tasks and Deadlines",
    description:
      "View upcoming assignments, due dates, and progress clearly so nothing gets missed across different classes.",
  },
  {
    number: "03",
    title: "Submit and Monitor Progress",
    description:
      "Send submissions, review completion status, and keep academic progress visible for both students and teachers.",
  },
];

export const userRoles = [
  {
    id: "01",
    title: "Students",
    icon: GraduationCap,
    description:
      "Stay on top of assignments, due dates, and submission progress in one organized academic workspace.",
    points: [
      "View tasks by class",
      "Track upcoming deadlines",
      "Submit work with clarity",
      "Monitor review status and progress",
    ],
  },
  {
    id: "02",
    title: "Teachers",
    icon: BookOpenCheck,
    description:
      "Manage classroom assignments, review submissions, and keep student progress visible without scattered tools.",
    points: [
      "Create and manage assignments",
      "Set deadlines and instructions",
      "Review student submissions",
      "Monitor class progress efficiently",
    ],
  },
  {
    id: "03",
    title: "Shared Classroom Workflow",
    icon: Users,
    description:
      "Bring students and teachers into one connected workflow where communication, task tracking, and academic progress stay aligned.",
    points: [
      "Centralized class workspace",
      "Clear academic coordination",
      "Less confusion across classes",
      "Better visibility for everyone",
    ],
  },
];

export const upcomingAssignments: UpcomingAssignment[] = [
  {
    title: "Database Design Report",
    course: "Database Systems",
    due: "Due in 2 days",
    status: "In Review",
  },
  {
    title: "UI Prototype Submission",
    course: "Web Design",
    due: "Due tomorrow",
    status: "Pending",
  },
  {
    title: "Network Security Quiz",
    course: "Cybersecurity",
    due: "Due in 4 days",
    status: "Published",
  },
];

export const classProgress: ClassProgressItem[] = [
  { label: "Submitted", value: "86%" },
  { label: "Pending", value: "10%" },
  { label: "Late", value: "4%" },
];

export const recentActivities: string[] = [
  "Mr. Dara reviewed 8 student submissions",
  "New assignment added for Web Design",
  "Students in OOP class reached 92% completion",
];

export const quickStats: QuickStatItem[] = [
  {
    icon: Layers3,
    label: "Active Assignments",
    value: "12",
  },
  {
    icon: Users,
    label: "Classes Running",
    value: "3",
  },
  {
    icon: CheckCircle2,
    label: "Submission Rate",
    value: "86%",
  },
  {
    icon: Clock3,
    label: "Pending Reviews",
    value: "5",
  },
];

export const platformStats = [
  {
    value: "3",
    label: "User Roles",
    description:
      "Student, Teacher, and Admin access in one connected platform.",
  },
  {
    value: "1",
    label: "Unified Workspace",
    description:
      "Assignments, classes, progress, and updates managed together.",
  },
  {
    value: "24/7",
    label: "Platform Access",
    description:
      "Users can check academic activity anytime from one dashboard.",
  },
  {
    value: "Real-Time",
    label: "Visibility",
    description: "Track submissions, reviews, and announcements without delay.",
  },
];

export const whyChooseItems = [
  {
    icon: Layers3,
    title: "Centralized Academic Workflow",
    description:
      "AssignBridge brings assignments, classroom updates, submissions, and performance tracking into one organized system.",
  },
  {
    icon: CalendarCheck2,
    title: "Better Deadline Awareness",
    description:
      "Students can quickly see upcoming work, due dates, and task status without jumping between multiple tools.",
  },
  {
    icon: BellRing,
    title: "Stronger Communication Flow",
    description:
      "Teachers and students stay aligned through visible updates, feedback, and class activity in a shared space.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Clear Progress Tracking",
    description:
      "Submission states, review progress, and class performance are easier to monitor through one dashboard view.",
  },
  {
    icon: Users,
    title: "Built for Multiple Roles",
    description:
      "The platform supports students, teachers, and administrators with a structure that reflects real academic coordination.",
  },
  {
    icon: ShieldCheck,
    title: "Structured and Scalable Design",
    description:
      "AssignBridge is designed as a role-based academic platform that can grow with future school management needs.",
  },
];

export const audienceGroups = [
  {
    title: "For Teachers",
    description:
      "Manage assignments, deadlines, class activity, and student submissions from one structured workspace.",
    icon: GraduationCap,
    points: [
      {
        icon: ClipboardList,
        text: "Create and organize assignments with clear due dates.",
      },
      {
        icon: BellRing,
        text: "Share updates, instructions, and feedback in one place.",
      },
      {
        icon: BarChart3,
        text: "Track submission progress and classroom performance more efficiently.",
      },
    ],
  },
  {
    title: "For Students",
    description:
      "Stay focused on upcoming work, submission status, and course expectations without switching between scattered tools.",
    icon: BookOpenCheck,
    points: [
      {
        icon: Clock3,
        text: "View deadlines and priorities in one clear dashboard.",
      },
      {
        icon: CheckCircle2,
        text: "Know what is submitted, pending, or still in progress.",
      },
      {
        icon: MessageSquareText,
        text: "Receive updates and feedback with better visibility.",
      },
    ],
  },
  {
    title: "For Classrooms",
    description:
      "Bring academic workflow, communication, and accountability together in a more connected digital environment.",
    icon: School,
    points: [
      {
        icon: Workflow,
        text: "Centralize tasks, updates, and submissions across classes.",
      },
      {
        icon: Users,
        text: "Support collaboration between teachers, students, and administrators.",
      },
      {
        icon: ShieldCheck,
        text: "Build a structured foundation that can scale with school needs.",
      },
    ],
  },
];

export const trustStatements = [
  {
    title: "Designed around real academic workflow",
    description:
      "AssignBridge is structured to reflect how assignments, communication, and classroom responsibilities actually move in a school environment.",
  },
  {
    title: "Built for clarity, not complexity",
    description:
      "The platform focuses on reducing confusion by giving users a more organized view of deadlines, progress, and class activity.",
  },
  {
    title: "Made to support future growth",
    description:
      "Its role-based structure creates a strong foundation for expansion into broader school management features over time.",
  },
];

export const faqItems = [
  {
    question: "What is AssignBridge?",
    answer:
      "AssignBridge is a classroom workflow platform that helps students and teachers manage assignments, deadlines, class updates, and progress in one place.",
  },
  {
    question: "Who is AssignBridge built for?",
    answer:
      "AssignBridge is designed for students, teachers, and classrooms that need a clearer and more structured way to handle academic tasks and communication.",
  },
  {
    question: "Can students track deadlines and submissions easily?",
    answer:
      "Yes. Students can view assignments, monitor deadlines, follow submission progress, and stay updated without switching between multiple tools.",
  },
  {
    question: "How does AssignBridge help teachers?",
    answer:
      "Teachers can organize classroom tasks, share updates, track student progress, and reduce confusion around assignment management and communication.",
  },
  {
    question: "Is AssignBridge suitable for classroom collaboration?",
    answer:
      "Yes. The platform is built to support classroom workflows by keeping assignment details, communication, and progress visibility centralized.",
  },
  {
    question: "Do I need multiple tools to use AssignBridge?",
    answer:
      "No. AssignBridge is intended to reduce scattered workflows by combining essential classroom management functions into one platform.",
  },
];

export const productLinks = [
  { label: "Assignments", href: "#" },
  { label: "Classes", href: "#" },
  { label: "Progress Tracking", href: "#" },
  { label: "Announcements", href: "#" },
];

export const companyLinks = [
  { label: "About", href: "#" },
  { label: "FAQ", href: "#faq" },
  { label: "Login", href: "#" },
  { label: "Signup", href: "#" },
];

export const supportLinks = [
  { label: "Help Center", href: "#" },
  { label: "Contact Us", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/piseth.mao.2025",
    label: "Facebook",
  },
  { icon: FaGithub, href: "https://github.com/PisethMao", label: "GitHub" },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/piseth-mao-9223333bb/",
    label: "LinkedIn",
  },
  {
    icon: MdEmail,
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=pisethmao2002@gmail.com",
    label: "Email",
  },
];
