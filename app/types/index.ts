import { Listing, Reservation, User } from "@prisma/client";

export type SafeListing = Omit<
  Listing,
  "createAt"
> & {
  createAt: string;
}

export type SafeReservation = Omit<
  Reservation,
  "createAt" | "startDate" | "endDate"
> & {
  createAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListing;
}

export type SafeUser = Omit<
  User, 
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
