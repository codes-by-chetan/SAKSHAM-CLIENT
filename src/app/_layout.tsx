import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import "@/global.css";

import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        >
          <Stack.Screen name="index" />

          <Stack.Screen
            name="(auth)"
            options={{
              animation: "slide_from_right",
            }}
          />

          <Stack.Screen
            name="(main)"
            options={{
              animation: "fade",
            }}
          />
        </Stack>
      </AuthProvider>
    </LanguageProvider>
  );
}