"use client";

import { useState } from "react";
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
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Star, MapPin, ChevronRight } from "lucide-react";
import Image from "next/image";

// Mock data for businesses
const businesses = [
  {
    id: 1,
    name: "Elite Cuts Barbershop",
    type: "Barbershop",
    rating: 4.8,
    reviews: 124,
    distance: "0.8 miles",
    address: "123 Main St, Anytown",
    image: "https://drive.google.com/uc?id=1OLivHEwE0Xb4LgSNOO-7FeT7MwLQwWKD",
    openNow: true,
  },
  {
    id: 2,
    name: "Serene Spa & Wellness",
    type: "Spa",
    rating: 4.9,
    reviews: 89,
    distance: "1.2 miles",
    address: "456 Oak Ave, Anytown",
    image: "https://drive.google.com/uc?id=1OLivHEwE0Xb4LgSNOO-7FeT7MwLQwWKD",
    openNow: true,
  },
  {
    id: 3,
    name: "Glamour Nails Studio",
    type: "Nail Salon",
    rating: 4.7,
    reviews: 56,
    distance: "1.5 miles",
    address: "789 Elm St, Anytown",
    image: "https://drive.google.com/uc?id=1OLivHEwE0Xb4LgSNOO-7FeT7MwLQwWKD",
    openNow: false,
  },
];

export function BusinessesNearYou() {
  const [activeTab, setActiveTab] = useState("all");

  // Exibindo todos os negócios agora que o componente está em uma seção completa
  const displayBusinesses = businesses;

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Negócios Próximos</h2>
          <p className="text-sm text-muted-foreground">
            Serviços locais em sua área
          </p>
        </div>
        <Button variant="outline" size="sm" className="h-8">
          Ver Todos <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayBusinesses.map((business) => (
          <Card
            key={business.id}
            className="overflow-hidden border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div className="flex">
              <div className="relative w-24 h-24 flex-shrink-0 bg-slate-800">
                <Image
                  src={business.image || "/placeholder.svg"}
                  alt={business.name}
                  className="object-cover w-full h-full"
                  width={96}
                  height={96}
                />
              </div>
              <div className="flex-1 p-3">
                <div className="mb-1">
                  <h3 className="font-medium text-sm line-clamp-1">
                    {business.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {business.type}
                  </p>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span className="text-xs">{business.rating}</span>
                  <span className="text-xs text-muted-foreground">
                    ({business.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-2.5 w-2.5" />
                  <span className="truncate">{business.distance}</span>
                </div>
                <Button className="mt-2 w-full h-7 text-xs bg-purple-600 hover:bg-purple-700">
                  Agendar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full text-sm text-muted-foreground mt-3"
      >
        Mostrar mais lugares
      </Button>
    </section>
  );
}
