import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";

export function Sidebar({
  children,
  loading,
}: {
  loading: boolean;
  children: React.ReactNode;
}) {
  if (loading) {
    return (
      <SidebarUI side="left" className="border-r-blue-200">
        <SidebarHeader className="bg-teal-25 py-6 pb-3 text-sm font-bold px-4">
          History Prompts
        </SidebarHeader>
        <SidebarContent className="bg-teal-25">
          <SidebarMenu className="px-2">
            {Array.from({ length: 20 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </SidebarUI>
    );
  }

  return (
    <SidebarUI side="left" className="border-r-gray-200">
      <SidebarHeader className="bg-teal-25 py-6 pb-3 text-sm font-bold px-4">
        History Prompts
      </SidebarHeader>
      <SidebarContent className="bg-teal-25">
        <SidebarGroup>{children}</SidebarGroup>
      </SidebarContent>
    </SidebarUI>
  );
}
