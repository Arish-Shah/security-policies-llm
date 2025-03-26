import { eq, desc } from "drizzle-orm";
import { db } from "./drizzle";
import { projectsTable } from "./schema";

export function getProjects() {
  return db.query.projectsTable.findMany({
    orderBy: desc(projectsTable.createdAt),
    columns: {
      uuid: true,
      name: true,
    },
  });
}

export async function getProjectById(id: string) {
  const project = await db.query.projectsTable.findFirst({
    where: eq(projectsTable.uuid, id),
  });
  return project;
}
