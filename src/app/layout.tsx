import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bookkeeping System",
  description: "Auto Tracking Bookkeeping System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full font-sans antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
