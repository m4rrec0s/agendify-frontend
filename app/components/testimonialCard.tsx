import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/app/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  rating,
}: TestimonialCardProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-colors">
      <CardHeader>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-slate-700"
              }`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm italic mb-4">{`"${quote}"`}</p>
      </CardContent>
      <CardFooter>
        <div>
          <div className="font-medium">{author}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
