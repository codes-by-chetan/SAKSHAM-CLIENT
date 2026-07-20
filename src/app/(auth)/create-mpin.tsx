import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";

import Screen from "@/components/Screen";
import Logo from "@/components/Logo";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthCard from "@/components/auth/AuthCard";
import Button from "@/components/Button";

import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";

export default function CreateMPINScreen() {
  const { t } = useLanguage();
  const { setMpin } = useAuth();

  const inputRef = useRef<TextInput>(null);

  const [mpin, setMPIN] = useState("");

  const [confirmMPIN, setConfirmMPIN] =
    useState("");

  const [confirmMode, setConfirmMode] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleChange(value: string) {
    if (!confirmMode) {
      setMPIN(value);

      if (value.length === 4) {
        setTimeout(() => {
          setConfirmMode(true);

          setConfirmMPIN("");

        }, 250);
      }

      return;
    }

    setConfirmMPIN(value);
  }

  async function handleContinue() {
    if (mpin !== confirmMPIN) {
      Alert.alert(
        "MPIN",
        "Both MPINs should match."
      );

      setMPIN("");

      setConfirmMPIN("");

      setConfirmMode(false);

      return;
    }

    try {
      setLoading(true);

      await setMpin(mpin);

      router.replace("/(main)/dashboard");
    } catch (error: any) {
      Alert.alert(
        "Unable to set MPIN",
        error.message ?? "Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const value = confirmMode
    ? confirmMPIN
    : mpin;

  return (
    <Screen scroll={false}>
      <TouchableOpacity
        activeOpacity={1}
        className="flex-1 justify-center"
        onPress={() =>
          inputRef.current?.focus()
        }
      >
        <View className="items-center">

          <Logo size="md" />

          <AuthHeader
            title={
              confirmMode
                ? "Confirm MPIN"
                : "Create MPIN"
            }
            subtitle={
              confirmMode
                ? "Enter the same MPIN again."
                : "Your MPIN will be used to unlock Saksham."}
            />

        </View>

        <AuthCard>

          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={handleChange}
            keyboardType="number-pad"
            maxLength={4}
            autoFocus
            caretHidden
            className="absolute h-0 w-0 opacity-0"
          />

          <View className="mb-8 flex-row justify-between">

            {[0, 1, 2, 3].map((index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                onPress={() =>
                  inputRef.current?.focus()
                }
                className={`
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  ${
                    value.length > index
                      ? "border-leaf bg-green-50"
                      : "border-stone-300"
                  }
                `}
              >
                <Text className="text-3xl font-bold text-leaf">

                  {value[index]
                    ? "•"
                    : ""}

                </Text>
              </TouchableOpacity>
            ))}

          </View>

          <Button
            title={
              confirmMode
                ? "Finish"
                : "Continue"
            }
            loading={loading}
            disabled={
              value.length < 4
            }
            onPress={handleContinue}
          />

        </AuthCard>

      </TouchableOpacity>
    </Screen>
  );
}
