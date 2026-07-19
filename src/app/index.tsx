import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { bootstrap } from "@/services/session";

export default function Index() {
  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    try {
      const result = await bootstrap();

      if (!result.languageSelected) {
        router.replace("/(auth)/language");
        return;
      }

      if (!result.authenticated) {
        router.replace("/(auth)/welcome");
        return;
      }

      router.replace("/(main)/dashboard");
    } catch (error) {
      console.error(error);

      router.replace("/(auth)/language");
    } finally {
      await SplashScreen.hideAsync();
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-millet">
      <View className="flex-1 items-center justify-center px-8">

        <View className="h-28 w-28 items-center justify-center rounded-3xl bg-leaf">
          <Text className="text-5xl font-black text-white">
            S
          </Text>
        </View>

        <ActivityIndicator
          size="large"
          color="#2E7D32"
          className="mt-8"
        />

        <Text className="mt-6 text-xl font-bold text-ink">
          Saksham
        </Text>

        <Text className="mt-2 text-center text-stone-500">
          Preparing your workspace...
        </Text>

      </View>
    </SafeAreaView>
  );
}