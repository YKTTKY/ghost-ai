"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { toSlug } from "@/lib/slug"

export type DialogType = "create" | "rename" | "delete" | null

export interface ProjectData {
  id: string
  name: string
  ownerId: string
  createdAt: string
}

/**
 * Generates a short pseudo-random 4-character alphanumeric suffix.
 *
 * @returns A 4-character lowercase alphanumeric string.
function generateSuffix(): string {
  return Math.random().toString(36).substring(2, 6)
}

/**
 * Manage project list state and dialog/form actions for creating, renaming, and deleting projects.
 *
 * @param initialProjects - Initial array of projects to populate local state
 * @param userId - Current user's ID (accepted but not used by this hook)
 * @returns An object containing the current project state, dialog/input state, derived values, and action handlers:
 * - `projects`: current array of `ProjectData`
 * - `activeDialog`: current dialog type (`"create" | "rename" | "delete" | null`)
 * - `selectedProjectId`: ID of the project targeted by rename/delete, or `null`
 * - `selectedProjectName`: name of the selected project, or `""`
 * - `name` / `setName`: current input name and its setter
 * - `slug`: URL-friendly slug derived from `name`, or `""` when `name` is empty
 * - `isSubmitting`: boolean flag preventing concurrent submissions
 * - `openCreate`, `openRename`, `openDelete`, `closeDialog`: dialog control functions
 * - `handleCreate`, `handleRename`, `handleDelete`: async handlers that perform corresponding API requests and update local state
 */
export function useProjectActions(initialProjects: ProjectData[], userId: string) {
  const router = useRouter()
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects)
  const [activeDialog, setActiveDialog] = useState<DialogType>(null)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const slug = name ? toSlug(name) : ""

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

  const handleCreate = useCallback(async () => {
    const trimmed = name.trim()
    if (!trimmed || isSubmitting) return
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      })
      if (!res.ok) throw new Error("Failed to create project")
      const project = await res.json()
      router.push(`/editor/${project.id}`)
    } catch (err) {
      console.error(err)
      setIsSubmitting(false)
    }
  }, [name, isSubmitting, router])

  const handleRename = useCallback(async () => {
    const trimmed = name.trim()
    if (!selectedProjectId || !trimmed || isSubmitting) return
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/projects/${selectedProjectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      })
      if (!res.ok) throw new Error("Failed to rename project")
      const updated = await res.json()
      setProjects((prev) =>
        prev.map((p) => (p.id === updated.id ? { ...p, name: updated.name } : p))
      )
      closeDialog()
    } catch (err) {
      console.error(err)
      setIsSubmitting(false)
    }
  }, [selectedProjectId, name, isSubmitting, closeDialog])

  const handleDelete = useCallback(async () => {
    if (!selectedProjectId || isSubmitting) return
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/projects/${selectedProjectId}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete project")
      setProjects((prev) => prev.filter((p) => p.id !== selectedProjectId))
      closeDialog()
    } catch (err) {
      console.error(err)
      setIsSubmitting(false)
    }
  }, [selectedProjectId, isSubmitting, closeDialog])

  const selectedProject = projects.find((p) => p.id === selectedProjectId)

  return {
    projects,
    activeDialog,
    selectedProjectId,
    selectedProjectName: selectedProject?.name ?? "",
    name,
    setName,
    slug,
    isSubmitting,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  }
}
