import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Clock } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  duration: number;
  icon: ReactNode;
}

export default function ServiceCard({
  title,
  description,
  price,
  duration,
  icon,
}: ServiceCardProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="h-8 w-8 bg-purple-600/20 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{duration} min</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="font-bold">${price}</div>
        <Button variant="outline" size="sm">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
}
