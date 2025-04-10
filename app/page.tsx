"use client";

import Link from "next/link";
import { useAuth } from "./context/AuthContext";
import { Button } from "./components/ui/button";
import TestimonialCard from "./components/testimonialCard";
import {
  BarChart,
  Bell,
  Calendar,
  ChevronRight,
  MessageSquare,
  Scissors,
  Settings,
  Users,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import OwnerFeatureCard from "./components/ownerFeatureCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import FeatureCard from "./components/featureCard";
import HeroSection from "./components/heroSection";
import ServiceCard from "./components/serviceCard";
import { Badge } from "./components/ui/badge";
// import ClientDashboard from "./components/client/client-dashboard";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push("/client");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const GuestContent = () => (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {/* Navigation */}
        <header className="container mx-auto py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold">Agendify</span>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="#clients"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                For Clients
              </Link>
              <Link
                href="#owners"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                For Owners
              </Link>
              <Link
                href="#testimonials"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 px-4 py-2"
              >
                Log In
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-purple-600 hover:bg-purple-700 px-4 py-2 text-white shadow-xs"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </header>

        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Features Section */}
          <section id="features" className="container mx-auto py-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Streamline Your Scheduling
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Agendify connects clients with business owners through a
                seamless scheduling experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Calendar className="h-10 w-10 text-purple-600" />}
                title="Easy Booking"
                description="Book appointments with your favorite businesses in just a few clicks."
              />
              <FeatureCard
                icon={<Bell className="h-10 w-10 text-purple-600" />}
                title="Smart Notifications"
                description="Get timely reminders about upcoming appointments and schedule changes."
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-purple-600" />}
                title="Direct Communication"
                description="Message business owners directly through the platform."
              />
            </div>
          </section>

          {/* Client Section */}
          <section id="clients" className="py-20 bg-slate-900">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-600 hover:bg-purple-700">
                  For Clients
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Find and Book Services
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover local businesses and book appointments with ease.
                </p>
              </div>

              <div className="mb-12">
                <Tabs defaultValue="haircuts" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="haircuts">Haircuts</TabsTrigger>
                    <TabsTrigger value="nails">Nail Services</TabsTrigger>
                    <TabsTrigger value="spa">Spa Treatments</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="haircuts"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    <ServiceCard
                      title="Men's Haircut"
                      description="Professional haircut with styling"
                      price={35}
                      duration={30}
                      icon={<Scissors />}
                    />
                    <ServiceCard
                      title="Women's Haircut"
                      description="Cut, wash, and blow dry"
                      price={55}
                      duration={60}
                      icon={<Scissors />}
                    />
                    <ServiceCard
                      title="Color & Highlights"
                      description="Full color treatment with highlights"
                      price={120}
                      duration={120}
                      icon={<Scissors />}
                    />
                  </TabsContent>
                  <TabsContent
                    value="nails"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    <ServiceCard
                      title="Manicure"
                      description="Basic nail care and polish"
                      price={25}
                      duration={30}
                      icon={<Scissors />}
                    />
                    <ServiceCard
                      title="Pedicure"
                      description="Foot care and polish"
                      price={40}
                      duration={45}
                      icon={<Scissors />}
                    />
                    <ServiceCard
                      title="Gel Extensions"
                      description="Full set of gel nail extensions"
                      price={65}
                      duration={75}
                      icon={<Scissors />}
                    />
                  </TabsContent>
                  <TabsContent
                    value="spa"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  >
                    <ServiceCard
                      title="Swedish Massage"
                      description="Relaxing full body massage"
                      price={80}
                      duration={60}
                      icon={<Scissors />}
                    />
                    <ServiceCard
                      title="Facial Treatment"
                      description="Deep cleansing facial"
                      price={70}
                      duration={45}
                      icon={<Scissors />}
                    />
                    <ServiceCard
                      title="Hot Stone Therapy"
                      description="Therapeutic hot stone massage"
                      price={110}
                      duration={90}
                      icon={<Scissors />}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Book Appointment <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          {/* Owner Section */}
          <section id="owners" className="py-20">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <Badge className="mb-4 bg-purple-600 hover:bg-purple-700">
                  For Business Owners
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Manage Your Business
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Powerful tools to help you manage appointments, services, and
                  client relationships.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <div>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Dashboard Overview</CardTitle>
                      <CardDescription>
                        Monitor your business performance at a glance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
                        <BarChart className="h-24 w-24 text-purple-600 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <OwnerFeatureCard
                    icon={<Calendar className="h-8 w-8 text-purple-600" />}
                    title="Appointment Management"
                    description="Easily manage your schedule and client bookings"
                  />
                  <OwnerFeatureCard
                    icon={<Users className="h-8 w-8 text-purple-600" />}
                    title="Client Management"
                    description="Keep track of client information and preferences"
                  />
                  <OwnerFeatureCard
                    icon={<Settings className="h-8 w-8 text-purple-600" />}
                    title="Service Configuration"
                    description="Set up and customize your service offerings"
                  />
                  <OwnerFeatureCard
                    icon={<BarChart className="h-8 w-8 text-purple-600" />}
                    title="Business Analytics"
                    description="Gain insights into your business performance"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                  Start Managing Your Business{" "}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section id="testimonials" className="py-20 bg-slate-900">
            <div className="container mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Hear from clients and business owners who use Agendify.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TestimonialCard
                  quote="Agendify has transformed how I book appointments. No more waiting on hold or forgetting appointments!"
                  author="Sarah J."
                  role="Client"
                  rating={5}
                />
                <TestimonialCard
                  quote="As a salon owner, Agendify has reduced no-shows by 75% and saved me countless hours on scheduling."
                  author="Michael T."
                  role="Business Owner"
                  rating={5}
                />
                <TestimonialCard
                  quote="The interface is intuitive and the notifications are a lifesaver. Highly recommend!"
                  author="Jessica R."
                  role="Client"
                  rating={4}
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20">
            <div className="container mx-auto">
              <div className="bg-slate-800 rounded-xl p-8 md:p-12">
                <div className="text-center max-w-3xl mx-auto">
                  <h2 className="text-3xl font-bold mb-4">
                    Ready to Streamline Your Scheduling?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Join thousands of businesses and clients who use Agendify to
                    simplify their scheduling experience.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Sign Up as a Client
                    </Button>
                    <Button size="lg" variant="outline">
                      Register Your Business
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 py-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                  <span className="text-xl font-bold">Agendify</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Connecting clients with businesses through seamless
                  scheduling.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-4">For Clients</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Find Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Book Appointments
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Manage Schedule
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">For Owners</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Business Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Service Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Client Relationships
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Agendify. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full">
      {!isAuthenticated && <GuestContent />}
    </main>
  );
}
