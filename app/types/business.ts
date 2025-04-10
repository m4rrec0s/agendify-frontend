import { Service } from "./service";

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  imageUrl: string;
  description: string;
  address: string;
  phone: string;
  services: Service[];
  categoryId: string;
  workingHours: {
    week: {
      start: string;
      "time-out": {
        start: string;
        end: string;
      };
      end: string;
    };
    weekend: {
      start: string;
      end: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}
