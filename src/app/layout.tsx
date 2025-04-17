import type { Metadata } from "next";
import "./globals.css";
import { abcFavorit } from "./fonts";

export const metadata: Metadata = {
  title: "Tendy - Wallet Infrastructure for Every User",
  description: "Tendy makes it easy to build on crypto rails. Spin up wallets, sign transactions, and integrate onchain infrastructure—all through one simple API.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={abcFavorit.variable}>
      <body className="font-abc-favorit" suppressHydrationWarning>{children}</body>
    </html>
  );
}
