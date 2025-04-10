"use client";

import { ClientNavbar } from "@/app/components/client/client-navbar";
import { AccountSettings } from "@/app/components/client/profile/account-settings";
import { ActivityHistory } from "@/app/components/client/profile/activity-history";
import { ClientAppointments } from "@/app/components/client/profile/client-appointments";
import { OwnerBusinesses } from "@/app/components/client/profile/owner-businesses";
import { ProfileHeader } from "@/app/components/client/profile/profile-header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { useAuth } from "@/app/context/AuthContext";
import useApi from "@/app/hooks/useApi";
import { User } from "@/app/types/user";
import { useEffect, useState } from "react";

interface ClientPageProps {
  userId: string;
}

const ClientPage = ({ userId }: ClientPageProps) => {
  const { user, logout } = useAuth();
  const { getUserById } = useApi();
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const fetchUsers = async () => {
    try {
      const userData = await getUserById(userId);
      setUserData(userData);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {String(error)}</div>;
  if (!userData) return <div>Nenhum usuário encontrado</div>;

  return (
    <section className="w-screen h-screen bg-black">
      <ClientNavbar user={userData} logout={logout} />
      <div className="flex justify-center py-5">
        <div className="space-y-6 max-w-4xl md:min-w-4xl">
          <div className="w-full">
            <ProfileHeader user={userData} />
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="my-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                {userData.id === user?.id && (
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="overview" className="space-y-6">
                {userData.role === "client" ? (
                  <ClientAppointments
                    appointments={userData.appointments || []}
                  />
                ) : (
                  <OwnerBusinesses businesses={userData.businesses || []} />
                )}
              </TabsContent>
              <TabsContent value="activity">
                <ActivityHistory user={userData} />
              </TabsContent>
              <TabsContent value="settings">
                <AccountSettings user={userData} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPage;
