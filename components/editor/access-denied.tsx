import Link from "next/link"
import { Lock } from "lucide-react"

/**
 * Centered denial state for missing or unauthorized editor rooms.
 */
export function AccessDenied() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-base px-4">
      <Lock className="h-8 w-8 text-text-muted" />
      <div className="flex flex-col items-center gap-1 text-center">
        <p className="text-base font-medium text-text-primary">Access denied</p>
        <p className="text-sm text-text-muted">
          This project does not exist or you do not have permission to view it.
        </p>
      </div>
      <Link
        href="/editor"
        className="text-sm text-accent-primary underline-offset-4 hover:underline"
      >
        Back to editor
      </Link>
    </div>
  )
}
