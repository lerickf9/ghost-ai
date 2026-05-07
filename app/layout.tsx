import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ghost AI",
  description: "Collaborative system design workspace, powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: "dark",
        variables: {
          colorBackground: "var(--bg-elevated)",
          colorInputBackground: "var(--bg-subtle)",
          colorInputText: "var(--text-primary)",
          colorText: "var(--text-primary)",
          colorTextSecondary: "var(--text-secondary)",
          colorPrimary: "var(--accent-primary)",
          colorDanger: "var(--state-error)",
          colorSuccess: "var(--state-success)",
          colorWarning: "var(--state-warning)",
          colorNeutral: "var(--bg-subtle)",
          colorShimmer: "var(--bg-elevated)",
          fontFamily: "var(--font-geist-sans), sans-serif",
        },
      }}
    >
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-base text-copy-primary">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
