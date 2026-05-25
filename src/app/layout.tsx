import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rizzicco",
  description: "Rizzicco App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}