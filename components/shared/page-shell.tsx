// components/shared/page-shell.tsx
import { ReactNode } from "react"

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">{children}</div>
    </main>
  )
}