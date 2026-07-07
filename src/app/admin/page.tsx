import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/supabase/types";
import { logout } from "./actions";
import DeleteProjectButton from "./DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createAdminClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<Project[]>();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/projects/new"
            className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            New project
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-black/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {error && (
        <p className="mt-6 text-sm text-red-600 dark:text-red-400">
          Failed to load projects: {error.message}
        </p>
      )}

      <ul className="mt-8 divide-y divide-black/5 dark:divide-white/10">
        {projects?.map((project) => (
          <li key={project.id} className="flex items-center justify-between gap-4 py-4">
            <div className="min-w-0">
              <p className="font-medium text-zinc-950 dark:text-zinc-50">{project.title}</p>
              <p className="mt-1 truncate text-sm text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Edit
              </Link>
              <DeleteProjectButton id={project.id} />
            </div>
          </li>
        ))}
      </ul>

      {projects?.length === 0 && (
        <p className="py-8 text-sm text-zinc-500">No projects yet. Create your first one.</p>
      )}
    </div>
  );
}
