import { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import {
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react-native";

import AuthHeader from "@/components/auth/AuthHeader";
import AuthCard from "@/components/auth/AuthCard";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Logo from "@/components/Logo";
import Screen from "@/components/Screen";

import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/hooks/useLanguage";

export default function SignUpScreen() {
  const { register } = useAuth();

  const { t } = useLanguage();

  const lastNameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    firstName: "",

    lastName: "",

    email: "",

    phone: "",

    password: "",
  });

  function updateField(
    key: keyof typeof form,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleRegister() {
    try {
      setLoading(true);

      await register({
        firstName: form.firstName,

        lastName: form.lastName,

        email:
          form.email || undefined,

        phone: form.phone,

        password: form.password,

        countryCode: "+91",
      });

      router.replace(
        "/(auth)/create-mpin"
      );
    } catch (error: any) {
      alert(
        error.message ??
          "Unable to create account."
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
            title={t.signUp}
            subtitle={t.subtitle}
          />

        </View>

        <AuthCard>

          <Input
            label={t.firstName}
            value={form.firstName}
            onChangeText={(text) =>
              updateField(
                "firstName",
                text
              )
            }
            LeftIcon={User}
            returnKeyType="next"
            onSubmitEditing={() =>
              lastNameRef.current?.focus()
            }
          />

          <Input
            ref={lastNameRef}
            label={t.lastName}
            value={form.lastName}
            onChangeText={(text) =>
              updateField(
                "lastName",
                text
              )
            }
            LeftIcon={User}
            returnKeyType="next"
            onSubmitEditing={() =>
              emailRef.current?.focus()
            }
          />

          <Input
            ref={emailRef}
            label={t.email}
            value={form.email}
            onChangeText={(text) =>
              updateField(
                "email",
                text
              )
            }
            keyboardType="email-address"
            autoCapitalize="none"
            LeftIcon={Mail}
            returnKeyType="next"
            onSubmitEditing={() =>
              phoneRef.current?.focus()
            }
          />

          <Input
            ref={phoneRef}
            label={t.phone}
            value={form.phone}
            onChangeText={(text) =>
              updateField(
                "phone",
                text
              )
            }
            keyboardType="phone-pad"
            LeftIcon={Phone}
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordRef.current?.focus()
            }
          />

          <Input
            ref={passwordRef}
            label={t.password}
            value={form.password}
            onChangeText={(text) =>
              updateField(
                "password",
                text
              )
            }
            secureTextEntry
            LeftIcon={Lock}
            returnKeyType="done"
            onSubmitEditing={
              handleRegister
            }
          />

          <View className="mt-6">

            <Button
              title={
                t.submitSignUp
              }
              loading={loading}
              onPress={
                handleRegister
              }
            />

          </View>

          <TouchableOpacity
            className="mt-6 items-center"
            onPress={() =>
              router.replace(
                "/(auth)/signin"
              )
            }
          >
            <Text className="text-base text-stone-600">
              {t.switchToSignIn}
            </Text>
          </TouchableOpacity>

        </AuthCard>

      </View>

    </Screen>
  );
}