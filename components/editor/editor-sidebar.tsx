"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectWithOwnership } from "@/lib/data/projects";

interface EditorSidebarProps {
  projects: ProjectWithOwnership[];
  isOpen: boolean;
  onNewProject: () => void;
  onRenameProject: (project: ProjectWithOwnership) => void;
  onDeleteProject: (project: ProjectWithOwnership) => void;
}

export function EditorSidebar({
  projects,
  isOpen,
  onNewProject,
  onRenameProject,
  onDeleteProject,
}: EditorSidebarProps) {
  return (
    <aside
      className={cn(
        "w-60 bg-surface border-r border-surface-border flex flex-col shrink-0 z-30",
        "max-md:fixed max-md:top-12 max-md:bottom-0 max-md:left-0",
        "max-md:transition-transform max-md:duration-200",
        isOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-surface-border">
        <span className="text-copy-muted text-xs font-medium uppercase tracking-wider">
          Projects
        </span>
        <button
          onClick={onNewProject}
          className="p-1 rounded text-copy-muted hover:text-copy-primary hover:bg-elevated transition-colors"
          aria-label="New project"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        {projects.length === 0 ? (
          <p className="px-3 py-4 text-copy-faint text-xs">No projects yet.</p>
        ) : (
          projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onRename={onRenameProject}
              onDelete={onDeleteProject}
            />
          ))
        )}
      </div>
    </aside>
  );
}

interface ProjectItemProps {
  project: ProjectWithOwnership;
  onRename: (project: ProjectWithOwnership) => void;
  onDelete: (project: ProjectWithOwnership) => void;
}

function ProjectItem({ project, onRename, onDelete }: ProjectItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-elevated transition-colors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <FolderOpen className="h-4 w-4 text-copy-muted shrink-0" />
      <span className="flex-1 text-sm text-copy-secondary truncate">
        {project.name}
      </span>
      {project.isOwned && hovered && (
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRename(project);
            }}
            className="p-1 rounded text-copy-faint hover:text-copy-secondary hover:bg-subtle transition-colors"
            aria-label={`Rename ${project.name}`}
          >
            <Pencil className="h-3 w-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(project);
            }}
            className="p-1 rounded text-copy-faint hover:text-error hover:bg-subtle transition-colors"
            aria-label={`Delete ${project.name}`}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}
