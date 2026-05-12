"use client"

import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export function EditorNavbar({ isSidebarOpen, onToggleSidebar }: EditorNavbarProps) {
  return (
    <nav className="flex h-12 items-center justify-between border-b border-border-default bg-surface px-4">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          {isSidebarOpen ? (
            <PanelLeftOpen className="size-5" />
          ) : (
            <PanelLeftClose className="size-5" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>
      <div />
      <div />
    </nav>
  )
}
