import { login } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-center px-6 py-24">
      <h1 className="text-2xl font-semibold">Admin login</h1>
      <form action={login} className="mt-8 space-y-5">
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="mt-2 w-full rounded-lg border border-black/10 bg-transparent px-4 py-2.5 text-sm text-zinc-950 outline-none focus:border-indigo-500 dark:border-white/15 dark:text-zinc-50"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">Incorrect password.</p>
        )}

        <button
          type="submit"
          className="w-full rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          Log in
        </button>
      </form>
    </div>
  );
}
