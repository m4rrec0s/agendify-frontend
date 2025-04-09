import { BusinessesNearYou } from "@/app/components/client/businesses-near-you";
import { FeaturedServices } from "@/app/components/client/featured-services";
import { AppointmentsList } from "@/app/components/client/appointments-list";

export default function ClientPage() {
  return (
    <div className="space-y-8 w-full">
      <AppointmentsList />
      <BusinessesNearYou />
      <FeaturedServices />
    </div>
  );
}
