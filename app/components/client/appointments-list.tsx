"use client";

import { useState } from "react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  ChevronRight,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Badge } from "@/app/components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

// Mock data para agendamentos
const upcomingAppointments = [
  {
    id: 1,
    service: "Men's Haircut",
    business: "Elite Cuts Barbershop",
    date: "Tomorrow",
    time: "2:00 PM",
    duration: 30,
    address: "123 Main St, Anytown",
    status: "confirmed",
    image: "https://drive.google.com/uc?id=1OLivHEwE0Xb4LgSNOO-7FeT7MwLQwWKD",
  },
  {
    id: 2,
    service: "Full Body Massage",
    business: "Serene Spa & Wellness",
    date: "Fri, Jun 14",
    time: "10:30 AM",
    duration: 60,
    address: "456 Oak Ave, Anytown",
    status: "pending",
    image: "https://drive.google.com/uc?id=1OLivHEwE0Xb4LgSNOO-7FeT7MwLQwWKD",
  },
];

const pastAppointments = [
  {
    id: 3,
    service: "Men's Haircut",
    business: "Elite Cuts Barbershop",
    date: "May 28, 2023",
    time: "3:30 PM",
    duration: 30,
    address: "123 Main St, Anytown",
    status: "completed",
    image: "https://drive.google.com/uc?id=1OLivHEwE0Xb4LgSNOO-7FeT7MwLQwWKD",
  },
  {
    id: 4,
    service: "Manicure & Pedicure",
    business: "Glamour Nails Studio",
    date: "May 15, 2023",
    time: "1:00 PM",
    duration: 75,
    address: "789 Elm St, Anytown",
    status: "completed",
    image: "https://drive.google.com/uc?id=1OLivHEwE0Xb4LgSNOO-7FeT7MwLQwWKD",
  },
];

export function AppointmentsList() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-600 hover:bg-green-700">Confirmado</Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-600 hover:bg-yellow-700">Pendente</Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-600 hover:bg-blue-700">Concluído</Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-600 hover:bg-red-700">Cancelado</Badge>;
      default:
        return null;
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Seus Agendamentos</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie seus agendamentos atuais e passados
          </p>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          Ver Todos <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="mb-4">
        <TabsList>
          <TabsTrigger
            value="upcoming"
            onClick={() => setActiveTab("upcoming")}
          >
            Próximos
          </TabsTrigger>
          <TabsTrigger value="past" onClick={() => setActiveTab("past")}>
            Anteriores
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          {upcomingAppointments.length === 0 ? (
            <Card className="border-slate-800">
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">
                  Você não tem agendamentos próximos.
                </p>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                  Agendar Agora
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {upcomingAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="border-slate-800 hover:border-slate-700 transition-colors h-full"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage
                          src={appointment.image}
                          alt={appointment.business}
                        />
                        <AvatarFallback className="rounded-md bg-slate-700">
                          {appointment.business.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-sm">
                              {appointment.service}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {appointment.business}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(appointment.status)}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Mais opções</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Reagendar</DropdownMenuItem>
                                <DropdownMenuItem>Cancelar</DropdownMenuItem>
                                <DropdownMenuItem>Como Chegar</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Contatar Empresa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>
                              {appointment.time} ({appointment.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-1 col-span-2">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate">
                              {appointment.address}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {appointment.status === "confirmed" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs"
                              >
                                Reagendar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs text-red-500 hover:text-red-600"
                              >
                                Cancelar
                              </Button>
                            </>
                          )}
                          {appointment.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="mr-1 h-3 w-3" />{" "}
                                Confirmar
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs text-red-500 hover:text-red-600"
                              >
                                <XCircle className="mr-1 h-3 w-3" /> Recusar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          {pastAppointments.length === 0 ? (
            <Card className="border-slate-800">
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground">
                  Você não tem agendamentos anteriores.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {pastAppointments.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="border-slate-800 hover:border-slate-700 transition-colors h-full"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage
                          src={appointment.image}
                          alt={appointment.business}
                        />
                        <AvatarFallback className="rounded-md bg-slate-700">
                          {appointment.business.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-sm">
                              {appointment.service}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {appointment.business}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(appointment.status)}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Mais opções</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  Ver Detalhes
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Agendar Novamente
                                </DropdownMenuItem>
                                <DropdownMenuItem>Avaliar</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Contatar Empresa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span>
                              {appointment.time} ({appointment.duration} min)
                            </span>
                          </div>
                          <div className="flex items-center gap-1 col-span-2">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="truncate">
                              {appointment.address}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {appointment.status === "completed" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs"
                              >
                                Agendar Novamente
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs"
                              >
                                Avaliar
                              </Button>
                            </>
                          )}
                          {appointment.status === "cancelled" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs"
                            >
                              Agendar Novamente
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="mt-3 flex sm:hidden">
        <Button variant="outline" className="w-full text-sm">
          Ver Todos <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </section>
  );
}
