import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getProjects } from "@/lib/db/queries";
import Link from "next/link";
import { Suspense } from "react";
import { CreateProjectButton } from "./create-project-button";

function NavProjectsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

async function NavProjects() {
  const projects = await getProjects();

  return (
    <SidebarMenu>
      {projects.map((project) => (
        <SidebarMenuItem key={project.uuid}>
          <SidebarMenuButton asChild>
            <Link href={`/project/${project.uuid}`}>
              <span>{project.name}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="font-medium">
          Security Policies LLM
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <CreateProjectButton />
          <SidebarGroupContent>
            <Suspense fallback={<NavProjectsSkeleton />}>
              <NavProjects />
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
