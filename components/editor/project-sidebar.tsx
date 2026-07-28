"use client"

import { useState } from "react"
import Link from "next/link"
import type { ProjectData } from "@/hooks/use-project-actions"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil, Plus, Trash2, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
  projects: ProjectData[]
  userId: string
  currentRoomId?: string
  onCreate: () => void
  onRename: (projectId: string, currentName: string) => void
  onDelete: (projectId: string) => void
}

/**
 * Renders a slide-in projects sidebar with tabs for "My Projects" and "Shared",
 * optional current-room highlighting, per-project rename/delete actions, and a
 * "New Project" action.
 */
export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  userId,
  currentRoomId,
  onCreate,
  onRename,
  onDelete,
}: ProjectSidebarProps) {
  const [activeTab, setActiveTab] = useState("my-projects")
  const ownedProjects = projects.filter((p) => p.ownerId === userId)
  const sharedProjects = projects.filter((p) => p.ownerId !== userId)

  function renderProjectList(
    list: ProjectData[],
    emptyLabel: string,
    showOwnerActions: boolean
  ) {
    if (list.length === 0) {
      return (
        <div className="flex flex-1 items-center justify-center p-4">
          <p className="text-sm text-text-muted">{emptyLabel}</p>
        </div>
      )
    }

    return (
      <ScrollArea className="flex-1 px-4">
        <div className="flex flex-col gap-1 pb-2">
          {list.map((project) => {
            const isCurrent = currentRoomId === project.id

            return (
              <div
                key={project.id}
                className={cn(
                  "group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-text-primary hover:bg-bg-subtle",
                  isCurrent && "bg-accent-primary-dim text-accent-primary hover:bg-accent-primary-dim"
                )}
              >
                <Link
                  href={`/editor/${project.id}`}
                  onClick={onClose}
                  className="min-w-0 flex-1 truncate"
                  tabIndex={!isOpen ? -1 : undefined}
                >
                  {project.name}
                </Link>
                {showOwnerActions ? (
                  <div className="flex shrink-0 gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
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
                ) : null}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    )
  }

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
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              tabIndex={!isOpen ? -1 : undefined}
            >
              <XIcon className="size-4" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="px-4 pb-2">
              <TabsList className="w-full">
                <TabsTrigger
                  value="my-projects"
                  className="flex-1"
                  tabIndex={!isOpen ? -1 : undefined}
                >
                  My Projects
                </TabsTrigger>
                <TabsTrigger
                  value="shared"
                  className="flex-1"
                  tabIndex={!isOpen ? -1 : undefined}
                >
                  Shared
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="my-projects" className="flex min-h-0 flex-1 flex-col">
              {renderProjectList(ownedProjects, "No projects yet", true)}
            </TabsContent>

            <TabsContent value="shared" className="flex min-h-0 flex-1 flex-col">
              {renderProjectList(sharedProjects, "No shared projects", false)}
            </TabsContent>
          </Tabs>

          <div className="p-4 pt-2">
            <Button
              className="w-full gap-2"
              onClick={onCreate}
              tabIndex={!isOpen ? -1 : undefined}
            >
              <Plus className="size-4" />
              New Project
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
