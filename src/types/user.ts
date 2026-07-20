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

  /** Whether the account has an MPIN configured. The MPIN itself is never stored. */
  hasMpin?: boolean;

  createdAt?: string;

  updatedAt?: string;
}
