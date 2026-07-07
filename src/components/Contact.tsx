"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="text-sm font-medium tracking-wide text-indigo-600 uppercase dark:text-indigo-400">
        Contact
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Have a project in mind or just want to say hi? Send me a message.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-xl space-y-5"
        noValidate
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-950 dark:text-zinc-50"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-lg border border-black/10 bg-transparent px-4 py-2.5 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-indigo-500 dark:border-white/15 dark:text-zinc-50"
            placeholder="Jane Doe"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-950 dark:text-zinc-50"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-lg border border-black/10 bg-transparent px-4 py-2.5 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-indigo-500 dark:border-white/15 dark:text-zinc-50"
            placeholder="jane@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-zinc-950 dark:text-zinc-50"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className="mt-2 w-full resize-none rounded-lg border border-black/10 bg-transparent px-4 py-2.5 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 focus:border-indigo-500 dark:border-white/15 dark:text-zinc-50"
            placeholder="Tell me a bit about your project..."
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>

        {status === "success" && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Thanks for reaching out! I&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errorMessage}
          </p>
        )}
      </form>
    </section>
  );
}
