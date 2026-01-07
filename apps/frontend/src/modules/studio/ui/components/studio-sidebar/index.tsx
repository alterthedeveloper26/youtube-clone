"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ArrowBigLeft, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { StudioSidebarHeader } from "./studio-sidebar-header";

export const StudioSidebar = () => {
  const pathName = usePathname();

  return (
    <Sidebar className="mt-16 z-40">
      <SidebarContent className="bg-background">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <StudioSidebarHeader />
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathName === "/studio"}
                  tooltip="Content"
                  asChild
                >
                  <Link href="/studio">
                    <VideoIcon className="size-5" />
                    <span className="text-sm">Content</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Exit studio" asChild>
                  <Link href="/">
                    <ArrowBigLeft className="size-5" />
                    <span className="text-sm">Exit studio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
