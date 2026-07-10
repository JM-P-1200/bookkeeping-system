import {
  formatCurrency,
  formatDate,
  getAccount,
  getLineTotals,
  getProject,
  getTransactionsByDate,
  isBalanced,
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

export default function TransactionsPage() {
  const transactions = getTransactionsByDate();

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-bold">Transactions</h2>
        <p className="mt-2 text-muted-foreground">
          Double-entry journal activity for the current period.
        </p>
      </div>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>General Journal</CardTitle>
          <CardDescription>
            Each entry must have matching debit and credit totals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => {
                const totals = getLineTotals(transaction);
                const project = getProject(transaction.projectId);

                return (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className="font-medium">
                      {transaction.reference}
                    </TableCell>
                    <TableCell className="min-w-64 whitespace-normal">
                      <div>{transaction.description}</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        {transaction.lines
                          .map((line) => getAccount(line.accountId)?.name)
                          .filter(Boolean)
                          .join(" / ")}
                      </div>
                    </TableCell>
                    <TableCell>{project?.name ?? "General"}</TableCell>
                    <TableCell>
                      <span
                        className={
                          isBalanced(transaction)
                            ? "rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700"
                            : "rounded-md bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive"
                        }
                      >
                        {isBalanced(transaction) ? "Balanced" : "Review"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(totals.debit)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(totals.credit)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
