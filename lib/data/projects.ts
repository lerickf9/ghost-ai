import { prisma } from "@/lib/prisma";

export interface ProjectWithOwnership {
  id: string;
  name: string;
  ownerId: string;
  isOwned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export async function getOwnedProjects(
  userId: string
): Promise<ProjectWithOwnership[]> {
  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });
  return projects.map((p) => ({ ...p, isOwned: true }));
}

export async function getSharedProjects(
  userEmails: string[],
  userId: string
): Promise<ProjectWithOwnership[]> {
  if (!userEmails.length) return [];

  const projects = await prisma.project.findMany({
    where: {
      ownerId: { not: userId },
      collaborators: { some: { email: { in: userEmails } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return projects.map((p) => ({ ...p, isOwned: false }));
}
