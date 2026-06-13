"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import type { ApplicationStatus } from "@/types";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function updateApplicationStatus(reference: string, status: ApplicationStatus) {
  const supabase = await createServiceClient();
  await supabase.from("applications").update({ status }).eq("reference", reference);
  revalidatePath(`/admin/applications/${reference}`);
  revalidatePath("/admin/applications");
}
