@AGENTS.md

# Portfolio Site — Project Context

Personal portfolio for Vishnu Vijayakumar (vishnu.vijayakumar204@gmail.com),
built with Next.js. One-page site: Hero, About, Projects, Contact.

## Stack

- Next.js 16 (App Router, `src/` dir), React 19, TypeScript
- Tailwind CSS v4 (via `@tailwindcss/postcss`, configured in `src/app/globals.css`
  with `@theme inline` — there is no `tailwind.config.ts`)
- No external UI/component libraries, no database, no auth
- Deploy target: Vercel (default for Next.js, not yet connected)

## Structure

- `src/app/layout.tsx` — root layout; renders `Nav` + `Footer` around every page,
  sets metadata (title/description), loads Geist fonts
- `src/app/page.tsx` — composes the one-page site: `Hero`, `About`, `Projects`, `Contact`
- `src/app/api/contact/route.ts` — POST handler for the contact form (see below)
- `src/components/` — `Nav`, `Hero`, `About`, `Projects`, `Contact`, `Footer`
  (one component per section, all in `src/app`'s sibling `components/` dir)

## Section content (placeholders to customize)

- **Nav**: name in the logo/brand link (`src/components/Nav.tsx`)
- **Hero**: name, tagline (`src/components/Hero.tsx`)
- **About**: bio copy and `SKILLS` array (`src/components/About.tsx`)
- **Projects**: `PROJECTS` array with 3 example/placeholder projects — titles,
  descriptions, tags, and `href`/`repo` links are all placeholders (`#`) and
  need real project info + links (`src/components/Projects.tsx`)
- **Footer**: copyright name, GitHub/email links (`src/components/Footer.tsx`)

All of the above use invented example content — swap in real bio, skills, and
project details before treating this as final.

## Contact form

`src/components/Contact.tsx` is a client component that POSTs
`{ name, email, message }` as JSON to `/api/contact`. The route
(`src/app/api/contact/route.ts`) validates the payload and currently just
`console.log`s the submission — **no email/notification provider is wired
up**. Before relying on this in production, connect a real provider (e.g.
Resend, SES, Formspree, Nodemailer + SMTP) inside that route handler.

## Conventions

- Sections are anchor-linked (`#about`, `#projects`, `#contact`); `Hero` has
  `id="top"`. `html { scroll-padding-top }` in `globals.css` offsets for the
  sticky nav so anchored scrolling doesn't hide content behind it.
- Dark mode uses Tailwind's `dark:` variant driven by `prefers-color-scheme`
  (no class-based toggle, no light/dark switch UI).
- Styling is utility-first Tailwind classes inline in JSX; no CSS modules.
- Keep components server components by default; only `Nav` (menu toggle state)
  and `Contact` (form state) are client components (`"use client"`).

## Commands

- `npm run dev` — dev server (also configured in `.claude/launch.json` as
  the `dev` preview target)
- `npm run build` — production build
- `npm run lint` — ESLint

## Known gaps / next steps

- Contact form has no real email delivery (see above)
- No tests configured
- No CI/deploy pipeline connected yet
- Project cards link to `#` — need real live/repo URLs
