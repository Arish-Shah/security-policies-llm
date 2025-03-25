import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "../env";

console.log("in drizzle.ts", env.DATABASE_URL);

export const client = postgres(env.DATABASE_URL);
export const db = drizzle({ client, schema });
