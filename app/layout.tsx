import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanban Workspace — Task & Project Management",
  description:
    "Professional kanban workspace to organize tasks, track progress, and keep teams aligned across backlog, in‑progress, review, and done.",
  keywords: [
    "kanban",
    "task management",
    "project management",
    "workflow",
    "productivity",
    "agile",
    "sprint planning",
    "team collaboration",
    "work tracking",
    "dashboard",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
