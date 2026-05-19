"use client"

import { useState, useCallback } from "react"
import { toSlug } from "@/lib/slug"

export type DialogType = "create" | "rename" | "delete" | null

/**
 * Manage dialog state for project create, rename, and delete flows.
 *
 * Exposes state and callbacks to open/close dialogs, edit the pending name, and track submission status.
 *
 * @returns An object with:
 * - `activeDialog` — the currently open dialog: `"create" | "rename" | "delete" | null`
 * - `selectedProjectId` — the project ID associated with the active dialog, or `null`
 * - `name` — the current input name for create/rename (empty for delete)
 * - `setName` — setter for `name`
 * - `slug` — a slug derived from `name` (empty string when `name` is empty)
 * - `isSubmitting` — `true` while a submission is in progress, `false` otherwise
 * - `setIsSubmitting` — setter for `isSubmitting`
 * - `openCreate()` — open the create dialog (clears `name` and `selectedProjectId`)
 * - `openRename(projectId, currentName)` — open the rename dialog for `projectId` and populate `name` with `currentName`
 * - `openDelete(projectId)` — open the delete dialog for `projectId` and clear `name`
 * - `closeDialog()` — close any open dialog and reset `selectedProjectId`, `name`, and `isSubmitting`
 */
export function useProjectDialogs() {
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const openCreate = useCallback(() => {
    setName("")
    setSelectedProjectId(null)
    setActiveDialog("create")
  }, [])

  const openRename = useCallback((projectId: string, currentName: string) => {
    setName(currentName)
    setSelectedProjectId(projectId)
    setActiveDialog("rename")
  }, [])

  const openDelete = useCallback((projectId: string) => {
    setSelectedProjectId(projectId)
    setName("")
    setActiveDialog("delete")
  }, [])

  const closeDialog = useCallback(() => {
    setActiveDialog(null)
    setSelectedProjectId(null)
    setName("")
    setIsSubmitting(false)
  }, [])

  const slug = name ? toSlug(name) : ""

  return {
    activeDialog,
    selectedProjectId,
    name,
    setName,
    slug,
    isSubmitting,
    setIsSubmitting,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
  }
}
