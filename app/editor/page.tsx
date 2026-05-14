import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { EditorWorkspace } from "@/components/editor/editor-workspace";

export default async function EditorPage() {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  return <EditorWorkspace />;
}
