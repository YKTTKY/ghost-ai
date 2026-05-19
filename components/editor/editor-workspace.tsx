"use client"

import { useState } from "react"
import type { ProjectData } from "@/hooks/use-project-actions"
import { useProjectActions } from "@/hooks/use-project-actions"
import { EditorHome } from "@/components/editor/editor-home"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectDialogs } from "@/components/editor/project-dialogs"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

interface EditorWorkspaceProps {
  projects: ProjectData[]
  userId: string
}

export function EditorWorkspace({ projects: initialProjects, userId }: EditorWorkspaceProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const {
    projects,
    activeDialog,
    selectedProjectId,
    selectedProjectName,
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
  } = useProjectActions(initialProjects, userId)

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
        userId={userId}
        onCreate={openCreate}
        onRename={openRename}
        onDelete={openDelete}
      />
      <main className="flex flex-1 flex-col">
        <EditorHome onCreate={openCreate} />
      </main>
      <ProjectDialogs
        activeDialog={activeDialog}
        currentProjectName={selectedProjectName}
        name={name}
        setName={setName}
        slug={slug}
        isSubmitting={isSubmitting}
        onCreate={handleCreate}
        onRename={handleRename}
        onDelete={handleDelete}
        onClose={closeDialog}
      />
    </div>
  )
}
