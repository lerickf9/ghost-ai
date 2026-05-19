"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { CreateProjectDialog } from "@/components/editor/create-project-dialog";
import { RenameProjectDialog } from "@/components/editor/rename-project-dialog";
import { DeleteProjectDialog } from "@/components/editor/delete-project-dialog";
import { useProjectActions } from "@/hooks/use-project-actions";
import type { ProjectWithOwnership } from "@/lib/data/projects";

interface EditorHomeClientProps {
  ownedProjects: ProjectWithOwnership[];
  sharedProjects: ProjectWithOwnership[];
}

export function EditorHomeClient({
  ownedProjects,
  sharedProjects,
}: EditorHomeClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const actions = useProjectActions(ownedProjects, sharedProjects);

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
          projects={actions.projects}
          isOpen={sidebarOpen}
          onNewProject={actions.openCreate}
          onRenameProject={actions.openRename}
          onDeleteProject={actions.openDelete}
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
          <Button className="mt-3" onClick={actions.openCreate}>
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </main>
      </div>

      <CreateProjectDialog
        open={actions.activeDialog === "create"}
        onOpenChange={(open) => {
          if (!open) actions.closeDialog();
        }}
        nameInput={actions.nameInput}
        onNameChange={actions.setNameInput}
        roomId={actions.roomId}
        isLoading={actions.isLoading}
        onSubmit={actions.handleCreate}
      />
      <RenameProjectDialog
        open={actions.activeDialog === "rename"}
        onOpenChange={(open) => {
          if (!open) actions.closeDialog();
        }}
        nameInput={actions.nameInput}
        onNameChange={actions.setNameInput}
        currentName={actions.selectedProject?.name ?? ""}
        isLoading={actions.isLoading}
        onSubmit={actions.handleRename}
      />
      <DeleteProjectDialog
        open={actions.activeDialog === "delete"}
        onOpenChange={(open) => {
          if (!open) actions.closeDialog();
        }}
        projectName={actions.selectedProject?.name ?? ""}
        isLoading={actions.isLoading}
        onConfirm={actions.handleDelete}
      />
    </div>
  );
}
