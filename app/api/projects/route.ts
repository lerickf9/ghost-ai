import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json(projects);
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => ({}));
  const bodyObj =
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>)
      : {};

  const name =
    typeof bodyObj.name === "string" && bodyObj.name.trim() !== ""
      ? bodyObj.name.trim()
      : "Untitled Project";

  const customId =
    typeof bodyObj.id === "string" && bodyObj.id.trim() !== ""
      ? bodyObj.id.trim()
      : undefined;

  const project = await prisma.project.create({
    data: { ...(customId ? { id: customId } : {}), ownerId: userId, name },
  });

  return Response.json(project, { status: 201 });
}
