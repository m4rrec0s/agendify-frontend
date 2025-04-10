import type { Business } from "@/app/types/business";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  MapPin,
  Users,
  Calendar,
  BarChart,
  PlusCircle,
  MoreHorizontal,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Image from "next/image";

interface OwnerBusinessesProps {
  businesses: Business[];
}

export function OwnerBusinesses({ businesses }: OwnerBusinessesProps) {
  return (
    <Card className="border-slate-800 w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Your Businesses</CardTitle>
          <CardDescription>
            Manage your business profiles and services
          </CardDescription>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Business
        </Button>
      </CardHeader>
      <CardContent className="w-full">
        {businesses.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-slate-700 rounded-lg">
            <h3 className="font-medium mb-2">No businesses yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first business to start accepting appointments
            </p>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Business
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {businesses.map((business) => (
              <Card
                key={business.id}
                className="border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="aspect-video relative bg-slate-800">
                  <Image
                    src={
                      business.imageUrl ||
                      "/placeholder.svg?height=200&width=400"
                    }
                    alt={business.name}
                    className="object-cover w-full h-full rounded-t-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-purple-600 hover:bg-purple-700">
                    {business.categoryId}
                  </Badge>
                </div>
                <CardHeader className="p-4 pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{business.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Business</DropdownMenuItem>
                        <DropdownMenuItem>Manage Services</DropdownMenuItem>
                        <DropdownMenuItem>View Appointments</DropdownMenuItem>
                        <DropdownMenuItem>Analytics</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {business.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0 pb-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{business.address}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="flex flex-col items-center p-2 bg-slate-800 rounded-md">
                      <Users className="h-4 w-4 mb-1 text-purple-600" />
                      <span className="text-xs text-muted-foreground">
                        Clients
                      </span>
                      <span className="text-sm font-medium">24</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-slate-800 rounded-md">
                      <Calendar className="h-4 w-4 mb-1 text-purple-600" />
                      <span className="text-xs text-muted-foreground">
                        Bookings
                      </span>
                      <span className="text-sm font-medium">18</span>
                    </div>
                    <div className="flex flex-col items-center p-2 bg-slate-800 rounded-md">
                      <BarChart className="h-4 w-4 mb-1 text-purple-600" />
                      <span className="text-xs text-muted-foreground">
                        Services
                      </span>
                      <span className="text-sm font-medium">
                        {business.services.length}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Manage Business
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
