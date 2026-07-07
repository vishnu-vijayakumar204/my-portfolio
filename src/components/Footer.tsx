export default function Footer() {
  return (
    <footer className="border-t border-black/5 px-6 py-8 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row dark:text-zinc-500">
        <p>&copy; {new Date().getFullYear()} Vishnu Vijayakumar. All rights reserved.</p>
        <div className="flex gap-5">
          <a
            href="https://github.com/vishnu-vijayakumar204"
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            GitHub
          </a>
          <a
            href="mailto:vishnu.vijayakumar204@gmail.com"
            className="hover:text-zinc-950 dark:hover:text-zinc-50"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
