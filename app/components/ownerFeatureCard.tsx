import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";

interface OwnerFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function OwnerFeatureCard({
  icon,
  title,
  description,
}: OwnerFeatureCardProps) {
  return (
    <Card className="border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="mt-1">{icon}</div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
