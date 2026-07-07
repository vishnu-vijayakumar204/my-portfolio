import ProjectForm from "../../ProjectForm";
import { createProject } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-semibold">New project</h1>
      <ProjectForm action={createProject} />
    </div>
  );
}
