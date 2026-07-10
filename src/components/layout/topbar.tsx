import { logout } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

export default function Topbar({ userEmail }: { userEmail: string }) {
  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-semibold">
          Auto Tracking Bookkeeping
        </h1>

        <div className="flex items-center gap-3 text-sm">
          <span className="max-w-48 truncate text-muted-foreground">
            {userEmail}
          </span>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm">
              Log out
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
