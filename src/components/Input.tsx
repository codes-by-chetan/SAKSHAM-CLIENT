import React, { forwardRef, useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Eye,
  EyeOff,
  LucideIcon,
} from "lucide-react-native";

interface InputProps extends TextInputProps {
  label?: string;

  error?: string;

  required?: boolean;

  LeftIcon?: LucideIcon;

  RightIcon?: LucideIcon;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      required = false,
      secureTextEntry = false,
      LeftIcon,
      RightIcon,
      editable = true,
      ...props
    },
    ref
  ) => {
    const [hidePassword, setHidePassword] =
      useState(secureTextEntry);

    return (
      <View className="mb-5">
        {label && (
          <View className="mb-2 flex-row">
            <Text className="text-base font-semibold text-ink">
              {label}
            </Text>

            {required && (
              <Text className="ml-1 text-red-500">
                *
              </Text>
            )}
          </View>
        )}

        <View
          className={`flex-row items-center rounded-2xl border bg-white px-4 ${
            error
              ? "border-red-500"
              : "border-stone-300"
          } ${
            !editable
              ? "opacity-60"
              : ""
          }`}
        >
          {LeftIcon && (
            <LeftIcon
              size={20}
              color="#666"
            />
          )}

          <TextInput
            ref={ref}
            className="flex-1 py-4 px-3 text-base text-ink"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={
              secureTextEntry &&
              hidePassword
            }
            editable={editable}
            {...props}
          />

          {secureTextEntry ? (
            <TouchableOpacity
              onPress={() =>
                setHidePassword(
                  !hidePassword
                )
              }
            >
              {hidePassword ? (
                <EyeOff
                  size={20}
                  color="#666"
                />
              ) : (
                <Eye
                  size={20}
                  color="#666"
                />
              )}
            </TouchableOpacity>
          ) : (
            RightIcon && (
              <RightIcon
                size={20}
                color="#666"
              />
            )
          )}
        </View>

        {error && (
          <Text className="mt-2 text-sm text-red-500">
            {error}
          </Text>
        )}
      </View>
    );
  }
);

Input.displayName = "Input";

export default Input;