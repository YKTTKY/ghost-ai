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
  const slug = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
  const project: MockProject = {
    id: `p${nextId++}`,
    name,
    slug,
    isOwner: true,
  }
  return [...projects, project]
}

export function renameMockProject(projectId: string, newName: string, projects: MockProject[]): MockProject[] {
  return projects.map((p) =>
    p.id === projectId ? { ...p, name: newName } : p
  )
}

export function deleteMockProject(projectId: string, projects: MockProject[]): MockProject[] {
  return projects.filter((p) => p.id !== projectId)
}
