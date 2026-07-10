import DashboardShell from "@/components/layout/dashboard-shell";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?message=Log in to continue.");
  }

  return (
    <DashboardShell userEmail={user.email ?? "Signed in"}>
      {children}
    </DashboardShell>
  );
}
