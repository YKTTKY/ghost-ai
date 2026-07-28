"use client"

import { UserButton } from "@clerk/nextjs"
import { dark } from "@clerk/ui/themes"
import { Button } from "@/components/ui/button"
import {
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Share2,
} from "lucide-react"

interface EditorNavbarProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
  projectName?: string
  onShare?: () => void
  isAiSidebarOpen?: boolean
  onToggleAiSidebar?: () => void
}

/**
 * Top editor chrome with optional project title and room actions.
 */
export function EditorNavbar({
  isSidebarOpen,
  onToggleSidebar,
  projectName,
  onShare,
  isAiSidebarOpen = false,
  onToggleAiSidebar,
}: EditorNavbarProps) {
  return (
    <nav className="flex h-12 shrink-0 items-center justify-between border-b border-border-default bg-surface px-4">
      <div className="flex min-w-0 items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar}>
          {isSidebarOpen ? (
            <PanelLeftOpen className="size-5" />
          ) : (
            <PanelLeftClose className="size-5" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        {projectName ? (
          <h1 className="truncate text-sm font-medium text-text-primary">
            {projectName}
          </h1>
        ) : null}
      </div>

      <div />

      <div className="flex items-center gap-1">
        {onShare ? (
          <Button variant="ghost" size="sm" className="gap-2" onClick={onShare}>
            <Share2 className="size-4" />
            Share
          </Button>
        ) : null}
        {onToggleAiSidebar ? (
          <Button variant="ghost" size="icon" onClick={onToggleAiSidebar}>
            {isAiSidebarOpen ? (
              <PanelRightClose className="size-5" />
            ) : (
              <PanelRightOpen className="size-5" />
            )}
            <span className="sr-only">Toggle AI sidebar</span>
          </Button>
        ) : null}
        <UserButton
          appearance={{
            theme: dark,
            variables: {
              colorPrimary: "var(--accent-primary)",
              colorBackground: "var(--bg-surface)",
              colorForeground: "var(--text-primary)",
              colorMutedForeground: "var(--text-secondary)",
              colorDanger: "var(--state-error)",
              fontFamily: "var(--font-geist-sans)",
            },
          }}
        />
      </div>
    </nav>
  )
}
