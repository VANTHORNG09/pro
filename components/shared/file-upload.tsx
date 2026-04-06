// components/shared/file-upload.tsx
"use client"

import { useState } from "react"
import { UploadCloud, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FileUpload() {
  const [fileName, setFileName] = useState<string>("")

  return (
    <div className="rounded-xl border border-dashed border-border p-4">
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 text-center">
        <UploadCloud className="h-8 w-8 text-muted-foreground" />
        <span className="text-sm font-medium">Click to upload assignment file</span>
        <span className="text-xs text-muted-foreground">
          PDF, DOCX, ZIP up to 10MB
        </span>
        <input
          type="file"
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
        />
      </label>

      {fileName ? (
        <div className="mt-4 flex items-center justify-between rounded-lg border p-2">
          <span className="truncate text-sm">{fileName}</span>
          <Button variant="ghost" size="icon" onClick={() => setFileName("")}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : null}
    </div>
  )
}