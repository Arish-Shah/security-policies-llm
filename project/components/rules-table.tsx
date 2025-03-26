import { getRulesByProjectUuid } from "@/lib/db/queries";
import { DataTable } from "./ui/data-table";
import { columns } from "@/app/project/[projectId]/columns";
import { getResults } from "@/lib/vector";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type RulesTableProps = {
  projectUuid: string;
  filter: string | undefined;
};

export async function RulesTable({ projectUuid, filter }: RulesTableProps) {
  const rules = filter
    ? await getResults(projectUuid, filter)
    : await getRulesByProjectUuid(projectUuid);

  return (
    <ScrollArea className="h-72 pt-4">
      <DataTable columns={columns} data={rules} />
    </ScrollArea>
  );
}
