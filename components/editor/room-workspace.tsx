"use client"

import { useState } from "react"
import type { ProjectData } from "@/hooks/use-project-actions"
import { useProjectActions } from "@/hooks/use-project-actions"
import { EditorNavbar } from "@/components/editor/editor-navbar"
import { ProjectDialogs } from "@/components/editor/project-dialogs"
import { ProjectSidebar } from "@/components/editor/project-sidebar"

interface RoomWorkspaceProps {
  roomId: string
  projectName: string
  projects: ProjectData[]
  userId: string
}

/**
 * Full-viewport project room shell with navbar, sidebars, and canvas placeholder.
 *
 * Share and AI actions are present as UI affordances only — no real behavior yet.
 */
export function RoomWorkspace({
  roomId,
  projectName,
  projects: initialProjects,
  userId,
}: RoomWorkspaceProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false)

  const {
    projects,
    activeDialog,
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
    <div className="flex h-screen flex-col bg-base">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((v) => !v)}
        projectName={projectName}
        onShare={() => {}}
        isAiSidebarOpen={isAiSidebarOpen}
        onToggleAiSidebar={() => setIsAiSidebarOpen((v) => !v)}
      />

      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        userId={userId}
        currentRoomId={roomId}
        onCreate={openCreate}
        onRename={openRename}
        onDelete={openDelete}
      />

      <div className="flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-1 flex-col bg-base">
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-text-muted">Canvas coming soon</p>
          </div>
        </main>

        {isAiSidebarOpen ? (
          <aside className="flex w-80 shrink-0 flex-col border-l border-border-default bg-surface">
            <div className="flex h-12 items-center border-b border-border-default px-4">
              <h2 className="text-sm font-medium text-text-primary">AI Assistant</h2>
            </div>
            <div className="flex flex-1 items-center justify-center p-4">
              <p className="text-center text-sm text-text-muted">AI chat coming soon</p>
            </div>
          </aside>
        ) : null}
      </div>

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
