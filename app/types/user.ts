import { Appointment } from "./appointment";
import { Business } from "./business";

export interface User {
  id: string;
  firebaseUid: string;
  name: string;
  email: string;
  role: "client" | "owner" | "admin";
  imageUrl?: string;
  appointments?: Appointment[];
  businesses?: Business[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
  role: "client" | "owner";
}

export interface GoogleAuthData {
  idToken: string;
  firebaseUid: string;
  email: string | null;
  name: string | null;
  imageUrl?: string | null;
  role?: "client" | "owner";
}

export interface AuthResponse {
  user: User;
  idToken: string;
  firebaseUid: string;
}
