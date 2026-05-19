import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getOwnedProjects } from "@/lib/project-data";
import { EditorWorkspace } from "@/components/editor/editor-workspace";

export default async function EditorPage() {
  const { userId, isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  const projects = await getOwnedProjects(userId!);

  return <EditorWorkspace projects={projects} userId={userId!} />;
}
