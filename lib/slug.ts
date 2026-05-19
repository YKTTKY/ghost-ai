/**
 * Converts a string into a URL-friendly slug.
 *
 * @param name - The input string to convert
 * @returns A lowercase, hyphen-separated string containing only letters, digits, and hyphens with no leading or trailing hyphens
 */
export function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}
