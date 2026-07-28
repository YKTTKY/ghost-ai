import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

export interface ClerkIdentity {
  userId: string
  email: string | null
}

/**
 * Resolve the current Clerk user's id and primary email address.
 *
 * @returns The signed-in identity, or `null` when unauthenticated
 */
export async function getClerkIdentity(): Promise<ClerkIdentity | null> {
  const { userId } = await auth()
  if (!userId) return null

  const user = await currentUser()
  const email = user?.primaryEmailAddress?.emailAddress ?? null

  return { userId, email }
}

/**
 * Load a project only when the user is the owner or a collaborator.
 *
 * @param projectId - Project / room id to check
 * @param userId - Clerk user id
 * @param email - Primary email used for collaborator matching
 * @returns The project when accessible, otherwise `null`
 */
export async function getAccessibleProject(
  projectId: string,
  userId: string,
  email: string | null
) {
  return prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: userId },
        ...(email ? [{ collaborators: { some: { email } } }] : []),
      ],
    },
  })
}

/**
 * Check whether the given identity can access a project.
 *
 * @param projectId - Project / room id to check
 * @param identity - Clerk identity with user id and optional email
 * @returns `true` when the user is the owner or a listed collaborator
 */
export async function hasProjectAccess(
  projectId: string,
  identity: ClerkIdentity
): Promise<boolean> {
  const project = await getAccessibleProject(
    projectId,
    identity.userId,
    identity.email
  )
  return project !== null
}
