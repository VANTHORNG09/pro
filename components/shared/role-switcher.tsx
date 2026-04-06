// components/shared/role-switcher.tsx
"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const roles = ["admin", "teacher", "student"] as const

export function RoleSwitcher() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentRole = (searchParams.get("role") || "student").toLowerCase()

  const setRole = (role: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("role", role)
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2">
      {roles.map((role) => (
        <Button
          key={role}
          variant={currentRole === role ? "default" : "outline"}
          size="sm"
          onClick={() => setRole(role)}
          className={cn("capitalize")}
        >
          {role}
        </Button>
      ))}
    </div>
  )
}