import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { UserProvider } from "@/contexts/user-context";

export const metadata: Metadata = {
  title: "🌈 FunChat ✨",
  description: "A super bright and fun real-time messaging app that brings joy to conversations!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geistFont = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistFont.variable}`}>
      <body className="min-h-screen text-slate-800">
        <TRPCReactProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
