import { RulesFilterForm } from "@/components/rules-filter-form";
import { RulesTable } from "@/components/rules-table";
import { Selected } from "@/components/selected";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getProjectByUuid } from "@/lib/db/queries";
import { SeparatorVertical } from "lucide-react";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function ProjectPage({
  params,
  searchParams,
}: ProjectPageProps) {
  const { projectId: projectUuid } = await params;
  const { filter } = await searchParams;
  const project = await getProjectByUuid(projectUuid);

  if (!project) notFound();

  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <span className="font-medium">{project.name}</span>
      </header>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="overflow-y-auto! p-4" defaultSize={50}>
          <RulesFilterForm />
          <RulesTable projectUuid={projectUuid} filter={filter} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="p-4" defaultSize={50}>
          <Selected />
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
