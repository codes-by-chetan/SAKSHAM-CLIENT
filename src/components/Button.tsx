import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { LucideIcon } from "lucide-react-native";

type ButtonVariant = "filled" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  title: string;

  loading?: boolean;

  variant?: ButtonVariant;

  size?: ButtonSize;

  LeftIcon?: LucideIcon;

  RightIcon?: LucideIcon;

  fullWidth?: boolean;
}

export default function Button({
  title,

  loading = false,

  disabled = false,

  variant = "filled",

  size = "md",

  LeftIcon,

  RightIcon,

  fullWidth = true,

  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const sizeClasses = {
    sm: {
      button: "py-2.5",
      text: "text-sm",
      icon: 18,
    },

    md: {
      button: "py-4",
      text: "text-base",
      icon: 20,
    },

    lg: {
      button: "py-5",
      text: "text-lg",
      icon: 22,
    },
  };

  const variantClasses = {
    filled: {
      button:
        "bg-leaf border border-leaf",

      text:
        "text-white",

      spinner:
        "#FFFFFF",
    },

    outline: {
      button:
        "bg-transparent border border-leaf",

      text:
        "text-leaf",

      spinner:
        "#2E7D32",
    },

    ghost: {
      button:
        "bg-transparent border border-transparent",

      text:
        "text-leaf",

      spinner:
        "#2E7D32",
    },
  };

  const currentSize = sizeClasses[size];
  const currentVariant =
    variantClasses[variant];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={isDisabled}
      className={`
        ${currentVariant.button}
        ${currentSize.button}
        ${fullWidth ? "w-full" : ""}
        rounded-2xl
        items-center
        justify-center
        ${isDisabled ? "opacity-60" : ""}
      `}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={
            currentVariant.spinner
          }
        />
      ) : (
        <View className="flex-row items-center justify-center">

          {LeftIcon && (
            <LeftIcon
              size={currentSize.icon}
              color={
                variant === "filled"
                  ? "#FFF"
                  : "#2E7D32"
              }
            />
          )}

          <Text
            className={`${currentVariant.text} ${currentSize.text} mx-2 font-bold`}
          >
            {title}
          </Text>

          {RightIcon && (
            <RightIcon
              size={currentSize.icon}
              color={
                variant === "filled"
                  ? "#FFF"
                  : "#2E7D32"
              }
            />
          )}

        </View>
      )}
    </TouchableOpacity>
  );
}