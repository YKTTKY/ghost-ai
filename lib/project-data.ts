import { prisma } from "@/lib/prisma"

interface ProjectRow {
  id: string
  name: string
  ownerId: string
  createdAt: Date
}

/**
 * Serialize a ProjectRow into a plain object suitable for JSON output.
 *
 * @param project - The database project row to serialize
 * @returns An object with `id`, `name`, `ownerId`, and `createdAt` as an ISO timestamp string
 */
function serialize(project: ProjectRow) {
  return {
    id: project.id,
    name: project.name,
    ownerId: project.ownerId,
    createdAt: project.createdAt.toISOString(),
  }
}

/**
 * Fetches projects owned by the given user, ordered by newest first.
 *
 * @param userId - The owner's user ID whose projects will be retrieved
 * @returns An array of serialized project objects (`id`, `name`, `ownerId`, and `createdAt` as an ISO string) ordered by `createdAt` descending
 */
export async function getOwnedProjects(userId: string) {
  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  })
  return projects.map(serialize)
}

/**
 * Fetches projects shared with the specified email (collaborator match), ordered by newest first.
 *
 * @param email - The user's primary email used to match collaborator entries
 * @returns An array of serialized project objects containing `id`, `name`, `ownerId`, and `createdAt` as an ISO string, ordered by `createdAt` descending
 */
export async function getSharedProjects(email: string) {
  const projects = await prisma.project.findMany({
    where: {
      collaborators: { some: { email } },
    },
    orderBy: { createdAt: "desc" },
  })
  return projects.map(serialize)
}
