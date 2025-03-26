import { SidebarTrigger } from "@/components/ui/sidebar";

export default function HomePage() {
  return (
    <div className="h-full p-4">
      <SidebarTrigger />
      <div className="flex h-full items-center justify-center">
        <div className="text-muted-foreground text-lg">
          Select or Create a Project
        </div>
      </div>
    </div>
  );
}
