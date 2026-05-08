"use client";

import { useState } from "react";

export interface MockProject {
  id: string;
  name: string;
  slug: string;
  isOwned: boolean;
}

type DialogType = "create" | "rename" | "delete" | null;

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

const INITIAL_PROJECTS: MockProject[] = [
  { id: "1", name: "E-commerce Platform", slug: "e-commerce-platform", isOwned: true },
  { id: "2", name: "Auth Service", slug: "auth-service", isOwned: true },
  { id: "3", name: "Microservices Design", slug: "microservices-design", isOwned: false },
];

export function useProjectDialogs() {
  const [projects, setProjects] = useState<MockProject[]>(INITIAL_PROJECTS);
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);
  const [selectedProject, setSelectedProject] = useState<MockProject | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slug = toSlug(nameInput);

  function openCreate() {
    setNameInput("");
    setSelectedProject(null);
    setActiveDialog("create");
  }

  function openRename(project: MockProject) {
    setNameInput(project.name);
    setSelectedProject(project);
    setActiveDialog("rename");
  }

  function openDelete(project: MockProject) {
    setSelectedProject(project);
    setActiveDialog("delete");
  }

  function closeDialog() {
    setActiveDialog(null);
    setSelectedProject(null);
    setNameInput("");
  }

  function handleCreate() {
    if (!nameInput.trim()) return;
    setIsLoading(true);
    const newProject: MockProject = {
      id: Date.now().toString(),
      name: nameInput.trim(),
      slug,
      isOwned: true,
    };
    setProjects((prev) => [...prev, newProject]);
    setIsLoading(false);
    closeDialog();
  }

  function handleRename() {
    if (!nameInput.trim() || !selectedProject) return;
    setIsLoading(true);
    setProjects((prev) =>
      prev.map((p) =>
        p.id === selectedProject.id
          ? { ...p, name: nameInput.trim(), slug: toSlug(nameInput.trim()) }
          : p
      )
    );
    setIsLoading(false);
    closeDialog();
  }

  function handleDelete() {
    if (!selectedProject) return;
    setIsLoading(true);
    setProjects((prev) => prev.filter((p) => p.id !== selectedProject.id));
    setIsLoading(false);
    closeDialog();
  }

  return {
    projects,
    activeDialog,
    selectedProject,
    nameInput,
    setNameInput,
    slug,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    closeDialog,
    handleCreate,
    handleRename,
    handleDelete,
  };
}
