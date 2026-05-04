"use client";

import { UserButton } from "@clerk/nextjs";

export default function EditorPage() {
  return (
    <div className="flex flex-col h-screen bg-base">
      <nav className="flex items-center justify-between px-4 h-12 border-b border-surface-border bg-surface shrink-0">
        <span className="text-brand font-semibold text-sm tracking-tight">Ghost AI</span>
        <UserButton />
      </nav>

      <main className="flex-1 flex items-center justify-center">
        <p className="text-copy-muted text-sm">Editor coming soon.</p>
      </main>
    </div>
  );
}
