"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Clock, ChevronRight } from "lucide-react";
import Image from "next/image";

// Mock data para serviços em destaque
const featuredServices = [
  {
    id: 1,
    name: "Men's Haircut",
    provider: "Elite Cuts Barbershop",
    price: 35,
    duration: 30,
    image: "https://drive.google.com/uc?id=1jxO3eA2nZNguIs2MTzGwu80_SUS5aEgk",
    popular: true,
  },
  {
    id: 2,
    name: "Full Body Massage",
    provider: "Serene Spa & Wellness",
    price: 90,
    duration: 60,
    image: "https://drive.google.com/uc?id=1jxO3eA2nZNguIs2MTzGwu80_SUS5aEgk",
    popular: false,
  },
  {
    id: 3,
    name: "Manicure & Pedicure",
    provider: "Glamour Nails Studio",
    price: 65,
    duration: 75,
    image: "https://drive.google.com/uc?id=1jxO3eA2nZNguIs2MTzGwu80_SUS5aEgk",
    popular: true,
  },
  {
    id: 4,
    name: "Women's Haircut & Style",
    provider: "Modern Hair Design",
    price: 75,
    duration: 60,
    image: "https://drive.google.com/uc?id=1jxO3eA2nZNguIs2MTzGwu80_SUS5aEgk",
    popular: false,
  },
];

export function FeaturedServices() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold">Serviços em Destaque</h2>
          <p className="text-sm text-muted-foreground">
            Serviços populares de estabelecimentos bem avaliados
          </p>
        </div>
        <Button variant="outline" size="sm" className="hidden sm:flex">
          Ver Todos <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredServices.map((service) => (
          <Card
            key={service.id}
            className="overflow-hidden border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div className="aspect-[4/3] relative bg-slate-800">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.name}
                className="object-cover w-full h-full"
                width={300}
                height={225}
              />
              {service.popular && (
                <Badge className="absolute top-2 right-2 bg-purple-600 hover:bg-purple-700">
                  Popular
                </Badge>
              )}
            </div>
            <CardHeader className="p-3 pb-0">
              <CardTitle className="text-base">{service.name}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {service.provider}
              </p>
            </CardHeader>
            <CardContent className="p-3 pt-1 pb-0">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{service.duration} min</span>
              </div>
            </CardContent>
            <CardFooter className="p-3 flex justify-between items-center">
              <div className="font-bold">${service.price}</div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                Agendar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-3 flex sm:hidden">
        <Button variant="outline" className="w-full text-sm">
          Ver Todos <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
    </section>
  );
}
