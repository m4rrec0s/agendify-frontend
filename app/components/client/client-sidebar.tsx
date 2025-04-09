"use client";

import {
  Calendar,
  Home,
  Search,
  Settings,
  Store,
  Clock,
  Heart,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/app/components/ui/sidebar";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

export function ClientSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon" className="rounded-xl">
      <SidebarContent className="mt-[80px] px-2 py-2 overflow-y-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive>
              <Link href="/client" className="truncate">
                <Home className="h-5 w-5 shrink-0" />
                <span className="truncate">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/client/explore" className="truncate">
                <Search className="h-5 w-5 shrink-0" />
                <span className="truncate">Explore</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/client/businesses" className="truncate">
                <Store className="h-5 w-5 shrink-0" />
                <span className="truncate">Businesses</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/client/appointments" className="truncate">
                <Calendar className="h-5 w-5 shrink-0" />
                <span className="truncate">Appointments</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/client/history" className="truncate">
                <Clock className="h-5 w-5 shrink-0" />
                <span className="truncate">History</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/client/favorites" className="truncate">
                <Heart className="h-5 w-5 shrink-0" />
                <span className="truncate">Favorites</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/client/messages" className="truncate">
                <MessageSquare className="h-5 w-5 shrink-0" />
                <span className="truncate">Messages</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/client/settings" className="truncate">
                <Settings className="h-5 w-5 shrink-0" />
                <span className="truncate">Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/client/help" className="truncate">
                <HelpCircle className="h-5 w-5 shrink-0" />
                <span className="truncate">Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="mt-4 w-full flex justify-center">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 overflow-hidden text-ellipsis whitespace-nowrap">
                  Meus Agendamentos
                </Button>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
