import { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Lock, Mail } from "lucide-react-native";

import Screen from "@/components/Screen";
import Logo from "@/components/Logo";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthCard from "@/components/auth/AuthCard";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";

export default function SignInScreen() {
  const { login } = useAuth();

  const { t } = useLanguage();

  const passwordRef =
    useRef<TextInput>(null);

  const [identifier, setIdentifier] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleLogin() {
    try {
      setLoading(true);

      const session = await login({
        identifier,
        password,
        countryCode: "+91",
      });

      router.replace(
        session.user?.hasMpin
          ? "/(main)/dashboard"
          : "/(auth)/create-mpin"
      );
    } catch (error: any) {
      console.log(error);

      alert(
        error.message ??
          "Unable to login."
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
            title={t.signIn}
            subtitle={t.subtitle}
          />

        </View>

        <AuthCard>

          <Input
            label={t.identifier}
            placeholder={t.identifier}
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            LeftIcon={Mail}
            onSubmitEditing={() =>
              passwordRef.current?.focus()
            }
          />

          <Input
            ref={passwordRef}
            label={t.password}
            placeholder={t.password}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
            LeftIcon={Lock}
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity
            className="self-end"
          >
            <Text className="text-sm font-semibold text-leaf">
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <View className="mt-6">

            <Button
              title={t.submitSignIn}
              loading={loading}
              onPress={handleLogin}
            />

          </View>

          <TouchableOpacity
            className="mt-6 items-center"
            onPress={() =>
              router.replace(
                "/(auth)/signup"
              )
            }
          >
            <Text className="text-base text-stone-600">

              {t.switchToSignUp}

            </Text>
          </TouchableOpacity>

        </AuthCard>

      </View>

    </Screen>
  );
}
