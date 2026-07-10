import {
  accounts,
  formatCurrency,
  getAccountBalance,
  getFinancialSummary,
  getTrialBalance,
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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ReportsPage() {
  const summary = getFinancialSummary();
  const trialBalance = getTrialBalance();
  const totalDebits = trialBalance.reduce((total, row) => total + row.debit, 0);
  const totalCredits = trialBalance.reduce((total, row) => total + row.credit, 0);
  const revenueAccounts = accounts.filter((account) => account.type === "revenue");
  const expenseAccounts = accounts.filter((account) => account.type === "expense");

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-bold">Reports</h2>
        <p className="mt-2 text-muted-foreground">
          Financial statements generated from the journal and chart of accounts.
        </p>
      </div>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Profit and Loss</CardTitle>
            <CardDescription>Current period income statement.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {revenueAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(getAccountBalance(account.id))}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="font-medium">
                  <TableCell>Total Revenue</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(summary.revenue)}
                  </TableCell>
                </TableRow>
                {expenseAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell>{account.name}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(getAccountBalance(account.id))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell>Net Income</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(summary.netIncome)}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Balance Sheet Snapshot</CardTitle>
            <CardDescription>Assets, liabilities, and equity.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Assets</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(summary.assets)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Liabilities</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(summary.liabilities)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Owner Equity</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(summary.equity)}
                  </TableCell>
                </TableRow>
                <TableRow className="font-medium">
                  <TableCell>Equity plus Current Income</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(summary.equity + summary.netIncome)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle>Trial Balance</CardTitle>
          <CardDescription>
            Debit and credit totals must match before closing the period.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trialBalance.map((row) => (
                <TableRow key={row.account.id}>
                  <TableCell className="font-medium">{row.account.code}</TableCell>
                  <TableCell>{row.account.name}</TableCell>
                  <TableCell className="capitalize">{row.account.type}</TableCell>
                  <TableCell className="text-right">
                    {row.debit ? formatCurrency(row.debit) : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.credit ? formatCurrency(row.credit) : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Totals</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalDebits)}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(totalCredits)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
