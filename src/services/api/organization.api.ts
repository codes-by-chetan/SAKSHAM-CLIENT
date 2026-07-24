import { request } from "./api";

import {
  MembershipCheck,
  OrganizationMembership,
  OrganizationPosition,
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

export async function getOrganizationPositions(
  type: OrganizationType,
  groupId: string,
): Promise<OrganizationPosition[]> {
  const response = await request<OrganizationPosition[]>(
    `/groups/${type}/${groupId}/positions`,
    { authenticated: true },
  );

  return response.data;
}

export async function addSelfAsMember(
  type: OrganizationType,
  groupId: string,
  positionId: string,
): Promise<void> {
  await request(`/groups/${type}/${groupId}/self-membership`, {
    method: "POST",
    authenticated: true,
    body: { positionId },
  });
}

export async function inviteMember(
  type: OrganizationType,
  groupId: string,
  payload: {
    fullName?: string;
    countryCode: string;
    phone: string;
    positionId: string;
  },
): Promise<void> {
  await request(`/groups/${type}/${groupId}/invitations`, {
    method: "POST",
    authenticated: true,
    body: {
      fullName: payload.fullName?.trim() || undefined,
      contactNumber: {
        countryCode: payload.countryCode,
        number: payload.phone.replace(/\D/g, ""),
      },
      positionId: payload.positionId,
    },
  });
}
