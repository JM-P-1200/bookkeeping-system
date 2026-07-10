import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <div className="grid w-full max-w-xl gap-6 text-center">
        <div className="grid gap-3">
          <h1 className="text-4xl font-bold">Auto Tracking Bookkeeping System</h1>
          <p className="text-muted-foreground">
            Supabase authentication is configured and ready for the dashboard.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Link className={buttonVariants()} href="/dashboard">
            Open dashboard
          </Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/login">
            Log in
          </Link>
        </div>
      </div>
    </main>
  );
}
