type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  repo: string;
};

const PROJECTS: Project[] = [
  {
    title: "Task Flow",
    description:
      "A collaborative task management app with real-time updates, drag-and-drop boards, and team workspaces.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    href: "#",
    repo: "#",
  },
  {
    title: "Marketwatch Dashboard",
    description:
      "A data visualization dashboard for tracking market trends, built with live charts and customizable widgets.",
    tags: ["React", "D3.js", "Node.js"],
    href: "#",
    repo: "#",
  },
  {
    title: "Recipe Finder",
    description:
      "A recipe discovery app that suggests meals based on ingredients you already have at home.",
    tags: ["Next.js", "Tailwind CSS", "REST API"],
    href: "#",
    repo: "#",
  },
];

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5v5M13.5 2.5 7 9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.5c-2.22.48-2.69-1.07-2.69-1.07-.36-.92-.88-1.17-.88-1.17-.72-.49.05-.48.05-.48.8.06 1.22.82 1.22.82.71 1.22 1.87.87 2.32.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" />
    </svg>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-sm font-medium tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
        Projects
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        A few things I&apos;ve built recently.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <article
            key={project.title}
            className="flex flex-col rounded-2xl border border-black/10 p-6 transition-colors hover:border-black/20 dark:border-white/10 dark:hover:border-white/20"
          >
            <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              {project.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-black/5 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-white/10 dark:text-zinc-400"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex gap-4 text-sm font-medium text-zinc-950 dark:text-zinc-50">
              <a
                href={project.href}
                className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <ExternalLinkIcon />
                Live
              </a>
              <a
                href={project.repo}
                className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                <GithubIcon />
                Code
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
