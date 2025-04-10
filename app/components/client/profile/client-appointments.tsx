import type { Appointment } from "@/app/types/appointment";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { format, isPast } from "date-fns";

interface ClientAppointmentsProps {
  appointments: Appointment[];
}

export function ClientAppointments({ appointments }: ClientAppointmentsProps) {
  // Filter upcoming appointments
  const upcomingAppointments = appointments.filter(
    (appointment) =>
      !isPast(new Date(appointment.date)) && appointment.status !== "canceled"
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">Confirmed</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-600 hover:bg-yellow-700">Pending</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700">Completed</Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-600 hover:bg-red-700">Cancelled</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="border-slate-800 w-full">
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>
          Your scheduled appointments with businesses
        </CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              You dont have any upcoming appointments.
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Book an Appointment
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12 rounded-md">
                    <AvatarImage
                      src={appointment.business.imageUrl}
                      alt={appointment.business.name}
                    />
                    <AvatarFallback className="rounded-md bg-slate-700">
                      {appointment.business.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">
                          {appointment.service.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {appointment.business.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(appointment.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem>Cancel</DropdownMenuItem>
                            <DropdownMenuItem>Get Directions</DropdownMenuItem>
                            <DropdownMenuItem>
                              Contact Business
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {format(
                            new Date(appointment.date),
                            "EEEE, MMMM d, yyyy"
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span>
                          {format(new Date(appointment.date), "h:mm a")} (
                          {appointment.service.duration} min)
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm sm:col-span-2">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="truncate">
                          {appointment.business.address}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {appointment.status === "confirmed" && (
                        <>
                          <Button size="sm" variant="outline">
                            Reschedule
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-500 hover:text-red-600"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
