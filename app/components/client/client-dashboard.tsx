// "use client";

// import type React from "react";

// import { ClientSidebar } from "@/app/components/client/client-sidebar";
// import { ClientNavbar } from "@/app/components/client/client-navbar";
// import { BusinessesNearYou } from "@/app/components/client/businesses-near-you";
// import { FeaturedServices } from "@/app/components/client/featured-services";
// import { AppointmentsList } from "@/app/components/client/appointments-list";
// import { SidebarProvider, useSidebar } from "@/app/components/ui/sidebar";

// function DashboardLayout({ children }: { children: React.ReactNode }) {
//   const { state } = useSidebar();

//   return (
//     <div className="flex min-h-screen bg-background">
//       <ClientSidebar />
//       <div
//         className={`w-full flex-1 flex flex-col transition-all duration-300 ease-in-out ${
//           state === "expanded" ? "lg:ml-20" : "lg:ml-10"
//         }`}
//       >
//         <ClientNavbar />
//         <main className="flex-1 p-4 md:p-6">{children}</main>
//       </div>
//     </div>
//   );
// }

// export default function ClientDashboard() {
//   return (
//     <SidebarProvider>
//       <DashboardLayout>
//         <div className="space-y-8 w-full">
//           <AppointmentsList />
//           <BusinessesNearYou />
//           <FeaturedServices />
//         </div>
//       </DashboardLayout>
//     </SidebarProvider>
//   );
// }
