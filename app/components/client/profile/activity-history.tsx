import type { User } from "@/app/types/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Badge } from "@/app/components/ui/badge";
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react";
import { format, parseISO } from "date-fns";

interface ActivityHistoryProps {
  user: User;
}

export function ActivityHistory({ user }: ActivityHistoryProps) {
  const pastAppointments = (user.appointments || [])
    .filter(
      (appointment) =>
        appointment.status === "completed" || appointment.status === "canceled"
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="border-slate-800">
      <CardHeader>
        <CardTitle>Activity History</CardTitle>
        <CardDescription>Your recent activity on Agendify</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="appointments">
          <TabsList className="mb-4">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          <TabsContent value="appointments">
            {pastAppointments.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground">
                  No past appointment history
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pastAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-start gap-3 pb-3 border-b border-slate-800 last:border-0"
                  >
                    <div className="mt-0.5">
                      {getStatusIcon(appointment.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">
                          {appointment.service.name}
                        </p>
                        <Badge
                          className={`${
                            appointment.status === "completed"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {appointment.business.name}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {format(
                              parseISO(appointment.date.toString()),
                              "MMM d, yyyy"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>
                            {format(
                              parseISO(appointment.date.toString()),
                              "h:mm a"
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="account">
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-3 border-b border-slate-800">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Account created</p>
                  <p className="text-xs text-muted-foreground">
                    {user.createdAt
                      ? format(
                          parseISO(user.createdAt.toString()),
                          "MMMM d, yyyy 'at' h:mm a"
                        )
                      : "Unknown date"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-3 border-b border-slate-800">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="font-medium">Profile updated</p>
                  <p className="text-xs text-muted-foreground">
                    {user.updatedAt
                      ? format(
                          parseISO(user.updatedAt.toString()),
                          "MMMM d, yyyy 'at' h:mm a"
                        )
                      : "Unknown date"}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
