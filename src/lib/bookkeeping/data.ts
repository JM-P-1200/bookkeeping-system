export type AccountType =
  | "asset"
  | "liability"
  | "equity"
  | "revenue"
  | "expense";

export type Account = {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  description: string;
};

export type ProjectStatus = "active" | "paused" | "closed";

export type Project = {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  budget: number;
};

export type JournalLine = {
  accountId: string;
  debit: number;
  credit: number;
};

export type Transaction = {
  id: string;
  date: string;
  description: string;
  projectId?: string;
  reference: string;
  lines: JournalLine[];
};

export const accounts: Account[] = [
  {
    id: "cash",
    code: "1000",
    name: "Cash on Hand",
    type: "asset",
    description: "Operating cash and bank deposits.",
  },
  {
    id: "accounts-receivable",
    code: "1100",
    name: "Accounts Receivable",
    type: "asset",
    description: "Invoices issued to customers but not collected.",
  },
  {
    id: "office-supplies",
    code: "1200",
    name: "Office Supplies",
    type: "asset",
    description: "Consumable supplies on hand.",
  },
  {
    id: "deferred-revenue",
    code: "2100",
    name: "Deferred Revenue",
    type: "liability",
    description: "Customer advances not yet earned.",
  },
  {
    id: "owner-equity",
    code: "3000",
    name: "Owner Equity",
    type: "equity",
    description: "Owner capital invested in the business.",
  },
  {
    id: "service-revenue",
    code: "4000",
    name: "Service Revenue",
    type: "revenue",
    description: "Revenue from bookkeeping and consulting services.",
  },
  {
    id: "software-expense",
    code: "5100",
    name: "Software Expense",
    type: "expense",
    description: "Subscriptions and accounting software.",
  },
  {
    id: "payroll-expense",
    code: "5200",
    name: "Payroll Expense",
    type: "expense",
    description: "Staff salaries and payroll costs.",
  },
  {
    id: "contractor-expense",
    code: "5300",
    name: "Contractor Expense",
    type: "expense",
    description: "External support and project labor.",
  },
  {
    id: "bank-fees",
    code: "5400",
    name: "Bank Fees",
    type: "expense",
    description: "Payment processing and bank charges.",
  },
];

export const projects: Project[] = [
  {
    id: "northstar",
    name: "Northstar Retail Cleanup",
    client: "Northstar Retail",
    status: "active",
    budget: 150000,
  },
  {
    id: "harbor",
    name: "Harbor Cafe Monthly Books",
    client: "Harbor Cafe",
    status: "active",
    budget: 90000,
  },
  {
    id: "atlas",
    name: "Atlas Studio Advisory",
    client: "Atlas Studio",
    status: "paused",
    budget: 70000,
  },
];

export const transactions: Transaction[] = [
  {
    id: "txn-1001",
    date: "2026-06-03",
    description: "Issued cleanup invoice to Northstar Retail",
    projectId: "northstar",
    reference: "INV-1001",
    lines: [
      { accountId: "accounts-receivable", debit: 125000, credit: 0 },
      { accountId: "service-revenue", debit: 0, credit: 125000 },
    ],
  },
  {
    id: "txn-1002",
    date: "2026-06-05",
    description: "Owner contribution for operating float",
    reference: "CAP-001",
    lines: [
      { accountId: "cash", debit: 50000, credit: 0 },
      { accountId: "owner-equity", debit: 0, credit: 50000 },
    ],
  },
  {
    id: "txn-1003",
    date: "2026-06-10",
    description: "Partial payment from Northstar Retail",
    projectId: "northstar",
    reference: "DEP-1001",
    lines: [
      { accountId: "cash", debit: 80000, credit: 0 },
      { accountId: "accounts-receivable", debit: 0, credit: 80000 },
    ],
  },
  {
    id: "txn-1004",
    date: "2026-06-12",
    description: "Accounting software subscriptions",
    reference: "BILL-2406",
    lines: [
      { accountId: "software-expense", debit: 9800, credit: 0 },
      { accountId: "cash", debit: 0, credit: 9800 },
    ],
  },
  {
    id: "txn-1005",
    date: "2026-06-15",
    description: "Payroll for bookkeeping assistants",
    reference: "PAY-0615",
    lines: [
      { accountId: "payroll-expense", debit: 42000, credit: 0 },
      { accountId: "cash", debit: 0, credit: 42000 },
    ],
  },
  {
    id: "txn-1006",
    date: "2026-06-18",
    description: "Contractor support for Harbor Cafe",
    projectId: "harbor",
    reference: "BILL-887",
    lines: [
      { accountId: "contractor-expense", debit: 18500, credit: 0 },
      { accountId: "cash", debit: 0, credit: 18500 },
    ],
  },
  {
    id: "txn-1007",
    date: "2026-06-21",
    description: "Advance payment from Harbor Cafe",
    projectId: "harbor",
    reference: "DEP-2030",
    lines: [
      { accountId: "cash", debit: 30000, credit: 0 },
      { accountId: "deferred-revenue", debit: 0, credit: 30000 },
    ],
  },
  {
    id: "txn-1008",
    date: "2026-06-25",
    description: "Recognized Harbor Cafe monthly work",
    projectId: "harbor",
    reference: "REV-2030",
    lines: [
      { accountId: "deferred-revenue", debit: 12000, credit: 0 },
      { accountId: "service-revenue", debit: 0, credit: 12000 },
    ],
  },
  {
    id: "txn-1009",
    date: "2026-06-27",
    description: "Purchased office supplies",
    reference: "BILL-911",
    lines: [
      { accountId: "office-supplies", debit: 6500, credit: 0 },
      { accountId: "cash", debit: 0, credit: 6500 },
    ],
  },
  {
    id: "txn-1010",
    date: "2026-06-30",
    description: "Bank service fees",
    reference: "BNK-0630",
    lines: [
      { accountId: "bank-fees", debit: 450, credit: 0 },
      { accountId: "cash", debit: 0, credit: 450 },
    ],
  },
];

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function getAccount(accountId: string) {
  return accounts.find((account) => account.id === accountId);
}

