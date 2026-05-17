import { toSlug } from "@/lib/slug"

export interface MockProject {
  id: string
  name: string
  slug: string
  isOwner: boolean
}

const initialProjects: MockProject[] = [
  { id: "p1", name: "E-Commerce Platform", slug: "e-commerce-platform", isOwner: true },
  { id: "p2", name: "Event Streaming Pipeline", slug: "event-streaming-pipeline", isOwner: true },
  { id: "p3", name: "Auth Service", slug: "auth-service", isOwner: true },
]

export function getMockProjects(): MockProject[] {
  return structuredClone(initialProjects)
}

let nextId = 4

export function createMockProject(name: string, projects: MockProject[]): MockProject[] {
  const project: MockProject = {
    id: `p${nextId++}`,
    name,
    slug: toSlug(name),
    isOwner: true,
  }
  return [...projects, project]
}

export function renameMockProject(projectId: string, newName: string, projects: MockProject[]): MockProject[] {
  return projects.map((p) =>
    p.id === projectId ? { ...p, name: newName, slug: toSlug(newName) } : p
  )
}

export function deleteMockProject(projectId: string, projects: MockProject[]): MockProject[] {
  return projects.filter((p) => p.id !== projectId)
}
