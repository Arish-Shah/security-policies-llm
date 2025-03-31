"use server";

import { redirect } from "next/navigation";
import { db } from "./db/drizzle";
import { projectsTable, rulesTable } from "./db/schema";
import { getProjectTitle, getRules, getSplits } from "./llm";
import { addVectors } from "./vector";

export async function createProject(_: any, formData: FormData) {
  const file = formData.get("file") as File;
  const splits = await getSplits(file);

  const name = await getProjectTitle(splits[0]);
  const rules = await getRules(splits);


  console.log({ name, rules });

  // const project = await db
  //   .insert(projectsTable)
  //   .values({
  //     name,
  //   })
  //   .returning({
  //     projectId: projectsTable.id,
  //     projectUuid: projectsTable.uuid,
  //   });
  // const { projectId, projectUuid } = project[0];
  //
  // await db
  //   .insert(rulesTable)
  //   .values([...rules.map((rule) => ({ rule, projectId }))]);
  //
  // await addVectors(projectUuid!, rules);
  //
  // return redirect(`/project/${projectUuid}`);
}
