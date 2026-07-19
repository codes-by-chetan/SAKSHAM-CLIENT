import { ContactNumber } from "./common";

export interface FullName {
  firstName?: string;
  lastName?: string;
}

export interface User {
  id?: string;

  fullName?: FullName;

  fullNameString?: string;

  email?: string;

  contactNumber?: ContactNumber;

  role?: string;

  createdAt?: string;

  updatedAt?: string;
}