"use client"

import { useState } from "react"
import type { MockProject } from "@/lib/mock-projects"
import { getMockProjects, createMockProject, renameMockProject, deleteMockProject } from "@/lib/mock-projects"
import { useProjectDialogs } from "@/hooks/use-project-dialogs"
import { EditorHome } from "@/components/editor/editor-home"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectDialogs } from "@/components/editor/project-dialogs"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

export function EditorWorkspace() {
  const [projects, setProjects] = useState<MockProject[]>(getMockProjects)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const {
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
  } = useProjectDialogs()

  const handleCreate = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setProjects((prev) => createMockProject(name, prev))
      closeDialog()
    }, 300)
  }

  const handleRename = () => {
    if (!selectedProjectId) return
    setIsSubmitting(true)
    setTimeout(() => {
      setProjects((prev) => renameMockProject(selectedProjectId, name, prev))
      closeDialog()
    }, 300)
  }

  const handleDelete = () => {
    if (!selectedProjectId) return
    setIsSubmitting(true)
    setTimeout(() => {
      setProjects((prev) => deleteMockProject(selectedProjectId, prev))
      closeDialog()
    }, 300)
  }

  return (
    <div className="flex flex-col h-screen bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        onCreate={openCreate}
        onRename={openRename}
        onDelete={openDelete}
      />
      <main className="flex flex-1 flex-col">
        <EditorHome onCreate={openCreate} />
      </main>
      <ProjectDialogs
        activeDialog={activeDialog}
        selectedProjectId={selectedProjectId}
        name={name}
        setName={setName}
        slug={slug}
        isSubmitting={isSubmitting}
        projects={projects}
        onCreate={handleCreate}
        onRename={handleRename}
        onDelete={handleDelete}
        onClose={closeDialog}
      />
    </div>
  )
}
