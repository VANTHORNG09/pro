import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  LayoutDashboard,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const highlights = [
  "Cut assignment confusion across classes and roles",
  "Keep submissions, grading, and communication in one system",
  "Designed for students, teachers, and school admins",
];

const metrics = [
  { value: "3", label: "role-based workspaces" },
  { value: "24/7", label: "deadline visibility" },
  { value: "1", label: "shared academic hub" },
];

const pillars = [
  {
    title: "For students",
    description:
      "See upcoming work, submit faster, and stay on top of progress without switching between tools.",
    icon: Clock3,
  },
  {
    title: "For teachers",
    description:
      "Create assignments, track submissions, and review classroom activity from one structured dashboard.",
    icon: LayoutDashboard,
  },
  {
    title: "For schools",
    description:
      "Standardize workflows, reduce missed handoffs, and keep academic coordination visible across teams.",
    icon: ShieldCheck,
  },
];

const steps = [
  {
    title: "Publish work clearly",
    description: "Assignments, deadlines, and expectations stay visible in a shared class flow.",
  },
  {
    title: "Keep every update connected",
    description: "Submissions, status changes, and messages stay attached to the same work item.",
  },
  {
    title: "Act before issues grow",
    description: "Role-specific dashboards make overdue work and student progress easier to spot early.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f3efe7_0%,#fbf7ef_32%,#fcfaf5_62%,#f4efe7_100%)] text-slate-900">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(202,138,4,0.14),transparent_26%),radial-gradient(circle_at_85%_14%,rgba(14,116,144,0.12),transparent_24%),radial-gradient(circle_at_55%_62%,rgba(185,28,28,0.08),transparent_30%)]" />
        <div className="absolute left-[8%] top-28 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute right-[10%] top-36 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />
        <div className="absolute bottom-16 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-200/25 blur-3xl" />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-16 pt-6 sm:px-8 lg:px-10">
        <header className="sticky top-4 z-30 rounded-[28px] border border-slate-900/10 bg-white/70 px-5 py-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f766e,#d97706)] text-white shadow-lg shadow-amber-700/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                  AssignBridge
                </p>
                <p className="text-sm font-semibold text-slate-900">
                  Academic workflow, upgraded
                </p>
              </div>
            </div>

            <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
              <a href="#platform">Platform</a>
              <a href="#roles">Roles</a>
              <a href="#workflow">Workflow</a>
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="hidden rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-white sm:inline-flex"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Start free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-12 px-1 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:py-18">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/70 bg-white/75 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-700 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              Upgrade the school day
            </div>

            <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.02] tracking-[-0.04em] text-balance text-slate-950 sm:text-6xl lg:text-7xl">
              One calm place to run assignments, feedback, and classroom momentum.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              AssignBridge gives students, teachers, and administrators a shared
              system for managing academic work without scattered tools,
              missed deadlines, or unclear handoffs.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0f766e,#0f172a)] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5"
              >
                Create your workspace
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#platform"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white"
              >
                See how it works
              </a>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-[24px] border border-white/70 bg-white/65 px-4 py-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur"
                >
                  <p className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-10 hidden rounded-[26px] border border-white/60 bg-white/65 px-4 py-3 shadow-lg backdrop-blur md:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Live visibility
              </p>
              <p className="mt-1 text-sm font-medium text-slate-900">
                Deadlines, progress, and feedback in sync
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[34px] border border-slate-900/10 bg-[#1e293b] p-3 shadow-[0_30px_90px_rgba(15,23,42,0.22)]">
              <div className="rounded-[28px] bg-[linear-gradient(180deg,#f7f3ea_0%,#efe8da_100%)] p-4 sm:p-5">
                <div className="flex items-center justify-between rounded-[22px] bg-slate-900 px-4 py-3 text-white">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                      Student dashboard
                    </p>
                    <p className="mt-1 text-sm font-semibold">Today at a glance</p>
                  </div>
                  <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-medium text-emerald-300">
                    4 items active
                  </div>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
                  <aside className="rounded-[24px] bg-white p-4 shadow-sm">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      Workspace
                    </p>
                    <div className="mt-4 space-y-2">
                      {[
                        "Dashboard",
                        "Assignments",
                        "Classes",
                        "Messages",
                        "Progress",
                      ].map((item, index) => (
                        <div
                          key={item}
                          className={`rounded-2xl px-4 py-3 text-sm font-medium ${
                            index === 0
                              ? "bg-amber-100 text-amber-900"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 rounded-[22px] bg-slate-900 px-4 py-4 text-white">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                        Weekly progress
                      </p>
                      <p className="mt-2 text-3xl font-semibold">86%</p>
                      <p className="mt-1 text-sm text-slate-300">
                        Completed on schedule this week
                      </p>
                    </div>
                  </aside>

                  <div className="space-y-4 rounded-[24px] bg-white p-4 shadow-sm">
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        ["Due today", "02"],
                        ["Reviewed", "11"],
                        ["Classes", "06"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="rounded-[20px] bg-slate-100 px-4 py-4"
                        >
                          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                            {label}
                          </p>
                          <p className="mt-2 text-2xl font-semibold text-slate-950">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-[24px] border border-slate-200 px-4 py-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            Upcoming work
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            Clear priorities across classes
                          </p>
                        </div>
                        <div className="rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">
                          Synced view
                        </div>
                      </div>

                      <div className="mt-4 space-y-3">
                        {[
                          ["Essay draft", "English", "Due today", "bg-rose-500"],
                          ["Problem set 3", "Mathematics", "Due tomorrow", "bg-amber-500"],
                          ["Lab report", "Chemistry", "Submitted", "bg-emerald-500"],
                        ].map(([title, subject, status, dot]) => (
                          <div
                            key={title}
                            className="flex items-center justify-between gap-3 rounded-[18px] bg-slate-50 px-4 py-3"
                          >
                            <div className="flex items-center gap-3">
                              <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />
                              <div>
                                <p className="text-sm font-medium text-slate-900">{title}</p>
                                <p className="text-xs text-slate-500">{subject}</p>
                              </div>
                            </div>
                            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
                              {status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="platform"
          className="grid gap-6 rounded-[36px] border border-white/70 bg-white/60 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl lg:grid-cols-[0.9fr_1.1fr] lg:p-8"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              Why it works
            </p>
            <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl">
              Built to replace scattered academic tools with one shared rhythm.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-600">
              AssignBridge brings planning, submissions, grading, and classroom
              communication into one place so every role sees the same reality.
            </p>

            <div className="mt-6 space-y-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-[22px] bg-[#f7f1e6] px-4 py-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-[28px] border border-slate-200 bg-[#fffdf9] p-5 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="roles"
          className="grid gap-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14"
        >
          <div className="rounded-[34px] bg-slate-900 p-7 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              Role-ready platform
            </p>
            <h2 className="mt-3 max-w-lg font-serif text-3xl leading-tight tracking-[-0.03em] text-white sm:text-4xl">
              Different users, one connected workflow.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Students focus on completion, teachers focus on review, and admins
              focus on coordination. The system keeps each view distinct while
              preserving shared context.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Students",
                  text: "Track due dates, submission status, and class activity from one dashboard.",
                  icon: Users,
                },
                {
                  title: "Teachers",
                  text: "Manage classroom assignments, monitor submissions, and review work with less friction.",
                  icon: MessageSquareText,
                },
              ].map(({ title, text, icon: Icon }) => (
                <div key={title} className="rounded-[24px] bg-white/8 p-5">
                  <Icon className="h-5 w-5 text-amber-300" />
                  <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[34px] border border-slate-200 bg-white/70 p-7 shadow-[0_24px_80px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
              What changes
            </p>
            <div className="mt-5 space-y-4">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-[24px] bg-slate-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-sm font-semibold text-slate-950 shadow-sm">
                    0{index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="rounded-[36px] border border-white/70 bg-[linear-gradient(135deg,#fffaf2_0%,#f5f7fb_100%)] px-6 py-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-8 sm:py-10"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500">
                Ready to move
              </p>
              <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Upgrade the landing page and the platform story at the same time.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                This version positions AssignBridge as a focused academic
                operating layer instead of a generic assignment tracker.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Launch your account
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              >
                Open demo flow
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
