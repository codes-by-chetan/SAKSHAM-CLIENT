import { Alert, ScrollView, Text, View } from "react-native";
import { router } from "expo-router";

import {
  Bell,
  Languages,
  Lock,
  LogOut,
  Moon,
  Shield,
} from "lucide-react-native";

import Screen from "@/components/Screen";
import SectionHeader from "@/components/dashboard/SectionHeader";
import SettingItem from "@/components/profile/SettingItem";

import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileScreen() {
  const { logout } = useAuth();

  const { language } = useLanguage();

  async function handleLogout() {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await logout();

            router.replace(
              "/(auth)/welcome"
            );
          },
        },
      ]
    );
  }

  return (
    <Screen scroll={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center py-8">

          <View className="h-24 w-24 items-center justify-center rounded-full bg-leaf">

            <Text className="text-4xl font-black text-white">
              C
            </Text>

          </View>

          <Text className="mt-5 text-2xl font-bold text-ink">
            Chetan
          </Text>

          <Text className="mt-2 text-stone-500">
            Administrator
          </Text>

        </View>

        <SectionHeader
          title="Settings"
        />

        <SettingItem
          title="Language"
          subtitle={language.toUpperCase()}
          icon={
            <Languages
              size={24}
              color="#2E7D32"
            />
          }
        />

        <SettingItem
          title="Theme"
          subtitle="System"
          icon={
            <Moon
              size={24}
              color="#2E7D32"
            />
          }
        />

        <SettingItem
          title="Notifications"
          subtitle="Enabled"
          icon={
            <Bell
              size={24}
              color="#2E7D32"
            />
          }
        />

        <SettingItem
          title="Change MPIN"
          subtitle="Update security PIN"
          icon={
            <Lock
              size={24}
              color="#2E7D32"
            />
          }
        />

        <SettingItem
          title="Privacy"
          subtitle="Security settings"
          icon={
            <Shield
              size={24}
              color="#2E7D32"
            />
          }
        />

        <View className="mt-8">

          <SettingItem
            title="Logout"
            danger
            onPress={handleLogout}
            icon={
              <LogOut
                size={24}
                color="#DC2626"
              />
            }
          />

        </View>

      </ScrollView>
    </Screen>
  );
}