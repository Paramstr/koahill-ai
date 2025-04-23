// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { abcFavorit, abcDiatype, geist } from "./fonts"; // Added abcDiatype

export const metadata: Metadata = {
  title: "Openly Funded",
  description: "Openly Funded is a platform to access public funding.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Apply all font variables to the html tag so they are globally available
    <html lang="en" className={`${abcFavorit.variable} ${abcDiatype.variable} ${geist.variable}`}>
      {/* Remove font-geist class here. Tailwind base styles will apply font-sans (now Geist) */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}