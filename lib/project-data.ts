import { prisma } from "@/lib/prisma"

interface ProjectRow {
  id: string
  name: string
  ownerId: string
  createdAt: Date
}

function serialize(project: ProjectRow) {
  return {
    id: project.id,
    name: project.name,
    ownerId: project.ownerId,
    createdAt: project.createdAt.toISOString(),
  }
}

export async function getOwnedProjects(userId: string) {
  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  })
  return projects.map(serialize)
}

export async function getSharedProjects(userId: string) {
  const projects = await prisma.project.findMany({
    where: {
      collaborators: { some: { email: userId } },
    },
    orderBy: { createdAt: "desc" },
  })
  return projects.map(serialize)
}
