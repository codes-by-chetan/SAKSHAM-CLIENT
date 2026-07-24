export type OrganizationType = "bachatgat" | "gramsangh";

export interface OrganizationMembership {
  id: string;
  name: string;
  type: OrganizationType;
  status?: "active" | "pending";
}

export interface MembershipCheck {
  membership: OrganizationMembership | null;
}

export interface OrganizationPosition {
  id: string;
  name: string;
  displayName: string;
  level: number;
}
