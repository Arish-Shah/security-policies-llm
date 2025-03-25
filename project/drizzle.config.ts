import { defineConfig, type Config } from "drizzle-kit";
import { env } from "./lib/env";

export default defineConfig({
  dialect: "postgresql",
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
}) satisfies Config;
