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

/**
 * Get a deep-cloned array of the seeded mock projects.
 *
 * @returns A deep-cloned array of the seeded MockProject objects; modifying the returned array or its project objects does not mutate the module's internal seed data.
 */
export function getMockProjects(): MockProject[] {
  return structuredClone(initialProjects)
}

let nextId = 4

/**
 * Create a new mock project and append it to the provided projects array.
 *
 * @param name - The project's display name; used to derive the project's `slug`
 * @param projects - The existing projects array to which the new project will be appended
 * @returns A new array containing all entries from `projects` plus the newly created `MockProject`
 */
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

/**
 * Update the name of a project in a list and return a new array with the change.
 *
 * @param projectId - The id of the project to rename
 * @param newName - The new name to assign to the project
 * @param projects - The array of projects to update
 * @returns A new array where the project with id `projectId` has `name` set to `newName`; other projects are unchanged
 */
export function renameMockProject(projectId: string, newName: string, projects: MockProject[]): MockProject[] {
  return projects.map((p) =>
    p.id === projectId ? { ...p, name: newName } : p
  )
}

/**
 * Remove the project with the given id from a list of projects.
 *
 * @param projectId - The id of the project to remove
 * @param projects - The list of projects to filter
 * @returns A new array containing all projects whose `id` does not equal `projectId`
 */
export function deleteMockProject(projectId: string, projects: MockProject[]): MockProject[] {
  return projects.filter((p) => p.id !== projectId)
}
