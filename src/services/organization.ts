import {
  createOrganization as createOrganizationAPI,
  getMyMembership,
} from "./api/organization.api";

import { OrganizationMembership, OrganizationType } from "@/types/organization";

export async function getActiveMembership(): Promise<OrganizationMembership | null> {
  const { membership } = await getMyMembership();

  return membership?.status === "pending" ? null : membership;
}

export async function createOrganization(
  type: OrganizationType,
  name: string,
): Promise<OrganizationMembership> {
  return createOrganizationAPI(type, name);
}