export function getProject(projectId?: string) {
  return projects.find((project) => project.id === projectId);
}

export function getLineTotals(transaction: Transaction) {
  return transaction.lines.reduce(
    (totals, line) => ({
      debit: totals.debit + line.debit,
      credit: totals.credit + line.credit,
    }),
    { debit: 0, credit: 0 }
  );
}

export function isBalanced(transaction: Transaction) {
  const totals = getLineTotals(transaction);
  return totals.debit === totals.credit;
}

export function getAccountBalance(accountId: string) {
  const account = getAccount(accountId);
  const rawBalance = transactions.reduce((balance, transaction) => {
    return (
      balance +
      transaction.lines
        .filter((line) => line.accountId === accountId)
        .reduce((lineBalance, line) => lineBalance + line.debit - line.credit, 0)
    );
  }, 0);

  if (account?.type === "liability" || account?.type === "equity" || account?.type === "revenue") {
    return rawBalance * -1;
  }

  return rawBalance;
}

export function getTrialBalance() {
  return accounts.map((account) => {
    const rawBalance = transactions.reduce((balance, transaction) => {
      return (
        balance +
        transaction.lines
          .filter((line) => line.accountId === account.id)
          .reduce((lineBalance, line) => lineBalance + line.debit - line.credit, 0)
      );
    }, 0);

    return {
      account,
      debit: rawBalance > 0 ? rawBalance : 0,
      credit: rawBalance < 0 ? Math.abs(rawBalance) : 0,
    };
  });
}

export function getFinancialSummary() {
  const revenue = accounts
    .filter((account) => account.type === "revenue")
    .reduce((total, account) => total + getAccountBalance(account.id), 0);
  const expenses = accounts
    .filter((account) => account.type === "expense")
    .reduce((total, account) => total + getAccountBalance(account.id), 0);
  const assets = accounts
    .filter((account) => account.type === "asset")
    .reduce((total, account) => total + getAccountBalance(account.id), 0);
  const liabilities = accounts
    .filter((account) => account.type === "liability")
    .reduce((total, account) => total + getAccountBalance(account.id), 0);
  const equity = accounts
    .filter((account) => account.type === "equity")
    .reduce((total, account) => total + getAccountBalance(account.id), 0);

  return {
    revenue,
    expenses,
    netIncome: revenue - expenses,
    assets,
    liabilities,
    equity,
    cash: getAccountBalance("cash"),
    receivables: getAccountBalance("accounts-receivable"),
  };
}

export function getProjectSummary(projectId: string) {
  const project = getProject(projectId);
  const projectTransactions = transactions.filter(
    (transaction) => transaction.projectId === projectId
  );

  const revenue = projectTransactions.reduce((total, transaction) => {
    return (
      total +
      transaction.lines.reduce((lineTotal, line) => {
        const account = getAccount(line.accountId);
        return account?.type === "revenue"
          ? lineTotal + line.credit - line.debit
          : lineTotal;
      }, 0)
    );
  }, 0);

  const expenses = projectTransactions.reduce((total, transaction) => {
    return (
      total +
      transaction.lines.reduce((lineTotal, line) => {
        const account = getAccount(line.accountId);
        return account?.type === "expense"
          ? lineTotal + line.debit - line.credit
          : lineTotal;
      }, 0)
    );
  }, 0);

  return {
    project,
    revenue,
    expenses,
    margin: revenue - expenses,
    progress: project ? Math.min((revenue / project.budget) * 100, 100) : 0,
  };
}

export function getTransactionsByDate() {
  return [...transactions].sort((a, b) => b.date.localeCompare(a.date));
}
