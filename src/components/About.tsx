const SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "PostgreSQL",
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-sm font-medium tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
        About me
      </h2>
      <div className="mt-4 grid gap-10 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <p className="text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            I&apos;m a software engineer who enjoys turning complex problems
            into simple, well-crafted interfaces. I care about the details
            that make products feel fast, intuitive, and reliable &mdash;
            from clean architecture to the last pixel of polish.
          </p>
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            When I&apos;m not coding, I&apos;m usually exploring new tools,
            reading about design systems, or working on a side project.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
            Skills
          </h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {SKILLS.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-black/10 px-3 py-1 text-sm text-zinc-600 dark:border-white/15 dark:text-zinc-400"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
