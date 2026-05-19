import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOwnedProjects } from "@/lib/project-data";
import { EditorWorkspace } from "@/components/editor/editor-workspace";

/**
 * Renders the editor workspace for the signed-in user, redirecting unauthenticated requests to the sign-in page.
 *
 * If the request is authenticated, obtains the user's owned projects and supplies them with the `userId` to the workspace.
 *
 * @returns A React element rendering the editor workspace populated with the user's owned projects and `userId`.
 */
export default async function EditorPage() {
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  const projects = await getOwnedProjects(userId!);

  return <EditorWorkspace projects={projects} userId={userId!} />;
}
