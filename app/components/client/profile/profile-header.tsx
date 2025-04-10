import type { User } from "@/app/types/user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Calendar, Mail, UserIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className="border-slate-800 w-full">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <Avatar className="h-24 w-24 border-4 border-purple-600/20">
            <AvatarImage src={user.imageUrl} alt={user.name} />
            <AvatarFallback className="text-2xl bg-slate-700">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <Badge className="w-fit capitalize bg-purple-600 hover:bg-purple-700">
                {user.role}
              </Badge>
            </div>

            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <span>
                  {user.createdAt
                    ? `Member since ${formatDistanceToNow(
                        new Date(user.createdAt),
                        { addSuffix: true }
                      )}`
                    : "Membership date unknown"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {user.role === "client"
                    ? `${user.appointments?.length || 0} Appointments`
                    : `${user.businesses?.length || 0} Businesses`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
