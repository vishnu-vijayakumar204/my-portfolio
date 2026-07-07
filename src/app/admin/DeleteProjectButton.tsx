"use client";

import { deleteProject } from "./actions";

export default function DeleteProjectButton({ id }: { id: string }) {
  return (
    <form
      action={deleteProject}
      onSubmit={(event) => {
        if (!window.confirm("Delete this project? This can't be undone.")) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
      >
        Delete
      </button>
    </form>
  );
}
