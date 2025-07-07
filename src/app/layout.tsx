import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Global Chat",
  description: "A real-time global messaging app",
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
      <body className="min-h-screen bg-[#18181B] text-[#EFEFF1]">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
