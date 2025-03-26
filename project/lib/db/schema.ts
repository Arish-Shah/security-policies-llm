import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  uuid: uuid().unique().defaultRandom(),
  name: varchar({ length: 225 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const projectsRelations = relations(projectsTable, ({ many }) => ({
  rules: many(rulesTable),
}));

export const rulesTable = pgTable("rules", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  rule: text().notNull(),
  projectId: integer("project_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const rulesRelations = relations(rulesTable, ({ one }) => ({
  project: one(projectsTable, {
    fields: [rulesTable.projectId],
    references: [projectsTable.id],
  }),
}));
