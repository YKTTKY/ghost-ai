import { redirect } from "next/navigation"
import { AccessDenied } from "@/components/editor/access-denied"
import { RoomWorkspace } from "@/components/editor/room-workspace"
import {
  getAccessibleProject,
  getClerkIdentity,
} from "@/lib/project-access"
import { getOwnedProjects, getSharedProjects } from "@/lib/project-data"

/**
 * Server-rendered project room entry point.
 *
 * Unauthenticated users are redirected to sign-in. Missing or unauthorized
 * projects render AccessDenied. Authorized users get the room workspace shell.
 */
export default async function RoomPage({
  params,
}: PageProps<"/editor/[roomId]">) {
  const { roomId } = await params

  const identity = await getClerkIdentity()
  if (!identity) {
    redirect("/sign-in")
  }

  const project = await getAccessibleProject(
    roomId,
    identity.userId,
    identity.email
  )

  if (!project) {
    return <AccessDenied />
  }

  const [ownedProjects, sharedProjects] = await Promise.all([
    getOwnedProjects(identity.userId),
    identity.email
      ? getSharedProjects(identity.email)
      : Promise.resolve([]),
  ])

  const projectIds = new Set(ownedProjects.map((p) => p.id))
  const projects = [
    ...ownedProjects,
    ...sharedProjects.filter((p) => !projectIds.has(p.id)),
  ]

  return (
    <RoomWorkspace
      roomId={project.id}
      projectName={project.name}
      projects={projects}
      userId={identity.userId}
    />
  )
}
