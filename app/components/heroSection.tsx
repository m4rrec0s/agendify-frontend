"use client";

// import { useState } from "react"
import { Button } from "@/app/components/ui/button";
import { Calendar, ArrowRight, CheckCircle } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
// import { Input } from "@/app/components/ui/input"

export default function HeroSection() {
  //   const [email, setEmail] = useState("")

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800 z-0"></div>

      {/* Purple accent */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Scheduling Made <span className="text-purple-600">Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Connect with businesses and book appointments with ease. Agendify
              streamlines scheduling for both clients and business owners.
            </p>

            <Tabs defaultValue="client" className="w-full max-w-md mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="client">Im a Client</TabsTrigger>
                <TabsTrigger value="owner">Im a Business Owner</TabsTrigger>
              </TabsList>
              <TabsContent value="client" className="mt-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/10 border-slate-700"
                  /> */}
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="owner" className="mt-4">
                <div className="flex flex-col sm:flex-row gap-2">
                  {/* <Input
                    type="email"
                    placeholder="Enter your business email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background/10 border-slate-700"
                  /> */}
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Register Business <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Join 10,000+ users already managing their schedules</span>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square md:aspect-[4/3] bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                <Calendar className="h-24 w-24 text-purple-600/50" />
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -left-6 bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-600/20 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Haircut Appointment</div>
                  <div className="text-xs text-muted-foreground">
                    Today, 2:00 PM
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-lg hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-600/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Booking Confirmed</div>
                  <div className="text-xs text-muted-foreground">
                    Confirmation sent
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
