"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Rule = {
  rule: string;
};

export const columns: ColumnDef<Rule>[] = [
  {
    accessorKey: "rule",
    header: "Rule",
  },
];
