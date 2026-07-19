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

import MainScreen from "@/components/MainScreen";
import SectionHeader from "@/components/dashboard/SectionHeader";
import SettingItem from "@/components/profile/SettingItem";

import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";

export default function ProfileScreen() {
  const { logout } = useAuth();

  const { language, t } = useLanguage();

  async function handleLogout() {
    Alert.alert(
      t.logout,
      t.logout,
      [
        {
          text: t.cancel,
          style: "cancel",
        },
        {
          text: t.logout,
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
    <MainScreen>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
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
          title={t.settings}
        />

        <SettingItem
          title={t.language}
          subtitle={language.toUpperCase()}
          icon={
            <Languages
              size={24}
              color="#2E7D32"
            />
          }
        />

        <SettingItem
          title={t.theme}
          subtitle={t.system}
          icon={
            <Moon
              size={24}
              color="#2E7D32"
            />
          }
        />

        <SettingItem
          title={t.notifications}
          subtitle={t.enabled}
          icon={
            <Bell
              size={24}
              color="#2E7D32"
            />
          }
        />

        <SettingItem
          title={t.changeMpin}
          subtitle={t.changeMpin}
          icon={
            <Lock
              size={24}
              color="#2E7D32"
            />
          }
        />

        <SettingItem
          title={t.privacy}
          subtitle={t.settings}
          icon={
            <Shield
              size={24}
              color="#2E7D32"
            />
          }
        />

        <View className="mt-8">

          <SettingItem
            title={t.logout}
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
    </MainScreen>
  );
}
