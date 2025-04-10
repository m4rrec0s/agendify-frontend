import { Business } from "./business";

export interface Service {
  id: string;
  businessId: string;
  name: string;
  description: string;
  imageUrl: string;
  duration: number;
  price: number;
  business: Business;
  createdAt: string;
  updatedAt: string;
}
