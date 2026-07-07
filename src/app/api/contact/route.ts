import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Message is required." }, { status: 400 });
  }

  // No email/notification provider is wired up yet — this just logs the
  // submission server-side. Swap this for a real provider (Resend, SES,
  // Formspree, etc.) before relying on this form in production.
  console.log("Contact form submission:", { name, email, message });

  return NextResponse.json({ ok: true });
}
