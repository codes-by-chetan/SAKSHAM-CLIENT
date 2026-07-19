import { ReactNode } from "react";
import { View } from "react-native";

import Screen from "@/components/Screen";

interface MainScreenProps {
  children: ReactNode;
}

export default function MainScreen({
  children,
}: MainScreenProps) {
  return (
    <Screen scroll={false}>
      <View className="flex-1 px-7 pt-5">
        {children}
      </View>
    </Screen>
  );
}
