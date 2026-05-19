"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProjectWithOwnership } from "@/lib/data/projects";

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

function generateSuffix(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function useProjectActions(
  ownedProjects: ProjectWithOwnership[],
  sharedProjects: ProjectWithOwnership[],
  activeProjectId?: string
) {
  const router = useRouter();
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);
  const [selectedProject, setSelectedProject] =
    useState<ProjectWithOwnership | null>(null);
  const [nameInput, setNameInput] = useState("");
  const [suffix, setSuffix] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const slug = toSlug(nameInput);
  const roomId = slug ? `${slug}-${suffix}` : suffix;

  function openCreate() {
    setNameInput("");
    setSuffix(generateSuffix());
    setSelectedProject(null);
    setActiveDialog("create");
  }

  function openRename(project: ProjectWithOwnership) {
    setNameInput(project.name);
    setSelectedProject(project);
    setActiveDialog("rename");
  }

  function openDelete(project: ProjectWithOwnership) {
    setSelectedProject(project);
    setActiveDialog("delete");
  }

  function closeDialog() {
    setActiveDialog(null);
    setSelectedProject(null);
    setNameInput("");
  }

  async function handleCreate() {
    if (!nameInput.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: roomId, name: nameInput.trim() }),
      });
      if (!res.ok) throw new Error("Failed to create project");
      const project = (await res.json()) as { id: string };
      closeDialog();
      router.push(`/editor/${project.id}`);
    } catch (error) {
      // Display error to user via toast or error state
      console.error("Create failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRename() {
    if (!nameInput.trim() || !selectedProject) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameInput.trim() }),
      });
      if (!res.ok) throw new Error("Failed to rename project");
      closeDialog();
      router.refresh();
    } catch (error) {
      // Display error to user via toast or error state
      console.error("Rename failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    if (!selectedProject) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/projects/${selectedProject.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete project");
      closeDialog();
      if (activeProjectId === selectedProject.id) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } catch (error) {
      // Display error to user via toast or error state
      console.error("Delete failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    projects: [...ownedProjects, ...sharedProjects],
    activeDialog,
    selectedProject,
    nameInput,
    setNameInput,
    roomId,
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
