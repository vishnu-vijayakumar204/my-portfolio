@AGENTS.md

# Portfolio Site — Project Context

Personal portfolio for Vishnu Vijayakumar (vishnu.vijayakumar204@gmail.com),
built with Next.js. One-page public site (Hero, About, Projects, Contact) plus
a password-gated `/admin` panel for managing project content.

## Stack

- Next.js 16 (App Router, `src/` dir), React 19, TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`, configured in `src/app/globals.css`
  with `@theme inline` — there is no `tailwind.config.ts`)
- Supabase (Postgres) for project data — `@supabase/supabase-js`
- No auth provider — the admin panel uses a single shared password, not Supabase Auth
- `sonner` for toast notifications (admin panel only)
- Deploy target: Vercel (default for Next.js, not yet connected)

## Structure

- `src/app/layout.tsx` — root layout; renders `Nav` + `Footer` around every page
  (including `/admin` — there's no separate admin chrome), sets metadata, loads
  Geist fonts
- `src/app/page.tsx` — composes the public one-page site: `Hero`, `About`,
  `Projects`, `Contact`
- `src/app/api/contact/route.ts` — POST handler for the contact form
- `src/components/` — `Nav`, `Hero`, `About`, `Projects`, `Contact`, `Footer`
- `src/proxy.ts` — Next.js 16's renamed `middleware.ts`; gates all `/admin/*`
  routes except `/admin/login` behind the `admin_session` cookie
- `src/lib/supabase/server.ts` — service-role Supabase client (`createAdminClient`),
  server-only (guarded by the `server-only` package), bypasses RLS — used only
  in `src/app/admin/**` and route handlers, never in client components
- `src/lib/supabase/public.ts` — anon-key Supabase client (`createPublicClient`),
  read-only by RLS, used by the public `Projects` component
- `src/lib/supabase/types.ts` — shared `Project` type
- `src/app/admin/` — the admin panel (see below)
- `supabase/schema.sql` — one-time SQL to run in the Supabase SQL Editor to
  create the `projects` table, RLS policy, `updated_at` trigger, and seed rows

## Admin panel (`/admin`)

- `/admin/login` — password form; `login` server action (`src/app/admin/actions.ts`)
  compares the submitted password to `process.env.ADMIN_PASSWORD` and, on
  success, sets an httpOnly `admin_session` cookie whose value is the password
  itself (7-day expiry). `src/proxy.ts` checks that cookie on every `/admin/*`
  request (plain string equality — no hashing/HMAC, kept simple since this
  gates a solo-owner content panel, not a multi-user system).
- `/admin` — lists all projects (via the service-role client), with Edit/Delete
  per row and a "New project" link. `logout` server action clears the cookie.
- `/admin/projects/new`, `/admin/projects/[id]/edit` — share `ProjectForm`
  (`src/app/admin/ProjectForm.tsx`); submit to the `createProject` /
  `updateProject` server actions in `actions.ts`. Tags are entered as a
  comma-separated string and split/joined to/from the `text[]` column.
- All mutations call `revalidatePath("/")` and `revalidatePath("/admin")` so
  edits show up on the public homepage immediately without a rebuild.
- `DeleteProjectButton.tsx` wraps the delete form with a `window.confirm` guard.
- Every server action (login/logout/create/update/delete) redirects back with
  a `?success=` or `?error=` query param carrying a human-readable message.
  `src/app/admin/layout.tsx` renders sonner's `<Toaster />` plus a
  `ToastListener` (`src/app/admin/ToastListener.tsx`, wrapped in `<Suspense>`
  since it calls `useSearchParams`) that reads those params on mount, fires
  `toast.success`/`toast.error`, then `router.replace`s the URL to strip them
  so a refresh doesn't re-fire the toast. This is the only place success/error
  feedback is shown — there's no more inline error text in the login or
  project forms.

## Database (Supabase)

- Single table: `public.projects` (`id`, `title`, `description`, `tags text[]`,
  `live_url`, `repo_url`, `sort_order`, `created_at`, `updated_at`). Schema and
  seed data live in `supabase/schema.sql` — re-run manually in the SQL Editor
  if the schema changes; there's no migration tooling/CLI wired up.
- RLS is enabled with a single `select`-only policy for the `anon` role. There
  are intentionally no insert/update/delete policies — all writes happen via
  the service-role client server-side, which bypasses RLS entirely. Never call
  `createAdminClient()` from a client component or expose
  `SUPABASE_SERVICE_ROLE_KEY` to the browser.
- Env vars (in `.env.local`, gitignored, not committed):
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (safe client-side),
  `SUPABASE_SERVICE_ROLE_KEY` (server-only secret), `ADMIN_PASSWORD` (server-only
  secret, also doubles as the session cookie value).

## Contact form

`src/components/Contact.tsx` is a client component that POSTs
`{ name, email, message }` as JSON to `/api/contact`. The route validates the
payload and currently just `console.log`s the submission — **no email/notification
provider is wired up**. Before relying on this in production, connect a real
provider (e.g. Resend, SES, Formspree, Nodemailer + SMTP) inside that route handler.

## Conventions

- Sections are anchor-linked (`#about`, `#projects`, `#contact`); `Hero` has
  `id="top"`. `html { scroll-padding-top }` in `globals.css` offsets for the
  sticky nav so anchored scrolling doesn't hide content behind it.
- Dark mode uses Tailwind's `dark:` variant driven by `prefers-color-scheme`
  (no class-based toggle, no light/dark switch UI).
- Styling is utility-first Tailwind classes inline in JSX; no CSS modules.
- Server components by default. Client components (`"use client"`): `Nav`
  (menu toggle), `Contact` (form state), `DeleteProjectButton` (confirm guard),
  `ToastListener` (reads search params, fires toasts).
- Project URL inputs (`live_url`/`repo_url`) are plain `type="text"`, not
  `type="url"` — the seed data uses `#` placeholders, which fail native HTML5
  URL validation.

## Commands

- `npm run dev` — dev server (also configured in `.claude/launch.json` as
  the `dev` preview target)
- `npm run build` — production build
- `npm run lint` — ESLint

## Known gaps / next steps

- Contact form has no real email delivery (see above)
- No tests configured
- No CI/deploy pipeline connected yet
- Project cards' seeded `live_url`/`repo_url` are still `#` placeholders —
  update via the admin panel with real links
- Admin panel shares the public site's Nav/Footer chrome (no dedicated admin
  layout) — acceptable for now, could be split into its own route group later
- Admin auth is a single shared password, not per-user accounts — fine for a
  solo portfolio owner, not intended to scale beyond that
