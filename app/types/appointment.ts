import { Business } from "./business";
import { Service } from "./service";

export interface Appointment {
  id: string;
  businessId: string;
  serviceId: string;
  service: Service;
  business: Business;
  clientId: string;
  date: Date;
  status: "pending" | "confirmed" | "canceled" | "completed";
  createdAt: Date;
  updatedAt: Date;
}
