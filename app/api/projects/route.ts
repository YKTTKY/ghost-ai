import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Return the list of projects owned by the authenticated user.
 *
 * If the request is unauthenticated, responds with HTTP 401 and an error object.
 *
 * @returns The authenticated user's projects ordered by `createdAt` descending as JSON.
 */
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

/**
 * Creates a new project owned by the authenticated user using the request body and returns the created project.
 *
 * @param request - Incoming request whose JSON body may include `name`; if `name` is missing or empty, "Untitled Project" is used.
 * @returns The created project record as JSON with HTTP status 201.
 */
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const name = body.name?.trim() || "Untitled Project";

  const project = await prisma.project.create({
    data: { name, ownerId: userId },
  });

  return NextResponse.json(project, { status: 201 });
}
