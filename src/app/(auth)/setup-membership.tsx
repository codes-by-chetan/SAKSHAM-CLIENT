import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { UserPlus } from "lucide-react-native";

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Screen from "@/components/Screen";
import {
  addSelfAsMember,
  getOrganizationPositions,
  inviteMember,
} from "@/services/organization";
import { OrganizationPosition, OrganizationType } from "@/types/organization";

export default function SetupMembershipScreen() {
  const { groupId, type } = useLocalSearchParams<{
    groupId: string;
    type: OrganizationType;
  }>();
  const [positions, setPositions] = useState<OrganizationPosition[]>([]);
  const [myPositionId, setMyPositionId] = useState("");
  const [invitePositionId, setInvitePositionId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [inviteCount, setInviteCount] = useState(0);

  useEffect(() => {
    async function loadPositions() {
      if (!groupId || !type) return;

      try {
        const result = await getOrganizationPositions(type, groupId);
        setPositions(result);
        setMyPositionId(result[0]?.id ?? "");
        setInvitePositionId(result[result.length - 1]?.id ?? "");
      } catch (error: any) {
        Alert.alert(
          "Could not load roles",
          error.message ?? "Please try again.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadPositions();
  }, [groupId, type]);

  async function joinGroup() {
    if (!groupId || !type || !myPositionId) return;

    try {
      setSubmitting(true);
      await addSelfAsMember(type, groupId, myPositionId);
      setJoined(true);
    } catch (error: any) {
      Alert.alert("Could not join group", error.message ?? "Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function sendInvitation() {
    if (!groupId || !type || !phone.trim() || !invitePositionId) {
      Alert.alert("Member details required", "Enter a phone number and role.");
      return;
    }

    try {
      setSubmitting(true);
      await inviteMember(type, groupId, {
        fullName,
        countryCode: "+91",
        phone,
        positionId: invitePositionId,
      });
      setFullName("");
      setPhone("");
      setInviteCount((count) => count + 1);
      Alert.alert(
        "Invitation saved",
        "This member will join automatically when they register with this phone number.",
      );
    } catch (error: any) {
      Alert.alert(
        "Could not invite member",
        error.message ?? "Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const typeLabel = type === "gramsangh" ? "Gramsangh" : "Bachatgat";

  return (
    <Screen>
      <View className="flex-1 justify-center py-6">
        <View className="items-center">
          <Logo size="md" />
          <AuthHeader
            title={joined ? "Invite members" : `Join your ${typeLabel}`}
            subtitle={
              joined
                ? "Assign a role now. Their invitation becomes active when they register."
                : "Choose the role you will hold in the group you created."
            }
          />
        </View>

        <AuthCard>
          {loading ? (
            <Text className="text-center text-stone-500">Loading roles…</Text>
          ) : !joined ? (
            <>
              <Text className="mb-3 text-sm font-semibold text-ink">
                Your role
              </Text>
              <RolePicker
                positions={positions}
                selectedId={myPositionId}
                onSelect={setMyPositionId}
              />
              <View className="mt-6">
                <Button
                  title="Join this group"
                  loading={submitting}
                  onPress={joinGroup}
                />
              </View>
            </>
          ) : (
            <>
              <Text className="mb-2 text-sm font-semibold text-ink">
                Add a member {inviteCount ? `(${inviteCount} invited)` : ""}
              </Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Member name (optional)"
                className="rounded-2xl border border-stone-300 bg-white px-4 py-4 text-base text-ink"
              />
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone number"
                keyboardType="phone-pad"
                className="mt-3 rounded-2xl border border-stone-300 bg-white px-4 py-4 text-base text-ink"
              />
              <Text className="mb-3 mt-5 text-sm font-semibold text-ink">
                Member role
              </Text>
              <RolePicker
                positions={positions}
                selectedId={invitePositionId}
                onSelect={setInvitePositionId}
              />
              <View className="mt-6">
                <Button
                  title="Send invitation"
                  loading={submitting}
                  onPress={sendInvitation}
                  LeftIcon={UserPlus}
                />
              </View>
              <Button
                title="Continue to dashboard"
                variant="ghost"
                onPress={() => router.replace("/(main)/dashboard")}
              />
            </>
          )}
        </AuthCard>
      </View>
    </Screen>
  );
}

function RolePicker({
  positions,
  selectedId,
  onSelect,
}: {
  positions: OrganizationPosition[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <View className="gap-2">
      {positions.map((position) => (
        <TouchableOpacity
          key={position.id}
          onPress={() => onSelect(position.id)}
          className={`rounded-2xl border px-4 py-3 ${selectedId === position.id ? "border-leaf bg-green-50" : "border-stone-200 bg-white"}`}
        >
          <Text className="font-bold text-ink">{position.displayName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
