import type { User } from "@/app/types/user";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import { Switch } from "@/app/components/ui/switch";
import { Bell, Shield, LogOut } from "lucide-react";

interface AccountSettingsProps {
  user: User;
}

export function AccountSettings({ user }: AccountSettingsProps) {
  return (
    <Card className="border-slate-800">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account preferences and settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 max-h-[30vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="space-y-4 px-2">
          <h3 className="text-sm font-medium">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                defaultValue={user.name}
                className="bg-background/10 border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                defaultValue={user.email}
                disabled
                className="bg-background/10 border-slate-700"
              />
            </div>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Save Changes
          </Button>
        </div>

        <Separator className="bg-slate-800" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">Notification Preferences</h3>
              <p className="text-xs text-muted-foreground">
                Manage how you receive notifications
              </p>
            </div>
            <Bell className="h-5 w-5 text-muted-foreground" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="appointment-reminders" className="flex-1">
                Appointment Reminders
                <span className="block text-xs text-muted-foreground">
                  Receive reminders about upcoming appointments
                </span>
              </Label>
              <Switch id="appointment-reminders" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="marketing-emails" className="flex-1">
                Marketing Emails
                <span className="block text-xs text-muted-foreground">
                  Receive emails about promotions and new features
                </span>
              </Label>
              <Switch id="marketing-emails" />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications" className="flex-1">
                SMS Notifications
                <span className="block text-xs text-muted-foreground">
                  Receive text messages for important updates
                </span>
              </Label>
              <Switch id="sms-notifications" defaultChecked />
            </div>
          </div>
        </div>

        <Separator className="bg-slate-800" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-sm font-medium">Security</h3>
              <p className="text-xs text-muted-foreground">
                Manage your account security
              </p>
            </div>
            <Shield className="h-5 w-5 text-muted-foreground" />
          </div>

          <Button variant="outline">Change Password</Button>
        </div>
      </CardContent>
      <CardFooter className="border-t border-slate-800 flex justify-between">
        <Button variant="outline" className="text-red-500 hover:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
        <Button variant="outline" className="text-red-500 hover:text-red-600">
          Delete Account
        </Button>
      </CardFooter>
    </Card>
  );
}
