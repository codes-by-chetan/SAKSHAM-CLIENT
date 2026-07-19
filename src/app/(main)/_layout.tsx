import { Tabs } from "expo-router";

import {
  House,
  Users,
  Wallet,
  HandCoins,
  UserRound,
} from "lucide-react-native";

export default function MainLayout() {
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
          title: "Home",

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
          title: "Members",

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
          title: "Savings",

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
          title: "Loans",

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
          title: "Profile",

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