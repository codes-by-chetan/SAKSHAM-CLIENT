import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import Button from "@/components/Button";
import LanguageCard from "@/components/LanguageCard";
import Logo from "@/components/Logo";
import Screen from "@/components/Screen";

import { useLanguage } from "@/hooks/useLanguage";

import { LANGUAGES } from "@/constants/translations";
import { LanguageCode } from "@/types/language";

export default function LanguageScreen() {
  const { language, setLanguage, t } = useLanguage();

  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageCode>(language);

  const [loading, setLoading] = useState(false);

  async function handleContinue() {
    try {
      setLoading(true);

      // Saves language + marks onboarding completed
      await setLanguage(selectedLanguage);

      router.replace("/(auth)/welcome");
    } catch (error) {
      console.error("Failed to save language", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <View className="flex-1 justify-center">
        <View className="items-center">
          <Logo />

          <AuthHeader title={t.chooseLanguage} subtitle={t.subtitle} />
        </View>

        <AuthCard>
          {LANGUAGES.map((item) => (
            <LanguageCard
              key={item.code}
              language={item}
              selected={selectedLanguage === item.code}
              onPress={() => setSelectedLanguage(item.code)}
            />
          ))}

          <View className="mt-2">
            <Button
              title={t.continue}
              loading={loading}
              onPress={handleContinue}
            />
          </View>
        </AuthCard>
      </View>
    </Screen>
  );
}
