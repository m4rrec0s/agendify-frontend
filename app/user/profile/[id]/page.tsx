import { SidebarProvider } from "@/app/components/ui/sidebar";
import ClientPage from "./components/clientPage";
import React from "react";

interface UserPageProps {
  params: {
    id: string;
  };
}

const UserPage = async ({ params }: UserPageProps) => {
  const resolvedParams = await params;
  const userId = resolvedParams.id;

  if (!userId) {
    return <div>Error: User ID is required</div>;
  }

  return (
    <SidebarProvider>
      <ClientPage userId={userId} />
    </SidebarProvider>
  );
};

export default UserPage;
