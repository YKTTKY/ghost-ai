"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, XIcon } from "lucide-react"

interface ProjectSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  const [activeTab, setActiveTab] = useState("my-projects")

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
        {...(!isOpen ? { inert: '' } : {})}
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

            <TabsContent value="my-projects" className="flex flex-1 flex-col items-center justify-center p-4">
              <p className="text-sm text-text-muted">No projects yet</p>
            </TabsContent>
            <TabsContent value="shared" className="flex flex-1 flex-col items-center justify-center p-4">
              <p className="text-sm text-text-muted">No shared projects</p>
            </TabsContent>
          </Tabs>

          <div className="p-4 pt-2">
            <Button className="w-full gap-2" tabIndex={!isOpen ? -1 : undefined}>
              <Plus className="size-4" />
              New Project
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
