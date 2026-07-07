"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/server";

const ADMIN_SESSION_COOKIE = "admin_session";

export async function login(formData: FormData) {
  const password = formData.get("password");
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (typeof password !== "string" || !adminPassword || password !== adminPassword) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, adminPassword, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

type ProjectInput = {
  title: string;
  description: string;
  tags: string[];
  live_url: string | null;
  repo_url: string | null;
  sort_order: number;
};

function parseProjectForm(formData: FormData): ProjectInput {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const liveUrl = String(formData.get("live_url") ?? "").trim();
  const repoUrl = String(formData.get("repo_url") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);

  return {
    title,
    description,
    tags,
    live_url: liveUrl || null,
    repo_url: repoUrl || null,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
  };
}

export async function createProject(formData: FormData) {
  const input = parseProjectForm(formData);

  if (!input.title || !input.description) {
    redirect(
      `/admin/projects/new?error=${encodeURIComponent("Title and description are required.")}`,
    );
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("projects").insert(input);

  if (error) {
    redirect(`/admin/projects/new?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProject(id: string, formData: FormData) {
  const input = parseProjectForm(formData);

  if (!input.title || !input.description) {
    redirect(
      `/admin/projects/${id}/edit?error=${encodeURIComponent("Title and description are required.")}`,
    );
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("projects").update(input).eq("id", id);

  if (error) {
    redirect(`/admin/projects/${id}/edit?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    redirect("/admin");
  }

  const supabase = createAdminClient();
  await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
