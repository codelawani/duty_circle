import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header.component";
import { NextAuthProvider } from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Duty Circle",
  description:
    "DutyCircle is a unique application designed to merge task management with public accountability." +
    "Users can create and manage personal tasks while also choosing to share them publicly." +
    "The public sharing feature transforms a simple task into a commitment, offering users an external motivation to accomplish their goals." +
    "The public feed showcases tasks from various users, giving an opportunity for users to connect over shared objectives or interests." +
    "Users can form accountability circles where they can nudge each other for pending tasks, strengthening the community feel and adding an extra layer of motivation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
