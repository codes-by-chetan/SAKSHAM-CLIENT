import { View, Text } from "react-native";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  size = "lg",
}: LogoProps) {
  const sizes = {
    sm: {
      container: "h-16 w-16 rounded-2xl",
      text: "text-3xl",
    },

    md: {
      container: "h-20 w-20 rounded-3xl",
      text: "text-4xl",
    },

    lg: {
      container: "h-28 w-28 rounded-[32px]",
      text: "text-5xl",
    },
  };

  return (
    <View
      className={`${sizes[size].container} items-center justify-center bg-leaf shadow-lg`}
    >
      <Text
        className={`${sizes[size].text} font-black text-white`}
      >
        S
      </Text>
    </View>
  );
}