"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface EditorHomeProps {
  onCreate: () => void
}

/**
 * Render a centered home view prompting the user to create a new project or open an existing one.
 *
 * @param onCreate - Callback invoked when the "New Project" button is clicked.
 * @returns A React element representing the editor home UI.
 */
export function EditorHome({ onCreate }: EditorHomeProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3">
      <h1 className="text-lg font-medium text-text-primary">
        Create a project or open an existing one
      </h1>
      <p className="text-sm text-text-muted">
        Start a new architecture workspace, or choose a project from the sidebar.
      </p>
      <Button className="mt-2 gap-2" onClick={onCreate}>
        <Plus className="size-4" />
        New Project
      </Button>
    </div>
  )
}
