import { ReactNode } from "react";
import { View } from "react-native";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <View
      className="
        mt-4
        rounded-[28px]
        bg-white
        p-6
        shadow-sm
      "
      style={{
        elevation: 4,
      }}
    >
      {children}
    </View>
  );
}