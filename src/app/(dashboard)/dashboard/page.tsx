import {
  formatCurrency,
  formatDate,
  getFinancialSummary,
  getProjectSummary,
  getTransactionsByDate,
  projects,
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

const metricCards = [
  {
    label: "Cash",
    key: "cash",
    tone: "text-emerald-700",
  },
  {
    label: "Receivables",
    key: "receivables",
    tone: "text-sky-700",
  },
  {
    label: "Revenue",
    key: "revenue",
    tone: "text-emerald-700",
  },
  {
    label: "Net income",
    key: "netIncome",
    tone: "text-amber-700",
  },
] as const;

export default function DashboardPage() {
  const summary = getFinancialSummary();
  const recentTransactions = getTransactionsByDate().slice(0, 5);

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="mt-2 text-muted-foreground">
          Operating snapshot for the current bookkeeping period.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((metric) => (
          <Card key={metric.key} className="rounded-lg">
            <CardHeader>
              <CardDescription>{metric.label}</CardDescription>
              <CardTitle className={`text-2xl ${metric.tone}`}>
                {formatCurrency(summary[metric.key])}
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest posted journal entries.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell className="font-medium">
                      {transaction.reference}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(
                        transaction.lines.reduce(
                          (total, line) => total + line.debit,
                          0
                        )
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Project Margins</CardTitle>
            <CardDescription>Revenue less direct project costs.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {projects.map((project) => {
              const projectSummary = getProjectSummary(project.id);

              return (
                <div key={project.id} className="grid gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.client}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(projectSummary.margin)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-emerald-600"
                      style={{ width: `${projectSummary.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
