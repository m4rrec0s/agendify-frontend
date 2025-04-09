"use client";

import type React from "react";

import { SidebarProvider } from "@/app/components/ui/sidebar";
import { ClientSidebar } from "@/app/components/client/client-sidebar";
import { ClientNavbar } from "@/app/components/client/client-navbar";
import { useSidebar } from "@/app/components/ui/sidebar";
import { useAuth } from "../context/AuthContext";

function ClientLayout({ children }: { children: React.ReactNode }) {
  const { state } = useSidebar();
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background w-full">
      <ClientNavbar user={user} />
      <div className="flex flex-1 pt-5 w-full">
        {" "}
        <ClientSidebar />
        <div
          className={`flex-1 transition-all duration-300 ease-in-out w-full
            ${state === "expanded" ? "lg:ml-2" : "lg:ml-2"}`}
        >
          <main className="p-4 md:p-6 w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <ClientLayout>{children}</ClientLayout>
    </SidebarProvider>
  );
}
