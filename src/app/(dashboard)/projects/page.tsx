import {
  formatCurrency,
  getProjectSummary,
  projects,
} from "@/lib/bookkeeping/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const statusStyles = {
  active: "bg-emerald-50 text-emerald-700",
  paused: "bg-amber-50 text-amber-700",
  closed: "bg-muted text-muted-foreground",
};

export default function ProjectsPage() {
  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-3xl font-bold">Projects</h2>
        <p className="mt-2 text-muted-foreground">
          Client work tracked against budget, revenue, and direct costs.
        </p>
      </div>

      <section className="grid gap-4 xl:grid-cols-3">
        {projects.map((project) => {
          const summary = getProjectSummary(project.id);

          return (
            <Card key={project.id} className="rounded-lg">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle>{project.name}</CardTitle>
                    <CardDescription>{project.client}</CardDescription>
                  </div>
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium capitalize ${
                      statusStyles[project.status]
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Budget</p>
                    <p className="font-medium">{formatCurrency(project.budget)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-medium">
                      {formatCurrency(summary.revenue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Expenses</p>
                    <p className="font-medium">
                      {formatCurrency(summary.expenses)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Margin</p>
                    <p className="font-medium text-emerald-700">
                      {formatCurrency(summary.margin)}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Budget used</span>
                    <span>{summary.progress.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-sky-600"
                      style={{ width: `${summary.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
