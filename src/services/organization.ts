import {
  addSelfAsMember as addSelfAsMemberAPI,
  createOrganization as createOrganizationAPI,
  getOrganizationPositions as getOrganizationPositionsAPI,
  getMyMembership,
  inviteMember as inviteMemberAPI,
} from "./api/organization.api";

import {
  OrganizationMembership,
  OrganizationPosition,
  OrganizationType,
} from "@/types/organization";

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

export async function getOrganizationPositions(
  type: OrganizationType,
  groupId: string,
): Promise<OrganizationPosition[]> {
  return getOrganizationPositionsAPI(type, groupId);
}

export async function addSelfAsMember(
  type: OrganizationType,
  groupId: string,
  positionId: string,
): Promise<void> {
  return addSelfAsMemberAPI(type, groupId, positionId);
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
  return inviteMemberAPI(type, groupId, payload);
}
