"use client"

import { useState } from "react"
import type { ProjectData } from "@/hooks/use-project-actions"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil, Plus, Trash2, XIcon } from "lucide-react"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  projects: ProjectData[]
  userId: string
  onCreate: () => void
  onRename: (projectId: string, currentName: string) => void
  onDelete: (projectId: string) => void
}

/**
 * Renders a slide-in projects sidebar with tabs for "My Projects" and "Shared", per-project rename/delete actions, and a "New Project" action.
 *
 * The sidebar's visibility is controlled by `isOpen`; clicking the backdrop or the header close button calls `onClose`. The "My Projects"
 * tab lists projects whose `ownerId` equals `userId`. Action callbacks are invoked for creating, renaming, and deleting projects.
 *
 * @param isOpen - Whether the sidebar is visible
 * @param onClose - Callback invoked to close the sidebar
 * @param projects - Array of project objects to display
 * @param userId - Identifier used to determine which projects are owned by the current user (projects with `ownerId === userId` are shown under "My Projects")
 * @param onCreate - Callback invoked when the "New Project" button is clicked
 * @param onRename - Callback invoked to start renaming a project; called with `(projectId, currentName)`
 * @param onDelete - Callback invoked to delete a project; called with `(projectId)`
 * @returns The rendered sidebar React element
 */
export function ProjectSidebar({ isOpen, onClose, projects, userId, onCreate, onRename, onDelete }: ProjectSidebarProps) {
  const [activeTab, setActiveTab] = useState("my-projects")
  const ownedProjects = projects.filter((p) => p.ownerId === userId)

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-80 p-3 transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!isOpen}
        inert={!isOpen || undefined}
      >
        <div className="flex h-full w-full flex-col rounded-2xl border border-border-default bg-surface shadow-lg">
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <h2 className="text-base font-medium text-text-primary">Projects</h2>
            <Button variant="ghost" size="icon-sm" onClick={onClose} tabIndex={!isOpen ? -1 : undefined}>
              <XIcon className="size-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex min-h-0 flex-1 flex-col">
            <div className="px-4 pb-2">
              <TabsList className="w-full">
                <TabsTrigger value="my-projects" className="flex-1" tabIndex={!isOpen ? -1 : undefined}>My Projects</TabsTrigger>
                <TabsTrigger value="shared" className="flex-1" tabIndex={!isOpen ? -1 : undefined}>Shared</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="my-projects" className="flex min-h-0 flex-1 flex-col">
              {ownedProjects.length === 0 ? (
                <div className="flex flex-1 items-center justify-center p-4">
                  <p className="text-sm text-text-muted">No projects yet</p>
                </div>
              ) : (
                <ScrollArea className="flex-1 px-4">
                  <div className="flex flex-col gap-1 pb-2">
                    {ownedProjects.map((project) => (
                      <div
                        key={project.id}
                        className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-bg-subtle"
                      >
                        <span className="truncate">{project.name}</span>
                        <div className="flex shrink-0 gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => onRename(project.id, project.name)}
                            tabIndex={!isOpen ? -1 : undefined}
                          >
                            <Pencil className="size-3.5" />
                            <span className="sr-only">Rename {project.name}</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={() => onDelete(project.id)}
                            tabIndex={!isOpen ? -1 : undefined}
                          >
                            <Trash2 className="size-3.5" />
                            <span className="sr-only">Delete {project.name}</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </TabsContent>

            <TabsContent value="shared" className="flex flex-1 flex-col items-center justify-center p-4">
              <p className="text-sm text-text-muted">No shared projects</p>
            </TabsContent>
          </Tabs>

          <div className="p-4 pt-2">
            <Button className="w-full gap-2" onClick={onCreate} tabIndex={!isOpen ? -1 : undefined}>
              <Plus className="size-4" />
              New Project
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
