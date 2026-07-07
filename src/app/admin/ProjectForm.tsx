import type { Project } from "@/lib/supabase/types";

const inputClasses =
  "mt-2 w-full rounded-lg border border-black/10 bg-transparent px-4 py-2.5 text-sm text-zinc-950 outline-none focus:border-indigo-500 dark:border-white/15 dark:text-zinc-50";

type Props = {
  project?: Project;
  action: (formData: FormData) => void;
};

export default function ProjectForm({ project, action }: Props) {
  return (
    <form action={action} className="mt-8 max-w-xl space-y-5">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={project?.title}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          defaultValue={project?.description}
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium">
          Tags (comma separated)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          defaultValue={project?.tags?.join(", ")}
          placeholder="Next.js, TypeScript, PostgreSQL"
          className={inputClasses}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="live_url" className="block text-sm font-medium">
            Live URL
          </label>
          <input
            id="live_url"
            name="live_url"
            type="text"
            defaultValue={project?.live_url ?? ""}
            placeholder="https://..."
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="repo_url" className="block text-sm font-medium">
            Repo URL
          </label>
          <input
            id="repo_url"
            name="repo_url"
            type="text"
            defaultValue={project?.repo_url ?? ""}
            placeholder="https://github.com/..."
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="sort_order" className="block text-sm font-medium">
          Sort order
        </label>
        <input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={project?.sort_order ?? 0}
          className={`${inputClasses} w-32`}
        />
      </div>

      <button
        type="submit"
        className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {project ? "Save changes" : "Create project"}
      </button>
    </form>
  );
}
