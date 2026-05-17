"use client"

import { useState, useCallback } from "react"
import { toSlug } from "@/lib/slug"

export type DialogType = "create" | "rename" | "delete" | null

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
