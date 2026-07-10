import { CheckCircle2, CircleDashed } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const settings = [
  {
    label: "Supabase authentication",
    description: "Email and password sign-in protects dashboard routes.",
    ready: true,
  },
  {
    label: "Chart of accounts",
    description: "Starter accounts are configured for double-entry reporting.",
    ready: true,
  },
  {
    label: "Transaction persistence",
    description: "Replace sample ledger data with Supabase tables.",
    ready: false,
  },
  {
    label: "Period close workflow",
    description: "Lock reviewed transactions and retain report snapshots.",
    ready: false,
  },
];

export default function SettingsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="mt-2 text-muted-foreground">
          Deployment and bookkeeping configuration status.
        </p>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>System Readiness</CardTitle>
          <CardDescription>
            What is already wired and what remains for production bookkeeping.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {settings.map((setting) => {
            const Icon = setting.ready ? CheckCircle2 : CircleDashed;

            return (
              <div
                key={setting.label}
                className="flex items-start gap-3 border-b pb-4 last:border-0 last:pb-0"
              >
                <Icon
                  className={
                    setting.ready
                      ? "mt-0.5 size-5 text-emerald-600"
                      : "mt-0.5 size-5 text-amber-600"
                  }
                />
                <div>
                  <p className="font-medium">{setting.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {setting.description}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
