import { Tabs } from "expo-router";

import {
  House,
  Users,
  Wallet,
  HandCoins,
  UserRound,
} from "lucide-react-native";
import { useLanguage } from "@/hooks/useLanguage";

export default function MainLayout() {
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#2E7D32",

        tabBarInactiveTintColor: "#8C8C8C",

        tabBarStyle: {
          height: 70,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t.home,

          tabBarIcon: ({ color, size }) => (
            <House
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="members"
        options={{
          title: t.members,

          tabBarIcon: ({ color, size }) => (
            <Users
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="savings"
        options={{
          title: t.savings,

          tabBarIcon: ({ color, size }) => (
            <Wallet
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="loans"
        options={{
          title: t.loans,

          tabBarIcon: ({ color, size }) => (
            <HandCoins
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: t.profile,

          tabBarIcon: ({ color, size }) => (
            <UserRound
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
