import { request } from "./api";

import {
  MembershipCheck,
  OrganizationMembership,
  OrganizationType,
} from "@/types/organization";

/**
 * The API only grants workspace access to active memberships. A pending invite
 * deliberately keeps the user on the workspace screen until it is accepted.
 */
export async function getMyMembership(): Promise<MembershipCheck> {
  const response = await request<MembershipCheck>("/user/check-group", {
    authenticated: true,
  });

  return response.data;
}

export async function createOrganization(
  type: OrganizationType,
  name: string,
): Promise<OrganizationMembership> {
  const response = await request<OrganizationMembership>(`/groups/${type}`, {
    method: "POST",
    authenticated: true,
    body: { name: name.trim() },
  });

  return response.data;
}
