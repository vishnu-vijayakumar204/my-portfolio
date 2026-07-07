import { notFound } from "next/navigation";
import ProjectForm from "../../../ProjectForm";
import { updateProject } from "../../../actions";
import { createAdminClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = createAdminClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single<Project>();

  if (!project) {
    notFound();
  }

  const updateProjectWithId = updateProject.bind(null, id);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Edit project</h1>
      <ProjectForm project={project} action={updateProjectWithId} />
    </div>
  );
}
