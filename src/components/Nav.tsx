"use client";

import { useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md dark:border-white/10 dark:bg-black/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          Vishnu Vijayakumar
        </a>

        <ul className="hidden gap-8 text-sm font-medium text-zinc-600 sm:flex dark:text-zinc-400">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors hover:text-zinc-950 dark:hover:text-zinc-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 sm:hidden dark:border-white/15"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 2L14 14M14 2L2 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 4H15M1 8H15M1 12H15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-black/5 px-6 py-3 text-sm font-medium text-zinc-600 sm:hidden dark:border-white/10 dark:text-zinc-400">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-2 py-2 transition-colors hover:bg-black/5 hover:text-zinc-950 dark:hover:bg-white/10 dark:hover:text-zinc-50"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
