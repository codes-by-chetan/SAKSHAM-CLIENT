import { router } from "expo-router";
import { View } from "react-native";

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Screen from "@/components/Screen";

import { useLanguage } from "@/hooks/useLanguage";

export default function WelcomeScreen() {
  const { t } = useLanguage();

  return (
    <Screen scroll={false}>
      <View className="flex-1 justify-center">
        <View className="items-center">
          <Logo />

          <AuthHeader title={t.appName} subtitle={t.subtitle} />
        </View>

        <AuthCard>
          <Button
            title={t.signIn}
            onPress={() => router.push("/(auth)/signin")}
          />

          <View className="h-4" />

          <Button
            title={t.signUp}
            variant="outline"
            onPress={() => router.push("/(auth)/signup")}
          />
        </AuthCard>
      </View>
    </Screen>
  );
}
