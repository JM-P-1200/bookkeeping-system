# Bookkeeping System

A Next.js bookkeeping dashboard shell with Supabase authentication.

## Current Bookkeeping Features

- Auth-protected dashboard routes
- Chart of accounts
- Balanced double-entry journal sample data
- Dashboard metrics for cash, receivables, revenue, and net income
- Transaction journal with debit and credit checks
- Project budget, revenue, expense, and margin tracking
- Profit and loss, balance sheet snapshot, and trial balance reports

The current bookkeeping data lives in `src/lib/bookkeeping/data.ts`. Replace that module with Supabase table reads and server actions when you are ready to persist real company records.

## Getting Started

First, copy `.env.example` to `.env.local` and set your Supabase project values:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Checks

Before deployment, run:

```bash
npm run lint
npm run build
```

Required deployment environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

`NEXT_PUBLIC_SUPABASE_ANON_KEY` is accepted as a fallback if your Supabase project still uses that naming.

## Deploy

Deploy with any Next.js-compatible host. On Vercel, add the required Supabase environment variables in Project Settings before the first production build.
