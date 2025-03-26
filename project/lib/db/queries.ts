import { eq, desc } from "drizzle-orm";
import { db } from "./drizzle";
import { projectsTable, rulesTable } from "./schema";
import { notFound } from "next/navigation";

export function getProjects() {
  return db.query.projectsTable.findMany({
    orderBy: desc(projectsTable.createdAt),
    columns: {
      uuid: true,
      name: true,
    },
  });
}

export async function getProjectByUuid(id: string) {
  const project = await db.query.projectsTable.findFirst({
    where: eq(projectsTable.uuid, id),
  });
  return project;
}

export async function getRulesByProjectUuid(projectUuid: string) {
  const project = await db.query.projectsTable.findFirst({
    where: eq(projectsTable.uuid, projectUuid),
  });

  if (!project) notFound();

  return db.query.rulesTable.findMany({
    where: eq(rulesTable.projectId, project.id),
    columns: {
      rule: true,
    },
  });
}
