"use client"

import type { DialogType } from "@/hooks/use-project-dialogs"
import type { MockProject } from "@/lib/mock-projects"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface ProjectDialogsProps {
  activeDialog: DialogType
  selectedProjectId: string | null
  name: string
  setName: (name: string) => void
  slug: string
  isSubmitting: boolean
  projects: MockProject[]
  onCreate: () => void
  onRename: () => void
  onDelete: () => void
  onClose: () => void
}

/**
 * Render modal dialogs for creating, renaming, and deleting projects based on `activeDialog`.
 *
 * The component derives the currently selected project's name from `projects` and `selectedProjectId`,
 * binds `name`/`setName` to the create/rename inputs, and disables actions while `isSubmitting` is true.
 *
 * @param activeDialog - Which dialog is currently open: `"create"`, `"rename"`, or `"delete"`.
 * @param selectedProjectId - ID of the currently selected project; used to display the project's name in dialogs.
 * @param name - Controlled value for the project name input used by the create and rename dialogs.
 * @param setName - Setter to update the `name` input.
 * @param slug - Optional slug string; when present a `/slug` preview is shown in the create dialog.
 * @param isSubmitting - When true, action buttons are disabled and their labels show loading text.
 * @param projects - Array of projects used to look up the selected project's name.
 * @param onCreate - Called when the Create action is confirmed.
 * @param onRename - Called when the Rename action is confirmed (also triggered by Enter in the rename input).
 * @param onDelete - Called when the Delete action is confirmed.
 * @param onClose - Called when any dialog is dismissed or Cancel is clicked.
 * @returns The JSX fragment containing the Create, Rename, and Delete modal dialogs.
 */
export function ProjectDialogs({
  activeDialog,
  selectedProjectId,
  name,
  setName,
  slug,
  isSubmitting,
  projects,
  onCreate,
  onRename,
  onDelete,
  onClose,
}: ProjectDialogsProps) {
  const selectedProject = projects.find((p) => p.id === selectedProjectId)
  const currentProjectName = selectedProject?.name ?? ""

  return (
    <>
      <Dialog
        open={activeDialog === "create"}
        onOpenChange={(open) => { if (!open) onClose() }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="project-name" className="text-sm text-text-secondary">
              Project name
            </label>
            <Input
              id="project-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Architecture"
              autoFocus
            />
            {slug && (
              <p className="text-xs text-text-muted">
                /{slug}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onCreate} disabled={!name.trim() || isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "rename"}
        onOpenChange={(open) => { if (!open) onClose() }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
            <DialogDescription>
              Rename &ldquo;{currentProjectName}&rdquo; to something new.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && name.trim()) {
                onRename()
              }
            }}
          />
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onRename} disabled={!name.trim() || isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={activeDialog === "delete"}
        onOpenChange={(open) => { if (!open) onClose() }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{currentProjectName}&rdquo;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete} disabled={isSubmitting}>
              {isSubmitting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
