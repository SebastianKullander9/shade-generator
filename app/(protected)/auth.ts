import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }
  return data.user;
}