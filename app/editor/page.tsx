"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { CreateProjectDialog } from "@/components/editor/create-project-dialog";
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog";
import { useProjectDialogs } from "@/hooks/use-project-dialogs";

export default function EditorPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dialogs = useProjectDialogs();

  return (
    <div className="flex flex-col h-screen bg-base">
      <nav className="flex items-center justify-between px-4 h-12 border-b border-surface-border bg-surface shrink-0">
        <span className="text-brand font-semibold text-sm tracking-tight">
          Ghost AI
        </span>
        <UserButton />
      </nav>

      <div className="flex flex-1 overflow-hidden relative">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 md:hidden"
            role="button"
            tabIndex={0}
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSidebarOpen(false);
              }
            }}
            aria-label="Close sidebar"
          />
        )}

        <EditorSidebar
          projects={dialogs.projects}
          isOpen={sidebarOpen}
          onNewProject={dialogs.openCreate}
          onRenameProject={dialogs.openRename}
          onDeleteProject={dialogs.openDelete}
        />

        <main className="flex-1 flex flex-col items-center justify-center gap-2 overflow-auto px-4 relative">
          <button
            className="absolute top-3 left-3 md:hidden p-1 text-copy-muted hover:text-copy-primary transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h1 className="text-copy-primary text-xl font-semibold text-center">
            Create a project or open existing one
          </h1>
          <p className="text-copy-muted text-sm text-center">
            Start a new architecture workspace, or choose a project from the
            sidebar.
          </p>
          <Button className="mt-3" onClick={dialogs.openCreate}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </main>
      </div>

      <CreateProjectDialog
        open={dialogs.activeDialog === "create"}
        onOpenChange={(open) => {
          if (!open) dialogs.closeDialog();
        }}
        nameInput={dialogs.nameInput}
        onNameChange={dialogs.setNameInput}
        slug={dialogs.slug}
        isLoading={dialogs.isLoading}
        onSubmit={dialogs.handleCreate}
      />
      <RenameProjectDialog
        open={dialogs.activeDialog === "rename"}
        onOpenChange={(open) => {
          if (!open) dialogs.closeDialog();
        }}
        nameInput={dialogs.nameInput}
        onNameChange={dialogs.setNameInput}
        currentName={dialogs.selectedProject?.name ?? ""}
        isLoading={dialogs.isLoading}
        onSubmit={dialogs.handleRename}
      />
      <DeleteProjectDialog
        open={dialogs.activeDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) dialogs.closeDialog();
        }}
        projectName={dialogs.selectedProject?.name ?? ""}
        isLoading={dialogs.isLoading}
        onConfirm={dialogs.handleDelete}
      />
    </div>
  );
}
