import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Building2, RefreshCw, UsersRound } from "lucide-react-native";

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Screen from "@/components/Screen";
import {
  createOrganization,
  getActiveMembership,
} from "@/services/organization";
import { OrganizationType } from "@/types/organization";

export default function WorkspaceScreen() {
  const [selectedType, setSelectedType] = useState<OrganizationType | null>(
    null,
  );
  const [name, setName] = useState("");
  const [waiting, setWaiting] = useState(false);
  const [loading, setLoading] = useState(false);

  async function checkInvitation() {
    try {
      setLoading(true);
      const membership = await getActiveMembership();
      if (membership) {
        router.replace("/(main)/dashboard");
      } else {
        Alert.alert(
          "No active invitation yet",
          "Ask a group administrator to invite you, then check again.",
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Could not check invitations",
        error.message ?? "Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  async function createWorkspace() {
    if (!selectedType || !name.trim()) {
      Alert.alert("Group name required", "Enter a name for the new group.");
      return;
    }

    try {
      setLoading(true);
      await createOrganization(selectedType, name);
      const membership = await getActiveMembership();
      if (!membership) {
        throw new Error(
          "Your group was created, but access is not active yet.",
        );
      }
      router.replace("/(main)/dashboard");
    } catch (error: any) {
      Alert.alert(
        "Could not create group",
        error.message ?? "Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <View className="items-center">
          <Logo size="md" />
          <AuthHeader
            title={
              waiting ? "Waiting for an invitation" : "Set up your workspace"
            }
            subtitle={
              waiting
                ? "When an administrator adds you to a Bachatgat or Gramsangh, you can continue here."
                : "Create a Bachatgat or Gramsangh, or join one through an invitation."
            }
          />
        </View>

        <AuthCard>
          {waiting ? (
            <>
              <Button
                title="Check for invitation"
                loading={loading}
                onPress={checkInvitation}
                LeftIcon={RefreshCw}
              />
              <Button
                title="Create a new group instead"
                variant="ghost"
                onPress={() => setWaiting(false)}
              />
            </>
          ) : (
            <>
              <Text className="mb-3 text-sm font-semibold text-ink">
                What would you like to create?
              </Text>
              <View className="flex-row gap-3">
                {(
                  [
                    ["bachatgat", "Bachatgat", UsersRound],
                    ["gramsangh", "Gramsangh", Building2],
                  ] as const
                ).map(([type, label, Icon]) => (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setSelectedType(type)}
                    className={`flex-1 items-center rounded-2xl border p-4 ${selectedType === type ? "border-leaf bg-green-50" : "border-stone-200 bg-white"}`}
                  >
                    <Icon size={26} color="#2E7D32" />
                    <Text className="mt-2 font-bold text-ink">{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Group name"
                className="mt-5 rounded-2xl border border-stone-300 bg-white px-4 py-4 text-base text-ink"
              />
              <View className="mt-5">
                <Button
                  title="Create group"
                  loading={loading}
                  onPress={createWorkspace}
                />
              </View>
              <Button
                title="I have an invitation"
                variant="ghost"
                onPress={() => setWaiting(true)}
              />
            </>
          )}
        </AuthCard>
      </View>
    </Screen>
  );
}
