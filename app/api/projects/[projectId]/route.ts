import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Updates a project's name if the authenticated user is the project's owner.
 *
 * @param request - Incoming Next.js request containing a JSON body with a `name` field
 * @param params - An object whose promise resolves to route params; expects `projectId`
 * @returns The updated project object as JSON on success; on failure returns a JSON error response with status `401` (unauthorized), `400` (bad request), or `403` (forbidden)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await params;

  const body = await request.json().catch(() => ({}));
  const name = body.name?.trim();
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const existing = await prisma.project.findFirst({
    where: { id: projectId, ownerId: userId },
  });
  if (!existing) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { name },
  });

  return NextResponse.json(project);
}

/**
 * Deletes a project owned by the authenticated user.
 *
 * @param _request - The incoming request object (unused).
 * @param params - A promise resolving to route parameters; must include `projectId`.
 * @returns A NextResponse containing `{ success: true }` on successful deletion; returns a JSON error response with `{ error: "Unauthorized" }` and status 401 if the caller is not authenticated, or `{ error: "Forbidden" }` and status 403 if the project does not belong to the authenticated user.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { projectId } = await params;

  const existing = await prisma.project.findFirst({
    where: { id: projectId, ownerId: userId },
  });
  if (!existing) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await prisma.project.delete({ where: { id: projectId } });

  return NextResponse.json({ success: true });
}
