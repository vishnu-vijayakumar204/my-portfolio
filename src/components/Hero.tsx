export default function Hero() {
  return (
    <section
      id="top"
      className="mx-auto flex min-h-[85vh] max-w-5xl flex-col justify-center px-6 py-24"
    >
      <p className="mb-4 text-sm font-medium tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
        Hello, I&apos;m
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl dark:text-zinc-50">
        Vishnu Vijayakumar
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-600 sm:text-xl dark:text-zinc-400">
        I build clean, fast, and thoughtful web experiences &mdash; turning
        ideas into products people enjoy using.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#projects"
          className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          View my work
        </a>
        <a
          href="#contact"
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-black/5 dark:border-white/15 dark:text-zinc-50 dark:hover:bg-white/10"
        >
          Get in touch
        </a>
      </div>
    </section>
  );
}
