import {
  accounts,
  formatCurrency,
  getAccountBalance,
} from "@/lib/bookkeeping/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const accountTypeStyles = {
  asset: "bg-sky-50 text-sky-700",
  liability: "bg-amber-50 text-amber-700",
  equity: "bg-violet-50 text-violet-700",
  revenue: "bg-emerald-50 text-emerald-700",
  expense: "bg-rose-50 text-rose-700",
};

export default function AccountsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-bold">Accounts</h2>
        <p className="mt-2 text-muted-foreground">
          Chart of accounts with balances derived from posted entries.
        </p>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Chart of Accounts</CardTitle>
          <CardDescription>
            Account codes are grouped for reporting and trial balance checks.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.code}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-md px-2 py-1 text-xs font-medium capitalize ${
                        accountTypeStyles[account.type]
                      }`}
                    >
                      {account.type}
                    </span>
                  </TableCell>
                  <TableCell className="min-w-64 whitespace-normal text-muted-foreground">
                    {account.description}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(getAccountBalance(account.id))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
